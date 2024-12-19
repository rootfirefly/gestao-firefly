#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Error handling
set -e
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
trap 'echo "\"${last_command}\" command failed with exit code $?."' EXIT

# Function to print colored messages
print_message() {
    echo -e "${2}${1}${NC}"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check system requirements
check_system_requirements() {
    print_message "Checking system requirements..." "$BLUE"
    
    # Check minimum RAM (4GB)
    total_ram=$(free -m | awk '/^Mem:/{print $2}')
    if [ $total_ram -lt 4096 ]; then
        print_message "Warning: System has less than 4GB RAM. This might affect performance." "$YELLOW"
    fi

    # Check available disk space (minimum 10GB)
    available_space=$(df -BG / | awk 'NR==2 {print $4}' | sed 's/G//')
    if [ $available_space -lt 10 ]; then
        print_message "Error: Insufficient disk space. At least 10GB required." "$RED"
        exit 1
    fi

    # Check if ports 80 and 443 are available
    if netstat -tuln | grep -q ':80\|:443'; then
        print_message "Warning: Ports 80 or 443 are already in use. This might cause conflicts." "$YELLOW"
    fi
}

# Function to backup existing configuration
backup_existing_config() {
    print_message "Creating backup of existing configuration..." "$BLUE"
    
    BACKUP_DIR="/root/gestao-firefly-backup-$(date +%Y%m%d_%H%M%S)"
    mkdir -p $BACKUP_DIR

    # Backup Nginx configuration if exists
    if [ -f /etc/nginx/sites-available/gestao-firefly ]; then
        cp /etc/nginx/sites-available/gestao-firefly $BACKUP_DIR/
    fi

    # Backup SSL certificates if exist
    if [ -d /etc/letsencrypt/live ]; then
        cp -r /etc/letsencrypt/live $BACKUP_DIR/
    fi

    print_message "Backup created at $BACKUP_DIR" "$GREEN"
}

# Function to install dependencies
install_dependencies() {
    print_message "Installing required packages..." "$BLUE"
    
    # Update package list
    apt-get update || {
        print_message "Failed to update package list" "$RED"
        exit 1
    }

    # Install required packages
    PACKAGES="curl git nginx certbot python3-certbot-nginx nodejs npm"
    for package in $PACKAGES; do
        if ! dpkg -l | grep -q "^ii  $package"; then
            apt-get install -y $package || {
                print_message "Failed to install $package" "$RED"
                exit 1
            }
        fi
    done

    # Install PM2 globally
    npm install -g pm2 || {
        print_message "Failed to install PM2" "$RED"
        exit 1
    }
}

# Function to validate domain
validate_domain() {
    local domain=$1
    if [[ ! $domain =~ ^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$ ]]; then
        print_message "Invalid domain format" "$RED"
        return 1
    fi
    
    # Check if domain resolves
    if ! host $domain > /dev/null 2>&1; then
        print_message "Warning: Domain does not resolve. DNS might not be configured." "$YELLOW"
    fi
}

# Function to validate Firebase credentials
validate_firebase_credentials() {
    local api_key=$1
    local project_id=$2
    
    # Basic format validation
    if [[ ! $api_key =~ ^AIza[0-9A-Za-z-_]{35}$ ]]; then
        print_message "Invalid Firebase API key format" "$RED"
        return 1
    }

    if [[ ! $project_id =~ ^[a-z0-9-]{6,30}$ ]]; then
        print_message "Invalid Firebase project ID format" "$RED"
        return 1
    }

    # Test Firebase connection
    curl -s "https://$project_id.firebaseio.com/.json?auth=$api_key" > /dev/null || {
        print_message "Failed to connect to Firebase. Please verify credentials." "$RED"
        return 1
    }
}

# Main setup function
main() {
    print_message "Starting Gestão FireFly Setup" "$GREEN"
    
    # Check if script is run as root
    if [ "$EUID" -ne 0 ]; then 
        print_message "Please run as root" "$RED"
        exit 1
    }

    # Check system requirements
    check_system_requirements
    
    # Create backup
    backup_existing_config
    
    # Install dependencies
    install_dependencies

    # Get and validate domain
    while true; do
        read -p "Enter your domain name (e.g., gestao.example.com): " DOMAIN_NAME
        if validate_domain "$DOMAIN_NAME"; then
            break
        fi
    done

    # Get and validate Firebase credentials
    while true; do
        read -p "Firebase API Key: " FIREBASE_API_KEY
        read -p "Firebase Project ID: " FIREBASE_PROJECT_ID
        if validate_firebase_credentials "$FIREBASE_API_KEY" "$FIREBASE_PROJECT_ID"; then
            break
        fi
    done

    # Additional Firebase configuration
    read -p "Firebase Auth Domain: " FIREBASE_AUTH_DOMAIN
    read -p "Firebase Storage Bucket: " FIREBASE_STORAGE_BUCKET
    read -p "Firebase Messaging Sender ID: " FIREBASE_MESSAGING_SENDER_ID
    read -p "Firebase App ID: " FIREBASE_APP_ID

    # Setup application
    APP_DIR="/var/www/gestao-firefly"
    mkdir -p $APP_DIR

    # Clone repository
    git clone https://github.com/rootfirefly/gestao-firefly.git $APP_DIR || {
        print_message "Failed to clone repository" "$RED"
        exit 1
    }

    # Configure application
    cd $APP_DIR
    npm install || {
        print_message "Failed to install Node.js dependencies" "$RED"
        exit 1
    }

    # Create environment configuration
    cat > .env << EOF
VITE_FIREBASE_API_KEY=$FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=$FIREBASE_APP_ID
EOF

    # Build application
    npm run build || {
        print_message "Failed to build application" "$RED"
        exit 1
    }

    # Configure Nginx
    configure_nginx

    # Setup SSL
    setup_ssl

    # Start application
    start_application

    print_message "\nSetup completed successfully!" "$GREEN"
    print_message "Your application is now running at https://$DOMAIN_NAME" "$GREEN"
    print_message "\nImportant notes:" "$YELLOW"
    print_message "1. Make sure your domain's DNS is pointing to this server's IP" "$YELLOW"
    print_message "2. SSL certificate will auto-renew every day at noon" "$YELLOW"
    print_message "3. To view logs, use: pm2 logs gestao-firefly" "$YELLOW"
    print_message "4. To restart the application, use: pm2 restart gestao-firefly" "$YELLOW"
}

# Execute main function
main

export const VERSION = {
  major: 1,
  minor: 0,
  patch: 1,
  get full() {
    return `${this.major}.${this.minor}.${this.patch}`;
  }
};

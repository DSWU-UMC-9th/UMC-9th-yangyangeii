export const tokenStore = {
  key: "accessToken",

  get(): string | null {
    return localStorage.getItem(this.key);
  },

  set(token: string): void {
    localStorage.setItem(this.key, token);
  },

  clear(): void {
    localStorage.removeItem(this.key);
  },
};

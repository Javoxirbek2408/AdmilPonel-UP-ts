import Cookies  from "js-cookie";

export const cookieStorage: Storage = {
  getItem(key: string): string | null {
    const v = Cookies.get(key);
    return v === undefined ? null : v;
  },

  setItem(key: string, value: string): void {
    Cookies.set(key, value, {
      secure: true,
      sameSite: 'Strict',
      expires: 7, // doimiy 7 kun qilinmoqda, optional "days" kerak emas
    });
  },

  removeItem(key: string): void {
    Cookies.remove(key, {
      secure: true,
      sameSite: 'Strict',
    });
  },
};

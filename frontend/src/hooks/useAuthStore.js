// store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Create a persistent auth store
export const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      isAdmin: false,

      // Login action
      login: ({ isAdmin = false } = {}) =>
        set({ isLoggedIn: true, isAdmin }),

      // Logout action
      logout: () => set({ isLoggedIn: false, isAdmin: false }),
    }),
    {
      name: "auth-storage", // key in localStorage
      getStorage: () => localStorage, // default
    }
  )
);

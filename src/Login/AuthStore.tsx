import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
    isAuthenticated: boolean;
    login: () => void;
    logOut: () => void;
}

const useAuthStore = create(
    persist<AuthStore>(
        (set) => ({
            isAuthenticated: false,
            login: () => {
                const userLocalStorage = localStorage.getItem('user');
                if (userLocalStorage) {
                    set({ isAuthenticated: true });
                }
            },
            logOut: () => {
                set({ isAuthenticated: false });
                localStorage.clear();
            },
        }),
        {
            name: 'userLoginStatus',
        }
    )
);

// const useAuthStore = create(persist<AuthStore>((set) => ({
//     isAuthenticated: false,
//     loggedIn: () => set(() => ({ isAuthenticated: true })),
//     loggedOut: () => set(() => ({ isAuthenticated: false })),
// })));

export default useAuthStore;
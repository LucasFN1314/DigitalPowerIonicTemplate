import { defineStore } from "pinia";
import { authUrl, site_name } from "@/services/apiReq";
import axios from "axios";
import { clear, getObject, saveObject } from "@/services/storage";
import { show } from "@/services/notification";

interface User {
    id: string;
    email: string;
    [key: string]: any;
}

interface State {
    user: User | null;
}

export const useUserStore = defineStore('user', {
    state: (): State => ({
        user: null,
    }),
    getters: {},
    actions: {
        async login(email: string, password: string): Promise<boolean> {
            clear();
            try {
                const response = await axios.post(`${authUrl}/login`, { email, password, site_name, panel: 0 });
                const { User, message } = response.data;

                if (message) {
                    show(message);
                }

                if (User) {
                    this.user = User;
                    saveObject("user", User);
                    return true;
                }
            } catch (error) {
                console.error("Login error:", error);
            }
            return false;
        },
        logout(): void {
            clear();
            location.reload();
        },
        async get(): Promise<void> {
            let _user = getObject("user");
            if (!_user) return;

            try {
                const response: any = await axios.post(`${authUrl}/user`, _user);
                _user = response.data?.user;

                if (_user) {
                    this.user = _user;
                    saveObject("user", _user);
                }
            } catch (error) {
                console.error("Get user error:", error);
            }
        },
        async getUser(): Promise<User | null> {
            if (!this.user) {
                await this.get();
            }
            return this.user;
        }
    }
});

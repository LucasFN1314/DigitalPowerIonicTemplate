import axios, { AxiosInstance } from "axios";
import { show } from "./notification";

export const site_name: string = "papelera.db";
export const backendUrl: string = "https://backend.digitalpower.ar";
export const paymentUrl: string = "https://payment.digitalpower.ar";
export const databaseUrl: string = "https://database.digitalpower.ar";
export const authUrl: string = "https://auth.digitalpower.ar";

interface User {
    token: string | null;
    id: string | null;
    site_name: string | null;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Service: AxiosInstance = axios.create({
    baseURL: `${backendUrl}/api`,
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DBService: AxiosInstance = axios.create({
    baseURL: `${databaseUrl}/api`,
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AuthService: AxiosInstance = axios.create({
    baseURL: `${authUrl}/`,
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PaymentService: AxiosInstance = axios.create({
    baseURL: `${paymentUrl}/`,
});

let user: User = { token: null, id: null, site_name: null };
const storedUser = localStorage.getItem("user");
if (storedUser && storedUser !== "undefined") {
    user = JSON.parse(storedUser) as User;
}

const config: any = {
    headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    },
};

export const post = (path: string, body: any = {}, service: AxiosInstance = DBService): Promise<any> => {
    if (!user) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) user = JSON.parse(storedUser) as User;
        config.headers.Authorization = `Bearer ${user?.token}`;
    }

    body.site_name = body?.site_name ?? site_name ?? user?.site_name;
    body.schema = body?.schema ?? site_name ?? user?.site_name;
    if (user?.id) body.user_id = user?.id;

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
        service
            .post(path, body, config)
            .then((response: any) => {
                const message = response?.data?.message;
                const status = response?.status ?? response?.data?.status;

                if (message) show(message);

                setTimeout(() => {
                    if (response?.data?.redirect) {
                        location.href = response?.data?.redirect;
                    }
                }, 1000);

                if (status === 401) {
                    location.href = "/admin";
                }
                resolve(response);
            })
            .catch((err: any) => {
                console.error(err);
                if (err?.response?.status === 401) {
                    // localStorage.removeItem("dp_user");
                    // location.href = "/#/login";
                }
                show(err?.response?.data?.message || "Ha ocurrido un error, intente más tarde");
            });
    });
};
import { apiFetch } from "./api";

export async function login(email, password) {
    const data = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data.user;
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export function getUser() {
    const user = localStorage.getItem("user");

    if (!user) {
        return null;
    }

    return JSON.parse(user);
}

export function getToken() {
    return localStorage.getItem("token");
}
import { apiFetch } from "./api";


export async function getAdminDashboard() {

    const token = localStorage.getItem("token");

    return await apiFetch("/admin/dashboard", {

        method: "GET",

        headers: {
            Authorization: `Bearer ${token}`,
        },

    });
}
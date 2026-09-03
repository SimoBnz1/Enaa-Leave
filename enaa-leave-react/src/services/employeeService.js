import { apiFetch } from "./api";

export async function getEmployeeDashboard() {
    return await apiFetch("/employee/dashboard", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
}
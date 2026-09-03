import { apiFetch } from "./api";

export async function getCalendarEvents() {
    const token = localStorage.getItem("token");

    return await apiFetch("/calendar", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
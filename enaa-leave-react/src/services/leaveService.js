import { apiFetch } from "./api";

export async function createLeaveRequest(formData) {

    const token = localStorage.getItem("token");

    return await apiFetch("/employee/leave-requests", {
        method: "POST",

        headers: {
            Authorization: `Bearer ${token}`,
        },

        body: formData,
    });
}


export async function getEmployeeRequests() {

    const token = localStorage.getItem("token");

    return await apiFetch("/employee/leave-requests", {
        method: "GET",

        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
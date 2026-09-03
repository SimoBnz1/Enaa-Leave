import { apiFetch } from "./api";

export async function getManagerDashboard() {
    const token = localStorage.getItem("token");

    return await apiFetch("/manager/dashboard", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}


export async function approveLeaveRequest(id) {
    const token = localStorage.getItem("token");

    return await apiFetch(`/manager/leave-requests/${id}/approve`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}


export async function rejectLeaveRequest(id) {
    const token = localStorage.getItem("token");

    return await apiFetch(`/manager/leave-requests/${id}/reject`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
import { apiFetch } from "./api";


export async function getHRDashboard() {

    const token = localStorage.getItem("token");

    return await apiFetch("/hr/dashboard", {

        method: "GET",

        headers: {
            Authorization: `Bearer ${token}`,
        },

    });
}


export async function approveLeaveRequest(id) {

    const token = localStorage.getItem("token");

    return await apiFetch(`/hr/leave-requests/${id}/approve`, {

        method: "PUT",

        headers: {
            Authorization: `Bearer ${token}`,
        },

    });
}


export async function rejectLeaveRequest(id) {

    const token = localStorage.getItem("token");

    return await apiFetch(`/hr/leave-requests/${id}/reject`, {

        method: "PUT",

        headers: {
            Authorization: `Bearer ${token}`,
        },

    });
}
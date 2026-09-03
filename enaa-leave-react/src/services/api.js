const API_URL = "http://127.0.0.1:8000/api";

export async function apiFetch(endpoint, options = {}) {

    const isFormData = options.body instanceof FormData;

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,

        headers: {
            Accept: "application/json",

            ...(isFormData
                ? {}
                : {
                    "Content-Type": "application/json",
                }),

            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Une erreur est survenue"
        );
    }

    return data;
}
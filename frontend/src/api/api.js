import { Rss } from "lucide-react";

let isRefreshing = false;
let refreshSubscribers = [];

const subscribersCallback = () => {
    refreshSubscribers.forEach(cb => cb());
}

const apiClient = async (url, options) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken)
    options.headers = { ...options.headers, authorization: `Bearer ${accessToken}` }

    try {
        console.log(options)

        const res = await fetch(url, options);
        console.log('first res in api.js :', res)
        if (res.ok) return await res.json();

        if (res.status === 401) {
            let newTokenPromise;
            if (!isRefreshing) {
                isRefreshing = true;
                newTokenPromise = (async () => {
                    try {
                        const response = await fetch(
                            "http://localhost:4000/api/auth/refresh-token", {
                            method: "POST",
                            credentials: "include",
                        });
                        console.log("aaya response ", response)

                        if (!response.ok) {
                            throw new Error("connot refresh token");
                        }
                        const { newAccessToken } = await response.json();
                        console.log("newtoken: ", newAccessToken)
                        localStorage.setItem("accessToken", newAccessToken);
                        subscribersCallback();
                    } catch (error) {
                        refreshSubscribers = [];
                        localStorage.removeItem('accessToken');
                        throw error;
                    } finally {
                        isRefreshing = false;
                    }
                })();
            }

            try {
                if (newTokenPromise) {
                    await newTokenPromise;
                } else {
                    await new Promise(resolve => { refreshSubscribers.push(() => resolve()) })
                }
                const accessToken = localStorage.getItem('accessToken');
                options.headers.authorization = `Bearer ${accessToken}`
                const res = await fetch(url, options);
                return res.json();
            } catch (error) {
                throw error;
            }
        }
    } catch (error) {
        console.log("nai hua", error)
    }
}


const api = {
    async get(url, options = {}) {
        options = {
            ...options,
            method: "GET",
            headers: { "Content-type": "application/json" }
        }
        return await apiClient(url, options);
    },
    async post(url, data, options = {}) {
        options = {
            ...options,
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data),
        }
        return await apiClient(url, options);
    },
    async put(url, data, options = {}) {
        options = {
            ...options,
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data),
        }
        return await apiClient(url, options);
    },

}
export default api;
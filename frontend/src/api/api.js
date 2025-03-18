import axios from "axios";
import { optional } from "joi";
let isRefreshing = false;
let refreshSubscribers = [];

const subscribersCallback = (newToken) => {
    refreshSubscribers.forEach(cb => cb(newToken));
}

// const apiClient = async (url, options) => {
//     const accessToken = localStorage.getItem('accessToken');
//     console.log(accessToken)
//     options.headers = { ...options.headers, authorization: `Bearer ${accessToken}` }

//     try {
//         console.log(options)

//         const res = axios.get(url, options);
//         console.log('first res in api.js :', res)
//         if (res.ok) return await res.json();

//         if (res.status === 401) {
//             let newTokenPromise;
//             if (!isRefreshing) {
//                 isRefreshing = true;
//                 newTokenPromise = (async () => {
//                     try {
//                         const response = await fetch(
//                             "http://localhost:4000/api/auth/refresh-token", {
//                             method: "POST",
//                             credentials: "include",
//                         });
//                         console.log("aaya response ", response)

//                         if (!response.ok) {
//                             throw new Error("connot refresh token");
//                         }
//                         const { newAccessToken } = await response.json();
//                         console.log("newtoken: ", newAccessToken)
//                         localStorage.setItem("accessToken", newAccessToken);
//                         subscribersCallback();
//                     } catch (error) {
//                         refreshSubscribers = [];
//                         localStorage.removeItem('accessToken');
//                         throw error;
//                     } finally {
//                         isRefreshing = false;
//                     }
//                 })();
//             }

//             try {
//                 if (newTokenPromise) {
//                     await newTokenPromise;
//                 } else {
//                     await new Promise(resolve => { refreshSubscribers.push(() => resolve()) })
//                 }
//                 const accessToken = localStorage.getItem('accessToken');
//                 options.headers.authorization = `Bearer ${accessToken}`
//                 const res = await fetch(url, options);
//                 return res.json();
//             } catch (error) {
//                 throw error;
//             }
//         }
//     } catch (error) {
//         console.log("nai hua", error)
//     }
// }
// const api = {
//     async get(url, options = {}) {
//         options = {
//             ...options,
//             method: "GET",
//             headers: { "Content-type": "application/json" }
//         }
//         return await apiClient(url, options);
//     },
//     async post(url, data, options = {}) {
//         options = {
//             ...options,
//             method: "POST",
//             headers: { "Content-type": "application/json" },
//             body: JSON.stringify(data),
//         }
//         return await apiClient(url, options);
//     },
//     async put(url, data, options = {}) {
//         options = {
//             ...options,
//             method: "PUT",
//             headers: { "Content-type": "application/json" },
//             body: JSON.stringify(data),
//         }
//         return await apiClient(url, options);
//     },

// }

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
})

axiosInstance.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalReq = error.config;
        if (error.response.status != 401 || originalReq._retry || !error.response) {
            return Promise.reject(error);
        }

        originalReq._retry = true;
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                refreshSubscribers.push((newToken) => {
                    originalReq.headers.Authorization = `Bearer ${newToken}`;
                    resolve(axios(originalReq));
                });
            });
        }

        isRefreshing = true;

        try {
            const res = await axios.post("http://localhost:4000/api/auth/refresh-token",
                {},
                { withCredentials: true }
            );
            console.log("res for refresing : ", res)
            const newAccessToken = res.data.newAccessToken;
            localStorage.setItem("accessToken", newAccessToken);
            originalReq.headers.Authorization = `Bearer ${newAccessToken}`;

            subscribersCallback(newAccessToken);
            return axiosInstance(originalReq);
        } catch (error) {
            refreshSubscribers = [];
            localStorage.removeItem("accessToken");
            window.location.href = '/'
            console.log(error);
            return Promise.reject(error);
        } finally {
            isRefreshing = false;
        }
    }
)

const api = {
    request(method, url, data = {}, options = {}) {
        return axiosInstance({ method, url, data, ...options });
    },
    get: (url, options) => api.request('get', url, null, options),
    post: (url, data, options) => api.request('post', url, data, options),
    put: (url, data, options) => api.request('put', url, data, options),
    delete: (url, options) => api.request('delete', url, {}, options),
}


export default api;
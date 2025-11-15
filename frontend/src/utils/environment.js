export const isProd = import.meta.env.PROD;

// Disable console in production
// if (isProd) {
//     console.log = () => { };
//     console.warn = () => { };
//     console.error = () => { };
// }

// Export useful environment checks
export const getApiUrl = () => import.meta.env.VITE_API_URL;
export const getEnvironment = () => import.meta.env.MODE;
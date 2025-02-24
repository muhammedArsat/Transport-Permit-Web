import axios from "axios";

class UserService {
    static BASEURL = "http://localhost:8080";

    static async login(email, password) {
        try {
            const response = await axios.post(`${UserService.BASEURL}/auth/signin`, { email, password });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async register(email, password, phone, role) {
        try {
            const response = await axios.post(`${UserService.BASEURL}/auth/register`, { email, password, phone, role });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    static isAuthenticated() {
        const token = localStorage.getItem("token");
        const expirationTime = localStorage.getItem("expirationTime");
        return !!token && new Date().getTime() < expirationTime;
    }

    static getRole() {
        return localStorage.getItem("role");
    }
    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("expirationTime");
    }
}

export default UserService;

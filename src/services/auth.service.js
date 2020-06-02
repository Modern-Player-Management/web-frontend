import axios from "axios";

const API_URL = "https://api-mpm.herokuapp.com/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "authenticate", {
                username,
                password
            })
            .then(response => {
                if (response.data.token) {
                    sessionStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        sessionStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "register", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('user'));
        ;
    }

    getCurrentUserID() {
        return JSON.parse(sessionStorage.getItem('id'));
        ;
    }
}

export default new AuthService();

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
                console.log(response.data);
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "register", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
        ;
    }
}

export default new AuthService();

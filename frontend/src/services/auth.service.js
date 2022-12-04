const AuthURL = "http://localhost:8080/user/";

class AuthServices {
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
    logout() {
        localStorage.removeItem("user");
    }

    login(username, password) {
        fetch(AuthURL + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default new AuthServices();

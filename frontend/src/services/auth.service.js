const AuthURL = "http://localhost:8080/api/users/";

class AuthServices {
    getCurrentUser() {
        if (localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user"));
        }
        return null;
    }
    logout() {
        console.log("logout");
        localStorage.removeItem("user");
    }

    async login(username, password) {
        const data = fetch(AuthURL + "login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const response = await data;
        const user = await response.json();

        console.log("user: ", user);
        localStorage.setItem("user", JSON.stringify(user));
        console.log(localStorage);

        return user;
    }
}

export default new AuthServices();

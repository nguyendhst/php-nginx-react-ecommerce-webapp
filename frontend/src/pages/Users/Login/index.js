import React, { useEffect } from "react";

import { Button, Form } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

import AuthServices from "../../../services/auth.service";

const login = (e) => {
    e.preventDefault();
    // Get username and password
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Call login service
    AuthServices.login(username, password).then((response) => {
        // if user is admin, redirect to admin dashboard
        if (response.user_info.role === "Admin") {
            window.location.href = "/dashboard";
        } else {
            // if user is not admin, redirect to home page
            window.location.href = "/";
        }
    });
};

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthServices.getCurrentUser();
        if (user) {
            if (user.role === "Admin") {
                navigate("/dashboard", { replace: true });
            }
            navigate("/", { replace: true });
        }
    }, []);

    return (
        // Login form
        <Form>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Button
                variant="primary"
                type="button"
                onClick={(e) => {
                    login(e);
                }}
            >
                Login
            </Button>
            {/* Register link */}
            <Form.Text className="text-muted">
                Don't have an account?{" "}
                <Link to="/users/register">Register</Link>
            </Form.Text>
        </Form>
    );
}

export default Login;

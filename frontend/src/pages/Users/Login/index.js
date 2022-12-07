import React, { useEffect } from "react";

import {  Col, Button, Row, Container, Card, Form } from "react-bootstrap";

import { Link, Navigate } from "react-router-dom";

import AuthServices from "../../../services/auth.service";

const login = (e) => {
    e.preventDefault();
    // Get username and password
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username, password)

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
    return (
        // Login form
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="mb-5">
                                        Welcome back!
                                    </h2>
                                    <div className="mb-3">
                                        <Form>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="username"
                                            >
                                                <Form.Label className="text-center">
                                                    Username
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter username"
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="password"
                                            >
                                                <Form.Label>
                                                    Password
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            >
                                                <p className="small">
                                                    <a
                                                        className="text-primary"
                                                        href="#!"
                                                    >
                                                        Forgot password?
                                                    </a>
                                                </p>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button
                                                    variant="primary"
                                                    type="button"
                                                    onClick={login}
                                                >
                                                    Login
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Don't have an account?{" "}
                                                <a
                                                    href="/users/register"
                                                    className="text-primary fw-bold"
                                                >
                                                    Sign Up
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;
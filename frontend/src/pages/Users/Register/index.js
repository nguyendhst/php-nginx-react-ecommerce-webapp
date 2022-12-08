import React, { useEffect } from "react";

import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

import { Link, Navigate } from "react-router-dom";

import "./style.css";

import AuthServices from "../../../services/auth.service";

const registerAPI = "http://localhost:8080/api/users/register";

function validateData(body) {
    //username must be alphanumeric and between 6-20 characters
    if (!body.username.match(/^[a-zA-Z0-9]{6,20}$/)) {
        alert("Username must be alphanumeric and between 6-20 characters");
        return false;
    }
    //password must be alphanumeric and between 6-20 characters
    if (!body.password.match(/^[a-zA-Z0-9]{6,20}$/)) {
        alert("Password must be alphanumeric and between 6-20 characters");
        return false;
    }
    //email must be valid
    if (!body.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        alert("Email must be valid");
        return false;
    }
    //first name must be alphabetic and between 2-20 characters
    if (!body.fname.match(/^[a-zA-Z]{2,20}$/)) {
        alert("First name must be alphabetic and between 2-20 characters");
        return false;
    }
    //last name must be alphabetic and between 2-20 characters
    if (!body.lname.match(/^[a-zA-Z]{2,20}$/)) {
        alert("Last name must be alphabetic and between 2-20 characters");
        return false;
    }
    //phone must be numeric and between 10-20 characters
    if (!body.phone.match(/^[0-9]{10,20}$/)) {
        alert("Phone must be numeric and between 10-20 characters");
        return false;
    }
    //year of birth must be valid
    if (!body.yob.match(/^[0-9]{4}$/)) {
        alert("Year of birth must be valid");
        return false;
    }

    return true;
}

const register = (e) => {
    e.preventDefault();

    // Get username and password
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const phone = document.getElementById("phone").value;
    const yob = document.getElementById("yob").value;

    const body = {
        username: username,
        password: password,
        email: email,
        fname: fname,
        lname: lname,
        phone: phone,
        yob: yob,
    };

    if (!validateData(body)) {
        return;
    }

    // Call register service
    const res = fetch(registerAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    // wait til promise is resolved
    res.then((data) => {
        if (data.status === 200) {
            alert("Register success! Please login to continue");
            window.location.href = "/users/login";
        } else {
            alert("Register failed! Please try again");
            window.location.href = "/register";
        }
    });
};

function Register() {
    // Check if user is logged in
    const user = JSON.parse(AuthServices.getCurrentUser());
    console.log("logged in as: ", user);
    if (user) {
        if (user.user_info.role === "Admin") {
            return <Navigate to="/dashboard" />;
        } else {
            return <Navigate to="/" />;
        }
    }

    return (
        // Register form
        <div className="Register-wrapper">
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="mb-5">
                                        Create a new account
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
                                                controlId="email"
                                            >
                                                <Form.Label className="text-center">
                                                    Email
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="fname"
                                            >
                                                <Form.Label className="text-center">
                                                    First Name
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter first name"
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="lname"
                                            >
                                                <Form.Label className="text-center">
                                                    Last Name
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter last name"
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="phone"
                                            >
                                                <Form.Label className="text-center">
                                                    Phone
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter phone number"
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="yob"
                                            >
                                                <Form.Label className="text-center">
                                                    Year of Birth
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter year of birth"
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

                                            <div className="d-grid">
                                                <Button
                                                    variant="primary"
                                                    type="button"
                                                    onClick={register}
                                                >
                                                    Register
                                                </Button>
                                            </div>
                                        </Form>
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

export default Register;

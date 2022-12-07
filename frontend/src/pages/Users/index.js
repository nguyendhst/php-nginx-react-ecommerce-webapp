import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import { useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import AuthServices from "../../services/auth.service";
import Login from "./Login";

function Users() {
    const navigation = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = AuthServices.getCurrentUser();
        if (user) {
            setUser(user);
        } else {
            console.log("No user found");
            navigation("/users/login");
        }
    }, []);    

    

    return (
        <>
        <Container>
            <div>
                <h1>Users</h1>
            </div>
        </Container>
        </>
    );
}

export default Users;

import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import { useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";

import { redirect } from "react-router-dom";

import AuthServices from "../../services/auth.service";
import Login from "./Login";

function Users() {
    
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthServices.getCurrentUser();
        if (!user) {
            redirect("/login");
        } else if (user.role === "Admin") {
            redirect("/dashboard");
        }
        setCurrentUser(user);
    }, []);

    // add route

    return (
        <Container>
            <div>
                <h1>Users</h1>
            </div>
         
        </Container>
    );
}

export default Users;

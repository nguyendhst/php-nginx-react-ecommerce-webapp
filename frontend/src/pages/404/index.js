import { React } from "react";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

function NotFound() {
    setTimeout(() => {
        window.location.href = "/";

    }, 3000);
    return (
        <Container>
            <h1>404 Not Found</h1>
            <h3>
                Redirecting to home page in 3 seconds...
            </h3>
        </Container>
    );
}

export default NotFound;

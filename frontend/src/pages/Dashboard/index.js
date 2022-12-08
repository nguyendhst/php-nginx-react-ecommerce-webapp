import React from "react";
import { useEffect, useState } from "react";
import {
    Card,
    Col,
    Container,
    Row,
    Table,
    Nav,
    Tab,
    Tabs,
} from "react-bootstrap";

const productsCols = [
    "id",
    "name",
    "category",
    "price",
    // "main_image",
    // "category",
    // "images",
];

const userCols = ["username", "fname", "lname", "email", "phone"];  

function DashBoard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState("products");
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState(productsCols);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `http://localhost:8080/api/${currentTab}/list`
            );
            const data = await response.json();
            console.log(data);
            setData(JSON.parse(data));
            setLoading(false);
        };
        fetchData();

        if (currentTab === "products") {
            setColumns(productsCols);
        } else {
            setColumns(userCols);
        }
    }, []);

    useEffect(() => {
        console.log("tab changed");
        const fetchData = async () => {
            const response = await fetch(
                `http://localhost:8080/api/${currentTab}/list`
            );
            const data = await response.json();
            console.log(data);
            setData(JSON.parse(data));
            setLoading(false);
        };
        fetchData().then(() => {
            if (currentTab === "products") {
                setColumns(productsCols);
            } else {
                setColumns(userCols);
            }
        });
    }, [currentTab]);

    return (
        <div>
            <Container>
                <Nav
                    fill
                    variant="tabs"
                    defaultActiveKey="products"
                    onSelect={(selectedKey) => setCurrentTab(selectedKey)}
                >
                    <Nav.Item>
                        <Nav.Link eventKey="products">Products</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="users">Users</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Table>
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th>{col}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(data).map((key) => (
                            <tr>
                                {columns.map((col) => (
                                    <td>{data[key][col]}</td>
                                ))}
                                <td>
                                    <button
                                        onClick={() => {
                                            console.log("edit");
                                        }}
                                        className="btn btn-primary"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            console.log("delete");
                                        }}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default DashBoard;

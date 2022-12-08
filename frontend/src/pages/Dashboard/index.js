import React from "react";
import { useEffect, useState } from "react";
import { Container, Table, Nav, Pagination } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import AuthServices from "../../services/auth.service";

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
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState("products");
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [columns, setColumns] = useState(productsCols);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const user = JSON.parse(AuthServices.getCurrentUser());

        if (user) {
            if (user.user_info.role !== "Admin") {
                navigate("/");
            }
        } else {
            navigate("/users/login");
        }

        console.log("logged in as: ", user);
        setUser(user);
        setLoading(false);

        const fetchData = async () => {
            // authorization header
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            };
            const response = await fetch(
                `http://localhost:8080/api/${currentTab}/list`,
                {
                    method: "GET",
                    headers: headers,
                }
            );

            const data = await response.json();
            console.log(data);
            setData(JSON.parse(data));
            setPageData(JSON.parse(data).slice(0, itemsPerPage));
            setTotalPages(Math.ceil(JSON.parse(data).length / itemsPerPage));

            setLoading(false);
        };
        fetchData().then(() => {
            if (currentTab === "products") {
                setColumns(productsCols);
            } else {
                setColumns(userCols);
            }
        });
    }, []);

    useEffect(() => {
        console.log("tab changed");
        const fetchData = async () => {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            };
            const response = await fetch(
                `http://localhost:8080/api/${currentTab}/list/all`,
                {
                    method: "GET",
                    headers: headers,
                }
            );
            const data = await response.json();
            console.log(data);
            setData(JSON.parse(data));
            setPageData(JSON.parse(data).slice(0, itemsPerPage));
            setTotalPages(Math.ceil(JSON.parse(data).length / itemsPerPage));
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

    useEffect(() => {
        console.log("page changed");
        setPageData(
            data.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
            )
        );
    }, [currentPage]);

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
                    <Nav.Item>
                        <Nav.Link eventKey="news">News</Nav.Link>
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
                        {Object.keys(pageData).map((key) => (
                            <tr>
                                {columns.map((col) => (
                                    <td>{pageData[key][col]}</td>
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
                <Pagination>
                    <Pagination.First
                        onClick={() => {
                            setCurrentPage(1);
                        }}
                    />
                    <Pagination.Prev
                        onClick={() => {
                            if (currentPage > 1) {
                                setCurrentPage(currentPage - 1);
                            }
                        }}
                    />
                    {Array.from(Array(totalPages).keys()).map((page) => (
                        <Pagination.Item
                            onClick={() => {
                                setCurrentPage(page + 1);
                            }}
                        >
                            {page + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => {
                            if (currentPage < totalPages) {
                                setCurrentPage(currentPage + 1);
                            }
                        }}
                    />
                    <Pagination.Last
                        onClick={() => {
                            setCurrentPage(totalPages);
                        }}
                    />
                </Pagination>
            </Container>
        </div>
    );
}

export default DashBoard;

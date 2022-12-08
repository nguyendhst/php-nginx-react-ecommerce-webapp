import React from "react";

import { Route, Routes } from "react-router-dom";

const Sidebar = () => {
    return (
        <div
            class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
            style={{ width: "280px" }}
        >
            <a
                href="/"
                class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
                <span class="fs-4">Sidebar</span>
            </a>
            <hr />
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <a href="#" class="nav-link active" aria-current="page">
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link text-white">
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link text-white">
                        Orders
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link text-white">
                        Products
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link text-white">
                        Customers
                    </a>
                </li>
            </ul>
            <hr />
            <div class="dropdown">
                
                <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li>
                        <a class="dropdown-item" href="#">
                            New project...
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">
                            Settings
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">
                            Profile
                        </a>
                    </li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">
                            Sign out
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;

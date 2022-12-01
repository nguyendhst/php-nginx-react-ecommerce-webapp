import React, { useState, useEffect } from "react";
import axios from "axios"
import { Link, useParams } from "react-router-dom";

const News = () => {
    const css = `
                    main {
                        background-color: #f1f1f1;
                    }
                    a:hover{
                        margin-left: 5px;
                        color: #2b384c
                    }
                    img, figure {
                        max-width: 100%;
                    }
                    @media (max-width: 991px){
                        .post{
                            max-width: 720px;
                            min-width: 360px;
                        }
                    }
                    @media (max-width: 1025px){
                        .post{
                            max-width: 720px;
                            min-width: 320px;
                        }
                    }
                `

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    function getPosts() {
        axios.get("http://localhost:80/api/post").then(function(response){
            setPosts(response.data);
        });
    }

    const handleHover = (event) => {
        event.target.style.backgroundColor = 'rgba(0,0,0,0.6)';
        event.target.style.margin = '0px';
    }

    const handleNormal = (event) => {
        event.target.style.backgroundColor = 'rgba(0,0,0,0)';
        event.target.style.margin = '0px';
    }

    return(
        <div className="Wrap" style={{marginTop: "50px"}}>
            <style>{css}</style>
            <div className="row g-4 justify-content-center">
            <div className="col-10 col-lg-6 col-md-8 main-content">
                <div className="p-3 border bg-white px-4" style={{padding: 20}}>
                    <h1 style={{borderBottom: "2px solid black", color: "#011c45"}}>News</h1>
                    <div className="row gx-4 justify-content-center">
                    {posts.map((post, key) =>
                        <div key={key} className="p-3 post col-6 col-lg-6 col-sm-6 p-3">
                            <div
                                className="shadow bg-white rounded"
                                //style={{background: `url($post.img)`,
                                style={{background: "url('https://lh4.googleusercontent.com/a-bIo5GUG5zfVX2tpbouMFxcHNpHsK3JyUzZ9c0IDgwiil2XE-wCTikat8QAbhJR2Nh3zBU2Z31Yc8QKYh61cunP1oBDikXnLz72YcGC8OZGMrWBA9GsisnnUvfko9otK-jUMO9U')",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "100% 100%",
                                        width: "100%",
                                        height: "300px",
                                        position: "relative",
                                        boxShadow: "5px 5px #888888"
                                    }}>
                                <Link   style={{color: "White", 
                                            textAlign: "botton",
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            width: "100%",
                                            minHeight: "50px",
                                            padding: 2
                                            }}
                                        onMouseOver={handleHover}
                                        onMouseOut={handleNormal}
                                        to={{ pathname: `/post/${post.id}`}}>
                                    {post.title}
                                </Link>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            <div className="col-10 col-lg-3 col-md-8 right-side-bar">
                <div className="p-3 border bg-white">
                    <div style={{borderBottom: "1px black solid", paddingBottom: "8px", fontWeight: "600"}}>
                        <span className="">
                        <i className="fa fa-search" style={{color: "white", backgroundColor:"#35bc7a", padding: "6px", marginRight: "10px"}}></i>
                        Tìm kiếm
                    </span>
                    </div>
                    <div style={{marginTop: "20px"}}>
                        <form action="" style={{position: "relative"}}>
                            <input type="text" style={{height: "35px",float: "left",width: "85%",color: "white", border: "0px", backgroundColor: "#26414c",padding: "4px"}} placeholder="Nhập từ khóa"/>
                            <button type="submit" style={{height: "35px",width: "15%", border: "0px",backgroundColor:"#35bc7a"}}>
                                <i className="fa fa-search" style={{color: "white"}}></i>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="p-3 border bg-white" style={{marginTop: "20px"}}>
                    <div style={{borderBottom: "1px black solid", paddingBottom: "8px", fontWeight: "600"}}>
                        <span className="">
                        <i className="fa fa-th-list" style={{color: "white",backgroundColor:"#35bc7a", padding: "6px", marginRight: "10px"}}></i>
                        Dịch vụ
                    </span>
                    </div>
                    <div>
                        <div style={{padding: "5px", borderBottom: "1px dashed #c1c1c1"}}>
                            <i className="fa fa-check" style={{marginRight: "10px"}}></i>
                            <a href="#">Sản phẩm dự bị</a>
                        </div>
                        <div style={{padding: "5px", borderBottom: "1px dashed #c1c1c1"}}>
                            <i className="fa fa-check" style={{marginRight: "10px"}}></i>
                            <a href="#">Sản phẩm dự bị</a>
                        </div>
                        <div style={{padding: "5px", borderBottom: "1px dashed #c1c1c1"}}>
                            <i className="fa fa-check" style={{marginRight: "10px"}}></i>
                            <a href="#">Sản phẩm dự bị</a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};


export default News;

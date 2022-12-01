import React, { useState, useEffect } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
const Post = () => {
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

    `
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPosts();
    }, []);
    const {id} = useParams();
    function getPosts() {
        axios.get(`http://localhost:80/api/post/${id}`).then(function(response){
            setPosts(response.data[0]);
        });
    }

    return(
        
        <div className="Wrap" style={{marginTop: "50px"}}>
            <style>{css}</style>
            <div className="row g-4 justify-content-center">
            <div className="col-lg-6 main-content">
                <div className="p-3 border bg-white shadow mb-5 bg-white rounded" style={{padding: 20}}>
                    <h3>{posts["title"]}</h3>
                    {/* <StringToJSX domString={posts["content"]}/> */}
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(posts["content"]) }} />
                </div>
                <div className="p-3 border bg-white" style={{margin: '20px 0px 20px 0px'}}>
                    Bình luận
                </div>
            </div>
            <div className="col-lg-3 right-side-bar">
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


export default Post;

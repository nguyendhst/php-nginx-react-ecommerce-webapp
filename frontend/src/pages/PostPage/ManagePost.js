import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"


const ManagePost = () => {
    const css = `
    *{
        word-wrap: break-word;
    }
    .table-dark>th {
        background-color: #000000;
    }
    .post_img{
        width: 200px;
        height: auto;
    }
    .btn-success{
        background-color:#28a745;
    }
    .btn-warning{
        background-color:#ffc107;
        margin-left: 5px;
    }
    .btn-danger{
        background-color:#dc3545;
        margin-left: 5px;
    }
    .btn-primary{
        background-color:#007bff;
        margin-left 5px;
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
    const deletePost = (id) => {
        axios.delete(`http://localhost:80/api/post/${id}/delete`).then(function(response){
            getPosts();
        });
    }
    return(
        
        <div className="Wrap" style={{margin: "50px 20px 0px 20px"}}>
            <style>{css}</style>
            <h1 style={{textAlign: "center", borderBottom: "2px solid black", paddingBottom: "10px"}}>Quản lý bài viết</h1>
            <Link to={`/post/createpost`} className="btn btn-primary" style={{marginBottom: "20px"}}>Create new post</Link>
            <table className="table" style={{width: "100%"}}>
            <thead>
                <tr className="table-dark">
                    <th scope="col-1" style={{width: "2%", textAlign: "center", borderBottom: 0, borderLeft: "1.5px solid #000"}}>ID</th>
                    <th scope="col-2" style={{width: "10%", textAlign: "center", borderBottom: 0}}>Title</th>
                    <th scope="col-3" style={{width: "60%", textAlign: "center", borderBottom: 0}}>Short description</th>
                    <th scope="col-5" style={{width: "10%", textAlign: "center", borderBottom: 0}}>Image</th>
                    <th scope="col-6" style={{width: "10%", textAlign: "center", borderBottom: 0, borderRight: "1.5px solid #000"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post, key) =>
                    <tr key = {key}>
                        <td className="align-middle" style={{border: "1.5px solid #e0e0d1", borderTop: 0}}>{post.id}</td>
                        <td className="align-middle" style={{border: "1.5px solid #e0e0d1", borderTop: 0}}>{post.title}</td>
                        <td className="align-middle" style={{border: "1.5px solid #e0e0d1", borderTop: 0}}>{post.description}</td>
                        <td className="align-middle" style={{border: "1.5px solid #e0e0d1", borderTop: 0, textSlign: "center"}}><img className="post_img" src={post.image} alt=""/></td>
                        <td className="text-nowrap align-middle" style={{border: "1.5px solid #e0e0d1", borderTop: 0}}>
                            <Link to={{ pathname: `/post/${post.id}`}} className="btn btn-success">Read</Link>
                            <Link to={{ pathname: `/post/${post.id}/editpost`}} className="btn btn-warning">Edit</Link>
                            <a onClick={() => deletePost(post.id)} className="btn btn-danger">Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
    );
};


export default ManagePost;

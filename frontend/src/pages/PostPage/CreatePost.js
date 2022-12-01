import {React, useState} from "react";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom";

const CreatePost = () => {
    const css = `
    .btn-primary{
        background-color:#007bff;
    }
    .notice{
        color: red;
    }
    
    `
    // --------------handleSubmit---------------
    var isValid = 1;
    var titleMessage = "";
    var descriptionMessage = "";
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const [messages, setMessages] = useState([]);
    const handleChangeFile = (event) => {
        var formData = new FormData();
		formData.append('File', event.target.files[0]);
        //

    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
        setMessages(values => ({...values, [name]:""}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if(inputs.title.length > 65 || inputs.title.length <= 0){
            setMessages(values => ({...values, ["title"]:"Title must be 1-65 characters"}));
            isValid = 0;
        }
        if(inputs.description.length > 160 || inputs.description.lenght <= 0){
            setMessages(values => ({...values, ["description"]:"Description must be 1-160 characters"}));
            isValid = 0;
        }
        if(inputs.data.length < 100){
            setMessages(values => ({...values, ["data"]:"At least 100 characters in this field"}));
            isValid = 0;
        }
        if(isValid === 1){
            axios.post('http://localhost:80/api/post/save', inputs).then(function(response){
                navigate('/managepost');
    
            });
        }

    }
    // -----------------------------------------


    return(
        <div className="Wrap" style={{margin: "50px 20px 0px 20px"}}>
            <style>{css}</style>
            <h1 style={{textAlign: "center", borderBottom: "2px solid black", paddingBottom: "10px"}}>CREATE NEW POST</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="id" className="form-label">Post ID</label>
                <input type="number" className="form-control" id="id" name="id" onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Post title</label>
                <input type="text" className="form-control" id="name" name="title" onChange={handleChange}/>
                <p className="notice">{messages.title}</p>
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Post image</label>
                <div>

                <input type="file" className="" id="image" name="image" onChange={handleChangeFile}/>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Post short description</label>
                <input type="text" className="form-control" name="description" onChange={handleChange}/>
                <p className="notice">{messages.description}</p>
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Post content</label>
                <p className="notice">{messages.data}</p>
                <CKEditor
                    editor={ Editor }
                    data=""
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setInputs(values => ({...values, ["data"]:data}));
                    } }
                />
            </div>
            
            <button type="submit" className="btn btn-primary" >Submit</button>
            </form>   
            
        </div>
    );
};


export default CreatePost;

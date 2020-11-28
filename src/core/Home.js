import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import axios from 'axios'
import uuid from 'react-uuid'
import {BASE_URL} from "../config.js"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

//{JSON.stringify(slots)}
const Home=()=>{
	const [value,setValue]=useState("")
    const [posts,setPost]=useState([])
		const handleChange=(e,editor)=>
		{
			//console.log(editor.getData())
			const data=editor.getData()
			setValue(data);
			console.log(value)
		}
		const handleSubmit=()=>
		{

			console.log("form data"+value);
		}

		useEffect(() => {
                 fetch('http://localhost:8000/api/showpost')
        .then(response => response.json())
          .then(data => 
             {     
                setPost(data)
                 console.log("result"+data)
            }
            );
             }, []);
	return (
		  <div className="container">
                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello write your post here</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                   onChange={handleChange}
                    onBlur={ ( event, editor ) => {
                        //console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                       // console.log( 'Focus.', editor );
                    } }
                />
                <button onClick={handleSubmit} className="btn btn-primary" style={{"float":"right"}} >Post</button>
               
                <div className="posts">
                {posts.map((home ,i)=> <div>
                      <Link>
                      <h6 title="click to read"> {i+1}.{home.postdata.slice(0,100)}</h6>
                      <p>submitted by: {home.user}</p>
                      </Link>
                    </div>)}
                </div>
            </div>
		)

}

export default Home














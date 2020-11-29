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
import stripHtml from "string-strip-html"
//{JSON.stringify(slots)}
const Home=()=>{
	const [value,setValue]=useState("")
    const [posts,setPost]=useState([])
    const {user}=isAuthenticated()
    const userid=user._id
    const username=user.name
		const handleChange=(e,editor)=>
		{
			//console.log(editor.getData())
			const data=editor.getData()
			setValue(data);
			console.log(value)
		}
		const handleSubmit=()=>
		{
        
        const PostData={userid,username,value}
            fetch(`http://localhost:8000/api/createpost`,{//it is correct till here
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(PostData)

        })
    .then(response=>{
      window.alert("published")
      window.location.reload(false);

    })
    .catch(err=>{
        console.log(err)
    })
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
		  <div className="container"  id="ckeditor">
               
                <CKEditor

                    editor={ ClassicEditor }
                    data="<p>Hello! write your post here</p>"
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
                {posts.map((home ,i)=> <div >
                      <Link id="news" to={`showpost/${home._id}`} >
                      <h6 title="click to read full post"> {i+1}.{stripHtml(home.value.slice(0,170)).result} </h6>
                      <div style={{"margin-bottom":"20px","border":"1px solid black"}}>
                      <p style={{"float":"right"}}>submitted by: {home.username} |  Read  more</p>
                      </div>
                      </Link>
                    </div>)}
                </div>
            </div>
		)

}

export default Home














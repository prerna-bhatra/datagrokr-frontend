import React,{useEffect,useState} from 'react'
import './core.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Layout from './Layout'
import stripHtml from "string-strip-html"


const ShowPost=()=>{
		const [username,setUsername]=useState("")
		const [post,setPost]=useState("")
		const {postid}=useParams()
			useEffect(() => {
                 fetch(`http://localhost:8000/api/showpostbyid/${postid}`)
        .then(response => response.json())
          .then(data => 
             {     
             	setUsername(data.username)

               setPost(stripHtml(data.value).result)
                 console.log("result"+data)
            }
            );
             }, []);
     console.log({postid})
	return (
		<Layout>
			<div className="container">
				Submitted By-: {username}
				<p>{post}</p>
			</div>
		</Layout>
			)

}
export default ShowPost
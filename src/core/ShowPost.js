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
import {isAuthenticated} from '../auth'

const ShowPost=()=>{
		const [username,setUsername]=useState("")
		const [post,setPost]=useState("")
		const [commentpost,setCommentpost]=useState("")
		const [comment,setComment]=useState([])
		const {postid}=useParams()
		const {user}=isAuthenticated()
		const userid=user._id
		 const handleclick=()=>
		 {
		 	 const commentdata={userid,commentpost,postid}
		 	 console.log(commentdata)
           	  fetch(`http://localhost:8000/api/createcomment/${userid}`,{//it is correct till here
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(commentdata)
		        })
		    .then(response=>{
		      window.alert("comment added")
		      window.location.reload(false);

		    })
		    .catch(err=>{
		        console.log(err)
		    })
		 }

		const handleChange=(e)=>
		{
			setCommentpost(e.target.value);
		}
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
		  fetch(`http://localhost:8000/api/showcomment/${postid}`)
        .then(response => response.json())
          .then(data => 
             {     
             	setComment(data.response)
                console.log("comment"+data.response.comment)

            }
            );

             }, []);
     
	return (
		<Layout>
			<div className="container">
				Submitted By-: {username}
				<p>{post}</p>
				<div className="row" id="comment-box">
				<div className="col-md-11">
				<input onChange={handleChange} type="text"  className="form-control" placeholder="comment"  required/>
				</div>
				<div className="col-md-1">
				<button onClick={handleclick} style={{"float":"right"}}  className="btn btn-primary">post</button>
				</div>
			</div>
			<div className="comment-section">
				<div>
					{comment.map((home ,i)=> <div   className="comment-section-user">
						<button  style={{"float":"right"}} id="ellipsis"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                     	<h6> {home._id} said</h6>
                     	<p>{home.commentpost}</p>
                     	</div>)}
				</div>
				</div>
			</div>
		</Layout>
			)

}
export default ShowPost









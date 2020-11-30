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
import {BASE_URL} from "../config.js"

const ShowPost=()=>{
		const [username,setUsername]=useState("")
		const [post,setPost]=useState("")
		const [commentpost,setCommentpost]=useState("")
		const [comment,setComment]=useState([])
		const {postid}=useParams()
		const {user}=isAuthenticated()
		const userid=user._id
		const nameuser=user.name
		 const handleclick=()=>
		 {
		 	 const commentdata={userid,commentpost,postid,nameuser}
		 	 console.log(commentdata)
           	  fetch(`${BASE_URL}/createcomment/${userid}`,{//it is correct till here
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

		const deletecomment=(commentid)=>
		{
			console.log("commentid on click deletecomment"+commentid)
			 fetch(`${BASE_URL}/deletecomment/${commentid}`)
			        .then(response => response.json())
			          .then(data => 
			             {     
			             	 window.alert("comment deleted")
		      				window.location.reload(false);
			            }
			            );

		}

		const editcomment=(commentid,commentvalue)=>
		{
			console.log("commentid on click editcomment"+commentid)
			const UpdatedComment=window.prompt("update",commentvalue)
			console.log(UpdatedComment)
			  fetch(`${BASE_URL}/updatecomment/${commentid}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({commentpost:UpdatedComment})

			   })
		    .then(response=>{


		    })
		    .catch(err=>{
		        console.log(err)
		    })
		    window.alert("comment updated")
		      window.location.reload(false);

		}

		const showDeleteButton=(commentid)=>
		{
			console.log("commentid"+commentid)
			return <button  onClick={() => deletecomment(commentid)}  style={{"float":"right"}}  id="ellipsis"><i class="fa fa-trash" aria-hidden="true"></i></button>	
				
		}


		const showEditButton=(commentid,commentvalue)=>
		{
			return <button  onClick={() => editcomment(commentid,commentvalue)}    style={{"float":"right"}}  id="ellipsis"><i class="fa fa-pencil" aria-hidden="true"></i></button>	
			
		}
		

			useEffect(() => {
                 fetch(`${BASE_URL}/showpostbyid/${postid}`)
			        .then(response => response.json())
			          .then(data => 
			             {     
			             	setUsername(data.username)
			             	  setPost(stripHtml(data.value).result)
			                 console.log("result"+data)
			            }
			            );
		  fetch(`${BASE_URL}/showcomment/${postid}`)
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
				<center><h6>Submitted By-: {username}</h6></center>
				<br/>
				
				<p className="postdata">{post}</p>
				<div className="row" id="comment-box">
				<div className="col-md-11">
				<input onChange={handleChange} type="text"  className="form-control" placeholder="add a comment "  required/>
				</div>
				<div className="col-md-1">
				<button onClick={handleclick} style={{"float":"right"}}  className="btn btn-primary">post</button>
				</div>
			</div>
			<div >
				<div>
					{comment.map((home ,i)=> <div   className="comment-section-user">
						{home.nameuser===nameuser ? showDeleteButton(home._id) : ''}
						{home.nameuser===nameuser ? showEditButton(home._id,home.commentpost) : ''}
                     	<h6> {home.nameuser} said</h6>
                     	<p>{home.commentpost}</p>
                     	<input className="form-control" placeholder="add a reply " />
                     	</div>)}
				</div>
				</div>
			</div>
		</Layout>
			)

}
export default ShowPost









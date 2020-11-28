import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
const Dashboard =()=>
{
	const {user:{_id,name,email,role,address,contact}}=isAuthenticated()



	const userInfo=()=>{
		return (
			<div className="card md-5">
				<h3 className="card-header">My Profile</h3>
				<ul className="list-group">
					<li className="list-group-item">
					{name}
					</li>
					<li className="list-group-item">
					{email}
					</li>
					<li className="list-group-item">
					{contact}
					</li>
					<li className="list-group-item">
					{role===1 ?'Admin' :"Registred User"}
					</li>
				</ul>
			</div>
			)

	}



	return (
		<Layout title="Good Day"  description=" " className="container">
			<div className="row">
				<div className="col-md-11">
				{userInfo()}
				</div>
			</div>
			
		</Layout>
		)
}

export default Dashboard






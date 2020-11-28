import React,{Fragment} from 'react'
import {Link,withRouter,Redirect} from 'react-router-dom'
import {signout,isAuthenticated} from '../../auth'
import logo from './social.jpg'
import './menu.css'
const Menu=()=>{
	const {user,token}=isAuthenticated()
return (
	<div >
		<ul className="nav  " style={{background:"#333333",padding:"1px 1px 1px 1px" , position: "fixed",top:" 0", width: "100%","z-index":"1"}}>
			<li className="nav-item">
				<Link className="nav-link " style={{color:'white'}} to="/">
					<img style={{"width":"120px",height:"40px"}} src={require('./social.jpg')}></img>
				</Link>
			</li>
			{isAuthenticated()  && isAuthenticated().user.role===0 && (
					<li className="nav-item">
				<Link className="nav-link " id="nav-link" style={{color:'white'}} to="/dashboard">
					DASHBOARD
				</Link>
				</li>

				)}

				{isAuthenticated()  && isAuthenticated().user.role===1 && (
					<li className="nav-item">
				<Link className="nav-link "  id="nav-link"  style={{color:'white'}} to="/admin/dashboard">
					My Dashboard
				</Link>
			</li>

				)}
			
			
			
		
			{!isAuthenticated() && (
				<Fragment>
				<li className="nav-item">
					<Link className="nav-link "  id="nav-link"  style={{color:'white'}} to="/singin">SIGNIN</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link "  id="nav-link"  style={{color:'white'}} to="/signup">SIGNUP</Link>
				</li>
				</Fragment>
				)}



				{isAuthenticated() && (
				<Fragment>
				<li className="nav-item">
							<Link className="nav-link "  id="nav-link"  style={{cursor:'pointer',color:'white'}} onClick={()=>signout(()=>{
					return <Redirect to='/'  />
						})}>
						SIGNOUT</Link>
				</li>
				</Fragment>

				)}
			
		</ul>
	</div>

	)
	
}


export default Menu
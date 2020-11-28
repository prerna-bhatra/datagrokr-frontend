import React ,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import {API} from '../config'
import {signin,authenticate,isAuthenticated} from '../auth'

const Signin=()=>{
	const [values,setValues]=useState({
		email:'',
		password:'',
		error:'',
		loading:false,
		redirectToReferrer:false,
	})
	const {user}=isAuthenticated()

	const handleChange=name=>event=>{
			setValues({...values,error:false,[name]:event.target.value})
	}

	const {email,password,error,loading,redirectToReferrer}=values
	
	const clickSubmit=(event)=>{
		//prevent the page to reload
			event.preventDefault()
			setValues({...values,error:false,loading:true})
			signin({email,password})
			.then(data=>{
				if( email==='' ||  password==='' || data.err)
				{
					setValues({...values,error:"Invalid credentials ",loading:false})
				}
				else{
					authenticate(data,()=>{
					setValues({...values,
						redirectToReferrer:true
						})
						window.location.reload(false)

					})
				}

			})

	}

	const SignUpForm=()=>(
		<form action="">
			<div className="form-group">	
				<label className="text-muted">Email</label>
				<input required  type="email" value={email} className="form-control" onChange={handleChange('email')}   />
			</div>
			<div className="form-group">	
				<label className="text-muted">Password</label>
				<input  required type="password" value={password} className="form-control" onChange={handleChange('password')}/>
			</div>
			<button onClick={clickSubmit} className="btn btn-primary" >Login</button>
		</form>
	)

	const showError=()=>{
		return (
		<div  className="alert alert-danger" style={{display:error?'':'none'}}>
			{error}
		</div>)
	}

	const showLoading=()=>{
		return (loading && <div  className="alert alert-info" >
			<h2>Loading.. please wait</h2>
		</div>)
	}

	const redirectUser=()=>{
			
		if(redirectToReferrer){
			if(user && user.role===1)
			{
				return <Redirect to="/admin/dashboard" />
			}
			else
			{
				return <Redirect to="/" />
			}
		}
	}


	return (
		<Layout className="container col-md-8" title="Sign In" description="Sign IN to Dream Reader">
			{showLoading()}
			{showError()}
			{SignUpForm()}
			{redirectUser()}
			
		</Layout>
		)

}

export default Signin
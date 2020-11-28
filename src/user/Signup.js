import React ,{useState} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
import {API} from '../config'
import {signup} from '../auth'
const Signup=()=>{
	const [values,setValues]=useState({
		name:'',
		email:'',
		password:'',
		error:'',
		success:false,
		contact:''
	})

	const handleChange=name=>event=>{
			setValues({...values,error:false,[name]:event.target.value})
	}

	const {name,email,password,error,success,contact}=values
	
	const clickSubmit=(event)=>{
		//prevent the page to reload
			event.preventDefault()
			
			signup({name,email,password,contact})
			.then(data=>{
				if(email==='' || password===''|| contact==='')
				{
					setValues({...values,error:"empty",success:false})
				}
				if(data.err)
				{
					setValues({...values,error:"error",success:false})
				}
				else{
					setValues({...values,
						name:'',
						email:'',
						password:'',
						error:'',
						success:true,
						address:''
					})
				}

			})

	}

	const SignUpForm=()=>(
		<form action="">
			<div className="form-group">	
				<label className="text-muted">Name</label>
				<input  type="text" value={name} required className="form-control" onChange={handleChange('name')}  />
			</div>
			<div className="form-group">	
				<label className="text-muted">Email</label>
				<input type="Email" required value={email} className="form-control" onChange={handleChange('email')} />
			</div>
			<div className="form-group">	
				<label className="text-muted">Password</label>
				<input type="password" required value={password} className="form-control" onChange={handleChange('password')} />
			</div>
			<div className="form-group">	
				<label className="text-muted">Phone</label>
				<input  type="number" value={contact} required className="form-control" onChange={handleChange('contact')}  />
			</div>
			<button onClick={clickSubmit} className="btn btn-primary" >Submit</button>
		</form>
	)

	const showError=()=>{
		if(error==="empty")
		{
			return (
		<div  className="alert alert-danger">
			All fields  are required
		</div>)
			
		}
		else if(error==='error')
		{
			return (
		<div  className="alert alert-danger" >
			Already exists Email or Invalid Data 
		</div>)
		}
	}

	const showSuccess=()=>{
		if(success){
		return (<div  className="alert alert-info" >
			Account created please <Link to='/singin'>SignIn</Link>
		</div>)
	}
	
	}


	return (
		<Layout className="container col-md-8" title="Sign Up" description="Sign up to Dream Reader">
			{showSuccess()}
			{showError()}
			{SignUpForm()}
			
		</Layout>
		)

}

export default Signup
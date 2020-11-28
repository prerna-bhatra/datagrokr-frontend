import React ,{useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {createSlots} from './apiAdmin'

const CreateSlot=()=>{
	const [slots,setName]=useState('')
	const [error,setError]=useState(false)
	const [sucess,setSuccess]=useState(false)

	//destruct user and token from localstoarage
	const {user,token}=isAuthenticated()

	const handleChange=(e)=>{
		setError('')
		setName(e.target.value)
	}


	const clickSubmit=(e)=>{
		e.preventDefault()
		setError('')
		console.log(slots)
		setSuccess(false)
		//make request to api to create categroy
		createSlots(user._id,token,{slots})
		.then((data,err)=>{
			if(err)
			{
				setError(true)
			}
			else
			{
				setError('')
				setSuccess(true)
				window.location.reload(false)
			}
		})

	}

	const showSuccess=()=>{
		if(sucess){
			return <h3 className="text-success"> {slots} Created Succefully</h3>
			window.location.reload(true);

		}
		else if(error)
		{
			return <h3 className="text-danger">Category should be unique </h3>	
		}
	}
	const showError=()=>{
		if(error){
			return <h3 className="text-danger">error creating slots </h3>

		}
	}



	const newCategoryForm=()=>(
		<form onSubmit={clickSubmit}>
			<div className="form-group">
				<label className="text-muted">
					Total Slots
				</label>
				<input type="number" value={slots}  className="form-control" onChange={handleChange}  required/>
			</div>
			<button className="btn btn-outline-primary " style={{"float":"right"}}>ADD</button>

			
		</form>
	)


	return (
		<Layout title="Add New Slots"  description=" Good Day, ready to add a new Slots" className="container">

		{showSuccess()}
			<div className="row">
				<div className="col-md-8 ">
				{newCategoryForm()}
			</div>
			</div>
			
		</Layout>
		)

}

export default CreateSlot






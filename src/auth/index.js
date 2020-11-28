import {BASE_URL} from "../config.js"


export const signup=(user)=>{
		//console.log(name,email,password)

		return fetch(`${BASE_URL}/signup`,{
			method:"POST",
			headers:{
				 'Content-Type': 'application/json'
			},
			body:JSON.stringify(user)
		})
		.then(response=>{
			return response.json()

		})
		.catch(err=>{
			console.log(err)
		})
	}




export const signin=(user)=>{
		//console.log(name,email,password)

		return fetch(`${BASE_URL}/signin`,{
			method:"POST",
			headers:{
				 'Content-Type': 'application/json'
			},
			body:JSON.stringify(user)
		})
		.then(response=>{
			return response.json()

		})
		.catch(err=>{
			console.log(err)
		})
	}

export const authenticate=(data,next)=>{
	if(typeof window!=='undefinced'){
		localStorage.setItem('jwt',JSON.stringify(data))
		next()

	}

}


export const signout=(next)=>{

if(typeof window!=='undefinced'){
		localStorage.removeItem('jwt')
		next()
		return fetch(`${BASE_URL}/signout`,{
			method:"GET",
		})
		.then(response=>{
			console.log('signout')
			window.location.reload(false)

		})
		.catch(err=>console.log(err))
	}
}


export const isAuthenticated=()=>{
	if(typeof window=='undefinced'){
		return false
	}

	if(localStorage.getItem('jwt'))
	{
		return JSON.parse(localStorage.getItem('jwt'))
	}
	else
	{
		return false;
	}
}

















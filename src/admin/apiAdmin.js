import {BASE_URL} from "../config.js"





export const createSlots=(userId,token,slots)=>{
		//console.log(name,email,password)
		console.log(slots)
		return fetch(`${BASE_URL}/product/create/${userId}`,{
			method:"POST",
			headers:{
				'Content-Type':'application/json',
				 Authorization:`Bearer ${token}`
			},
			body:JSON.stringify(slots)
		})
		.then(response=>{
			return response.json()
		})
		.catch(err=>{
			console.log(err)
		})
	}









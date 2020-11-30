import React from  'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import signup from './user/Signup'
import singin from './user/Signin'
import home from './core/Home'
import ShowPost from './core/ShowPost'
import Menu from './core/menu/Menu'
import PrivateRoute from './auth/PrivateRoutes'
import AdminRoute from './auth/AdminRoute'
import Dashboard from './user/userDashboard'
import AdminDashboard from './user/AdminDashboard'

const Routes=()=>{
	return (
		<BrowserRouter>
			<Menu/>
			<Switch>
				<PrivateRoute path="/" exact component={home}/>
				<Route path="/signup" exact component={signup}/>
				<Route path="/singin" exact component={singin}/>
				<PrivateRoute  path="/dashboard" exact component={Dashboard} />
				<PrivateRoute  path="/showpost/:postid" exact component={ShowPost} />
				<AdminRoute  path="/admin/dashboard" exact component={AdminDashboard} />
			</Switch>
		</BrowserRouter>
		)
}



export default Routes;
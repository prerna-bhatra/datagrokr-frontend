import React from 'react'
import './core.css'
import './blog.jpeg'

const Layout=({title='Title',description='', img=" " ,className,children})=>{
	return (

<div>
	<div className="jumbotron">
	<div id="jumbotron"  >
		<h2 className="title">{title}</h2>
		<div className="row">
		<div className="col-md-6">
		<p className="lead">{description}</p>
		</div>
		<div className="col-md-6">
		
		</div>
		</div>
	</div>
</div>
	<div className={className}>{children}</div>
</div>
		)

}

export default Layout
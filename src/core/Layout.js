import React from 'react'
import './core.css'
import './blog.jpeg'

const Layout=({title='Title',description='', img=" " ,className,children})=>{
	return (
<div>
	<div className="jumbotron">
	<div id="jumbotron"  >
		<div className="row">
		<div className="col-md-6">
		<img id="comp"  src={require('./blog.jpeg')}></img>
		</div>
		<div className="col-md-6">
		<p id="blog">
		“Don’t focus on having a great blog. 
		Focus on producing a blog that’s great for your readers.”
		As a blogger, everything you do flows from understanding 
		your audience and seeking to help them.
		</p>
			<cite>Brian Clark</cite> 
		</div>
		</div>
	</div>
</div>
	<div className={className}>{children}</div>
</div>
		)

}
export default Layout
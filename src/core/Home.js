import React,{useState,useEffect,useRef} from 'react'
import Layout from './Layout'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import axios from 'axios'
import uuid from 'react-uuid'
import {BASE_URL} from "../config.js"
import JoditEditor from "jodit-react";

//{JSON.stringify(slots)}
const Home=()=>{
	const editor = useRef(null)
	const [content, setContent] = useState('')
	
	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}
	
	return (
		<div style={{"margin-top":"70px"}}>
            <JoditEditor

            	ref={editor}
                value={content}
                config={config}
		tabIndex={1} // tabIndex of textarea
		onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {}}
            />
            <input type="submit"  className="btn btn-primary" value="POST" style={{"float":"right"}}/>  

           </div>
        );
}

export default Home














//Forms.js
import React, {useState, useEffect} from 'react';
import APIService from './APIService';

function Form(props) {
    const [title, setTitle] =useState('')
    const [body, setBody] =useState('')

    useEffect(() =>{
      setTitle(props.teret.title)
      setBody(props.teret.body )
    },[props.teret])

    const updateTeret = () =>{
        APIService.UpdateTeret(props.teret.id, {title, body})
        .then(resp =>props.updatedData(resp))
        .catch(error=>console.log(error))
    }
    const insertTeret =()=>{
      APIService.InsertTeret({title, body})
      .then(resp => props.insertedTeret(resp))
      .catch(error =>console.log(error))
    }

  return (
    <div>
        {props.teret ?(
            <div className = "mb-3">
            <label htmlFor="title" className="form-label">Title</label>

            <input type="text" className ="form-control" name="title" value ={title}
            placeholder ="Please enter the title"
            onChange ={(e) =>setTitle(e.target.value)}
            />

            <label htmlFor="title" className="form-label">Description</label>

            <textarea className ="form-control" rows="5" value={body} name="body"
            placeholder ="Please enter the description"
            onChange ={(e) =>setBody(e.target.value)}
            />
            
            {
              props.teret.id ? <button 
              onClick ={updateTeret}
              className ="btn btn-success mt-3">Update</button>
              :
              <button 
            onClick ={insertTeret}
            className ="btn btn-success mt-3">Insert</button>
            }
            </div>
        ):null}
        
            
        
        
    </div>
  )
}

export default Form
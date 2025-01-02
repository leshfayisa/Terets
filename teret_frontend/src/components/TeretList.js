//TeretList.js
import React from 'react';
import APIService from './APIService';
function TeretList(props) {
  const editTeret = (teret)=>{
    props.editTeret(teret)
  }
  
  const deleteTeret = (teret)=>{
    APIService.DeleteTeret(teret.id)
    .then(() => props.deleteTeret(teret))
  }
  return (
    <div>
            {props.terets && props.terets.map(teret =>{
        return(
          <div key={teret.id}>
            <h2 style={{textAlign: 'center'}}>{teret.title}</h2>
            <p style={{textAlign: 'start', padding: '4px 12px'}}>{teret.body}</p>
            <p>{teret.date}</p>
            <div className="row">
            <div className ="col-md-1">
              <button className="btn btn-primary"
              onClick = {() =>editTeret(teret)}
              >Update</button>
            </div>

            <div className ="col">
              <button className="btn btn-danger"
                onClick = {()=>deleteTeret(teret)}
              >Delete</button>
            </div>

            </div>

            <hr/>
          </div>
        ) 
      })

      }
    </div>
  )
}

export default TeretList
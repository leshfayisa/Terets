//App.js
import React from 'react';
import './App.css';
import {useState, useEffect} from 'react';
import TeretList from './components/TeretList';
import Form from './components/Form';
import RandomTeret from './components/RandomTeret';

function App() {
  const [terets, setTerets] =useState([])
  const [editedTeret, setEditedTeret] =useState(null)
  const [randomTeret, setRandomTeret] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp); 
        setTerets(resp);
      })
      .catch((error) => console.error(error));
  }, []);
  

  

  const getRandomTeret = () => {
      fetch('http://127.0.0.1:5000/get_random', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      })
          .then((resp) => resp.json())
          .then((resp) => {
              console.log(resp); 
              setRandomTeret(resp); 
          })
          .catch((error) => console.error(error));
  };


  const editTeret = (teret) =>{  
    setEditedTeret(teret)
  }

  const updatedData =(teret) =>{
    const new_teret = terets.map(my_teret =>{
      if(my_teret.id === teret.id){
        return teret
      }else {
        return my_teret
      }
    })
    setTerets(new_teret)
  }

  const openForm = () =>{
    setEditedTeret({title:'', body:''} )
  }
  const insertedTeret = (teret) =>{
    const new_terets = [...terets, teret]
    setTerets(new_terets)
  }

  const deleteTeret = (teret) => {
    const new_terets = terets.filter(myteret =>{
      if(myteret.id === teret.id){
        return false;
      }
      return true
    })
    setTerets(new_terets)
  }

  return (
    <div className="App">
      <div className ="row">
        <div className = "col">
        <h1>ተረት ተረት</h1>
        </div>
      </div>
      <br/>
      <TeretList terets={terets} editTeret={editTeret} deleteTeret = {deleteTeret}/>

      <RandomTeret randomTeret={randomTeret} />
  
      <div className="col">
          <button
            className="btn btn-warning"
            onClick={getRandomTeret}
          >
            Get Random Teret
          </button>
        </div>
        <br/>
        <br/>
      <div className = "col">
        <button
        className ="btn btn-success"
        onClick = {openForm}
        >InsertTeret</button>
        </div>
      {editedTeret ? <Form teret ={editedTeret} updatedData = {updatedData} insertedTeret = {insertedTeret}/> :null}
    </div>
  );
}

export default App;
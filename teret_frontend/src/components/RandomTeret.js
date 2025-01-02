//RandomTeret.js
import React from 'react';

function RandomTeret({ randomTeret }) {
  return (
    randomTeret && (
      <div>
        <h1 style={{ color: 'rgb(230, 40, 20)', textAlign: 'center' }}>Random Teret</h1>
        <h2 style={{textAlign: 'center'}} >{randomTeret.title}</h2>
        <p style={{textAlign: 'start', padding: '4px 12px'}}>{randomTeret.body}</p>
        <p style={{ margin: '0px 0px 6px 0px'}}>{randomTeret.date}</p>
      </div>
    )
  );
}

export default RandomTeret;
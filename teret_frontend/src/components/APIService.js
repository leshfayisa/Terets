//APIService.js


export default class APIService {
    static UpdateTeret(id, body){
        return fetch(`http://localhost:5000/update_teret/${id}/`, {
            'method': 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          })
          .then(resp=>resp.json())
    }


static InsertTeret(body){
  return fetch(`http://localhost:5000/add_teret`, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
}

static DeleteTeret(id){
  return fetch(`http://localhost:5000/remove_teret/${id}/`, {
      'method': 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      
    })
}


}
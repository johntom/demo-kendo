
import { HttpClient } from 'aurelia-fetch-client'
import 'fetch'
export var api = {
   findcase() {
    var url = `http://localhost:8080/api/v1/case/find`  
    return fetch(url).then((res) => res.json())
  },


    updatecase(row) { //token, customer) {
       
        let url = `http://localhost:8080/api/v1/case/update`  
        return fetch(url, {
            method: 'put',

            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                // , 'Authorization': 'JWT ' + token
            },
            body: JSON.stringify(row)

        }).then((res) => res.json());

    },


  walkdir() {
    var url = `http://localhost:8080/api/v1/walkdir/getFiles`  

    return fetch(url).then((res) => res.json())
  }, 
    getLiability (s1,s2,s3){
    var url = `http://localhost:8080/api/v1/wc/test/${s1}/${s2}/${s3}`;
   
    return fetch(url).then((res) => res.json())
  }

}
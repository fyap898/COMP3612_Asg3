const express = require('express');
const app = express();
const data = [{id:1,name:"Portrait"},{ id:1,name:"Landscape"}]; 
app.get('/', (req,resp) => { resp.json(data) } );


let port = 8080; app.listen(port, () => {
    console.log("Server running at port= " + port); 
});

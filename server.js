const express = require('express');
const app = express();
const artdata = fetch('artists.json'); 
app.get('/', (req,resp) => { resp.json(artdata) } );


let port = 8080; app.listen(port, () => {
    console.log("Server running at port= " + port); 
});

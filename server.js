const express = require('express');
const app = express();
const artistData = require('./scripts/artists.json'); 
const galleryData = require('./scripts/galleries.json');

app.get('/api/paintings', (req,resp) => { 
    resp.json(artistData) 
});
app.get('/api/galleries', (req,resp) => { 
    resp.json(galleryData) 
});


let port = 8080; 
app.listen(port, () => {
    console.log("Server running at port= " + port); 
});





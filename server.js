const express = require('express');
const app = express();
const artistData = require('./scripts/artists.json'); 
const galleryData = require('./scripts/galleries.json');
const paintingData = require('./scripts/paintings-nested.json');

//Return all content of a json file
app.get('/api/artists', (req,resp) => { 
    resp.json(artistData) 
});
app.get('/api/galleries', (req,resp) => { 
    resp.json(galleryData) 
});
app.get('/api/paintings', (req,resp) => { 
    resp.json(paintingData) 
});

//Return painting id
app.get('/api/paintings/:id', (req,resp) => { 
    const id = req.params.id;

    const pid = paintingData.find(p => p.paintingID == id);

    if(pid)
    {
        resp.json(pid);
    } else {
        resp.json([{Pid: 'Invalid painting ID'}]);
    }
});


let port = 8080; 
app.listen(port, () => {
    console.log("Server running at port= " + port); 
});





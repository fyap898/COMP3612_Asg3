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
app.get('/api/painting/:id', (req,resp) => { 
    const id = req.params.id;

    const pid = paintingData.find(p => p.paintingID == id);

    if(pid)
    {
        resp.json(pid);
    } else {
        resp.json([{Pid: 'Invalid painting ID'}]);
    }
});

//Return painting/gallery
app.get('/api/painting/gallery/:id', (req,resp) => {
    const id = req.params.id;

    let pid;

    paintingData.forEach(p => {
        if(p.gallery.galleryID === id)
        {
            pid = p;
            if(pid)
            {
                resp.json(pid);
            }
        }
    });
    if (!pid)
    {
        resp.json([{Gid: 'Invalid gallery ID'}]);
    }
});

//Return painting/artist
app.get('/api/painting/artist/:id', (req,resp) => {
    const id = req.params.id;
    console.log(id);

    const pid = paintingData.find(p => p.artist.artistID == id)

    if(pid)
    {
        resp.json(pid);
    } else {
        resp.json([{Aid: 'Invalid artist ID'}]);
    }
});

let port = 8080; 
app.listen(port, () => {
    console.log("Server running at port= " + port); 
});





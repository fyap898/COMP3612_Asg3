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
        
    const pgSet = paintingData.filter(p => p.gallery.galleryID == id);

    if(pgSet.length)
    {
        resp.json(pgSet);
        
    } else {
        resp.json([{Gid: 'Invalid gallery ID'}]);
    }
});

//Return painting/artist
app.get('/api/painting/artist/:id', (req,resp) => {
    const id = req.params.id;

    const paSet = paintingData.filter(p => p.artist.artistID == id);

    if(paSet.length)
    {
        resp.json(paSet);
    } else {
        resp.json([{Aid: 'Invalid artist ID'}]);
    } 
});

//Return artist country
app.get('/api/artists/:country', (req,resp) => {
    const country = req.params.country.toLowerCase();

    console.log(artistData[1].Nationality.toLowerCase());
    const acSet = artistData.filter(p => p.Nationality.toLowerCase() === country);

    if(acSet.length)
    {
        resp.json(acSet);
    } else {
        resp.json([{Artist_Country: 'Invalid country'}]);
    }

});


let port = 8080; 
app.listen(port, () => {
    console.log("Server running at port= " + port); 
});





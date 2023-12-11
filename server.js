const express = require('express');
const app = express();
const artistData = require('./scripts/artists.json'); 
const galleryData = require('./scripts/galleries.json');
const paintingData = require('./scripts/paintings-nested.json');

//Return all painting
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
        resp.json([{Pid: 'Invalid Painting ID'}]);
    }
});

//Return painting/gallery/id
app.get('/api/painting/gallery/:id', (req,resp) => {
    const id = req.params.id;
        
    const pgSet = paintingData.filter(p => p.gallery.galleryID == id);

    if(pgSet.length)
    {
        resp.json(pgSet);
        
    } else {
        resp.json([{Gid: 'Invalid Gallery ID'}]);
    }
});

//Return painting/artist/id
app.get('/api/painting/artist/:id', (req,resp) => {
    const id = req.params.id;

    const paSet = paintingData.filter(p => p.artist.artistID == id);

    if(paSet.length)
    {
        resp.json(paSet);
    } else {
        resp.json([{Aid: 'Invalid Artist ID'}]);
    } 
});

//Return painting/year/MIN/MAX
app.get('/api/painting/year/:min/:max', (req,resp) => {
    const min = req.params.min;
    const max = req.params.max;

    const pySet = paintingData.filter(p => ((min < p.yearOfWork) && (max > p.yearOfWork)));

    if(pySet.length)
    {
        resp.json(pySet);
    } else {
        resp.json([{Painting_Year: 'Invalid Years Input'}]);
    }
});

//Return painting/title/text
app.get('/api/painting/title/:text', (req,resp) => {
    const title = req.params.text;
    title.toLowerCase;
    console.log(title);

    const ttSet = paintingData.filter(p => {
        const pTitle = p.title.toLowerCase();
        return pTitle.includes(title);
    });

    if(ttSet.length)
    {
        resp.json(ttSet);
    } else {
        resp.json([{Painting_Title: 'Invalid Title Text'}]);
    }
});

//Return painting/color/name
app.get('/api/painting/color/:name', (req,resp) => {
    const name = req.params.name;
    name.toLocaleLowerCase();
    console.log(name);

    const pcSet = paintingData.filter(p => {
        let found = false;
        p.details.annotation.dominantColors.forEach(c => {
            const colorName = c.name.toLocaleLowerCase();
            if(colorName.includes(name))
                found = true;
        });
        return found;
    });

    if(pcSet.length)
    {
        resp.json(pcSet);
    } else {
        resp.json([{Painting_Color: 'Invalid Painting\'s Color'}]);
    }
});





//Return all artist
app.get('/api/artists', (req,resp) => { 
    resp.json(artistData) 
});

//Return artist/country
app.get('/api/artists/:country', (req,resp) => {
    const country = req.params.country;
    country.toLowerCase();

    const acSet = artistData.filter(a => {
        const aCountry = a.Nationality.toLowerCase();
        return aCountry.includes(country);
    });

    if(acSet.length)
    {
        resp.json(acSet);
    } else {
        resp.json([{Artist_Country: 'Invalid Artist\'s Country'}]);
    }

});



//Return all gallery
app.get('/api/galleries', (req,resp) => { 
    resp.json(galleryData) 
});

//Return galleries/country
app.get('/api/galleries/:country', (req,resp) => {
    const country = req.params.country;
    country.toLowerCase();

    const gcSet = galleryData.filter(g => {
        const gCountry = g.GalleryCountry.toLowerCase();
        return gCountry.includes(country);
    });

    if(gcSet.length)
    {
        resp.json(gcSet);
    } else {
        resp.json([{Gallery_Country: 'Invalid Gallery\'s Country'}]);
    }
}); 



let port = 8080; 
app.listen(port, () => {
    console.log("Server running at port= " + port); 
});





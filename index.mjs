import express from 'express';
const solarSystem = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//root route
app.get('/', (req, res) => {
    // Array of solar system images
    const solarSystemImages = [
        'https://solarsystem.nasa.gov/system/stellar_items/image_files/2_feature_1600x900_mercury.jpg',
        'https://solarsystem.nasa.gov/system/downloadable_items/1082_PIA00271_detail.jpg',
        'https://solarsystem.nasa.gov/system/stellar_items/image_files/4_earth.jpg',
        'https://cdn.britannica.com/64/73464-050-56C80D3A/view-composite-images-Mars-spacecraft-Global-Surveyor-April-1999.jpg?w=300',
        'https://www.nasa.gov/sites/default/files/thumbnails/image/hs-2016-24-a-print-new.jpg',
        'https://solarsystem.nasa.gov/system/resources/detail_files/14379_IMG003379.jpg',
        'https://solarsystem.nasa.gov/system/stellar_items/image_files/90_feature_1600x900_4.jpg',
        'https://solarsystem.nasa.gov/internal_resources/150/', // Comet
        'https://solarsystem.nasa.gov/system/news_items/main_images/786_bennu_dec10.jpg' // Asteroid
    ];
    
    // Pick a random image
    const randomImage = solarSystemImages[Math.floor(Math.random() * solarSystemImages.length)];
    
    res.render('home.ejs', { randomImage });
});


app.get('/planet', (req, res) => {
   let planet_name = req.query.planetName;
   let planetInfo = solarSystem[`get${planet_name}`]();
   
    if (planet_name === 'Mars') {
        planetInfo.image = '/images/mars1.jpg';
    }
    if (planet_name === 'Jupiter') {
        planetInfo.image = '/images/jupiter1.jpg';
    }
    
   //console.log(planetInfo);
   res.render('planetInfo.ejs', {planetInfo, planet_name});
});


//mercury route
app.get('/mercury', (req, res) => {
   let planetInfo = solarSystem.getMercury();
   console.log(planetInfo);
   res.render('mercury.ejs', {planetInfo});
});

app.get('/venus', (req, res) => {
   let planetInfo = solarSystem.getVenus();
   console.log(planetInfo);
   res.render('venus.ejs', {planetInfo});
});




app.listen(3000, () => {
   console.log('server started');
});
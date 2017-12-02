require('dotenv').config();
const axios = require('axios')

let baseUrl = 'https://api.yelp.com/v3/businesses/search'
let config = { 
  headers: {
    'Authorization': `Bearer ${process.env.YELP_ACCESS_TOKEN}`
  } 
}

module.exports = {
  getBusinesses: (req, res) => {
    // limit and offset will let us retrieve many more reviews per search
    // categories will let us focus our search results
    const { term, location, radius, category } = req.body;
    let limit = 50;
    console.log('DETAILS');
    console.log(`term: ${term}\nlocation: ${location}\nradius: ${radius} meters\n`);
    console.log(`FULL URL:\n${baseUrl}?term=${term}&location=${location}&radius=${radius}&limit=${limit}&categories=${category}`);
    axios.get(`${baseUrl}?term=${term}&location=${location}&radius=${radius}&limit=${limit}&categories=${category}`, config)    
         .then(businesses => {
           console.log(businesses.data.businesses.length);
           res.status(200).send(businesses.data.businesses)
        })
         .catch(err => res.status(500).send(err));
  }
}

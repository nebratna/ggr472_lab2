//Define access tocken
mapboxgl.accessToken = 'pk.eyJ1IjoibmVicmF0bmEiLCJhIjoiY2xjdmZ6Z3I0MDdoODNycWtvNDVuYjJydCJ9.MU8-uPe3u6ya0aTiMr079g'; //default public map token from my Mapbox account

//Initialize map
const map = new mapboxgl.Map({
    container: 'map', // container ID for my map
    style: 'mapbox://styles/nebratna/clehfnjkh001501nyd6k3pq0a', // URL link to my Mapbox Studio style basemap
    center: [-84.475641, 48.012494], // starting position [longitude, latitude]
    zoom: 6, // starting zoom
});

//After map load event, add data sources and draw layers
map.on('load', () => {
    console.log('A load event occured'); //to check in Developer Console if it loads
    /*Adding a source for Mapbox Tileset*/
    map.addSource('visits', { // my source ID for places visited/hiked
        type: 'vector',
        url: 'mapbox://nebratna.b1z3476g' //my tilesetID link from Mapbox
    });

    /*Drawing geometry for tileset data as points*/
    map.addLayer({
        'id': 'places-hiked-and-visited',
        'source': 'visits',//matches my source ID in addSource method above
        'source-layer': 'RoadTrip2021-4scneg',
        'type': 'circle',
        'paint': {
            'circle-color': 'blue',
            'circle-radius': 8,
        },
    });



});
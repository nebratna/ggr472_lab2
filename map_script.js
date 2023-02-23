//Code to display my map on a webpage
mapboxgl.accessToken = 'pk.eyJ1IjoibmVicmF0bmEiLCJhIjoiY2xjdmZ6Z3I0MDdoODNycWtvNDVuYjJydCJ9.MU8-uPe3u6ya0aTiMr079g'; //default public map token from my Mapbox account 

const map = new mapboxgl.Map({
    container: 'map', // container ID for my map
    style: 'mapbox://styles/nebratna/clehfnjkh001501nyd6k3pq0a', // URL link to my Mapbox Studio style basemap
    center: [-79.35, 43.65], // starting position [longitude, latitude]
    zoom: 9, // starting zoom
});

map.on('load', () => {
    
    /*Adding a source for GeoJSON*/
    map.addSource('locations', { // my source ID for points I visited/hiked
        type: 'geojson',
        data: 'https://github.com/nebratna/ggr472_lab2/blob/main/Data/RoadTrip2021.geojson'
    });

    /*Adding a source for Mapbox Tileset*/
    map.addSource('ONparks', { // my source ID for ON parks
        type: 'vector',
        url: 'mapbox://nebratna.cewul63m' //my tileset link from Mapbox
    });
    
    /*Drawing geometry for GeoJSON as circles*/
    map.addLayer({
        'id': 'visited-places',
        'type': 'circle',
        'source': 'locations',
        'paint': {
            'circle-radius': 5,
            'circle-color': 'blue'
        },
    });

    /*Drawing geometry for tileset data as polygons*/
    map.addLayer({
        'id': 'parks',
        'type': 'fill',
        'source': 'ONparks', //matches my source ID in addSource method above
        'paint': {
            'fill-color': 'green',
            'fill-opacity': 0.9,
            'fill-outline-color': 'blue'
        },
        'source-layer': 'Provincial_park_regulated-d0gx9s' // name of my tileset layer from Mapbox tilesets page
    });
});
//Define access tocken
mapboxgl.accessToken = 'pk.eyJ1IjoibmVicmF0bmEiLCJhIjoiY2xjdmZ6Z3I0MDdoODNycWtvNDVuYjJydCJ9.MU8-uPe3u6ya0aTiMr079g'; //default public map token from my Mapbox account

//Initialize map
const map = new mapboxgl.Map({
    container: 'map', // container ID for my map
    style: 'mapbox://styles/nebratna/clehqd5k6002601nre3suucxz', // URL link to my Mapbox Studio style basemap
    center: [-84.67401692764999, 46.958721756061216], // starting position [longitude, latitude]
    zoom: 5.5, // starting zoom, so that all points/hiked places are visible on one screen
    
});


//After map load event, add data sources and draw layers
map.on('load', () => {
    console.log('A load event occured'); //to check in Developer Console if it loads

    /*Adding a source for Mapbox Tileset*/
    map.addSource('visits', { // set-up source ID for places-hiked-and-visited
        type: 'vector',
        url: 'mapbox://nebratna.b1z3476g' //my tilesetID link from Mapbox
    });

    map.addSource('parks-Ontario', { //set-up source ID for ONparks, only z7-22
        type: 'vector',
        url: 'mapbox://nebratna.cewul63m' // my tilesetID from Mapbox Studio
    });

    /*Drawing geometry for tileset data as points*/
    map.addLayer({
        'id': 'places-hiked-and-visited',
        'source': 'visits',//matches my source ID in addSource method above
        'source-layer': 'RoadTrip2021-4scneg',
        'type': 'circle',
        'paint': {
            'circle-color': 'red', // reference the image
            'circle-radius': 5,
        },
        'minzoom': 0

    });

    /*Drawing geometry for tileset data as polygons*/
    map.addLayer({
        'id': 'ONparks',
        'source': 'parks-Ontario',
        'source-layer': 'Provincial_park_regulated-d0gx9s',
        'type': 'fill',
        'paint': {
            'fill-color': '#627BC1',
            'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.4], //CASE and FEATURE STATE expression sets opactity as 0.4 when hover state is false and 1 when updated to true
            'fill-outline-color': 'white'
        },
    });

    /*Add a mouse click event for places-hiked-and-visited layer*/

    // Change the cursor to a pointer when the mouse is over the places-hiked-and-visited layer.
    map.on('mouseenter', 'places-hiked-and-visited', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places-hiked-and-visited', () => {
        map.getCanvas().style.cursor = '';
    });

    map.on('click', 'places-hiked-and-visited', (e) => {
        new mapboxgl.Popup() //Declare new popup object on each click
            .setLngLat(e.lngLat) //Use method to set coordinates of popup based on mouse click location
            .setHTML("<b>Hiked/Visited:</b> " + (e.features[0].properties.hikes || e.features[0].properties.visited) + "<br>" + "<b>Date:</b> " + e.features[0].properties.date) //Use click event properties to write text for popup
            .addTo(map); //Show  popup on map
    });

    /*Add a mouse click event for ONparks layer*/

    // Change the cursor to a pointer when the mouse is over the ONparks layer.
    map.on('mouseenter', 'ONparks', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'ONparks', () => {
        map.getCanvas().style.cursor = '';
    });

    map.on('click', 'ONparks', (e) => {
        new mapboxgl.Popup() //Declare new popup object on each click
            .setLngLat(e.lngLat) //Use method to set coordinates of popup based on mouse click location
            .setHTML("<b>Provincially-Protected Area:</b> " + "<br>" + e.features[0].properties.PROTECTED_AREA_NAME_ENG) //Use click event properties to write text for popup
            .addTo(map); //Show  popup on map
    });
});
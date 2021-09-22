var kayttajaLat;
var kayttajaLon;
var kartta;


window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(naytaKoordinaatit)
    }
}

function naytaKoordinaatit(koordinaatit) {
    let zoom = 7
    if (navigator.geolocation) {
        kayttajaLat = koordinaatit.coords.latitude
        kayttajaLon = koordinaatit.coords.longitude
        zoom = 13
        
    } else {
        kayttajaLat = 63.00
        kayttajaLon = 25.50
    }
    luoKartta(kayttajaLat, kayttajaLon, zoom)
    
}

function luoKartta(lat, lon, zoom) {
    kartta = L.map('kartta', {
        center: [lat, lon],
        zoom: zoom,
    })
    L.control.fullscreen().addTo(kartta);
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYm9vdHRlZCIsImEiOiJja3RpYTh3MXQwenNzMm9udW5xOTRnOWMyIn0.YtJp-pc0wb_EoFBrZ-GHzQ'
    }).addTo(kartta)
    
}


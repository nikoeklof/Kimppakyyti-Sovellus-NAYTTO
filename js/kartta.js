var kayttajaLat;
var kayttajaLon;
var reitti = [];
var reittiID;
var kartta = L.map('kartta', {
    center: [0, 0],
    zoom: 13,
    waypoints: [],
    geocoder: "nominatim"


});


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
    kartta.setView(L.latLng(lat, lon))
    kartta.setZoom(zoom)
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
kartta.on('click', (e) => {

    var klikkicoordinaatit = kartta.mouseEventToLatLng(e.originalEvent)
    console.log(klikkicoordinaatit.lat, klikkicoordinaatit.lng)
})

function luoKyyti(lahto, maaranpaa) {

    if (reittiID == undefined) {
        reittiID = 0
    }
    reitti.push({
        id: reittiID,
        router: L.Routing.control({
            show: false,
            geocoder: L.Control.Geocoder.nominatim(),
            routeWhileDragging: false

        }).addTo(kartta)
    })
    let koordinaatit = [];
    var httpRequestlahto = new XMLHttpRequest()
    httpRequestlahto.onload = () => {
        var jsonDatalahto = JSON.parse(httpRequestlahto.responseText)

        koordinaatit.push({ lat: jsonDatalahto[0].lat, lng: jsonDatalahto[0].lon })

    }


    httpRequestlahto.open('GET', 'https://nominatim.openstreetmap.org/search?city=' + lahto + '&format=json')
    httpRequestlahto.send()

    var httpRequestmaaranpaa = new XMLHttpRequest()
    httpRequestmaaranpaa.onload = () => {
        var jsonDatamaaranpaa = JSON.parse(httpRequestmaaranpaa.responseText)
        koordinaatit.push({ lat: jsonDatamaaranpaa[0].lat, lng: jsonDatamaaranpaa[0].lon })
        luoReitti(reittiID, koordinaatit)
        reittiID = reittiID + 1

    }

    httpRequestmaaranpaa.open('GET', 'https://nominatim.openstreetmap.org/search?city=' + maaranpaa + '&format=json')
    httpRequestmaaranpaa.send()


}

function luoReitti(reittiObjekti, koordinaatit) {

    reitti[reittiObjekti].router.setWaypoints([koordinaatit[0], koordinaatit[1]])
    console.log(reitti[reittiObjekti].router.getWaypoints())
}
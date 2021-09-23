var kayttajaLat;
var kayttajaLon;
var reitti = [];
var reittiID;
var kartta = L.map('kartta', {
    center: [0, 0],
    zoom: 13,

});


window.onload = () => {
    // if (reitti.length == 0 && localStorage.getItem("reitit") != null) {
    //     continue

    // }

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


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(kartta)

}
kartta.on('click', (e) => {

    var klikkicoordinaatit = kartta.mouseEventToLatLng(e.originalEvent)
    console.log(klikkicoordinaatit.lat, klikkicoordinaatit.lng)
})

function luoKyyti(lahto, maaranpaa, kayttajanimi, paivamaara) {
    var jsonDatalahto;
    var jsonDatamaaranpaa;


    let koordinaatit = [];
    var httpRequestlahto = new XMLHttpRequest()
    httpRequestlahto.onload = () => {
        jsonDatalahto = JSON.parse(httpRequestlahto.responseText)

        koordinaatit.push({ lat: jsonDatalahto[0].lat, lng: jsonDatalahto[0].lon })

    }

    httpRequestlahto.open('GET', 'https://nominatim.openstreetmap.org/search?city=' + lahto + '&format=json')
    httpRequestlahto.send()

    var httpRequestmaaranpaa = new XMLHttpRequest()
    httpRequestmaaranpaa.onload = () => {
        jsonDatamaaranpaa = JSON.parse(httpRequestmaaranpaa.responseText)
        koordinaatit.push({ lat: jsonDatamaaranpaa[0].lat, lng: jsonDatamaaranpaa[0].lon })
        console.log(jsonDatamaaranpaa)

        luoReitti(jsonDatalahto, jsonDatamaaranpaa, kayttajanimi, paivamaara)
        reittiID = reittiID + 1

    }

    httpRequestmaaranpaa.open('GET', 'https://nominatim.openstreetmap.org/search?city=' + maaranpaa + '&format=json')
    httpRequestmaaranpaa.send()


}


function luoReitti(lahto, maaranpaa, reittiID, kayttajanimi, paivamaara) {
    if (kayttajanimi == null && paivamaara == null) {
        kayttajanimi = ""
        paivamaara = ""
    }
    if (reittiID == undefined) {
        reittiID = 0

    }
    reitti.push({
        id: reittiID,
        kayttajanimi: kayttajanimi,
        paivamaara: paivamaara,
        router: L.Routing.control({
            show: false,
            geocoder: L.Control.Geocoder.nominatim(),
            routeWhileDragging: false,
            addWaypoints: false,
            createMarker: function(i = 0, wp, nWps) { return L.marker(wp.latLng).bindPopup('Reitin Alku: ' + lahto[0].display_name.split(",")[0] + '<br> Reitti päättyy: ' + maaranpaa[0].display_name.split(",")[0]); }
        }).addTo(kartta)
    })
    console.log([lahto, maaranpaa])
    reitti[reittiID].router.setWaypoints([L.latLng(lahto[0].lat, lahto[0].lon), L.latLng(maaranpaa[0].lat, maaranpaa[0].lon)])
    console.log(reitti[reittiID].router.getWaypoints())
        // let string = JSON.stringify({
        //     id: reitti[reittiID].id, 
        //     kayttajanimi: reitti[reittiID].kayttajanimi, 
        //     paivamaara: reitti[reittiID].paivamaara,
        //     router: i = reitti[reittiID].router

    // })
    // var circ = {}
    // circ.circ = circ;
    // var cache = [];

    // JSON.stringify(circ, (key, value))
    // console.log(JSON.parse(string))

}
var kayttajaLat;
var kayttajaLon;
var reitti = [];
var reittiJSON = []
var reittiID;

var kartta = L.map('kartta', {
    center: [0, 0],
    zoom: 13,

}).addEventListener("click", (e) => {


    if (!reitti.length > 0) {
        return
    } else {
        for (let i = 0; i < reitti.length; i++) {
            reitti[i].router._line.getLayers()[reitti[i].router._line.getLayers().length - 1]._path.setAttribute("stroke", "red")
            reitti[i].valittu = false
        }
    }
});
var lineLayers = []
kartta.addHandler
window.onload = () => {

    // if (localStorage.getItem("tallennetutReitit") != null) {
    //     reittiJSON = JSON.parse(localStorage.getItem("tallennetutReitit"))
    //     console.log(reittiJSON)

    //     lataaKyydit()

    // }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(naytaKoordinaatit)

    }
}

function haeKyydit() {
    let tanaan = new Date().toISOString().split("T")
    let hakupaiva = document.getElementById("paivamaarahaku").value
    let x = hakupaiva.split("-")
    let hakupaiva1 = x[2] + '.' + x[1] + '.' + x[0] 
    console.log(hakupaiva1)
    tanaan.pop()
    tanaan = tanaan[0].split("-")
    
    let tamaPaiva = tanaan[2] + '.' + tanaan[1] + '.' + tanaan[0]
    console.log(tamaPaiva.split("."))
    let paivat = [{
        paiva: (parseInt(tamaPaiva.split(".")[0])), 
        kuukausi: (parseInt(tamaPaiva.split(".")[1])),
        vuosi: parseInt(tamaPaiva.split(".")[2])
        },
        {
            paiva: (parseInt(hakupaiva1.split(".")[0])), 
            kuukausi: (parseInt(hakupaiva1.split(".")[1])),
            vuosi: parseInt(hakupaiva1.split(".")[2])
        }]
if(!(paivat[0].paiva < paivat[1].paiva && paivat[0].kuukausi <= paivat[1].kuukausi && paivat[0].vuosi <= paivat[1].vuosi)){

}
    for (let i = 0; i < reitti.length; i++) {
        if (reitti[i].paivamaara != hakupaiva1) {
            reitti[i].router.remove()
        } else {
            reitti[i].router.addTo(kartta)
        }
    }
}

function naytaKaikkiKyydit() {
    for (let i = 0; i < reitti.length; i++) {
        reitti[i].router.remove()

    }
    for (let i = 0; i < reitti.length; i++) {

        reitti[i].router.addTo(kartta)
        
    }
}

function lataaKyydit() {
    reittiID = reittiJSON.length
    for (let i = 0; i < reittiJSON.length; i++) {
        reitti.push({
            id: reittiJSON[i].id,
            paivamaara: reittiJSON[i].paivamaara,
            lahtoaika: reittiJSON[i].lahtoaika,
            lahto: reittiJSON[i].lahto,
            maaranpaa: reittiJSON[i].maaranpaa,
            router: L.Routing.control({
                show: false,
                geocoder: L.Control.Geocoder.nominatim(),
                routeWhileDragging: false,
                addWaypoints: false,

                waypoints: [reittiJSON[i].routerWaypoints[0], reittiJSON[i].routerWaypoints[1]],
                lineOptions: {
                    styles: [{ color: "red", opacity: 0.4, weight: 7 }],
                },
                createMarker: function(x, wp, nWps) {
                    return L.marker(wp.latLng).bindPopup(
                        'Reitin luoja: ' + reittiJSON[i].kayttajanimi + '<br>' +
                        'Reitin Alku: ' + reittiJSON[i].lahto + '<br> Reitti päättyy: ' + reittiJSON[i].maaranpaa +
                        '<br> Lähtopäivä: ' + reittiJSON[i].paivamaara +
                        '<br>Lähtoaika: ' + reittiJSON[i].lahtoaika);

                }
            }).addTo(kartta)
        })
        setTimeout(1000)
    }

    kartta.invalidateSize()

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

function luoKyyti(lahto, maaranpaa, kayttajanimi, paivamaara, lahtoAika) {
    console.log(lahtoAika)
    var jsonDatalahto;
    var jsonDatamaaranpaa;


    let koordinaatit = [];
    var httpRequestlahto = new XMLHttpRequest()
    console.log("eka")
    httpRequestlahto.onload = () => {

        jsonDatalahto = JSON.parse(httpRequestlahto.responseText)

        koordinaatit.push({ lat: jsonDatalahto[0].lat, lng: jsonDatalahto[0].lon })

    }

    httpRequestlahto.open('GET', 'https://nominatim.openstreetmap.org/search?city=' + lahto + '&format=json')
    httpRequestlahto.send()
    setTimeout(() => {

        var httpRequestmaaranpaa = new XMLHttpRequest()
        httpRequestmaaranpaa.onload = () => {
            jsonDatamaaranpaa = JSON.parse(httpRequestmaaranpaa.responseText)
            console.log(httpRequestmaaranpaa.responseText)
            koordinaatit.push({ lat: jsonDatamaaranpaa[0].lat, lng: jsonDatamaaranpaa[0].lon })
            luoReitti(jsonDatalahto, jsonDatamaaranpaa, reittiID, kayttajanimi, paivamaara, lahtoAika)
        }
        httpRequestmaaranpaa.open('GET', 'https://nominatim.openstreetmap.org/search?city=' + maaranpaa + '&format=json')
        httpRequestmaaranpaa.send()
    }, 1000)
}


function luoReitti(lahto, maaranpaa, reittiID, kayttajanimi, paivamaara, lahtoAika) {


    if (reittiID == undefined) {
        reittiID = 0

    }
    reitti.push({
        id: reitti.length,
        kayttajanimi: kayttajanimi,
        paivamaara: paivamaara.split("-")[2] + '.' + paivamaara.split("-")[1] + '.' + paivamaara.split("-")[0],
        lahtoaika: lahtoAika,
        lahto: lahto[0].display_name.split(",")[0],
        maaranpaa: maaranpaa[0].display_name.split(",")[0],
        valittu: false,
        router: L.Routing.control({
            show: false,
            geocoder: L.Control.Geocoder.nominatim(),
            routeWhileDragging: false,
            addWaypoints: false,
            waypoints: [L.latLng(lahto[0].lat, lahto[0].lon), L.latLng(maaranpaa[0].lat, maaranpaa[0].lon)],
            lineOptions: {
                styles: [{ color: "red", opacity: 0.7, weight: 4 }],
            },

            createMarker: function(i = 0, wp, nWps) {
                let thisID = reittiID
                return marker = L.marker(wp.latLng).bindPopup(
                    'Reitin luoja: ' + kayttajanimi + '<br>' +
                    'Reitin Alku: ' + lahto[0].display_name.split(",")[0] + '<br> Reitti päättyy: ' + maaranpaa[0].display_name.split(",")[0] +
                    '<br> Lähtopäivä: ' + paivamaara.split("-")[2] + '.' + paivamaara.split("-")[1] + '.' + paivamaara.split("-")[0] +
                    '<br>Lähtoaika: ' + lahtoAika).addEventListener("click", function() {
                    for (let i = 0; i < reitti.length; i++) {
                        reitti[i].router._line.getLayers()[reitti[i].router._line.getLayers().length - 1]._path.setAttribute("stroke", "red")
                        reitti[i].valittu = false
                    }
                    if (!reitti[thisID].valittu) {
                        reitti[thisID].router._line.getLayers()[reitti[thisID].router._line.getLayers().length - 1]._path.setAttribute("stroke", "green")
                        reitti[thisID].valittu = true
                    } else {
                        reitti[thisID].router._line.getLayers()[reitti[thisID].router._line.getLayers().length - 1]._path.setAttribute("stroke", "red")

                    }

                })
            }

        }).addTo(kartta)
    })


    console.log(reitti[reittiID])
    paivitaReittiID()
}



function paivitaReittiID() {
    reittiID = reitti.length
        //tallennaReitit() 
}



function tallennaReitit() {

    var Reittistring = {
        id: reitti[reitti.length - 1].id,
        kayttajanimi: reitti[reitti.length - 1].kayttajanimi,
        paivamaara: reitti[reitti.length - 1].paivamaara,
        lahtoaika: reitti[reitti.length - 1].lahtoaika,
        lahto: reitti[reitti.length - 1].lahto,
        maaranpaa: reitti[reitti.length - 1].maaranpaa,
        routerWaypoints: [reitti[reitti.length - 1].router.getWaypoints()[0].latLng, reitti[reitti.length - 1].router.getWaypoints()[1].latLng],

    }
    reittiJSON.push(Reittistring)
    console.log(reittiJSON[reitti.length - 1])
    console.log(JSON.stringify(reittiJSON))
    localStorage.setItem('tallennetutReitit', JSON.stringify(reittiJSON))



}
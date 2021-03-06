var kayttajaLat;
var kayttajaLon;
var reitti = [];
var reittiJSON = []
var reittiID;
var kirjautunut = document.getElementById("kirjautunutkayttaja").innerHTML;

var kartta = L.map('kartta', {
    center: [0, 0],
    zoom: 13,

}).addEventListener("click", () => {
    if (!reitti.length > 0) {
        return
    } else {
        for (let i = 0; i < reitti.length; i++) {
            reitti[i].router._line.getLayers()[reitti[i].router._line.getLayers().length - 1]._path.setAttribute("stroke", "red")
            reitti[i].valittu = false
        }
    }
});

window.onload = () => {

    if (localStorage.getItem("tallennetutReitit") != null) {
        reittiJSON = JSON.parse(localStorage.getItem("tallennetutReitit"))
        lataaKyydit()
    }
    naytaKoordinaatit()
}

function haeKyydit() {
    let tanaan = new Date().toISOString().split("T")[0]
    let hakupaiva = document.getElementById("paivamaarahaku").value

    if (tanaan > hakupaiva) {
        document.getElementById("hakuerror").innerText = "Tarkista päivämäärä!"
        setTimeout(() => { document.getElementById("hakuerror").innerText = "" }, 2000)
        return

    } else {
        for (let i = 0; i < reitti.length; i++) {
            if (reitti[i].paivamaara != hakupaiva) {
                reitti[i].router.remove()
            } else {
                reitti[i].router.addTo(kartta)
            }
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
    if (reittiJSON.length > 0) {
        reittiID = reittiJSON.length
    }

    for (let i = 0; i < reittiJSON.length; i++) {
        setTimeout(() => {
            reitti.push({
                id: reittiJSON[i].id,
                paivamaara: reittiJSON[i].paivamaara,
                lahtoaika: reittiJSON[i].lahtoaika,
                kayttajanimi: reittiJSON[i].kayttajanimi,
                lahto: reittiJSON[i].lahto,
                maaranpaa: reittiJSON[i].maaranpaa,
                yhteystieto: reittiJSON[i].yhteystieto,
                lisaTiedot: reittiJSON[i].lisaTiedot,
                router: L.Routing.control({
                    show: false,
                    geocoder: L.Control.Geocoder.nominatim(),
                    routeWhileDragging: false,
                    addWaypoints: false,

                    waypoints: [reittiJSON[i].routerWaypoints[0], reittiJSON[i].routerWaypoints[1]],
                    lineOptions: {
                        styles: [{ color: "red", opacity: 0.7, weight: 4 }],
                    },
                    createMarker: function(x, wp, nWps) {
                        return L.marker(wp.latLng).bindPopup(
                            '<div id="markerpopup"><button class="poistareittinappula" id="poistareittibutton' + i + '" onclick="poistaReitti(' + i + ')">Poista kyyti</button>' +
                            '<h5>Reitin tiedot</h5>' +
                            '<span id="popupteksti">LÄHTÖPAIKKA JA -AIKA: </span><p><span id="isompitekstipopup">' + reittiJSON[i].lahto + '</span>' +
                            '<p>' + reittiJSON[i].paivamaara.split("-")[2] + '.' + reittiJSON[i].paivamaara.split("-")[1] + '.' + reittiJSON[i].paivamaara.split("-")[0] + " klo: " + reittiJSON[i].lahtoaika +
                            '</p><span id="popupteksti">MÄÄRÄNPÄÄ: </span><p><span id="isompitekstipopup">' + reittiJSON[i].maaranpaa + '</span>' +
                            '</p><span id="popupteksti">KULJETTAJA: </span><p><span id="isompitekstipopup">' + reittiJSON[i].kayttajanimi +
                            '</span></p><p>' + '<a href="tel:' + reittiJSON[i].yhteystieto + '">' + '&#9742; ' + reittiJSON[i].yhteystieto + '</a>' +
                            '</p><br>' + '</p><span id="popupteksti">LISÄTIEDOT: </span><p>' + reittiJSON[i].lisaTiedot +
                            '</p><br>' + '</div>').addEventListener("click", function() {
                            let thisID = i
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
                            if (reitti[thisID].kayttajanimi != kirjautunut || kirjautunut == 'Ylläpitäjä') {
                                document.getElementById('poistareittibutton' + thisID).style.display = "none"
                            } else {
                                document.getElementById('poistareittibutton' + thisID).style.display = "block"
                            }

                        })
                    }
                }).addTo(kartta)
            })
        }, 500)


    }

    kartta.invalidateSize()

}

function naytaKoordinaatit() {
    let zoom = 7

    kayttajaLat = 63.00
    kayttajaLon = 25.50
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


function luoKyyti(lahto, maaranpaa, kayttajanimi, paivamaara, lahtoAika, yhteystieto, viesti) {
    var jsonDatalahto;
    var jsonDatamaaranpaa;
    let koordinaatit = [];
    var httpRequestlahto = new XMLHttpRequest()
    let tanaan = new Date().toISOString().slice(0, 10);
    let kellonaika = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric" });
    var tunnit = parseInt(kellonaika.slice(0, 2));
    var minuutit = parseInt(kellonaika.slice(3));
    var tunnitlahtoAika = parseInt(lahtoAika.slice(0, 2));
    var minuutitlahtoAika = parseInt(lahtoAika.slice(3));
    var minuuttiCheck;
    var tuntiCheck;

    if (paivamaara > tanaan) {
        minuuttiCheck = 1;
        tuntiCheck = 1;
    }
    if (paivamaara === tanaan && tunnit < tunnitlahtoAika) {
        minuuttiCheck = 1;
        tuntiCheck = 1;
    }
    if (paivamaara === tanaan && tunnit === tunnitlahtoAika && minuutit < minuutitlahtoAika) {
        minuuttiCheck = 1;
        tuntiCheck = 1;
    }
    if (paivamaara === tanaan && tunnit >= tunnitlahtoAika && minuutit >= minuutitlahtoAika) {
        document.getElementById("kyytierror").innerHTML = "Tarkista lähtöaika!";
    }
    if (lahtoAika === "") {
        document.getElementById("kyytierror").innerHTML = "Tarkista lähtöaika!";
    }
    if (paivamaara < tanaan) {
        document.getElementById("kyytierror").innerHTML = "Tarkista lähtöpäivä!";
    }
    if (maaranpaa === "") {
        document.getElementById("kyytierror").innerHTML = "Tarkista määränpää!";
    }
    if (lahto === "") {
        document.getElementById("kyytierror").innerHTML = "Tarkista lähtöpaikka!";
    }
    if (kayttajanimi === undefined) {
        document.getElementById("kyytierror").innerHTML = "Kirjaudu sisään luodaksesi kyydin!";
    }
    setTimeout(() => { document.getElementById("kyytierror").innerText = "" }, 2000)


    if (paivamaara >= tanaan && tuntiCheck === 1 && minuuttiCheck === 1 && kayttajanimi != undefined && lahto != "" & maaranpaa != "") {
        minuuttiCheck = 0;
        tuntiCheck = 0;
        document.getElementById("kyytierror").innerHTML = "";

        httpRequestlahto.onload = () => {
            jsonDatalahto = JSON.parse(httpRequestlahto.responseText);
            koordinaatit.push({ lat: jsonDatalahto[0].lat, lng: jsonDatalahto[0].lon })

        }

        httpRequestlahto.open('GET', 'https://nominatim.openstreetmap.org/search?city=' + lahto + '&format=json')
        httpRequestlahto.send()
        setTimeout(() => {
            var httpRequestmaaranpaa = new XMLHttpRequest();
            httpRequestmaaranpaa.onload = () => {
                jsonDatamaaranpaa = JSON.parse(httpRequestmaaranpaa.responseText);
                koordinaatit.push({ lat: jsonDatamaaranpaa[0].lat, lng: jsonDatamaaranpaa[0].lon })
                luoReitti(jsonDatalahto, jsonDatamaaranpaa, reittiID, kayttajanimi, paivamaara, lahtoAika, yhteystieto, viesti);
            }
            httpRequestmaaranpaa.open('GET', 'https://nominatim.openstreetmap.org/search?city=' + maaranpaa + '&format=json');
            httpRequestmaaranpaa.send();
        }, 1000)
    }
}




function luoReitti(lahto, maaranpaa, reittiID, kayttajanimi, paivamaara, lahtoAika, yhteystieto, viesti) {
    if (reittiID == undefined) {
        reittiID = 0;
    }

    reitti.push({
        id: reitti.length,
        kayttajanimi: kayttajanimi,
        paivamaara: paivamaara,
        lahtoaika: lahtoAika,
        lahto: lahto[0].display_name.split(",")[0],
        maaranpaa: maaranpaa[0].display_name.split(",")[0],
        yhteystieto: yhteystieto,
        lisaTiedot: viesti,
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
                    '<div id="markerpopup"><button class="poistareittinappula" id="poistareittibutton' + reittiID + '" onclick="poistaReitti(' + reittiID + ')">Poista kyyti</button>' +
                    '<h5>Reitin tiedot</h5>' +
                    '<span id="popupteksti">LÄHTÖPAIKKA JA -AIKA: </span><p><span id="isompitekstipopup">' + lahto[0].display_name.split(",")[0] + '</span>' +
                    '<p>' + paivamaara.split("-")[2] + '.' + paivamaara.split("-")[1] + '.' + paivamaara.split("-")[0] + " klo: " + lahtoAika +
                    '</p><span id="popupteksti">MÄÄRÄNPÄÄ: </span><p><span id="isompitekstipopup">' + maaranpaa[0].display_name.split(",")[0] + '</span>' +
                    '</p><span id="popupteksti">KULJETTAJA: </span><p><span id="isompitekstipopup">' + kayttajanimi +
                    '</span></p><p>' + '<a href="tel:' + yhteystieto + '">' + '&#9742; ' + yhteystieto + '</a>' +
                    '</p><span id="popupteksti">LISÄTIEDOT: </span><p>' + viesti +
                    '</p><br>' + '</div>'
                ).addEventListener("click", function() {
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
                    if (reitti[thisID].kayttajanimi != kirjautunut || kirjautunut == 'Ylläpitäjä') {
                        document.getElementById('poistareittibutton' + thisID).style.display = "none"
                    } else {
                        document.getElementById('poistareittibutton' + thisID).style.display = "block"
                    }
                });
            }

        }).addTo(kartta)
    });


    paivitaReittiID();

}

function poistaReitti(index) {

    reitti[index].router.remove()
    if (reitti.length == 1) {
        reitti = []
    } else {
        reitti.splice(index, 1)
    }
    paivitaReittiID()
}



function paivitaReittiID() {
    reittiID = reitti.length
    tallennaReitit()
}



function tallennaReitit() {
    localStorage.removeItem('tallennetutReitit')
    reittiJSON = []

    for (let i = 0; i < reitti.length; i++) {
        if (reitti[i] != undefined) {
            var Reittistring = {
                id: reitti[i].id,
                kayttajanimi: reitti[i].kayttajanimi,
                paivamaara: reitti[i].paivamaara,
                lahtoaika: reitti[i].lahtoaika,
                lahto: reitti[i].lahto,
                maaranpaa: reitti[i].maaranpaa,
                yhteystieto: reitti[i].yhteystieto,
                lisaTiedot: reitti[i].lisaTiedot,
                routerWaypoints: [reitti[i].router.getWaypoints()[0].latLng, reitti[i].router.getWaypoints()[1].latLng],

            }
            reittiJSON.push(Reittistring)
        }
    }





    localStorage.setItem('tallennetutReitit', JSON.stringify(reittiJSON))
    reittiJSON = []


}

function suljeMenu() {
    document.getElementById("paivamaarahakupohja").style.display = "none";
    document.getElementById("kyytilomake").style.display = "none";
    document.getElementById("info").style.display = "none";
    document.getElementById("profiili").style.display = "none";
    document.getElementById("avaaprofiilikuvake").style.backgroundColor = "white";
    document.getElementById("avaapaivamaarahaku").style.backgroundColor = "white";
    document.getElementById("avaakyydinluonti").style.backgroundColor = "white";
    document.getElementById("avaainfosivu").style.backgroundColor = "white";
    document.getElementById("avaapaivamaarahaku").className = "valitsematon";
    document.getElementById("avaakyydinluonti").className = "valitsematon";
    document.getElementById("avaaprofiilikuvake").className = "valitsematon";
    document.getElementById("avaainfosivu").className = "valitsematon";
    document.getElementById("suljeMenudiv").style.display = "none";
}
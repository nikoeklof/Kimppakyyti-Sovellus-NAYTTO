
  document.getElementById("fullscreenkuva").style.display ="none";
  document.getElementById("kirjautuminen").style.display ="none";
  document.getElementById("sisalto").style.display ="block";
  document.getElementById("navigointi").style.display ="block";
  document.getElementById("etsikyytia").style.display ="inline-block";
function suljeTausta() {
  document.getElementById("fullscreenkuva").style.display ="none";
  document.getElementById("kirjautuminen").style.display ="block";
  document.getElementById("sisalto").style.display ="block";
  document.getElementById("navigointi").style.display ="block";
  document.getElementById("etsikyytia").style.display ="inline-block";
}

function kirjaudu() {
 if (document.getElementById("kayttajanimi").value == "") {
    alert("Tarkista Käyttäjätunnus!")
 }
 if (document.getElementById("salasana").value == "") {
    alert("Tarkista Salasana!")
 }
 else {
  kayttajatunnus=document.getElementById("kayttajanimi").value;
  document.getElementById("kirjautuminen").style.display ="none";
  document.getElementById("kirjautunutkayttaja").style.display ="block";
  document.getElementById("kirjautunutkayttaja").innerHTML = "Tervetuloa, " +kayttajatunnus
 }
}

function etsiKyytia() {
  document.getElementById("etsikyytia").style.display ="inline-block";
  document.getElementById("tarjoakyytia").style.display ="none";
  document.getElementById("ohjeetsivu").style.display ="none";
}

function tarjoaKyytia() {
  document.getElementById("etsikyytia").style.display ="none";
  document.getElementById("tarjoakyytia").style.display ="inline-block";
  document.getElementById("ohjeetsivu").style.display ="none";
}

function ohjeet() {
  document.getElementById("etsikyytia").style.display ="none";
  document.getElementById("tarjoakyytia").style.display ="none";
  document.getElementById("ohjeetsivu").style.display ="inline-block";
}

function jokulinkki() {
  document.getElementById("etsikyytia").style.display ="none";
  document.getElementById("tarjoakyytia").style.display ="none";
  document.getElementById("ohjeetsivu").style.display ="none";
}
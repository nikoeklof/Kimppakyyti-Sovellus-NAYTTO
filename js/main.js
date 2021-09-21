var kayttajatunnus;

function kirjaudu() {
  var kayttajanimi = document.getElementById("kayttajanimi").value;
  var salasana = document.getElementById("salasana").value;
  var osuma = -1;

  var tunnusArray = ["samuli", "niko", "admin"];
  var salasanaArray = ["samuli", "niko", "admin"];
  var nimiArray = ["Samuli Koppi","Niko Eklöf","Ylläpitäjä"];

  for (var i=0; i <tunnusArray.length; i++) {
      if ((kayttajanimi == tunnusArray[i]) && (salasana == salasanaArray[i])) {
          osuma = i;
          break;
      }
  }
  if (osuma != -1) {
      kayttajatunnus=document.getElementById("kayttajanimi").value;
      suljeTausta();
      document.getElementById("kirjautunutkayttaja").style.display ="block";
      document.getElementById("kirjautunutkayttaja").innerHTML = "Tervetuloa, "+ nimiArray[osuma];
  }
  else {
    document.getElementById("kirjautuminen").style.display ="none";
    document.getElementById("kirjautuminenError").style.display ="block";
  }
}

function suljeError() {
  document.getElementById("kirjautuminen").style.display ="block";
  document.getElementById("kirjautuminenError").style.display ="none";
}

function suljeTausta() {
  document.getElementById("fullscreenkuva").style.display ="none";
  document.getElementById("sisalto").style.display ="flex";
  document.getElementById("navigointi").style.display ="block";
  document.getElementById("etsikyytia").style.display ="block";
}


function etsiKyytia() {
  document.getElementById("etsikyytia").style.display ="flex";
  document.getElementById("tarjoakyytia").style.display ="none";
  document.getElementById("ohjeetsivu").style.display ="none";
}

function tarjoaKyytia() {
  document.getElementById("etsikyytia").style.display ="none";
  document.getElementById("tarjoakyytia").style.display ="block";
  document.getElementById("ohjeetsivu").style.display ="none";
}

function ohjeet() {
  document.getElementById("etsikyytia").style.display ="none";
  document.getElementById("tarjoakyytia").style.display ="none";
  document.getElementById("ohjeetsivu").style.display ="block";
}

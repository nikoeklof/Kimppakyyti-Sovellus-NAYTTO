var kayttajatunnus;
var toggle = 0;

function kirjaudu() {
  var kayttajanimi = document.getElementById("kayttajanimi").value;
  var salasana = document.getElementById("salasana").value;
  var osuma = -1;

  var tunnusArray = ["samuli", "niko", "admin"];
  var salasanaArray = ["samuli", "niko", "admin"];
  var nimiArray = ["Samuli Koppi","Niko Eklöf","Ylläpitäjä"];
  var yhteysArray = ["040-123434565","niko.eklof@koulu.fi","Ylläpitäjä"];

  for (var i=0; i <tunnusArray.length; i++) {
      if ((kayttajanimi == tunnusArray[i]) && (salasana == salasanaArray[i])) {
          osuma = i;
          break;
      }
  }
  if (osuma != -1) {
      kayttajatunnus=document.getElementById("kayttajanimi").value;
      suljeTausta();
      document.getElementById("sisaanbanneri").style.display="none";
      document.getElementById("ulosbanneri").style.display="block";
      document.getElementById("kirjautunutkayttaja").innerHTML = nimiArray[osuma];
      document.getElementById("yhteystieto").innerHTML = yhteysArray[osuma];
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


function suljeMenu() {
  document.getElementById("paivamaarahakupohja").style.display="none";
  document.getElementById("kyytilomake").style.display="none";
  document.getElementById("info").style.display="none";
  document.getElementById("profiili").style.display="none";
  document.getElementById("avaaprofiilikuvake").style.backgroundColor = "white";
  document.getElementById("avaaProfiili").style.backgroundColor = "white";
  document.getElementById("profiili").style.display="none";
  document.getElementById("avaapaivamaarahaku").style.backgroundColor = "white";
  document.getElementById("avaaHaku").style.backgroundColor = "white";
  document.getElementById("avaaLuonti").style.backgroundColor = "white";
  document.getElementById("avaakyydinluonti").style.backgroundColor = "white";
  document.getElementById("avaaInfo").style.backgroundColor = "white";
  document.getElementById("avaainfosivu").style.backgroundColor = "white";
}

function avaaHaku() {
  suljeMenu();
  document.getElementById("paivamaarahakupohja").style.display="block";
  document.getElementById("avaaHaku").style.backgroundColor = "grey";
  document.getElementById("avaapaivamaarahaku").style.backgroundColor = "grey";
}
function avaaProfiili() {
  suljeMenu();
  document.getElementById("profiili").style.display="block";
  document.getElementById("avaaprofiilikuvake").style.backgroundColor = "grey";
  document.getElementById("avaaProfiili").style.backgroundColor = "grey";
}
function avaakyydinluonti() {
  suljeMenu();
  document.getElementById("kyytilomake").style.display="block";
  document.getElementById("avaaLuonti").style.backgroundColor = "grey";
  document.getElementById("avaakyydinluonti").style.backgroundColor = "grey";
}
function avaaInfo(){
  suljeMenu();
  document.getElementById("info").style.display="block";
  document.getElementById("avaaInfo").style.backgroundColor = "grey";
  document.getElementById("avaainfosivu").style.backgroundColor = "grey";
}

function kirjauduUlos() {
    document.getElementById("sisaanbanneri").style.display="none";
    document.getElementById("ulosbanneri").style.display="block";
    document.getElementById("kirjautunutkayttaja").style.display ="none";
    document.getElementById("kirjautunutkayttaja").innerHTML = "Et ole kirjautuneena sisään";
    document.getElementById("yhteystieto").innerHTML = "";
    location.reload();
}


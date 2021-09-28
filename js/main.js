var kayttajatunnus;
var toggle = 0;
var kirjautunut;
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
          kirjautunut = nimiArray[i]
          break;
      }
  }
  if (osuma != -1) {
      kayttajatunnus=document.getElementById("kayttajanimi").value;
      suljeTausta();
      document.getElementById("sisaankirjautuminenprofiili").style.display="none";
      document.getElementById("uloskirjautuminenprofiili").style.display="block";
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
    document.getElementById("kirjautuminen").style.display = "block";
    document.getElementById("kirjautuminenError").style.display = "none";
}

function suljeTausta() {
    document.getElementById("fullscreenkuva").style.display = "none";
    document.getElementById("sisalto").style.display = "flex";
    document.getElementById("navigointi").style.display = "block";
    document.getElementById("etsikyytia").style.display = "block";
}


function suljeMenu() {
  document.getElementById("paivamaarahakupohja").style.display="none";
  document.getElementById("kyytilomake").style.display="none";
  document.getElementById("info").style.display="none";
  document.getElementById("profiili").style.display="none";
  document.getElementById("avaaprofiilikuvake").style.backgroundColor = "white";
  document.getElementById("avaapaivamaarahaku").style.backgroundColor = "white";
  document.getElementById("avaakyydinluonti").style.backgroundColor = "white";
  document.getElementById("avaainfosivu").style.backgroundColor = "white";
  document.getElementById("avaapaivamaarahaku").className = "valitsematon";
  document.getElementById("avaakyydinluonti").className = "valitsematon";
  document.getElementById("avaaprofiilikuvake").className = "valitsematon";
  document.getElementById("avaainfosivu").className = "valitsematon";
  document.getElementById("suljeMenu").style.display="none";
}

function avaaHaku() {
 
 if (document.getElementById("paivamaarahakupohja").style.display !== "block") {
   suljeMenu();
  document.getElementById("paivamaarahakupohja").style.display="block";
  document.getElementById("avaapaivamaarahaku").style.backgroundColor = "#d4c2c1";
  document.getElementById("avaapaivamaarahaku").className = "valittu";
  document.getElementById("suljeMenu").style.display="block";
} else {
  document.getElementById("suljeMenu").style.display="none";
  document.getElementById("paivamaarahakupohja").style.display="none";
  document.getElementById("avaapaivamaarahaku").style.backgroundColor = "white";
  }
}

function avaaProfiili() {
  if (document.getElementById("profiili").style.display !== "block") {
    suljeMenu();
    document.getElementById("profiili").style.display="block";
    document.getElementById("avaaprofiilikuvake").style.backgroundColor = "#d4c2c1";
    document.getElementById("avaaprofiilikuvake").className = "valittu";
    document.getElementById("suljeMenu").style.display="block";
 } else {
   document.getElementById("suljeMenu").style.display="none";
   document.getElementById("profiili").style.display="none";
   document.getElementById("avaaprofiilikuvake").style.backgroundColor = "white";
   }
 }

function avaakyydinluonti() {
  if (document.getElementById("kyytilomake").style.display !== "block") {
    suljeMenu();
    document.getElementById("kyytilomake").style.display="block";
    document.getElementById("avaakyydinluonti").style.backgroundColor = "#d4c2c1";
    document.getElementById("avaakyydinluonti").className = "valittu";
    document.getElementById("suljeMenu").style.display="block";
  } else { 
    document.getElementById("suljeMenu").style.display="none"; 
    document.getElementById("kyytilomake").style.display="none";
    document.getElementById("avaakyydinluonti").style.backgroundColor = "white";
  }
}
function avaaInfo(){
  if (document.getElementById("info").style.display !== "block") {
    suljeMenu();
    document.getElementById("info").style.display="block";
    document.getElementById("avaainfosivu").style.backgroundColor = "#d4c2c1";
    document.getElementById("avaainfosivu").className = "valittu";
    document.getElementById("suljeMenu").style.display="block";
  } else {
    document.getElementById("suljeMenu").style.display="none";
    document.getElementById("info").style.display="none";
    document.getElementById("avaainfosivu").style.backgroundColor = "white";
  }
}

function kirjauduUlos() {
    document.getElementById("sisaanbanneri").style.display="none";
    document.getElementById("ulosbanneri").style.display="block";
    document.getElementById("kirjautunutkayttaja").style.display ="none";
    document.getElementById("kirjautunutkayttaja").innerHTML = "Et ole kirjautuneena sisään";
    document.getElementById("yhteystieto").innerHTML = "";
    document.getElementById("sisaankirjautuminenprofiili").style.display="block";
    document.getElementById("uloskirjautuminenprofiili").style.display="none";
    location.reload();
}


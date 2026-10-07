"use strict";
(function(){
  var $ = function(id){return document.getElementById(id)};
  var COUNTRIES = {
    pe:{name:"Perú", de:"del Perú", grid:0.151, src:"SEIN · MINAM, Huella de Carbono Perú 2024", pc:2.05, balon:10, tag:" #Perú"},
    ec:{name:"Ecuador", de:"de Ecuador", grid:0.1616, src:"S.N.I. continental · Ministerio de Ambiente y Energía 2024", pc:2.54, balon:15, tag:" #Ecuador"},
    otro:{name:"", grid:null, src:"Ingresa el factor oficial de tu país", pc:null, balon:10, tag:""}
  };
  var tz = ""; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch(e){}
  var C = tz === "America/Guayaquil" ? "ec" : "pe";
  function cty(){ return COUNTRIES[C]; }
  function gridH(){ return C === "otro" ? val("hGridF") : cty().grid; }
  var MAIL = ["jacky.unfv","gmail.com"].join("@"), LI = "https://www.linkedin.com/in/jackeline-charapaqui-reluz", CALC = location.origin + location.pathname;
  var PERU = 2.05, CAR = 4.29, TREE = 0.060, CUSCO = 0.134, BALON = 0.0298;
  // Destinos desde Lima: distancia aproximada en km (solo ida). Los marcados ICAO usan el valor oficial de ida y vuelta.
  var DEST = [
    ["Cusco","nac",584,134],["Arequipa","nac",765],["Piura","nac",860],["Iquitos","nac",1010],["Tarapoto","nac",620],["Juliaca / Puno","nac",840],
    ["Quito","int",1320],["Bogotá","int",1880],["Santiago de Chile","int",2459,349],["Buenos Aires","int",3150],["São Paulo","int",3480],
    ["Ciudad de México","int",4250],["Miami","int",4200],["Nueva York","int",5850],["Los Ángeles","int",6700],["Madrid","int",9519,920]
  ];
  var ANCH = [[584,115],[2459,71],[9519,48]];
  function gpkm(d){
    if (d <= ANCH[0][0]) return ANCH[0][1];
    if (d >= ANCH[2][0]) return ANCH[2][1];
    var a = d <= ANCH[1][0] ? ANCH[0] : ANCH[1], b = d <= ANCH[1][0] ? ANCH[1] : ANCH[2];
    var t = (Math.log(d)-Math.log(a[0]))/(Math.log(b[0])-Math.log(a[0]));
    return a[1] + t*(b[1]-a[1]);
  }
  function destKg(i){ var d = DEST[i]; return d[3] ? d[3] : Math.round(2*d[2]*gpkm(d[2])/1000); }
  function addFlight(destIdx, trips){
    var row = document.createElement("div"); row.className = "frow";
    var sel = document.createElement("select"); sel.setAttribute("aria-label","Destino desde Lima");
    DEST.forEach(function(d,i){ var o = document.createElement("option"); o.value = i; o.textContent = "Lima – "+d[0]; sel.appendChild(o); });
    var o2 = document.createElement("option"); o2.value = "otro"; o2.textContent = "Otro destino"; sel.appendChild(o2);
    sel.value = String(destIdx);
    var f = document.createElement("div"); f.className = "field";
    var inp = document.createElement("input"); inp.type = "number"; inp.min = "0"; inp.step = "1"; inp.value = trips; inp.setAttribute("aria-label","Viajes de ida y vuelta");
    var sp = document.createElement("span"); sp.textContent = "viajes";
    f.appendChild(inp); f.appendChild(sp);
    var del = document.createElement("button"); del.type = "button"; del.className = "del"; del.textContent = "×"; del.setAttribute("aria-label","Quitar destino");
    var kgf = document.createElement("div"); kgf.className = "field kg"; kgf.hidden = true;
    var kgi = document.createElement("input"); kgi.type = "number"; kgi.min = "0"; kgi.step = "any"; kgi.placeholder = "kg CO₂ por pasajero, ida y vuelta"; kgi.setAttribute("aria-label","kg de CO₂ del destino");
    var kgs = document.createElement("span"); kgs.textContent = "kg (calculadora OACI)";
    kgf.appendChild(kgi); kgf.appendChild(kgs);
    var note = document.createElement("small");
    function refresh(){
      if (sel.value === "otro"){ kgf.hidden = false; note.textContent = "Calcula tu ruta en la calculadora de la OACI (ICEC) e ingresa el resultado."; }
      else { kgf.hidden = true; var i = +sel.value; note.textContent = destKg(i)+" kg por viaje · "+(DEST[i][3] ? "valor OACI" : "estimado con valores OACI"); }
      calc();
    }
    sel.addEventListener("change", refresh); inp.addEventListener("input", calc); kgi.addEventListener("input", calc);
    del.addEventListener("click", function(){ row.remove(); calc(); });
    row.appendChild(sel); row.appendChild(f); row.appendChild(del); row.appendChild(kgf); row.appendChild(note);
    $("flights").appendChild(row);
    row._get = function(){
      var n = parseFloat(inp.value); n = isFinite(n) && n > 0 ? n : 0;
      if (sel.value === "otro"){ var k = parseFloat(kgi.value); return {t: n*(isFinite(k) && k > 0 ? k : 0)/1000, nac:false, n:n}; }
      var i = +sel.value; return {t: n*destKg(i)/1000, nac: DEST[i][1] === "nac", n:n};
    };
    refresh();
  }
  function flightTotals(){
    var t = 0, nac = 0;
    document.querySelectorAll("#flights .frow").forEach(function(r){ var g = r._get(); t += g.t; if (g.nac) nac += g.n; });
    return {t:t, nac:nac};
  }
  var mode = "emp", last = {};
  var ACTS = {
    aBici:{ya:"Me muevo en bici o a pie", me:"Bici en vez de taxi"},
    aAuto:{ya:"Dejo el auto un día", me:"Un día sin auto"},
    aLed:{ya:"Uso focos LED", me:"Focos LED"},
    aCocina:{ya:"Cocino eficiente", me:"Gas eficiente"},
    aArbol:{ya:"Sembré un árbol", me:"Sembrar un árbol"}
  };
  Object.keys(ACTS).forEach(function(id){
    [["","—"],["ya","Ya lo hago"],["me","Me comprometo"]].forEach(function(o){
      var op = document.createElement("option"); op.value = o[0]; op.textContent = o[1]; $(id).appendChild(op);
    });
  });
  function val(id){var n = parseFloat($(id).value); return isFinite(n) && n > 0 ? n : 0}
  function fmt(n){return n.toLocaleString("es-PE",{minimumFractionDigits:1,maximumFractionDigits:1})}
  function fmt0(n){return Math.round(n).toLocaleString("es-PE")}

  var TIPS = {
    "diésel":"Tu mayor fuente es el diésel. Revisa rutas, mantenimiento de flota y horas de grupos electrógenos.",
    "gasolina":"Tu mayor fuente es la gasolina. Evalúa rutas, uso compartido y vehículos eficientes o eléctricos.",
    "GLP":"Tu mayor fuente es el GLP. Revisa la eficiencia de calderas, terma y cocina.",
    "gas natural":"Tu mayor fuente es el gas natural. Revisa la eficiencia de los equipos de combustión.",
    "refrigerantes":"Tus fugas de refrigerante pesan mucho. Un mantenimiento preventivo del aire acondicionado las reduce rápido.",
    "electricidad":"Tu mayor fuente es la electricidad. Iluminación LED, control del aire acondicionado y equipos eficientes tienen alto impacto.",
    "auto":"Tu mayor fuente es el auto. Combinar viajes, compartir el auto o usar transporte público reduce mucho tu huella.",
    "taxi y apps":"Tu mayor fuente son los taxis y apps. Agrupar trayectos o compartir viajes ayuda.",
    "vuelos":"Tu mayor fuente son los vuelos. Elegir vuelos directos y viajar con equipaje ligero reduce las emisiones de cada viaje."
  };

  function calc(){
    var parts, total, k1v, k1k, cardTag, commit = null;
    if (mode === "emp"){
      parts = [
        ["diésel", val("diesel")*2.68/1000, "c1"],
        ["gasolina", val("gasoline")*2.31/1000, "c1"],
        ["GLP", val("glp")*2.98/1000, "c1"],
        ["gas natural", val("gn")*1.93/1000, "c1"],
        ["refrigerantes", val("refKg")*parseFloat($("refType").value)/1000, "c1"],
        ["electricidad", val("kwh")/1000*val("gridF"), "c2"]
      ];
      var s1 = 0, s2 = 0;
      parts.forEach(function(p){ if (p[2]==="c1") s1 += p[1]; else s2 += p[1]; });
      total = s1 + s2;
      drawBars([["Alcance 1 · directas", s1, "c1"], ["Alcance 2 · electricidad", s2, "c2"]]);
      var st = val("staff");
      k1v = st ? fmt(total/st) : "—"; k1k = "t CO₂e por trabajador";
      cardTag = "Huella de carbono de mi empresa";
    } else {
      var ppl = Math.max(val("hPeople"), 1);
      var ft = flightTotals(), flights = ft.t;
      parts = [
        ["electricidad", val("hKwh")*12/1000*gridH(), "c2"],
        ["GLP", val("hGlp")*12*cty().balon*2.98/1000, "c1"],
        ["gas natural", val("hGn")*12*1.93/1000, "c1"],
        ["auto", val("hGas")*12*8.74/1000, "c1"],
        ["taxi y apps", val("hTaxi")*52*0.17/1000, "c1"],
        ["vuelos", flights, "c3"]
      ];
      var casa = parts[0][1]+parts[1][1]+parts[2][1], mov = parts[3][1]+parts[4][1];
      total = casa + mov + flights;
      drawBars([["Casa · luz y gas", casa, "c2"], ["Transporte terrestre", mov, "c1"], ["Vuelos", flights, "c3"]]);
      var per = total/ppl;
      k1v = fmt(per); k1k = "t CO₂e por persona en tu hogar";
      cardTag = "Huella de carbono de mi hogar";
      var red = {aBici:0.5*parts[4][1], aAuto:parts[3][1]/7, aLed:0.1*parts[0][1], aCocina:0.1*(parts[1][1]+parts[2][1]), aArbol:0.02};
      var cut = 0, ya = [], me = [];
      Object.keys(ACTS).forEach(function(id){
        var v = $(id).value;
        if (v === "ya") ya.push(ACTS[id].ya);
        if (v === "me"){ me.push(ACTS[id].me); cut += red[id]; }
      });
      commit = {cut:cut, ya:ya, me:me, pct: total > 0 ? Math.round(cut/total*100) : 0};
    }
    var top = parts.reduce(function(a,b){return b[1] > a[1] ? b : a}, ["",0]);
    $("total").textContent = fmt(total);
    $("k1v").textContent = k1v; $("k1k").textContent = k1k;
    if (total > 0){
      $("k2v").textContent = Math.round(top[1]/total*100)+"%";
      $("k2k").textContent = "de tu huella viene de "+top[0];
      $("tip").textContent = TIPS[top[0]] || "";
    } else {
      $("k2v").textContent = "0%"; $("k2k").textContent = "ingresa tus consumos";
      $("tip").textContent = "Ingresa tus consumos para ver tu resultado.";
    }
    var EQ = mode === "emp"
      ? [[fmt0(total/CAR), "autos a gasolina circulando un año (EPA)"], [fmt0(total/TREE), "plántulas de árbol creciendo 10 años para absorberlo (EPA)"], (cty().pc ? [fmt(total/cty().pc), "habitantes "+cty().de+" en un año"] : [fmt0(total/CUSCO), "vuelos de 584 km ida y vuelta (OACI)"])]
      : [[fmt0(total/CUSCO), "vuelos Lima–Cusco ida y vuelta (OACI)"], [fmt0(total/(cty().balon*0.00298)), "balones de gas de "+cty().balon+" kg"], [fmt0(total/TREE), "plántulas de árbol creciendo 10 años para absorberlo (EPA)"]];
    EQ.forEach(function(e,i){ $("eq"+(i+1)).textContent = e[0]; $("eq"+(i+1)+"k").textContent = e[1]; });
    $("cardTag").textContent = cardTag;
    $("cardNum").textContent = fmt(total);
    var line = total > 0 ? "Equivale a las emisiones de "+fmt0(total/CAR)+" autos a gasolina en un año. Mi mayor fuente: "+top[0]+"." : "";
    if (mode === "hog" && total > 0){
      var per2 = total/Math.max(val("hPeople"),1);
      var ppl2 = Math.max(val("hPeople"),1);
      line = "Somos "+ppl2+(ppl2 === 1 ? " persona" : " personas")+": "+fmt(per2)+" t por persona al año. "+(cty().pc ? "Referencia: un habitante "+cty().de+" emite en promedio "+cty().pc+" t de CO₂ al año, sumando todas las actividades del país. " : "")+"Mi mayor fuente: "+top[0]+".";
    }
    $("cardLine").textContent = line;
    var pledge = mode === "hog" ? $("pledge").value.trim() : "";
    if (commit && commit.cut > 0){
      $("commitBox").hidden = false;
      $("commitV").textContent = "−"+fmt(commit.cut)+" t CO₂e/año";
      $("commitK").textContent = "Reducirías "+commit.pct+"% de tu huella: de "+fmt(total)+" a "+fmt(Math.max(total-commit.cut,0))+" t al año.";
    } else { $("commitBox").hidden = true; }
    var badges = [];
    if (commit){ commit.ya.forEach(function(t){badges.push("✓ "+t)}); commit.me.forEach(function(t){badges.push("Compromiso: "+t)}); }
    $("cardBadges").innerHTML = "";
    badges.forEach(function(t){ var b = document.createElement("span"); b.className = "badge"; b.textContent = t; $("cardBadges").appendChild(b); });
    $("cardBadges").hidden = badges.length === 0;
    if (commit && commit.cut > 0) line += " Con mi compromiso puedo bajar "+fmt(commit.cut)+" t al año.";
    $("cardLine").textContent = line;
    $("cardPledge").textContent = pledge ? "“"+pledge+"”" : "";
    $("cardPledge").hidden = !pledge;
    last = {total:total, top:top[0], line:line, badges:badges, pledge:pledge};
    var who = mode === "emp" ? "mi empresa" : "mi hogar";
    var base = "Usé tu calculadora de huella de carbono. Resultado de "+who+": "+fmt(total)+" t CO2e/año (mayor fuente: "+top[0]+").";
    var msg = base+" Me interesa un reporte de mi huella.";
    last.base = base;
    setMail();
  }

  function drawBars(rows){
    var mx = Math.max.apply(null, rows.map(function(r){return r[1]}).concat([0.0001]));
    $("bars").innerHTML = "";
    rows.forEach(function(r){
      var d = document.createElement("div"); d.className = "bar-row";
      var a = document.createElement("span"); a.textContent = r[0];
      var b = document.createElement("span"); b.className = "mono"; b.textContent = fmt(r[1])+" t";
      var t = document.createElement("div"); t.className = "bar-track";
      var f = document.createElement("div"); f.className = "bar-fill "+r[2]; f.style.width = (r[1]/mx*100)+"%";
      t.appendChild(f); d.appendChild(a); d.appendChild(b); d.appendChild(t); $("bars").appendChild(d);
    });
  }

  function setMode(m){
    mode = m;
    var emp = m === "emp";
    $("mEmp").setAttribute("aria-pressed", emp); $("mHog").setAttribute("aria-pressed", !emp);
    $("empForm").hidden = !emp; $("hogForm").hidden = emp;
    $("proEmp").hidden = !emp; $("proHog").hidden = emp;
    $("waBtn").hidden = !emp;
    $("h1").textContent = emp ? "¿Cuánto CO₂ emite tu empresa al año?" : "¿Cuánto CO₂ emite tu hogar al año?";
    $("lead").textContent = emp
      ? "Calcula en 2 minutos la huella de carbono de tu organización en alcances 1 y 2, con la metodología del GHG Protocol. Tus datos no salen de tu navegador."
      : "Luz, gas, transporte y vuelos: calcula en 1 minuto la huella de tu casa y compárala con el promedio por habitante de tu país. Tus datos no salen de tu navegador.";
    $("sampleText").textContent = emp
      ? "Valores de ejemplo: una empresa de servicios con 40 trabajadores. Reemplázalos con tus consumos anuales."
      : "Valores de ejemplo: un hogar de 3 personas. Reemplázalos con tus datos.";
    $("sampleBar").hidden = false;
    calc();
  }

  document.querySelectorAll("#calc input").forEach(function(el){ el.addEventListener("input", function(){ $("sampleBar").hidden = true; calc(); }) });
  $("refType").addEventListener("change", calc);
  function setCountry(c){
    C = c; var k = cty();
    $("country").value = c;
    $("gridSrc").textContent = k.src;
    $("gridF").value = k.grid === null ? "" : String(k.grid);
    $("gridF").placeholder = "0.000";
    $("hGridRow").hidden = c !== "otro";
    $("glpLabel").textContent = "Balones de gas de "+k.balon+" kg";
    calc();
  }
  $("country").addEventListener("change", function(){ setCountry($("country").value); });
  $("hGridF").addEventListener("input", calc);
  document.querySelectorAll("[data-act]").forEach(function(el){ el.addEventListener("change", calc) });
  $("pledge").addEventListener("input", function(){ $("pledgeCount").textContent = $("pledge").value.length+"/140"; calc(); });
  $("mEmp").addEventListener("click", function(){ setMode("emp") });
  $("mHog").addEventListener("click", function(){ setMode("hog") });
  $("toEmp").addEventListener("click", function(){ setMode("emp"); window.scrollTo({top:0, behavior:"smooth"}) });
  $("clearBtn").addEventListener("click", function(){
    var box = mode === "emp" ? "#empForm" : "#hogForm";
    document.querySelectorAll(box+" input").forEach(function(el){ if (el.id !== "gridF") el.value = "" });
    if (mode === "hog"){ $("hPeople").value = "1"; document.querySelectorAll("[data-act]").forEach(function(el){ el.value = "" }); $("pledge").value = ""; $("pledgeCount").textContent = "0/140"; $("flights").innerHTML = ""; }
    $("sampleBar").hidden = true; calc();
  });
  $("calc").addEventListener("submit", function(e){ e.preventDefault() });
  $("copyBtn").addEventListener("click", function(){
    var who = mode === "emp" ? "de mi empresa" : "de mi hogar";
    var extra = "";
    if (last.badges && last.badges.length) extra += "\n\n"+last.badges.join("\n");
    if (last.pledge) extra += "\n\nMi compromiso: "+last.pledge;
    var text = "Calculé la huella de carbono "+who+": "+fmt(last.total)+" t CO2e al año. "+last.line+extra+"\n\nLo hice en 2 minutos con la calculadora gratuita de @Jackeline Charapaqui Reluz.\n\n👉 Calcula la tuya aquí: "+CALC+"\n🔗 Perfil de Jackeline: "+LI+"\n\n#HuellaDeCarbono #Sostenibilidad #CambioClimático"+cty().tag;
    var done = function(){ $("toast").textContent = "Copiado. Al pegarlo en LinkedIn, borra la @ y vuelve a escribir @Jackeline para elegir su perfil y etiquetarla." };
    var fail = function(){ $("toast").textContent = text };
    try { navigator.clipboard.writeText(text).then(done, fail) } catch(e){ fail() }
  });
  var tier = "Reporte Pro";
  function setMail(){
    var body = "Hola Jackeline,\n\n"+(last.base || "Usé tu calculadora de huella de carbono.")+" Me interesa el "+tier+".\n\nEmpresa:\nNombre y cargo:\nTeléfono:\n\nSaludos.";
    $("mailMsg").value = body;
  }
  $("mailText").textContent = MAIL; $("footMail").textContent = MAIL;
  function copyText(t, ok, el){
    var fail = function(){ el.textContent = "No se pudo copiar automáticamente. Selecciona el texto y cópialo."; };
    try { navigator.clipboard.writeText(t).then(function(){ el.textContent = ok }, fail) } catch(e){ fail() }
  }
  $("copyMail").addEventListener("click", function(){ copyText(MAIL, "Correo copiado.", $("mailToast")) });
  $("copyMsg").addEventListener("click", function(){ copyText($("mailMsg").value, "Mensaje copiado. Pégalo en un correo a "+MAIL+".", $("mailToast")) });
  document.querySelectorAll(".waTier").forEach(function(a){ a.addEventListener("click", function(){ tier = a.dataset.tier; setMail(); }) });
  $("addFlight").addEventListener("click", function(){ addFlight(0, 1); });
  addFlight(0, 2);
  setCountry(C);
})();

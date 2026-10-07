"use strict";
(function(){
  var $ = function(id){return document.getElementById(id)};
  // [ISO2, factor red t CO2e/MWh (Ember vía Our World in Data), año, t CO2 por habitante (GCP vía OWID), nombre]
  var WORLD = [["AF",0.1313,2024,0.25,"Afghanistan"],["AL",0.0252,2024,1.59,"Albania"],["DZ",0.6329,2024,4.23,"Algeria"],["AS",0.6111,2024,null,"American Samoa"],["AO",0.1854,2024,0.59,"Angola"],["AG",0.5946,2024,7.09,"Antigua and Barbuda"],["AR",0.346,2025,3.74,"Argentina"],["AM",0.2119,2025,2.5,"Armenia"],["AW",0.55,2024,8.52,"Aruba"],["AU",0.5252,2025,14.48,"Australia"],["AT",0.1169,2025,6.18,"Austria"],["AZ",0.6319,2025,3.85,"Azerbaijan"],["BS",0.6533,2024,7.65,"Bahamas"],["BH",0.9022,2024,24.27,"Bahrain"],["BD",0.6961,2025,0.62,"Bangladesh"],["BB",0.5946,2024,4.83,"Barbados"],["BY",0.3093,2025,6.16,"Belarus"],["BE",0.1498,2025,7.28,"Belgium"],["BZ",0.1702,2024,1.91,"Belize"],["BJ",0.5842,2024,0.42,"Benin"],["BM",0.6393,2024,8.51,"Bermuda"],["BT",0.0236,2024,2.09,"Bhutan"],["BO",0.4813,2025,2.31,"Bolivia"],["BA",0.5706,2025,6.14,"Bosnia and Herzegovina"],["BW",0.8513,2024,2.96,"Botswana"],["BR",0.11,2025,2.28,"Brazil"],["VG",0.6471,2023,4.87,"British Virgin Islands"],["BN",0.8921,2024,26.05,"Brunei"],["BG",0.2756,2025,4.68,"Bulgaria"],["BF",0.5621,2024,0.28,"Burkina Faso"],["BI",0.1837,2024,0.07,"Burundi"],["KH",0.4989,2025,1.24,"Cambodia"],["CM",0.2259,2024,0.33,"Cameroon"],["CA",0.1907,2025,13.42,"Canada"],["CV",0.4615,2024,1.13,"Cape Verde"],["KY",0.6338,2024,null,"Cayman Islands"],["CF",0.0,2023,0.07,"Central African Republic"],["TD",0.6216,2024,0.14,"Chad"],["CL",0.2895,2025,3.98,"Chile"],["CN",0.5253,2025,8.66,"China"],["CO",0.1868,2025,1.75,"Colombia"],["KM",0.6429,2023,0.64,"Comoros"],["CG",0.7161,2024,1.4,"Congo"],["CK",0.25,2024,5.82,"Cook Islands"],["CR",0.0242,2025,1.71,"Costa Rica"],["CI",0.405,2024,0.46,"Cote d'Ivoire"],["HR",0.1585,2025,4.76,"Croatia"],["CU",0.6428,2024,2.23,"Cuba"],["CY",0.489,2025,5.37,"Cyprus"],["CZ",0.4015,2025,7.04,"Czechia"],["CD",0.0276,2024,0.05,"Democratic Republic of Congo"],["DK",0.1144,2025,4.75,"Denmark"],["DJ",0.45,2024,0.48,"Djibouti"],["DM",0.6,2023,2.58,"Dominica"],["DO",0.5375,2025,2.9,"Dominican Republic"],["TL",0.6667,2024,0.48,"East Timor"],["EC",0.159,2025,2.54,"Ecuador"],["EG",0.5632,2025,2.22,"Egypt"],["SV",0.1393,2025,1.42,"El Salvador"],["GQ",0.6443,2024,3.7,"Equatorial Guinea"],["ER",0.5778,2024,0.21,"Eritrea"],["EE",0.3191,2025,6.11,"Estonia"],["SZ",0.1312,2024,0.84,"Eswatini"],["ET",0.0231,2025,0.14,"Ethiopia"],["FK",1.0,2023,null,"Falkland Islands"],["FO",0.3469,2023,13.09,"Faroe Islands"],["FJ",0.2783,2024,1.56,"Fiji"],["FI",0.0575,2025,5.3,"Finland"],["FR",0.0414,2025,3.97,"France"],["GF",0.2449,2023,null,"French Guiana"],["PF",0.4306,2024,3.27,"French Polynesia"],["GA",0.5231,2024,2.13,"Gabon"],["GM",0.6667,2024,0.29,"Gambia"],["GE",0.1459,2025,3.1,"Georgia"],["DE",0.3296,2025,6.77,"Germany"],["GH",0.4689,2024,0.61,"Ghana"],["GI",0.5909,2024,null,"Gibraltar"],["GR",0.3151,2025,5.31,"Greece"],["GL",0.15,2024,11.08,"Greenland"],["GD",0.6667,2024,3.22,"Grenada"],["GP",0.497,2023,null,"Guadeloupe"],["GU",0.6075,2024,null,"Guam"],["GT",0.3015,2024,1.08,"Guatemala"],["GN",0.1811,2024,0.27,"Guinea"],["GW",0.625,2024,0.15,"Guinea-Bissau"],["GY",0.6449,2024,5.43,"Guyana"],["HT",0.5349,2024,0.25,"Haiti"],["HN",0.3221,2024,1.19,"Honduras"],["HK",0.6755,2024,4.49,"Hong Kong"],["HU",0.163,2025,4.14,"Hungary"],["IS",0.0278,2024,9.67,"Iceland"],["IN",0.6701,2025,2.2,"India"],["ID",0.6803,2024,2.87,"Indonesia"],["IR",0.6595,2025,8.66,"Iran"],["IQ",0.6831,2024,5.07,"Iraq"],["IE",0.2565,2025,6.34,"Ireland"],["IL",0.4927,2025,5.61,"Israel"],["IT",0.2848,2025,5.09,"Italy"],["JM",0.563,2024,2.96,"Jamaica"],["JP",0.4773,2025,7.77,"Japan"],["JO",0.5298,2024,2.01,"Jordan"],["KZ",0.8053,2025,13.94,"Kazakhstan"],["KE",0.0954,2025,0.38,"Kenya"],["KI",0.5,2024,0.54,"Kiribati"],["KW",0.6353,2025,26.25,"Kuwait"],["KG",0.1527,2025,1.64,"Kyrgyzstan"],["LA",0.2321,2024,3.14,"Laos"],["LV",0.1388,2025,3.45,"Latvia"],["LB",0.3895,2024,2.7,"Lebanon"],["LS",0.0208,2022,1.1,"Lesotho"],["LR",0.3158,2024,0.15,"Liberia"],["LY",0.8268,2024,8.84,"Libya"],["LT",0.1384,2025,4.39,"Lithuania"],["LU",0.1234,2025,10.46,"Luxembourg"],["MO",0.4744,2024,1.47,"Macao"],["MG",0.4321,2024,0.14,"Madagascar"],["MW",0.0546,2024,0.09,"Malawi"],["MY",0.602,2025,8.16,"Malaysia"],["MV",0.6118,2024,4.37,"Maldives"],["ML",0.5386,2024,0.28,"Mali"],["MT",0.484,2025,3.2,"Malta"],["MQ",0.5298,2023,null,"Martinique"],["MR",0.5121,2024,1.01,"Mauritania"],["MU",0.6422,2024,3.68,"Mauritius"],["MX",0.474,2025,3.52,"Mexico"],["MD",0.6331,2025,1.75,"Moldova"],["MN",0.8163,2025,12.86,"Mongolia"],["ME",0.2642,2025,3.72,"Montenegro"],["MS",1.0,2024,6.02,"Montserrat"],["MA",0.5964,2025,1.81,"Morocco"],["MZ",0.1294,2024,0.25,"Mozambique"],["MM",0.503,2024,0.58,"Myanmar"],["NA",0.0488,2024,1.15,"Namibia"],["NR",0.6,2024,5.13,"Nauru"],["NP",0.0243,2024,0.63,"Nepal"],["NL",0.2536,2025,6.3,"Netherlands"],["NC",0.5609,2024,18.06,"New Caledonia"],["NZ",0.0928,2025,6.23,"New Zealand"],["NI",0.3009,2024,0.81,"Nicaragua"],["NE",0.6737,2024,0.12,"Niger"],["NG",0.4557,2025,0.58,"Nigeria"],["KP",0.3406,2024,2.36,"North Korea"],["MK",0.4414,2025,3.63,"North Macedonia"],["NO",0.0281,2025,6.67,"Norway"],["OM",0.5445,2025,15.65,"Oman"],["PK",0.3466,2025,0.72,"Pakistan"],["PS",0.4141,2024,0.87,"Palestine"],["PA",0.2212,2024,2.81,"Panama"],["PG",0.5137,2024,0.79,"Papua New Guinea"],["PY",0.0247,2025,1.15,"Paraguay"],["PE",0.2382,2025,2.05,"Peru"],["PH",0.5883,2025,1.51,"Philippines"],["PL",0.5886,2025,7.08,"Poland"],["PT",0.1279,2025,3.41,"Portugal"],["PR",0.6547,2025,null,"Puerto Rico"],["QA",0.5815,2025,41.27,"Qatar"],["RE",0.3941,2023,null,"Reunion"],["RO",0.2507,2025,3.6,"Romania"],["RU",0.4497,2025,12.29,"Russia"],["RW",0.354,2024,0.14,"Rwanda"],["SH",1.0,2023,2.17,"Saint Helena"],["KN",0.6087,2024,5.54,"Saint Kitts and Nevis"],["LC",0.65,2024,2.99,"Saint Lucia"],["PM",0.6,2023,9.79,"Saint Pierre and Miquelon"],["VC",0.6,2024,2.54,"Saint Vincent and the Grenadines"],["WS",0.375,2024,1.13,"Samoa"],["ST",0.5556,2023,0.6,"Sao Tome and Principe"],["SA",0.692,2024,20.38,"Saudi Arabia"],["SN",0.54,2024,0.76,"Senegal"],["RS",0.6958,2025,6.24,"Serbia"],["SC",0.5556,2024,5.0,"Seychelles"],["SL",0.0476,2024,0.17,"Sierra Leone"],["SG",0.4971,2025,9.24,"Singapore"],["SK",0.0948,2025,5.28,"Slovakia"],["SI",0.1833,2025,6.02,"Slovenia"],["SB",0.6364,2024,0.36,"Solomon Islands"],["SO",0.5116,2024,0.07,"Somalia"],["ZA",0.6993,2025,6.87,"South Africa"],["KR",0.4171,2025,11.29,"South Korea"],["SS",0.6429,2024,0.14,"South Sudan"],["ES",0.1536,2025,4.6,"Spain"],["LK",0.3293,2025,0.9,"Sri Lanka"],["SD",0.1537,2024,0.35,"Sudan"],["SR",0.3218,2024,4.71,"Suriname"],["SE",0.0353,2025,3.59,"Sweden"],["CH",0.0392,2025,3.6,"Switzerland"],["SY",0.7062,2024,1.29,"Syria"],["TW",0.6332,2025,11.3,"Taiwan"],["TJ",0.0726,2025,1.01,"Tajikistan"],["TZ",0.345,2024,0.29,"Tanzania"],["TH",0.5457,2025,3.74,"Thailand"],["TG",0.4225,2024,0.33,"Togo"],["TO",0.5714,2024,1.46,"Tonga"],["TT",0.6817,2024,22.93,"Trinidad and Tobago"],["TN",0.5603,2025,2.66,"Tunisia"],["TR",0.4747,2025,5.87,"Turkey"],["TM",1.3063,2024,10.81,"Turkmenistan"],["TC",0.6296,2024,8.14,"Turks and Caicos Islands"],["UG",0.0585,2024,0.13,"Uganda"],["UA",0.2505,2022,3.76,"Ukraine"],["AE",0.4675,2024,20.13,"United Arab Emirates"],["GB",0.2174,2025,4.53,"United Kingdom"],["US",0.3844,2025,14.2,"United States"],["VI",0.6323,2023,null,"United States Virgin Islands"],["UY",0.0804,2025,2.35,"Uruguay"],["UZ",1.0,2025,3.83,"Uzbekistan"],["VU",0.5,2023,0.6,"Vanuatu"],["VE",0.0859,2024,4.08,"Venezuela"],["VN",0.4607,2025,3.67,"Vietnam"],["EH",0.6667,2009,null,"Western Sahara"],["YE",0.5924,2024,0.25,"Yemen"],["ZM",0.1197,2024,0.56,"Zambia"],["ZW",0.384,2024,0.82,"Zimbabwe"]];
  var OFFICIAL = {
    PE:{grid:0.151, src:"SEIN · MINAM, Huella de Carbono Perú 2024", balon:10},
    EC:{grid:0.1616, src:"S.N.I. continental · Ministerio de Ambiente y Energía 2024", balon:15}
  };
  var DE = {PE:"del Perú", US:"de Estados Unidos", GB:"del Reino Unido", AR:"de Argentina"};
  var dn = null; try { dn = new Intl.DisplayNames(["es"], {type:"region"}); } catch(e){}
  var COUNTRIES = {};
  WORLD.forEach(function(w){
    var iso = w[0], name = w[4];
    try { if (dn) name = dn.of(iso) || name; } catch(e){}
    var off = OFFICIAL[iso];
    COUNTRIES[iso] = {
      name: name, de: DE[iso] || "de "+name,
      grid: off ? off.grid : w[1],
      src: off ? off.src : "Referencial: Ember "+w[2]+" vía Our World in Data. Si tienes el factor oficial de tu país, reemplázalo.",
      pc: w[3], balon: off ? off.balon : 10,
      tag: " #"+name.replace(/[\s\.\-']/g,"")
    };
  });
  COUNTRIES.otro = {name:"", de:"", grid:null, src:"Ingresa el factor oficial de tu país", pc:null, balon:10, tag:""};
  function detectCountry(){
    var langs = []; try { langs = navigator.languages || [navigator.language || ""]; } catch(e){}
    for (var i = 0; i < langs.length; i++){ var m = /[-_]([A-Za-z]{2})$/.exec(langs[i] || ""); if (m && COUNTRIES[m[1].toUpperCase()] && m[1].toUpperCase() !== "US") return m[1].toUpperCase(); }
    var tz = ""; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch(e){}
    var TZ = {"America/Lima":"PE","America/Guayaquil":"EC","America/Bogota":"CO","America/Santiago":"CL","America/La_Paz":"BO","America/Sao_Paulo":"BR","America/Mexico_City":"MX","America/Monterrey":"MX","America/Cancun":"MX","America/Tijuana":"MX","Europe/Madrid":"ES","America/Montevideo":"UY","America/Asuncion":"PY","America/Caracas":"VE","America/Panama":"PA","America/Costa_Rica":"CR","America/Guatemala":"GT","America/Santo_Domingo":"DO","America/El_Salvador":"SV","America/Tegucigalpa":"HN","America/Managua":"NI","America/Havana":"CU","America/Puerto_Rico":"PR","America/New_York":"US","America/Chicago":"US","America/Denver":"US","America/Los_Angeles":"US","America/Toronto":"CA"};
    if (tz.indexOf("America/Argentina") === 0) return "AR";
    return (TZ[tz] && COUNTRIES[TZ[tz]]) ? TZ[tz] : "PE";
  }
  var C = detectCountry();
  function cty(){ return COUNTRIES[C]; }
  function gridH(){ return C === "otro" ? val("hGridF") : cty().grid; }
  var MAIL = ["jacky.unfv","gmail.com"].join("@"), LI = "https://www.linkedin.com/in/jackeline-charapaqui-reluz", CALC = location.origin + location.pathname;
  var PERU = 2.05, CAR = 4.29, TREE = 0.060, CUSCO = 0.134, BALON = 0.0298;
  // Destinos desde Lima: distancia aproximada en km (solo ida). Los marcados ICAO usan el valor oficial de ida y vuelta.
  var DEST = [
    ["Vuelo corto · ~1 h · ~600 km","gen",584,134],["Vuelo medio · ~4 h · ~2,500 km","gen",2459,349],["Vuelo largo · ~11 h · ~9,500 km","gen",9519,920],
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
    var sel = document.createElement("select"); sel.setAttribute("aria-label","Tipo de vuelo o destino");
    var g1 = document.createElement("optgroup"); g1.label = "Por duración (cualquier país)";
    var g2 = document.createElement("optgroup"); g2.label = "Desde Lima";
    DEST.forEach(function(d,i){ var o = document.createElement("option"); o.value = i; o.textContent = d[1] === "gen" ? d[0] : "Lima – "+d[0]; (d[1] === "gen" ? g1 : g2).appendChild(o); });
    sel.appendChild(g1); sel.appendChild(g2);
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
        ["GLP", val("hGlp")*12*(val("glpSize") || 10)*2.98/1000, "c1"],
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
      ? [[fmt0(total/CAR), "autos a gasolina circulando un año (EPA)"], [fmt0(total/TREE), "plántulas de árbol creciendo 10 años para absorberlo (EPA)"], (cty().pc ? [fmt(total/cty().pc), "habitantes "+cty().de+" en un año"] : [fmt0(total/CUSCO), "vuelos cortos de unos 600 km ida y vuelta (OACI)"])]
      : [[fmt0(total/CUSCO), C === "PE" ? "vuelos Lima–Cusco ida y vuelta (OACI)" : "vuelos cortos de unos 600 km ida y vuelta (OACI)"], [fmt0(total/((val("glpSize") || 10)*0.00298)), "balones de gas de "+(val("glpSize") || 10)+" kg"], [fmt0(total/TREE), "plántulas de árbol creciendo 10 años para absorberlo (EPA)"]];
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
    $("glpSize").value = String(k.balon);
    calc();
  }
  $("country").addEventListener("change", function(){ setCountry($("country").value); });
  $("hGridF").addEventListener("input", calc);
  $("glpSize").addEventListener("change", calc);
  (function(){
    var sel = $("country"), keys = Object.keys(COUNTRIES).filter(function(k){ return k !== "otro"; });
    keys.sort(function(a,b){ return COUNTRIES[a].name.localeCompare(COUNTRIES[b].name, "es"); });
    keys.forEach(function(k){ var o = document.createElement("option"); o.value = k; o.textContent = COUNTRIES[k].name; sel.appendChild(o); });
    var o = document.createElement("option"); o.value = "otro"; o.textContent = "Otro (ingresar factor)"; sel.appendChild(o);
  })();
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

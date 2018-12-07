var config = {

		params: {
			center: [14.153508, 56.030127],
			zoom: $(window).width()<600?11:12
		},

		smapOptions: {
			title: "Kristianstads kartor",
			favIcon: ""
		},
ol: [

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/skola/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "buf_gif_skolor_",
minZoom: 8,
maxZoom: 20,
category: ["Barn & utbildning"],
displayName: "Förskolor",
layerId: "Barn_o_utbildning/buf_gif_skolor_",
alias: "fskolor",
project: "skola",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/skola/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Förskola</div>" +
            "<div class='popup-text1'><b>Namn:</b> ${enhnamn}</div></br>"+
            "<div class='popup-text1'><b>Adress:</b> ${adress}</div></br>"+
            "<div class='popup-text1'><b>Postnummer:</b> ${postnr}</div></br>"+
            "<div class='popup-text1'><b>Ort:</b> ${postanst}</div></br>"+
            "<div class='popup-text1'><b>Telefon:</b> ${tele1}</div></br>"+
            "<a class='popup-text1' href='${homepage}' target='_blank'>Läs mer</a>",
format: "image/png; mode=8bit",
zIndex: 320,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../skola/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=buf_gif_skolor_&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Förskolor i kommunen",
updateinterval: "Vid behov",
contact: "Anette Berg",
source: "Barn- och utbildningsförvaltningen",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Utbildning/Forskola/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/skola/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "buf_gsk_skolor_",
minZoom: 8,
maxZoom: 20,
category: ["Barn & utbildning"],
displayName: "Grundskolor",
layerId: "Barn_o_utbildning/buf_gsk_skolor_",
alias: "gskolor",
project: "skola",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/skola/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Grundskola</div>" +
            "<div class='popup-text1'><b>Namn:</b> ${enhnamn}</div></br>"+
            "<div class='popup-text1'><b>Adress:</b> ${adress}</div></br>"+
            "<div class='popup-text1'><b>Postnummer:</b> ${postnr}</div></br>"+
            "<div class='popup-text1'><b>Ort:</b> ${postanst}</div></br>"+
            "<div class='popup-text1'><b>Telefon:</b> ${tele1}</div></br>"+
            "<a class='popup-text1' href='${homepage}' target='_blank'>Läs mer</a>",
format: "image/png; mode=8bit",
zIndex: 330,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../skola/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=buf_gsk_skolor_&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Grundskolor i kommunen",
updateinterval: "Vid behov",
contact: "Anette Berg",
source: "Barn- och utbildningsförvaltningen",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Utbildning/Grundskola1/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/skola/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "buf_gymn_skolor_",
minZoom: 8,
maxZoom: 20,
category: ["Barn & utbildning"],
displayName: "Gymnasieskolor",
layerId: "Barn_o_utbildning/buf_gymn_skolor_",
alias: "gymnskolor",
project: "skola",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/skola/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Gymnasieskola</div>" +
            "<div class='popup-text1'><b>Namn:</b> ${skolnamn}</div></br>"+
            "<div class='popup-text1'><b>Adress:</b> ${adress}</div></br>"+
            "<div class='popup-text1'><b>Postnummer:</b> ${postnr}</div></br>"+
            "<div class='popup-text1'><b>Ort:</b> ${ort}</div></br>"+
            "<div class='popup-text1'><b>Telefon:</b> ${telefon1}</div></br>",
format: "image/png; mode=8bit",
zIndex: 340,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../skola/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=buf_gymn_skolor_&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Gymnasieskolor i kommunen",
updateinterval: "Vid behov",
contact: "Anette Berg",
source: "Barn- och utbildningsförvaltningen",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Utbildning/Gymnasium/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/skola/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "buf_resursskola",
minZoom: 8,
maxZoom: 20,
category: ["Barn & utbildning"],
displayName: "Resursskolor",
layerId: "Barn_o_utbildning/buf_resursskola",
alias: "buf_resursskola",
project: "skola",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/skola/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Resursskola</div>" +
            "<div class='popup-text1'><b>Namn:</b> ${enhnamn}</div>" +
            "<br/>" +
            "<div class='popup-text1'><b>Adress:</b> ${adress}</div>" +
            "<br/>" +
            "<div class='popup-text1'><b>Postnummer:</b> ${postnr}</div>" +
            "<br/>" +
            "<div class='popup-text1'><b>Ort:</b> ${postanst}</div>" +
            "<br/>" +
            "<a class='popup-text1' href='${homepage}' target='_blank'>Läs mer</a>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../skola/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=buf_resursskola&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Resursskolor i Kristianstad kommun",
updateinterval: "Vid behov",
contact: "Angelica Andersson",
source: "Barn- och utbildningsförvaltningen",
link: "http://www.kristianstad.se/sv/Skolportaler/resursskolan/om-skolan/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/skola/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "omr_f6skola",
minZoom: 8,
maxZoom: 20,
category: ["Barn & utbildning"],
displayName: "F-6 skolans upptagningsområde",
layerId: "Barn_o_utbildning/omr_f6skola",
alias: "omr_F6skola",
project: "skola",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/skola/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>F6-skolområde</div>" +
"<div class='popup-text1'><b>Namn:</b> ${f6skola} </div>",
format: "image/png; mode=8bit",
zIndex: 150,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../skola/?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=omr_f6skola&DPI=96&SYMBOLWIDTH=12&SYMBOLHEIGHT=8",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "F-6 skolans upptagningsområde",
updateinterval: "Vid behov",
contact: "Anette Berg",
source: "Barn- och utbildningsförvaltningen",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/skola/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "omr_skola",
minZoom: 8,
maxZoom: 20,
category: ["Barn & utbildning"],
displayName: "Skolområden",
layerId: "Barn_o_utbildning/omr_skola",
alias: "omr_skola",
project: "skola",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/skola/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Skolområde</div>" +
"<div class='popup-text1'><b>Namn:</b> ${skolomrade}</div>",
format: "image/png; mode=8bit",
zIndex: 150,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../skola/?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=omr_skola&DPI=96&SYMBOLWIDTH=12&SYMBOLHEIGHT=8",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Kristianstad kommuns grundskola är fr.o.m 2010.01.01 indelad i 4 skolområden, Skolområde Norra, Södra, Västra och Östra.",
updateinterval: "Vid behov",
contact: "Anette Berg",
source: "Barn- och utbildningsförvaltningen",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Utbildning/Skolomraden/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "mark",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Ledig mark & lokaler"],
displayName: "Mark",
layerId: "Bygga_o_bo/Ledig_mark_o_lokaler/mark",
alias: "vakant_mark",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:4326",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:4326",
},
popup: "<div class='popup-header1'>Ledig mark</div>" +
"<div class='popup-text1'><b>Adress:</b> ${address} </div></BR>" + 
"<div class='popup-text1'><b>Areal:</b> ${square_meters} m2 </div></BR>" +
"<div class='popup-text1'><b>Pris:</b> ${price}</div></BR>" +
"<div class='popup-text1'><b>Fastighetsaktör:</b> ${owner_name} </div></BR>" +
"<a class='popup-text1' href='${public_url}' target='_blank'>Mer info</a><BR/>"+
"<img style='width: inherit;' onclick='window.open(\"${image1}\")' src='${image1}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=legend_mark&BOXSPACE=-0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Ledig mark inom kommunen",
updateinterval: "Kontinuerligt",
contact: "Erik Zetterqvist",
source: "Vakant.nu",
link: "http://www.vakant.nu/kristianstad/search.aspx?tn=Mark",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "butik",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Ledig mark & lokaler"],
displayName: "Butiker",
layerId: "Bygga_o_bo/Ledig_mark_o_lokaler/butik",
alias: "vakant_butik",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:4326",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:4326",
},
popup: "<div class='popup-header1'>Ledig butikslokal</div>" +
"<div class='popup-text1'><b>Adress:</b>  ${address} </div></BR>" + 
"<div class='popup-text1'><b>Areal:</b>  ${square_meters} m2 </div></BR>" +
"<div class='popup-text1'><b>Pris:</b>  ${price} </div></BR>" +
"<div class='popup-text1'><b>Fastighetsaktör:</b>  ${owner_name} </div></BR>" +
"<a class='popup-text1' href='${public_url}' target='_blank'>Mer info</a><BR/>"+
"<img style='width: inherit;' onclick='window.open(\"${image1}\")' src='${image1}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=legend_butik&BOXSPACE=-0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Lediga butikslokaler inom kommunen",
updateinterval: "Kontinuerligt",
source: "Vakant.nu",
link: "http://www.vakant.nu/kristianstad/search.aspx?tn=Butik",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "byggprojekt",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Ledig mark & lokaler"],
displayName: "Byggprojekt",
layerId: "Bygga_o_bo/Ledig_mark_o_lokaler/byggprojekt",
alias: "vakant_byggprojekt",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:4326",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:4326",
},
popup: "<div class='popup-header1'>Ledigt byggprojekt</div>" +
"<div class='popup-text2'><b>Adress:</b> ${address} </div></BR>" + 
"<div class='popup-text2'><b>Areal:</b> ${square_meters} m2 </div></BR>" +
"<div class='popup-text2'><b>Pris:</b> ${price} </div></BR>" +
"<div class='popup-text2'><b>Fastighetsaktör:</b> ${owner_name} </div></BR>" +
"<a class='popup-text2' href='${public_url}' target='_blank'>Mer info</a><BR/>"+
"<img style='width: inherit;' onclick='window.open(\"${image1}\")' src='${image1}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=legend_byggprojekt&BOXSPACE=-0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Lediga byggprojekt inom kommunen",
updateinterval: "Kontinuerligt",
source: "Vakant.nu",
link: "http://www.vakant.nu/kristianstad/search.aspx?tn=Byggprojekt",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "industri",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Ledig mark & lokaler"],
displayName: "Industrier",
layerId: "Bygga_o_bo/Ledig_mark_o_lokaler/industri",
alias: "vakant_industri",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:4326",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:4326",
},
popup: "<div class='popup-header1'>Ledig industrilokal</div>" +
"<div class='popup-text1'><b>Adress:</b> ${address} </div></BR>" + 
"<div class='popup-text1'><b>Areal:</b> ${square_meters} m2 </div></BR>" +
"<div class='popup-text1'><b>Pris:</b> ${price} </div></BR>" +
"<div class='popup-text1'><b>Fastighetsaktör:</b> ${owner_name} </div></BR>" +
"<a class='popup-text1' href='${public_url}' target='_blank'>Mer info</a><BR/>"+
"<img style='width: inherit;' onclick='window.open(\"${image1}\")' src='${image1}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=legend_industri&BOXSPACE=-0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Lediga industrilokaler inom kommunen",
updateinterval: "Kontinuerligt",
source: "Vakant.nu",
link: "http://www.vakant.nu/kristianstad/search.aspx?tn=Industri",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "kontor",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Ledig mark & lokaler"],
displayName: "Kontor",
layerId: "Bygga_o_bo/Ledig_mark_o_lokaler/kontor",
alias: "vakant_kontor",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:4326",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:4326",
},
popup: "<div class='popup-header1'>Ledig kontorslokal</div>" +
"<div class='popup-text1'><b>Adress:</b> ${address} </div></BR>" + 
"<div class='popup-text1'><b>Areal:</b> ${square_meters} m2 </div></BR>" +
"<div class='popup-text1'><b>Pris:</b> ${price} </div></BR>" +
"<div class='popup-text1'><b>Fastighetsaktör:</b> ${owner_name} </div></BR>" +
"<a class='popup-text1' href='${public_url}' target='_blank'>Mer info</a></BR>"+
"<img style='width: inherit;' onclick='window.open(\"${image1}\")' src='${image1}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=legend_kontor&BOXSPACE=-0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Lediga kontorslokaler inom kommunen",
updateinterval: "Kontinuerligt",
source: "Vakant.nu",
link: "http://www.vakant.nu/kristianstad/search.aspx?tn=Kontor",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "kontorshotell",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Ledig mark & lokaler"],
displayName: "Kontorshotell",
layerId: "Bygga_o_bo/Ledig_mark_o_lokaler/kontorshotell",
alias: "vakant_kontorshotell",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:4326",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:4326",
},
popup: "<div class='popup-header1'>Ledig kontorshotellslokal</div>" +
"<div class='popup-text1'><b>Adress:</b> ${address} </div></BR>" + 
"<div class='popup-text1'><b>Areal:</b> ${square_meters} m2 </div></BR>" +
"<div class='popup-text1'><b>Pris:</b> ${price} </div></BR>" +
"<div class='popup-text1'><b>Fastighetsaktör:</b> ${owner_name} </div></BR>" +
"<a class='popup-text1' href='${public_url}' target='_blank'>Mer info</a><BR/>"+
"<img style='width: inherit;' onclick='window.open(\"${image1}\")' src='${image1}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=legend_kontorshotell&BOXSPACE=-0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Lediga kontorshotell inom kommunen",
updateinterval: "Kontinuerligt",
source: "Vakant.nu",
link: "http://www.vakant.nu/kristianstad/search.aspx?tn=Kontorshotell",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "lager",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Ledig mark & lokaler"],
displayName: "Lager",
layerId: "Bygga_o_bo/Ledig_mark_o_lokaler/lager",
alias: "vakant_lager",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:4326",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:4326",
},
popup: "<div class='popup-header1'>Ledig lagerlokal</div>" +
"<div class='popup-text1'><b>Adress:</b> ${address} </div></BR>" + 
"<div class='popup-text1'><b>Areal:</b> ${square_meters} m2 </div></BR>" +
"<div class='popup-text1'><b>Pris:</b> ${price} </div></BR>" +
"<div class='popup-text1'><b>Fastighetsaktör:</b> ${owner_name} </div></BR>" +
"<a class='popup-text1' href='${public_url}' target='_blank'>Mer info</a><BR/>"+
"<img style='width: inherit;' onclick='window.open(\"${image1}\")' src='${image1}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=legend_lager&BOXSPACE=-0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Lediga lagerlokaler inom kommunen",
updateinterval: "Kontinuerligt",
source: "Vakant.nu",
link: "http://www.vakant.nu/kristianstad/search.aspx?tn=Lager",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "restaurang",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Ledig mark & lokaler"],
displayName: "Restauranger",
layerId: "Bygga_o_bo/Ledig_mark_o_lokaler/restaurang",
alias: "vakant_restaurang",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:4326",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:4326",
},
popup: "<div class='popup-header1'>Ledig restauranglokal</div>" +
"<div class='popup-text1'><b>Adress:</b> ${address} </div></BR>" + 
"<div class='popup-text1'><b>Areal:</b> ${square_meters} m2 </div></BR>" +
"<div class='popup-text1'><b>Pris:</b> ${price} </div></BR>" +
"<div class='popup-text1'><b>Fastighetsaktör:</b> ${owner_name} </div></BR>" +
"<a class='popup-text1' href='${public_url}' target='_blank'>Mer info</a><BR/>"+
"<img style='width: inherit;' onclick='window.open(\"${image1}\")' src='${image1}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=legend_restaurang&BOXSPACE=-0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Lediga restauranglokaler inom kommunen",
updateinterval: "Kontinuerligt",
source: "Vakant.nu",
link: "http://www.vakant.nu/kristianstad/search.aspx?tn=Restauranger",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "ovrig",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Ledig mark & lokaler"],
displayName: "Övriga",
layerId: "Bygga_o_bo/Ledig_mark_o_lokaler/ovrig",
alias: "vakant_ovrigt",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:4326",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:4326",
},
popup: "<div class='popup-header1'>Ledig övrig lokal</div>" +
"<div class='popup-text1'><b>Adress:</b> ${address} </div></BR>" + 
"<div class='popup-text1'><b>Areal:</b> ${square_meters} m2 </div></BR>" +
"<div class='popup-text1'><b>Pris:</b> ${price} </div></BR>" +
"<div class='popup-text1'><b>Fastighetsaktör:</b> ${owner_name} </div></BR>" +
"<a class='popup-text1' href='${public_url}' target='_blank'>Mer info</a><BR/>"+
"<img style='width: inherit;' onclick='window.open(\"${image1}\")' src='${image1}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=legend_ovrig&BOXSPACE=-0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Lediga övriga lokaler inom kommunen",
updateinterval: "Kontinuerligt",
source: "Vakant.nu",
link: "http://www.vakant.nu/kristianstad/search.aspx?tn=Övrig",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "allt",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Ledig mark & lokaler"],
displayName: "All ledig mark/lokaler",
layerId: "Bygga_o_bo/Ledig_mark_o_lokaler/allt",
alias: "vakant",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:4326",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:4326",
},
popup: "<div class='popup-header1'>Ledig mark eller lokal</div>" +
"<div class='popup-text1'><b>Adress:</b> ${address} </div></BR>" + 
"<div class='popup-text1'><b>Areal:</b> ${square_meters} m2 </div></BR>" +
"<div class='popup-text1'><b>Pris:</b> ${price} </div></BR>" +
"<div class='popup-text1'><b>Fastighetsaktör:</b> ${owner_name} </div></BR>" +
"<a class='popup-text1' href='${public_url}' target='_blank'>Mer info</a><BR/>"+
"<img style='width: inherit;' onclick='window.open(\"${image1}\")' src='${image1}'>",
format: "image/png; mode=8bit",
zIndex: 340,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=legend_allt&BOXSPACE=-0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Ledig mark eller lokaler inom kommunen",
updateinterval: "Kontinuerligt",
source: "Vaknt.nu",
link: "http://www.vakant.nu/kristianstad/start.aspx",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "hogtvarde",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Kulturmiljöinventering"],
displayName: "Högt bevarandevärde",
layerId: "Bygga_o_bo/Kulturmiljöinventering/hogtvarde",
alias: "kulturmiljoinv_icat",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Fastighet: ${title}</div>" +
"<div class='popup-text1'><b>Bevarandevärde:</b> ${bevarandevarde}</div></br>"+
"<a class='popup-text1' href='http://geo.icatserver.com/services/kristianstad/fastighet.php?guid=${fastid}&type=kkarta&responseType=html' target='_blank'>Se alla bilder</a><br/>" +
"<img style='width: inherit;' onclick='window.open(\"${image}\")'src='${image}'><BR/>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=hogtvarde&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "De inventerade byggnaderna är markerade med hussymboler i färg och med siffror som anges i en 9-gradig skala. Färgen anger i vilken kategori byggnaden är värderad.  Den röda färgen anger bevarandevärdet 1-3 som är det högsta värdet, den rosa färgen anger bevarandevärdet 4-6 som är ett medelvärde och den blå färgen anger bevarandevärdet 7-9 som är det lägsta värdet. Den svarta hussymbolen med ett streck igenom har inte blivit graderad. En röd hussymbol med bevarandevärde 1 har alltså en ”toppklassning” och en blå hussymbol med bevarandevärde 9 är dess motsats. Observera att detta inte är kopplat husets ekonomiska värde. För ytterligare information om bedömningskriterier läs den fördjupade texten under länken mer information.%0A",
updateinterval: "Vid behov",
contact: "Katarina Olsson",
link: "http://193.17.67.229/publicerat/kulturmiljo/dokument/Byggnader.pdf",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "medelvarde",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Kulturmiljöinventering"],
displayName: "Medel bevarandevärde",
layerId: "Bygga_o_bo/Kulturmiljöinventering/medelvarde",
alias: "kulturmiljoinv_icat",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Fastighet: ${title}</div>" +
"<div class='popup-text1'><b>Bevarandevärde:</b> ${bevarandevarde}</div></br>"+
"<a class='popup-text1' href='http://geo.icatserver.com/services/kristianstad/fastighet.php?guid=${fastid}&type=kkarta&responseType=html' target='_blank'>Se alla bilder</a><br/>" +
"<img style='width: inherit;' onclick='window.open(\"${image}\")'src='${image}'><BR/>",
format: "image/png; mode=8bit",
zIndex: 349,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=medelvarde&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "De inventerade byggnaderna är markerade med hussymboler i färg och med siffror som anges i en 9-gradig skala. Färgen anger i vilken kategori byggnaden är värderad.  Den röda färgen anger bevarandevärdet 1-3 som är det högsta värdet, den rosa färgen anger bevarandevärdet 4-6 som är ett medelvärde och den blå färgen anger bevarandevärdet 7-9 som är det lägsta värdet. Den svarta hussymbolen med ett streck igenom har inte blivit graderad. En röd hussymbol med bevarandevärde 1 har alltså en ”toppklassning” och en blå hussymbol med bevarandevärde 9 är dess motsats. Observera att detta inte är kopplat husets ekonomiska värde. För ytterligare information om bedömningskriterier läs den fördjupade texten under länken mer information.%0A",
updateinterval: "Vid behov",
contact: "Katarina Olsson",
link: "http://193.17.67.229/publicerat/kulturmiljo/dokument/Byggnader.pdf",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "lagtvarde",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Kulturmiljöinventering"],
displayName: "Lågt bevarandevärde",
layerId: "Bygga_o_bo/Kulturmiljöinventering/lagtvarde",
alias: "kulturmiljoinv_icat",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Fastighet: ${title}</div>" +
"<div class='popup-text1'><b>Bevarandevärde:</b> ${bevarandevarde}</div></br>"+
"<a class='popup-text1' href='http://geo.icatserver.com/services/kristianstad/fastighet.php?guid=${fastid}&type=kkarta&responseType=html' target='_blank'>Se alla bilder</a><br/>" +
"<img style='width: inherit;' onclick='window.open(\"${image}\")'src='${image}'><BR/>",
format: "image/png; mode=8bit",
zIndex: 348,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=lagtvarde&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "De inventerade byggnaderna är markerade med hussymboler i färg och med siffror som anges i en 9-gradig skala. Färgen anger i vilken kategori byggnaden är värderad.  Den röda färgen anger bevarandevärdet 1-3 som är det högsta värdet, den rosa färgen anger bevarandevärdet 4-6 som är ett medelvärde och den blå färgen anger bevarandevärdet 7-9 som är det lägsta värdet. Den svarta hussymbolen med ett streck igenom har inte blivit graderad. En röd hussymbol med bevarandevärde 1 har alltså en ”toppklassning” och en blå hussymbol med bevarandevärde 9 är dess motsats. Observera att detta inte är kopplat husets ekonomiska värde. För ytterligare information om bedömningskriterier läs den fördjupade texten under länken mer information.%0A",
updateinterval: "Vid behov",
contact: "Katarina Olsson",
link: "http://193.17.67.229/publicerat/kulturmiljo/dokument/Byggnader.pdf",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "ingetvarde",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Kulturmiljöinventering"],
displayName: "Inget bevarandevärde",
layerId: "Bygga_o_bo/Kulturmiljöinventering/ingetvarde",
alias: "kulturmiljoinv_icat",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Fastighet: ${title}</div>" +
"<div class='popup-text1'><b>Bevarandevärde:</b> ${bevarandevarde}</div></br>"+
"<a class='popup-text1' href='http://geo.icatserver.com/services/kristianstad/fastighet.php?guid=${fastid}&type=kkarta&responseType=html' target='_blank'>Se alla bilder</a><br/>" +
"<img style='width: inherit;' onclick='window.open(\"${image}\")'src='${image}'><BR/>",
format: "image/png; mode=8bit",
zIndex: 347,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=ingetvarde&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "De inventerade byggnaderna är markerade med hussymboler i färg och med siffror som anges i en 9-gradig skala. Färgen anger i vilken kategori byggnaden är värderad.  Den röda färgen anger bevarandevärdet 1-3 som är det högsta värdet, den rosa färgen anger bevarandevärdet 4-6 som är ett medelvärde och den blå färgen anger bevarandevärdet 7-9 som är det lägsta värdet. Den svarta hussymbolen med ett streck igenom har inte blivit graderad. En röd hussymbol med bevarandevärde 1 har alltså en ”toppklassning” och en blå hussymbol med bevarandevärde 9 är dess motsats. Observera att detta inte är kopplat husets ekonomiska värde. För ytterligare information om bedömningskriterier läs den fördjupade texten under länken mer information.%0A",
updateinterval: "Vid behov",
contact: "Katarina Olsson",
link: "http://193.17.67.229/publicerat/kulturmiljo/dokument/Byggnader.pdf",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "omradesbeskrivning",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo", "Kulturmiljöinventering"],
displayName: "Kulturmiljöinventering områden",
layerId: "Bygga_o_bo/Kulturmiljöinventering/omradesbeskrivning",
alias: "omradesbeskrivning",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Område: ${omrade}</div>" +
						"<div class='popup-text1'><b>Beskrivning:</b> ${beskrivn}</div></br>"+
						"<a class='popup-text2' href='${lank}' target='_blank'>Läs mer</a><br/>" +
						"<div class='popup-text1'><b>Inventeringsmetod:</b> ${invent_met}</div></br>"+
						"<img style='width:inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/kulturmiljo/omrade_degeberga/${url_foto}\")'src='http://kartor.kristianstad.se/img/kulturmiljo/omrade_degeberga/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 150,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png; mode=8bit&DPI=96&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=omradesbeskrivning&SYMBOLWIDTH=12&SYMBOLHEIGHT=8",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Denna inventering och värdering är gjord som ett studentarbete inom den fristående delkursen projektledning på Landskapsvetarprogrammet på Högskolan i Kristianstad 2013. Uppgiften var att inventera och karaktäri-sera kulturhistoriskt intressanta byggnader och områden i Degeberga socken. De utvalda områdena utgick ifrån Kristianstads kulturmiljöpro-gram antaget av kommunfullmäktige 1993. Det här arbetet skall endast ses som ett studentarbete. ",
updateinterval: "Vid behov",
contact: "Katarina Olsson",
link: "http://193.17.67.229/publicerat/kulturmiljo/dokument/Kulturmiljoer.pdf",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kommunagd_mark/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "villatomter",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo"],
displayName: "Lediga villatomter",
layerId: "Bygga_o_bo/villatomter",
alias: "villatomter",
project: "kommunagd_mark",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kommunagd_mark/?",
srs: "EPSG:3008",
layers: "v_lediga_villatomter"
},
popup: "<div class='popup-header1'>Fastighet</div>" +
"<div class='popup-text1'><b>Fastighetsbeteckning:</b>  ${fbet} </div><BR/>"+
"<div class='popup-text1'><b>Areal:</b>  ${areal} m2 </div><BR/>"+
"<div class='popup-text1'><b>Pris:</b>  ${tomtpris} kr </div><BR/>",
format: "image/png; mode=8bit",
zIndex: 150,
opacity: 0.8,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kommunagd_mark/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png;%20mode=8bit&ICONLABELSPACE=2&LAYERTITLE=FALSE&ITEMFONTSIZE=9&LAYERSPACE=1&SYMBOLSPACE=1&LAYER=villatomter",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Lediga villatomter i Kristianstads kommun",
updateinterval: "Dagligen",
contact: "Marieth Johansson",
source: "Mark- och exploateringsenheten",
link: "https://www.kristianstad.se/sv/Kristianstads-kommun/Bo-Bygga/Lediga-villatomter/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/fastighetsindelning/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "fastighetsindelning_kkarta",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo"],
displayName: "Fastighetsindelning",
layerId: "Bygga_o_bo/fastighetsindelning_kkarta",
alias: "Fastighetsindelning",
project: "fastighetsindelning",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/fastighetsindelning/?",
srs: "EPSG:3008",
layers: "fastyta_"
},
popup: "<div class='popup-header1'>Fastighet</div>" +
"<div class='popup-text1'>${FASTIGHET}</div><BR/>"+
"<div class='popup-text1'><b>Registrerad area:</b> ${TOTALAR} </div><BR/>"+
"<div class='popup-text1'><b>Beräknad area:</b> ${AREA} </div><BR/>",



format: "image/png; mode=8bit",
zIndex: 250,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../fastighetsindelning/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png;%20mode=8bit&ICONLABELSPACE=2&LAYERTITLE=FALSE&ITEMFONTSIZE=9&LAYERSPACE=1&SYMBOLSPACE=1&LAYER=fastgrans_",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Fastighetsindelning från registerkarta. Kartan har ingen rättsverkan.",
updateinterval: "Dagligen",
contact: "Karl-Magnus Jönsson 044-135416",
source: "Stadsbyggnadskontoret",
link: "http://www.kristianstad.se/sv/Om-kommunen/Styrning-och-forvaltning/Forvaltningarna/Stadsbyggnads--kontoret/Lantmateri/",
}
},
{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/fastigheter_och_rattigheter_granspunkt_/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "granspunkt_",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo"],
displayName: "Gränspunkter",
layerId: "Bygga_o_bo/granspunkt_",
alias: "",
project: "fastigheter_och_rattigheter_granspunkt_",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3008",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/fastigheter_och_rattigheter_granspunkt_/?",
srs: "EPSG:3008",
layers: "granspunkt_"
},
popup: "<div class='popup-header1'>Gränspunkt</div>" +
"<div class='popup-text1'><b>Namn:</b> ${NAMN} </div><BR/>"+
"<div class='popup-text1'><b>Markeringstyp:</b> ${MARKERINGSTYP} </div><BR/>"+
"<div class='popup-text1'><b>Typbeskrivning:</b> ${TYPBESKRIVNING} </div><BR/>"+
"<div class='popup-text1'><b>X:</b> ${Y} </div><BR/>"+
"<div class='popup-text1'><b>Y:</b> ${X}</div><BR/>",	

		
format: "image/png; mode=8bit",
zIndex: 250,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../fastigheter_och_rattigheter_granspunkt_/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png;%20mode=8bit&ICONLABELSPACE=2&LAYERTITLE=FALSE&ITEMFONTSIZE=9&LAYERSPACE=1&SYMBOLSPACE=1&LAYER=granspunkt_",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Gränspunkter enligt den digitala registerkartan.",
updateinterval: "Dagligen",
contact: "	Anna Moberg",
source: "Miljö- och samhällsbyggnadsförvaltningen",
link: "http://www.kristianstad.se/sv/Om-kommunen/Styrning-och-forvaltning/Forvaltningarna/Stadsbyggnads--kontoret/Lantmateri/Granser/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/planer/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "planyta_",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo"],
displayName: "Gällande detaljplaner",
layerId: "Bygga_o_bo/planyta_",
alias: "planomr",
project: "planer",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/planer/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Planområde</div>" +
"<div class='popup-text1'><b>ID:</b> ${PLANBETECKNING} </div><BR/>"+
"<div class='popup-text1'><b>Typ:</b> ${PLANTYP} </div><BR/>"+
"<a class='popup-text1' href='http://193.17.67.229/cgi-bin/planer/planinfo.php?aktid=${function(a) {return encodeURI(a.FILE);}}' target='_blank'>Dokument</a>",
format: "image/png; mode=8bit",
zIndex: 150,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../planer/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png;%20mode=8bit&ICONLABELSPACE=2&LAYERTITLE=FALSE&ITEMFONTSIZE=9&LAYERSPACE=1&SYMBOLSPACE=1&LAYER=planyta_",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Detaljplanerna reglerar bland annat markanvändning, hur mycket på tomten man får bygga och var byggnader får placeras.",
updateinterval: "Dagligen",
contact: "Margareta Lannér Hagentoft",
source: "Stadsbyggnadskontoret",
link: "https://www.kristianstad.se/sv/Kristianstads-kommun/Bo-Bygga/Samhallsplanering/Detaljplanering/Vad-ar-en-detaljplan1/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/naturvarden/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "strandskyddsgrans_,strandskydd_",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo"],
displayName: "Strandskydd",
layerId: "Bygga_o_bo/strandskyddsgrans_,strandskydd_",
alias: "strandskydd_linje",
project: "naturvarden",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/naturvarden/?",
srs: "EPSG:3008",
layers: "strandskydd_"
},
popup: "<div class='popup-header1'>Strandskydd</div>" +
						"<div class='popup-text1'><b>ID:</b> ${EXTID}</div>" +
						"<br/>" +
						"<div class='popup-text1'><b>Typ:</b> ${OBJEKTTYP}</div>" +
						"<br/>" +
						"<a class='popup-text1' href='http://kartor.kristianstad.se/arkiv/Markrelaterade_bestammelser/${FILE}' target='_blank'>Dokument : ${FILE}</a><BR/>"+
						"<a class='popup-text1' href='http://kartor.kristianstad.se/arkiv/Markrelaterade_bestammelser/${FILE2}' target='_blank'>Dokument 2 : ${FILE2}</a>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../naturvarden/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png;%20mode=8bit&ICONLABELSPACE=2&LAYERTITLE=FALSE&ITEMFONTSIZE=9&LAYERSPACE=1&SYMBOLSPACE=1&LAYER=strandskyddsgrans_,strandskydd_",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Strandskyddets syfte är att långsiktigt trygga förutsättningarna för allemansrättslig tillgång till strandområden och att bevara goda förutsättningar för djur- och växtlivet på land och i vatten.",
contact: "Petra Mohager",
source: "Stadsbyggnadskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Bo-Bygga/Bygga/Strandskydd/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/planer/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "sammanhallen_bebyggelse",
minZoom: 8,
maxZoom: 20,
category: ["Bygga & bo"],
displayName: "Sammanhållen bebyggelse",
layerId: "Bygga_o_bo/sammanhallen_bebyggelse",
alias: "sammanhallen_bebyggelse",
project: "planer",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/planer/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Sammanhållen bebyggelse</div>" +
	"<div class='popup-text1'><b>Namn:</b> ${namn}</div>",
format: "image/png; mode=8bit",
zIndex: 150,
opacity: 0.6,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../planer/?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png; mode=8bit&DPI=96&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=sammanhallen_bebyggelse&SYMBOLWIDTH=12&SYMBOLHEIGHT=8",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Beslutat av byggnadsnämnden.  På fastigheter inom dessa områden krävs bygglov för tillbyggnader, komplementbyggnader, mur och plank även om bebyggelsen ligger utanför detaljplanelagt område.",
updateinterval: "2011",
contact: "Roger Jönsson",
source: "Stadsbyggnadskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Bo-Bygga/Bygga/Bygglov/sammanhallen_bebyggelse/",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "orto025",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Fotokarta 2014",
layerId: "Historiska_kartor/orto025",
alias: "orto_2014",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/jpeg",
zIndex: 152,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/lgd_flygfoto.png",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "Flygfotokarta från våren 2014",
updateinterval: "2014",
source: "Lantmäteriet",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "orto2012",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Fotokarta 2012",
layerId: "Historiska_kartor/orto2012",
alias: "orto_2012",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/jpeg",
zIndex: 154,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/lgd_flygfoto.png",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "Flygfotokarta från 2012",
updateinterval: "2012",
source: "Lantmäteriet",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "orto2010",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Fotokarta 2010",
layerId: "Historiska_kartor/orto2010",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/jpeg",
zIndex: 154,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/lgd_flygfoto.png",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "Flygfotokarta från 2010",
updateinterval: "2010",
source: "Lantmäteriet",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "1993 Ahus",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Åhus 1993",
layerId: "Historiska_kartor/1993 Ahus",
alias: "ahus_1993",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 156,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/geodata-1993_Ahus.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Stadskarta Åhus 1993",
source: "Stadsbyggnadskontoret",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "1993 Kristianstad",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Kristianstad 1993",
layerId: "Historiska_kartor/1993 Kristianstad",
alias: "kstad_1993",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 158,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/geodata-1993_Ahus.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Stadskarta Kristianstad 1993",
source: "Stadsbyggnadskontoret",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "1980 Kristianstad",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Kristianstad 1980",
layerId: "Historiska_kartor/1980 Kristianstad",
alias: "kstad_1980",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 160,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/geodata-1980_Kristianstad.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Stadskarta Kristianstad 1980",
source: "Stadsbyggnadskontoret",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "1965 Kristianstad",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Kristianstad 1965",
layerId: "Historiska_kartor/1965 Kristianstad",
alias: "kstad_1965",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 161,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/geodata-1965_Kristianstad.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Stadskarta Kristianstad 1965",
source: "Stadsbyggnadskontoret",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "1955 Kristianstad",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Kristianstad 1955",
layerId: "Historiska_kartor/1955 Kristianstad",
alias: "kstad_1955",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 162,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/geodata-1955_Kristianstad.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Stadskarta Kristianstad 1955",
source: "Stadsbyggnadskontoret",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "1940swe991330",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Fotokarta 1940-tal",
layerId: "Historiska_kartor/1940swe991330",
alias: "orto_1940",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/jpeg",
zIndex: 163,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/Fotokarta_1940-tal.png",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "Fotona togs fram%0Aav Lantmäterieverket (flygningar) i slutet av 1930-början av 40-talet. Syftet var antingen produktion%0Aav ekonomisk karta eller militär änvändning. Dock kom andra världskriget emellan och diverse andra%0Aorsaker gjorde att dessa bilder inte användes eftersom de ansågs för gamla när produktion av ek.%0Akartan väl kom igång.",
updateinterval: "Kustområdena 1939-40 och inlandet 1947",
contact: "Karin Larsson",
source: "Lunds universitet",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "1933 Kristianstad T Hagelthorn",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Kristianstad 1933",
layerId: "Historiska_kartor/1933 Kristianstad T Hagelthorn",
alias: "kstad_1933",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 164,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/geodata-1933_Kristianstad_T_Hagelthorn.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Stadskarta Kristianstad 1933",
contact: "Karin Larsson",
source: "Stadsbyggnadskontoret",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "geodata:1930_Haradskartan",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Häradskartan 1926-34",
layerId: "Historiska_kartor/geodata:1930_Haradskartan",
alias: "haradskartan_1930",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 165,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/kstad-haradskartan.jpg",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "geodata:1862_generalstabskartan",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Generalstabskartan 1862",
layerId: "Historiska_kartor/geodata:1862_generalstabskartan",
alias: "generalstabskartan_1862",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 166,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/geodata-1862_generalstabskartan.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "geodata:1854 Christianstad G Ljunggren",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Kristianstad 1854",
layerId: "Historiska_kartor/geodata:1854 Christianstad G Ljunggren",
alias: "ljunggren_1854",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 167,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/geodata-1854_Christianstad_G_Ljunggren.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "geodata:1812_skrek",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Skånska rekognoceringskartan 1812",
layerId: "Historiska_kartor/geodata:1812_skrek",
alias: "sk_rek_1812",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 168,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/Skanska_rekognoceringskartan_1812.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "geodata:1752 Helgea emellan Christianstad och Torsebro C-G Rubens",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Helgeå 1752",
layerId: "Historiska_kartor/geodata:1752 Helgea emellan Christianstad och Torsebro C-G Rubens",
alias: "helgea_1752",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 169,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/Helgea_1752.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "geodata:1748 Lagvatten Kristianstad Krigsarkivet",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Lågvatten 1748",
layerId: "Historiska_kartor/geodata:1748 Lagvatten Kristianstad Krigsarkivet",
alias: "lagvatten_1748",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 170,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/Lagvatten_1748.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "geodata:1748 Hogvatten Kristianstad Krigsarkivet",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Högvatten 1748",
layerId: "Historiska_kartor/geodata:1748 Hogvatten Kristianstad Krigsarkivet",
alias: "hogvatten_1748",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 171,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/Hogvatten_1748.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "geodata:1746 Lagvatten Helgea Special Charta",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Lågvatten 1746",
layerId: "Historiska_kartor/geodata:1746 Lagvatten Helgea Special Charta",
alias: "lagvatten_1746",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 172,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/Lagvatten_1746.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "geodata:1746 Hogvatten Helgea Special Charta",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Högvatten 1746",
layerId: "Historiska_kartor/geodata:1746 Hogvatten Helgea Special Charta",
alias: "hogvatten_1746",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 173,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/hogvatten1746.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "geodata:1684 Buhrmans Schoone",
minZoom: 8,
maxZoom: 20,
category: ["Historiska kartor"],
displayName: "Buhrmans skånekarta 1684",
layerId: "Historiska_kartor/geodata:1684 Buhrmans Schoone",
alias: "buhrman_1684",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 174,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/buhrman.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "fornyelsebar",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Besökspunkter klimat & miljö"],
displayName: "Förnyelsebar elproduktion",
layerId: "Se_o_göra/Besökspunkter_klimat_o_miljö/fornyelsebar",
alias: "klimatvisionen_sv",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn}</div>" +
"<div class='popup-text1'>${beskrivning}</div></br>"+
"<a class='popup-text1' href='${lank1}' target='_blank'>Länk</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 347,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=fornyelsebar&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Klimatvisionen är en lärarhandledning vars syfte är att hjälla dig som pedagog att fånga in klimatpromblematiken i skolans alla ämnen och belysa hur arbetet kan göras på ett bra och fungerande sätt över ämnesgränserna.",
updateinterval: "Vid behov",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Miljo-klimat/Energi-och-klimat/Klimat/Klimatvisionen/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "uppvarmning",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Besökspunkter klimat & miljö"],
displayName: "Uppvärmning",
layerId: "Se_o_göra/Besökspunkter_klimat_o_miljö/uppvarmning",
alias: "klimatvisionen_sv",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn}</div>" +
"<div class='popup-text1'>${beskrivning}</div></br>"+
"<a class='popup-text1' href='${lank1}' target='_blank'>Länk</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 346,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=uppvarmning&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Klimatvisionen är en lärarhandledning vars syfte är att hjälla dig som pedagog att fånga in klimatpromblematiken i skolans alla ämnen och belysa hur arbetet kan göras på ett bra och fungerande sätt över ämnesgränserna.",
updateinterval: "Vid behov",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Miljo-klimat/Energi-och-klimat/Klimat/Klimatvisionen/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "biogas_sv",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Besökspunkter klimat & miljö"],
displayName: "Biogas",
layerId: "Se_o_göra/Besökspunkter_klimat_o_miljö/biogas_sv",
alias: "klimatvisionen_sv",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn}</div>" +
"<div class='popup-text1'>${beskrivning}</div></br>"+
"<a class='popup-text1' href='${lank1}' target='_blank'>Länk</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 348,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=biogas_sv&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Klimatvisionen är en lärarhandledning vars syfte är att hjälla dig som pedagog att fånga in klimatpromblematiken i skolans alla ämnen och belysa hur arbetet kan göras på ett bra och fungerande sätt över ämnesgränserna.",
updateinterval: "Vid behov",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Miljo-klimat/Energi-och-klimat/Klimat/Klimatvisionen/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "avfallshantering",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Besökspunkter klimat & miljö"],
displayName: "Avfallshantering",
layerId: "Se_o_göra/Besökspunkter_klimat_o_miljö/avfallshantering",
alias: "klimatvisionen_sv",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn}</div>" +
"<div class='popup-text1'>${beskrivning}</div></br>"+
"<a class='popup-text1' href='${lank1}' target='_blank'>Länk</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=avfallshantering&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Klimatvisionen är en lärarhandledning vars syfte är att hjälla dig som pedagog att fånga in klimatpromblematiken i skolans alla ämnen och belysa hur arbetet kan göras på ett bra och fungerande sätt över ämnesgränserna.",
updateinterval: "Vid behov",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Miljo-klimat/Energi-och-klimat/Klimat/Klimatvisionen/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "vattenoavlopp",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Besökspunkter klimat & miljö"],
displayName: "Vatten & avlopp",
layerId: "Se_o_göra/Besökspunkter_klimat_o_miljö/vattenoavlopp",
alias: "klimatvisionen_sv",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn}</div>" +
"<div class='popup-text1'>${beskrivning}</div></br>"+
"<a class='popup-text1' href='${lank1}' target='_blank'>Länk</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=vattenoavlopp&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Klimatvisionen är en lärarhandledning vars syfte är att hjälla dig som pedagog att fånga in klimatpromblematiken i skolans alla ämnen och belysa hur arbetet kan göras på ett bra och fungerande sätt över ämnesgränserna.",
updateinterval: "Vid behov",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Miljo-klimat/Energi-och-klimat/Klimat/Klimatvisionen/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "hallbart",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Besökspunkter klimat & miljö"],
displayName: "Hållbart byggande",
layerId: "Se_o_göra/Besökspunkter_klimat_o_miljö/hallbart",
alias: "klimatvisionen_sv",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn}</div>" +
"<div class='popup-text1'>${beskrivning}</div></br>"+
"<a class='popup-text1' href='${lank1}' target='_blank'>Länk</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=hallbart&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Klimatvisionen är en lärarhandledning vars syfte är att hjälla dig som pedagog att fånga in klimatpromblematiken i skolans alla ämnen och belysa hur arbetet kan göras på ett bra och fungerande sätt över ämnesgränserna.",
updateinterval: "Vid behov",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Miljo-klimat/Energi-och-klimat/Klimat/Klimatvisionen/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "klimatanp",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Besökspunkter klimat & miljö"],
displayName: "Anpassning klimatförändringar",
layerId: "Se_o_göra/Besökspunkter_klimat_o_miljö/klimatanp",
alias: "klimatvisionen_sv",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn}</div>" +
"<div class='popup-text1'>${beskrivning}</div></br>"+
"<a class='popup-text1' href='${lank1}' target='_blank'>Länk</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 349,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=klimatanp&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Klimatvisionen är en lärarhandledning vars syfte är att hjälla dig som pedagog att fånga in klimatpromblematiken i skolans alla ämnen och belysa hur arbetet kan göras på ett bra och fungerande sätt över ämnesgränserna.",
updateinterval: "Vid behov",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Miljo-klimat/Energi-och-klimat/Klimat/Klimatvisionen/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "utstallningar",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Besökspunkter klimat & miljö"],
displayName: "Utställningar",
layerId: "Se_o_göra/Besökspunkter_klimat_o_miljö/utstallningar",
alias: "klimatvisionen_sv",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn}</div>" +
"<div class='popup-text1'>${beskrivning}</div></br>"+
"<a class='popup-text1' href='${lank1}' target='_blank'>Länk</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 349,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=utstallningar&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Klimatvisionen är en lärarhandledning vars syfte är att hjälla dig som pedagog att fånga in klimatpromblematiken i skolans alla ämnen och belysa hur arbetet kan göras på ett bra och fungerande sätt över ämnesgränserna.",
updateinterval: "Vid behov",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Miljo-klimat/Energi-och-klimat/Klimat/Klimatvisionen/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "renewable",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Points of interest climate & env."],
displayName: "Renewable electricity production",
layerId: "Se_o_göra/Points_of_interest_climate_o_env./renewable",
alias: "klimatvisionen_en",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn_en}</div>" +
"<div class='popup-text1'>${beskrivning_en}</div></br>"+
"<a class='popup-text1' href='${lank2}' target='_blank'>Link</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 347,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=renewable&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "The municipality of Kristianstad has many interesting sites with connection to our work with Fossil Fuel Free Municipality, that are suitable for study visits. We are happy to receive you!",
updateinterval: "As needed",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Sprak/English/Environment/Visits/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "heating",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Points of interest climate & env."],
displayName: "Heating",
layerId: "Se_o_göra/Points_of_interest_climate_o_env./heating",
alias: "klimatvisionen_en",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn_en}</div>" +
"<div class='popup-text1'>${beskrivning_en}</div></br>"+
"<a class='popup-text1' href='${lank2}' target='_blank'>Link</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 346,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=heating&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "The municipality of Kristianstad has many interesting sites with connection to our work with Fossil Fuel Free Municipality, that are suitable for study visits. We are happy to receive you!",
updateinterval: "As needed",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Sprak/English/Environment/Visits/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "biogas_en",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Points of interest climate & env."],
displayName: "Biogas",
layerId: "Se_o_göra/Points_of_interest_climate_o_env./biogas_en",
alias: "klimatvisionen_en",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn_en}</div>" +
"<div class='popup-text1'>${beskrivning_en}</div></br>"+
"<a class='popup-text1' href='${lank2}' target='_blank'>Link</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 348,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=biogas_en&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "The municipality of Kristianstad has many interesting sites with connection to our work with Fossil Fuel Free Municipality, that are suitable for study visits. We are happy to receive you!",
updateinterval: "As needed",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Sprak/English/Environment/Visits/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "waste",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Points of interest climate & env."],
displayName: "Waste management",
layerId: "Se_o_göra/Points_of_interest_climate_o_env./waste",
alias: "klimatvisionen_en",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn_en}</div>" +
"<div class='popup-text1'>${beskrivning_en}</div></br>"+
"<a class='popup-text1' href='${lank2}' target='_blank'>Link</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=waste&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "The municipality of Kristianstad has many interesting sites with connection to our work with Fossil Fuel Free Municipality, that are suitable for study visits. We are happy to receive you!",
updateinterval: "As needed",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Sprak/English/Environment/Visits/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "watersystem",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Points of interest climate & env."],
displayName: "Water & sewage system",
layerId: "Se_o_göra/Points_of_interest_climate_o_env./watersystem",
alias: "klimatvisionen_en",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn_en}</div>" +
"<div class='popup-text1'>${beskrivning_en}</div></br>"+
"<a class='popup-text1' href='${lank2}' target='_blank'>Link</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=watersystem&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "The municipality of Kristianstad has many interesting sites with connection to our work with Fossil Fuel Free Municipality, that are suitable for study visits. We are happy to receive you!",
updateinterval: "As needed",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Sprak/English/Environment/Visits/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "sustainable",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Points of interest climate & env."],
displayName: "Sustainable housing",
layerId: "Se_o_göra/Points_of_interest_climate_o_env./sustainable",
alias: "klimatvisionen_en",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn_en}</div>" +
"<div class='popup-text1'>${beskrivning_en}</div></br>"+
"<a class='popup-text1' href='${lank2}' target='_blank'>Link</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=sustainable&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "The municipality of Kristianstad has many interesting sites with connection to our work with Fossil Fuel Free Municipality, that are suitable for study visits. We are happy to receive you!",
updateinterval: "As needed",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Sprak/English/Environment/Visits/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "climateadapt",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Points of interest climate & env."],
displayName: "Climate adaptation",
layerId: "Se_o_göra/Points_of_interest_climate_o_env./climateadapt",
alias: "klimatvisionen_en",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn_en}</div>" +
"<div class='popup-text1'>${beskrivning_en}</div></br>"+
"<a class='popup-text1' href='${lank2}' target='_blank'>Link</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 349,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=climateadapt&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "The municipality of Kristianstad has many interesting sites with connection to our work with Fossil Fuel Free Municipality, that are suitable for study visits. We are happy to receive you!",
updateinterval: "As needed",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Sprak/English/Environment/Visits/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "exhibitions",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra", "Points of interest climate & env."],
displayName: "Exhibitions",
layerId: "Se_o_göra/Points_of_interest_climate_o_env./exhibitions",
alias: "klimatvisionen_en",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>${namn_en}</div>" +
"<div class='popup-text1'>${beskrivning_en}</div></br>"+
"<a class='popup-text1' href='${lank2}' target='_blank'>Link</a><BR/>" +
"<img style='width: inherit;' onclick='window.open(\"http://kartor.kristianstad.se/img/klimatvisionen/${bild}\")' src='http://kartor.kristianstad.se/img/klimatvisionen/${bild}'>",
format: "image/png; mode=8bit",
zIndex: 349,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=exhibitions&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "The municipality of Kristianstad has many interesting sites with connection to our work with Fossil Fuel Free Municipality, that are suitable for study visits. We are happy to receive you!",
updateinterval: "As needed",
contact: "Lennart Erfors",
source: "Kommunledningskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Sprak/English/Environment/Visits/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "badplatser",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra"],
displayName: "Badplatser",
layerId: "Se_o_göra/badplatser",
alias: "badplatser",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Badplats:${badplats}</div>" +
"<div class='popup-text1'><b>Information:</b> ${info}</div></br>"+
"<div class='popup-text1'><b>Övrigt:</b> ${ovrigt}</div></br>"+
"<div class='popup-text1'><b>Skötsel:</b> ${skotsel}</div></br>"+
"<a class='popup-text1' href='${url}' target='_blank'>Mer information</a>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=badplatser&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Badplatser i Kristianstads kommun.",
updateinterval: "Vid behov",
contact: "Turistbyrån",
source: "Turistbyrån",
link: "http://www.turism.kristianstad.se/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "friluftsbad",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra"],
displayName: "Friluftsbad",
layerId: "Se_o_göra/friluftsbad",
alias: "friluftsbad",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'><b>Badplats:</b> ${namn}</div></br>" +
"<div class='popup-text1'><b>Adress:</b> ${adress}</div></br>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=friluftsbad&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Friluftsbad i Kristianstads kommun",
updateinterval: "Vid behov",
contact: "Turistbyrån och kultur & fritid",
source: "Turistbyrån och kultur & fritid",
link: "http://turism.kristianstad.se/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kultur_och_fritid/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "lekforalla",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra"],
displayName: "Temalekplatser/lek för alla",
layerId: "Se_o_göra/lekforalla",
alias: "lekforalla",
project: "kultur_och_fritid",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kultur_och_fritid/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Lekplats</div>" +
"<div class='popup-text1'><b>Namn:</b> ${namn}</div></br>"+
"<div class='popup-text1'><b>Beskrivning:</b> ${beskrivning}</div></br>"+
"<a class='popup-text1' href='${linkurl}' target='_blank'>Hemsida</a></br>"+
"<img style='width: inherit;' src='${imgurl}' />",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kultur_och_fritid/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=lekforalla&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "&quot;Lek för alla&quot;-lekplatser är tillgänglighetsanpassade så att alla skall kunna leka. De finns placerade runt om i de större orterna i kommunen och är tema-designade i samarbete med invånare, lokala föreningar eller grupper.",
updateinterval: "Kontinuerligt",
contact: "Henrik Wester",
source: "C4 teknik",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Djur--natur/Parker/Lekplatser1/Lekplatser/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kultur_och_fritid/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "lekplatser",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra"],
displayName: "Lekplatser",
layerId: "Se_o_göra/lekplatser",
alias: "lekplats",
project: "kultur_och_fritid",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kultur_och_fritid/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Lekplats</div>" +
"<div class='popup-text1'><b>Namn:</b> ${namn}</div></br>"+
"<div class='popup-text1'><b>Beskrivning:</b> ${beskrivning}</div></br>"+
"<a class='popup-text1' href='${linkurl}' target='_blank'>Hemsida</a></br>"+
"<img style='width: inherit;'  src='${imgurl}' />",
format: "image/png; mode=8bit",
zIndex: 340,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kultur_och_fritid/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=lekplatser&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Lekplatser i Kristianstads kommun",
updateinterval: "Kontinuerligt",
contact: "Henrik Wester",
source: "C4 teknik",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Djur--natur/Parker/Lekplatser1/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kultur_och_fritid/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "park_v",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra"],
displayName: "Parker",
layerId: "Se_o_göra/park_v",
alias: "park",
project: "kultur_och_fritid",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kultur_och_fritid/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Park</div>" +
"<div class='popup-text1'><b>Namn:</b> ${namn} </div><BR/>"+
"<div class='popup-text1'><b>Beskrivning:</b> ${beskrivning} </div><BR/>"+
"<a class='popup-text1' href='${url}' target='_blank'>Länk</a><BR/>"+
"<img style='width:inherit;' src='http://www.kristianstad.se${img}' ></img>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kultur_och_fritid/?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png; mode=8bit&DPI=96&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=park_v&SYMBOLWIDTH=12&SYMBOLHEIGHT=8",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Parker i Kristianstad",
updateinterval: "Kontinuerligt",
contact: "Henrik Wester",
source: "C4 teknik",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Djur--natur/Parker/Vara-parker/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/naturvarden/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "naturreservat_",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra"],
displayName: "Naturreservat",
layerId: "Se_o_göra/naturreservat_",
alias: "naturreservat",
project: "naturvarden",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/naturvarden/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Naturreservat</div>" +
						"<div class='popup-text1'><b>ID:</b> ${EXTID}</div>" +
						"<br/>" +
						"<div class='popup-text1'><b>Typ:</b> ${OBJEKTTYP}</div>" +
						"<br/>" +
						"<a class='popup-text1' href='http://kartor.kristianstad.se/arkiv/Markrelaterade_bestammelser/${FILE}' target='_blank'>Dokument : ${FILE}</a><BR/>"+
						"<a class='popup-text1' href='http://kartor.kristianstad.se/arkiv/Markrelaterade_bestammelser/${FILE2}' target='_blank'>Dokument 2 : ${FILE2}</a>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../naturvarden/?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png; mode=8bit&DPI=96&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=naturreservat_&SYMBOLWIDTH=12&SYMBOLHEIGHT=8",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Naturreservat inom Kristianstads kommun",
updateinterval: "Dagligen",
contact: "Håkan Lindén",
source: "Stadsbyggnadskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Djur--natur/Natur/Naturreservat/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/naturvarden/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "naturvardsplan",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra"],
displayName: "Värdefull natur",
layerId: "Se_o_göra/naturvardsplan",
alias: "c4_naturvardsprogram",
project: "naturvarden",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/naturvarden/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>C4 Naturvårdplan</div>" +
"<div class='popup-text1'><b>ID:</b> ${namn}</div>" +
"<br/>" +
"<div class='popup-text1'><b>Beskrivning:</b> ${beskrivnin}</div>" +
"<br/>" +
"<a class='popup-text1' href='http://193.17.67.229/publicerat/naturvardsplan/${originalid}.pdf' target='_blank'>Läs mer</a>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../naturvarden/?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png; mode=8bit&DPI=96&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=naturvardsplan&SYMBOLWIDTH=12&SYMBOLHEIGHT=8",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "För att kunna driva ett effektivt naturvårdsarbete har en sammanställning av värdefull natur inom kommunen gjorts. Sammanlagt finns ca 160 områden beskrivna i rapporten. Alla invånare i Kristianstads kommun har nära till värdefull natur!",
updateinterval: "Vid behov",
contact: "Ulrika Hedlund",
source: "Miljö- och hälsoskyddskontoret",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Djur--natur/Natur/Natur-i-Kristianstad---naturvards-sammanstallning/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kultur_och_fritid/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "vattenriket_besoksplatser",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra"],
displayName: "Besöksplatser vattenriket",
layerId: "Se_o_göra/vattenriket_besoksplatser",
alias: "besok_biosfar",
project: "kultur_och_fritid",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kultur_och_fritid/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Besökplats Vattenriket</div>" +
"<div class='popup-text1'><b>Namn:</b> ${namn}</div></BR>" +
"<div class='popup-text1'><b>Beskrivning:</b> ${beskrivning} </div></BR>" +
"<a class='popup-text1' href='${www}' target='_blank'>Länk</a><BR/>" +
"<img style='width: inherit;'  onclick='window.open(\"${img}\")' src='${img}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kultur_och_fritid/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=vattenriket_besoksplatser&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Besöksplatser i Kristianstads vattenrike",
updateinterval: "Vid behov",
contact: "Karin Magntorn",
source: "Biosfärkontoret",
link: "http://www.vattenriket.kristianstad.se/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kultur_och_fritid/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "skulpturer",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra"],
displayName: "Skulpturer",
layerId: "Se_o_göra/skulpturer",
alias: "skulptur",
project: "kultur_och_fritid",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kultur_och_fritid/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Skulptur</div>" +
"<div class='popup-text1'><b>Namn:</b> ${namn}</div></br>"+
"<div class='popup-text1'><b>Nummer:</b> ${nr}</div></br>"+
"<div class='popup-text1'><b>Konstnär:</b> ${skulptor}</div></br>"+
"<a class='popup-text1' href='${url}' target='_blank'>Hemsida</a></br>"+
"<img style='width: inherit;'  src='${img}' />",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kultur_och_fritid/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=skulpturer&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Skulpturer i Kristianstads och Åhus tätorter",
updateinterval: "Vid behov",
contact: "Kristina Jungbeck",
source: "Kultur- och fritid",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Kultur-Fritid/Kultur/Skulpturer/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "byggnadsskyltar",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra"],
displayName: "Historiska byggnader",
layerId: "Se_o_göra/byggnadsskyltar",
alias: "Byggnadsskyltar",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Byggnad</div>" +
"<div class='popup-text1'><b>Byggnadsnamn:</b> ${byggnadsnamn}</div></br>"+
"<div class='popup-text1'><b>Fastighet:</b> ${fastighet}</div></br>"+
"<div class='popup-text1'><b>Fastighetsadress:</b> ${fastighetsadress}</div></br>"+
"<div class='popup-text1'><b>Historik:</b> ${historik}</div></br>"+
"<a class='popup-text1' href='${url}' target='_blank'>Information rundvandring - Läs</a></br>"+
"<img style='width: inherit;' onclick='window.open(\"${img}\")' src='${img}'>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=byggnadsskyltar&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Historiska byggnader i Kristianstads centrum",
updateinterval: "Vid behov",
contact: "Mariann Bergdahl och Monica Lundström",
source: "Stadsbyggnadskontoret",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "polisstationer",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra"],
displayName: "Polisstationer",
layerId: "Se_o_göra/polisstationer",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=legend_polisstationer&BOXSPACE=-0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "bibliotek",
minZoom: 8,
maxZoom: 20,
category: ["Se & göra"],
displayName: "Bibliotek",
layerId: "Se_o_göra/bibliotek",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Bibliotek</div>" +
"<div class='popup-text1'><b>Namn:</b> ${namn}</div></br>"+
"<div class='popup-text1'><b>Adress:</b> ${adress}</div></br>"+
"<div class='popup-text1'><b>Ort:</b> ${ort}</div></br>"+
"<div class='popup-text1'><b>Telefon:</b> ${telefon}</div></br>"+
"<a class='popup-text1' href='mailto:${epost}' >Skicka e-post</a></br>"+
"<a class='popup-text1' href='${webb}' target='_blank'>Läs mer</a></br>"+
"<img style='width: inherit;'  src='${foto}' />",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=bibliotek&BOXSPACE=-0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/vag_och_trafik/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "betalparkeringar",
minZoom: 8,
maxZoom: 20,
category: ["Trafik & resor", "Parkering i stadskärna"],
displayName: "Betalparkeringar",
layerId: "Trafik_o_resor/Parkering_i_stadskärna/betalparkeringar",
alias: "parkering",
project: "vag_och_trafik",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/vag_och_trafik/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Parkering</div>" +
"<div class='popup-text1'><b>Namn:</b> ${namn}</div></br>"+
"<div class='popup-text1'><b>Taxa:</b> ${taxa} kr/tim</div></br>"+
"<div class='popup-text1'><b>Antal:</b> ${antal}</div></br>"+
"<div class='popup-text1'><b>Kommentar:</b> ${kommentar}</div>",
format: "image/png; mode=8bit",
zIndex: 309,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../vag_och_trafik/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=betalparkeringar&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Parkeringsplatser i stadskärnan",
updateinterval: "Kontinuerligt",
contact: "Henrik Wester",
source: "C4 teknik",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Trafik-Transport/Biltrafik/Parkering/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/vag_och_trafik/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "gratisparkeringar",
minZoom: 8,
maxZoom: 20,
category: ["Trafik & resor", "Parkering i stadskärna"],
displayName: "Gratisparkeringar",
layerId: "Trafik_o_resor/Parkering_i_stadskärna/gratisparkeringar",
alias: "parkering",
project: "vag_och_trafik",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/vag_och_trafik/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Parkering</div>" +
"<div class='popup-text1'><b>Namn:</b> ${namn}</div></br>"+
"<div class='popup-text1'><b>Taxa:</b> ${taxa} kr/tim</div></br>"+
"<div class='popup-text1'><b>Antal:</b> ${antal}</div></br>"+
"<div class='popup-text1'><b>Kommentar:</b> ${kommentar}</div>",
format: "image/png; mode=8bit",
zIndex: 310,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../vag_och_trafik/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=gratisparkeringar&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Parkeringsplatser i stadskärnan",
updateinterval: "Kontinuerligt",
contact: "Henrik Wester",
source: "C4 teknik",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Trafik-Transport/Biltrafik/Parkering/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/vag_och_trafik/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "privatparkeringar",
minZoom: 8,
maxZoom: 20,
category: ["Trafik & resor", "Parkering i stadskärna"],
displayName: "Privatägda parkeringar",
layerId: "Trafik_o_resor/Parkering_i_stadskärna/privatparkeringar",
alias: "parkering",
project: "vag_och_trafik",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/vag_och_trafik/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Parkering</div>" +
"<div class='popup-text1'><b>Namn:</b> ${namn}</div></br>"+
"<div class='popup-text1'><b>Taxa:</b> ${taxa} kr/tim</div></br>"+
"<div class='popup-text1'><b>Antal:</b> ${antal}</div></br>"+
"<div class='popup-text1'><b>Kommentar:</b> ${kommentar}</div>",
format: "image/png; mode=8bit",
zIndex: 308,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../vag_och_trafik/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=privatparkeringar&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Parkeringsplatser i stadskärnan",
updateinterval: "Kontinuerligt",
contact: "Henrik Wester",
source: "C4 teknik",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Trafik-Transport/Biltrafik/Parkering/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/vag_och_trafik/?DPI=96&gutters=27:50",
options : {
tiled:true,
tileSize: 512,
layers: "hcpparkering_v",
minZoom: 8,
maxZoom: 20,
category: ["Trafik & resor", "Parkering i stadskärna"],
displayName: "HCP-parkeringsplatser",
layerId: "Trafik_o_resor/Parkering_i_stadskärna/hcpparkering_v",
alias: "hcpparkering",
project: "vag_och_trafik",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/vag_och_trafik/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>HCP-parkeringsplats</div>" +
"<div class='popup-text1'><b>Namn:</b> ${namn}</div></br>"+
"<div class='popup-text1'><b>Kommentar:</b> ${kommentar}</div>",
format: "image/png; mode=8bit",
zIndex: 311,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../vag_och_trafik/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=hcpparkering_v&BOXSPACE=0.2&SYMBOLWIDTH=8&SYMBOLHEIGHT=6.5",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Handikapp-parkering",
updateinterval: "Kontinuerligt",
contact: "Henrik Wester",
source: "C4 teknik",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/vag_och_trafik/?DPI=96&gutters=27:50",
options : {
tiled:true,
tileSize: 512,
layers: "cykelparkering_v",
minZoom: 8,
maxZoom: 20,
category: ["Trafik & resor", "Parkering i stadskärna"],
displayName: "Cykelparkering",
layerId: "Trafik_o_resor/Parkering_i_stadskärna/cykelparkering_v",
alias: "cykelparkering",
project: "vag_och_trafik",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/vag_och_trafik/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Parkering</div>" +
"<div class='popup-text1'><b>Namn:</b> ${namn}</div></br>"+
"<div class='popup-text1'><b>Kommentar:</b> ${kommentar}</div>",
format: "image/png; mode=8bit",
zIndex: 320,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../vag_och_trafik/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=cykelparkering_v&BOXSPACE=0.2&SYMBOLWIDTH=8&SYMBOLHEIGHT=6.5",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Cykelparkeringar i stadskärnan",
updateinterval: "Kontinuerligt",
contact: "Henrik Wester",
source: "C4 teknik",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Trafik-Transport/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/vag_och_trafik/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "lv_cykelvagnat",
minZoom: 8,
maxZoom: 20,
category: ["Trafik & resor"],
displayName: "Cykelvägar",
layerId: "Trafik_o_resor/lv_cykelvagnat",
alias: "cykelvag",
project: "vag_och_trafik",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../vag_och_trafik/?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png; mode=8bit&DPI=96&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=lv_cykelvagnat&SYMBOLWIDTH=12",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Cykelvägar i Kristianstad kommun",
updateinterval: "Vid behov",
contact: "Carl Almström",
source: "C4 Teknik",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/kkarta2/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "busshallplatser",
minZoom: 8,
maxZoom: 20,
category: ["Trafik & resor"],
displayName: "Busshållplatser",
layerId: "Trafik_o_resor/busshallplatser",
alias: "busshpl",
project: "kkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/kkarta2/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Busshållplats</div>" +
"<div class='popup-text1'><b>Hållplats:</b> ${caption} </div>",
format: "image/png; mode=8bit",
zIndex: 300,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../kkarta2/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=busshallplatser&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Busshållplatser från Skånetrafiken",
source: "Skånetrafiken",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/ows?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "turistkarta_hybrid",
minZoom: 8,
maxZoom: 20,
category: ["Trafik & resor"],
displayName: "Vägar och namn för hybridkarta",
layerId: "Trafik_o_resor/turistkarta_hybrid",
alias: "vagkarta",
project: "geodata",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png; mode=8bit",
zIndex: 155,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/hybridkarta.png",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Karta med vägar och texter mm. Samma innehåll som den vanliga bakgrundskartan. Anpassad för att kunna läggas över en andra bakgrundskartor, t.ex. fotokarta.",
updateinterval: "Veckovis",
contact: "Karl-Magnus Jönsson",
source: "Stadsbyggnadskontoret",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/vard_och_omsorg/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "omsorg_motesplatser",
minZoom: 8,
maxZoom: 20,
category: ["Vård & omsorg"],
displayName: "Mötesplatser",
layerId: "Vård_o_omsorg/omsorg_motesplatser",
alias: "Motesplatser",
project: "vard_och_omsorg",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/vard_och_omsorg/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Mötesplats omsorgen</div>" +
"<div class='popup-text1'><b>Namn:</b> ${namn}</div></BR>" +
"<div class='popup-text1'><b>Adress:</b> ${adress}</div></BR>" +
"<a class='popup-text2' href='${www}' target='_blank'>Länk</a>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../vard_och_omsorg/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=omsorg_motesplatser&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Mötesplatser för omsorgen",
updateinterval: "Vid behov",
contact: "Jeanette Nilsson",
source: "Omsorgsförvaltningen",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Vard-Omsorg/Omradescentraler/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/vard_och_omsorg/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "omsorgsboenden",
minZoom: 8,
maxZoom: 20,
category: ["Vård & omsorg"],
displayName: "Vård- och omsorgsboenden",
layerId: "Vård_o_omsorg/omsorgsboenden",
alias: "omsorgsboenden",
project: "vard_och_omsorg",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/vard_och_omsorg/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Vård- och omsorgsboenden</div>" +
"<div class='popup-text1'><b>Namn:</b> ${namn}</div>" +
"<br/>" +
"<div class='popup-text1'><b>Adress:</b> ${adress}, ${ort}</div>" +
"<br/>" +
"<a class='popup-text1' href='${link}' target='_blank'>Länk</a>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../vard_och_omsorg/?SERVICE=WMS&REQUEST=GetLegendGraphic&DPI=96&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=omsorgsboenden&BOXSPACE=0.2&SYMBOLWIDTH=9",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Vård- och omsorgsboenden i Kristianstad kommun",
updateinterval: "Vid behov",
contact: "Jeanette Nilsson",
source: "Omsorgsförvaltningen",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Vard-Omsorg/Boende/Boenden/",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/vard_och_omsorg/?DPI=96&gutters=500:20",
options : {
tiled:true,
tileSize: 512,
layers: "omr_hemtjanst",
minZoom: 8,
maxZoom: 20,
category: ["Vård & omsorg"],
displayName: "Hemtjänstområden",
layerId: "Vård_o_omsorg/omr_hemtjanst",
alias: "omr_hemtjanst",
project: "vard_och_omsorg",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: true,
selectOptions: {
service: "WFS",
request: "GetFeature",
outputFormat: "GeoJSON",
url: "/cgi-bin/externt/vard_och_omsorg/?",
srs: "EPSG:3008",
},
popup: "<div class='popup-header1'>Hemtjänstområde</div>" +
"<div class='popup-text1'><b>Område:</b> ${hemtjan_id} </div></BR>" + 
"<div class='popup-text1'><b>Leverantörer:</b> ${leverantorer} </div></BR>" + 
"<a class='popup-text1' href='http://www.kristianstad.se/sv/Kristianstads-kommun/Vard-Omsorg/Hemtjanst/Fritt-val-i-hemtjansten1/' target='_blank'>Mer information</a>",
format: "image/png; mode=8bit",
zIndex: 350,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../vard_och_omsorg/?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png; mode=8bit&ICONLABELSPACE=0&LAYERTITLE=FALSE&RULELABEL=FALSE&ITEMFONTSIZE=1&TRANSPARENT=TRUE&LAYER=omr_hemtjanst&DPI=96&SYMBOLWIDTH=12&SYMBOLHEIGHT=8",
legendBig: false,
pointToLayer: false,
transparent: true,
abstract: "Kristianstads kommun har infört Fritt val i hemtjänsten. Det innebär att du som har hemtjänst kan välja att få insatser utförda av kommunen eller av vård- och serviceföretag, som blivit godkända av kommunen. Beroende på var i kommunen du bor har du olika många leverantörer av hemtjänst att välja mellan. Kommunen är indelad i 9 geografiska områden.",
updateinterval: "Vid behov",
contact: "Jeanette Nilsson",
source: "Omsorgsförvaltningen",
link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Vard-Omsorg/Hemtjanst/Fritt-val-i-hemtjansten1/",
}
}],
bl: [

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/turistkarta/?DPI=96&gutters=0.06:1100,0.2:550,0.3:300,0.6:200,500:100",
options : {
tiled:true,
tileSize: 512,
layers: "turistkarta",
minZoom: 8,
maxZoom: 20,
category: ["Karta"],
displayName: "Kommunkarta",
layerId: "Karta/turistkarta",
alias: "Karta_farg",
project: "turistkarta",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png; mode=8bit",
zIndex: 50,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/Stadkarta.png",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "Bakgrundskarta i färg.",
updateinterval: "Veckovis",
contact: "Karl-Magnus Jönsson",
source: "Stadsbyggnadskontoret",
}
},

{
init: "L.TileLayer.WMS",
url: "/cgi-bin/externt/turistkarta_nedtonad/?DPI=96&gutters=0.06:1100,0.2:550,0.3:300,0.6:200,500:100",
options : {
tiled:true,
tileSize: 512,
layers: "turistkarta_nedtonad",
minZoom: 8,
maxZoom: 20,
category: ["Karta"],
displayName: "Kommunkarta nedtonad",
layerId: "Karta/turistkarta_nedtonad",
alias: "Karta_nedtonad",
project: "turistkarta_nedtonad",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png; mode=8bit",
zIndex: 50,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/Karta_nedtonad.png",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "Bakgrundskarta i gråskala.",
updateinterval: "Vid behov",
contact: "Karl-Magnus Jönsson",
source: "Lantmäteriet",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "geodata:1930_Haradskartan",
minZoom: 8,
maxZoom: 20,
category: ["Karta"],
displayName: "Häradskartan 1926-34",
layerId: "Karta/geodata:1930_Haradskartan",
alias: "haradskartan",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 50,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/kstad-haradskartan.jpg",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "hojdkarta",
minZoom: 8,
maxZoom: 20,
category: ["Karta"],
displayName: "Höjdkarta",
layerId: "Karta/hojdkarta",
alias: "hojdkarta",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/png",
zIndex: 50,
reverseAxis: false,
reverseAxisBbox: false,
legend: "http://193.17.67.229/geoserver/geodata/wms?&SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png&WIDTH=20&HEIGHT=20&ICONLABELSPACE=2&LAYERTITLE=FALSE&ITEMFONTSIZE=9&LAYERSPACE=1&SYMBOLSPACE=1&LAYER=NNH_1330",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "orto025",
minZoom: 8,
maxZoom: 20,
category: ["Fotokarta"],
displayName: "Fotokarta 2014",
layerId: "Fotokarta/orto025",
alias: "Orto2014",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/jpeg",
zIndex: 50,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/lgd_flygfoto.png",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "Flygfotokarta från våren 2014",
updateinterval: "2014",
source: "Lantmäteriet",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "orto2012",
minZoom: 8,
maxZoom: 20,
category: ["Fotokarta"],
displayName: "Fotokarta 2012",
layerId: "Fotokarta/orto2012",
alias: "Orto2012",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/jpeg",
zIndex: 50,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/lgd_flygfoto.png",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "Flygfotokarta från 2012",
updateinterval: "2012",
contact: "Karl-Magnus Jönsson",
source: "Lantmäteriet",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "orto2010",
minZoom: 8,
maxZoom: 20,
category: ["Fotokarta"],
displayName: "Fotokarta 2010",
layerId: "Fotokarta/orto2010",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/jpeg",
zIndex: 154,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/lgd_flygfoto.png",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "Flygfotokarta från 2010",
updateinterval: "2010",
source: "Lantmäteriet",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/wms?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "1940swe991330",
minZoom: 8,
maxZoom: 20,
category: ["Fotokarta"],
displayName: "Fotokarta 1940-tal",
layerId: "Fotokarta/1940swe991330",
alias: "Orto1940",
project: "geodata_novarnish",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/jpeg",
zIndex: 50,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/Fotokarta_1940-tal.png",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "Fotona togs fram%0Aav Lantmäterieverket (flygningar) i slutet av 1930-början av 40-talet. Syftet var antingen produktion%0Aav ekonomisk karta eller militär änvändning. Dock kom andra världskriget emellan och diverse andra%0Aorsaker gjorde att dessa bilder inte användes eftersom de ansågs för gamla när produktion av ek.%0Akartan väl kom igång.",
updateinterval: "Kustområdena 1939-40 och inlandet 1947",
contact: "Karin Larsson",
source: "Lunds universitet",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/ows?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "ortohybrid2014",
minZoom: 8,
maxZoom: 20,
category: ["Hybridkarta"],
displayName: "Hybridkarta 2014",
layerId: "Hybridkarta/ortohybrid2014",
project: "geodata",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/jpeg",
zIndex: 50,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/lgd_flygfoto.png",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/ows?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "ortohybrid2012",
minZoom: 8,
maxZoom: 20,
category: ["Hybridkarta"],
displayName: "Hybridkarta 2012",
layerId: "Hybridkarta/ortohybrid2012",
project: "geodata",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/jpeg",
zIndex: 50,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/lgd_flygfoto.png",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/ows?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "ortohybrid2010",
minZoom: 8,
maxZoom: 20,
category: ["Hybridkarta"],
displayName: "Hybridkarta 2010",
layerId: "Hybridkarta/ortohybrid2010",
project: "geodata",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/jpeg",
zIndex: 50,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/lgd_flygfoto.png",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/ows?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "ortohybrid1940",
minZoom: 8,
maxZoom: 20,
category: ["Hybridkarta"],
displayName: "Hybridkarta 1940",
layerId: "Hybridkarta/ortohybrid1940",
project: "geodata",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/jpeg",
zIndex: 50,
reverseAxis: false,
reverseAxisBbox: false,
legend: "./img/legend/legend_img/Fotokarta_1940-tal.png",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "",
}
},

{
init: "L.TileLayer.WMS",
url: "/geoserver/geodata/ows?DPI=96&FORMAT_OPTIONS=dpi:96;",
options : {
tiled:true,
tileSize: 256,
layers: "hojdhybrid",
minZoom: 8,
maxZoom: 20,
category: ["Hybridkarta"],
displayName: "Hybrid-höjdkarta",
layerId: "Hybridkarta/hojdhybrid",
project: "geodata",
xhrType: "GET",
attribution: "©Kristianstads kommun",
inputCrs: "EPSG:3857",
selectable: false,
selectOptions: {
},
format: "image/jpeg",
zIndex: 50,
reverseAxis: false,
reverseAxisBbox: false,
legend: "../../geoserver/geodata/wms?&SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png&WIDTH=20&HEIGHT=20&ICONLABELSPACE=2&LAYERTITLE=FALSE&ITEMFONTSIZE=9&LAYERSPACE=1&SYMBOLSPACE=1&LAYER=NNH_1330",
legendBig: false,
pointToLayer: false,
transparent: false,
abstract: "",
}
}],


		// <><><><><><><><><><><><><><><><><><><><><><><><><><>
		// Plugins are Leaflet controls. The options of a control
		// given here, will override the options in the control.
		// Thereby, you can manage everything the control lets
		// you manage from this config file - without having to
		// edit the plugin itself.
		// <><><><><><><><><><><><><><><><><><><><><><><><><><>
		
		plugins: [
					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					// Scale is Leaflet's in-built scale bar control. See options: http://leafletjs.com/reference.html#control-scale
					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					{
						init: "L.Control.Scale",
						options: {
							imperial: false
						}
					},
					
						/*				{
						init: "L.Control.KristianstadHeader",
						options: {}
					},*/

					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					// LayerSwitcher is a responsive layer menu for both overlays and baselayers.
					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					{
						init: "L.Control.LayerSwitcher",
						options: {
							toggleSubLayersOnClick: false,			// If true, all layers below this header will be turned on when expanding it.
							unfoldOnClick: true,					// If true, clicking anywhere on a header will unfold it. If false, user has to click on the icon next the header text.
							unfoldAll: false,						// If true, all subheaders will be unfolded when unfolding a header.
							olFirst: true,							// If true, the overlays panel is shown at the top
							pxDesktop: 992,							// Breakpoint for switching between mobile and desktop switcher
							btnHide: true,							// Show a hide button at the top header
							catIconClass: "fa fa-chevron-right",	// Icon class for foldable headers
							layerInfoConfig:                        // Layer description configuration. displayname is the key that needs to be available as a option parameter for each ol or bl layer configuration and Lagernamn is the label that will show on the dialog.
							                  {displayName: "Lagernamn",   
                                              abstract: "Beskrivning",
                                              legend:  "Teckenförklaring",
                                              updateinterval: "Uppdatering",
                                              contact: "Ansvarig",
                                              source : "Källa",
                                              link : "Länk",
											  attribution:"© Kristianstads kommun"},
						logoShowHideEnable: true                    //Extra parameter for handling logo on the map
						}
					},
					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					// Zoombar creates a custom zoombar with [+] and [-] buttons.
					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					{
						init: "L.Control.Zoombar",
						options: {}
					},

					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					// Geolocate shows the users position. Based on the HTML5 geolocation API.
					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					{
						init: "L.Control.Geolocate",
						options: {
							position: 'bottomright',		// Button's position
							locateOptions: {
								maxZoom: 17,				// Maximum auto-zoom after finding location
								enableHighAccuracy: true	// true: Will turn on GPS if installed (better accuracy but uses more battery)
							}
						}
					},

					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					// SelectVector is needed to make WMS layers selectable 
					// using getfeatureinfo requests.
					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					{
						init: "L.Control.SelectWMS",
						options: {
							wmsVersion: "1.3.0",		// The WMS version to use in the getfeatureinfo request
							//info_format: "text/plain",	// The fallback info format to fetch from the WMS service. Overridden by layer's info_format in layer's selectOptions.
							info_format:"application/json",
							maxFeatures: 20,			// Max features to fetch on click
							buffer: 16,					// Buffer around click (a larger number makes it easier to click on lines and points)
							useProxy: false				// If you want call the URL with a prepended proxy URL (defined in ws above)
						}
					},

					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					// SelectVector is needed in order to make vector (e.g. WFS) layers selectable.
					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					{
						init: "L.Control.SelectVector",
						options: {
							// The select style.
							selectStyle: {
								weight: 5,
								color: '#00FFFF',
								fillColor: '#00FFFF',
								opacity: 1,
								fillOpacity: .5
							}
						}
					},

					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					// Search connects to a autocomplete and geolocate service and places a marker
					// at the geolocated location.
					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					{
						init: "L.Control.Search",
						options: {
							_lang: {
								// Watermark/placeholder for text entry. Language dependent.
								"en": {search: "Search address or place"},	// english
								"sv": {search: "Sök adress eller plats"}	// swedish
							},
							gui: true,					// If false, entry is not shown but the plugin can still take the POI URL parameter
							whitespace: "%20",			// How to encode whitespace.
							wsOrgProj: "EPSG:3008",		// The projection of the returned coordinates from the web service
							useProxy: false,			// If you want call the URL with a prepended proxy URL (defined in ws above)
							wsAcUrl: "../sok/allting.php", // Required. Autocomplete service.
							wsLocateUrl: "../sok/allting_json.php", // Required. Geolocate service.
							acOptions: {				// typeahead options (Bootstrap's autocomplete library)
								items: 100				// Number of options to display on autocomplete
							},
							zoom:17
						}
					},

					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					// Print creates a downloadable image server-side. Requires Geoserver and the plugin "Mapfish print".
					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					 {
 						init: "L.Control.Print",
 				 		options: {
 				 			printUrl: "/print-servlet/leaflet_print/",		// The print service URL
 				 			position: "topright"											// Button's position
 				 		}
 				 	},

 					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
 					// ShareLink adds a button which, on click, will create a
 					// URL which recreates the map, more or less how it looked like.
 					// It is up to other plugins to add and receive URL parameters by 
 					// listening to the events:
 					// 		- Create params:	"smap.core.createparams"
 					// 		- Apply params:	 	"smap.core.beforeapplyparams" or "smap.core.applyparams"
 					// 	For instance:
 					// 	
 					// 	smap.event.on("smap.core.createparams", function(e, paramsObject) {
 					// 		paramsObject.myparameter = 3;
 					// 	});
 					// 	smap.event.on("smap.core.applyparams", function(e, paramsObject) {
 					// 		alert(paramsObject.myparameter);
 					// 	});
 					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					{
						init: "L.Control.ShareLink",
						options: {
							position: "topright",
							//root: location.protocol + "//malmo.se/karta?" // location.protocol + "//kartor.malmo.se/init/?appid=stadsatlas-v1&" // Link to malmo.se instead of directly to map
							root: location.protocol + "//193.17.67.229/cgi-bin/kkarta_responsiv/?" // location.protocol + "//kartor.malmo.se/init/?appid=stadsatlas-v1&" // Link to malmo.se instead of directly to map
						}
					},

					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					// RedirectClick opens a new browser tab when the user clicks on the map.
					// The easting ${x} and northing ${y} is sent along to the url. See example below.
					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					/*{
						init : "L.Control.RedirectClick", // Pictometry
						options: {
							position: "topright",		// Button's position
							url: "http://kartor.malmo.se/urbex/index.htm?p=true&xy=${x};${y}", 	// Malmö pictometry
							btnClass: "fa fa-plane",	// Button's icon class
							cursor: "crosshair"			// Cursor shown in map before click
						}
					},*/

					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					// Info simply creates a toggleable Bootstrap modal which you can fill with any info below.
					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					/*{
 						init: "L.Control.Info",
 						options: {
 							addToMenu: false,			// Create toggle button or not
 							position: "topright",		// Button's position (requires addToMenu == true)
							autoActivate: false,		// Open from start

							// Here follows the content of the modal – language dependent!
							_lang: {
								"en": {
									titleInfo: "<h4>A header</h4>",
									bodyContent:
										'<p>Some content</p>'
								},
								"sv": {
									titleInfo: "<h4>En rubrik</h4>",
									bodyContent:
										'<p>Lite innehåll: Hjälp information</p>'
								}
							}
 						}
 				 	},*/
							

 				 	// <><><><><><><><><><><><><><><><><><><><><><><><><><>
 				 	// MeasureDraw is a combined measure and drawing tool. The created
 				 	// markers, lines or polygons can be shared with others 
 				 	// (geometries and attributes sent along as a URL parameter).
 				 	// <><><><><><><><><><><><><><><><><><><><><><><><><><>
 				 	{
						init: "L.Control.MeasureDraw",
						options: {
							position: "topright",		// Button's position
							saveMode: "url",			// So far url is the only option
							layerName: "measurelayer",	// The internal layerId for the draw layer
							touchShowButtonAsDisabled: !1,

							stylePolygon: {				// Draw style for polygons
								color: '#0077e2',
								weight: 3
							},
							stylePolyline: {			// Draw style for polylines
								color: '#0077e2',
								weight: 9
							}
						}
					},
					{
						init: "L.Control.Opacity",
						options: {
 							addToMenu: false,			// Create toggle button or not
 							position: "topright",		// Button's position (requires addToMenu == true)
							autoActivate: false,		// Open from start				
 						}
					},
				    
					{
 						init: "L.Control.ShowHideSearch",
 						options: {
							 addToMenu: false,			// Create toggle button or not
 							position: "topright",		// Button's position (requires addToMenu == true)
							autoActivate: false,		// Open from start	
						}
 				 	},
					
				    {
 						init: "L.Control.GetFeatureInfo",
 						options: {
							addToMenu: false,			// Create toggle button or not
 							position: "topright",		// Button's position (requires addToMenu == true)
							autoActivate: false,		// Open from start
							mapLbelColumn:"GRAY_INDEX",
							
							selectOptions:{
                            URL:"http://193.17.67.229/geoserver/geodata/wms?",
							LAYERS:"geodata:NNH_1330",
		                    QUERY_LAYERS:"geodata:NNH_1330",
		                    STYLES:"",
		                    SERVICE:"WMS",
		                    VERSION:"1.1.1",
		                    REQUEST:"GetFeatureInfo",
		                    FEATURE_COUNT:10,
		                    FORMAT:"image/jpeg",
		                    INFO_FORMAT:"text/html",
		                    SRS:"EPSG:3008"
							},
							popup:""
		                    							
						}
 				 	},

					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					// ToolHandler takes care of making all buttons inside the top-right div responsive.
					// When the screen width is smaller than the defined breakpoint, the buttons are contained 
					// within a Bootstrap popover which can be toggled by a single button.
					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					{
						init: "L.Control.ToolHandler",
						options: {
							showPopoverTitle: false 	// Show title (header) in the popover
						}
					}

					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					// Add2HomeScreen creates a popover on iOS devices supporting
					// "Add To Homescreen", which advices the user to add the website
					// to the homescreen, making it look almost like a native app.
					// <><><><><><><><><><><><><><><><><><><><><><><><><><>
					// {
					//	init: "L.Control.Add2HomeScreen",
					//	options: {}
					// }
		]
};
var kstadsvglogo='';var config={params:{center:[14.153508,56.030127],zoom:$(window).width()<600?1:2},smapOptions:{title:"Minikartan",favIcon:""},ol:[/**end_overlays*/],bl:[/**start_baselayer_1*/{init:"L.TileLayer.WMS",url:"/turistkarta/?DPI=96&gutters=0.06:1100,0.2:550,0.3:300,0.6:200,500:100",options:{tiled:!0,tileSize:512,layers:"turistkarta",minZoom:0,maxZoom:12,displayName:"Kommunkarta",layerId:"turistkarta_mini",project:"turistkarta",inputCrs:"EPSG:3857",format:"image/png;mode=8bit",zIndex:50,}}/**end_baselayers*/],plugins:[{init:"L.Control.Scale",options:{imperial:!1}},{init:"L.Control.Zoombar",options:{}},{init:"L.Control.Search",options:{_lang:{"en":{search:"Search address or place"},"sv":{search:"Sök adress eller plats"}},gui:!0,whitespace:"%20",wsOrgProj:"EPSG:3008",useProxy:!1,wsAcUrl:"../sok/allting.php",wsLocateUrl:"../sok/allting_json.php",acOptions:{items:100},zoom:10}},{init:"L.Control.ShowHideSearch",options:{addToMenu:!1,position:"topright",autoActivate:!1}}]};
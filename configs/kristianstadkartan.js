var config={params:{center:[],zoom:$(window).width()<600?11:12},smapOptions:{title:"",favIcon:""},ol:[],bl:[],plugins:[{init:"L.Control.Scale",options:{imperial:!1}},{init:"L.Control.LayerSwitcher",options:{toggleSubLayersOnClick:!1,unfoldOnClick:!0,unfoldAll:!1,olFirst:!0,pxDesktop:992,btnHide:!0,catIconClass:"fa fa-chevron-right",layerInfoConfig:{displayName:"Lagernamn",abstract:"Beskrivning",legend:"Teckenförklaring",updateinterval:"Uppdatering",contact:"Ansvarig",source:"Källa",link:"Länk",attribution:"© Kristianstads kommun"},logoShowHideEnable:!0}},{init:"L.Control.Zoombar",options:{}},{init:"L.Control.Geolocate",options:{position:"bottomright",locateOptions:{maxZoom:17,enableHighAccuracy:!0}}},{init:"L.Control.SelectWMS",options:{wmsVersion:"1.3.0",info_format:"application/json",maxFeatures:20,buffer:16,useProxy:!1}},{init:"L.Control.SelectVector",options:{selectStyle:{weight:5,color:'#00FFFF',fillColor:'#00FFFF',opacity:1,fillOpacity:.5}}},{init:"L.Control.Info",options:{addToMenu:!1,position:"topright",autoActivate:!1,_lang:{"en":{titleInfo:"<h4>A header</h4>",bodyContent:"<p>Some content</p>"},"sv":{titleInfo:"<h4></h4>",bodyContent:"<p>Lite innehåll:</p>"}}}},{init:"L.Control.Search",options:{_lang:{"en":{search:"Search address or place"},"sv":{search:"Sök adress eller plats"}},gui:!0,whitespace:"%20",wsOrgProj:"EPSG:3008",useProxy:!1,wsAcUrl:"../sok/allting.php",wsLocateUrl:"../sok/allting_json.php",acOptions:{items:100}}},{init:"L.Control.Print",options:{printUrl:"http://kartor.kristianstad.se/print-servlet/leaflet_print/",position:"topright"}},{init:"L.Control.GetFeatureInfo",options:{addToMenu:!1,position:"topright",autoActivate:!1,mapLbelColumn:"GRAY_INDEX",selectOptions:{URL:"http://kartor.kristianstad.se/geoserver/geodata/wms?",LAYERS:"geodata:NNH_1330",QUERY_LAYERS:"geodata:NNH_1330",STYLES:"",SERVICE:"WMS",VERSION:"1.1.1",REQUEST:"GetFeatureInfo",FEATURE_COUNT:10,FORMAT:"image/jpeg",INFO_FORMAT:"text/html",SRS:"EPSG:3008"},popup:""}},{init:"L.Control.ToolHandler",options:{showPopoverTitle:!1}},{init:"L.Control.ShareLink",options:{position:"topright",root:location.protocol+"//kartor.kristianstad.se//?"}},{init:"L.Control.MeasureDraw",options:{position:"topright",saveMode:"url",layerName:"measurelayer",stylePolygon:{color:'#0077e2',weight:3},stylePolyline:{color:'#0077e2',weight:9}}},{init:"L.Control.Opacity",options:{addToMenu:!1,position:"topright",autoActivate:!1,}},{init:"L.Control.ShowHideSearch",options:{addToMenu:!1,position:"topright",autoActivate:!1,}}]};
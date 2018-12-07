var config = {
	params: {
		center: [14.153508, 56.030127],
		zoom: $(window).width() < 600 ? 1 : 2
	},
	smapOptions: {
		title: "Kristianstadskartan",
		favIcon: ""
		//"kartor.kristianstad.se" : "http://192.168.56.101/cgi-bin/externt"
	},
	
	ol: [/*{
				init: "L.GeoJSON.WFS",				
				url: "/park/",

				options: {
					params: {
						typeName: "v_lekplatsredskap",		
						outputFormat: "GeoJSON" 										
					},
					category: ["Inventering"],				
					displayName: "Lekplatser",	           
					layerId: "v_lekplatsredskap",				
					xhrType: "GET",						
					
					attribution: "Kristianstadstad",		
					inputCrs: "EPSG:3008",					
					uniqueKey: "skotselobj_id",						
					selectable: true,						
					reverseAxis: false,						
					reverseAxisBbox: false,					
					geomType: "POINT",						
					legend: "img/legend/Lekplats96x96.png",	
                    pointToLayer: false,  
				    style: {  
				    	"iconOptions": {
				    		iconUrl:"img/legend/Lekplats96x96.png",
							iconSize: [35, 35],
							iconAnchor: [17.5, 17.5]
				    	}
				    },										
					popup: 									
                        "<div class='popup-header2'>Lekplats</div>" //+
						
				}
			}*/
			{
	        	init: "L.TileLayer.WMS",
	        	url: "/kkartor/park_besiktning_handlers/bypass_parkbesiktning.php?park_img=http://localhost/cgi-bin/park_qgis/?DPI=96&gutters=500:20",
	        	options: {
	        		tiled: !0,
	        		tileSize: 512,
	        		layers: "v_lekplatsredskap",
	        		minZoom: 0,
	        		maxZoom: 12,
	        		category: ["Inventering"],
	        		displayName: "Lekplatser",
	        		layerId: "v_lekplatsredskap",					
	        		project: "park",
	        		inputCrs: "EPSG:3857",
	        		selectable: !0,
	        		selectOptions: {
	        			service: "WFS",
	        			request: "GetFeature",
	        			outputFormat: "GeoJSON",
	        			url: "/kkartor/park_besiktning_handlers/bypass_parkbesiktning.php?park_text=http://localhost/cgi-bin/park_qgis/?",
	        			srs: "EPSG:3008",
	        		},
	        		popup: "<div class='popup-header1'>Lekplatser</div>" + "<div class='popup-text1'><b>Skotselobj Id:</b> ${skotselobj_id}</div></br>" + "<div class='popup-text1'><b>Omrade Id:</b> ${omrade_id}</div></br>" + "<div class='popup-text1'><b>Plats Id:</b> ${plats_id}</div></br>" + "<div class='popup-text1'><b>Plats Nr:</b> ${plats_nr}</div></br>" + "<div class='popup-text1'><b>Plats kod:</b> ${platskod}</div></br>" + "<div class='popup-text1'><b>Nr:</b> ${nr}</div></br>" + "<div class='popup-text1'><b>Fri text:</b> ${fritext}</div></br>" + "<div class='popup-text1'><b>Besiktningsdatum:</b> ${besiktningsdatum}</div></br>" + "<div class='popup-text1'><b>Besiktningsresuttat:</b> ${besikningsresultat}</div>",
	        		//Edit Configurations
					editable:true,
					editOptions:{
						editPanelName:"Park Besiktning",
						mainAttribute:"skotselobj_id",
						projection:"",
						create:{
							docs:[
							{
								geometry:false,
								editableProperties:[
								{
									visible:true,
									property:"bedomt",
									alias:"Bedömning",
									type:"select",
				                	selectSettings: [{
				                		text: " --- ---",
				                		value: "",
				                		selected: true
				                	}, {
				                		text: "Godkänd",
				                		value: "Godkänd"
				                	}, {
				                		text: "A fel",
				                		value: "A fel"
				                	}, {
				                		text: "B fel",
				                		value: "B fel"
				                	}, {
				                		text: "C fel",
				                		value: "C fel"
				                	}]
									
								},
								{
									visible:true,
									property:"fel",
									alias:"Fel",
									type:"text"
									
								},
								{
									visible:true,
									property:"fritext",
									alias:"Feltext",
									type:"text"
									
								},
								{
									visible:false,
									property:"sign",
									alias:"Signatur",
									type:"text"
									
								},
								{
									visible:true,
									property:"atgardsforslag",
									alias:"Åtgardsförslag",
									type:"text"
									
								},
								{
									visible:true,
									property:"datum",
									alias:"Datum",
									type:"date"
									
								}
								]
								
							}
							]
						},
						password:true,
						url:"",
						
					},
					//Edit Configurations
					format: "image/png;mode=8bit",
	        		zIndex: 320,
	        		legend: "/park_qgis/?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=v_lekplatsredskap&FORMAT=image%2Fpng&LAYERTITLE=FALSE&SYMBOLHEIGHT=7.5&SYMBOLSPACE=1&ITEMFONTSIZE=9&ICONLABELSPACE=2&BOXSPACE=0.2",
	        		printLegend: "/park_qgis/?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=v_lekplatsredskap&FORMAT=image%2Fpng&LAYERTITLE=FALSE&SYMBOLHEIGHT=7.5&SYMBOLSPACE=1&ITEMFONTSIZE=9&ICONLABELSPACE=2&BOXSPACE=0.2",
	        		transparent: !0,
	        		abstract: "Förskolor i Kristianstads kommun.",
	        		updateinterval: "Vid behov",
	        		contact: "Anette Berg",
	        		source: "Barn- och utbildningsförvaltningen",
	        		link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Utbildning/Forskola/",
		    }
	}
			,
			{
	        	init: "L.TileLayer.WMS",
	        	url: "/park_qgis/?DPI=96&gutters=500:20",
	        	options: {
	        		tiled: !0,
	        		tileSize: 512,
	        		layers: "omrade",
	        		minZoom: 0,
	        		maxZoom: 12,
	        		category: ["Inventering"],
	        		displayName: "omrade",
	        		layerId: "fskolor",
	        		project: "omrade",
	        		inputCrs: "EPSG:3857",
	        		selectable: false,
	        		selectOptions: {
	        			service: "WFS",
	        			request: "GetFeature",
	        			outputFormat: "GeoJSON",
	        			url: "/park_qgis/?",
	        			srs: "EPSG:3008",
	        		},
	        		popup: "<div class='popup-header1'>Förskola</div>" + "<div class='popup-text1'><b>Namn:</b> ${enhnamn}</div></br>" + "<div class='popup-text1'><b>Adress:</b> ${adress}</div></br>" + "<div class='popup-text1'><b>Postnummer:</b> ${postnr}</div></br>" + "<div class='popup-text1'><b>Ort:</b> ${postanst}</div></br>" + "<div class='popup-text1'><b>Telefon:</b> ${tele1}</div></br>" + "<a class='popup-text1'href='${homepage}'target='_blank'>Läs mer</a>",
	        		format: "image/png;mode=8bit",
	        		zIndex: 320,
	        		legend: "/park_qgis/?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=omrade&FORMAT=image%2Fpng&LAYERTITLE=FALSE&SYMBOLHEIGHT=7.5&SYMBOLSPACE=1&ITEMFONTSIZE=9&ICONLABELSPACE=2&BOXSPACE=0.2",
	        		printLegend: "/park_qgis/?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=omrade&FORMAT=image%2Fpng&LAYERTITLE=FALSE&SYMBOLHEIGHT=7.5&SYMBOLSPACE=1&ITEMFONTSIZE=9&ICONLABELSPACE=2&BOXSPACE=0.2",
	        		transparent: !0,
	        		abstract: "Förskolor i Kristianstads kommun.",
	        		updateinterval: "Vid behov",
	        		contact: "Anette Berg",
	        		source: "Barn- och utbildningsförvaltningen",
	        		link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Utbildning/Forskola/",
		    }
	},{
		init: "L.TileLayer.WMS",
		url: "/park_qgis/?DPI=96&gutters=500:20",
		options: {
			tiled: !0,
			tileSize: 512,
			layers: "plats",
			minZoom: 0,
			maxZoom: 12,
			category: ["Inventering"],
			displayName: "Plats",
			layerId: "plats",
			project: "kkarta_r",
			inputCrs: "EPSG:3857",
			selectable: false,
			selectOptions: {
				service: "WFS",
				request: "GetFeature",
				outputFormat: "GeoJSON",
				url: "/park_qgis/?",
				srs: "EPSG:3008",
			},
			popup: "<div class='popup-header1'>Förskola</div>" + "<div class='popup-text1'><b>Namn:</b> ${enhnamn}</div></br>" + "<div class='popup-text1'><b>Adress:</b> ${adress}</div></br>" + "<div class='popup-text1'><b>Postnummer:</b> ${postnr}</div></br>" + "<div class='popup-text1'><b>Ort:</b> ${postanst}</div></br>" + "<div class='popup-text1'><b>Telefon:</b> ${tele1}</div></br>" + "<a class='popup-text1'href='${homepage}'target='_blank'>Läs mer</a>",
			format: "image/png;mode=8bit",
			zIndex: 320,
			legend: "/park_qgis/?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=plats&FORMAT=image%2Fpng&LAYERTITLE=FALSE&SYMBOLHEIGHT=7.5&SYMBOLSPACE=1&ITEMFONTSIZE=9&ICONLABELSPACE=2&BOXSPACE=0.2",
			printLegend: "/park_qgis/?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=plats&FORMAT=image%2Fpng&LAYERTITLE=FALSE&SYMBOLHEIGHT=7.5&SYMBOLSPACE=1&ITEMFONTSIZE=9&ICONLABELSPACE=2&BOXSPACE=0.2",
			transparent: !0,
			abstract: "Förskolor i Kristianstads kommun.",
			updateinterval: "Vid behov",
			contact: "Anette Berg",
			source: "Barn- och utbildningsförvaltningen",
			link: "http://www.kristianstad.se/sv/Kristianstads-kommun/Utbildning/Forskola/",
		}
	} /**end_overlays*/ ],
	bl: [{
		init: "L.TileLayer.WMS",
		url: "/turistkarta/?DPI=96&gutters=0.06:1100,0.2:550,0.3:300,0.6:200,500:100",
		options: {
			tiled: !0,
			tileSize: 512,
			layers: "turistkarta",
			minZoom: 0,
			maxZoom: 12,
			category: ["Kartor"],
			displayName: "Kommunkarta",
			layerId: "turistkarta",
			alias: "Karta_farg",
			project: "turistkarta",
			inputCrs: "EPSG:3857",
			format: "image/png;mode=8bit",
			zIndex: 50,
			legend: "data:image/png;base64,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",
			printLegend: "http://193.17.67.229/cgi-bin/externt/kkartor/img/legend/Stadkarta.png",
			abstract: "Bakgrundskarta i färg.",
			updateinterval: "Veckovis",
			contact: "Karl-Magnus Jönsson",
			source: "Miljö- och samhällsbyggnadsförvaltningen",
		}
	}, {
		init: "L.TileLayer.WMS",
		url: "/turistkarta_nedtonad/?DPI=96&gutters=0.06:1100,0.2:550,0.3:300,0.6:200,500:100",
		options: {
			tiled: !0,
			tileSize: 512,
			layers: "turistkarta_nedtonad",
			minZoom: 0,
			maxZoom: 12,
			category: ["Kartor"],
			displayName: "Kommunkarta nedtonad",
			layerId: "turistkarta_nedtonad",
			alias: "Karta_nedtonad",
			project: "turistkarta_nedtonad",
			inputCrs: "EPSG:3857",
			format: "image/png;mode=8bit",
			zIndex: 50,
			legend: "data:image/png;base64,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",
			printLegend: "http://193.17.67.229/cgi-bin/externt/kkartor/img/legend/Karta_nedtonad.png",
			abstract: "Bakgrundskarta i gråskala.",
			updateinterval: "Vid behov",
			contact: "Karl-Magnus Jönsson",
			source: "Lantmäteriet",
		}
	}],
	plugins: [{
		init: "L.Control.Scale",
		options: {
			imperial: !1
		}
	}, {
		init: "L.Control.LayerSwitcher",
		options: {
			toggleSubLayersOnClick: !1,
			unfoldOnClick: !0,
			unfoldAll: !1,
			olFirst: !0,
			pxDesktop: 992,
			btnHide: !0,
			catIconClass: "fa fa-chevron-right",
			layerInfoConfig: {
				displayName: "Lagernamn",
				abstract: "Beskrivning",
				legend: "Teckenförklaring",
				updateinterval: "Uppdatering",
				contact: "Ansvarig",
				source: "Källa",
				link: "Länk",
				attribution: "© Kristianstads kommun"
			},
			logoShowHideEnable: !0
		}
	}, {
		init: "L.Control.Zoombar",
		options: {}
	}, {
		init: "L.Control.Geolocate",
		options: {
			position: "bottomright",
			locateOptions: {
				maxZoom: 10,
				enableHighAccuracy: !0
			}
		}
	}, {
		init: "L.Control.SelectWMS",
		options: {
			wmsVersion: "1.3.0",
			info_format: "application/json",
			maxFeatures: 20,
			buffer: 16,
			useProxy: !1
		}
	}, {
		init: "L.Control.SelectVector",
		options: {
			selectStyle: {
				weight: 5,
				color: '#00FFFF',
				fillColor: '#00FFFF',
				opacity: 1,
				fillOpacity: .5
			}
		}
	}, {
		init: "L.Control.Info",
		options: {
			addToMenu: !1,
			position: "topright",
			autoActivate: !1,
			_lang: {
				"en": {
					titleInfo: "<h4>A header</h4>",
					bodyContent: "<p>Some content</p>"
				},
				"sv": {
					titleInfo: "<h4>Kristianstadskartan</h4>",
					bodyContent: "<p>Lite innehåll:</p>"
				}
			}
		}
	}, {
		init: "L.Control.Search",
		options: {
			_lang: {
				"en": {
					search: "Search address or place"
				},
				"sv": {
					search: "Sök adress eller plats"
				}
			},
			gui: !0,
			whitespace: "%20",
			wsOrgProj: "EPSG:3008",
			useProxy: !1,
			wsAcUrl: "../sok/allting.php",
			wsLocateUrl: "../sok/allting_json.php",
			acOptions: {
				items: 100
			},
			zoom: 10
		}
	}, {
		init: "L.Control.Print",
		options: {
			printUrl: "/print-servlet/leaflet_print/",
			position: "topright",
			printProjection: "scalePrint"
		}
	}, {
		init: "L.Control.GetFeatureInfo",
		options: {
			addToMenu: !1,
			position: "topright",
			autoActivate: !1,
			mapLbelColumn: "GRAY_INDEX",
			selectOptions: {
				URL: "/geoserver/geodata/wms?",
				LAYERS: "geodata:NNH_1330",
				QUERY_LAYERS: "geodata:NNH_1330",
				STYLES: "",
				SERVICE: "WMS",
				VERSION: "1.1.1",
				REQUEST: "GetFeatureInfo",
				FEATURE_COUNT: 10,
				FORMAT: "image/jpeg",
				INFO_FORMAT: "text/html",
				SRS: "EPSG:3008"
			},
			popup: ""
		}
	}, {
		init: "L.Control.ToolHandler",
		options: {
			showPopoverTitle: !1
		}
	}, {
		init: "L.Control.ShareLink",
		options: {
			position: "topright",
			root: location.protocol + "//kartor.kristianstad.se/kristianstadskartan/?"
		}
	}, {
		init: "L.Control.MeasureDraw",
		options: {
			position: "topright",
			saveMode: "url",
			layerName: "measurelayer",
			stylePolygon: {
				color: '#0077e2',
				weight: 3
			},
			stylePolyline: {
				color: '#0077e2',
				weight: 9
			}
		}
	}, {
		init: "L.Control.Opacity",
		options: {
			addToMenu: !1,
			position: "topright",
			autoActivate: !1,
		}
	}, {
		init: "L.Control.ShowHideSearch",
		options: {
			addToMenu: !1,
			position: "topright",
			autoActivate: !1,
		}
	}]
};
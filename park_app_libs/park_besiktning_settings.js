var besiktninglager={
appName:"besiktning",
v_lekplatsredskap: {
	        	init: "L.TileLayer.WMS",
	        	url: "/kkartor/park_besiktning_handlers/bypass_parkbesiktning.php?park_img=/park_qgis/?DPI=96&gutters=500:20",
	        	options: {
	        		tiled: !0,
	        		tileSize: 512,
	        		layers: "v_lekplatsredskap",
	        		minZoom: 0,
	        		maxZoom: 12,
	        		category: ["Besiktning lager"],
	        		displayName: "Lekplatsredskap",
	        		layerId: "v_lekplatsredskap",					
	        		project: "bypass_park",
	        		inputCrs: "EPSG:3857",
	        		selectable: !0,
	        		selectOptions: {
	        			service: "WFS",
	        			request: "GetFeature",
	        			outputFormat: "GeoJSON",
	        			url: "/kkartor/park_besiktning_handlers/bypass_parkbesiktning.php?park_text=/park_qgis/?",
	        			srs: "EPSG:3008",
	        		},
	        		popup: "<div class='popup-header1'>Lekplatsredskap</div>" + "<div class='popup-text1'><b>Skotselobj Id:</b> ${skotselobj_id}</div></br>" + "<div class='popup-text1'><b>Omrade Id:</b> ${omrade_id}</div></br>" + "<div class='popup-text1'><b>Plats Id:</b> ${plats_id}</div></br>" + "<div class='popup-text1'><b>Plats Nr:</b> ${plats_nr}</div></br>" + "<div class='popup-text1'><b>Plats kod:</b> ${platskod}</div></br>" + "<div class='popup-text1'><b>Nr:</b> ${nr}</div></br>" + "<div class='popup-text1'><b>Fri text:</b> ${fritext}</div></br>" + "<div class='popup-text1'><b>Besiktningsdatum:</b> ${besiktningsdatum}</div></br>" + "<div class='popup-text1'><b>Besiktningsresuttat:</b> ${besikningsresultat}</div>",
	        		
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
				                	}, {
				                		text: "Övrigt",
				                		value: "Övrigt"
				                	}]
									
								},
								{
									visible:true,
									property:"fel",
									alias:"Fel",
									type:"select",
				                	selectSettings: [{
				                		text: " --- ---",
				                		value: "",
				                		selected: true
				                	}, {
				                		text: "Betong i dagen:",
				                		value: "Betong i dagen:"
				                	}, {
				                		text: "Fallhöjd/störtskydd:",
				                		value: "Fallhöjd/störtskydd:"
				                	}, {
				                		text: "Fallskyddsunderlag:",
				                		value: "Fallskyddsunderlag:"
				                	}, {
				                		text: "Fallutrymme:",
				                		value: "Fallutrymme:"
				                	}, {
				                		text: "Felaktigt tillverkat:",
				                		value: "Felaktigt tillverkat:"
				                	}, {
				                		text: "Felaktigt underhåll:",
				                		value: "Felaktigt underhåll:"
				                	}, {
				                		text: "Felmonterad:",
				                		value: "Felmonterad:"
				                	}, {
				                		text: "Fingermått:",
				                		value: "Fingermått:"
				                	}, {
				                		text: "Fotmått:",
				                		value: "Fotmått:"
				                	}, {
				                		text: "Förankring:",
				                		value: "Förankring:"
				                	}, {
				                		text: "Huvudmått:",
				                		value: "Huvudmått:"
				                	}, {
				                		text: "Klämrisk:",
				                		value: "Klämrisk:"
				                	}, {
				                		text: "Lager slitet/löst:",
				                		value: "Lager slitet/löst:"
				                	}, {
				                		text: "Målning:",
				                		value: "Målning:"
				                	}, {
				                		text: "Mått på öppningar:",
				                		value: "Mått på öppningar:"
				                	}, {
				                		text: "Rostskada:",
				                		value: "Rostskada:"
				                	}, {
				                		text: "Rötskada:",
				                		value: "Rötskada:"
				                	}, {
				                		text: "Sprickor i:",
				                		value: "Sprickor i:"
				                	}, {
				                		text: "Stroppfångare:",
				                		value: "Stroppfångare:"
				                	}, {
				                		text: "Ståltråd i dagen:",
				                		value: "Ståltråd i dagen:"
				                	}, {
				                		text: "Säkerhetsavstånd:",
				                		value: "Säkerhetsavstånd:"
				                	}, {
				                		text: "Tre gungor på samma bom.",
				                		value: "Tre gungor på samma bom."
				                	}, {
				                		text: "Trappa > 1m utan skärm.",
				                		value: "Trappa > 1m utan skärm."
				                	}, {
				                		text: "Trappa < 1,5m från rutschsida:",
				                		value: "Trappa < 1,5m från rutschsida:"
				                	}, {
				                		text: "Tunna kedjeöglor:",
				                		value: "Tunna kedjeöglor:"
				                	}, {
				                		text: "Underhåll saknas:",
				                		value: "Underhåll saknas:"
				                	}, {
				                		text: "Utåkningsdel  > 35 cm hög:",
				                		value: "Utåkningsdel  > 35 cm hög:"
				                	}, {
				                		text: "Utskjutande/utstickande delar:",
				                		value: "Utskjutande/utstickande delar:"
				                	}]
									
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
									type:"select",
									selectSettings: [{
				                		text: " --- ---",
				                		value: "",
				                		selected: true
				                	}, {
				                		text: "Borttages",
				                		value: "Borttages"
				                	}, {
				                		text: "Bytes",
				                		value: "Bytes"
				                	}, {
				                		text: "Reperation",
				                		value: "Reperation"
				                	}]
									
								},
								{
									visible:false,
									property:"datum",
									alias:"Datum",
									type:"date"
									
								},
								{
									visible:false,
									property:"bildlank",
									alias:"bildlank",
									type:"text"
									
								}
								]
								
							}
							]
						},
						update:{
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

										
				                	},  {
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
									type:"select",
				                	selectSettings: [{
				                		text: " --- ---",
				                		value: "",
				                		selected: true
				                	}, {
				                		text: "Betong i dagen:",
				                		value: "Betong i dagen:"
				                	}, {
				                		text: "Fallhöjd/störtskydd:",
				                		value: "Fallhöjd/störtskydd:"
				                	}, {
				                		text: "Fallskyddsunderlag:",
				                		value: "Fallskyddsunderlag:"
				                	}, {
				                		text: "Fallutrymme:",
				                		value: "Fallutrymme:"
				                	}, {
				                		text: "Felaktigt tillverkat:",
				                		value: "Felaktigt tillverkat:"
				                	}, {
				                		text: "Felaktigt underhåll:",
				                		value: "Felaktigt underhåll:"
				                	}, {
				                		text: "Felmonterad:",
				                		value: "Felmonterad:"
				                	}, {
				                		text: "Fingermått:",
				                		value: "Fingermått:"
				                	}, {
				                		text: "Fotmått:",
				                		value: "Fotmått:"
				                	}, {
				                		text: "Förankring:",
				                		value: "Förankring:"
				                	}, {
				                		text: "Huvudmått:",
				                		value: "Huvudmått:"
				                	}, {
				                		text: "Klämrisk:",
				                		value: "Klämrisk:"
				                	}, {
				                		text: "Lager slitet/löst:",
				                		value: "Lager slitet/löst:"
				                	}, {
				                		text: "Målning:",
				                		value: "Målning:"
				                	}, {
				                		text: "Mått på öppningar:",
				                		value: "Mått på öppningar:"
				                	}, {
				                		text: "Rostskada:",
				                		value: "Rostskada:"
				                	}, {
				                		text: "Rötskada:",
				                		value: "Rötskada:"
				                	}, {
				                		text: "Sprickor i:",
				                		value: "Sprickor i:"
				                	}, {
				                		text: "Stroppfångare:",
				                		value: "Stroppfångare:"
				                	}, {
				                		text: "Ståltråd i dagen:",
				                		value: "Ståltråd i dagen:"
				                	}, {
				                		text: "Säkerhetsavstånd:",
				                		value: "Säkerhetsavstånd:"
				                	}, {
				                		text: "Tre gungor på samma bom.",
				                		value: "Tre gungor på samma bom."
				                	}, {
				                		text: "Trappa > 1m utan skärm.",
				                		value: "Trappa > 1m utan skärm."
				                	}, {
				                		text: "Trappa < 1,5m från rutschsida:",
				                		value: "Trappa < 1,5m från rutschsida:"
				                	}, {
				                		text: "Tunna kedjeöglor:",
				                		value: "Tunna kedjeöglor:"
				                	}, {
				                		text: "Underhåll saknas:",
				                		value: "Underhåll saknas:"
				                	}, {
				                		text: "Utåkningsdel  > 30 cm hög:",
				                		value: "Utåkningsdel  > 30 cm hög:"
				                	}, {
				                		text: "Utskjutande/utstickande delar:",
				                		value: "Utskjutande/utstickande delar:"
				                	}]
									
								},
								{
									visible:true,
									property:"fritext",
									alias:"Feltext",
									type:"text"
									
								},								
								{
									visible:true,
									property:"atgardsforslag",
									alias:"Åtgardsförslag",
									type:"select",
									selectSettings: [{
				                		text: " --- ---",
				                		value: "",
				                		selected: true
				                	}, {
				                		text: "Borttages",
				                		value: "Borttages"
				                	}, {
				                		text: "Bytes",
				                		value: "Bytes"
				                	}, {
				                		text: "Reperation",
				                		value: "Reperation"
				                	}]
									
								},
								{
									visible:false,
									property:"sign",
									alias:"Signatur",
									type:"text"
									
								},
								{
									visible:false,
									property:"datum",
									alias:"Datum",
									type:"date"
									
								},
								{
									visible:false,
									property:"bildlank",
									alias:"bildlank",
									type:"text"
									
								}
								]
								
							}
							]
						},
						read:{
							docs:[
							{
								geometry:false,
								editableProperties:[
								{
									visible:false,
									property:"id",
									alias:"Id",
									type:"text"				                										
								},
								{
									visible:false,
									property:"skotselobj_id",
									alias:"Skotsel objekt id",
									type:"text"				                										
								},
								{
									visible:true,
									property:"bedomt",
									alias:"Bedömning",
									type:"text"				                										
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
									visible:true,
									property:"atgardsforslag",
									alias:"Åtgardsförslag",
									type:"text"																		
								},
								{
									visible:true,
									property:"sign",
									alias:"Besiktningsman signatur",
									type:"text"
									
								},
								
								/*{
									visible:true,
									property:"datum",
									alias:"Besiktning datum",
									type:"date"
									

								},*/
								
								{
									visible:true,
									property:"bestallarsign",
									alias:"Beställare signatur",
									type:"text"
									
								},
								
								/*{
									visible:true,
									property:"bestallningsdatum",
									alias:"Beställning datum",
									type:"date"
									
								},*/
								
								{
									visible:true,
									property:"utforarsign",
									alias:"Utförare signatur",
									type:"text"
									
								},{
									visible:true,
									property:"utforaranm",
									alias:"Kommentar utförare",
									type:"text"
									
								}/*,
								
								{
									visible:true,
									property:"atgardsdatum",
									alias:"Åtgärdad datum",
									type:"date"
									
								}*/
								]
								
							}
							]
						},
						user_email:{
						  moam001:'mohammad.amin@kristianstad.se',
						  san:'mohammad.amin@kristianstad.se',	 
                          par_c:'par.cederholm@kristianstad.se',
                          johan_s:'johan.svensson2@kristianstad.se',
                          siv_d:'siv.degerman@kristianstad.se',
                          sven_n:'sven.nilsson@kristianstad.se',
                          lars_m:'lars.mortensson@kristianstad.se',
                          sara_n:'sara.perssonnoojd@kristianstad.se',
                          karlmagnus:'karl-magnus.jonsson@kristianstad.se',
						  MIHO001:'Michael.Holst@kristianstad.se',
						  TCONI01:'conny.nilsson@kristianstad.se',
						  TJOA:'John.Andersson@kristianstad.se',
						  TLEJA01:'Lennart.Jarl@kristianstad.se',
                          FIJO003:'filip.jonsson@kristianstad.se'						  
						},
						//20170201
                       sending_email:{
                       enable:true,
					   //20170221
					   mail_service:"/kkartor/park_besiktning_handlers/sendmail/sendmail_to_utforare.php",
					   //mail_service:"/kkartor/park_besiktning_handlers/sendmail/sendmail.php",
					   //20170221
                       admin_mail_address:'',
					   
					   utforera_mail_adress:'QGIS_Park-besiktning@kristianstad.se',
					   //utforera_mail_adress:'mohammad.amin.kristianstad@gmail.com;uzzal46bd@yahoo.com',
					   mail_subject_for_utforera:'Åtgärdsbeställning för____efter besiktning',
					   utforera_mail_body:'Besiktnigen av____är avslutad och det finns fel att åtgärda.',
					   
					   bestallare_mail_adress:"par.cederholm@kristianstad.se;johan.svensson2@kristianstad.se;siv.degerman@kristianstad.se;sven.nilsson@kristianstad.se;lena.barsegard@kristianstad.se;sara.perssonnoojd@kristianstad.se",
                       //bestallare_mail_adress:"mohammad.amin.kristianstad@gmail.com;uzzal46bd@yahoo.com",
					   mail_subject_for_bestallare:'är åtgärdad enligt beställning',
					   bestallare_mail_body:'är åtgärdad enligt beställning efter besiktning',
					   	//20170216
					   utforare_site_address :'https://kartor.kristianstad.se/parkutfora/?',				
					   besiktning_site_address:'https://kartor.kristianstad.se/park/?'
					   //20170216
                      },

						//20170201
						password:true,
						url:"/kkartor/park_besiktning_handlers/lekplatsredskap.php",
						plats_save_url:"/kkartor/park_besiktning_handlers/save_plats_text.php",
						lekplatsredskap_lastBesiktning_url:"/kkartor/park_besiktning_handlers/lekplatsredskap_lastBesiktning.php?id=",
						lekplatsredskap_allBesiktning_Bysko_id_url: "/kkartor/park_besiktning_handlers/lekplatsredskap_allBesiktning_Bysko_id.php?skotselobj_id=",
					    ListOfSavedImagesByNyckelord_By_besiktning_id_url: "/kkartor/park_besiktning_handlers/_getListOfSavedImagesByNyckelord_By_id.php?id=",
						parklogin_url :"/kkartor/park_besiktning_handlers/bypass_parklogin.php?username=",
						remove_session_url: "/kkartor/park_besiktning_handlers/remove_session.php?session=",
						session_available_url: "/kkartor/park_besiktning_handlers/session_available.php?session=",
						_getPlats_overview_text_url:"/kkartor/park_besiktning_handlers/plats_text.php?plats_id=",
						redigera_besiktning_info:"/kkartor/park_besiktning_handlers/redigera_besiktning_info.php",												

						//20170201
						bestalla_plats:"/kkartor/park_besiktning_handlers/bestalla_plats.php",												
						//20170201
						
						//20170412
						_getOmradeTypeByPlats_id:"/kkartor/park_besiktning_handlers/_getOmradeTypeByPlats_id.php",
						//20170412
						
						_upload_images:"/kkartor/park_besiktning_handlers/_upload_images.php?",
                        _publish_images:"/kkartor/park_besiktning_handlers/_publish_images.php?",
                        _delete_images:"/kkartor/park_besiktning_handlers/_delete_images.php?id=",
                        _image_handeling_url:"/park/appbild.html",                        
						image_catagory:9,						
						post_method:"GET"
						
						
					},
				
					format: "image/png;mode=8bit",
	        		zIndex: 320,
	        		legend: "/park_qgis/?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=v_lekplatsredskap&FORMAT=image%2Fpng&LAYERTITLE=FALSE&SYMBOLHEIGHT=7.5&SYMBOLSPACE=1&ITEMFONTSIZE=9&ICONLABELSPACE=2&BOXSPACE=0.2",
	        		printLegend: "../park_qgis/?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=v_lekplatsredskap&FORMAT=image%2Fpng&LAYERTITLE=FALSE&SYMBOLHEIGHT=7.5&SYMBOLSPACE=1&ITEMFONTSIZE=9&ICONLABELSPACE=2&BOXSPACE=0.2",
	        		transparent: !0,
	        		abstract: "En delmängd av skötselpunkter och ligger inom en (lek-)plats",
	        		updateinterval: "Fältbesiktning",
	        		contact: "C4 teknik",
	        		source: "C4 teknik"
		    }
	},
plats:{
		init: "L.TileLayer.WMS",
		url: "/park_qgis/?DPI=96&gutters=500:20",
		options: {
			tiled: !0,
			tileSize: 512,
			layers: "plats",
			minZoom: 0,
			maxZoom: 12,
			category: ["Besiktning lager"],
			displayName: "Lekplats",
			layerId: "plats",
			project: "bypass_park",
			inputCrs: "EPSG:3857",
			selectable: !0,
			selectOptions: {
				service: "WFS",
				request: "GetFeature",
				outputFormat: "GeoJSON",
				url: "/park_qgis/?",
				srs: "EPSG:3008",
			},
			editable:true,
			editOptions:{
				editPanelName:"Park Besiktning",
				mainAttribute:"plats_id",
				secondaryAttribute:"pl_namn",
				projection:"",
				create:{
							docs:[
							{
								geometry:false,
								editableProperties:[
								{
									visible:false,
									property:"pl_namn",
									alias:"Platsnamn",
									type:"div"
									
								},
								{
									visible:true,
									property:"fritext",
									alias:"Kommentar",
									type:"text"
									
								},
								{
									visible:false,
									property:"uppdaterat",
									alias:"Datum",
									type:"date"
									
								}
								]
								
							}
							]
						}
				
			},
			pointInPolygon:true,
			pointInPolygonOptions: {
				pointFetchURL: "/kkartor/park_besiktning_handlers/bypass_parkbesiktning.php?park_text=/park_qgis/?&service=WFS&request=GetFeature&layers=v_lekplatsredskap&styles=&typename=v_lekplatsredskap&query_layers=v_lekplatsredskap&info_format=application%2Fjson&srs=EPSG%3A3008&exceptions=application%252Fvnd.ogc.se_xml&version=1.3.0&outputFormat=GeoJSON",
				PIP_PropertyName:"plats_id",
				PIP_LayerName:"v_lekplatsredskap",
				srs: "EPSG:4326"
				
			},
			popup: "<div class='popup-header1'>Lekplats</div>" + "<div class='popup-text1'><b>Namn:</b> ${pl_namn}</div></br>" + "<div class='popup-text1'><b>Lekplats Id:</b> ${plats_id}</div></br>" + "<div class='popup-text1'><b>Kod:</b> ${pl_kod}</div></br>" + "<div class='popup-text1'><b>Uppdaterat:</b> ${uppdaterat}</div></br>" + "<div class='popup-text1'><b>Fritext:</b> ${fritext}</div></br>" + "<a class='popup-text1'href='${homepage}'target='_blank'>Läs mer</a>",
			format: "image/png;mode=8bit",
			zIndex: 319,
			legend: "/park_qgis/?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=plats&FORMAT=image%2Fpng&LAYERTITLE=FALSE&SYMBOLHEIGHT=7.5&SYMBOLSPACE=1&ITEMFONTSIZE=9&ICONLABELSPACE=2&BOXSPACE=0.2",
			printLegend: "../park_qgis/?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=plats&FORMAT=image%2Fpng&LAYERTITLE=FALSE&SYMBOLHEIGHT=7.5&SYMBOLSPACE=1&ITEMFONTSIZE=9&ICONLABELSPACE=2&BOXSPACE=0.2",
			transparent: !0,
			abstract: "Lekplats",
			updateinterval: "",
			contact: "C4 Teknik",
			source: "C4 Teknik"
		}
	}

}
var medborgerdialogSettings = {
    app: {
        default: {
            appName: "defaultMedborgerDialog",
            alltexts: {
                headerText: "Lämna synpunkt",
                howToUseText: "",
                howToUseInfoButtonText: "Instruktionen läggs till här för att återspegla funktionen.",
                mapPositionButtonText: "Lägga till en kartposition",
                mapPositionButtonMerInfoText: "Lägg till en plats på kartan där din synpunkt är relaterat till. Du kan zooma in, zooma ut, panorera kartan och söka på kartan för att hitta din lämpliga plats och klicka sedan på kartan för att lägg till en kartposition. Du kan ändra kartposition genom att klicka på kartan. När du är klar med att lägga till en kartposition klickar du på knappen `Klart att lägga kartposition`. Klicka på krysset för att stänga fönstret.",
                mapPositionButtonMerInfoDialogWidth: 300,
                mapPositionButtonMerInfoDialogHeight: 350,
                mapPositionButtonMerInfoDialogTimeout: 60000,
                onDrawingPointDialogRightPosition: 55,
                sendButtonText: "Skicka",
                mapPositionDoneButtonText: "Klart att lägga kartposition",
                mapPositionDoneButtonMerInfoText: "Du har lagt till en plats på kartan, klicka på Skicka för att skicka din synpunkt med kartposition. Klicka på krysset för att stänga fönstret.",
                mapPositionDoneButtonMerInfoDialogWidth: 300,
                mapPositionDoneButtonMerInfoDialogHeight: 300,
                mapPositionDoneButtonMerInfoDialogHeightTimeout: 60000,
                mapPositionNotAddedMessage: "Du har inte valt någon plats på kartan ännu, klicka på den plats på kartan där du vill lämna din synpunkt. Klicka på krysset för att stänga fönstret.",

                permissionDeniedMessage: "Under underhåll.",
                cuntinueAddingComments: "Tack för din synpunkt! Vill du lämna fler synpunkter?",
                sendEpostProblem: "Problem att skicka e-post.",
                commentsSavingProblem: "Din synpunkt har inte skickats, försök igen.",
                warningNotWrittingComments: "Du har inte skrivit någon synpunkt."

            },
            layers: {
                medborgerdialog_default_p: {
                    init: "L.TileLayer.WMS",
                    url: "/kkartor/park_besiktning_handlers/bypass_parkbesiktning.php?park_img=/medborgerdialog_qgis/?DPI=96&gutters=500:20",
                    maplink: "",
                    options: {
                        tiled: !0,
                        tileSize: 512,
                        layers: "medborgerdialog_default_p",
                        minZoom: 0,
                        maxZoom: 12,
                        category: ["Utbildning & barnomsorg"],
                        displayName: "medborgerdialog",
                        layerId: "medborgerdialog_default_p",
                        project: "kkarta_r",
                        inputCrs: "EPSG:3857",
                        selectable: !0,
                        selectOptions: {
                            service: "WFS",
                            request: "GetFeature",
                            outputFormat: "GeoJSON",
                            url: "/medborgerdialog_qgis/?",
                            srs: "EPSG:3008"
                        },
                        popup: "<div class='popup-header1'>Synpunkter</div><div class='popup-text1'><b>Namn:</b> ${name} </div></BR><div class='popup-text1'><b>Synpunkt:</b> ${comments}</div></BR><div class='popup-text1'><b>Ålder:</b> ${age} </div>",
                        geomType: "Point",
                        editable: !0,
                        editOptions: {
                            editPanelName: "",
                            mainAttribute: "id",
                            projection: "",
                            create: {
                                docs: [{
                                    geometry: !0,
                                    editableProperties: [{
                                        visible: !1,
                                        property: "type",
                                        alias: "Min synpunkt är: ",
                                        aliasVisible: !0,
                                        type: "select",
                                        selectSettings: [{
                                            text: "Positiv",
                                            value: "positiv",
                                            selected: !0
                                        }, {
                                            text: "Negativ",
                                            value: "negativ"
                                        }, {
                                            text: "Neutral",
                                            value: "neutral"
                                        }]
                                    }, {
                                        visible: !0,
                                        property: "comments",
                                        alias: "Synpunkt",
                                        type: "text",
                                        placeholder: "Synpunkt"
                                    }, {
                                        visible: !1,
                                        property: "age",
                                        alias: "Ålder: ",
                                        aliasVisible: !1,
                                        type: "select",
                                        selectSettings: [{
                                            text: "Ålder (frivilligt) ",
                                            value: "",
                                            selected: !0
                                        }, {
                                            text: "6 - 12",
                                            value: "6-12"
                                        }, {
                                            text: "13 - 18",
                                            value: "13-18"
                                        }, {
                                            text: "19 - 35",
                                            value: "19-35"
                                        }, {
                                            text: "36 - 50",
                                            value: "36-50"
                                        }, {
                                            text: "51 - 65",
                                            value: "51-65"
                                        }, {
                                            text: "66 - 80",
                                            value: "66-80"
                                        }, {
                                            text: "81 eller äldre",
                                            value: "81 eller äldre"
                                        }]
                                    }, {
                                        visible: !1,
                                        property: "name",
                                        alias: "Namn",
                                        type: "text",
                                        placeholder: "Namn (frivilligt)"
                                    }, {
                                        visible: !1,
                                        property: "phone",
                                        alias: "Telephone",
                                        type: "text",
                                        placeholder: "Din e-post/telefonnnummer (frivilligt)"
                                    }, {
                                        visible: !1,
                                        property: "email",
                                        alias: "E-post",
                                        type: "text",
                                        placeholder: "(frivillig)"
                                    }, {
                                        visible: !1,
                                        property: "maplink",
                                        alias: "Länk",
                                        type: "text",
                                        placeholder: ""
                                    }, {
                                        visible: !1,
                                        property: "mapxy",
                                        alias: "mapxy",
                                        type: "text",
                                        placeholder: ""
                                    }, {
                                        visible: !1,
                                        property: "prikey",
                                        alias: "prikey",
                                        type: "text",
                                        placeholder: ""
                                    }, {
                                        visible: !1,
                                        property: "date",
                                        alias: "Datum",
                                        type: "date",
                                        placeholder: ""
                                    }]
                                }]
                            },
                            update: {},
                            read: {},
                            sending_email: {
                                enable: !1,
                                mail_service: "/kkartor/park_besiktning_handlers/sendmail/sendmail_to_plan_admin.php",
                                admin_mail_address: "",
                                plan_admin_mail_adress: "Medborgardialog_kristianstadskartan_users@kristianstad.se",
                                plan_admin_mail_subject: "E-post från medborgardialog applikation",
                                plan_admin_mail_body: "Nedan synkpunkt kommer från medborgardialog applikation: "
                            },
                            password: !1,
                            url: "/kkartor/park_besiktning_handlers/nat_pov.php",
                            med_create_anonymous_sessions: "/kkartor/park_besiktning_handlers/med_create_anonymous_sessions.php",
                            med_remove_anonymous_sessions: "/kkartor/park_besiktning_handlers/med_remove_anonymous_sessions.php",
                            post_method: "GET"
                        },
                        format: "image/png;mode=8bit",
                        zIndex: 320,
                        legend: "data:image/png;base64,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",
                        printLegend: "../kkarta/?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=buf_gif_skolor_&FORMAT=image%2Fpng&LAYERTITLE=FALSE&SYMBOLHEIGHT=7.5&SYMBOLSPACE=1&ITEMFONTSIZE=9&ICONLABELSPACE=2&BOXSPACE=0.2",
                        transparent: !0,
                        "abstract": "",
                        updateinterval: "",
                        contact: "",
                        source: "",
                        link: ""
                    }
                }
            }
        }

    }

}

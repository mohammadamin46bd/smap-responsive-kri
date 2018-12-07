C{
    #include <time.h>
    #include <math.h>
    #include <stdlib.h>
    #include <string.h>
    #include <stdio.h>
}C

backend kstadapache
{
    .host = "10.3.1.222";
    .port = "81";
}

backend apache
{
    .host = "127.0.0.1";
    .port = "81";
}

backend tomcat
{
    .host = "127.0.0.1";
    .port = "8080";
}

backend kstad
{
    .host = "10.3.1.222";
    .port = "80";
}

backend vakant
{
    .host = "www.vakant.nu";
    .port = "80";
}

/* Login varification stuff for Park Application*/
backend icatserver {
    .host = "91.203.163.63";
    .port = "80";
}
/* Login varification stuff for Park Application*/


#acl self
#{
#	"127.0.0.0"/16;
#}

acl sbkgeodata
{
    "10.3.1.222";
}

acl int
{
	"127.0.0.0"/16;
	"10.0.0.0"/8;
	"193.17.67.241"; #Portwise
}

sub vcl_recv
{
	unset req.http.proxy;
	if (req.url ~ "^/kkartor/(park_besiktning_handlers|park_qgis)")
	{


				/* Login varification stuff for Park Application -START- */
          
					if(req.http.Authentication_required == "true")
					{
						C{ 
							int exists (char *fname)
							{
								FILE *file;
								if ((file = fopen(fname, "r")))
								{
									fclose(file);
									return 1;
								}
								return 0;
							}
							const char *session_token;               
							session_token =  VRT_GetHdr(sp,HDR_REQ,"\010Session:");
							char sesloc[150] ="/usr/lib/cgi-bin/park_kristianstad/sessions/";
							strcat(sesloc, session_token);
							if( exists(sesloc) == 1 )
							{              
								VRT_SetHdr(sp, HDR_REQ, "\010Session:", "authorize", vrt_magic_string_end);
							}
							else
							{
								VRT_SetHdr(sp, HDR_REQ, "\010Session:", "unauthorize", vrt_magic_string_end);
							}
						}C
						if (req.http.Session == "authorize")
						{
							if (req.url ~ "_upload_images.php")
							{      
								set req.backend =  icatserver;
								set req.http.host="api.icatserver.com";
								set req.url = "/v4/dc39fedb/c4teknik/9a9251261b2f3fb1e564ad7cf38499a9148bf8138740c39ffee91ab836c56213d1b997e2b022b74f6e651c84adb1cad92e74aaa210ae36fb5b73cf834d9fc0bb/upload/external?user="+req.http.Authenticated_user;
							}
							if (req.url ~ "_publish_images.php")
							{       
								set req.backend =  icatserver;
								set req.http.host="api.icatserver.com";     
								set req.url = regsub(req.url, "\/kkartor\/park_besiktning_handlers\/_publish_images.php\?data=", "/v4/dc39fedb/c4teknik/9a9251261b2f3fb1e564ad7cf38499a9148bf8138740c39ffee91ab836c56213d1b997e2b022b74f6e651c84adb1cad92e74aaa210ae36fb5b73cf834d9fc0bb/upload/publish?");   
							}
							if (req.url ~ "_delete_images.php")
							{       
								set req.backend =  icatserver;
								set req.http.host="api.icatserver.com";     
								set req.url = regsub(req.url, "\/kkartor\/park_besiktning_handlers\/_delete_images.php\?", "/v4/dc39fedb/c4teknik/9a9251261b2f3fb1e564ad7cf38499a9148bf8138740c39ffee91ab836c56213d1b997e2b022b74f6e651c84adb1cad92e74aaa210ae36fb5b73cf834d9fc0bb/ob/do_trash?");   
							}
						}
					}          
					elseif (req.url ~ "_getListOfSavedImagesByNyckelord_By_id.php")
					{         
						set req.backend =  icatserver;
						set req.http.host="api.icatserver.com";
						set req.url = regsub(req.url, "\/kkartor\/park_besiktning_handlers\/_getListOfSavedImagesByNyckelord_By_id.php\?id=", "/v4/dc39fedb/c4teknik/9a9251261b2f3fb1e564ad7cf38499a9148bf8138740c39ffee91ab836c56213d1b997e2b022b74f6e651c84adb1cad92e74aaa210ae36fb5b73cf834d9fc0bb/search/external?type=advanced&term=nyckelord|key|");	        			   
					}else{
		                        set req.backend = kstadapache;
		                        set req.url = "/cgi-bin/externt" + req.url;
		                        set req.http.host = "193.17.67.229";
                                        }			           
				
				/* Login varification stuff for Park Application -END- */



		return (pass);
	}
	if (req.request == "BAN" && client.ip ~ int)
	{
		ban("req.url ~ " + req.http.ban);
		error 200 "Banned";
	}
#	elseif (client.ip !~ self && req.http.host ~ "^(?i)kartor.kristianstad.se" && req.http.Upgrade-Insecure-Requests == "1")
#	{
#		error 750 "https://" + req.http.host + req.url;
#	}
	elseif ( req.http.too-big || (req.http.x-pipe-skgis2 && req.restarts > 0) ) 
	{
		if ( req.http.too-big ) 
		{
			set req.backend = kstad;
		}
		return (pipe);
	}
	elseif (req.http.host ~ "kartor.kristianstad.se|193.17.67.229" && req.url ~ "^/[Pp]ublicerat/")
	{
		if (req.url !~ "^/publicerat/Externt/")
		{
			set req.url = regsub(req.url, "^/[Pp]ublicerat/(externt/)?", "/publicerat/Externt/");
		}
		set req.http.host = "193.17.67.229";
		set req.backend = kstad;
		set req.http.req-origin = "skgis2";
		return (pass);
	}
	elseif (req.http.host ~ "kartor.kristianstad.se" && req.url ~ "(?i)config=kkarta.php&?")
	{
		set req.url = regsub(req.url, "(?i)config=kkarta.php&?", "");
		error 750 req.url;
	} 
	elseif (req.url ~ "(?i)^/(kristianstadskartan|kkarta4|kkartor)\?" )
	{
		set req.url = regsub(req.url, "(^/[^/]+)\?", "\1/?");
		error 750 req.url;
	}
	elseif (req.url ~ "^/kkarta4/" && req.url !~ "skarta\.php" && req.http.referer !~ "skarta\.php")
	{
		set req.url = regsub(req.url, "^/kkarta4/", "/kristianstadskartan/");
		error 750 req.url;
	}
	elseif
	(
		req.http.host ~ "193\.17\.67\.210"
		||
		req.url ~ "^/geos(erver)?/?$|^/geos(erver)?/(web|gwc)"
		||
		(
			req.http.host ~ "kartor.kristianstad.se"
			&&
			req.url !~ "(?i)^/publicerat/externt/"
			&&
			(
				req.url ~ "skarta\.php"
				||
				req.http.referer ~ "skarta\.php"
				||
				(
					req.url ~ "(?i)GetFeature"
					&&
					false
					#!req.http.referer ~ "^https?://(kartor.kristianstad.se|invento.icatserver.com)/"
				)
			)
		)
	)
	{
		#error 404;
	}
	elseif (req.url ~ "^/vakant")
	{
        	set req.url = regsub(req.url, "^/vakant", "");
        	set req.http.host = "www.vakant.nu";
        	set req.backend = vakant;
        	set req.http.externt-lookup = 1;
        	return (lookup);
	}
	elseif
	(
		req.http.host ~ "^tomtko|^kartor.kristianstad.se"
	)
	{
		set req.backend = kstad;
		set req.http.req-origin = "skgis2";
		if (req.http.host ~ "^tomtko")
		{
			set req.http.X-Forwarded-For = client.ip;
			return (pass);
		}
		else
		{
			set req.http.host = "193.17.67.229";
			if (req.url ~ "^/kkarta4/")
			{
				set req.url = regsub(req.url, "kkarta4", "kkartor");
				set req.http.kkarta4 = "1";
			}
			if (req.url ~ "^/[^/]*$")
			{
				set req.url = regsub(req.url, "^/", "/cgi-bin/externt/kartor_kristianstad_se/");
			}
			elseif (req.url !~ "geoserver|print-servlet" && req.url !~ "/cgi-bin/externt/")
			{
				set req.url = regsub(req.url, "^/", "/cgi-bin/externt/");
			}
			if (req.url ~ "update_(map|index|config)\.php|print-servlet|[^(polisstationer)]\.php" || req.url ~ "park_besiktning_handlers" || req.url ~ "lagfag2009" || req.http.referer ~ "update_(map|index|config)\.php" || (!req.http.referer ~ "\.kristianstad\.se|invento\.icatserver\.com|192\.168\.1\.56:8899" && req.url ~ "(?i)(\&|\?)request=") )
			{
				/* Login varification stuff for Park Application -START- */
				/*if(req.url ~ "park_besiktning_handlers")
				{          
					if(req.http.Authentication_required == "true")
					{
						C{ 
							int exists (char *fname)
							{
								FILE *file;
								if ((file = fopen(fname, "r")))
								{
									fclose(file);
									return 1;
								}
								return 0;
							}
							const char *session_token;               
							session_token =  VRT_GetHdr(sp,HDR_REQ,"\010Session:");
							char sesloc[150] ="/usr/lib/cgi-bin/park_kristianstad/sessions/";
							strcat(sesloc, session_token);
							if( exists(sesloc) == 1 )
							{              
								VRT_SetHdr(sp, HDR_REQ, "\010Session:", "authorize", vrt_magic_string_end);
							}
							else
							{
								VRT_SetHdr(sp, HDR_REQ, "\010Session:", "unauthorize", vrt_magic_string_end);
							}
						}C
						if (req.http.Session == "authorize")
						{
							if (req.url ~ "_upload_images.php")
							{      
								set req.backend =  icatserver;
								set req.http.host="api.icatserver.com";
								set req.url = "/v4/dc39fedb/c4teknik/9a9251261b2f3fb1e564ad7cf38499a9148bf8138740c39ffee91ab836c56213d1b997e2b022b74f6e651c84adb1cad92e74aaa210ae36fb5b73cf834d9fc0bb/upload/external?user="+req.http.Authenticated_user;
							}
							if (req.url ~ "_publish_images.php")
							{       
								set req.backend =  icatserver;
								set req.http.host="api.icatserver.com";     
								set req.url = regsub(req.url, "\/cgi-bin\/externt\/kkartor\/park_besiktning_handlers\/_publish_images.php\?data=", "/v4/dc39fedb/c4teknik/9a9251261b2f3fb1e564ad7cf38499a9148bf8138740c39ffee91ab836c56213d1b997e2b022b74f6e651c84adb1cad92e74aaa210ae36fb5b73cf834d9fc0bb/upload/publish?");   
							}
							if (req.url ~ "_delete_images.php")
							{       
								set req.backend =  icatserver;
								set req.http.host="api.icatserver.com";     
								set req.url = regsub(req.url, "\/cgi-bin\/externt\/kkartor\/park_besiktning_handlers\/_delete_images.php\?", "/v4/dc39fedb/c4teknik/9a9251261b2f3fb1e564ad7cf38499a9148bf8138740c39ffee91ab836c56213d1b997e2b022b74f6e651c84adb1cad92e74aaa210ae36fb5b73cf834d9fc0bb/ob/do_trash?");   
							}
						}
					}          
					if (req.url ~ "_getListOfSavedImagesByNyckelord_By_id.php")
					{         
						set req.backend =  icatserver;
						set req.http.host="api.icatserver.com";
						set req.url = regsub(req.url, "\/cgi-bin\/externt\/kkartor\/park_besiktning_handlers\/_getListOfSavedImagesByNyckelord_By_id.php\?id=", "/v4/dc39fedb/c4teknik/9a9251261b2f3fb1e564ad7cf38499a9148bf8138740c39ffee91ab836c56213d1b997e2b022b74f6e651c84adb1cad92e74aaa210ae36fb5b73cf834d9fc0bb/search/external?type=advanced&term=nyckelord|key|");	        			   
					}			           
				}*/
				/* Login varification stuff for Park Application -END- */
				if (req.backend == kstad)
				{
					set req.http.req-origin = "skgis2";
					set req.http.req-origin-skgis2b = "skgis2";
				}
				return (pass);
			}
			else
			{
				if (client.ip ~ sbkgeodata && req.http.ffw !~ "1" && req.http.User-Agent !~ "(?i)wget" && req.url !~ "^/kristianstadskartan/")
				{
					set req.url = "/kartor/kstad/empty.html";
					set req.backend = apache;
				}
				if
				(
					req.request == "POST"
					||
					(
						req.url ~ "(?i)request=Get(Feature|Capabilities)|^/wkartor/(export|print|save|configs|news|functions)(/|\?)|^/print-servlet/|^/tomcat/|^/wkartor/?(index\.php|index_dev\.php)\?|(\?|&)config=|^/wkartor/authorization/?(index\.php(\?logout)?)?$|^/geoserver/[^/]*/?(wms|wfs)|getPublicKey|handshake|sesstest" 
						&&
						!(
							req.url ~ "(?i)\.png$"
							||
							req.url ~ "(?i)\.(js[^o]|gif|html|jpeg|jpg|htm|css)"
						)
					)
				)
				{
					return (pass);
				}
				else
				{
					return (lookup);
				}
			}
		}
	}
	elseif (req.http.host ~ "geoserver2?[.]smap[.]se")
	{
		set req.url = regsub(req.url, "^/", "/geoserver/ows");
		set req.http.host = "geoserver.smap.se";
	}
	elseif (req.http.host ~ "kartor2?[.]smap[.]se")
	{
		if (req.url ~ "^/proxy")
		{
			set req.http.host = "193.17.67.229";
			set req.url = regsub(req.url, "^/proxy(/proxy\.py)?", "/qgis/proxy/proxy.py");
		}
		elseif (req.url ~ "^/cgi-bin/")
		{
			set req.http.host = "193.17.67.229";
			set req.url = regsub(req.url, "^/cgi-bin/", "/qgis/");
		}
		else
		{
			set req.http.host = "kartor.smap.se";
		}
	}
	elseif (req.http.host ~ "tilecache2?[.]smap[.]se")
	{
		set req.http.host = "tilecache.smap.se";
	}
	else
	{
		set req.http.host = "193.17.67.229";
	}
	if (req.url ~ "^/cgi-bin/proxy/|^/cgi-bin/search/|^/cgi-bin/shorten/")
	{
		set req.url = regsub(req.url, "^/cgi-bin/", "/qgis/");
	}
	if (req.url ~ "^/geoserver/geodata/(ows|wms|wfs)[?]|^/[sk]karta|^/print-servlet/|^/[Pp]ublicerat/|^/cgi-bin/|^/sbkqgis/cgi-bin/externt/")
	{
		set req.http.host = "193.17.67.229";
		set req.backend = kstad;
		set req.http.req-origin = "skgis2";
 	}
	if (req.backend == kstad)
	{
 		set req.http.host = "193.17.67.229";
		set req.backend = kstad;
		set req.http.req-origin = "skgis2";
	}
	else
	{
		if (req.url ~ "^/geos/")
		{
			set req.url = regsub(req.url, "^/geos/", "/geoserver/");
		}
		if (req.url ~ "^/geoserver/")
		{
			set req.backend = tomcat;
		}
		else
		{
			set req.backend = apache;
		}
	}
	return (pass);
}

sub vcl_hit
{
	set req.http.returntype = "lookup-hit";
}

sub vcl_miss
{
	set req.http.returntype = "lookup-miss";
}

sub vcl_pass
{
	set req.http.returntype = "pass";
}

sub vcl_fetch
{
	if (req.url ~ "^/cgi-bin/externt/kkartor/(park_besiktning_handlers|park_qgis)")
	{
		/* Login varification stuff for Park Application -START- */
		if (bereq.url ~ "park_besiktning_handlers" || bereq.http.Referer ~ "park_app_libs" || req.url ~ "lagfag2009")
		{
			set beresp.http.Cache-Control ="must-revalidate, max-age=0, s-maxage=0, no-cache, no-store";
			if (bereq.http.Authentication_required == "true")
			{
				if (bereq.http.Session == "authorize")
				{
					set beresp.http.Session ="authorized";		 
				}
				elseif (bereq.http.Session == "unauthorize")
				{
					set beresp.http.Session ="unauthorized";	 
				}	
			}
		}
		/* Login varification stuff for Park Application -END- */

		return (deliver);
	}
	if (req.http.too-big)
	{
		return (deliver);
	}
	if (req.http.X-Forwarded-Host == "kartor.kristianstad.se" && beresp.http.content-type ~ "text|javascript|ecmascript|xml")
	{
		set beresp.do_gzip = true;
	}
	/* Don't try to cache too large files. It appears */
	/* Varnish just crashes if we don't filter them.  */
	if (req.http.too-big != "1")
	{
		if (beresp.http.too-big)
		{
			unset beresp.http.too-big;
			set req.http.too-big = "1";
			return (restart);
		}
		elseif (beresp.http.Content-Length ~ "[0-9]{8,}")
		{            	
			set req.http.x-pipe-skgis2 = "1";
			return (restart);
		}
	}
	if (req.http.kkarta4 == "1" && beresp.status != 200 && beresp.status != 203 && beresp.status != 300 && beresp.status != 301 && beresp.status != 302 && beresp.status != 307 && beresp.status != 304)
	{
		set req.http.host = "193.17.67.210";
		set req.url = regsub(req.url, "/cgi-bin/externt/kkartor/", "/kkarta4/");
		unset req.http.kkarta4;
		return (restart);
	}
	elseif ( beresp.status != 200 && beresp.status != 203 && beresp.status != 300 && beresp.status != 301 && beresp.status != 302 && beresp.status != 307 && beresp.status != 304)
	{
		set beresp.http.Cache-control = "no-cache";
		unset beresp.http.Last-Modified;
		set req.http.returntype = "hit_for_pass";
		return (hit_for_pass);
	}
	elseif (req.backend == vakant)
	{
		return (deliver);
	}
	else
	{

		if (req.backend == kstad)
		{
			C{
				time_t now;
				time(&now);
				now += 1800;
				struct tm fmetime;
				fmetime = *localtime(&now);
				fmetime.tm_wday = 0;
				fmetime.tm_hour = 0;
				fmetime.tm_min = 0;
				fmetime.tm_sec = 0;
				VRT_l_beresp_ttl(sp, 428400 - difftime(now, mktime(&fmetime)));
			}C
			set beresp.http.Cache-Control = "max-age=" + beresp.ttl;
			#set beresp.http.Last-Modified = now - (604800s - beresp.ttl);
			set beresp.http.Last-Modified = regsub(now, "..:..:..", "00:00:00");
			unset beresp.http.Accept-Ranges;
			unset beresp.http.Age;
			unset beresp.http.Via;
			unset beresp.http.X-Varnish;
			if (req.http.returntype !~ "lookup-(hit|miss)")
			{
				set beresp.ttl=60s;
				if
				(
					req.request == "POST"
					||
					(
						req.url ~ "(?i)request=Get(Feature|Capabilities)|^/wkartor/(export|print|save|configs|news|functions)(/|\?)|^/print-servlet/|^/tomcat/|^/wkartor/?(index\.php|index_dev\.php)\?|(\?|&)config=|^/wkartor/authorization/?(index\.php(\?logout)?)?$|^/geoserver/[^/]*/?(wms|wfs)|getPublicKey|handshake|sesstest" 
						&&
						!(
							req.url ~ "(?i)\.png$"
							||
							req.url ~ "(?i)\.(js[^o]|gif|html|jpeg|jpg|htm|css)"
						)
					)
				)
				{
					set beresp.http.Cache-control = "no-cache";
					unset beresp.http.Last-Modified;
				}
				else
				{
					set beresp.http.Cache-Control = "max-age=608400";
				}
			}
			elseif (req.url ~ "(?i)\.(png|gif|jpeg|jpg)$")
			{
				set beresp.http.Cache-Control = "max-age=608400";
			}
		}
		return (deliver);
	}
}

sub vcl_error
{
    if (obj.status == 750)
    {
        set obj.http.Location = obj.response;
        set obj.status = 302;
        return(deliver);
    }
}

sub vcl_deliver
{
	if (resp.http.route)
	{
		set resp.http.route = resp.http.route + "->" + req.backend + ":" + req.http.returntype;
	}
	else
	{
		set resp.http.route = "" + req.backend + ":" + req.http.returntype;
	}
	return (deliver);
}

sub vcl_pipe
{
	if (req.http.route ~ ".")
	{
		set bereq.http.route = "" + req.backend + ":pipe" + "->" + req.http.route;
	}
	else
	{
		set bereq.http.route = "" + req.backend + ":pipe";
	}
	set bereq.http.connection = "close";
	return (pipe);
}

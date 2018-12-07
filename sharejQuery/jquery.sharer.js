(function ($) {

$.sharer = {
	"networks": {
		"facebook": {
			"name": "Facebook",
			"url": "http://www.facebook.com/share.php?u=%url%"
		},
		"twitter": {
			"name": "Twitter",
			"url": "https://twitter.com/share?url=%url%&text=%title%+%description%"
		},
		"linkedin": {
			"name": "LinkedIn",
			"url": "http://www.linkedin.com/shareArticle?mini=true&url=%url%&title=%title%&summary=%description%&source=in1.com"
		},
		"tumblr": {
			"name": "Tumblr",
			"url": "http://www.tumblr.com/share/link?url=%url%&name=%title%&description=%description%"
		},
		"googleplus": {
			"name": "Google+",
			"url": "https://plusone.google.com/_/+1/confirm?hl=en&url=%url%"
		},
		"reddit": {
			"name": "reddit",
			"url": "http://reddit.com/submit?url=%url%"
		},
		"pinterest": {
			"name": "Pinterest",
			"url": "http://pinterest.com/pin/create/button/?url=%url%&media=&description=%title%+%description%"
		},
		"stumbleupon": {
			"name": "StumbleUpon",
			"url": "http://www.stumbleupon.com/submit?url=%url%&title=%title%"
		}/*,
		"taringa": {
			"name": "Taringa!",
			"url": "http://www.taringa.net/widgets/share.php?url=%url%&body=%title%+%description%"
		}*/
	},
	"options": {
		//"networks": ["facebook", "twitter", "linkedin", "tumblr", "googleplus", "reddit", "pinterest", "stumbleupon", "taringa"],
		"networks": ["facebook", "twitter", "linkedin", "tumblr", "googleplus", "reddit", "pinterest", "stumbleupon"],
		"template": $('<a class="sharer-icon" />'),
		"class": "sharer-icon-%network.id%",
		"label": "Share on %network.name%",
		"title": null,
		"description": null,
		"url": null
	}
};

function getLinkToViewLink(){
        /*var temp_baseUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?';
        var join1 = '';
        for (var param in Fusion.queryParams) {
            if (typeof Fusion.queryParams[param] == 'string') {
                if (param == 'extent' || param == 'filter' || param == 'spatialfilter' || param == 'variant' || param == 'theme' || param == 'selectlayer' || param == 'showlayers' || param == 'hidelayers' || param == 'showgroups' || param == 'hidegroups') {
                    continue;
                }
                temp_baseUrl += join1 + param + '=' + Fusion.queryParams[param];
                join1 = '&';
            }
        }

        var join = (temp_baseUrl.indexOf('?') == temp_baseUrl.length - 1) ? '' : '&';
        var queryStr = Fusion.getWidgetById('Map').getLinkParams();
        if (temp_baseUrl.indexOf('p=p') > 0) {
            return (this.portalLink() + queryStr);
        } 
        else {
            return temp_baseUrl + join + queryStr;
        }*/
		
		return document.getElementById('share_link_main_id').value;


}

$.fn.sharer = function () {
	var options = $.extend({}, $.sharer.options, options);

	return this.each(function () {
		var container = $(this);

		for (var i = 0; i < options["networks"].length; i++) {
			var network = options["networks"][i],
				networkData = $.sharer.networks[network],
				button = options["template"].clone();

			button
				.data("network", networkData)
				.addClass(options["class"].replace("%network.id%", network))
				.attr("title", options["label"].replace("%network.name%", networkData["name"]))
				.click(function () {
					var networkData = $(this).data("network"),
						popup = networkData["url"]
							.replace("%title%", encodeURIComponent(options["title"] || document.title))
							.replace("%description%", encodeURIComponent(options["description"] || $("meta[name=description]").attr("content")))
							.replace("%url%", encodeURIComponent(options["url"] || getLinkToViewLink()));

					window.open(popup, "sharer", "toolbar=0,resizable=1,status=0,width=640,height=528");
				})
				.appendTo(container);
		}
	});
};

}(jQuery));
$.fn.minVal = function(max_) {
  var val = $(this).val();
	if (!$.isNumeric(val))
		$(this).val(max_);
	else {
		if (val<max_)
			$(this).val(max_);
		}
		
	return this;
	};
	
$.fn.maxVal = function(max_) {
	var val = $(this).val();
	if (!$.isNumeric(val))
		$(this).val(max_);
	else {
		if (val>max_)
			$(this).val(max_);
		}
		
	return this;
	};
	
function str_replace(needle, haystack, string) {
	if (string)
		return (string+'').replace(needle, haystack);
	}

function me() {
	return $("[data-ajax=me]").html();
	}

function hash_obj(o) {
	return short_hash(JSON.stringify(o));
	}

function short_hash(str) {
	var s1, s2;
	str = str+"";
	s1 = ($.sha1(str)+"").substr(0, 10); s2 = ($.sha1(str)+"").substr(10, 10);
	return ($.sha1(s1+s2)+"").substr(0, 20);
	}

function ucwords(words) {
	return (str + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
	    return $1.toUpperCase();
  		});
	}

function isset(ev) {
	ev = eval(ev);
	if (ev) return ev;
	}
	
function nl() {
	return "\n";
	}
	
function nr() {
	return "\r";
	}
	
function nt() {
	return "\t";
	}

function gen_id(base) {
	var ran, re;
	
	re = "";
	for(n=0;n<10;n++) {
		ran = (Math.round(Math.random()*9))+''; re += ran;
		}
		
	re = (base||"auto_ID")+re;
		
	while($("#"+re).exists()) {
		re = "";
		for(n=0;n<10;n++) {
			ran = (Math.round(Math.random()*9))+''; re += ran;
			}
			
		re = (base||"auto_ID")+re;
		}
		
	return re;
	}
	
window.PROTOSTACKS = {};
function afterProto(f) {
	return onProto(f);
	}

function onProto(f) {
	f = f||{};
	window.PROTOSTACKS[window.PROTOSTACKS.length+1] = f;
	}
	
window.BPROTOSTACKS = {};
function beforeProto(f) {
	f = f||{};
	window.BPROTOSTACKS[window.BPROTOSTACKS.length+1] = f;
	}

$.fn.bbc = function(action) {
	action = action||"#FCFCFC";
	
	var s = $(this).html();
	
	if (typeof(s)!="string") {
		return "";
		}
		
	s = s.replace(/\\\[/gim, "&lb#;");
	s = s.replace(/\\\]/gim, "&rb#;");
		
	s = s.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>');
	s = s.replace(/\[align=(.+?)\](.+?)\[\/align\]/igm, "<div style='text-align: $1;'>$2</div>");
	s = s.replace(/\[size=(.+?)\](.+?)\[\/size\]/igm, "<span style='font-size: $1"+"px;'>$2</span>");
	s = s.replace(/\[color=(.+?)\](.+?)\[\/color\]/igm, "<span style='color: $1;'>$2</span>");
	s = s.replace(/\[b\](.+?)\[\/b\]/igm, "<span style='font-weight: bold;'>$1</span>");
	s = s.replace(/\[code\](.+?)\[\/code\]/igm, "<pre>$1</pre>");
	s = s.replace(/\[glow=(.+?)\](.+?)\[\/glow\]/igm, "<span style='text-shadow: 0px 0px 4px $1;'>$2</pre>");
	s = s.replace(/\[outline=(.+?)\](.+?)\[\/outline\]/igm, "<span style='text-shadow: -1px -1px $1, 1px 1px $1, 1px -1px $1, -1px 1px $1;'>$2</span>");
	s = s.replace(/\[img\](.+?)\[\/img\]/igm, "<img onerror=\"this.src='i/invalid.png';\" src=\"$1\">");
	s = s.replace(/\[img=(.+?)\]/igm, "<img onerror=\"this.src='i/invalid.png';\" src=\"$1\">");
	
	s = s.replace(/\&lb\#\;/igm, "[");
	s = s.replace(/\&rb\#\;/igm, "]");
	
	s = s.replace(/\*(.+?)\*/igm, "<span style='color: "+action+"; font-weight: bold;'>*$1*</span>");
	
	s = s.replace(/\$(.+?) /igm, '<span style="color: green; font-weight: bold; text-shadow: -1px -1px yellow, 1px 1px yellow, -1px 1px yellow, 1px -1px yellow;">&#36;$1</span> ');
	s = s.replace(/\$(.+?)\./igm, '<span style="color: green; font-weight: bold; text-shadow: -1px -1px yellow, 1px 1px yellow, -1px 1px yellow, 1px -1px yellow;">&#36;$1</span>.');
	s = s.replace(/\$(.+?)\!/igm, '<span style="color: green; font-weight: bold; text-shadow: -1px -1px yellow, 1px 1px yellow, -1px 1px yellow, 1px -1px yellow;">&#36;$1</span>!');
	
	s = s.replace(/\$(.+?)\;/igm, '<span style="color: green; font-weight: bold; text-shadow: -1px -1px yellow, 1px 1px yellow, -1px 1px yellow, 1px -1px yellow;">&#36;$1</span>;');
	
	return $(this).html(s);
	}

$.fn.clearOnClick = function(message) {
	return $(this).val(message).on("focus", function() {
		var data_exists = $(this).data("__alreadyClicked");
		if (!data_exists) {
			$(this).data("__alreadyClicked", "1");
			$(this).val("");
			}
		});
	};
	
$.fn.colsort = function(url, __sort, __order, __page) {
	url = url||"";
	url = url.split("||", 2);
	var sorting = url[1]||".sort";
	url = url[0];
	
	$(this).find(sorting).on("click", function() {
		if ($(this).data("sort")==window._sort) {
			switch(window._order) {
				case "desc":
					window._order = "asc";
					break;
					
				default:
					window._order = "desc";
					break;
				}
			} else {
			window._order = "asc";
			}
			
		if (!$.isNumeric(window._page)) {
			window._page = 0;
			}
			
		window._sort = $(this).data("sort");
		window.location = $(this).data("url")+"?sort="+window._sort+"&order="+window._order+"&page="+window._page;
		});
	};

function change_status_dialog() {
	window.__TempStatusDialogBox = $(alert("<div style='margin-bottom: 4px;'><input class='ui-widget-content' type='text' style='width: 100%; margin: -1px;' id='new-status-text' value='"+$("#head-status").html()+"'></div><div style='text-align: center;'><input type='button' class='ui-button' value='Update Status' id='change-your-status' style='margin: 0 auto; width: 75%;'></div>", "Change Your Status"));
	
	if ($("#head-status").html()=="<span class=\"color-1\">Not Set</span>") {
		$("#new-status-text").val("");
		}
		
	if ($("#head-status").html()=="<span class='color-1'>Not Set</span>") {
		$("#new-status-text").val("");
		}
	
	$("#change-your-status").on("click", function() {
		$.ajax({
			"url":"ajax.php?x-protocol=status&new="+$("#new-status-text").val(),
			"success":function(d) {
				d = d||{};
				$(window.__TempStatusDialogBox).dialog('close').remove();
				}
			});
		});
	
	$(".ui-button, input[type=button], input[type=submit], button").not(".skip").button().addClass("skip");
	}

function headerBars() {
	var bar = $(".pro-bar");
	bar.each(function() {
		$(this).progressbar({
			"value":parseInt($(this).data("value")),
			"max":parseInt($(this).data("max"))
			});
		});
	}

function ucwords(str) {
	// http://kevin.vanzonneveld.net
	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +   improved by: Waldo Malqui Silva
	// +   bugfixed by: Onno Marsman
	// +   improved by: Robin
	// +      input by: James (http://www.james-bell.co.uk/)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// *     example 1: ucwords('kevin van  zonneveld');
	// *     returns 1: 'Kevin Van  Zonneveld'
	// *     example 2: ucwords('HELLO WORLD');
	// *     returns 2: 'HELLO WORLD'
	return (str + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
		return $1.toUpperCase();
		});
	}

function lZero(i) {
	i = i||"0";
	if (!$.isNumeric(i)) {
		i = "0";
		}
		
	if (i<9) {
		i = "0"+i;
		}
		
	return i;
	}

window.__loadScriptsPointer = 0;
window.__loadScripts = {};
function addWindowLoad(call) {
	if (window.ScriptsAlreadyLoAdEd) {
		call();
		} else {
		window.__loadScripts[window.__loadScriptsPointer] = call; window.__loadScriptsPointer++;
		}
	}

$.fn.exists = function() {
	return (this.length>0);
	}

$.fn.wipe = function(sel) {
	sel = sel||"input[type=text], input[type=password], textarea";
	$(this).find(sel).val("");
	
	return this;
	};

$.fn.textSelect = function(onoff) {
	onoff = onoff||"on"; onoff = ''+onoff;
	
	var type = $(this).prop("type");
	switch((''+type).toLowerCase()) {
		case 'text':
		case 'password':
		case 'button':
		case 'submit':
			return this;
		}
	
	switch(onoff.toLowerCase()) {
		case 'off':
			return this.attr('unselectable', 'off').css('user-select', 'none').on('selectstart', false);
			
		default:
			return this.attr('unselectable', 'on').css('user-select', 'text').on('selectstart', true);
		}
		
	return this;
    };
	
function parse_alerts() {
	$("th").addClass("ui-widget-header").css("padding", "2px");
	
	$(".no-select").textSelect("off");
	}
	
window.___resizeWindowScripts = {};
	
function moreResize(ind, call1) {
	ind = ind||((Math.random()*99)+'')+((Math.random()*99)+'')+((Math.random()*99)+'')+((Math.random()*99)+'')+((Math.random()*99)+'')+((Math.random()*99)+'')+((Math.random()*99)+'')+((Math.random()*99)+'')+((Math.random()*99)+'')+((Math.random()*99)+'')+((Math.random()*99)+'')+((Math.random()*99)+'')+((Math.random()*99)+'');
	if (call1) {
		window.___resizeWindowScripts[ind] = call1;
		}
	}
	
function lessResize(ind) {
	if (ind) {
		delete window.___resizeWindowScripts[ind];
		}
	}
	
function clearBar() {
	if (!window.__statusBarClearTimeout) {
		window.__statusBarClearTimeout = setTimeout(function() {
			$("#status-bar.status-bar").html("");
			}, 10000)
		}
	}
	
function statusBar(html) {
	if (html) {
		if ($("#status-bar").exists()) {
			$("#status-bar.status-bar").html(" - "+html);
			}
			
		if (window.__statusBarClearTimeout) {
			clearTimeout(window.__statusBarClearTimeout);
			delete window.__statusBarClearTimeout;
			}
		}
	}
	
function window_resize() {
	if (!window.__throttleResize) {
		setTimeout(function() {
			delete window.__throttleResize;
			}, 10);
		
		if ($(".header").exists() && $(".content").exists() && $(".links").exists()) {
			$(".content").css("width", ($(window).width() - $(".links").width() - 4) + 'px');
			$(".content").css("height", ($(window).height() - $(".header").height())+'px');
			$(".links").css("margin-top", "27px").css("height", ($(window).height() - $(".header").height() - 27 - 24)+'px').css("max-height", ($(window).height() - $(".header").height() - 27 - 24)+'px').css('overflow', 'auto');
			$("#status-bar.status-bar").css("height", "24px");
			}
			
		$.each(window.___resizeWindowScripts, function() {
			if ($.isObject(window.___resizeWindowScripts[ea])) {
				window.___resizeWindowScripts[ea].$ = window.$;
				window.___resizeWindowScripts[ea](window);
				}
			});
		}
	}
	
$(window).on('resize',function() {
	window_resize();
	});
	
window.__globalsStored = {};
	
function globals(ind, val, callback) {
	callback = callback||function(){};
	
	if (ind) {
		if (val) {
			$.ajax({
				"url":"ajax.php?x-protocol=globals&ind="+ind+"&val="+val,
				success:callback
				});
			} else {
			$.ajax({
				"url":"ajax.php?x-protocol=globals&ind="+ind,
				success:callback
				});
			}
		}
		
	return this;
	}
	
function global_ajax() {
	if (!($(".header").exists() && $(".content").exists() && $(".links").exists())) {
		return false;
		}
		
	var ajax_send = {};
	
	$("[data-ajax]:not([data-skip])").each(function() {
		var util = $(this).data("util"); util = util||"";
		switch((''+$(this).data("method")).toLowerCase()) {
			case 'html':
				switch((''+util).toLowerCase()) {
					case 'hash':
						ajax_send[$(this).data("ajax")] = ($.sha1(''+$(this).html())+'').substr(0, 20);
						break;
						
					case 'tolength':
						ajax_send[$(this).data("ajax")] = (''+$(this).html()).length;
						break;
						
					default:
						ajax_send[$(this).data("ajax")] = $(this).html();
						break;
					}
				break;
				
			case 'data':
				switch((''+util).toLowerCase()) {
					case "hash":
						ajax_send[$(this).data("ajax")] = ($.sha1(''+$(this).data("data"))+'').substr(0, 20);
						break;
						
					case 'tolength':
						ajax_send[$(this).data("ajax")] = (''+$(this).data("data")).length;
						break;
						
					default:
						ajax_send[$(this).data("ajax")] = $(this).data("data");
						break;
					}
				break;
			}
		});
		
	if (!window.__bandwidth)
		window.__bandwidth = 0;
		
	if ($("#forums-table").exists()) {
		window.__tbuild = {};
		$(".forum").each(function() {
			window.__tbuild[$(this).data("id")] = $(this).data("update");
			});
		ajax_send.forum_table = JSON.stringify(window.__tbuild);
		delete window.__tbuild;
		}
		
	if ($("#threads-table").exists()) {
		window.__tbuild = {};
		$(".thread").each(function() {
			window.__tbuild[$(this).data("id")] = $(this).data("update");
			});
		ajax_send.thread_table = JSON.stringify(window.__tbuild);
		ajax_send['parent'] = $(".thread").data("parent");
		delete window.__tbuild;
		}
		
	if ($("#posts-table").exists()) {
		window.__tbuild = {};
		$(".post").each(function() {
			window.__tbuild[$(this).data("id")] = $(this).data("update");
			});
			
		ajax_send['parent'] = $(".post").data("parent");
		ajax_send.post_table = JSON.stringify(window.__tbuild);
		delete window.__tbuild;
		}
		
	if ($("#profile-info").exists()) {
		var last = $("#profile-info").data("update");
		if (!last) last = 0;
		
		ajax_send['f1'] = $("#profile-info").data("update");
		//prompt($("#profile-info").data("update"));
		}
	
	if (self==top)
		ajax_send.iframe = "no";
	else
		ajax_send.iframe = "yes";
	
	if (window.is_typing) {
		ajax_send.typing = $("#mail_user").html();
		delete window.is_typing;
		}
	
	var test;
	for(ea in window.BPROTOSTACKS) {
		if ($.isFunction(window.BPROTOSTACKS[ea])) {
			test = window.BPROTOSTACKS[ea](ajax_send);
			if (test) {
				ajax_send = test;
				delete test;
				}
			}
		}
	
	$.ajax({
		url:"global_ajax.php",
		type:"post",
		data:ajax_send,
		error: function() {
			setTimeout(global_ajax, 2500);
			},
		success:function(_2) {
			_2 = _2||{};
			
			if (_2.status_bar) {
				if ($("#status-bar.status-bar").exists()) {
					if ($("#status-bar.status-bar").html()!=_2.status_bar) {
						$("#status-bar.status-bar").html(_2.status_bar);
						}
					}
				}
			
			if ($("[data-ajax=typing]").exists()) {
				$("[data-ajax=typing]").remove();
				}
			
			if (_2.json_size) {
				window.__bandwidth += parseInt(_2.json_size);
				if ($("#bandwidth-meter").exists()) {
					var measure = window.__bandwidth;
					measure = Math.round(measure / (parseInt(_2['time']) - parseInt($("#bandwidth-meter").data("time"))));
					
					var bw = window.__bandwidth;
					var b = measure;
					
					var bwex = "b";
					if (bw>1000) { bwex = "kb"; bw = bw / 1000; }
					if (bw>1000) { bwex = "mb"; bw = bw / 1000; }
					
					var bex = "b";
					if (b>1000) { bex = "kb"; b = b / 1000; }
					if (b>1000) { bex = "mb"; b = b / 1000; }
					
					b = parseFloat(b).toFixed(2)
					bw = parseFloat(bw).toFixed(2)
					
					if (!window.___totaltime) {
						window.___totaltime = 0;
						}
						
					window.___totaltime++;
					
					$("#bandwidth-meter").html("<div>[<span class='color-1'>"+bw+"</span>"+bwex+"/t] [<span class='color-2'>"+b+"</span>"+bex+"/s]</div><div>Total Time: "+hms(window.___totaltime)+"</div>");
					}
				}
			
			if (_2.error) {
				if (!window.ajaxErrorShowing) {
					window.ajaxErrorShowing = true;
					if (_2.error != "You are not signed in") {
						$(alert(_2.error)).on('dialogclose', function() {
							delete window.ajaxErrorShowing;
							});
						} else {
						if (_2.name) {
							$(alert("<div style='width: 100%; text-align: center;'>You have gone inactive<br><a href='login.php'>Go Back To Login Page</a></div>")).on('dialogclose', function() {
								delete window.ajaxErrorShowing;
								window.location = "login.php";
								}).dialog("option", "title", "You Have Gone Inactive");
									
							$("#login-pass[name=logpass]").trigger("focus").on("keyup", function(e) {
								e = e||{}; e.which = e.which||0;
								if (e.which==13)
									$("#form-relog-submit").trigger("click");
								});
								
							$("#input[name=logname]").on("keyup", function(e) {
								e = e||{}; e.which = e.which||0;
								if (e.which==13)
									$("#form-relog-submit").trigger("click");
								});
							} else {
							$(alert(_2.error)).on('dialogclose', function() {
								delete window.ajaxErrorShowing;
								window.location = "login.php";
								});
							}
							
						window.stop_ajax = 2;
						}
					delete _2.error;
					}
				return false;
				}
			
			var _1; var obj = "";
			for(_1 in _2) {
				switch(_1) {
					case "za":
						if ($("#jail-thanks").html()!=_2[_1])
							$("#jail-thanks").html(_2[_1]);
						break;
				
					/*== Update Profile Information (profile.php?x-id=user) ==*/
					//nickname
					case "p1":
						if (_2[_1]!="") if ($("#profile-nickname").html()!=_2[_1]) {
							$("#profile-nickname").html(_2[_1]);
							document.title = "Viewing "+_2[_1]+" ["+$("[data-ajax=user]").html()+"]";
							}
						break;
						
					case "p2":
						obj = "#profile-level";
						if (_2[_1]!="") if ($(obj).html()!=_2[_1]) {
							$(obj).html(_2[_1]);
							}
						break;
						
					case "p3":
						obj = "#profile-health";
						if (_2[_1]!="") if ($(obj).html()!=_2[_1]) {
							$(obj).html(_2[_1]);
							}
						break;
						
					case "p4":
						obj = "#profile-health-max";
						if (_2[_1]!="") if ($(obj).html()!=_2[_1]) {
							$(obj).html(_2[_1]);
							}
						break;
						
					case "p5":
						obj = "#profile-location";
						if (_2[_1]!="") if ($(obj).html()!=_2[_1]) {
							$(obj).html(_2[_1]);
							}
							
						if (!_2['c5']) {
							$("#travel-to-link").hide();
							$(".hide-bars-01").hide();
							} else {
							$("#travel-to-link").show().data('link', "travel.php?to="+_2['c5']);
							$(".hide-bars-01").show();
							}
						break;
						
					case "p6":
						obj = "#profile-estate";
						if (_2[_1]!="") if ($(obj).html()!=_2[_1]) {
							$(obj).html(_2[_1]);
							}
						break;
						
					case "p7":
						obj = "#profile-money";
						if (_2[_1]!="") if ($(obj).html()!=_2[_1]) {
							$(obj).html(_2[_1]);
							}
						break;
						
					case "p8":
						obj = "#profile-gold";
						if (_2[_1]!="") if ($(obj).html()!=_2[_1]) {
							$(obj).html(_2[_1]);
							}
						break;
						
					case "p9":
						obj = "#profile-rice";
						if (_2[_1]!="") if ($(obj).html()!=_2[_1]) {
							$(obj).html(_2[_1]);
							}
						break;
						
					case "pa":
						obj = "#profile-referrals";
						if (_2[_1]!="") if ($(obj).html()!=_2[_1]) {
							$(obj).html(_2[_1]);
							}
						break;
						
					case "pb":
						obj = "#profile-friends";
						if (_2[_1]!="") if ($(obj).html()!=_2[_1]) {
							$(obj).html(_2[_1]);
							}
						break;
						
					case "pc":
						obj = "#profile-enemies";
						if (_2[_1]!="") if ($(obj).html()!=_2[_1]) {
							$(obj).html(_2[_1]);
							}
						break;
						
					case "pd":
						obj = "#profile-last-action";
						if (_2[_1]!="") if ($(obj).html()!=hms(_2[_1])) {
							$(obj).html(hms(_2[_1]));
							}
						break;
						
					case "pe":
						obj = "#profile-last-login";
						if (_2[_1]!="") if ($(obj).html()!=hms(_2[_1])) {
							$(obj).html(hms(_2[_1]));
							}
						break;
						
					case "pf":
						obj = "#profile-age";
						if (_2[_1]!="") if ($(obj).html()!=hms(_2[_1])) {
							$(obj).html(hms(_2[_1]));
							}
						break;
						
					case "pg":
						obj = "#profile-info";
						if (_2[_1]!="") if ($(obj).html()!=_2[_1]) {
							$(obj).html(_2[_1]);
							}
							
						$("#profile-info").data("update", _2.pg2);
						break;
						
					case "ph":
						obj = "#profile-image";
						if (_2[_1]!="") if ($(obj).prop("src")!=_2[_1]) {
							$(obj).prop("src", _2[_1]);
							}
						break;
						
					case "pi":
						obj = "#profile-online";
						switch(_2[_1]) {
							case "online":
								$(obj).html("Online");
								if (document.getElementById("profile-online")!=null)
									document.getElementById("profile-online").className = "online";
								break;
								
							case "away":
								$(obj).html("Away");
								if (document.getElementById("profile-online")!=null)
									document.getElementById("profile-online").className = "away";
								break;
								
							case "offline":
								$(obj).html("Offline");
								if (document.getElementById("profile-online")!=null)
									document.getElementById("profile-online").className = "offline";
								break;
							}
						break;
						
					case "pj":
						obj = "#profile-gender";
						switch((_2[_1]+'').toLowerCase()) {
							case "m":
							case "male":
								if ($(obj).html()!="Male") {
									$(obj).html("Male");
									}
								break;
								
							case "f":
							case "female":
								if ($(obj).html()!="Female") {
									$(obj).html("Female");
									}
								break;
							}
						break;
						
					case "pk":
						obj = "#profile-status";
						if (_2[_1]!="") if ($(obj).html()!=(_2[_1])) {
							$(obj).html((_2[_1]));
							}
						break;
					
					/*== Update header and stats (home stats/header stats/mails/events/etc) ==*/
					//mail
					case "a":
						if (_2[_1]!="") {
							if (parseInt(_2[_1])>0) {
								$("#mail-class").addClass("color-1");
								} else {
								$("#mail-class").removeClass("color-1");
								}
								
							if ($("#mails").html()!=_2[_1]) {
								$("#mails").html(_2[_1]);
								}
							
							if (parseInt(_2[_1])>0) {
								if (!$("#count-mails-high").hasClass("color-5"))
									$("#count-mails-high").addClass("color-5");
								if (!$("#count-mails-high").hasClass("ui-button-2"))
									$("#count-mails-high").addClass("ui-button-2");
								if ($("#count-mails-high").hasClass("ui-button"))
									$("#count-mails-high").removeClass("ui-button");
								} else {
								if ($("#count-mails-high").hasClass("color-5"))
									$("#count-mails-high").removeClass("color-5");
								if ($("#count-mails-high").hasClass("ui-button-2"))
									$("#count-mails-high").removeClass("ui-button-2");
								if (!$("#count-mails-high").hasClass("ui-button"))
									$("#count-mails-high").addClass("ui-button");
								}
							} else {
							if ($("#count-mails-high").hasClass("color-5"))
								$("#count-mails-high").removeClass("color-5");
							if ($("#count-mails-high").hasClass("ui-button-2"))
								$("#count-mails-high").removeClass("ui-button-2");
							if (!$("#count-mails-high").hasClass("ui-button"))
								$("#count-mails-high").addClass("ui-button");
							}
						break;
						
					//events
					case "b":
						if (_2[_1]!="") {
							if ($("#events").html()!=_2[_1]) {
								$("#events").html(_2[_1]);
								}
							
							if (parseInt(_2[_1])>0) {
								if (!$("#count-events-high").hasClass("color-5"))
									$("#count-events-high").addClass("color-5");
								if (!$("#count-events-high").hasClass("ui-button-2"))
									$("#count-events-high").addClass("ui-button-2");
								if ($("#count-events-high").hasClass("ui-button"))
									$("#count-events-high").removeClass("ui-button");
								} else {
								if ($("#count-events-high").hasClass("color-5"))
									$("#count-events-high").removeClass("color-5");
								if ($("#count-events-high").hasClass("ui-button-2"))
									$("#count-events-high").removeClass("ui-button-2");
								if (!$("#count-events-high").hasClass("ui-button"))
									$("#count-events-high").addClass("ui-button");
								}
							} else {
							if ($("#count-events-high").hasClass("color-5"))
								$("#count-events-high").removeClass("color-5");
							if ($("#count-events-high").hasClass("ui-button-2"))
								$("#count-events-high").removeClass("ui-button-2");
							if (!$("#count-events-high").hasClass("ui-button"))
								$("#count-events-high").addClass("ui-button");
							}
						break;
						
					//hospital
					case "c":
						if (_2[_1]!="") if ($("#hospital").html()!=_2[_1]) {
							$("#hospital").html(_2[_1]);
							}
						break;
						
					//jail
					case "d":
						if (_2[_1]!="") if ($("#jail").html()!=_2[_1]) {
							$("#jail").html(_2[_1]);
							}
						break;
						
					//location
					case "e":
						if (_2[_1]!="") if ($("#location").html()!=_2[_1]) {
							$("#location").html(_2[_1]);
							}
						break;
						
					//name
					case "f":
						if (_2[_1]!="") if ($("#name").html()!=_2[_1]) {
							$("#name").html(_2[_1]);
							}
						break;
						
					//level
					case "g":
						if (_2[_1]!="") if ($("#level").html()!=_2[_1]) {
							$("#level").html(_2[_1]);
							}
							
						if ($("#home-level").exists()) {
							if (_2[_1]!="") if ($("#home-level").html()!=_2[_1]) {
								$("#home-level").html(_2[_1]);
								}
							}
						break;
					
					//money
					case "h":
						if (_2[_1]!="") if ($("#money").html()!=_2[_1]) {
							$("#money").html(_2[_1]);
							if (!$("#money + span.bank-all").exists()) {
								if (parseInt(_2[_1])>0) {
									$("#money").after("<span class='bank-all'> [<a href='city-bank.php?a=bank-all'>Bank All</a>]</span>");
									}
								} else if ($("#money + span.bank-all").exists()) {
								$("#money + span.bank-all").remove();
								}
							}
						break;
						
					//gold
					case "i":
						if (_2[_1]!="") if ($("#gold").html()!=_2[_1]) {
							$("#gold").html(_2[_1]);
							}
						break;
						
					//rice
					case "j":
						if (_2[_1]!="") if ($("#rice").html()!=_2[_1]) {
							$("#rice").html(_2[_1]);
							}
						break;
						
					//turns
					case "k":
						if (_2[_1]!="") if ($("#turns").html()!=_2[_1]) {
							$("#turns").html(_2[_1]);
							}
						break;
						
					//open
					case "l":
						if (_2[_1]!="") if ($("#open").html()!=_2[_1]) {
							$("#open").html(_2[_1]);
							}
						break;guard
						
					//strength
					case "m":
						if ($("#home-strength").exists()) {
							if (_2[_1]!="") if ($("#home-strength").html()!=_2[_1]) {
								$("#home-strength").html(_2[_1]);
								}
							}
						break;
						
					//guard
					case "n":
						if ($("#home-guard").exists()) {
							if (_2[_1]!="") if ($("#home-guard").html()!=_2[_1]) {
								$("#home-guard").html(_2[_1]);
								}
							}
						break;
						
					//agility
					case "o":
						if ($("#home-agility").exists()) {
							if (_2[_1]!="") if ($("#home-agility").html()!=_2[_1]) {
								$("#home-agility").html(_2[_1]);
								}
							}
						break;
						
					//labor
					case "p":
						if ($("#home-labor").exists()) {
							if (_2[_1]!="") if ($("#home-labor").html()!=_2[_1]) {
								$("#home-labor").html(_2[_1]);
								}
							}
						break;
						
					//health
					case "q":
						var health = parseInt(_2.q); var max_health = parseInt(_2.r);
						if ($("#head-health-bar").exists()) {
							$("#head-health-bar").progressbar('option', 'value', health).progressbar('option', 'max', max_health);
							$("#head-health-bar + .pro-title").prop("title", "Health: "+health+"/"+max_health);
							}
							
						if ($("#head-health-bar-percent").exists()) {
							$("#head-health-bar-percent").html(Math.round((health/max_health)*100)+"%");
							}
						break;
						
					//exp-have
					case "s":
						var exp_have = parseInt(_2.s); var exp_need = parseInt(_2.t);
						if ($("#head-exp-bar").exists()) {
							$("#head-exp-bar").progressbar('option', 'value', exp_have).progressbar('option', 'max', exp_need);
							$("#head-exp-bar + .pro-title").prop("title", "Experience: "+exp_have+"/"+exp_need);
							}
							
						if ($("#head-exp-bar-percent").exists()) {
							$("#head-exp-bar-percent").html(Math.round((exp_have/exp_need)*100)+"%");
							}
							
						if ($("#home-exp-have").exists()) {
							if (_2[_1]!="") if ($("#home-exp-have").html()!=_2[_1]) {
								$("#home-exp-have").html(_2[_1]);
								}
							}
						break;
						
					//exp-need
					case "t":
						if ($("#home-exp-need").exists()) {
							if (_2[_1]!="") if ($("#home-exp-need").html()!=_2[_1]) {
								$("#home-exp-need").html(_2[_1]);
								}
							}
						break;
						
					case "u":
						var estate = _2[_1]||{};
						
						if (estate.name) {
							if ($("#home-estate-name").exists()) {
								if (estate.name!="") if ($("#home-estate-name").html()!=estate.name) {
									$("#home-estate-name").html(estate.name);
									}
								}
							}
							
						if (estate.level) {
							if ($("#home-estate-level").exists()) {
								if (estate.level!="") if ($("#home-estate-level").html()!=estate.level) {
									$("#home-estate-level").html(estate.level);
									}
								}
							}
							
						if (estate.cost) {
							if ($("#home-estate-cost").exists()) {
								if (estate.cost!="") if ($("#home-estate-cost").html()!=estate.cost) {
									$("#home-estate-cost").html(estate.cost);
									}
								}
							}
						break;
					
					case "v":
						if ($("#turns").exists()) {
							$("#turns").html(_2[_1]);
							}
						break;
						
					case "w":
						var energy = parseInt(_2.w); var energy_max = parseInt(_2.x);
						if ($("#head-energy-bar").exists()) {
							$("#head-energy-bar").progressbar('option', 'value', energy).progressbar('option', 'max', energy_max);
							$("#head-energy-bar + .pro-title").prop("title", "Energy: "+energy+"/"+energy_max+"<br>Click to refill your energy; This costs 10 gold coins!");
							}
							
						if ($("#head-energy-bar-percent").exists()) {
							$("#head-energy-bar-percent").html(Math.round((energy/energy_max)*100)+"%");
							}
							
						if ($("#home-energy").exists()) {
							if (_2[_1]!="") if ($("#home-energy").html()!=Math.round((energy/energy_max)*100)+"%") {
								$("#home-energy").html(Math.round((energy/energy_max)*100)+"%");
								}
							}
						break;
						
					case "y":
						var will = parseInt(_2.y); var will_max = parseInt(_2.z);
						if ($("#head-will-bar").exists()) {
							$("#head-will-bar").progressbar('option', 'value', will).progressbar('option', 'max', will_max);
							$("#head-will-bar + .pro-title").prop("title", "Will: "+will+"/"+will_max+";<br>It will cost you 20 rice to refill your will!");
							}
							
						if ($("#head-will-bar-percent").exists()) {
							$("#head-will-bar-percent").html(Math.round((will/will_max)*100)+"%");
							}
						break;
						
					case "a1":
						var brave = parseInt(_2.a1); var brave_max = parseInt(_2.a2);
						if ($("#head-brave-bar").exists()) {
							$("#head-brave-bar").progressbar('option', 'value', brave).progressbar('option', 'max', brave_max);
							$("#head-brave-bar + .pro-title").prop("title", "Brave: "+brave+"/"+brave_max);
							}
							
						if ($("#head-brave-bar-percent").exists()) {
							$("#head-brave-bar-percent").html(Math.round((brave/brave_max)*100)+"%");
							}
						break;
						
					case "a3":
						if ($("#date-and-time").exists()) {
							if ($("#date-and-time").html()!=_2[_1]) {
								$("#date-and-time").html(_2[_1]);
								}
							}
						break;
						
					case "a4":
						if ($("#head-status").exists()) {
							if ($("#head-status").html()!=_2[_1]) {
								$("#head-status").html(_2[_1]);
								}
							}
						break;
						
					case "a5":
						if ($("#friends-on-count").exists()) {
							if ($("#friends-on-count").html()!=_2[_1]) {
								$("#friends-on-count").html(_2[_1]);
								}
							}
						break;
						
					case "event_last":
						$("#evt-remove-me").remove();
						$("#events-last-ev-counter").html(_2.event_last);
						delete _2.event_last;
						break;
						
					case "ev_obj":
						var cur_obj;
							
						if ($("#events-after-me").exists()) {
							if (_2.ev_obj) {
								if (_2.ev_obj.evt_last) {
									$("#evt-remove-me").remove();
									}
								}
							
							$(".swap-me").remove();
							for(ea in _2.ev_obj) {
								cur_obj = _2.ev_obj[ea];
								var links = cur_obj.links;
								if (!links) {
									links = "";
									} else {
									links = " "+links;
									}
								
								$("#events-after-me").after("<tr id='rem-ev-id"+ea+"' class='event-hover event'><td style='text-align: left; padding-left: 16px; padding-top: 4px;' valign='bottom'><label><input type='checkbox' name='check-to-delete' value='"+ea+"' onclick='setTimeout(show_delete_checked, 100);'>&nbsp;"+cur_obj.time+"</label></td><td style='text-align: left; padding-left: 16px;' valign='bottom'>"+cur_obj.event+"</td><td style='text-align: left; padding-left: 16px;' valign='bottom'>"+links+" [<a href='delete-event.php?id="+ea+"' class='color-2'>Remove</a>]</td></tr>");
								
								if ($("#events-loaded-display").exists())
									$("#events-loaded-display").stop().fadeIn(1500).fadeOut(3000);
								}
								
							parse_alerts();
							}
						break;
						
					case "a6":
						obj = "#comment-last-holder-int";
						if ($(obj).html()!=_2[_1]) {
							$(obj).html(_2[_1]);
							if (_2['a7']) {
								for(ea in _2['a7']) {
									var jsn = _2.a7[ea];
									/*<input type='checkbox' name='comment-delete-check' value='"+ea+"'>*/
									$("#comments-after-me").after("<tr"+((_2.a7[ea].a=="1")?" class='event-hover comment' class='small color-1'>Remove</a>]":"")+"><td><div style='margin-bottom: 2px;'><a href='profile.php?x-id="+jsn.user+"'>"+jsn.nickname+"</a> ["+jsn.user+"]</div><div class='smaller'>"+jsn.time+"</div><div>"+((jsn.a=="1")?"[<a href='remove-comment.php?id="+jsn.id+"' class='small color-1'>Remove</a>]":"")+"</div></td><td colspan='2' style='text-align: left;'>"+jsn.body+"</td></tr><tr><td colspan='3' style='height: 2px; padding: 0px !important;'></td></tr>");
									
									if ($("#events-loaded-display").exists())
										$("#events-loaded-display").stop().fadeIn(1500).fadeOut(3000);
									}
								}
								
							parse_alerts();
							}
						break;
						
					case "mail_last":
						var d = _2; var reply;
						if ($("#mail_last").html()!=d[_1]) {
							if (d.mails) {
								var fromto;
								
								for(ea in d.mails) {
									var oo = d.mails[ea];
									
									if (!isset(oo.other))
										fromto = "<div><strong>From</strong>: <a class='color-3' href='profile.php?x-id="+oo.user+"'>"+oo.nickname+"</a> ["+oo.user+"] ("+oo.time+")</div>";
									else
										fromto = "<div><strong>To</strong>: <a class='color-4' href='profile.php?x-id="+oo.other.user+"'>"+oo.other.nickname+"</a> ["+oo.user+"] ("+oo.time+")</div>";
									
									reply = "[<a href='mail-reply.php?id="+oo.from+"'>Reply</a>]";
									if (oo.other) if (oo.other.user!=me()) {
										reply = "[<a href='mail-reply.php?id="+oo.to+"'>Reply</a>]";
										}
									
									if ($("#hide-reply-button-mail").exists()) { reply = ""; }
									
									$("#add-mails-after-me").after("<tr class='event-hover'><td>"+((oo.title!="")?"<div style='margin: -8px; margin-bottom: 4px; margin-left: -6px; margin-right: 6px;' class='border ui-widget-header'>"+oo.title+"</div>":"")+fromto+"<div><strong>Message</strong>: "+oo.content+"</div><div style='text-align: right; padding-right: 8px;'>"+reply+""+((oo.rem=="1" && oo.canrem=="1")?" [<a href='mail-remove.php?id="+ea+"'>Remove</a>]":"")+"</div></td></tr>");
									}
									
								$("#mail-loaded").stop().fadeIn(1500).fadeOut(3000);
								}
							
							$("#mail_last").html(d[_1]);
							parse_alerts();
							}
						break;
						
					case "ulist_json":
						json = _2[_1];
						var json2, nvmd;
						var current = $.parseJSON($("[data-ajax=ulist_json]").html());
						for(ea in json) {
							delete current[ea]
							current[ea] = json[ea];
							
							json2 = _2['ulist_json2'];
							
							switch((current[ea]).toLowerCase()) {
								case "on":
								$("#ul_user-"+ea).each(function() {
									this.className = "online";
									$(this).html("Online");
									});
									break;
									
								case "aw":
								$("#ul_user-"+ea).each(function() {
									this.className = "away";
									$(this).html("Away");
									});
									break;
									
								case "of":
								$("#ul_user-"+ea).each(function() {
									this.className = "offline";
									$(this).html("Offline");
									});
									break;
									
								default:
									nvmd = true;
									break;
								}
								
							if (json2[ea]) if (!nvmd)
								$("#ul_user-"+ea).parent().find("td").first().next().html($("#ul_user-"+ea).parent().find("td").first().next().html()+" - "+json2[ea]);
								
							if (nvmd) delete nvmd;
							}
							
						$("[data-ajax=ulist_json]").html(JSON.stringify(current));
						break;
						
					//iq
					case "x1":
						if ($("#home-iq").exists()) {
							if (_2[_1]!="") if ($("#home-iq").html()!=_2[_1]) {
								$("#home-iq").html(_2[_1]);
								}
							}
						break;
						
					//in jail
					case "x2":
						if (_2[_1]=="1") {
							$("#ui-jail").addClass('color-1');
							if (!$("#ui-jail + span.escape").exists())
								$("#ui-jail").after("<span class='escape'> [<a href='jail.php?a=bust&id=self' class='color-2'>Escape</a>]</span>");
							} else {
							$("#ui-hospital").removeClass('color-1');
							if ($("#ui-jail + span.escape").exists())
								$("#ui-jail + span.escape").remove();
							}
						if (_2[_1]=="1")
							$("#ui-jail").addClass('color-1');
							else
							$("#ui-jail").removeClass('color-1');
						break;
						
					//in hospital
					case "x3":
						if (_2[_1]=="1") {
							$("#ui-hospital").addClass('color-1');
							if (!$("#ui-hospital + span.heal").exists())
								$("#ui-hospital").after("<span class='heal'> [<a href='hospital.php?a=heal&id=self' class='color-2'>Heal</a>]</span>");
							} else {
							$("#ui-hospital").removeClass('color-1');
							if ($("#ui-hospital + span.heal").exists())
								$("#ui-hospital + span.heal").remove();
							}
						break;
						
					case "x4":
						if (_2[_1]=="out") {
							$("#ui-hospital").removeClass('color-1');
							$("#ui-hospital").prop("title", "You are not in the hospital");
							} else {
							$("#ui-hospital").addClass('color-1');
							$("#ui-hospital").prop("title", "You are in the hospital for "+hms(_2[_1])+"<br>Reason: "+_2.x6);
							if ($("#ui-hospital + span.heal").exists())
								$("#ui-hospital + span.heal").prop("title", $("#ui-hospital").prop("title"));
							$(document).tooltip();
							}
						break;
						
					case "x5":
						if (_2[_1]=="out") {
							$("#ui-jail").removeClass('color-1');
							$("#ui-jail").prop("title", "");
							} else {
							$("#ui-jail").addClass('color-1');
							$("#ui-jail").prop("title", "You are in jail for "+hms(_2[_1])+"<br>Reason: "+_2.x7);
							if ($("#ui-jail + span.escape").exists())
								$("#ui-jail + span.escape").prop("title", $("#ui-jail").prop("title"));
							$(document).tooltip();
							}
						break;
						
					case "x8":
						if (_2[_1]=="out") {
							$("#profile-hospital-visible").hide();
							$("#profile-hospital").removeClass('color-1');
							$("#profile-hospital").prop("title", "You are not in the hospital");
							} else {
							$("#profile-hospital-visible").show();
							$("#profile-hospital").addClass('color-1');
							if (!$("#profile-hospital + span.heal").exists())
								$("#profile-hospital").after("<span class='heal'> [<a href='hospital.php?a=heal&id="+$("[data-ajax=user]").html()+"' class='color-2'>Heal</a>]</span>");
							$("#profile-hospital").prop("title", "This user is in the hospital for "+hms(_2[_1])+"<br>Reason: "+_2.y1);
							if ($("#profile-hospital + span.heal").exists())
								$("#profile-hospital + span.heal").prop("title", $("#profile-hospital").prop("title"));
							$(document).tooltip();
							}
						break;
						
					case "x9":
						if (_2[_1]=="out") {
							$("#profile-jail-visible").hide();
							$("#profile-jail").removeClass('color-1');
							$("#profile-jail").prop("title", "You are not in jail");
							} else {
							$("#profile-jail-visible").show();
							$("#profile-jail").addClass('color-1');
							if (!$("#profile-jail + span.escape").exists())
								$("#profile-jail").after("<span class='escape'> [<a href='jail.php?a=bust&id="+$("[data-ajax=user]").html()+"' class='color-2'>Bust</a>]</span>");
							$("#profile-jail").prop("title", "This user is in jail for "+hms(_2[_1])+"<br>Reason: "+_2.y2);
							if ($("#profile-jail + span.escape").exists())
								$("#profile-jail + span.escape").prop("title", $("#profile-jail").prop("title"));
							$(document).tooltip();
							}
						break;
						
					case "jail_users":
						var o = _2[_1];
						var uu;
						var updated = {};
						
						//$(".refresh-user").remove();
						
						for(id in o) {
							uu = "#user-"+id;
							if ($(uu).exists()) {
								//name, reason, time, links
								$(uu).find("td").first().html("<a href='profile.php?x-id="+id+"'>"+o[id].n+"</a> ["+id+"]").next().html(o[id].r).next().html(hms(o[id].t));
								updated[id] = true;
								} else {
								$("#jail-table-insert-here").before("<tr class='refresh-user' id='user-"+id+"'><td><a href='profile.php?x-id="+id+"'>"+o[id].n+"</a> ["+id+"]</td><td>"+o[id].r+"</td><td>"+hms(o[id].t)+"</td><td><a href='jail.php?a=bust&id="+id+"'>Bust</a></td></tr>");
								updated[id] = true;
								}
							}
							
						window.__updated = updated;
						$(".refresh-user").each(function() {
							var id = $(this).prop("id");
							id = id.replace("user-", "");
							if (!window.__updated[id]) {
								$(this).remove();
								}
							});
						break;
						
					case "hospital_users":
						var o = _2[_1];
						var uu;
						var updated = {};
						
						//$(".refresh-user").remove();
						
						for(id in o) {
							uu = "#user-"+id;
							if ($(uu).exists()) {
								//name, reason, time, links
								$(uu).find("td").first().html("<a href='profile.php?x-id="+id+"'>"+o[id].n+"</a> ["+id+"]").next().html(o[id].r).next().html(hms(o[id].t));
								updated[id] = true;
								} else {
								$("#hospital-table-insert-here").before("<tr class='refresh-user' id='user-"+id+"'><td><a href='profile.php?x-id="+id+"'>"+o[id].n+"</a> ["+id+"]</td><td>"+o[id].r+"</td><td>"+hms(o[id].t)+"</td><td><a href='hospital.php?a=heal&id="+id+"'>Heal</a></td></tr>");
								updated[id] = true;
								}
							}
							
						window.__updated = updated;
						$(".refresh-user").each(function() {
							var id = $(this).prop("id");
							id = id.replace("user-", "");
							if (!window.__updated[id]) {
								$(this).remove();
								}
							});
						break;
						
					case "c1":
						var v;
						var o = _2[_1];
						for(ea in o) {
							v = o[ea];
							if ($(".forum[data-id="+ea+"]").exists()) {
								$(".forum[data-id="+ea+"]").data("update", v.update).find("td").first().next().html(v.threads).next().html(v.posts).next().html(v.last_thread);
								} else {
								v.title = "<div>"+v.title+"</div>";
								if (v.subtitle) {
									v.title += "<div style='font-size: .6em;'>"+v.subtitle+"</div>";
									}
									
								$("#use-me-to-add-after").after("<tr onclick='window.location=\"forums.php?mode=threads&parent="+ea+"\";' class='forum-forum forum border' data-update='"+v.update+"' data-id='"+ea+"' style='border-top: 0;'><td>"+v.title+"</td><td>"+v.threads+"</td><td>"+v.posts+"</td><td>"+v.last_thread+"</td></tr>");
								}
							}
						break;
						
					case "c2":
						var v;
						var o = _2[_1];
						for(ea in o) {
							v = o[ea];
							if ($(".thread[data-id="+ea+"]").exists()) {
								$(".thread[data-id="+ea+"]").data("update", v.update).find("td").first().next().html(v.posts).next().html(v.last_post);
								var clone = $(".thread[data-id="+ea+"]").clone(true, true);
								$("#user-me-to-add-after").insertAfter(clone);
								$(".thread[data-id="+ea+"]:last").remove();
								} else {
								v.title = "<div>"+v.title+"</div>";
								if (v.subtitle) {
									v.title += "<div style='font-size: .6em;'>"+v.subtitle+"</div>";
									}
								
								$("#use-me-to-add-after").after("<tr onclick='window.location=\"forums.php?mode=posts&parent="+ea+"\";' class='thread-thread thread border' data-update='"+v.update+"' data-id='"+ea+"' data-parent='"+v['parent']+"' style='border-top: 0;'><td>"+v.title+"</td><td>"+v.posts+"</td><td>"+v.last_post+"</td><td>"+v.created+"</td></tr>");
								}
							}
						break;
						
					case "c3":
						var v;
						var o = _2[_1];
						
						var can_go_to;
						
						for(ea in o) {
							v = o[ea]; can_go_to = true;
							
							$("#use-me-to-insert-before").before('<tr><th class="forum-post-title" style="border-right: 0; width: 110px;">Poster</th><th class="forum-post-title" style="text-align: left; padding-left: 32px; border-left: 0;">Content&nbsp;-&nbsp;From:&nbsp;<a href="profile.php?x-id='+v.creator+'">'+v.nickname+'</a>&nbsp;['+v.creator+']</th></tr>');
							
							$("#use-me-to-insert-before").before('<tr class="post-post post ui-widget-content" data-parent="'+ea+'" data-update="'+v.update+'" data-id="'+ea+'"><td class="border" style="padding-bottom: 4px; border-top: 0; border-right: 0;"><div><a href="profile.php?x-id='+v.creator+'"><img src="'+v.avatar+'" style="margin-top: 8px; margin-bottom: 4px; width: 100px; height: 100px;" title="Level: '+v.level+'<br>Forum&nbsp;Topics:&nbsp;'+v.topics+'<br>Forum Posts: '+v.posts+'"></a></div><div style="font-size: .6em; padding: 8px;">Posted:&nbsp;'+v.time+'</div></td><td class="border" style="text-align: left; padding-top: 12px; padding-left: 4px; border-top: 0; border-left: 0;" valign="top" onclick="show_reply(); window.location=\'#to-top\';" title="Click to post a reply to this thread"><div class="bbc-me">'+v.content+'</div></td></tr><tr><td colspan="2" style="height: 4px;"></td></tr>');
							
							if (v.signature) {
								$("#use-me-to-insert-before").before('<tr><td colspan="2" style="height: 8px;"></td></tr><tr><th colspan="2" class="ui-widget-header2">Signature</th></tr><tr><td colspan="2" valign="top" class="border" style="text-align: left; padding-top: 12px; padding-left: 4px; border-top: 0; text-align: left;"><div class="bbc-me" style="max-height: 128px; padding-top: 8px; padding-bottom: 8px; overflow: auto; width: 100%; max-width: 100%; position: relative;">'+v.signature+'</div></td></tr><tr><td colspan="2" style="height: 8px;"></td></tr>');
								}
							}
							
						parse_page_bbc();
						$(document).tooltip();
						parse_alerts();
						break;
						
					case "c4":
						if ($("#profile-kills").exists()) {
							if ($("#profile-kills").html()!=_2[_1]) {
								$("#profile-kills").html(_2[_1]);
								}
							}
						break;
						
					case "d1":
						//shout-highlight
						if ($("#shout-highlight").exists()) {
							if (!$("#shout-highlight").hasClass("color-1"))
								$("#shout-highlight").addClass("color-1");
							}
						break;
						
					case "j1":
						if ($("#global-on-count").html()!=_2[_1])
							$("#global-on-count").html(_2[_1]);
						break;
					}
				}
				
			if (!_2.d1) {
				if ($("#shout-highlight").exists()) {
					if ($("#shout-highlight").hasClass("color-1"))
						$("#shout-highlight").removeClass("color-1");
					}
				}
				
			for(ea in window.PROTOSTACKS) {
				if ($.isFunction(window.PROTOSTACKS[ea])) {
					window.PROTOSTACKS[ea](_2);
					}
				}
				
				if ((window.stop_ajax||0)!=2) {
					setTimeout(global_ajax, 1000);
					}
			}
		});
	}
	
function uID() {
	var s; var t = "";
	s = Math.random()*9; s = Math.floor(s); t += s+'';
	s = Math.random()*9; s = Math.floor(s); t += s+'';
	s = Math.random()*9; s = Math.floor(s); t += s+'';
	s = Math.random()*9; s = Math.floor(s); t += s+'';
	s = Math.random()*9; s = Math.floor(s); t += s+'';
	s = Math.random()*9; s = Math.floor(s); t += s+'';
	s = Math.random()*9; s = Math.floor(s); t += s+'';
	return t;
	}
	
function parse_search(query, ind, val) {
	if (!query) return "";
	query = query+'';
	
	query = query.replace(/\#i/gim, (ind||""));
	query = query.replace(/\#v/gim, (val||""));
	
	return query;
	}
	
window.onload = function() {
	window_resize();
	setTimeout(window_resize, 100);
	
	$(document).tooltip({
		"hide":{
			effect:(window.adminPANEL+""!="1")?"fade":"clip",
			duration: (window.adminPANEL+""!="1")?250:750
			}
		});
	
	$("#change-status-link").on("click", change_status_dialog);
	
	$(".banner").textSelect('off');
	
	$(".ui-button, input[type=button], input[type=submit], button").not(".skip").button().addClass("skip");
	
	$("textarea:not(.skip):not(.ui-widget-content), input[type=text]:not(.skip):not(.ui-widget-content)").addClass("ui-widget-content");
		
	window.alert = function(m, t) {
		m = m||"No Message (ERRxA)";
		t = t||"<?=ui()->title?> Says:";
		
		var ii = "#win-gen-"+uID();
		while($(ii).exists()) {
			ii = "#win-gen-"+uID()
			}
		
		$("<div id='"+ii.replace("#", "")+"' class='alert' title='"+t+"'>"+m+"</div>").dialog({
			resizable:false,
			modal:true,
			draggable:true,
			close:function() {
				$(this).dialog('destroy').remove();
				},
			"buttons":{
				"Okay":function() {
					$(this).dialog("close").remove();
					}
				}
			});
			
		var z = $(ii);
		return z;
		};
		
	if ($("#find-users").exists()) {
		$("#find-users").on("blur, focusout", function() {
			setTimeout('$("#find-results").css("display", "none");', 200);
			}).on("focus, focusin, click", function() {
			setTimeout('$("#find-users").trigger("keyup", {which:13});', 200);
			}).on("keyup", function() {
			if (!window.__FindUsersKeyUp) {
				window.__FindUsersKeyUp = true;
				setTimeout(function() {
					if (($("#find-users").val()+'').length>0) {
						var exclude = $("#find-users").data("exclude");
						var term = $("#find-users").val();
						if (!term) term = "";
						if (!exclude) exclude = "0";
						$.ajax({
							"url":"get-by-name.djson?exclude="+exclude+"&term="+term,
							"success":function(d) {
								d = d||{};
								$("#find-results").html("");
								var url = $("#find-users").data("url-exp");
								
								for(ea in d) {
									if ((ea+'').toLowerCase()==($("#find-users").val()+'').toLowerCase()) {
										$("#find-results").prepend("<div class='ui-menu-item' style='width: 100%; margin: -1px;'><span onclick=\"window.location=$(this).data('url'); return false;\" class=\"color-3\" style=\"cursor: pointer;\" data-url='"+parse_search(url, ea, d[ea])+"'>"+d[ea]+" ["+ea+"]</span></div>").css("display", "block");
										} else if ((d[ea]+'').toLowerCase()==($("#find-users").val()+'').toLowerCase()) {
										$("#find-results").prepend("<div class='ui-menu-item' style='width: 100%; margin: -1px;'><span onclick=\"window.location=$(this).data('url'); return false;\" class=\"color-3\" style=\"cursor: pointer;\" data-url='"+parse_search(url, ea, d[ea])+"'>"+d[ea]+" ["+ea+"]</span></div>").css("display", "block");
										} else {
										$("#find-results").prepend("<div class='ui-menu-item' style='width: 100%; margin: -1px;'><span onclick=\"window.location=$(this).data('url'); return false;\" class=\"color-4\" style=\"cursor: pointer;\" data-url='"+parse_search(url, ea, d[ea])+"'>"+d[ea]+" ["+ea+"]</span></div>").css("display", "block");
										}
									}
								}
							});
						} else {
						$("#find-results").html("Please enter a search term");
						}
						
					delete window.__FindUsersKeyUp;
					}, 250);
					
				return false;
				}
			});
		}
	
	parse_alerts();
	global_ajax();
	
	for(ea in window.__loadScripts) {
		window.__loadScripts[ea]();
		}
		
	window.ScriptsAlreadyLoAdEd = 1;
	};
	
function confirm_logout() {
	$(alert("Are you sure you want to sign out?", "Confirmation")).dialog('option', 'buttons', {
		'Yes':function() {
			window.ajaxErrorShowing = true;
			window.location = "logout.php";
			},
		'No':function() {
			$(this).dialog('close');
			}
		});
	}
	
function hms($time) {
	if ($time<0) {
		$time = "...";
		}
		
	var _return = '';
	var nd = Math.floor($time / 86400);
	var nh = Math.floor(($time % 86400) / 3600);
	var nm = Math.floor((($time % 86400) % 3600) / 60);
	var ns = (($time % 86400) % 3600) % 60;

	if (nd>0) { _return += nd+"d:"; }
	if (nh>0) {
		if (nd>0) {
			if (nh>9) {
				_return += nh+"h:";
				} else {
				_return += "0"+nh+"h:";	
				}
			} else {
			_return += (nh)+"h:";	
			}
		}
	if ((nm>0)||(nh>0)||(nd>0)) {
		if (nm>9) {
			_return += nm+"m:";
			} else {
			_return += "0"+nm+"m:";	
			}
		} else {
		if (nm>9) {
			nm = nm;
			}
		}
	_return += lZero(ns)+"s";

	return _return;
	}
	
function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
		} else if (oElm.currentStyle) {
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
			return p1.toUpperCase();
			});
			
		strValue = oElm.currentStyle[strCssRule];
		}
		
	return strValue;
	}
	
function $$(ind, val, def) {
	var $$$ = $.jStorage;
	ind = (ind||"")+'';
	
	switch(ind.toLowerCase()) {
		case "get":
			if (val)
				return $$$.get(ind, val);
				else {
				return $$$.get(ind);
				}
			
		case "set":
			if (val)
				return $$$.set(ind, val);
		}
		
	alert("No valid key/pair was defined for $$GETSET");
	return false;
	}
	
window._mouse_x = 0;
window._mouse_y = 0;
	
function mouse() {
	return {"left":window._mouse_x, "top":window._mouse_y};
	}

addWindowLoad(function() {
	$(window).on("mousemove", function(e) {
		window._mouse_x = e.pageX; 
		window._mouse_y = e.pageY;
		});
	});
	
jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<div>").append(this.eq(0).clone()).html();
	};
	
function fixHelper(e, ui) {
	ui.children().each(function() {
		$(this).width($(this).width());
		});
		
	return ui;
	};
	
/*
$("::selection").sortable({
	helper: fixHelper
}).disableSelection();
*/

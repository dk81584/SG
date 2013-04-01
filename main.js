/*Created by: doc.will@live.com - William N. Dowell*/

function call(resource, p1, p2, p3, p4, p5) {
  var _, undefined, re = {};
		
	if ($.isArray(resource)||$.isPlainObject(resource)) {
		for(ea in resource) {
			if ($.isFunction(resource[ea])) {
				_ = call(resource[ea], p1, p2, p3, p4, p5);
				if (_===false) return false; re[ea] = _;
				}
			}
			
		return re;
		} else if ($.isFunction(resource)) {
		return resource(p1, p2, p3, p4, p5);
		} else if ((typeof resource).toLowerCase() == 'string') {
		_ = eval(resource); return _;
		}
	}

function on_load(major) {
	this.tick = this.tick||0;
	if (major) {
		this.trigger_array = this.trigger_array||{};
		this.trigger_array[this.tick] = major;
		this.tick++;
		}
		
	return this.trigger_array||{};
	}
	
function on_resize(major) {
	this.tick2 = this.tick2||0;
	
	if (major) {
		this.trigger2_array = this.trigger2_array||{};
		this.trigger2_array[this.tick2] = major;
		this.tick2++;
		}
		
	return this.trigger2_array||{};
	}
	
function preload_images(get_list) {
	if (!this.images) {
		this.images = [
			host()+"/sheets/default/bar-back.png",
			host()+"/sheets/default/bar-front.png",
			host()+"/sheets/default/checked.png",
			host()+"/sheets/default/close.png",
			host()+"/sheets/default/close-hover.png",
			host()+"/sheets/default/close-hover-hover.png",
			host()+"/sheets/default/enemy.png",
			host()+"/sheets/default/enemy-hover.png",
			host()+"/sheets/default/footer.jpg",
			host()+"/sheets/default/friend.png",
			host()+"/sheets/default/friend-hover.png",
			host()+"/sheets/default/header.jpg",
			host()+"/sheets/default/log-out.png",
			host()+"/sheets/default/log-out-hover.png",
			host()+"/sheets/default/mail.png",
			host()+"/sheets/default/mail-content.jpg",
			host()+"/sheets/default/mail-hover.png",
			host()+"/sheets/default/notice-error.jpg",
			host()+"/sheets/default/notice-notice.jpg",
			host()+"/sheets/default/notice-warning.jpg",
			host()+"/sheets/default/options.png",
			host()+"/sheets/default/options-hover.png",
			host()+"/sheets/default/unchecked.png",
			
			host()+"/sheets/login/button.jpg",
			host()+"/sheets/login/button-active.jpg",
			host()+"/sheets/login/button-disabled.jpg",
			host()+"/sheets/login/button-hover.jpg",
			];
		}
		
	if (get_list===true)
		return this.images;
		
	if (!($("#preload-images").length||0>0))
		return false;
	
	if (!this.already_loaded) {
		for(ea in this.images)
			(new Image(1,1)).src = this.images[ea];
			
		this.already_loaded = true;
		return true;
		}
		
	return this.images;
	}

function $browser(shorthand) {
	if (!shorthand) shorthand = true;
	
	if (navigator.userAgent.match(/chrome/i))
		return 'chrome';
	else if (navigator.userAgent.match(/firefox/i))
		return (shorthand===true)?'fox':'firefox';
	else if (navigator.userAgent.match(/opera/i))
		return 'opera';
	else if (navigator.userAgent.match(/android/i))
		return 'android';
	else if (navigator.userAgent.match(/safari/i))
		return 'safari';
		
	//No browsers matched? We can only assume it's evil and Internet Explorer
	return (shorthand===true)?'ie':'internet explorer';
	}
	
function $selectText(e) {
	var text = e;
	if ($browser()=='ie') {
		var range = document.body.createTextRange();
		range.moveToElementText(text);
		range.select();
		} else if ($browser()=='fox'||$browser()=='opera') {
		var selection = window.getSelection();
		var range = document.createRange();
		range.selectNodeContents(text);
		selection.removeAllRanges();
		selection.addRange(range);
		} else if ($browser()=='safari') {
		var selection = window.getSelection();
		selection.setBaseAndExtent(text, 0, text, 1);
		} else if ($browser()=='chrome') {
		var doc = document;
		var text = doc.getElementById(e);
		
		if (doc.body.createTextRange) {
			var range = document.body.createTextRange();
			range.moveToElementText(text);
			range.select();
			} else if (window.getSelection) {
			var selection = window.getSelection();
			var range = document.createRange();
			range.selectNodeContents(text);
			selection.removeAllRanges();
			selection.addRange(range);
			}
		}
	};

function on_focus(major) {
	this.tick = this.tick||0;
	
	if (major) {
		this.trigger_array = this.trigger_array||{};
		this.trigger_array[this.tick] = major;
		this.tick++;
		}
		
	return this.trigger_array||{};
	}
	
function on_blur(major) {
	this.tick = this.tick||0;
	
	if (major) {
		this.trigger_array = this.trigger_array||{};
		this.trigger_array[this.tick] = major;
		this.tick++;
		}
		
	return this.trigger_array||{};
	}
	
function on_move(major) {
	this.tick = this.tick||0;
	
	if (major) {
		this.trigger_array = this.trigger_array||{};
		this.trigger_array[this.tick] = major;
		this.tick++;
		}
		
	return this.trigger_array||{};
	}
	
function window_focused(set) {
	if (set===true) this.window_focus = true;
	if (set===false) this.window_focus = false;
	return this.window_focus;
	}
	
function mouse(set) {
	if (set) this.coordinates = [set[0], set[1]];
	return this.coordinates||[-1,-1];
	}

$(window).on("load", function(e) {
	if (!window.loaded_already) {
		$(window).on('focus', function(e) {
			window_focused(true);
			call(on_focus(), e);
			}).on('blur', function() {
			window_focused(false);
			call(on_blur(), e);
			}).on('mousemove', function(e) {
			if (!window.mousemove_timeout) {
				window.mousemove_timeout =  setTimeout(function() {
					mouse([e.pageX, e.pageY]); call(on_move(), e);
					delete window.mousemove_timeout;
					}, 1000);
				}
			});
			
		window.loaded_already = true;
		}
	
	//Fixes the data issues you will run into when using css and dynamic data
	$.fn.sData = function(data, val) {
		if ((''+typeof val).toLowerCase() == 'undefined')
			return $(this).removeAttr("data-"+data).removeProp("data-"+data).removeData(data);
			else
			return $(this).attr("data-"+data, val).prop("data-"+data, val).data(data, val);
		};
		
	$.fn.rData = function(key) {
		if ($(this).prop("data-"+key))
			return $(this).removeProp("data-"+key);
			
		if ($(this).attr("data-"+key))
			return $(this).removeAttr("data-"+key);
			
		if ($(this).data(key))
			return $(this).removeData(key);
			
		return $(this);
		};
		
	$("[data-notice]").hide().fadeIn('slow');
	
	preload_images();
	
	call(on_load(), e);
	
	if (!window.resize_timeout) {
		window.resize_timeout = setTimeout(function() {
			call(on_resize(), e);
			delete window.resize_timeout;
			}, 100);
		}
	});
	
$(window).on("resize", function(e) {
	if (!window.resize_timeout) {
		window.resize_timeout = setTimeout(function() {
			call(on_resize(), e);
			delete window.resize_timeout;
			}, 100);
		}
	});
	
function error(msg) {
	msg = msg||"NoMSG";
	return '<div data-center data-shadow="dark" data-jump="top" data-outline="a" data-drop data-notice="error"><strong>Error</strong>: '+msg+'</div>';
	}
	
function warning(msg) {
	msg = msg||"NoMSG";
	return '<div data-center data-shadow="dark" data-jump="top" data-outline="a" data-drop data-notice="warning"><strong>Warning</strong>: '+msg+'</div>';
	}
	
function notice(msg) {
	msg = msg||"NoMSG";
	return '<div data-center data-shadow="dark" data-jump="top" data-outline="a" data-drop data-notice="notice"><strong>Notice</strong>: '+msg+'</div>';
	}
	
function host() {
	return "http://"+window.location.hostname;
	}
	
function proto(method, data, onload) {
	$.ajax({
		url:(host()+"/json.php?m="+method),
		success:onload,
		type:"post",
		"data":data||{},
		dataType:"json"
		});
	}
	
function hide_modal(self) {
	if ((''+(self||"")).toLowerCase()==="all")
		$("[data-modal]").remove();
	else
		$(self).remove();
	}
	
function modal_msg(key, msg) {
	msg = msg||"NoMSG";
	var __ = $("[data-modal="+key+"]").length; __ = __||0;
	if (__===0) {
		$(".header").first().before($("<div data-modal='"+key+"' class='modal' onclick='hide_modal(this);' title='Click here to close this dialog'><div data-outline='a' data-align='center'>"+msg+"</div></div>"));
		$("[data-modal="+key+"]").stop().hide().fadeIn('slow');
		return false;
		}
	}

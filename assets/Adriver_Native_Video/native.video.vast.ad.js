/* ADRIVER Native Video Banner by Alexander Nikolaev 2016 */
(function() {
	var _toString = Object.prototype.toString;
	function extend(destination, source) {
		for (var property in source)
			destination[property] = source[property];
		return destination;
	}
	function inspect(object) {
		try {
			if (isUndefined(object)) return 'undefined';
			if (object === null) return 'null';
			return object.inspect ? object.inspect() : String(object);
		} catch (e) {
			if (e instanceof RangeError) return '...';
			throw e;
		}
	}
	function toJSON(object) {
		var type = typeof object;
		switch (type) {
			case 'undefined':
			case 'function':
			case 'unknown': return;
			case 'boolean': return object.toString();
		}
		if (object === null) return 'null';
		if (object.toJSON) return object.toJSON();
		if (isElement(object)) return;
		var results = [];
		for (var property in object) {
			var value = toJSON(object[property]);
			if (!isUndefined(value))
			results.push(property.toJSON() + ': ' + value);
		}
		return '{' + results.join(', ') + '}';
	}
	function toQueryString(object) {
		return $H(object).toQueryString();
	}
	function toHTML(object) {
		return object && object.toHTML ? object.toHTML() : String.interpret(object);
	}
	function keys(object) {
		var results = [];
		for (var property in object)
			results.push(property);
		return results;
	}
	function values(object) {
		var results = [];
		for (var property in object)
			results.push(object[property]);
		return results;
	}
	function clone(object) {
		return extend({ }, object);
	}
	function isElement(object) {
		return !!(object && object.nodeType == 1);
	}
	function isArray(object) {
		return _toString.call(object) == "[object Array]";
	}
	function isHash(object) {
		return object instanceof Hash;
	}
	function isFunction(object) {
		return typeof object === "function";
	}
	function isString(object) {
		return _toString.call(object) == "[object String]";
	}
	function isNumber(object) {
		return _toString.call(object) == "[object Number]";
	}
	function isUndefined(object) {
		return typeof object === "undefined";
	}
	extend(Object, {
		extend:        extend,
		inspect:       inspect,
		toJSON:        toJSON,
		toQueryString: toQueryString,
		toHTML:        toHTML,
		keys:          keys,
		values:        values,
		clone:         clone,
		isElement:     isElement,
		isArray:       isArray,
		isHash:        isHash,
		isFunction:    isFunction,
		isString:      isString,
		isNumber:      isNumber,
		isUndefined:   isUndefined
	});
})();

Object.extend(Function.prototype, (function() {
	var slice = Array.prototype.slice;
	function update(array, args) {
		var arrayLength = array.length, length = args.length;
		while (length--) array[arrayLength + length] = args[length];
		return array;
	}
	function merge(array, args) {
		array = slice.call(array, 0);
		return update(array, args);
	}
	function argumentNames() {
		var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
		.replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
		.replace(/\s+/g, '').split(',');
		return names.length == 1 && !names[0] ? [] : names;
	}
	function bind(context) {
		if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;
		var __method = this, args = slice.call(arguments, 1);
		return function() {
			var a = merge(args, arguments);
			return __method.apply(context, a);
		}
	}
	function bindAsEventListener(context) {
		var __method = this, args = slice.call(arguments, 1);
		return function(event) {
			var a = update([event || window.event], args);
			return __method.apply(context, a);
		}
	}
	function curry() {
		if (!arguments.length) return this;
		var __method = this, args = slice.call(arguments, 0);
		return function() {
			var a = merge(args, arguments);
			return __method.apply(this, a);
		}
	}
	function delay(timeout) {
		var __method = this, args = slice.call(arguments, 1);
		timeout = timeout * 1000
		return window.setTimeout(function() {
		return __method.apply(__method, args);
		}, timeout);
	}
	function defer() {
		var args = update([0.01], arguments);
		return this.delay.apply(this, args);
	}
	function wrap(wrapper) {
		var __method = this;
		return function() {
			var a = update([__method.bind(this)], arguments);
			return wrapper.apply(this, a);
		}
	}
	function methodize() {
		if (this._methodized) return this._methodized;
		var __method = this;
		return this._methodized = function() {
			var a = update([this], arguments);
			return __method.apply(null, a);
		};
	}
	return {
		argumentNames:       argumentNames,
		bind:                bind,
		bindAsEventListener: bindAsEventListener,
		curry:               curry,
		delay:               delay,
		defer:               defer,
		wrap:                wrap,
		methodize:           methodize
	}
})());
/*! Video.js v4.12.15 Copyright 2014 Brightcove, Inc. https://github.com/videojs/video.js/blob/master/LICENSE */
(function() {var b=void 0,f=!0,j=null,l=!1;function m(){return function(){}}function n(a){return function(){return this[a]}}function p(a){return function(){return a}}var s;document.createElement("video");document.createElement("audio");document.createElement("track"); function t(a,c,d){if("string"===typeof a){0===a.indexOf("#")&&(a=a.slice(1));if(t.Ca[a])return c&&t.log.warn('Player "'+a+'" is already initialised. Options will not be applied.'),d&&t.Ca[a].I(d),t.Ca[a];a=t.m(a)}if(!a||!a.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");return a.player||new t.Player(a,c,d)}var videojs=window.videojs=t;t.fc="4.12";t.sd="https:"==document.location.protocol?"https://":"http://";t.VERSION="4.12.15"; t.options={techOrder:["html5","flash"],html5:{},flash:{},width:300,height:150,defaultVolume:0,playbackRates:[],inactivityTimeout:2E3,children:{mediaLoader:{},posterImage:{},loadingSpinner:{},textTrackDisplay:{},bigPlayButton:{},controlBar:{},errorDisplay:{},textTrackSettings:{}},language:document.getElementsByTagName("html")[0].getAttribute("lang")||navigator.languages&&navigator.languages[0]||navigator.Ef||navigator.language||"en",languages:{},notSupportedMessage:"No compatible source was found for this video."}; "GENERATED_CDN_VSN"!==t.fc&&(videojs.options.flash.swf=t.sd+"vjs.zencdn.net/"+t.fc+"/video-js.swf");t.Gd=function(a,c){t.options.languages[a]=t.options.languages[a]!==b?t.Z.Aa(t.options.languages[a],c):c;return t.options.languages};t.Ca={};"function"===typeof define&&define.amd?define("videojs",[],function(){return videojs}):"object"===typeof exports&&"object"===typeof module&&(module.exports=videojs);t.Ga=t.CoreObject=m(); t.Ga.extend=function(a){var c,d;a=a||{};c=a.init||a.l||this.prototype.init||this.prototype.l||m();d=function(){c.apply(this,arguments)};d.prototype=t.i.create(this.prototype);d.prototype.constructor=d;d.extend=t.Ga.extend;d.create=t.Ga.create;for(var e in a)a.hasOwnProperty(e)&&(d.prototype[e]=a[e]);return d};t.Ga.create=function(){var a=t.i.create(this.prototype);this.apply(a,arguments);return a}; t.b=function(a,c,d){if(t.i.isArray(c))return v(t.b,a,c,d);var e=t.getData(a);e.G||(e.G={});e.G[c]||(e.G[c]=[]);d.s||(d.s=t.s++);e.G[c].push(d);e.ba||(e.disabled=l,e.ba=function(c){if(!e.disabled){c=t.Nb(c);var d=e.G[c.type];if(d)for(var d=d.slice(0),k=0,q=d.length;k<q&&!c.Nc();k++)d[k].call(a,c)}});1==e.G[c].length&&(a.addEventListener?a.addEventListener(c,e.ba,l):a.attachEvent&&a.attachEvent("on"+c,e.ba))}; t.n=function(a,c,d){if(t.Ic(a)){var e=t.getData(a);if(e.G){if(t.i.isArray(c))return v(t.n,a,c,d);if(c){var g=e.G[c];if(g){if(d){if(d.s)for(e=0;e<g.length;e++)g[e].s===d.s&&g.splice(e--,1)}else e.G[c]=[];t.xc(a,c)}}else for(g in e.G)c=g,e.G[c]=[],t.xc(a,c)}}};t.xc=function(a,c){var d=t.getData(a);0===d.G[c].length&&(delete d.G[c],a.removeEventListener?a.removeEventListener(c,d.ba,l):a.detachEvent&&a.detachEvent("on"+c,d.ba));t.hb(d.G)&&(delete d.G,delete d.ba,delete d.disabled);t.hb(d)&&t.Zc(a)}; t.Nb=function(a){function c(){return f}function d(){return l}if(!a||!a.Sb){var e=a||window.event;a={};for(var g in e)"layerX"!==g&&("layerY"!==g&&"keyLocation"!==g)&&("returnValue"==g&&e.preventDefault||(a[g]=e[g]));a.target||(a.target=a.srcElement||document);a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;a.preventDefault=function(){e.preventDefault&&e.preventDefault();a.returnValue=l;a.ee=c;a.defaultPrevented=f};a.ee=d;a.defaultPrevented=l;a.stopPropagation=function(){e.stopPropagation&& e.stopPropagation();a.cancelBubble=f;a.Sb=c};a.Sb=d;a.stopImmediatePropagation=function(){e.stopImmediatePropagation&&e.stopImmediatePropagation();a.Nc=c;a.stopPropagation()};a.Nc=d;if(a.clientX!=j){g=document.documentElement;var h=document.body;a.pageX=a.clientX+(g&&g.scrollLeft||h&&h.scrollLeft||0)-(g&&g.clientLeft||h&&h.clientLeft||0);a.pageY=a.clientY+(g&&g.scrollTop||h&&h.scrollTop||0)-(g&&g.clientTop||h&&h.clientTop||0)}a.which=a.charCode||a.keyCode;a.button!=j&&(a.button=a.button&1?0:a.button& 4?1:a.button&2?2:0)}return a};t.o=function(a,c){var d=t.Ic(a)?t.getData(a):{},e=a.parentNode||a.ownerDocument;"string"===typeof c&&(c={type:c,target:a});c=t.Nb(c);d.ba&&d.ba.call(a,c);if(e&&!c.Sb()&&c.bubbles!==l)t.o(e,c);else if(!e&&!c.defaultPrevented&&(d=t.getData(c.target),c.target[c.type])){d.disabled=f;if("function"===typeof c.target[c.type])c.target[c.type]();d.disabled=l}return!c.defaultPrevented}; t.N=function(a,c,d){function e(){t.n(a,c,e);d.apply(this,arguments)}if(t.i.isArray(c))return v(t.N,a,c,d);e.s=d.s=d.s||t.s++;t.b(a,c,e)};function v(a,c,d,e){t.tc.forEach(d,function(d){a(c,d,e)})}var w=Object.prototype.hasOwnProperty;t.e=function(a,c){var d;c=c||{};d=document.createElement(a||"div");t.i.ca(c,function(a,c){-1!==a.indexOf("aria-")||"role"==a?d.setAttribute(a,c):d[a]=c});return d};t.va=function(a){return a.charAt(0).toUpperCase()+a.slice(1)};t.i={}; t.i.create=Object.create||function(a){function c(){}c.prototype=a;return new c};t.i.ca=function(a,c,d){for(var e in a)w.call(a,e)&&c.call(d||this,e,a[e])};t.i.D=function(a,c){if(!c)return a;for(var d in c)w.call(c,d)&&(a[d]=c[d]);return a};t.i.Od=function(a,c){var d,e,g;a=t.i.copy(a);for(d in c)w.call(c,d)&&(e=a[d],g=c[d],a[d]=t.i.ib(e)&&t.i.ib(g)?t.i.Od(e,g):c[d]);return a};t.i.copy=function(a){return t.i.D({},a)}; t.i.ib=function(a){return!!a&&"object"===typeof a&&"[object Object]"===a.toString()&&a.constructor===Object};t.i.isArray=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)};t.ge=function(a){return a!==a};t.bind=function(a,c,d){function e(){return c.apply(a,arguments)}c.s||(c.s=t.s++);e.s=d?d+"_"+c.s:c.s;return e};t.ua={};t.s=1;t.expando="vdata"+(new Date).getTime();t.getData=function(a){var c=a[t.expando];c||(c=a[t.expando]=t.s++);t.ua[c]||(t.ua[c]={});return t.ua[c]}; t.Ic=function(a){a=a[t.expando];return!(!a||t.hb(t.ua[a]))};t.Zc=function(a){var c=a[t.expando];if(c){delete t.ua[c];try{delete a[t.expando]}catch(d){a.removeAttribute?a.removeAttribute(t.expando):a[t.expando]=j}}};t.hb=function(a){for(var c in a)if(a[c]!==j)return l;return f};t.Pa=function(a,c){return-1!==(" "+a.className+" ").indexOf(" "+c+" ")};t.p=function(a,c){t.Pa(a,c)||(a.className=""===a.className?c:a.className+" "+c)}; t.r=function(a,c){var d,e;if(t.Pa(a,c)){d=a.className.split(" ");for(e=d.length-1;0<=e;e--)d[e]===c&&d.splice(e,1);a.className=d.join(" ")}};t.A=t.e("video");var x=document.createElement("track");x.Tb="captions";x.ed="en";x.label="English";t.A.appendChild(x);t.P=navigator.userAgent;t.zd=/iPhone/i.test(t.P);t.yd=/iPad/i.test(t.P);t.Ad=/iPod/i.test(t.P);t.xd=t.zd||t.yd||t.Ad;var aa=t,y;var z=t.P.match(/OS (\d+)_/i);y=z&&z[1]?z[1]:b;aa.ff=y;t.wd=/Android/i.test(t.P);var ba=t,B; var C=t.P.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),D,E;C?(D=C[1]&&parseFloat(C[1]),E=C[2]&&parseFloat(C[2]),B=D&&E?parseFloat(C[1]+"."+C[2]):D?D:j):B=j;ba.ec=B;t.Bd=t.wd&&/webkit/i.test(t.P)&&2.3>t.ec;t.gc=/Firefox/i.test(t.P);t.gf=/Chrome/i.test(t.P);t.pa=/MSIE\s8\.0/.test(t.P);t.Db=!!("ontouchstart"in window||window.ud&&document instanceof window.ud);t.td="backgroundSize"in t.A.style; t.ad=function(a,c){t.i.ca(c,function(c,e){e===j||"undefined"===typeof e||e===l?a.removeAttribute(c):a.setAttribute(c,e===f?"":e)})};t.Oa=function(a){var c,d,e,g;c={};if(a&&a.attributes&&0<a.attributes.length){d=a.attributes;for(var h=d.length-1;0<=h;h--){e=d[h].name;g=d[h].value;if("boolean"===typeof a[e]||-1!==",autoplay,controls,loop,muted,default,".indexOf(","+e+","))g=g!==j?f:l;c[e]=g}}return c}; t.rf=function(a,c){var d="";document.defaultView&&document.defaultView.getComputedStyle?d=document.defaultView.getComputedStyle(a,"").getPropertyValue(c):a.currentStyle&&(d=a["client"+c.substr(0,1).toUpperCase()+c.substr(1)]+"px");return d};t.Rb=function(a,c){c.firstChild?c.insertBefore(a,c.firstChild):c.appendChild(a)};t.bb={};t.m=function(a){0===a.indexOf("#")&&(a=a.slice(1));return document.getElementById(a)}; t.Na=function(a,c){c=c||a;var d=Math.floor(a%60),e=Math.floor(a/60%60),g=Math.floor(a/3600),h=Math.floor(c/60%60),k=Math.floor(c/3600);if(isNaN(a)||Infinity===a)g=e=d="-";g=0<g||0<k?g+":":"";return g+(((g||10<=h)&&10>e?"0"+e:e)+":")+(10>d?"0"+d:d)};t.Id=function(){document.body.focus();document.onselectstart=p(l)};t.Xe=function(){document.onselectstart=p(f)};t.trim=function(a){return(a+"").replace(/^\s+|\s+$/g,"")};t.round=function(a,c){c||(c=0);return Math.round(a*Math.pow(10,c))/Math.pow(10,c)}; t.xa=function(a,c){return a===b&&c===b?{length:0,start:function(){throw Error("This TimeRanges object is empty");},end:function(){throw Error("This TimeRanges object is empty");}}:{length:1,start:function(){return a},end:function(){return c}}};t.Ie=function(a){try{var c=window.localStorage||l;c&&(c.volume=a)}catch(d){22==d.code||1014==d.code?t.log("LocalStorage Full (VideoJS)",d):18==d.code?t.log("LocalStorage not allowed (VideoJS)",d):t.log("LocalStorage Error (VideoJS)",d)}}; t.Xd=function(a){a.match(/^https?:\/\//)||(a=t.e("div",{innerHTML:'<a href="'+a+'">x</a>'}).firstChild.href);return a}; t.Ae=function(a){var c,d,e,g;g="protocol hostname port pathname search hash host".split(" ");d=t.e("a",{href:a});if(e=""===d.host&&"file:"!==d.protocol)c=t.e("div"),c.innerHTML='<a href="'+a+'"></a>',d=c.firstChild,c.setAttribute("style","display:none; position:absolute;"),document.body.appendChild(c);a={};for(var h=0;h<g.length;h++)a[g[h]]=d[g[h]];"http:"===a.protocol&&(a.host=a.host.replace(/:80$/,""));"https:"===a.protocol&&(a.host=a.host.replace(/:443$/,""));e&&document.body.removeChild(c);return a}; function F(a,c){}t.log=function(){F(j,arguments)};t.log.history=[];t.log.error=function(){F("error",arguments)};t.log.warn=function(){F("warn",arguments)}; t.Vd=function(a){var c,d;a.getBoundingClientRect&&a.parentNode&&(c=a.getBoundingClientRect());if(!c)return{left:0,top:0};a=document.documentElement;d=document.body;return{left:t.round(c.left+(window.pageXOffset||d.scrollLeft)-(a.clientLeft||d.clientLeft||0)),top:t.round(c.top+(window.pageYOffset||d.scrollTop)-(a.clientTop||d.clientTop||0))}};t.tc={};t.tc.forEach=function(a,c,d){if(t.i.isArray(a)&&c instanceof Function)for(var e=0,g=a.length;e<g;++e)c.call(d||t,a[e],e,a);return a}; t.bf=function(a,c){var d,e,g,h,k,q,r;"string"===typeof a&&(a={uri:a});videojs.Z.Aa({method:"GET",timeout:45E3},a);c=c||m();q=function(){window.clearTimeout(k);c(j,e,e.response||e.responseText)};r=function(a){window.clearTimeout(k);if(!a||"string"===typeof a)a=Error(a);c(a,e)};d=window.XMLHttpRequest;"undefined"===typeof d&&(d=function(){try{return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(c){}try{return new window.ActiveXObject("Msxml2.XMLHTTP")}catch(d){}throw Error("This browser does not support XMLHttpRequest."); });e=new d;e.uri=a.uri;d=t.Ae(a.uri);g=window.location;d.protocol+d.host!==g.protocol+g.host&&window.XDomainRequest&&!("withCredentials"in e)?(e=new window.XDomainRequest,e.onload=q,e.onerror=r,e.onprogress=m(),e.ontimeout=m()):(h="file:"==d.protocol||"file:"==g.protocol,e.onreadystatechange=function(){if(4===e.readyState){if(e.Ue)return r("timeout");200===e.status||h&&0===e.status?q():r()}},a.timeout&&(k=window.setTimeout(function(){4!==e.readyState&&(e.Ue=f,e.abort())},a.timeout)));try{e.open(a.method|| "GET",a.uri,f)}catch(u){r(u);return}a.withCredentials&&(e.withCredentials=f);a.responseType&&(e.responseType=a.responseType);try{e.send()}catch(A){r(A)}};t.Z={};t.Z.Aa=function(a,c){var d,e,g;a=t.i.copy(a);for(d in c)c.hasOwnProperty(d)&&(e=a[d],g=c[d],a[d]=t.i.ib(e)&&t.i.ib(g)?t.Z.Aa(e,g):c[d]);return a};t.z=m();s=t.z.prototype;s.ab={};s.b=function(a,c){var d=this.addEventListener;this.addEventListener=Function.prototype;t.b(this,a,c);this.addEventListener=d};s.addEventListener=t.z.prototype.b; s.n=function(a,c){t.n(this,a,c)};s.removeEventListener=t.z.prototype.n;s.N=function(a,c){t.N(this,a,c)};s.o=function(a){var c=a.type||a;"string"===typeof a&&(a={type:c});a=t.Nb(a);if(this.ab[c]&&this["on"+c])this["on"+c](a);t.o(this,a)};s.dispatchEvent=t.z.prototype.o; t.a=t.Ga.extend({l:function(a,c,d){this.d=a;this.q=t.i.copy(this.q);c=this.options(c);this.Qa=c.id||c.el&&c.el.id;this.Qa||(this.Qa=(a.id&&a.id()||"no_player")+"_component_"+t.s++);this.pe=c.name||j;this.c=c.el||this.e();this.R=[];this.cb={};this.eb={};this.Kc();this.I(d);if(c.$c!==l){var e,g;this.k().reportUserActivity&&(e=t.bind(this.k(),this.k().reportUserActivity),this.b("touchstart",function(){e();this.clearInterval(g);g=this.setInterval(e,250)}),a=function(){e();this.clearInterval(g)},this.b("touchmove", e),this.b("touchend",a),this.b("touchcancel",a))}}});s=t.a.prototype;s.dispose=function(){this.o({type:"dispose",bubbles:l});if(this.R)for(var a=this.R.length-1;0<=a;a--)this.R[a].dispose&&this.R[a].dispose();this.eb=this.cb=this.R=j;this.n();this.c.parentNode&&this.c.parentNode.removeChild(this.c);t.Zc(this.c);this.c=j};s.d=f;s.k=n("d");s.options=function(a){return a===b?this.q:this.q=t.Z.Aa(this.q,a)};s.e=function(a,c){return t.e(a,c)}; s.v=function(a){var c=this.d.language(),d=this.d.languages();return d&&d[c]&&d[c][a]?d[c][a]:a};s.m=n("c");s.wa=function(){return this.B||this.c};s.id=n("Qa");s.name=n("pe");s.children=n("R");s.Yd=function(a){return this.cb[a]};s.da=function(a){return this.eb[a]}; s.aa=function(a,c){var d,e;"string"===typeof a?(e=a,c=c||{},d=c.componentClass||t.va(e),c.name=e,d=new window.videojs[d](this.d||this,c)):d=a;this.R.push(d);"function"===typeof d.id&&(this.cb[d.id()]=d);(e=e||d.name&&d.name())&&(this.eb[e]=d);"function"===typeof d.el&&d.el()&&this.wa().appendChild(d.el());return d}; s.removeChild=function(a){"string"===typeof a&&(a=this.da(a));if(a&&this.R){for(var c=l,d=this.R.length-1;0<=d;d--)if(this.R[d]===a){c=f;this.R.splice(d,1);break}c&&(this.cb[a.id()]=j,this.eb[a.name()]=j,(c=a.m())&&c.parentNode===this.wa()&&this.wa().removeChild(a.m()))}}; s.Kc=function(){var a,c,d,e,g,h;a=this;c=a.options();if(d=c.children)if(h=function(d,e){c[d]!==b&&(e=c[d]);e!==l&&(a[d]=a.aa(d,e))},t.i.isArray(d))for(var k=0;k<d.length;k++)e=d[k],"string"==typeof e?(g=e,e={}):g=e.name,h(g,e);else t.i.ca(d,h)};s.T=p(""); s.b=function(a,c,d){var e,g,h;"string"===typeof a||t.i.isArray(a)?t.b(this.c,a,t.bind(this,c)):(e=t.bind(this,d),h=this,g=function(){h.n(a,c,e)},g.s=e.s,this.b("dispose",g),d=function(){h.n("dispose",g)},d.s=e.s,a.nodeName?(t.b(a,c,e),t.b(a,"dispose",d)):"function"===typeof a.b&&(a.b(c,e),a.b("dispose",d)));return this}; s.n=function(a,c,d){!a||"string"===typeof a||t.i.isArray(a)?t.n(this.c,a,c):(d=t.bind(this,d),this.n("dispose",d),a.nodeName?(t.n(a,c,d),t.n(a,"dispose",d)):(a.n(c,d),a.n("dispose",d)));return this};s.N=function(a,c,d){var e,g,h;"string"===typeof a||t.i.isArray(a)?t.N(this.c,a,t.bind(this,c)):(e=t.bind(this,d),g=this,h=function(){g.n(a,c,h);e.apply(this,arguments)},h.s=e.s,this.b(a,c,h));return this};s.o=function(a){t.o(this.c,a);return this}; s.I=function(a){a&&(this.ya?a.call(this):(this.mb===b&&(this.mb=[]),this.mb.push(a)));return this};s.Va=function(){this.ya=f;var a=this.mb;this.mb=[];if(a&&0<a.length){for(var c=0,d=a.length;c<d;c++)a[c].call(this);this.o("ready")}};s.Pa=function(a){return t.Pa(this.c,a)};s.p=function(a){t.p(this.c,a);return this};s.r=function(a){t.r(this.c,a);return this};s.show=function(){this.r("vjs-hidden");return this};s.W=function(){this.p("vjs-hidden");return this};function G(a){a.r("vjs-lock-showing")} s.width=function(a,c){return ca(this,"width",a,c)};s.height=function(a,c){return ca(this,"height",a,c)};s.Qd=function(a,c){return this.width(a,f).height(c)};function ca(a,c,d,e){if(d!==b){if(d===j||t.ge(d))d=0;a.c.style[c]=-1!==(""+d).indexOf("%")||-1!==(""+d).indexOf("px")?d:"auto"===d?"":d+"px";e||a.o("resize");return a}if(!a.c)return 0;d=a.c.style[c];e=d.indexOf("px");return-1!==e?parseInt(d.slice(0,e),10):parseInt(a.c["offset"+t.va(c)],10)} function da(a){var c,d,e,g,h,k,q,r;c=0;d=j;a.b("touchstart",function(a){1===a.touches.length&&(d=t.i.copy(a.touches[0]),c=(new Date).getTime(),g=f)});a.b("touchmove",function(a){1<a.touches.length?g=l:d&&(k=a.touches[0].pageX-d.pageX,q=a.touches[0].pageY-d.pageY,r=Math.sqrt(k*k+q*q),10<r&&(g=l))});h=function(){g=l};a.b("touchleave",h);a.b("touchcancel",h);a.b("touchend",function(a){d=j;g===f&&(e=(new Date).getTime()-c,200>e&&(a.preventDefault(),this.o("tap")))})} s.setTimeout=function(a,c){function d(){this.clearTimeout(e)}a=t.bind(this,a);var e=setTimeout(a,c);d.s="vjs-timeout-"+e;this.b("dispose",d);return e};s.clearTimeout=function(a){function c(){}clearTimeout(a);c.s="vjs-timeout-"+a;this.n("dispose",c);return a};s.setInterval=function(a,c){function d(){this.clearInterval(e)}a=t.bind(this,a);var e=setInterval(a,c);d.s="vjs-interval-"+e;this.b("dispose",d);return e}; s.clearInterval=function(a){function c(){}clearInterval(a);c.s="vjs-interval-"+a;this.n("dispose",c);return a};t.w=t.a.extend({l:function(a,c){t.a.call(this,a,c);da(this);this.b("tap",this.u);this.b("click",this.u);this.b("focus",this.kb);this.b("blur",this.jb)}});s=t.w.prototype; s.e=function(a,c){var d;c=t.i.D({className:this.T(),role:"button","aria-live":"polite",tabIndex:0},c);d=t.a.prototype.e.call(this,a,c);c.innerHTML||(this.B=t.e("div",{className:"vjs-control-content"}),this.Ib=t.e("span",{className:"vjs-control-text",innerHTML:this.v(this.ta)||"Need Text"}),this.B.appendChild(this.Ib),d.appendChild(this.B));return d};s.T=function(){return"vjs-control "+t.a.prototype.T.call(this)};s.u=m();s.kb=function(){t.b(document,"keydown",t.bind(this,this.ka))}; s.ka=function(a){if(32==a.which||13==a.which)a.preventDefault(),this.u()};s.jb=function(){t.n(document,"keydown",t.bind(this,this.ka))};t.S=t.a.extend({l:function(a,c){t.a.call(this,a,c);this.Hd=this.da(this.q.barName);this.handle=this.da(this.q.handleName);this.b("mousedown",this.lb);this.b("touchstart",this.lb);this.b("focus",this.kb);this.b("blur",this.jb);this.b("click",this.u);this.b(a,"controlsvisible",this.update);this.b(a,this.Uc,this.update)}});s=t.S.prototype; s.e=function(a,c){c=c||{};c.className+=" vjs-slider";c=t.i.D({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},c);return t.a.prototype.e.call(this,a,c)};s.lb=function(a){a.preventDefault();t.Id();this.p("vjs-sliding");this.b(document,"mousemove",this.la);this.b(document,"mouseup",this.Ba);this.b(document,"touchmove",this.la);this.b(document,"touchend",this.Ba);this.la(a)};s.la=m(); s.Ba=function(){t.Xe();this.r("vjs-sliding");this.n(document,"mousemove",this.la);this.n(document,"mouseup",this.Ba);this.n(document,"touchmove",this.la);this.n(document,"touchend",this.Ba);this.update()};s.update=function(){if(this.c){var a,c=this.Qb(),d=this.handle,e=this.Hd;if("number"!==typeof c||c!==c||0>c||Infinity===c)c=0;a=c;if(d){a=this.c.offsetWidth;var g=d.m().offsetWidth;a=g?g/a:0;c*=1-a;a=c+a/2;d.m().style.left=t.round(100*c,2)+"%"}e&&(e.m().style.width=t.round(100*a,2)+"%")}}; function ea(a,c){var d,e,g,h;d=a.c;e=t.Vd(d);h=g=d.offsetWidth;d=a.handle;if(a.options().vertical)return h=e.top,e=c.changedTouches?c.changedTouches[0].pageY:c.pageY,d&&(d=d.m().offsetHeight,h+=d/2,g-=d),Math.max(0,Math.min(1,(h-e+g)/g));g=e.left;e=c.changedTouches?c.changedTouches[0].pageX:c.pageX;d&&(d=d.m().offsetWidth,g+=d/2,h-=d);return Math.max(0,Math.min(1,(e-g)/h))}s.kb=function(){this.b(document,"keydown",this.ka)}; s.ka=function(a){if(37==a.which||40==a.which)a.preventDefault(),this.fd();else if(38==a.which||39==a.which)a.preventDefault(),this.gd()};s.jb=function(){this.n(document,"keydown",this.ka)};s.u=function(a){a.stopImmediatePropagation();a.preventDefault()};t.ga=t.a.extend();t.ga.prototype.defaultValue=0;t.ga.prototype.e=function(a,c){c=c||{};c.className+=" vjs-slider-handle";c=t.i.D({innerHTML:'<span class="vjs-control-text">'+this.defaultValue+"</span>"},c);return t.a.prototype.e.call(this,"div",c)}; t.qa=t.a.extend();function fa(a,c){a.aa(c);c.b("click",t.bind(a,function(){G(this)}))}t.qa.prototype.e=function(){var a=this.options().zc||"ul";this.B=t.e(a,{className:"vjs-menu-content"});a=t.a.prototype.e.call(this,"div",{append:this.B,className:"vjs-menu"});a.appendChild(this.B);t.b(a,"click",function(a){a.preventDefault();a.stopImmediatePropagation()});return a};t.M=t.w.extend({l:function(a,c){t.w.call(this,a,c);this.selected(c.selected)}}); t.M.prototype.e=function(a,c){return t.w.prototype.e.call(this,"li",t.i.D({className:"vjs-menu-item",innerHTML:this.v(this.q.label)},c))};t.M.prototype.u=function(){this.selected(f)};t.M.prototype.selected=function(a){a?(this.p("vjs-selected"),this.c.setAttribute("aria-selected",f)):(this.r("vjs-selected"),this.c.setAttribute("aria-selected",l))}; t.O=t.w.extend({l:function(a,c){t.w.call(this,a,c);this.update();this.b("keydown",this.ka);this.c.setAttribute("aria-haspopup",f);this.c.setAttribute("role","button")}});s=t.O.prototype;s.update=function(){var a=this.La();this.za&&this.removeChild(this.za);this.za=a;this.aa(a);this.H&&0===this.H.length?this.W():this.H&&1<this.H.length&&this.show()};s.Ja=l; s.La=function(){var a=new t.qa(this.d);this.options().title&&a.wa().appendChild(t.e("li",{className:"vjs-menu-title",innerHTML:t.va(this.options().title),Se:-1}));if(this.H=this.createItems())for(var c=0;c<this.H.length;c++)fa(a,this.H[c]);return a};s.Ka=m();s.T=function(){return this.className+" vjs-menu-button "+t.w.prototype.T.call(this)};s.kb=m();s.jb=m();s.u=function(){this.N("mouseout",t.bind(this,function(){G(this.za);this.c.blur()}));this.Ja?H(this):ga(this)}; s.ka=function(a){32==a.which||13==a.which?(this.Ja?H(this):ga(this),a.preventDefault()):27==a.which&&(this.Ja&&H(this),a.preventDefault())};function ga(a){a.Ja=f;a.za.p("vjs-lock-showing");a.c.setAttribute("aria-pressed",f);a.H&&0<a.H.length&&a.H[0].m().focus()}function H(a){a.Ja=l;G(a.za);a.c.setAttribute("aria-pressed",l)}t.J=function(a){"number"===typeof a?this.code=a:"string"===typeof a?this.message=a:"object"===typeof a&&t.i.D(this,a);this.message||(this.message=t.J.Pd[this.code]||"")}; t.J.prototype.code=0;t.J.prototype.message="";t.J.prototype.status=j;t.J.gb="MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" "); t.J.Pd={1:"",2:"",3:"",4:"",5:""};for(var I=0;I<t.J.gb.length;I++)t.J[t.J.gb[I]]=I,t.J.prototype[t.J.gb[I]]=I;var J,ha,K,L;J=["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "),"webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "),"webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "),"mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "),"msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")]; ha=J[0];for(L=0;L<J.length;L++)if(J[L][1]in document){K=J[L];break}if(K){t.bb.Pb={};for(L=0;L<K.length;L++)t.bb.Pb[ha[L]]=K[L]} t.Player=t.a.extend({l:function(a,c,d){this.L=a;a.id=a.id||"vjs_video_"+t.s++;this.Te=a&&t.Oa(a);c=t.i.D(ia(a),c);this.Pc=c.language||t.options.language;this.je=c.languages||t.options.languages;this.K={};this.Vc=c.poster||"";this.Jb=!!c.controls;a.controls=l;c.$c=l;ja(this,"audio"===this.L.nodeName.toLowerCase());t.a.call(this,this,c,d);this.controls()?this.p("vjs-controls-enabled"):this.p("vjs-controls-disabled");ja(this)&&this.p("vjs-audio");t.Ca[this.Qa]=this;c.plugins&&t.i.ca(c.plugins,function(a, c){this[a](c)},this);var e,g,h,k,q;e=t.bind(this,this.reportUserActivity);this.b("mousedown",function(){e();this.clearInterval(g);g=this.setInterval(e,250)});this.b("mousemove",function(a){if(a.screenX!=k||a.screenY!=q)k=a.screenX,q=a.screenY,e()});this.b("mouseup",function(){e();this.clearInterval(g)});this.b("keydown",e);this.b("keyup",e);this.setInterval(function(){if(this.Fa){this.Fa=l;this.userActive(f);this.clearTimeout(h);var a=this.options().inactivityTimeout;0<a&&(h=this.setTimeout(function(){this.Fa|| this.userActive(l)},a))}},250)}});s=t.Player.prototype;s.language=function(a){if(a===b)return this.Pc;this.Pc=a;return this};s.languages=n("je");s.q=t.options;s.dispose=function(){this.o("dispose");this.n("dispose");t.Ca[this.Qa]=j;this.L&&this.L.player&&(this.L.player=j);this.c&&this.c.player&&(this.c.player=j);this.h&&this.h.dispose();t.a.prototype.dispose.call(this)}; function ia(a){var c,d,e={sources:[],tracks:[]};c=t.Oa(a);d=c["data-setup"];d!==j&&t.i.D(c,t.JSON.parse(d||"{}"));t.i.D(e,c);if(a.hasChildNodes()){var g,h;a=a.childNodes;g=0;for(h=a.length;g<h;g++)c=a[g],d=c.nodeName.toLowerCase(),"source"===d?e.sources.push(t.Oa(c)):"track"===d&&e.tracks.push(t.Oa(c))}return e} s.e=function(){var a=this.c=t.a.prototype.e.call(this,"div"),c=this.L,d;c.removeAttribute("width");c.removeAttribute("height");d=t.Oa(c);t.i.ca(d,function(c){"class"==c?a.className=d[c]:a.setAttribute(c,d[c])});c.id+="_html5_api";c.className="vjs-tech";c.player=a.player=this;this.p("vjs-paused");this.width(this.q.width,f);this.height(this.q.height,f);c.ce=c.networkState;c.parentNode&&c.parentNode.insertBefore(a,c);t.Rb(c,a);this.c=a;this.b("loadstart",this.te);this.b("waiting",this.ze);this.b(["canplay", "canplaythrough","playing","ended"],this.ye);this.b("seeking",this.we);this.b("seeked",this.ve);this.b("ended",this.qe);this.b("play",this.Xb);this.b("firstplay",this.re);this.b("pause",this.Wb);this.b("progress",this.ue);this.b("durationchange",this.Sc);this.b("fullscreenchange",this.se);return a}; function ka(a,c,d){a.h&&(a.ya=l,a.h.dispose(),a.h=l);"Html5"!==c&&a.L&&(t.f.Kb(a.L),a.L=j);a.Ta=c;a.ya=l;var e=t.i.D({source:d,parentEl:a.c},a.q[c.toLowerCase()]);d&&(a.Cc=d.type,d.src==a.K.src&&0<a.K.currentTime&&(e.startTime=a.K.currentTime),a.K.src=d.src);a.h=new window.videojs[c](a,e);a.h.I(function(){this.d.Va()})}s.te=function(){this.r("vjs-ended");this.error(j);this.paused()?la(this,l):this.o("firstplay")};s.Jc=l; function la(a,c){c!==b&&a.Jc!==c&&((a.Jc=c)?(a.p("vjs-has-started"),a.o("firstplay")):a.r("vjs-has-started"))}s.Xb=function(){this.r("vjs-ended");this.r("vjs-paused");this.p("vjs-playing");la(this,f)};s.ze=function(){this.p("vjs-waiting")};s.ye=function(){this.r("vjs-waiting")};s.we=function(){this.p("vjs-seeking")};s.ve=function(){this.r("vjs-seeking")};s.re=function(){this.q.starttime&&this.currentTime(this.q.starttime);this.p("vjs-has-started")};s.Wb=function(){this.r("vjs-playing");this.p("vjs-paused")}; s.ue=function(){1==this.bufferedPercent()&&this.o("loadedalldata")};s.qe=function(){this.p("vjs-ended");this.q.loop?(this.currentTime(0),this.play()):this.paused()||this.pause()};s.Sc=function(){var a=M(this,"duration");a&&(0>a&&(a=Infinity),this.duration(a),Infinity===a?this.p("vjs-live"):this.r("vjs-live"))};s.se=function(){this.isFullscreen()?this.p("vjs-fullscreen"):this.r("vjs-fullscreen")}; function N(a,c,d){if(a.h&&!a.h.ya)a.h.I(function(){this[c](d)});else try{a.h[c](d)}catch(e){throw t.log(e),e;}}function M(a,c){if(a.h&&a.h.ya)try{return a.h[c]()}catch(d){throw a.h[c]===b?t.log("Video.js: "+c+" method not defined for "+a.Ta+" playback technology.",d):"TypeError"==d.name?(t.log("Video.js: "+c+" unavailable on "+a.Ta+" playback technology element.",d),a.h.ya=l):t.log(d),d;}}s.play=function(){N(this,"play");return this};s.pause=function(){N(this,"pause");return this}; s.paused=function(){return M(this,"paused")===l?l:f};s.currentTime=function(a){return a!==b?(N(this,"setCurrentTime",a),this):this.K.currentTime=M(this,"currentTime")||0};s.duration=function(a){if(a!==b)return this.K.duration=parseFloat(a),this;this.K.duration===b&&this.Sc();return this.K.duration||0};s.remainingTime=function(){return this.duration()-this.currentTime()};s.buffered=function(){var a=M(this,"buffered");if(!a||!a.length)a=t.xa(0,0);return a}; s.bufferedPercent=function(){var a=this.duration(),c=this.buffered(),d=0,e,g;if(!a)return 0;for(var h=0;h<c.length;h++)e=c.start(h),g=c.end(h),g>a&&(g=a),d+=g-e;return d/a};s.volume=function(a){if(a!==b)return a=Math.max(0,Math.min(1,parseFloat(a))),this.K.volume=a,N(this,"setVolume",a),t.Ie(a),this;a=parseFloat(M(this,"volume"));return isNaN(a)?1:a};s.muted=function(a){return a!==b?(N(this,"setMuted",a),this):M(this,"muted")||l};s.Sa=function(){return M(this,"supportsFullScreen")||l};s.Mc=l; s.isFullscreen=function(a){return a!==b?(this.Mc=!!a,this):this.Mc};s.isFullScreen=function(a){t.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")');return this.isFullscreen(a)}; s.requestFullscreen=function(){var a=t.bb.Pb;this.isFullscreen(f);a?(t.b(document,a.fullscreenchange,t.bind(this,function(c){this.isFullscreen(document[a.fullscreenElement]);this.isFullscreen()===l&&t.n(document,a.fullscreenchange,arguments.callee);this.o("fullscreenchange")})),this.c[a.requestFullscreen]()):this.h.Sa()?N(this,"enterFullScreen"):(this.Fc(),this.o("fullscreenchange"));return this}; s.requestFullScreen=function(){t.log.warn('player.requestFullScreen() has been deprecated, use player.requestFullscreen() with a lowercase "s")');return this.requestFullscreen()};s.exitFullscreen=function(){var a=t.bb.Pb;this.isFullscreen(l);if(a)document[a.exitFullscreen]();else this.h.Sa()?N(this,"exitFullScreen"):(this.Lb(),this.o("fullscreenchange"));return this};s.cancelFullScreen=function(){t.log.warn("player.cancelFullScreen() has been deprecated, use player.exitFullscreen()");return this.exitFullscreen()}; s.Fc=function(){this.fe=f;this.Rd=document.documentElement.style.overflow;t.b(document,"keydown",t.bind(this,this.Gc));document.documentElement.style.overflow="hidden";t.p(document.body,"vjs-full-window");this.o("enterFullWindow")};s.Gc=function(a){27===a.keyCode&&(this.isFullscreen()===f?this.exitFullscreen():this.Lb())};s.Lb=function(){this.fe=l;t.n(document,"keydown",this.Gc);document.documentElement.style.overflow=this.Rd;t.r(document.body,"vjs-full-window");this.o("exitFullWindow")}; s.selectSource=function(a){for(var c=0,d=this.q.techOrder;c<d.length;c++){var e=t.va(d[c]),g=window.videojs[e];if(g){if(g.isSupported())for(var h=0,k=a;h<k.length;h++){var q=k[h];if(g.canPlaySource(q))return{source:q,h:e}}}else t.log.error('The "'+e+'" tech is undefined. Skipped browser support check for that tech.')}return l}; s.src=function(a){if(a===b)return M(this,"src");t.i.isArray(a)?ma(this,a):"string"===typeof a?this.src({src:a}):a instanceof Object&&(a.type&&!window.videojs[this.Ta].canPlaySource(a)?ma(this,[a]):(this.K.src=a.src,this.Cc=a.type||"",this.I(function(){window.videojs[this.Ta].prototype.hasOwnProperty("setSource")?N(this,"setSource",a):N(this,"src",a.src);"auto"==this.q.preload&&this.load();this.q.autoplay&&this.play()})));return this}; function ma(a,c){var d=a.selectSource(c);d?d.h===a.Ta?a.src(d.source):ka(a,d.h,d.source):(a.setTimeout(function(){this.error({code:4,message:this.v(this.options().notSupportedMessage)})},0),a.Va())}s.load=function(){N(this,"load");return this};s.currentSrc=function(){return M(this,"currentSrc")||this.K.src||""};s.Nd=function(){return this.Cc||""};s.Ra=function(a){return a!==b?(N(this,"setPreload",a),this.q.preload=a,this):M(this,"preload")}; s.autoplay=function(a){return a!==b?(N(this,"setAutoplay",a),this.q.autoplay=a,this):M(this,"autoplay")};s.loop=function(a){return a!==b?(N(this,"setLoop",a),this.q.loop=a,this):M(this,"loop")};s.poster=function(a){if(a===b)return this.Vc;a||(a="");this.Vc=a;N(this,"setPoster",a);this.o("posterchange");return this}; s.controls=function(a){return a!==b?(a=!!a,this.Jb!==a&&((this.Jb=a)?(this.r("vjs-controls-disabled"),this.p("vjs-controls-enabled"),this.o("controlsenabled")):(this.r("vjs-controls-enabled"),this.p("vjs-controls-disabled"),this.o("controlsdisabled"))),this):this.Jb};t.Player.prototype.bc;s=t.Player.prototype; s.usingNativeControls=function(a){return a!==b?(a=!!a,this.bc!==a&&((this.bc=a)?(this.p("vjs-using-native-controls"),this.o("usingnativecontrols")):(this.r("vjs-using-native-controls"),this.o("usingcustomcontrols"))),this):this.bc};s.ja=j;s.error=function(a){if(a===b)return this.ja;if(a===j)return this.ja=a,this.r("vjs-error"),this;this.ja=a instanceof t.J?a:new t.J(a);this.o("error");this.p("vjs-error");t.log.error("(CODE:"+this.ja.code+" "+t.J.gb[this.ja.code]+")",this.ja.message,this.ja);return this}; s.ended=function(){return M(this,"ended")};s.seeking=function(){return M(this,"seeking")};s.seekable=function(){return M(this,"seekable")};s.Fa=f;s.reportUserActivity=function(){this.Fa=f};s.ac=f; s.userActive=function(a){return a!==b?(a=!!a,a!==this.ac&&((this.ac=a)?(this.Fa=f,this.r("vjs-user-inactive"),this.p("vjs-user-active"),this.o("useractive")):(this.Fa=l,this.h&&this.h.N("mousemove",function(a){a.stopPropagation();a.preventDefault()}),this.r("vjs-user-active"),this.p("vjs-user-inactive"),this.o("userinactive"))),this):this.ac};s.playbackRate=function(a){return a!==b?(N(this,"setPlaybackRate",a),this):this.h&&this.h.featuresPlaybackRate?M(this,"playbackRate"):1};s.Lc=l; function ja(a,c){return c!==b?(a.Lc=!!c,a):a.Lc}s.networkState=function(){return M(this,"networkState")};s.readyState=function(){return M(this,"readyState")};s.textTracks=function(){return this.h&&this.h.textTracks()};s.X=function(){return this.h&&this.h.remoteTextTracks()};s.addTextTrack=function(a,c,d){return this.h&&this.h.addTextTrack(a,c,d)};s.ha=function(a){return this.h&&this.h.addRemoteTextTrack(a)};s.Da=function(a){this.h&&this.h.removeRemoteTextTrack(a)};t.tb=t.a.extend(); t.tb.prototype.q={sf:"play",children:{playToggle:{},currentTimeDisplay:{},timeDivider:{},durationDisplay:{},remainingTimeDisplay:{},liveDisplay:{},progressControl:{},fullscreenToggle:{},volumeControl:{},muteToggle:{},playbackRateMenuButton:{},subtitlesButton:{},captionsButton:{},chaptersButton:{}}};t.tb.prototype.e=function(){return t.e("div",{className:"vjs-control-bar"})};t.hc=t.a.extend({l:function(a,c){t.a.call(this,a,c)}}); t.hc.prototype.e=function(){var a=t.a.prototype.e.call(this,"div",{className:"vjs-live-controls vjs-control"});this.B=t.e("div",{className:"vjs-live-display",innerHTML:'<span class="vjs-control-text">'+this.v("Stream Type")+"</span>"+this.v("LIVE"),"aria-live":"off"});a.appendChild(this.B);return a};t.kc=t.w.extend({l:function(a,c){t.w.call(this,a,c);this.b(a,"play",this.Xb);this.b(a,"pause",this.Wb)}});s=t.kc.prototype;s.ta="Play";s.T=function(){return"vjs-play-control "+t.w.prototype.T.call(this)}; s.u=function(){this.d.paused()?this.d.play():this.d.pause()};s.Xb=function(){this.r("vjs-paused");this.p("vjs-playing");this.c.children[0].children[0].innerHTML=this.v("Pause")};s.Wb=function(){this.r("vjs-playing");this.p("vjs-paused");this.c.children[0].children[0].innerHTML=this.v("Play")};t.ub=t.a.extend({l:function(a,c){t.a.call(this,a,c);this.b(a,"timeupdate",this.fa)}}); t.ub.prototype.e=function(){var a=t.a.prototype.e.call(this,"div",{className:"vjs-current-time vjs-time-controls vjs-control"});this.B=t.e("div",{className:"vjs-current-time-display",innerHTML:'<span class="vjs-control-text">Current Time </span>0:00',"aria-live":"off"});a.appendChild(this.B);return a};t.ub.prototype.fa=function(){var a=this.d.nb?this.d.K.currentTime:this.d.currentTime();this.B.innerHTML='<span class="vjs-control-text">'+this.v("Current Time")+"</span> "+t.Na(a,this.d.duration())}; t.vb=t.a.extend({l:function(a,c){t.a.call(this,a,c);this.b(a,"timeupdate",this.fa);this.b(a,"loadedmetadata",this.fa)}});t.vb.prototype.e=function(){var a=t.a.prototype.e.call(this,"div",{className:"vjs-duration vjs-time-controls vjs-control"});this.B=t.e("div",{className:"vjs-duration-display",innerHTML:'<span class="vjs-control-text">'+this.v("Duration Time")+"</span> 0:00","aria-live":"off"});a.appendChild(this.B);return a}; t.vb.prototype.fa=function(){var a=this.d.duration();a&&(this.B.innerHTML='<span class="vjs-control-text">'+this.v("Duration Time")+"</span> "+t.Na(a))};t.qc=t.a.extend({l:function(a,c){t.a.call(this,a,c)}});t.qc.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-time-divider",innerHTML:"<div><span>/</span></div>"})};t.Cb=t.a.extend({l:function(a,c){t.a.call(this,a,c);this.b(a,"timeupdate",this.fa)}}); t.Cb.prototype.e=function(){var a=t.a.prototype.e.call(this,"div",{className:"vjs-remaining-time vjs-time-controls vjs-control"});this.B=t.e("div",{className:"vjs-remaining-time-display",innerHTML:'<span class="vjs-control-text">'+this.v("Remaining Time")+"</span> -0:00","aria-live":"off"});a.appendChild(this.B);return a};t.Cb.prototype.fa=function(){this.d.duration()&&(this.B.innerHTML='<span class="vjs-control-text">'+this.v("Remaining Time")+"</span> -"+t.Na(this.d.remainingTime()))}; t.Ya=t.w.extend({l:function(a,c){t.w.call(this,a,c)}});t.Ya.prototype.ta="Fullscreen";t.Ya.prototype.T=function(){return"vjs-fullscreen-control "+t.w.prototype.T.call(this)};t.Ya.prototype.u=function(){this.d.isFullscreen()?(this.d.exitFullscreen(),this.Ib.innerHTML=this.v("Fullscreen")):(this.d.requestFullscreen(),this.Ib.innerHTML=this.v("Non-Fullscreen"))};t.Bb=t.a.extend({l:function(a,c){t.a.call(this,a,c)}});t.Bb.prototype.q={children:{seekBar:{}}}; t.Bb.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-progress-control vjs-control"})};t.nc=t.S.extend({l:function(a,c){t.S.call(this,a,c);this.b(a,"timeupdate",this.Ea);a.I(t.bind(this,this.Ea))}});s=t.nc.prototype;s.q={children:{loadProgressBar:{},playProgressBar:{},seekHandle:{}},barName:"playProgressBar",handleName:"seekHandle"};s.Uc="timeupdate";s.e=function(){return t.S.prototype.e.call(this,"div",{className:"vjs-progress-holder","aria-label":"video progress bar"})}; s.Ea=function(){var a=this.d.nb?this.d.K.currentTime:this.d.currentTime();this.c.setAttribute("aria-valuenow",t.round(100*this.Qb(),2));this.c.setAttribute("aria-valuetext",t.Na(a,this.d.duration()))};s.Qb=function(){return this.d.currentTime()/this.d.duration()};s.lb=function(a){t.S.prototype.lb.call(this,a);this.d.nb=f;this.d.p("vjs-scrubbing");this.$e=!this.d.paused();this.d.pause()};s.la=function(a){a=ea(this,a)*this.d.duration();a==this.d.duration()&&(a-=0.1);this.d.currentTime(a)}; s.Ba=function(a){t.S.prototype.Ba.call(this,a);this.d.nb=l;this.d.r("vjs-scrubbing");this.$e&&this.d.play()};s.gd=function(){this.d.currentTime(this.d.currentTime()+5)};s.fd=function(){this.d.currentTime(this.d.currentTime()-5)};t.yb=t.a.extend({l:function(a,c){t.a.call(this,a,c);this.b(a,"progress",this.update)}});t.yb.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.v("Loaded")+"</span>: 0%</span>"})}; t.yb.prototype.update=function(){var a,c,d,e,g=this.d.buffered();a=this.d.duration();var h,k=this.d;h=k.buffered();k=k.duration();h=h.end(h.length-1);h>k&&(h=k);k=this.c.children;this.c.style.width=100*(h/a||0)+"%";for(a=0;a<g.length;a++)c=g.start(a),d=g.end(a),(e=k[a])||(e=this.c.appendChild(t.e())),e.style.left=100*(c/h||0)+"%",e.style.width=100*((d-c)/h||0)+"%";for(a=k.length;a>g.length;a--)this.c.removeChild(k[a-1])};t.jc=t.a.extend({l:function(a,c){t.a.call(this,a,c)}}); t.jc.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-play-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.v("Progress")+"</span>: 0%</span>"})};t.Za=t.ga.extend({l:function(a,c){t.ga.call(this,a,c);this.b(a,"timeupdate",this.fa)}});t.Za.prototype.defaultValue="00:00";t.Za.prototype.e=function(){return t.ga.prototype.e.call(this,"div",{className:"vjs-seek-handle","aria-live":"off"})}; t.Za.prototype.fa=function(){var a=this.d.nb?this.d.K.currentTime:this.d.currentTime();this.c.innerHTML='<span class="vjs-control-text">'+t.Na(a,this.d.duration())+"</span>"};t.Fb=t.a.extend({l:function(a,c){t.a.call(this,a,c);a.h&&a.h.featuresVolumeControl===l&&this.p("vjs-hidden");this.b(a,"loadstart",function(){a.h.featuresVolumeControl===l?this.p("vjs-hidden"):this.r("vjs-hidden")})}});t.Fb.prototype.q={children:{volumeBar:{}}}; t.Fb.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-volume-control vjs-control"})};t.Eb=t.S.extend({l:function(a,c){t.S.call(this,a,c);this.b(a,"volumechange",this.Ea);a.I(t.bind(this,this.Ea))}});s=t.Eb.prototype;s.Ea=function(){this.c.setAttribute("aria-valuenow",t.round(100*this.d.volume(),2));this.c.setAttribute("aria-valuetext",t.round(100*this.d.volume(),2)+"%")};s.q={children:{volumeLevel:{},volumeHandle:{}},barName:"volumeLevel",handleName:"volumeHandle"}; s.Uc="volumechange";s.e=function(){return t.S.prototype.e.call(this,"div",{className:"vjs-volume-bar","aria-label":"volume level"})};s.la=function(a){this.d.muted()&&this.d.muted(l);this.d.volume(ea(this,a))};s.Qb=function(){return this.d.muted()?0:this.d.volume()};s.gd=function(){this.d.volume(this.d.volume()+0.1)};s.fd=function(){this.d.volume(this.d.volume()-0.1)};t.rc=t.a.extend({l:function(a,c){t.a.call(this,a,c)}}); t.rc.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})};t.Gb=t.ga.extend();t.Gb.prototype.defaultValue="00:00";t.Gb.prototype.e=function(){return t.ga.prototype.e.call(this,"div",{className:"vjs-volume-handle"})}; t.ra=t.w.extend({l:function(a,c){t.w.call(this,a,c);this.b(a,"volumechange",this.update);a.h&&a.h.featuresVolumeControl===l&&this.p("vjs-hidden");this.b(a,"loadstart",function(){a.h.featuresVolumeControl===l?this.p("vjs-hidden"):this.r("vjs-hidden")})}});t.ra.prototype.e=function(){return t.w.prototype.e.call(this,"div",{className:"vjs-mute-control vjs-control",innerHTML:'<div><span class="vjs-control-text">'+this.v("Mute")+"</span></div>"})}; t.ra.prototype.u=function(){this.d.muted(this.d.muted()?l:f)};t.ra.prototype.update=function(){var a=this.d.volume(),c=3;0===a||this.d.muted()?c=0:0.33>a?c=1:0.67>a&&(c=2);this.d.muted()?this.c.children[0].children[0].innerHTML!=this.v("Unmute")&&(this.c.children[0].children[0].innerHTML=this.v("Unmute")):this.c.children[0].children[0].innerHTML!=this.v("Mute")&&(this.c.children[0].children[0].innerHTML=this.v("Mute"));for(a=0;4>a;a++)t.r(this.c,"vjs-vol-"+a);t.p(this.c,"vjs-vol-"+c)}; t.Ha=t.O.extend({l:function(a,c){t.O.call(this,a,c);this.b(a,"volumechange",this.af);a.h&&a.h.featuresVolumeControl===l&&this.p("vjs-hidden");this.b(a,"loadstart",function(){a.h.featuresVolumeControl===l?this.p("vjs-hidden"):this.r("vjs-hidden")});this.p("vjs-menu-button")}});t.Ha.prototype.La=function(){var a=new t.qa(this.d,{zc:"div"}),c=new t.Eb(this.d,this.q.volumeBar);c.b("focus",function(){a.p("vjs-lock-showing")});c.b("blur",function(){G(a)});a.aa(c);return a}; t.Ha.prototype.u=function(){t.ra.prototype.u.call(this);t.O.prototype.u.call(this)};t.Ha.prototype.e=function(){return t.w.prototype.e.call(this,"div",{className:"vjs-volume-menu-button vjs-menu-button vjs-control",innerHTML:'<div><span class="vjs-control-text">'+this.v("Mute")+"</span></div>"})};t.Ha.prototype.af=t.ra.prototype.update;t.lc=t.O.extend({l:function(a,c){t.O.call(this,a,c);this.pd();this.od();this.b(a,"loadstart",this.pd);this.b(a,"ratechange",this.od)}});s=t.lc.prototype;s.ta="Playback Rate"; s.className="vjs-playback-rate";s.e=function(){var a=t.O.prototype.e.call(this);this.Oc=t.e("div",{className:"vjs-playback-rate-value",innerHTML:1});a.appendChild(this.Oc);return a};s.La=function(){var a=new t.qa(this.k()),c=this.k().options().playbackRates;if(c)for(var d=c.length-1;0<=d;d--)a.aa(new t.Ab(this.k(),{rate:c[d]+"x"}));return a};s.Ea=function(){this.m().setAttribute("aria-valuenow",this.k().playbackRate())}; s.u=function(){for(var a=this.k().playbackRate(),c=this.k().options().playbackRates,d=c[0],e=0;e<c.length;e++)if(c[e]>a){d=c[e];break}this.k().playbackRate(d)};function na(a){return a.k().h&&a.k().h.featuresPlaybackRate&&a.k().options().playbackRates&&0<a.k().options().playbackRates.length}s.pd=function(){na(this)?this.r("vjs-hidden"):this.p("vjs-hidden")};s.od=function(){na(this)&&(this.Oc.innerHTML=this.k().playbackRate()+"x")}; t.Ab=t.M.extend({zc:"button",l:function(a,c){var d=this.label=c.rate,e=this.Wc=parseFloat(d,10);c.label=d;c.selected=1===e;t.M.call(this,a,c);this.b(a,"ratechange",this.update)}});t.Ab.prototype.u=function(){t.M.prototype.u.call(this);this.k().playbackRate(this.Wc)};t.Ab.prototype.update=function(){this.selected(this.k().playbackRate()==this.Wc)};t.mc=t.w.extend({l:function(a,c){t.w.call(this,a,c);this.update();a.b("posterchange",t.bind(this,this.update))}});s=t.mc.prototype; s.dispose=function(){this.k().n("posterchange",this.update);t.w.prototype.dispose.call(this)};s.e=function(){var a=t.e("div",{className:"vjs-poster",tabIndex:-1});t.td||(this.Mb=t.e("img"),a.appendChild(this.Mb));return a};s.update=function(){var a=this.k().poster();this.na(a);a?this.show():this.W()};s.na=function(a){var c;this.Mb?this.Mb.src=a:(c="",a&&(c='url("'+a+'")'),this.c.style.backgroundImage=c)};s.u=function(){this.d.play()};t.ic=t.a.extend({l:function(a,c){t.a.call(this,a,c)}}); t.ic.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-loading-spinner"})};t.rb=t.w.extend();t.rb.prototype.e=function(){return t.w.prototype.e.call(this,"div",{className:"vjs-big-play-button",innerHTML:'<span aria-hidden="true"></span>',"aria-label":"play video"})};t.rb.prototype.u=function(){this.d.play()};t.wb=t.a.extend({l:function(a,c){t.a.call(this,a,c);this.update();this.b(a,"error",this.update)}}); t.wb.prototype.e=function(){var a=t.a.prototype.e.call(this,"div",{className:"vjs-error-display"});this.B=t.e("div");a.appendChild(this.B);return a};t.wb.prototype.update=function(){this.k().error()&&(this.B.innerHTML=this.v(this.k().error().message))};var O;t.j=t.a.extend({l:function(a,c,d){c=c||{};c.$c=l;t.a.call(this,a,c,d);this.featuresProgressEvents||this.ne();this.featuresTimeupdateEvents||this.oe();this.be();this.featuresNativeTextTracks||this.Sd();this.de()}});s=t.j.prototype; s.be=function(){var a,c;a=this.k();c=function(){a.controls()&&!a.usingNativeControls()&&this.Fd()};this.I(c);this.b(a,"controlsenabled",c);this.b(a,"controlsdisabled",this.De);this.I(function(){this.networkState&&0<this.networkState()&&this.k().o("loadstart")})}; s.Fd=function(){var a;this.b("mousedown",this.u);this.b("touchstart",function(){a=this.d.userActive()});this.b("touchmove",function(){a&&this.k().reportUserActivity()});this.b("touchend",function(a){a.preventDefault()});da(this);this.b("tap",this.xe)};s.De=function(){this.n("tap");this.n("touchstart");this.n("touchmove");this.n("touchleave");this.n("touchcancel");this.n("touchend");this.n("click");this.n("mousedown")}; s.u=function(a){0===a.button&&this.k().controls()&&(this.k().paused()?this.k().play():this.k().pause())};s.xe=function(){this.k().userActive(!this.k().userActive())};s.ne=function(){this.Qc=f;this.We()};s.me=function(){this.Qc=l;this.hd()};s.We=function(){this.Ce=this.setInterval(function(){var a=this.k().bufferedPercent();this.Jd!=a&&this.k().o("progress");this.Jd=a;1===a&&this.hd()},500)};s.hd=function(){this.clearInterval(this.Ce)}; s.oe=function(){var a=this.d;this.Vb=f;this.b(a,"play",this.md);this.b(a,"pause",this.qb);this.N("timeupdate",function(){this.featuresTimeupdateEvents=f;this.Rc()})};s.Rc=function(){var a=this.d;this.Vb=l;this.qb();this.n(a,"play",this.md);this.n(a,"pause",this.qb)};s.md=function(){this.Bc&&this.qb();this.Bc=this.setInterval(function(){this.k().o("timeupdate")},250)};s.qb=function(){this.clearInterval(this.Bc);this.k().o("timeupdate")};s.dispose=function(){this.Qc&&this.me();this.Vb&&this.Rc();t.a.prototype.dispose.call(this)}; s.Zb=function(){this.Vb&&this.k().o("timeupdate")};s.de=function(){function a(){var a=c.da("textTrackDisplay");a&&a.C()}var c=this.d,d;if(d=this.textTracks())d.addEventListener("removetrack",a),d.addEventListener("addtrack",a),this.b("dispose",t.bind(this,function(){d.removeEventListener("removetrack",a);d.removeEventListener("addtrack",a)}))}; s.Sd=function(){var a=this.d,c,d,e;window.WebVTT||(e=document.createElement("script"),e.src=a.options()["vtt.js"]||"../node_modules/vtt.js/dist/vtt.js",a.m().appendChild(e),window.WebVTT=f);if(d=this.textTracks())c=function(){var c,d,e;e=a.da("textTrackDisplay");e.C();for(c=0;c<this.length;c++)d=this[c],d.removeEventListener("cuechange",t.bind(e,e.C)),"showing"===d.mode&&d.addEventListener("cuechange",t.bind(e,e.C))},d.addEventListener("change",c),this.b("dispose",t.bind(this,function(){d.removeEventListener("change", c)}))};s.textTracks=function(){this.d.ld=this.d.ld||new t.F;return this.d.ld};s.X=function(){this.d.Xc=this.d.Xc||new t.F;return this.d.Xc};O=function(a,c,d,e,g){var h=a.textTracks();g=g||{};g.kind=c;d&&(g.label=d);e&&(g.language=e);g.player=a.d;a=new t.t(g);P(h,a);return a};t.j.prototype.addTextTrack=function(a,c,d){if(!a)throw Error("TextTrack kind is required but was not provided");return O(this,a,c,d)};t.j.prototype.ha=function(a){a=O(this,a.kind,a.label,a.language,a);P(this.X(),a);return{Y:a}}; t.j.prototype.Da=function(a){Q(this.textTracks(),a);Q(this.X(),a)};t.j.prototype.bd=m();t.j.prototype.featuresVolumeControl=f;t.j.prototype.featuresFullscreenResize=l;t.j.prototype.featuresPlaybackRate=l;t.j.prototype.featuresProgressEvents=l;t.j.prototype.featuresTimeupdateEvents=l;t.j.prototype.featuresNativeTextTracks=l; t.j.dc=function(a){a.registerSourceHandler=function(c,d){var e=a.cd;e||(e=a.cd=[]);d===b&&(d=e.length);e.splice(d,0,c)};a.ob=function(c){for(var d=a.cd||[],e,g=0;g<d.length;g++)if(e=d[g].canHandleSource(c))return d[g];return j};a.wc=function(c){var d=a.ob(c);return d?d.canHandleSource(c):""};a.prototype.ma=function(c){var d=a.ob(c);d||(a.nativeSourceHandler?d=a.nativeSourceHandler:t.log.error("No source hander found for the current source."));this.ia();this.n("dispose",this.ia);this.fb=c;this.$b= d.handleSource(c,this);this.b("dispose",this.ia);return this};a.prototype.ia=function(){this.$b&&this.$b.dispose&&this.$b.dispose()}};t.media={}; t.f=t.j.extend({l:function(a,c,d){var e,g,h;if(c.nativeCaptions===l||c.nativeTextTracks===l)this.featuresNativeTextTracks=l;t.j.call(this,a,c,d);for(d=t.f.xb.length-1;0<=d;d--)this.b(t.f.xb[d],this.Td);(c=c.source)&&(this.c.currentSrc!==c.src||a.L&&3===a.L.ce)&&this.ma(c);if(this.c.hasChildNodes()){d=this.c.childNodes;e=d.length;for(c=[];e--;)g=d[e],h=g.nodeName.toLowerCase(),"track"===h&&(this.featuresNativeTextTracks?P(this.X(),g.track):c.push(g));for(d=0;d<c.length;d++)this.c.removeChild(c[d])}if(t.Db&& a.options().nativeControlsForTouch===f){var k,q,r,u;k=this;q=this.k();c=q.controls();k.c.controls=!!c;r=function(){k.c.controls=f};u=function(){k.c.controls=l};q.b("controlsenabled",r);q.b("controlsdisabled",u);c=function(){q.n("controlsenabled",r);q.n("controlsdisabled",u)};k.b("dispose",c);q.b("usingcustomcontrols",c);q.usingNativeControls(f)}a.I(function(){this.src()&&(this.L&&this.q.autoplay&&this.paused())&&(delete this.L.poster,this.play())});this.Va()}});s=t.f.prototype; s.dispose=function(){t.f.Kb(this.c);t.j.prototype.dispose.call(this)}; s.e=function(){var a=this.d,c,d,e,g=a.L;if(!g||this.movingMediaElementInDOM===l){g?(e=g.cloneNode(l),t.f.Kb(g),g=e,a.L=j):(g=t.e("video"),e=videojs.Z.Aa({},a.Te),(!t.Db||a.options().nativeControlsForTouch!==f)&&delete e.controls,t.ad(g,t.i.D(e,{id:a.id()+"_html5_api","class":"vjs-tech"})));g.player=a;if(a.q.nd)for(e=0;e<a.q.nd.length;e++)c=a.q.nd[e],d=document.createElement("track"),d.Tb=c.Tb,d.label=c.label,d.ed=c.ed,d.src=c.src,"default"in c&&d.setAttribute("default","default"),g.appendChild(d); t.Rb(g,a.m())}c=["autoplay","preload","loop","muted"];for(e=c.length-1;0<=e;e--){d=c[e];var h={};"undefined"!==typeof a.q[d]&&(h[d]=a.q[d]);t.ad(g,h)}return g};s.Td=function(a){"error"==a.type&&this.error()?this.k().error(this.error().code):(a.bubbles=l,this.k().o(a))};s.play=function(){this.c.play()};s.pause=function(){this.c.pause()};s.paused=function(){return this.c.paused};s.currentTime=function(){return this.c.currentTime};s.Zb=function(a){try{this.c.currentTime=a}catch(c){t.log(c,"Video is not ready. (Video.js)")}}; s.duration=function(){return this.c.duration||0};s.buffered=function(){return this.c.buffered};s.volume=function(){return this.c.volume};s.Oe=function(a){this.c.volume=a};s.muted=function(){return this.c.muted};s.Ke=function(a){this.c.muted=a};s.width=function(){return this.c.offsetWidth};s.height=function(){return this.c.offsetHeight};s.Sa=function(){return"function"==typeof this.c.webkitEnterFullScreen&&(/Android/.test(t.P)||!/Chrome|Mac OS X 10.5/.test(t.P))?f:l}; s.Ec=function(){var a=this.c;"webkitDisplayingFullscreen"in a&&this.N("webkitbeginfullscreen",function(){this.d.isFullscreen(f);this.N("webkitendfullscreen",function(){this.d.isFullscreen(l);this.d.o("fullscreenchange")});this.d.o("fullscreenchange")});a.paused&&a.networkState<=a.ef?(this.c.play(),this.setTimeout(function(){a.pause();a.webkitEnterFullScreen()},0)):a.webkitEnterFullScreen()};s.Ud=function(){this.c.webkitExitFullScreen()}; function oa(a,c){var d=/^blob\:/i;return c&&a&&d.test(a)?c:a}s.src=function(a){var c=this.c.src;if(a===b)return oa(c,this.dd);this.na(a)};s.na=function(a){this.c.src=a};s.load=function(){this.c.load()};s.currentSrc=function(){var a=this.c.currentSrc;return!this.fb?a:oa(a,this.fb.src)};s.poster=function(){return this.c.poster};s.bd=function(a){this.c.poster=a};s.Ra=function(){return this.c.Ra};s.Me=function(a){this.c.Ra=a};s.autoplay=function(){return this.c.autoplay}; s.He=function(a){this.c.autoplay=a};s.controls=function(){return this.c.controls};s.loop=function(){return this.c.loop};s.Je=function(a){this.c.loop=a};s.error=function(){return this.c.error};s.seeking=function(){return this.c.seeking};s.seekable=function(){return this.c.seekable};s.ended=function(){return this.c.ended};s.playbackRate=function(){return this.c.playbackRate};s.Le=function(a){this.c.playbackRate=a};s.networkState=function(){return this.c.networkState};s.readyState=function(){return this.c.readyState}; s.textTracks=function(){return!this.featuresNativeTextTracks?t.j.prototype.textTracks.call(this):this.c.textTracks};s.addTextTrack=function(a,c,d){return!this.featuresNativeTextTracks?t.j.prototype.addTextTrack.call(this,a,c,d):this.c.addTextTrack(a,c,d)}; s.ha=function(a){if(!this.featuresNativeTextTracks)return t.j.prototype.ha.call(this,a);var c=document.createElement("track");a=a||{};a.kind&&(c.kind=a.kind);a.label&&(c.label=a.label);if(a.language||a.srclang)c.srclang=a.language||a.srclang;a["default"]&&(c["default"]=a["default"]);a.id&&(c.id=a.id);a.src&&(c.src=a.src);this.m().appendChild(c);P(this.X(),c.Y);return c}; s.Da=function(a){if(!this.featuresNativeTextTracks)return t.j.prototype.Da.call(this,a);var c,d;Q(this.X(),a);c=this.m().querySelectorAll("track");for(d=0;d<c.length;d++)if(c[d]===a||c[d].track===a){c[d].parentNode.removeChild(c[d]);break}};t.f.isSupported=function(){try{t.A.volume=0.5}catch(a){return l}return!!t.A.canPlayType};t.j.dc(t.f);var pa=t.f.prototype.ma,qa=t.f.prototype.ia;t.f.prototype.ma=function(a){var c=pa.call(this,a);this.dd=a.src;return c};t.f.prototype.ia=function(){this.dd=b;return qa.call(this)}; t.f.nativeSourceHandler={};t.f.nativeSourceHandler.canHandleSource=function(a){function c(a){try{return t.A.canPlayType(a)}catch(c){return""}}return a.type?c(a.type):a.src?(a=(a=a.src.match(/\.([^.\/\?]+)(\?[^\/]+)?$/i))&&a[1],c("video/"+a)):""};t.f.nativeSourceHandler.handleSource=function(a,c){c.na(a.src)};t.f.nativeSourceHandler.dispose=m();t.f.registerSourceHandler(t.f.nativeSourceHandler);t.f.Ld=function(){var a=t.A.volume;t.A.volume=a/2+0.1;return a!==t.A.volume}; t.f.Kd=function(){var a=t.A.playbackRate;t.A.playbackRate=a/2+0.1;return a!==t.A.playbackRate};t.f.Re=function(){var a;(a=!!t.A.textTracks)&&0<t.A.textTracks.length&&(a="number"!==typeof t.A.textTracks[0].mode);a&&t.gc&&(a=l);return a};t.f.prototype.featuresVolumeControl=t.f.Ld();t.f.prototype.featuresPlaybackRate=t.f.Kd();t.f.prototype.movingMediaElementInDOM=!t.xd;t.f.prototype.featuresFullscreenResize=f;t.f.prototype.featuresProgressEvents=f;t.f.prototype.featuresNativeTextTracks=t.f.Re(); var S,ra=/^application\/(?:x-|vnd\.apple\.)mpegurl/i,sa=/^video\/mp4/i;t.f.Tc=function(){4<=t.ec&&(S||(S=t.A.constructor.prototype.canPlayType),t.A.constructor.prototype.canPlayType=function(a){return a&&ra.test(a)?"maybe":S.call(this,a)});t.Bd&&(S||(S=t.A.constructor.prototype.canPlayType),t.A.constructor.prototype.canPlayType=function(a){return a&&sa.test(a)?"maybe":S.call(this,a)})};t.f.Ye=function(){var a=t.A.constructor.prototype.canPlayType;t.A.constructor.prototype.canPlayType=S;S=j;return a}; t.f.Tc();t.f.xb="loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" ");t.f.Kb=function(a){if(a){a.player=j;for(a.parentNode&&a.parentNode.removeChild(a);a.hasChildNodes();)a.removeChild(a.firstChild);a.removeAttribute("src");if("function"===typeof a.load)try{a.load()}catch(c){}}}; t.g=t.j.extend({l:function(a,c,d){t.j.call(this,a,c,d);var e=c.source;d=a.id()+"_flash_api";var g=a.q,g=t.i.D({readyFunction:"videojs.Flash.onReady",eventProxyFunction:"videojs.Flash.onEvent",errorEventProxyFunction:"videojs.Flash.onError",autoplay:g.autoplay,preload:g.Ra,loop:g.loop,muted:g.muted},c.flashVars),h=t.i.D({wmode:"opaque",bgcolor:"#000000"},c.params);d=t.i.D({id:d,name:d,"class":"vjs-tech"},c.attributes);e&&this.I(function(){this.ma(e)});t.Rb(this.c,c.parentEl);c.startTime&&this.I(function(){this.load(); this.play();this.currentTime(c.startTime)});t.gc&&this.I(function(){this.b("mousemove",function(){this.k().o({type:"mousemove",bubbles:l})})});a.b("stageclick",a.reportUserActivity);this.c=t.g.Dc(c.swf,this.c,g,h,d)}});s=t.g.prototype;s.dispose=function(){t.j.prototype.dispose.call(this)};s.play=function(){this.ended()&&this.setCurrentTime(0);this.c.vjs_play()};s.pause=function(){this.c.vjs_pause()};s.src=function(a){return a===b?this.currentSrc():this.na(a)}; s.na=function(a){a=t.Xd(a);this.c.vjs_src(a);if(this.d.autoplay()){var c=this;this.setTimeout(function(){c.play()},0)}};t.g.prototype.setCurrentTime=function(a){this.ke=a;this.c.vjs_setProperty("currentTime",a);t.j.prototype.Zb.call(this)};t.g.prototype.currentTime=function(){return this.seeking()?this.ke||0:this.c.vjs_getProperty("currentTime")};t.g.prototype.currentSrc=function(){return this.fb?this.fb.src:this.c.vjs_getProperty("currentSrc")};t.g.prototype.load=function(){this.c.vjs_load()}; t.g.prototype.poster=function(){this.c.vjs_getProperty("poster")};t.g.prototype.setPoster=m();s=t.g.prototype;s.seekable=function(){return 0===this.duration()?t.xa():t.xa(0,this.duration())};s.buffered=function(){return!this.c.vjs_getProperty?t.xa():t.xa(0,this.c.vjs_getProperty("buffered"))};s.duration=function(){return!this.c.vjs_getProperty?0:this.c.vjs_getProperty("duration")};s.Sa=p(l);s.Ec=p(l); function ta(){var a=T[U],c=a.charAt(0).toUpperCase()+a.slice(1);ua["set"+c]=function(c){return this.c.vjs_setProperty(a,c)}}function va(a){ua[a]=function(){return this.c.vjs_getProperty(a)}} var ua=t.g.prototype,T="rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),wa="error networkState readyState seeking initialTime startOffsetTime paused played ended videoTracks audioTracks videoWidth videoHeight".split(" "),U;for(U=0;U<T.length;U++)va(T[U]),ta();for(U=0;U<wa.length;U++)va(wa[U]);t.g.isSupported=function(){return 10<=t.g.version()[0]};t.j.dc(t.g);t.g.nativeSourceHandler={}; t.g.nativeSourceHandler.canHandleSource=function(a){return!a.type?"":a.type.replace(/;.*/,"").toLowerCase()in t.g.Wd?"maybe":""};t.g.nativeSourceHandler.handleSource=function(a,c){c.na(a.src)};t.g.nativeSourceHandler.dispose=m();t.g.registerSourceHandler(t.g.nativeSourceHandler);t.g.Wd={"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"};t.g.onReady=function(a){var c;if(c=(a=t.m(a))&&a.parentNode&&a.parentNode.player)a.player=c,t.g.checkReady(c.h)}; t.g.checkReady=function(a){a.m()&&(a.m().vjs_getProperty?a.Va():this.setTimeout(function(){t.g.checkReady(a)},50))};t.g.onEvent=function(a,c){t.m(a).player.o(c)};t.g.onError=function(a,c){var d=t.m(a).player,e="FLASH: "+c;"srcnotfound"==c?d.error({code:4,message:e}):d.error(e)}; t.g.version=function(){var a="0,0,0";try{a=(new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}catch(c){try{navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(a=(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1])}catch(d){}}return a.split(",")}; t.g.Dc=function(a,c,d,e,g){a=t.g.$d(a,d,e,g);a=t.e("div",{innerHTML:a}).childNodes[0];d=c.parentNode;c.parentNode.replaceChild(a,c);a[t.expando]=c[t.expando];var h=d.childNodes[0];setTimeout(function(){h.style.display="block"},1E3);return a}; t.g.$d=function(a,c,d,e){var g="",h="",k="";c&&t.i.ca(c,function(a,c){g+=a+"="+c+"&amp;"});d=t.i.D({movie:a,flashvars:g,allowScriptAccess:"always",allowNetworking:"all"},d);t.i.ca(d,function(a,c){h+='<param name="'+a+'" value="'+c+'" />'});e=t.i.D({data:a,width:"100%",height:"100%"},e);t.i.ca(e,function(a,c){k+=a+'="'+c+'" '});return'<object type="application/x-shockwave-flash" '+k+">"+h+"</object>"};t.g.Qe={"rtmp/mp4":"MP4","rtmp/flv":"FLV"};t.g.Df=function(a,c){return a+"&"+c}; t.g.Pe=function(a){var c={yc:"",jd:""};if(!a)return c;var d=a.indexOf("&"),e;-1!==d?e=d+1:(d=e=a.lastIndexOf("/")+1,0===d&&(d=e=a.length));c.yc=a.substring(0,d);c.jd=a.substring(e,a.length);return c};t.g.ie=function(a){return a in t.g.Qe};t.g.Dd=/^rtmp[set]?:\/\//i;t.g.he=function(a){return t.g.Dd.test(a)};t.g.Yb={};t.g.Yb.canHandleSource=function(a){return t.g.ie(a.type)||t.g.he(a.src)?"maybe":""};t.g.Yb.handleSource=function(a,c){var d=t.g.Pe(a.src);c.setRtmpConnection(d.yc);c.setRtmpStream(d.jd)}; t.g.registerSourceHandler(t.g.Yb);t.Cd=t.a.extend({l:function(a,c,d){t.a.call(this,a,c,d);if(!a.q.sources||0===a.q.sources.length){c=0;for(d=a.q.techOrder;c<d.length;c++){var e=t.va(d[c]),g=window.videojs[e];if(g&&g.isSupported()){ka(a,e);break}}}else a.src(a.q.sources)}});t.oc={disabled:"disabled",hidden:"hidden",showing:"showing"};t.Ed={subtitles:"subtitles",captions:"captions",descriptions:"descriptions",chapters:"chapters",metadata:"metadata"}; t.t=function(a){var c,d,e,g,h,k,q,r,u,A,R;a=a||{};if(!a.player)throw Error("A player was not provided.");c=this;if(t.pa)for(R in c=document.createElement("custom"),t.t.prototype)c[R]=t.t.prototype[R];c.d=a.player;e=t.oc[a.mode]||"disabled";g=t.Ed[a.kind]||"subtitles";h=a.label||"";k=a.language||a.srclang||"";d=a.id||"vjs_text_track_"+t.s++;if("metadata"===g||"chapters"===g)e="hidden";c.V=[];c.Ia=[];q=new t.U(c.V);r=new t.U(c.Ia);A=l;u=t.bind(c,function(){this.activeCues;A&&(this.trigger("cuechange"), A=l)});"disabled"!==e&&c.d.b("timeupdate",u);Object.defineProperty(c,"kind",{get:function(){return g},set:Function.prototype});Object.defineProperty(c,"label",{get:function(){return h},set:Function.prototype});Object.defineProperty(c,"language",{get:function(){return k},set:Function.prototype});Object.defineProperty(c,"id",{get:function(){return d},set:Function.prototype});Object.defineProperty(c,"mode",{get:function(){return e},set:function(a){t.oc[a]&&(e=a,"showing"===e&&this.d.b("timeupdate",u), this.o("modechange"))}});Object.defineProperty(c,"cues",{get:function(){return!this.Ub?j:q},set:Function.prototype});Object.defineProperty(c,"activeCues",{get:function(){var a,c,d,e,g;if(!this.Ub)return j;if(0===this.cues.length)return r;e=this.d.currentTime();a=0;c=this.cues.length;for(d=[];a<c;a++)g=this.cues[a],g.startTime<=e&&g.endTime>=e?d.push(g):g.startTime===g.endTime&&(g.startTime<=e&&g.startTime+0.5>=e)&&d.push(g);A=l;if(d.length!==this.Ia.length)A=f;else for(a=0;a<d.length;a++)-1===xa.call(this.Ia, d[a])&&(A=f);this.Ia=d;r.pb(this.Ia);return r},set:Function.prototype});a.src?ya(a.src,c):c.Ub=f;if(t.pa)return c};t.t.prototype=t.i.create(t.z.prototype);t.t.prototype.constructor=t.t;t.t.prototype.ab={cuechange:"cuechange"};t.t.prototype.sc=function(a){var c=this.d.textTracks(),d=0;if(c)for(;d<c.length;d++)c[d]!==this&&c[d].Yc(a);this.V.push(a);this.cues.pb(this.V)};t.t.prototype.Yc=function(a){for(var c=0,d=this.V.length,e,g=l;c<d;c++)e=this.V[c],e===a&&(this.V.splice(c,1),g=f);g&&this.Ac.pb(this.V)}; var ya,V,xa;ya=function(a,c){t.bf(a,t.bind(this,function(a,e,g){if(a)return t.log.error(a);c.Ub=f;V(g,c)}))};V=function(a,c){if("function"!==typeof window.WebVTT)window.setTimeout(function(){V(a,c)},25);else{var d=new window.WebVTT.Parser(window,window.vttjs,window.WebVTT.StringDecoder());d.oncue=function(a){c.sc(a)};d.onparsingerror=function(a){t.log.error(a)};d.parse(a);d.flush()}}; xa=function(a,c){var d;if(this==j)throw new TypeError('"this" is null or not defined');var e=Object(this),g=e.length>>>0;if(0===g)return-1;d=+c||0;Infinity===Math.abs(d)&&(d=0);if(d>=g)return-1;for(d=Math.max(0<=d?d:g-Math.abs(d),0);d<g;){if(d in e&&e[d]===a)return d;d++}return-1}; t.F=function(a){var c=this,d,e=0;if(t.pa)for(d in c=document.createElement("custom"),t.F.prototype)c[d]=t.F.prototype[d];a=a||[];c.Ua=[];for(Object.defineProperty(c,"length",{get:function(){return this.Ua.length}});e<a.length;e++)P(c,a[e]);if(t.pa)return c};t.F.prototype=t.i.create(t.z.prototype);t.F.prototype.constructor=t.F;t.F.prototype.ab={change:"change",addtrack:"addtrack",removetrack:"removetrack"};for(var za in t.F.prototype.ab)t.F.prototype["on"+za]=j; function P(a,c){var d=a.Ua.length;""+d in a||Object.defineProperty(a,d,{get:function(){return this.Ua[d]}});c.addEventListener("modechange",t.bind(a,function(){this.o("change")}));a.Ua.push(c);a.o({type:"addtrack",Y:c})}function Q(a,c){for(var d=0,e=a.length,g;d<e;d++)if(g=a[d],g===c){a.Ua.splice(d,1);break}a.o({type:"removetrack",Y:c})}t.F.prototype.ae=function(a){for(var c=0,d=this.length,e=j,g;c<d;c++)if(g=this[c],g.id===a){e=g;break}return e}; t.U=function(a){var c=this,d;if(t.pa)for(d in c=document.createElement("custom"),t.U.prototype)c[d]=t.U.prototype[d];t.U.prototype.pb.call(c,a);Object.defineProperty(c,"length",{get:n("le")});if(t.pa)return c};t.U.prototype.pb=function(a){var c=this.length||0,d=0,e=a.length;this.V=a;this.le=a.length;a=function(a){""+a in this||Object.defineProperty(this,""+a,{get:function(){return this.V[a]}})};if(c<e)for(d=c;d<e;d++)a.call(this,d)}; t.U.prototype.Zd=function(a){for(var c=0,d=this.length,e=j,g;c<d;c++)if(g=this[c],g.id===a){e=g;break}return e};t.sa=t.a.extend({l:function(a,c,d){t.a.call(this,a,c,d);a.b("loadstart",t.bind(this,this.Ve));a.I(t.bind(this,function(){if(a.h&&a.h.featuresNativeTextTracks)this.W();else{var c,d,h;a.b("fullscreenchange",t.bind(this,this.C));d=a.q.tracks||[];for(c=0;c<d.length;c++)h=d[c],this.d.ha(h)}}))}});t.sa.prototype.Ve=function(){this.d.h&&this.d.h.featuresNativeTextTracks?this.W():this.show()}; t.sa.prototype.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-text-track-display"})};t.sa.prototype.Md=function(){"function"===typeof window.WebVTT&&window.WebVTT.processCues(window,[],this.c)};function W(a,c){return"rgba("+parseInt(a[1]+a[1],16)+","+parseInt(a[2]+a[2],16)+","+parseInt(a[3]+a[3],16)+","+c+")"} var Aa={tf:"monospace",zf:"sans-serif",Bf:"serif",uf:'"Andale Mono", "Lucida Console", monospace',vf:'"Courier New", monospace',xf:"sans-serif",yf:"serif",kf:'"Comic Sans MS", Impact, fantasy',Af:'"Monotype Corsiva", cursive',Cf:'"Andale Mono", "Lucida Console", monospace, sans-serif'};t.sa.prototype.C=function(){var a=this.d.textTracks(),c=0,d;this.Md();if(a)for(;c<a.length;c++)d=a[c],"showing"===d.mode&&this.Ze(d)}; t.sa.prototype.Ze=function(a){if("function"===typeof window.WebVTT&&a.activeCues){for(var c=0,d=this.d.textTrackSettings.Hc(),e,g=[];c<a.activeCues.length;c++)g.push(a.activeCues[c]);window.WebVTT.processCues(window,a.activeCues,this.c);for(c=g.length;c--;){a=g[c].lf;d.color&&(a.firstChild.style.color=d.color);if(d.kd)try{a.firstChild.style.color=W(d.color||"#fff",d.kd)}catch(h){}d.backgroundColor&&(a.firstChild.style.backgroundColor=d.backgroundColor);if(d.vc)try{a.firstChild.style.backgroundColor= W(d.backgroundColor||"#000",d.vc)}catch(k){}if(d.cc)if(d.rd)try{a.style.backgroundColor=W(d.cc,d.rd)}catch(q){}else a.style.backgroundColor=d.cc;d.Ma&&("dropshadow"===d.Ma?a.firstChild.style.textShadow="2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px #222":"raised"===d.Ma?a.firstChild.style.textShadow="1px 1px #222, 2px 2px #222, 3px 3px #222":"depressed"===d.Ma?a.firstChild.style.textShadow="1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px #222":"uniform"===d.Ma&&(a.firstChild.style.textShadow="0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px #222")); d.Ob&&1!==d.Ob&&(e=window.wf(a.style.fontSize),a.style.fontSize=e*d.Ob+"px",a.style.height="auto",a.style.top="auto",a.style.bottom="2px");d.fontFamily&&"default"!==d.fontFamily&&("small-caps"===d.fontFamily?a.firstChild.style.fontVariant="small-caps":a.firstChild.style.fontFamily=Aa[d.fontFamily])}}}; t.$=t.M.extend({l:function(a,c){var d=this.Y=c.track,e=a.textTracks(),g,h;e&&(g=t.bind(this,function(){var a="showing"===this.Y.mode,c,d,g;if(this instanceof t.zb){a=f;d=0;for(g=e.length;d<g;d++)if(c=e[d],c.kind===this.Y.kind&&"showing"===c.mode){a=l;break}}this.selected(a)}),e.addEventListener("change",g),a.b("dispose",function(){e.removeEventListener("change",g)}));c.label=d.label||d.language||"Unknown";c.selected=d["default"]||"showing"===d.mode;t.M.call(this,a,c);e&&e.onchange===b&&this.b(["tap", "click"],function(){if("object"!==typeof window.vd)try{h=new window.vd("change")}catch(a){}h||(h=document.createEvent("Event"),h.initEvent("change",f,f));e.dispatchEvent(h)})}});t.$.prototype.u=function(){var a=this.Y.kind,c=this.d.textTracks(),d,e=0;t.M.prototype.u.call(this);if(c)for(;e<c.length;e++)d=c[e],d.kind===a&&(d.mode=d===this.Y?"showing":"disabled")};t.zb=t.$.extend({l:function(a,c){c.track={kind:c.kind,player:a,label:c.kind+" off","default":l,mode:"disabled"};t.$.call(this,a,c);this.selected(f)}}); t.sb=t.$.extend({l:function(a,c){c.track={kind:c.kind,player:a,label:c.kind+" settings","default":l,mode:"disabled"};t.$.call(this,a,c);this.p("vjs-texttrack-settings")}});t.sb.prototype.u=function(){this.k().da("textTrackSettings").show()}; t.Q=t.O.extend({l:function(a,c){var d,e;t.O.call(this,a,c);d=this.d.textTracks();1>=this.H.length&&this.W();d&&(e=t.bind(this,this.update),d.addEventListener("removetrack",e),d.addEventListener("addtrack",e),this.d.b("dispose",function(){d.removeEventListener("removetrack",e);d.removeEventListener("addtrack",e)}))}}); t.Q.prototype.Ka=function(){var a=[],c,d;this instanceof t.oa&&(!this.k().h||!this.k().h.featuresNativeTextTracks)&&a.push(new t.sb(this.d,{kind:this.ea}));a.push(new t.zb(this.d,{kind:this.ea}));d=this.d.textTracks();if(!d)return a;for(var e=0;e<d.length;e++)c=d[e],c.kind===this.ea&&a.push(new t.$(this.d,{track:c}));return a};t.oa=t.Q.extend({l:function(a,c,d){t.Q.call(this,a,c,d);this.c.setAttribute("aria-label","Captions Menu")}});t.oa.prototype.ea="captions";t.oa.prototype.ta="Captions"; t.oa.prototype.className="vjs-captions-button";t.oa.prototype.update=function(){var a=2;t.Q.prototype.update.call(this);this.k().h&&this.k().h.featuresNativeTextTracks&&(a=1);this.H&&this.H.length>a?this.show():this.W()};t.$a=t.Q.extend({l:function(a,c,d){t.Q.call(this,a,c,d);this.c.setAttribute("aria-label","Subtitles Menu")}});t.$a.prototype.ea="subtitles";t.$a.prototype.ta="Subtitles";t.$a.prototype.className="vjs-subtitles-button"; t.Wa=t.Q.extend({l:function(a,c,d){t.Q.call(this,a,c,d);this.c.setAttribute("aria-label","Chapters Menu")}});s=t.Wa.prototype;s.ea="chapters";s.ta="Chapters";s.className="vjs-chapters-button";s.Ka=function(){var a=[],c,d;d=this.d.textTracks();if(!d)return a;for(var e=0;e<d.length;e++)c=d[e],c.kind===this.ea&&a.push(new t.$(this.d,{track:c}));return a}; s.La=function(){for(var a=this.d.textTracks()||[],c=0,d=a.length,e,g,h=this.H=[];c<d;c++)if(e=a[c],e.kind==this.ea)if(e.Ac){g=e;break}else e.mode="hidden",window.setTimeout(t.bind(this,function(){this.La()}),100);a=this.za;a===b&&(a=new t.qa(this.d),a.wa().appendChild(t.e("li",{className:"vjs-menu-title",innerHTML:t.va(this.ea),Se:-1})));if(g){e=g.cues;for(var k,c=0,d=e.length;c<d;c++)k=e[c],k=new t.Xa(this.d,{track:g,cue:k}),h.push(k),a.aa(k);this.aa(a)}0<this.H.length&&this.show();return a}; t.Xa=t.M.extend({l:function(a,c){var d=this.Y=c.track,e=this.cue=c.cue,g=a.currentTime();c.label=e.text;c.selected=e.startTime<=g&&g<e.endTime;t.M.call(this,a,c);d.addEventListener("cuechange",t.bind(this,this.update))}});t.Xa.prototype.u=function(){t.M.prototype.u.call(this);this.d.currentTime(this.cue.startTime);this.update(this.cue.startTime)};t.Xa.prototype.update=function(){var a=this.cue,c=this.d.currentTime();this.selected(a.startTime<=c&&c<a.endTime)}; function X(a){var c;a.Ge?c=a.Ge[0]:a.options&&(c=a.options[a.options.selectedIndex]);return c.value}function Y(a,c){var d,e;if(c){for(d=0;d<a.options.length&&!(e=a.options[d],e.value===c);d++);a.selectedIndex=d}} t.pc=t.a.extend({l:function(a,c){t.a.call(this,a,c);this.W();t.b(this.m().querySelector(".vjs-done-button"),"click",t.bind(this,function(){this.Fe();this.W()}));t.b(this.m().querySelector(".vjs-default-button"),"click",t.bind(this,function(){this.m().querySelector(".vjs-fg-color > select").selectedIndex=0;this.m().querySelector(".vjs-bg-color > select").selectedIndex=0;this.m().querySelector(".window-color > select").selectedIndex=0;this.m().querySelector(".vjs-text-opacity > select").selectedIndex= 0;this.m().querySelector(".vjs-bg-opacity > select").selectedIndex=0;this.m().querySelector(".vjs-window-opacity > select").selectedIndex=0;this.m().querySelector(".vjs-edge-style select").selectedIndex=0;this.m().querySelector(".vjs-font-family select").selectedIndex=0;this.m().querySelector(".vjs-font-percent select").selectedIndex=2;this.C()}));t.b(this.m().querySelector(".vjs-fg-color > select"),"change",t.bind(this,this.C));t.b(this.m().querySelector(".vjs-bg-color > select"),"change",t.bind(this, this.C));t.b(this.m().querySelector(".window-color > select"),"change",t.bind(this,this.C));t.b(this.m().querySelector(".vjs-text-opacity > select"),"change",t.bind(this,this.C));t.b(this.m().querySelector(".vjs-bg-opacity > select"),"change",t.bind(this,this.C));t.b(this.m().querySelector(".vjs-window-opacity > select"),"change",t.bind(this,this.C));t.b(this.m().querySelector(".vjs-font-percent select"),"change",t.bind(this,this.C));t.b(this.m().querySelector(".vjs-edge-style select"),"change",t.bind(this, this.C));t.b(this.m().querySelector(".vjs-font-family select"),"change",t.bind(this,this.C));a.options().persistTextTrackSettings&&this.Ee()}});s=t.pc.prototype;s.e=function(){return t.a.prototype.e.call(this,"div",{className:"vjs-caption-settings vjs-modal-overlay",innerHTML:'<div class="vjs-tracksettings"><div class="vjs-tracksettings-colors"><div class="vjs-fg-color vjs-tracksetting"><label class="vjs-label">Foreground</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-text-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Opaque</option></select></span></div><div class="vjs-bg-color vjs-tracksetting"><label class="vjs-label">Background</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-bg-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Transparent</option><option value="0">Transparent</option></select></span></div><div class="window-color vjs-tracksetting"><label class="vjs-label">Window</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-window-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Transparent</option><option value="0">Transparent</option></select></span></div></div><div class="vjs-tracksettings-font"><div class="vjs-font-percent vjs-tracksetting"><label class="vjs-label">Font Size</label><select><option value="0.50">50%</option><option value="0.75">75%</option><option value="1.00" selected>100%</option><option value="1.25">125%</option><option value="1.50">150%</option><option value="1.75">175%</option><option value="2.00">200%</option><option value="3.00">300%</option><option value="4.00">400%</option></select></div><div class="vjs-edge-style vjs-tracksetting"><label class="vjs-label">Text Edge Style</label><select><option value="none">None</option><option value="raised">Raised</option><option value="depressed">Depressed</option><option value="uniform">Uniform</option><option value="dropshadow">Dropshadow</option></select></div><div class="vjs-font-family vjs-tracksetting"><label class="vjs-label">Font Family</label><select><option value="">Default</option><option value="monospaceSerif">Monospace Serif</option><option value="proportionalSerif">Proportional Serif</option><option value="monospaceSansSerif">Monospace Sans-Serif</option><option value="proportionalSansSerif">Proportional Sans-Serif</option><option value="casual">Casual</option><option value="script">Script</option><option value="small-caps">Small Caps</option></select></div></div></div><div class="vjs-tracksettings-controls"><button class="vjs-default-button">Defaults</button><button class="vjs-done-button">Done</button></div>'})}; s.Hc=function(){var a,c,d,e,g,h,k,q,r,u;a=this.m();g=X(a.querySelector(".vjs-edge-style select"));h=X(a.querySelector(".vjs-font-family select"));k=X(a.querySelector(".vjs-fg-color > select"));d=X(a.querySelector(".vjs-text-opacity > select"));q=X(a.querySelector(".vjs-bg-color > select"));c=X(a.querySelector(".vjs-bg-opacity > select"));r=X(a.querySelector(".window-color > select"));e=X(a.querySelector(".vjs-window-opacity > select"));a=window.parseFloat(X(a.querySelector(".vjs-font-percent > select"))); c={backgroundOpacity:c,textOpacity:d,windowOpacity:e,edgeStyle:g,fontFamily:h,color:k,backgroundColor:q,windowColor:r,fontPercent:a};for(u in c)(""===c[u]||"none"===c[u]||"fontPercent"===u&&1===c[u])&&delete c[u];return c}; s.Ne=function(a){var c=this.m();Y(c.querySelector(".vjs-edge-style select"),a.Ma);Y(c.querySelector(".vjs-font-family select"),a.fontFamily);Y(c.querySelector(".vjs-fg-color > select"),a.color);Y(c.querySelector(".vjs-text-opacity > select"),a.kd);Y(c.querySelector(".vjs-bg-color > select"),a.backgroundColor);Y(c.querySelector(".vjs-bg-opacity > select"),a.vc);Y(c.querySelector(".window-color > select"),a.cc);Y(c.querySelector(".vjs-window-opacity > select"),a.rd);(a=a.Ob)&&(a=a.toFixed(2));Y(c.querySelector(".vjs-font-percent > select"), a)};s.Ee=function(){var a;try{a=JSON.parse(window.localStorage.getItem("vjs-text-track-settings"))}catch(c){}a&&this.Ne(a)};s.Fe=function(){var a;if(this.d.options().persistTextTrackSettings){a=this.Hc();try{t.hb(a)?window.localStorage.removeItem("vjs-text-track-settings"):window.localStorage.setItem("vjs-text-track-settings",JSON.stringify(a))}catch(c){}}};s.C=function(){var a=this.d.da("textTrackDisplay");a&&a.C()}; if("undefined"!==typeof window.JSON&&"function"===typeof window.JSON.parse)t.JSON=window.JSON;else{t.JSON={};var Z=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;t.JSON.parse=function(a,c){function d(a,e){var k,q,r=a[e];if(r&&"object"===typeof r)for(k in r)Object.prototype.hasOwnProperty.call(r,k)&&(q=d(r,k),q!==b?r[k]=q:delete r[k]);return c.call(a,e,r)}var e;a=String(a);Z.lastIndex=0;Z.test(a)&&(a=a.replace(Z,function(a){return"\\u"+("0000"+ a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return e=eval("("+a+")"),"function"===typeof c?d({"":e},""):e;throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");}} t.uc=function(){var a,c,d,e;a=document.getElementsByTagName("video");c=document.getElementsByTagName("audio");var g=[];if(a&&0<a.length){d=0;for(e=a.length;d<e;d++)g.push(a[d])}if(c&&0<c.length){d=0;for(e=c.length;d<e;d++)g.push(c[d])}if(g&&0<g.length){d=0;for(e=g.length;d<e;d++)if((c=g[d])&&c.getAttribute)c.player===b&&(a=c.getAttribute("data-setup"),a!==j&&videojs(c));else{t.Hb();break}}else t.qd||t.Hb()};t.Hb=function(){setTimeout(t.uc,1)}; "complete"===document.readyState?t.qd=f:t.N(window,"load",function(){t.qd=f});t.Hb();t.Be=function(a,c){t.Player.prototype[a]=c};var Ba=this;function $(a,c){var d=a.split("."),e=Ba;!(d[0]in e)&&e.execScript&&e.execScript("var "+d[0]);for(var g;d.length&&(g=d.shift());)!d.length&&c!==b?e[g]=c:e=e[g]?e[g]:e[g]={}};$("videojs",t);$("_V_",t);$("videojs.options",t.options);$("videojs.players",t.Ca);$("videojs.TOUCH_ENABLED",t.Db);$("videojs.cache",t.ua);$("videojs.Component",t.a);t.a.prototype.player=t.a.prototype.k;t.a.prototype.options=t.a.prototype.options;t.a.prototype.init=t.a.prototype.l;t.a.prototype.dispose=t.a.prototype.dispose;t.a.prototype.createEl=t.a.prototype.e;t.a.prototype.contentEl=t.a.prototype.wa;t.a.prototype.el=t.a.prototype.m;t.a.prototype.addChild=t.a.prototype.aa; t.a.prototype.getChild=t.a.prototype.da;t.a.prototype.getChildById=t.a.prototype.Yd;t.a.prototype.children=t.a.prototype.children;t.a.prototype.initChildren=t.a.prototype.Kc;t.a.prototype.removeChild=t.a.prototype.removeChild;t.a.prototype.on=t.a.prototype.b;t.a.prototype.off=t.a.prototype.n;t.a.prototype.one=t.a.prototype.N;t.a.prototype.trigger=t.a.prototype.o;t.a.prototype.triggerReady=t.a.prototype.Va;t.a.prototype.show=t.a.prototype.show;t.a.prototype.hide=t.a.prototype.W; t.a.prototype.width=t.a.prototype.width;t.a.prototype.height=t.a.prototype.height;t.a.prototype.dimensions=t.a.prototype.Qd;t.a.prototype.ready=t.a.prototype.I;t.a.prototype.addClass=t.a.prototype.p;t.a.prototype.removeClass=t.a.prototype.r;t.a.prototype.hasClass=t.a.prototype.Pa;t.a.prototype.buildCSSClass=t.a.prototype.T;t.a.prototype.localize=t.a.prototype.v;t.a.prototype.setInterval=t.a.prototype.setInterval;t.a.prototype.setTimeout=t.a.prototype.setTimeout;$("videojs.EventEmitter",t.z); t.z.prototype.on=t.z.prototype.b;t.z.prototype.addEventListener=t.z.prototype.addEventListener;t.z.prototype.off=t.z.prototype.n;t.z.prototype.removeEventListener=t.z.prototype.removeEventListener;t.z.prototype.one=t.z.prototype.N;t.z.prototype.trigger=t.z.prototype.o;t.z.prototype.dispatchEvent=t.z.prototype.dispatchEvent;t.Player.prototype.ended=t.Player.prototype.ended;t.Player.prototype.enterFullWindow=t.Player.prototype.Fc;t.Player.prototype.exitFullWindow=t.Player.prototype.Lb; t.Player.prototype.preload=t.Player.prototype.Ra;t.Player.prototype.remainingTime=t.Player.prototype.remainingTime;t.Player.prototype.supportsFullScreen=t.Player.prototype.Sa;t.Player.prototype.currentType=t.Player.prototype.Nd;t.Player.prototype.requestFullScreen=t.Player.prototype.requestFullScreen;t.Player.prototype.requestFullscreen=t.Player.prototype.requestFullscreen;t.Player.prototype.cancelFullScreen=t.Player.prototype.cancelFullScreen;t.Player.prototype.exitFullscreen=t.Player.prototype.exitFullscreen; t.Player.prototype.isFullScreen=t.Player.prototype.isFullScreen;t.Player.prototype.isFullscreen=t.Player.prototype.isFullscreen;t.Player.prototype.textTracks=t.Player.prototype.textTracks;t.Player.prototype.remoteTextTracks=t.Player.prototype.X;t.Player.prototype.addTextTrack=t.Player.prototype.addTextTrack;t.Player.prototype.addRemoteTextTrack=t.Player.prototype.ha;t.Player.prototype.removeRemoteTextTrack=t.Player.prototype.Da;t.Player.prototype.seekable=t.Player.prototype.seekable;$("videojs.MediaLoader",t.Cd);$("videojs.TextTrackDisplay",t.sa);$("videojs.ControlBar",t.tb);$("videojs.Button",t.w);$("videojs.PlayToggle",t.kc);$("videojs.FullscreenToggle",t.Ya);$("videojs.BigPlayButton",t.rb);$("videojs.LoadingSpinner",t.ic);$("videojs.CurrentTimeDisplay",t.ub);$("videojs.DurationDisplay",t.vb);$("videojs.TimeDivider",t.qc);$("videojs.RemainingTimeDisplay",t.Cb);$("videojs.LiveDisplay",t.hc);$("videojs.ErrorDisplay",t.wb);$("videojs.Slider",t.S);$("videojs.ProgressControl",t.Bb); $("videojs.SeekBar",t.nc);$("videojs.LoadProgressBar",t.yb);$("videojs.PlayProgressBar",t.jc);$("videojs.SeekHandle",t.Za);$("videojs.VolumeControl",t.Fb);$("videojs.VolumeBar",t.Eb);$("videojs.VolumeLevel",t.rc);$("videojs.VolumeMenuButton",t.Ha);$("videojs.VolumeHandle",t.Gb);$("videojs.MuteToggle",t.ra);$("videojs.PosterImage",t.mc);$("videojs.Menu",t.qa);$("videojs.MenuItem",t.M);$("videojs.MenuButton",t.O);$("videojs.PlaybackRateMenuButton",t.lc);$("videojs.ChaptersTrackMenuItem",t.Xa); $("videojs.TextTrackButton",t.Q);$("videojs.TextTrackMenuItem",t.$);$("videojs.OffTextTrackMenuItem",t.zb);$("videojs.CaptionSettingsMenuItem",t.sb);t.O.prototype.createItems=t.O.prototype.Ka;t.Q.prototype.createItems=t.Q.prototype.Ka;t.Wa.prototype.createItems=t.Wa.prototype.Ka;$("videojs.SubtitlesButton",t.$a);$("videojs.CaptionsButton",t.oa);$("videojs.ChaptersButton",t.Wa);$("videojs.MediaTechController",t.j);t.j.withSourceHandlers=t.j.dc;t.j.prototype.featuresVolumeControl=t.j.prototype.qf;t.j.prototype.featuresFullscreenResize=t.j.prototype.mf;t.j.prototype.featuresPlaybackRate=t.j.prototype.nf;t.j.prototype.featuresProgressEvents=t.j.prototype.of;t.j.prototype.featuresTimeupdateEvents=t.j.prototype.pf;t.j.prototype.setPoster=t.j.prototype.bd;t.j.prototype.textTracks=t.j.prototype.textTracks;t.j.prototype.remoteTextTracks=t.j.prototype.X;t.j.prototype.addTextTrack=t.j.prototype.addTextTrack;t.j.prototype.addRemoteTextTrack=t.j.prototype.ha;t.j.prototype.removeRemoteTextTrack=t.j.prototype.Da; $("videojs.Html5",t.f);t.f.Events=t.f.xb;t.f.isSupported=t.f.isSupported;t.f.canPlaySource=t.f.wc;t.f.patchCanPlayType=t.f.Tc;t.f.unpatchCanPlayType=t.f.Ye;t.f.prototype.setCurrentTime=t.f.prototype.Zb;t.f.prototype.setVolume=t.f.prototype.Oe;t.f.prototype.setMuted=t.f.prototype.Ke;t.f.prototype.setPreload=t.f.prototype.Me;t.f.prototype.setAutoplay=t.f.prototype.He;t.f.prototype.setLoop=t.f.prototype.Je;t.f.prototype.enterFullScreen=t.f.prototype.Ec;t.f.prototype.exitFullScreen=t.f.prototype.Ud;t.f.prototype.playbackRate=t.f.prototype.playbackRate;t.f.prototype.setPlaybackRate=t.f.prototype.Le;t.f.selectSourceHandler=t.f.ob;t.f.prototype.setSource=t.f.prototype.ma;t.f.prototype.disposeSourceHandler=t.f.prototype.ia;t.f.prototype.textTracks=t.f.prototype.textTracks;t.f.prototype.remoteTextTracks=t.f.prototype.X;t.f.prototype.addTextTrack=t.f.prototype.addTextTrack;t.f.prototype.addRemoteTextTrack=t.f.prototype.ha;t.f.prototype.removeRemoteTextTrack=t.f.prototype.Da;$("videojs.Flash",t.g);t.g.isSupported=t.g.isSupported;t.g.canPlaySource=t.g.wc;t.g.onReady=t.g.onReady;t.g.embed=t.g.Dc;t.g.version=t.g.version;t.g.prototype.setSource=t.g.prototype.ma;t.g.selectSourceHandler=t.g.ob;t.g.prototype.setSource=t.g.prototype.ma;t.g.prototype.disposeSourceHandler=t.g.prototype.ia;$("videojs.TextTrack",t.t);$("videojs.TextTrackList",t.F);$("videojs.TextTrackCueList",t.U);$("videojs.TextTrackSettings",t.pc);t.t.prototype.id=t.t.prototype.id;t.t.prototype.label=t.t.prototype.label;t.t.prototype.kind=t.t.prototype.Tb;t.t.prototype.mode=t.t.prototype.mode;t.t.prototype.cues=t.t.prototype.Ac;t.t.prototype.activeCues=t.t.prototype.jf;t.t.prototype.addCue=t.t.prototype.sc;t.t.prototype.removeCue=t.t.prototype.Yc;t.F.prototype.getTrackById=t.F.prototype.ae;t.U.prototype.getCueById=t.F.prototype.Zd;$("videojs.CaptionsTrack",t.cf);$("videojs.SubtitlesTrack",t.hf);$("videojs.ChaptersTrack",t.df);$("videojs.autoSetup",t.uc);$("videojs.plugin",t.Be);$("videojs.createTimeRange",t.xa); $("videojs.util",t.Z);t.Z.mergeOptions=t.Z.Aa;t.addLanguage=t.Gd;})();!function(a){var b=a.vttjs={},c=b.VTTCue,d=b.VTTRegion,e=a.VTTCue,f=a.VTTRegion;b.shim=function(){b.VTTCue=c,b.VTTRegion=d},b.restore=function(){b.VTTCue=e,b.VTTRegion=f}}(this),function(a,b){function c(a){if("string"!=typeof a)return!1;var b=h[a.toLowerCase()];return b?a.toLowerCase():!1}function d(a){if("string"!=typeof a)return!1;var b=i[a.toLowerCase()];return b?a.toLowerCase():!1}function e(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)a[d]=c[d]}return a}function f(a,b,f){var h=this,i=/MSIE\s8\.0/.test(navigator.userAgent),j={};i?h=document.createElement("custom"):j.enumerable=!0,h.hasBeenReset=!1;var k="",l=!1,m=a,n=b,o=f,p=null,q="",r=!0,s="auto",t="start",u=50,v="middle",w=50,x="middle";return Object.defineProperty(h,"id",e({},j,{get:function(){return k},set:function(a){k=""+a}})),Object.defineProperty(h,"pauseOnExit",e({},j,{get:function(){return l},set:function(a){l=!!a}})),Object.defineProperty(h,"startTime",e({},j,{get:function(){return m},set:function(a){if("number"!=typeof a)throw new TypeError("Start time must be set to a number.");m=a,this.hasBeenReset=!0}})),Object.defineProperty(h,"endTime",e({},j,{get:function(){return n},set:function(a){if("number"!=typeof a)throw new TypeError("End time must be set to a number.");n=a,this.hasBeenReset=!0}})),Object.defineProperty(h,"text",e({},j,{get:function(){return o},set:function(a){o=""+a,this.hasBeenReset=!0}})),Object.defineProperty(h,"region",e({},j,{get:function(){return p},set:function(a){p=a,this.hasBeenReset=!0}})),Object.defineProperty(h,"vertical",e({},j,{get:function(){return q},set:function(a){var b=c(a);if(b===!1)throw new SyntaxError("An invalid or illegal string was specified.");q=b,this.hasBeenReset=!0}})),Object.defineProperty(h,"snapToLines",e({},j,{get:function(){return r},set:function(a){r=!!a,this.hasBeenReset=!0}})),Object.defineProperty(h,"line",e({},j,{get:function(){return s},set:function(a){if("number"!=typeof a&&a!==g)throw new SyntaxError("An invalid number or illegal string was specified.");s=a,this.hasBeenReset=!0}})),Object.defineProperty(h,"lineAlign",e({},j,{get:function(){return t},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");t=b,this.hasBeenReset=!0}})),Object.defineProperty(h,"position",e({},j,{get:function(){return u},set:function(a){if(0>a||a>100)throw new Error("Position must be between 0 and 100.");u=a,this.hasBeenReset=!0}})),Object.defineProperty(h,"positionAlign",e({},j,{get:function(){return v},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");v=b,this.hasBeenReset=!0}})),Object.defineProperty(h,"size",e({},j,{get:function(){return w},set:function(a){if(0>a||a>100)throw new Error("Size must be between 0 and 100.");w=a,this.hasBeenReset=!0}})),Object.defineProperty(h,"align",e({},j,{get:function(){return x},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");x=b,this.hasBeenReset=!0}})),h.displayState=void 0,i?h:void 0}var g="auto",h={"":!0,lr:!0,rl:!0},i={start:!0,middle:!0,end:!0,left:!0,right:!0};f.prototype.getCueAsHTML=function(){return WebVTT.convertCueToDOMTree(window,this.text)},a.VTTCue=a.VTTCue||f,b.VTTCue=f}(this,this.vttjs||{}),function(a,b){function c(a){if("string"!=typeof a)return!1;var b=f[a.toLowerCase()];return b?a.toLowerCase():!1}function d(a){return"number"==typeof a&&a>=0&&100>=a}function e(){var a=100,b=3,e=0,f=100,g=0,h=100,i="";Object.defineProperties(this,{width:{enumerable:!0,get:function(){return a},set:function(b){if(!d(b))throw new Error("Width must be between 0 and 100.");a=b}},lines:{enumerable:!0,get:function(){return b},set:function(a){if("number"!=typeof a)throw new TypeError("Lines must be set to a number.");b=a}},regionAnchorY:{enumerable:!0,get:function(){return f},set:function(a){if(!d(a))throw new Error("RegionAnchorX must be between 0 and 100.");f=a}},regionAnchorX:{enumerable:!0,get:function(){return e},set:function(a){if(!d(a))throw new Error("RegionAnchorY must be between 0 and 100.");e=a}},viewportAnchorY:{enumerable:!0,get:function(){return h},set:function(a){if(!d(a))throw new Error("ViewportAnchorY must be between 0 and 100.");h=a}},viewportAnchorX:{enumerable:!0,get:function(){return g},set:function(a){if(!d(a))throw new Error("ViewportAnchorX must be between 0 and 100.");g=a}},scroll:{enumerable:!0,get:function(){return i},set:function(a){var b=c(a);if(b===!1)throw new SyntaxError("An invalid or illegal string was specified.");i=b}}})}var f={"":!0,up:!0};a.VTTRegion=a.VTTRegion||e,b.VTTRegion=e}(this,this.vttjs||{}),function(a){function b(a,b){this.name="ParsingError",this.code=a.code,this.message=b||a.message}function c(a){function b(a,b,c,d){return 3600*(0|a)+60*(0|b)+(0|c)+(0|d)/1e3}var c=a.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);return c?c[3]?b(c[1],c[2],c[3].replace(":",""),c[4]):c[1]>59?b(c[1],c[2],0,c[4]):b(0,c[1],c[2],c[4]):null}function d(){this.values=o(null)}function e(a,b,c,d){var e=d?a.split(d):[a];for(var f in e)if("string"==typeof e[f]){var g=e[f].split(c);if(2===g.length){var h=g[0],i=g[1];b(h,i)}}}function f(a,f,g){function h(){var d=c(a);if(null===d)throw new b(b.Errors.BadTimeStamp,"Malformed timestamp: "+k);return a=a.replace(/^[^\sa-zA-Z-]+/,""),d}function i(a,b){var c=new d;e(a,function(a,b){switch(a){case"region":for(var d=g.length-1;d>=0;d--)if(g[d].id===b){c.set(a,g[d].region);break}break;case"vertical":c.alt(a,b,["rl","lr"]);break;case"line":var e=b.split(","),f=e[0];c.integer(a,f),c.percent(a,f)?c.set("snapToLines",!1):null,c.alt(a,f,["auto"]),2===e.length&&c.alt("lineAlign",e[1],["start","middle","end"]);break;case"position":e=b.split(","),c.percent(a,e[0]),2===e.length&&c.alt("positionAlign",e[1],["start","middle","end"]);break;case"size":c.percent(a,b);break;case"align":c.alt(a,b,["start","middle","end","left","right"])}},/:/,/\s/),b.region=c.get("region",null),b.vertical=c.get("vertical",""),b.line=c.get("line","auto"),b.lineAlign=c.get("lineAlign","start"),b.snapToLines=c.get("snapToLines",!0),b.size=c.get("size",100),b.align=c.get("align","middle"),b.position=c.get("position",{start:0,left:0,middle:50,end:100,right:100},b.align),b.positionAlign=c.get("positionAlign",{start:"start",left:"start",middle:"middle",end:"end",right:"end"},b.align)}function j(){a=a.replace(/^\s+/,"")}var k=a;if(j(),f.startTime=h(),j(),"-->"!==a.substr(0,3))throw new b(b.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '-->'): "+k);a=a.substr(3),j(),f.endTime=h(),j(),i(a,f)}function g(a,b){function d(){function a(a){return b=b.substr(a.length),a}if(!b)return null;var c=b.match(/^([^<]*)(<[^>]+>?)?/);return a(c[1]?c[1]:c[2])}function e(a){return p[a]}function f(a){for(;o=a.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);)a=a.replace(o[0],e);return a}function g(a,b){return!s[b.localName]||s[b.localName]===a.localName}function h(b,c){var d=q[b];if(!d)return null;var e=a.document.createElement(d);e.localName=d;var f=r[b];return f&&c&&(e[f]=c.trim()),e}for(var i,j=a.document.createElement("div"),k=j,l=[];null!==(i=d());)if("<"!==i[0])k.appendChild(a.document.createTextNode(f(i)));else{if("/"===i[1]){l.length&&l[l.length-1]===i.substr(2).replace(">","")&&(l.pop(),k=k.parentNode);continue}var m,n=c(i.substr(1,i.length-2));if(n){m=a.document.createProcessingInstruction("timestamp",n),k.appendChild(m);continue}var o=i.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);if(!o)continue;if(m=h(o[1],o[3]),!m)continue;if(!g(k,m))continue;o[2]&&(m.className=o[2].substr(1).replace("."," ")),l.push(o[1]),k.appendChild(m),k=m}return j}function h(a){function b(a,b){for(var c=b.childNodes.length-1;c>=0;c--)a.push(b.childNodes[c])}function c(a){if(!a||!a.length)return null;var d=a.pop(),e=d.textContent||d.innerText;if(e){var f=e.match(/^.*(\n|\r)/);return f?(a.length=0,f[0]):e}return"ruby"===d.tagName?c(a):d.childNodes?(b(a,d),c(a)):void 0}var d,e=[],f="";if(!a||!a.childNodes)return"ltr";for(b(e,a);f=c(e);)for(var g=0;g<f.length;g++){d=f.charCodeAt(g);for(var h=0;h<t.length;h++)if(t[h]===d)return"rtl"}return"ltr"}function i(a){if("number"==typeof a.line&&(a.snapToLines||a.line>=0&&a.line<=100))return a.line;if(!a.track||!a.track.textTrackList||!a.track.textTrackList.mediaElement)return-1;for(var b=a.track,c=b.textTrackList,d=0,e=0;e<c.length&&c[e]!==b;e++)"showing"===c[e].mode&&d++;return-1*++d}function j(){}function k(a,b,c){var d=/MSIE\s8\.0/.test(navigator.userAgent),e="rgba(255, 255, 255, 1)",f="rgba(0, 0, 0, 0.8)";d&&(e="rgb(255, 255, 255)",f="rgb(0, 0, 0)"),j.call(this),this.cue=b,this.cueDiv=g(a,b.text);var i={color:e,backgroundColor:f,position:"relative",left:0,right:0,top:0,bottom:0,display:"inline"};d||(i.writingMode=""===b.vertical?"horizontal-tb":"lr"===b.vertical?"vertical-lr":"vertical-rl",i.unicodeBidi="plaintext"),this.applyStyles(i,this.cueDiv),this.div=a.document.createElement("div"),i={textAlign:"middle"===b.align?"center":b.align,font:c.font,whiteSpace:"pre-line",position:"absolute"},d||(i.direction=h(this.cueDiv),i.writingMode=""===b.vertical?"horizontal-tb":"lr"===b.vertical?"vertical-lr":"vertical-rl".stylesunicodeBidi="plaintext"),this.applyStyles(i),this.div.appendChild(this.cueDiv);var k=0;switch(b.positionAlign){case"start":k=b.position;break;case"middle":k=b.position-b.size/2;break;case"end":k=b.position-b.size}this.applyStyles(""===b.vertical?{left:this.formatStyle(k,"%"),width:this.formatStyle(b.size,"%")}:{top:this.formatStyle(k,"%"),height:this.formatStyle(b.size,"%")}),this.move=function(a){this.applyStyles({top:this.formatStyle(a.top,"px"),bottom:this.formatStyle(a.bottom,"px"),left:this.formatStyle(a.left,"px"),right:this.formatStyle(a.right,"px"),height:this.formatStyle(a.height,"px"),width:this.formatStyle(a.width,"px")})}}function l(a){var b,c,d,e,f=/MSIE\s8\.0/.test(navigator.userAgent);if(a.div){c=a.div.offsetHeight,d=a.div.offsetWidth,e=a.div.offsetTop;var g=(g=a.div.childNodes)&&(g=g[0])&&g.getClientRects&&g.getClientRects();a=a.div.getBoundingClientRect(),b=g?Math.max(g[0]&&g[0].height||0,a.height/g.length):0}this.left=a.left,this.right=a.right,this.top=a.top||e,this.height=a.height||c,this.bottom=a.bottom||e+(a.height||c),this.width=a.width||d,this.lineHeight=void 0!==b?b:a.lineHeight,f&&!this.lineHeight&&(this.lineHeight=13)}function m(a,b,c,d){function e(a,b){for(var e,f=new l(a),g=1,h=0;h<b.length;h++){for(;a.overlapsOppositeAxis(c,b[h])||a.within(c)&&a.overlapsAny(d);)a.move(b[h]);if(a.within(c))return a;var i=a.intersectPercentage(c);g>i&&(e=new l(a),g=i),a=new l(f)}return e||f}var f=new l(b),g=b.cue,h=i(g),j=[];if(g.snapToLines){var k;switch(g.vertical){case"":j=["+y","-y"],k="height";break;case"rl":j=["+x","-x"],k="width";break;case"lr":j=["-x","+x"],k="width"}var m=f.lineHeight,n=m*Math.round(h),o=c[k]+m,p=j[0];Math.abs(n)>o&&(n=0>n?-1:1,n*=Math.ceil(o/m)*m),0>h&&(n+=""===g.vertical?c.height:c.width,j=j.reverse()),f.move(p,n)}else{var q=f.lineHeight/c.height*100;switch(g.lineAlign){case"middle":h-=q/2;break;case"end":h-=q}switch(g.vertical){case"":b.applyStyles({top:b.formatStyle(h,"%")});break;case"rl":b.applyStyles({left:b.formatStyle(h,"%")});break;case"lr":b.applyStyles({right:b.formatStyle(h,"%")})}j=["+y","-x","+x","-y"],f=new l(b)}var r=e(f,j);b.move(r.toCSSCompatValues(c))}function n(){}var o=Object.create||function(){function a(){}return function(b){if(1!==arguments.length)throw new Error("Object.create shim only accepts one parameter.");return a.prototype=b,new a}}();b.prototype=o(Error.prototype),b.prototype.constructor=b,b.Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}},d.prototype={set:function(a,b){this.get(a)||""===b||(this.values[a]=b)},get:function(a,b,c){return c?this.has(a)?this.values[a]:b[c]:this.has(a)?this.values[a]:b},has:function(a){return a in this.values},alt:function(a,b,c){for(var d=0;d<c.length;++d)if(b===c[d]){this.set(a,b);break}},integer:function(a,b){/^-?\d+$/.test(b)&&this.set(a,parseInt(b,10))},percent:function(a,b){var c;return(c=b.match(/^([\d]{1,3})(\.[\d]*)?%$/))&&(b=parseFloat(b),b>=0&&100>=b)?(this.set(a,b),!0):!1}};var p={"&amp;":"&","&lt;":"<","&gt;":">","&lrm;":"‎","&rlm;":"‏","&nbsp;":" "},q={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},r={v:"title",lang:"lang"},s={rt:"ruby"},t=[1470,1472,1475,1478,1488,1489,1490,1491,1492,1493,1494,1495,1496,1497,1498,1499,1500,1501,1502,1503,1504,1505,1506,1507,1508,1509,1510,1511,1512,1513,1514,1520,1521,1522,1523,1524,1544,1547,1549,1563,1566,1567,1568,1569,1570,1571,1572,1573,1574,1575,1576,1577,1578,1579,1580,1581,1582,1583,1584,1585,1586,1587,1588,1589,1590,1591,1592,1593,1594,1595,1596,1597,1598,1599,1600,1601,1602,1603,1604,1605,1606,1607,1608,1609,1610,1645,1646,1647,1649,1650,1651,1652,1653,1654,1655,1656,1657,1658,1659,1660,1661,1662,1663,1664,1665,1666,1667,1668,1669,1670,1671,1672,1673,1674,1675,1676,1677,1678,1679,1680,1681,1682,1683,1684,1685,1686,1687,1688,1689,1690,1691,1692,1693,1694,1695,1696,1697,1698,1699,1700,1701,1702,1703,1704,1705,1706,1707,1708,1709,1710,1711,1712,1713,1714,1715,1716,1717,1718,1719,1720,1721,1722,1723,1724,1725,1726,1727,1728,1729,1730,1731,1732,1733,1734,1735,1736,1737,1738,1739,1740,1741,1742,1743,1744,1745,1746,1747,1748,1749,1765,1766,1774,1775,1786,1787,1788,1789,1790,1791,1792,1793,1794,1795,1796,1797,1798,1799,1800,1801,1802,1803,1804,1805,1807,1808,1810,1811,1812,1813,1814,1815,1816,1817,1818,1819,1820,1821,1822,1823,1824,1825,1826,1827,1828,1829,1830,1831,1832,1833,1834,1835,1836,1837,1838,1839,1869,1870,1871,1872,1873,1874,1875,1876,1877,1878,1879,1880,1881,1882,1883,1884,1885,1886,1887,1888,1889,1890,1891,1892,1893,1894,1895,1896,1897,1898,1899,1900,1901,1902,1903,1904,1905,1906,1907,1908,1909,1910,1911,1912,1913,1914,1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1969,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2e3,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2036,2037,2042,2048,2049,2050,2051,2052,2053,2054,2055,2056,2057,2058,2059,2060,2061,2062,2063,2064,2065,2066,2067,2068,2069,2074,2084,2088,2096,2097,2098,2099,2100,2101,2102,2103,2104,2105,2106,2107,2108,2109,2110,2112,2113,2114,2115,2116,2117,2118,2119,2120,2121,2122,2123,2124,2125,2126,2127,2128,2129,2130,2131,2132,2133,2134,2135,2136,2142,2208,2210,2211,2212,2213,2214,2215,2216,2217,2218,2219,2220,8207,64285,64287,64288,64289,64290,64291,64292,64293,64294,64295,64296,64298,64299,64300,64301,64302,64303,64304,64305,64306,64307,64308,64309,64310,64312,64313,64314,64315,64316,64318,64320,64321,64323,64324,64326,64327,64328,64329,64330,64331,64332,64333,64334,64335,64336,64337,64338,64339,64340,64341,64342,64343,64344,64345,64346,64347,64348,64349,64350,64351,64352,64353,64354,64355,64356,64357,64358,64359,64360,64361,64362,64363,64364,64365,64366,64367,64368,64369,64370,64371,64372,64373,64374,64375,64376,64377,64378,64379,64380,64381,64382,64383,64384,64385,64386,64387,64388,64389,64390,64391,64392,64393,64394,64395,64396,64397,64398,64399,64400,64401,64402,64403,64404,64405,64406,64407,64408,64409,64410,64411,64412,64413,64414,64415,64416,64417,64418,64419,64420,64421,64422,64423,64424,64425,64426,64427,64428,64429,64430,64431,64432,64433,64434,64435,64436,64437,64438,64439,64440,64441,64442,64443,64444,64445,64446,64447,64448,64449,64467,64468,64469,64470,64471,64472,64473,64474,64475,64476,64477,64478,64479,64480,64481,64482,64483,64484,64485,64486,64487,64488,64489,64490,64491,64492,64493,64494,64495,64496,64497,64498,64499,64500,64501,64502,64503,64504,64505,64506,64507,64508,64509,64510,64511,64512,64513,64514,64515,64516,64517,64518,64519,64520,64521,64522,64523,64524,64525,64526,64527,64528,64529,64530,64531,64532,64533,64534,64535,64536,64537,64538,64539,64540,64541,64542,64543,64544,64545,64546,64547,64548,64549,64550,64551,64552,64553,64554,64555,64556,64557,64558,64559,64560,64561,64562,64563,64564,64565,64566,64567,64568,64569,64570,64571,64572,64573,64574,64575,64576,64577,64578,64579,64580,64581,64582,64583,64584,64585,64586,64587,64588,64589,64590,64591,64592,64593,64594,64595,64596,64597,64598,64599,64600,64601,64602,64603,64604,64605,64606,64607,64608,64609,64610,64611,64612,64613,64614,64615,64616,64617,64618,64619,64620,64621,64622,64623,64624,64625,64626,64627,64628,64629,64630,64631,64632,64633,64634,64635,64636,64637,64638,64639,64640,64641,64642,64643,64644,64645,64646,64647,64648,64649,64650,64651,64652,64653,64654,64655,64656,64657,64658,64659,64660,64661,64662,64663,64664,64665,64666,64667,64668,64669,64670,64671,64672,64673,64674,64675,64676,64677,64678,64679,64680,64681,64682,64683,64684,64685,64686,64687,64688,64689,64690,64691,64692,64693,64694,64695,64696,64697,64698,64699,64700,64701,64702,64703,64704,64705,64706,64707,64708,64709,64710,64711,64712,64713,64714,64715,64716,64717,64718,64719,64720,64721,64722,64723,64724,64725,64726,64727,64728,64729,64730,64731,64732,64733,64734,64735,64736,64737,64738,64739,64740,64741,64742,64743,64744,64745,64746,64747,64748,64749,64750,64751,64752,64753,64754,64755,64756,64757,64758,64759,64760,64761,64762,64763,64764,64765,64766,64767,64768,64769,64770,64771,64772,64773,64774,64775,64776,64777,64778,64779,64780,64781,64782,64783,64784,64785,64786,64787,64788,64789,64790,64791,64792,64793,64794,64795,64796,64797,64798,64799,64800,64801,64802,64803,64804,64805,64806,64807,64808,64809,64810,64811,64812,64813,64814,64815,64816,64817,64818,64819,64820,64821,64822,64823,64824,64825,64826,64827,64828,64829,64848,64849,64850,64851,64852,64853,64854,64855,64856,64857,64858,64859,64860,64861,64862,64863,64864,64865,64866,64867,64868,64869,64870,64871,64872,64873,64874,64875,64876,64877,64878,64879,64880,64881,64882,64883,64884,64885,64886,64887,64888,64889,64890,64891,64892,64893,64894,64895,64896,64897,64898,64899,64900,64901,64902,64903,64904,64905,64906,64907,64908,64909,64910,64911,64914,64915,64916,64917,64918,64919,64920,64921,64922,64923,64924,64925,64926,64927,64928,64929,64930,64931,64932,64933,64934,64935,64936,64937,64938,64939,64940,64941,64942,64943,64944,64945,64946,64947,64948,64949,64950,64951,64952,64953,64954,64955,64956,64957,64958,64959,64960,64961,64962,64963,64964,64965,64966,64967,65008,65009,65010,65011,65012,65013,65014,65015,65016,65017,65018,65019,65020,65136,65137,65138,65139,65140,65142,65143,65144,65145,65146,65147,65148,65149,65150,65151,65152,65153,65154,65155,65156,65157,65158,65159,65160,65161,65162,65163,65164,65165,65166,65167,65168,65169,65170,65171,65172,65173,65174,65175,65176,65177,65178,65179,65180,65181,65182,65183,65184,65185,65186,65187,65188,65189,65190,65191,65192,65193,65194,65195,65196,65197,65198,65199,65200,65201,65202,65203,65204,65205,65206,65207,65208,65209,65210,65211,65212,65213,65214,65215,65216,65217,65218,65219,65220,65221,65222,65223,65224,65225,65226,65227,65228,65229,65230,65231,65232,65233,65234,65235,65236,65237,65238,65239,65240,65241,65242,65243,65244,65245,65246,65247,65248,65249,65250,65251,65252,65253,65254,65255,65256,65257,65258,65259,65260,65261,65262,65263,65264,65265,65266,65267,65268,65269,65270,65271,65272,65273,65274,65275,65276,67584,67585,67586,67587,67588,67589,67592,67594,67595,67596,67597,67598,67599,67600,67601,67602,67603,67604,67605,67606,67607,67608,67609,67610,67611,67612,67613,67614,67615,67616,67617,67618,67619,67620,67621,67622,67623,67624,67625,67626,67627,67628,67629,67630,67631,67632,67633,67634,67635,67636,67637,67639,67640,67644,67647,67648,67649,67650,67651,67652,67653,67654,67655,67656,67657,67658,67659,67660,67661,67662,67663,67664,67665,67666,67667,67668,67669,67671,67672,67673,67674,67675,67676,67677,67678,67679,67840,67841,67842,67843,67844,67845,67846,67847,67848,67849,67850,67851,67852,67853,67854,67855,67856,67857,67858,67859,67860,67861,67862,67863,67864,67865,67866,67867,67872,67873,67874,67875,67876,67877,67878,67879,67880,67881,67882,67883,67884,67885,67886,67887,67888,67889,67890,67891,67892,67893,67894,67895,67896,67897,67903,67968,67969,67970,67971,67972,67973,67974,67975,67976,67977,67978,67979,67980,67981,67982,67983,67984,67985,67986,67987,67988,67989,67990,67991,67992,67993,67994,67995,67996,67997,67998,67999,68e3,68001,68002,68003,68004,68005,68006,68007,68008,68009,68010,68011,68012,68013,68014,68015,68016,68017,68018,68019,68020,68021,68022,68023,68030,68031,68096,68112,68113,68114,68115,68117,68118,68119,68121,68122,68123,68124,68125,68126,68127,68128,68129,68130,68131,68132,68133,68134,68135,68136,68137,68138,68139,68140,68141,68142,68143,68144,68145,68146,68147,68160,68161,68162,68163,68164,68165,68166,68167,68176,68177,68178,68179,68180,68181,68182,68183,68184,68192,68193,68194,68195,68196,68197,68198,68199,68200,68201,68202,68203,68204,68205,68206,68207,68208,68209,68210,68211,68212,68213,68214,68215,68216,68217,68218,68219,68220,68221,68222,68223,68352,68353,68354,68355,68356,68357,68358,68359,68360,68361,68362,68363,68364,68365,68366,68367,68368,68369,68370,68371,68372,68373,68374,68375,68376,68377,68378,68379,68380,68381,68382,68383,68384,68385,68386,68387,68388,68389,68390,68391,68392,68393,68394,68395,68396,68397,68398,68399,68400,68401,68402,68403,68404,68405,68416,68417,68418,68419,68420,68421,68422,68423,68424,68425,68426,68427,68428,68429,68430,68431,68432,68433,68434,68435,68436,68437,68440,68441,68442,68443,68444,68445,68446,68447,68448,68449,68450,68451,68452,68453,68454,68455,68456,68457,68458,68459,68460,68461,68462,68463,68464,68465,68466,68472,68473,68474,68475,68476,68477,68478,68479,68608,68609,68610,68611,68612,68613,68614,68615,68616,68617,68618,68619,68620,68621,68622,68623,68624,68625,68626,68627,68628,68629,68630,68631,68632,68633,68634,68635,68636,68637,68638,68639,68640,68641,68642,68643,68644,68645,68646,68647,68648,68649,68650,68651,68652,68653,68654,68655,68656,68657,68658,68659,68660,68661,68662,68663,68664,68665,68666,68667,68668,68669,68670,68671,68672,68673,68674,68675,68676,68677,68678,68679,68680,126464,126465,126466,126467,126469,126470,126471,126472,126473,126474,126475,126476,126477,126478,126479,126480,126481,126482,126483,126484,126485,126486,126487,126488,126489,126490,126491,126492,126493,126494,126495,126497,126498,126500,126503,126505,126506,126507,126508,126509,126510,126511,126512,126513,126514,126516,126517,126518,126519,126521,126523,126530,126535,126537,126539,126541,126542,126543,126545,126546,126548,126551,126553,126555,126557,126559,126561,126562,126564,126567,126568,126569,126570,126572,126573,126574,126575,126576,126577,126578,126580,126581,126582,126583,126585,126586,126587,126588,126590,126592,126593,126594,126595,126596,126597,126598,126599,126600,126601,126603,126604,126605,126606,126607,126608,126609,126610,126611,126612,126613,126614,126615,126616,126617,126618,126619,126625,126626,126627,126629,126630,126631,126632,126633,126635,126636,126637,126638,126639,126640,126641,126642,126643,126644,126645,126646,126647,126648,126649,126650,126651,1114109];j.prototype.applyStyles=function(a,b){b=b||this.div;for(var c in a)a.hasOwnProperty(c)&&(b.style[c]=a[c])},j.prototype.formatStyle=function(a,b){return 0===a?0:a+b},k.prototype=o(j.prototype),k.prototype.constructor=k,l.prototype.move=function(a,b){switch(b=void 0!==b?b:this.lineHeight,a){case"+x":this.left+=b,this.right+=b;break;case"-x":this.left-=b,this.right-=b;break;case"+y":this.top+=b,this.bottom+=b;break;case"-y":this.top-=b,this.bottom-=b}},l.prototype.overlaps=function(a){return this.left<a.right&&this.right>a.left&&this.top<a.bottom&&this.bottom>a.top},l.prototype.overlapsAny=function(a){for(var b=0;b<a.length;b++)if(this.overlaps(a[b]))return!0;return!1},l.prototype.within=function(a){return this.top>=a.top&&this.bottom<=a.bottom&&this.left>=a.left&&this.right<=a.right},l.prototype.overlapsOppositeAxis=function(a,b){switch(b){case"+x":return this.left<a.left;case"-x":return this.right>a.right;case"+y":return this.top<a.top;case"-y":return this.bottom>a.bottom}},l.prototype.intersectPercentage=function(a){var b=Math.max(0,Math.min(this.right,a.right)-Math.max(this.left,a.left)),c=Math.max(0,Math.min(this.bottom,a.bottom)-Math.max(this.top,a.top)),d=b*c;return d/(this.height*this.width)},l.prototype.toCSSCompatValues=function(a){return{top:this.top-a.top,bottom:a.bottom-this.bottom,left:this.left-a.left,right:a.right-this.right,height:this.height,width:this.width}},l.getSimpleBoxPosition=function(a){var b=a.div?a.div.offsetHeight:a.tagName?a.offsetHeight:0,c=a.div?a.div.offsetWidth:a.tagName?a.offsetWidth:0,d=a.div?a.div.offsetTop:a.tagName?a.offsetTop:0;a=a.div?a.div.getBoundingClientRect():a.tagName?a.getBoundingClientRect():a;var e={left:a.left,right:a.right,top:a.top||d,height:a.height||b,bottom:a.bottom||d+(a.height||b),width:a.width||c};return e},n.StringDecoder=function(){return{decode:function(a){if(!a)return"";if("string"!=typeof a)throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(a))}}},n.convertCueToDOMTree=function(a,b){return a&&b?g(a,b):null};var u=.05,v="sans-serif",w="1.5%";n.processCues=function(a,b,c){function d(a){for(var b=0;b<a.length;b++)if(a[b].hasBeenReset||!a[b].displayState)return!0;return!1}if(!a||!b||!c)return null;for(;c.firstChild;)c.removeChild(c.firstChild);var e=a.document.createElement("div");if(e.style.position="absolute",e.style.left="0",e.style.right="0",e.style.top="0",e.style.bottom="0",e.style.margin=w,c.appendChild(e),d(b)){var f=[],g=l.getSimpleBoxPosition(e),h=Math.round(g.height*u*100)/100,i={font:h+"px "+v};!function(){for(var c,d,h=0;h<b.length;h++)d=b[h],c=new k(a,d,i),e.appendChild(c.div),m(a,c,g,f),d.displayState=c.div,f.push(l.getSimpleBoxPosition(c))}()}else for(var j=0;j<b.length;j++)e.appendChild(b[j].displayState)},n.Parser=function(a,b,c){c||(c=b,b={}),b||(b={}),this.window=a,this.vttjs=b,this.state="INITIAL",this.buffer="",this.decoder=c||new TextDecoder("utf8"),this.regionList=[]},n.Parser.prototype={reportOrThrowError:function(a){if(!(a instanceof b))throw a;this.onparsingerror&&this.onparsingerror(a)},parse:function(a){function c(){for(var a=i.buffer,b=0;b<a.length&&"\r"!==a[b]&&"\n"!==a[b];)++b;var c=a.substr(0,b);return"\r"===a[b]&&++b,"\n"===a[b]&&++b,i.buffer=a.substr(b),c}function g(a){var b=new d;if(e(a,function(a,c){switch(a){case"id":b.set(a,c);break;case"width":b.percent(a,c);break;case"lines":b.integer(a,c);break;case"regionanchor":case"viewportanchor":var e=c.split(",");if(2!==e.length)break;var f=new d;if(f.percent("x",e[0]),f.percent("y",e[1]),!f.has("x")||!f.has("y"))break;b.set(a+"X",f.get("x")),b.set(a+"Y",f.get("y"));break;case"scroll":b.alt(a,c,["up"])}},/=/,/\s/),b.has("id")){var c=new(i.vttjs.VTTRegion||i.window.VTTRegion);c.width=b.get("width",100),c.lines=b.get("lines",3),c.regionAnchorX=b.get("regionanchorX",0),c.regionAnchorY=b.get("regionanchorY",100),c.viewportAnchorX=b.get("viewportanchorX",0),c.viewportAnchorY=b.get("viewportanchorY",100),c.scroll=b.get("scroll",""),i.onregion&&i.onregion(c),i.regionList.push({id:b.get("id"),region:c})}}function h(a){e(a,function(a,b){switch(a){case"Region":g(b)}},/:/)}var i=this;a&&(i.buffer+=i.decoder.decode(a,{stream:!0}));try{var j;if("INITIAL"===i.state){if(!/\r\n|\n/.test(i.buffer))return this;j=c();var k=j.match(/^WEBVTT([ \t].*)?$/);if(!k||!k[0])throw new b(b.Errors.BadSignature);i.state="HEADER"}for(var l=!1;i.buffer;){if(!/\r\n|\n/.test(i.buffer))return this;switch(l?l=!1:j=c(),i.state){case"HEADER":/:/.test(j)?h(j):j||(i.state="ID");continue;case"NOTE":j||(i.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(j)){i.state="NOTE";break}if(!j)continue;if(i.cue=new(i.vttjs.VTTCue||i.window.VTTCue)(0,0,""),i.state="CUE",-1===j.indexOf("-->")){i.cue.id=j;continue}case"CUE":try{f(j,i.cue,i.regionList)}catch(m){i.reportOrThrowError(m),i.cue=null,i.state="BADCUE";continue}i.state="CUETEXT";continue;case"CUETEXT":var n=-1!==j.indexOf("-->");if(!j||n&&(l=!0)){i.oncue&&i.oncue(i.cue),i.cue=null,i.state="ID";continue}i.cue.text&&(i.cue.text+="\n"),i.cue.text+=j;continue;case"BADCUE":j||(i.state="ID");continue}}}catch(m){i.reportOrThrowError(m),"CUETEXT"===i.state&&i.cue&&i.oncue&&i.oncue(i.cue),i.cue=null,i.state="INITIAL"===i.state?"BADWEBVTT":"BADCUE"}return this},flush:function(){var a=this;try{if(a.buffer+=a.decoder.decode(),(a.cue||"HEADER"===a.state)&&(a.buffer+="\n\n",a.parse()),"INITIAL"===a.state)throw new b(b.Errors.BadSignature)}catch(c){a.reportOrThrowError(c)}return a.onflush&&a.onflush(),this}},a.WebVTT=n}(this,this.vttjs||{}); (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();
Object.defineProperty(exports, "__esModule", {
	value: true
});
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}
var IVPAIDAdUnit = exports.IVPAIDAdUnit = function () {
	function IVPAIDAdUnit() {
		_classCallCheck(this, IVPAIDAdUnit);
	}
	_createClass(IVPAIDAdUnit, [{
		key: 'handshakeVersion',
		value: function handshakeVersion() {
			var playerVPAIDVersion = arguments.length <= 0 || arguments[0] === undefined ? '2.0' : arguments[0];
			var callback = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
		}
	}, {
		key: 'initAd',
		value: function initAd(width, height, viewMode, desiredBitrate) {
			var creativeData = arguments.length <= 4 || arguments[4] === undefined ? { AdParameters: '' } : arguments[4];
			var environmentVars = arguments.length <= 5 || arguments[5] === undefined ? { flashVars: '' } : arguments[5];
			var callback = arguments.length <= 6 || arguments[6] === undefined ? undefined : arguments[6];
		}
	}, {
		key: 'resizeAd',
		value: function resizeAd(width, height, viewMode) {
			var callback = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];
		}
	}, {
		key: 'startAd',
		value: function startAd() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
		}
	}, {
		key: 'stopAd',
		value: function stopAd() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
		}
	}, {
		key: 'pauseAd',
		value: function pauseAd() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
		}
	}, {
		key: 'resumeAd',
		value: function resumeAd() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
		}
	}, {
		key: 'expandAd',
		value: function expandAd() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
		}
	}, {
		key: 'collapseAd',
		value: function collapseAd() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
		}
	}, {
		key: 'skipAd',
		value: function skipAd() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
		}
	}, {
		key: 'getAdLinear',
		value: function getAdLinear(callback) {}
	}, {
		key: 'getAdWidth',
		value: function getAdWidth(callback) {}
	}, {
		key: 'getAdHeight',
		value: function getAdHeight(callback) {}
	}, {
		key: 'getAdExpanded',
		value: function getAdExpanded(callback) {}
	}, {
		key: 'getAdSkippableState',
		value: function getAdSkippableState(callback) {}
	}, {
		key: 'getAdRemainingTime',
		value: function getAdRemainingTime(callback) {}
	}, {
		key: 'getAdDuration',
		value: function getAdDuration(callback) {}
	}, {
		key: 'setAdVolume',
		value: function setAdVolume(soundVolume) {
			var callback = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
		}
	}, {
		key: 'getAdVolume',
		value: function getAdVolume(callback) {}
	}, {
		key: 'getAdCompanions',
		value: function getAdCompanions(callback) {}
	}, {
		key: 'getAdIcons',
		value: function getAdIcons(callback) {}
	}]);
	return IVPAIDAdUnit;
}();
Object.defineProperty(IVPAIDAdUnit, 'EVENTS', {
	writable: false,
	configurable: false,
	value: ['AdLoaded', 'AdStarted', 'AdStopped', 'AdSkipped', 'AdSkippableStateChange',
	'AdSizeChange',
	'AdLinearChange', 'AdDurationChange',
	'AdExpandedChange', 'AdRemainingTimeChange',
	'AdVolumeChange', 'AdImpression', 'AdVideoStart', 'AdVideoFirstQuartile', 'AdVideoMidpoint', 'AdVideoThirdQuartile', 'AdVideoComplete', 'AdClickThru', 'AdInteraction',
	'AdUserAcceptInvitation', 'AdUserMinimize', 'AdUserClose', 'AdPaused', 'AdPlaying', 'AdLog', 'AdError']
});
},{}],2:[function(require,module,exports){
'use strict';
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();
Object.defineProperty(exports, "__esModule", {
	value: true
});
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}
function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var IVPAIDAdUnit = require('./IVPAIDAdUnit').IVPAIDAdUnit;
var ALL_VPAID_METHODS = Object.getOwnPropertyNames(IVPAIDAdUnit.prototype).filter(function (property) {
	return ['constructor'].indexOf(property) === -1;
});
var VPAIDAdUnit = exports.VPAIDAdUnit = function (_IVPAIDAdUnit) {
	_inherits(VPAIDAdUnit, _IVPAIDAdUnit);
	function VPAIDAdUnit(flash) {
		_classCallCheck(this, VPAIDAdUnit);
		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VPAIDAdUnit).call(this));
		_this._destroyed = false;
		_this._flash = flash;
		return _this;
	}
	_createClass(VPAIDAdUnit, [{
		key: '_destroy',
		value: function _destroy() {
			var _this2 = this;
			this._destroyed = true;
			ALL_VPAID_METHODS.forEach(function (methodName) {
				_this2._flash.removeCallbackByMethodName(methodName);
			});
			IVPAIDAdUnit.EVENTS.forEach(function (event) {
				_this2._flash.offEvent(event);
			});
			this._flash = null;
		}
	}, {
		key: 'isDestroyed',
		value: function isDestroyed() {
			return this._destroyed;
		}
	}, {
		key: 'on',
		value: function on(eventName, callback) {
			this._flash.on(eventName, callback);
		}
	}, {
		key: 'off',
		value: function off(eventName, callback) {
			this._flash.off(eventName, callback);
		}
	}, {
		key: 'handshakeVersion',
		value: function handshakeVersion() {
			var playerVPAIDVersion = arguments.length <= 0 || arguments[0] === undefined ? '2.0' : arguments[0];
			var callback = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
			this._flash.callFlashMethod('handshakeVersion', [playerVPAIDVersion], callback);
		}
	}, {
		key: 'initAd',
		value: function initAd(width, height, viewMode, desiredBitrate) {
			var creativeData = arguments.length <= 4 || arguments[4] === undefined ? { AdParameters: '' } : arguments[4];
			var environmentVars = arguments.length <= 5 || arguments[5] === undefined ? { flashVars: '' } : arguments[5];
			var callback = arguments.length <= 6 || arguments[6] === undefined ? undefined : arguments[6];
			this._flash.setSize(width, height);
			creativeData = creativeData || { AdParameters: '' };
			environmentVars = environmentVars || { flashVars: '' };
			this._flash.callFlashMethod('initAd', [this._flash.getWidth(), this._flash.getHeight(), viewMode, desiredBitrate, creativeData.AdParameters || '', environmentVars.flashVars || ''], callback);
		}
	}, {
		key: 'resizeAd',
		value: function resizeAd(width, height, viewMode) {
			var callback = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];
			this._flash.setSize(width, height);
			this._flash.callFlashMethod('resizeAd', [this._flash.getWidth(), this._flash.getHeight(), viewMode], callback);
		}
	}, {
		key: 'startAd',
		value: function startAd() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
			this._flash.callFlashMethod('startAd', [], callback);
		}
	}, {
		key: 'stopAd',
		value: function stopAd() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
			this._flash.callFlashMethod('stopAd', [], callback);
		}
	}, {
		key: 'pauseAd',
		value: function pauseAd() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
			this._flash.callFlashMethod('pauseAd', [], callback);
		}
	}, {
		key: 'resumeAd',
		value: function resumeAd() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
			this._flash.callFlashMethod('resumeAd', [], callback);
		}
	}, {
		key: 'expandAd',
		value: function expandAd() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
			this._flash.callFlashMethod('expandAd', [], callback);
		}
	}, {
		key: 'collapseAd',
		value: function collapseAd() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
			this._flash.callFlashMethod('collapseAd', [], callback);
		}
	}, {
		key: 'skipAd',
		value: function skipAd() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
			this._flash.callFlashMethod('skipAd', [], callback);
		}
	}, {
		key: 'getAdLinear',
		value: function getAdLinear(callback) {
			this._flash.callFlashMethod('getAdLinear', [], callback);
		}
	}, {
		key: 'getAdWidth',
		value: function getAdWidth(callback) {
			this._flash.callFlashMethod('getAdWidth', [], callback);
		}
	}, {
		key: 'getAdHeight',
		value: function getAdHeight(callback) {
			this._flash.callFlashMethod('getAdHeight', [], callback);
		}
	}, {
		key: 'getAdExpanded',
		value: function getAdExpanded(callback) {
			this._flash.callFlashMethod('getAdExpanded', [], callback);
		}
	}, {
		key: 'getAdSkippableState',
		value: function getAdSkippableState(callback) {
			this._flash.callFlashMethod('getAdSkippableState', [], callback);
		}
	}, {
		key: 'getAdRemainingTime',
		value: function getAdRemainingTime(callback) {
			this._flash.callFlashMethod('getAdRemainingTime', [], callback);
		}
	}, {
		key: 'getAdDuration',
		value: function getAdDuration(callback) {
			this._flash.callFlashMethod('getAdDuration', [], callback);
		}
	}, {
		key: 'setAdVolume',
		value: function setAdVolume(volume) {
			var callback = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
			this._flash.callFlashMethod('setAdVolume', [volume], callback);
		}
	}, {
		key: 'getAdVolume',
		value: function getAdVolume(callback) {
			this._flash.callFlashMethod('getAdVolume', [], callback);
		}
	}, {
		key: 'getAdCompanions',
		value: function getAdCompanions(callback) {
			this._flash.callFlashMethod('getAdCompanions', [], callback);
		}
	}, {
		key: 'getAdIcons',
		value: function getAdIcons(callback) {
			this._flash.callFlashMethod('getAdIcons', [], callback);
		}
	}]);
	return VPAIDAdUnit;
}(IVPAIDAdUnit);
},{"./IVPAIDAdUnit":1}],3:[function(require,module,exports){
'use strict';
var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}
var swfobject = require('swfobject');
var JSFlashBridge = require('./jsFlashBridge').JSFlashBridge;
var VPAIDAdUnit = require('./VPAIDAdUnit').VPAIDAdUnit;
var noop = require('./utils').noop;
var callbackTimeout = require('./utils').callbackTimeout;
var isPositiveInt = require('./utils').isPositiveInt;
var createElementWithID = require('./utils').createElementWithID;
var uniqueVPAID = require('./utils').unique('vpaid');
var createFlashTester = require('./flashTester.js.js').createFlashTester;
var ERROR = 'error';
var FLASH_VERSION = '10.1.0';
var flashTester = { isSupported: function isSupported() {
	return true;
}};
var VPAIDFLASHClient = function () {
	function VPAIDFLASHClient(vpaidParentEl, callback) {
		var swfConfig = arguments.length <= 2 || arguments[2] === undefined ? { data: 'VPAIDFlash.swf', width: 800, height: 400 } : arguments[2];
		var _this = this;
		var params = arguments.length <= 3 || arguments[3] === undefined ? { wmode: 'transparent', salign: 'tl', align: 'left', allowScriptAccess: 'always', scale: 'noScale', allowFullScreen: 'true', quality: 'high' } : arguments[3];
		var vpaidOptions = arguments.length <= 4 || arguments[4] === undefined ? { debug: false, timeout: 10000 } : arguments[4];
		_classCallCheck(this, VPAIDFLASHClient);
		var me = this;
		this._vpaidParentEl = vpaidParentEl;
		this._flashID = uniqueVPAID();
		this._destroyed = false;
		callback = callback || noop;
		swfConfig.width = isPositiveInt(swfConfig.width, 800);
		swfConfig.height = isPositiveInt(swfConfig.height, 400);
		createElementWithID(vpaidParentEl, this._flashID, true);
		params.movie = swfConfig.data;
		params.FlashVars = 'flashid=' + this._flashID + '&handler=' + JSFlashBridge.VPAID_FLASH_HANDLER + '&debug=' + vpaidOptions.debug + '&salign=' + params.salign;
		if (!VPAIDFLASHClient.isSupported()) {
			return onError('user don\'t support flash or doesn\'t have the minimum required version of flash ' + FLASH_VERSION);
		}
		this.el = swfobject.createSWF(swfConfig, params, this._flashID);
		if (!this.el) {
			return onError('swfobject failed to create object in element');
		}
		var handler = callbackTimeout(vpaidOptions.timeout, function (err, data) {
			$loadPendedAdUnit.call(_this);
			callback(err, data);
		}, function () {
			callback('vpaid flash load timeout ' + vpaidOptions.timeout);
		});
		this._flash = new JSFlashBridge(this.el, swfConfig.data, this._flashID, swfConfig.width, swfConfig.height, handler);
		function onError(error) {
			setTimeout(function () {
				callback(new Error(error));
			}, 0);
			return me;
		}
	}
	_createClass(VPAIDFLASHClient, [{
		key: 'destroy',
		value: function destroy() {
			this._destroyAdUnit();
			if (this._flash) {
				this._flash.destroy();
				this._flash = null;
			}
			this.el = null;
			this._destroyed = true;
		}
	}, {
		key: 'isDestroyed',
		value: function isDestroyed() {
			return this._destroyed;
		}
	}, {
		key: '_destroyAdUnit',
		value: function _destroyAdUnit() {
			delete this._loadLater;
			if (this._adUnitLoad) {
				this._adUnitLoad = null;
				this._flash.removeCallback(this._adUnitLoad);
			}
			if (this._adUnit) {
				this._adUnit._destroy();
				this._adUnit = null;
			}
		}
	}, {
		key: 'loadAdUnit',
		value: function loadAdUnit(adURL, callback) {
			var _this2 = this;
			$throwIfDestroyed.call(this);
			if (this._adUnit) {
				this._destroyAdUnit();
			}
			if (this._flash.isReady()) {
				this._adUnitLoad = function (err, message) {
					if (!err) {
						_this2._adUnit = new VPAIDAdUnit(_this2._flash);
					}
					_this2._adUnitLoad = null;
					callback(err, _this2._adUnit);
				};
				this._flash.callFlashMethod('loadAdUnit', [adURL], this._adUnitLoad);
			} else {
				this._loadLater = { url: adURL, callback: callback };
			}
		}
	}, {
		key: 'unloadAdUnit',
		value: function unloadAdUnit() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
			$throwIfDestroyed.call(this);
			this._destroyAdUnit();
			this._flash.callFlashMethod('unloadAdUnit', [], callback);
		}
	}, {
		key: 'getFlashID',
		value: function getFlashID() {
			$throwIfDestroyed.call(this);
			return this._flash.getFlashID();
		}
	}, {
		key: 'getFlashURL',
		value: function getFlashURL() {
			$throwIfDestroyed.call(this);
			return this._flash.getFlashURL();
		}
	}]);
	return VPAIDFLASHClient;
}();
setStaticProperty('isSupported', function () {
	return swfobject.hasFlashPlayerVersion(FLASH_VERSION) && flashTester.isSupported();
}, true);
setStaticProperty('runFlashTest', function (swfConfig) {
	flashTester = createFlashTester(document.body, swfConfig);
});
function $throwIfDestroyed() {
	if (this._destroyed) {
		throw new Error('VPAIDFlashToJS is destroyed!');
	}
}
function $loadPendedAdUnit() {
	if (this._loadLater) {
		this.loadAdUnit(this._loadLater.url, this._loadLater.callback);
		delete this._loadLater;
	}
}
function setStaticProperty(propertyName, value) {
	var writable = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	Object.defineProperty(VPAIDFLASHClient, propertyName, {
		writable: writable,
		configurable: false,
		value: value
	});
}
VPAIDFLASHClient.swfobject = swfobject;
module.exports = VPAIDFLASHClient;
},{"./VPAIDAdUnit":2,"./flashTester.js":4,"./jsFlashBridge":5,"./utils":8,"swfobject":14}],4:[function(require,module,exports){
'use strict';
var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();
Object.defineProperty(exports, "__esModule", {
	value: true
});
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}
var swfobject = require('swfobject');
var FLASH_TEST = 'vpaid_video_flash_tester';
var FLASH_TEST_EL = 'vpaid_video_flash_tester_el';
var JSFlashBridge = require('./jsFlashBridge').JSFlashBridge;
var utils = require('./utils');
var MultipleValuesRegistry = require('./registry').MultipleValuesRegistry;
var FlashTester = function () {
	function FlashTester(parent) {
		var _this = this;
		var swfConfig = arguments.length <= 1 || arguments[1] === undefined ? { data: 'VPAIDFlash.swf', width: 800, height: 400 } : arguments[1];
		_classCallCheck(this, FlashTester);
		this.parentEl = utils.createElementWithID(parent, FLASH_TEST_EL);
		utils.hideFlashEl(this.parentEl);
		var params = {};
		params.movie = swfConfig.data;
		params.FlashVars = 'flashid=' + FLASH_TEST_EL + '&handler=' + JSFlashBridge.VPAID_FLASH_HANDLER;
		this.el = swfobject.createSWF(swfConfig, params, FLASH_TEST_EL);
		this._handlers = new MultipleValuesRegistry();
		this._isSupported = false;
		if (this.el) {
			utils.hideFlashEl(this.el);
			this._flash = new JSFlashBridge(this.el, swfConfig.data, FLASH_TEST_EL, 400, 400, function () {
				var support = true;
				_this._isSupported = support;
				_this._handlers.get('change').forEach(function (callback) {
					setTimeout(function () {
						callback('change', support);
					}, 0);
				});
			});
		}
	}
	_createClass(FlashTester, [{
		key: 'isSupported',
		value: function isSupported() {
			return this._isSupported;
		}
	}, {
		key: 'on',
		value: function on(eventName, callback) {
			this._handlers.add(eventName, callback);
		}
	}]);
	return FlashTester;
}();
var createFlashTester = exports.createFlashTester = function createFlashTester(el, swfConfig) {
	if (!window[FLASH_TEST]) {
		window[FLASH_TEST] = new FlashTester(el, swfConfig);
	}
	return window[FLASH_TEST];
};
},{"./jsFlashBridge":5,"./registry":7,"./utils":8,"swfobject":14}],5:[function(require,module,exports){
'use strict';
var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();
Object.defineProperty(exports, "__esModule", {
	value: true
});
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}
var unique = require('./utils').unique;
var isPositiveInt = require('./utils').isPositiveInt;
var stringEndsWith = require('./utils').stringEndsWith;
var SingleValueRegistry = require('./registry').SingleValueRegistry;
var MultipleValuesRegistry = require('./registry').MultipleValuesRegistry;
var registry = require('./jsFlashBridgeRegistry');
var VPAID_FLASH_HANDLER = 'vpaid_video_flash_handler';
var ERROR = 'AdError';
var JSFlashBridge = exports.JSFlashBridge = function () {
	function JSFlashBridge(el, flashURL, flashID, width, height, loadHandShake) {
		_classCallCheck(this, JSFlashBridge);
		this._el = el;
		this._flashID = flashID;
		this._flashURL = flashURL;
		this._width = width;
		this._height = height;
		this._handlers = new MultipleValuesRegistry();
		this._callbacks = new SingleValueRegistry();
		this._uniqueMethodIdentifier = unique(this._flashID);
		this._ready = false;
		this._handShakeHandler = loadHandShake;
		registry.addInstance(this._flashID, this);
	}
	_createClass(JSFlashBridge, [{
		key: 'on',
		value: function on(eventName, callback) {
			this._handlers.add(eventName, callback);
		}
	}, {
		key: 'off',
		value: function off(eventName, callback) {
			return this._handlers.remove(eventName, callback);
		}
	}, {
		key: 'offEvent',
		value: function offEvent(eventName) {
			return this._handlers.removeByKey(eventName);
		}
	}, {
		key: 'offAll',
		value: function offAll() {
			return this._handlers.removeAll();
		}
	}, {
		key: 'callFlashMethod',
		value: function callFlashMethod(methodName) {
			var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
			var callback = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];
			var callbackID = '';
			if (callback) {
				callbackID = this._uniqueMethodIdentifier() + '_' + methodName;
				this._callbacks.add(callbackID, callback);
			}
			try {
				this._el[methodName]([callbackID].concat(args));
			} catch (e) {
				if (callback) {
					$asyncCallback.call(this, callbackID, e);
				} else {
					this._trigger(ERROR, e);
				}
			}
		}
	}, {
		key: 'removeCallback',
		value: function removeCallback(callback) {
			return this._callbacks.removeByValue(callback);
		}
	}, {
		key: 'removeCallbackByMethodName',
		value: function removeCallbackByMethodName(suffix) {
			var _this = this;
			this._callbacks.filterKeys(function (key) {
				return stringEndsWith(key, suffix);
			}).forEach(function (key) {
				_this._callbacks.remove(key);
			});
		}
	}, {
		key: 'removeAllCallbacks',
		value: function removeAllCallbacks() {
			return this._callbacks.removeAll();
		}
	}, {
		key: '_trigger',
		value: function _trigger(eventName, event) {
			var _this2 = this;
			this._handlers.get(eventName).forEach(function (callback) {
				if (eventName === 'AdClickThru') {
					callback(event);
				} else {
					setTimeout(function () {
						if (_this2._handlers.get(eventName).length > 0) {
							callback(event);
						}
					}, 0);
				}
			});
		}
	}, {
		key: '_callCallback',
		value: function _callCallback(methodName, callbackID, err, result) {
			var callback = this._callbacks.get(callbackID);
			if (!callback) {
				if (err && callbackID === '') {
					this.trigger(ERROR, err);
				}
				return;
			}
			$asyncCallback.call(this, callbackID, err, result);
		}
	}, {
		key: '_handShake',
		value: function _handShake(err, data) {
			this._ready = true;
			if (this._handShakeHandler) {
				this._handShakeHandler(err, data);
				delete this._handShakeHandler;
			}
		}
	}, {
		key: 'getSize',
		value: function getSize() {
			return { width: this._width, height: this._height };
		}
	}, {
		key: 'setSize',
		value: function setSize(newWidth, newHeight) {
			this._width = isPositiveInt(newWidth, this._width);
			this._height = isPositiveInt(newHeight, this._height);
			this._el.setAttribute('width', this._width);
			this._el.setAttribute('height', this._height);
		}
	}, {
		key: 'getWidth',
		value: function getWidth() {
			return this._width;
		}
	}, {
		key: 'setWidth',
		value: function setWidth(newWidth) {
			this.setSize(newWidth, this._height);
		}
	}, {
		key: 'getHeight',
		value: function getHeight() {
			return this._height;
		}
	}, {
		key: 'setHeight',
		value: function setHeight(newHeight) {
			this.setSize(this._width, newHeight);
		}
	}, {
		key: 'getFlashID',
		value: function getFlashID() {
			return this._flashID;
		}
	}, {
		key: 'getFlashURL',
		value: function getFlashURL() {
			return this._flashURL;
		}
	}, {
		key: 'isReady',
		value: function isReady() {
			return this._ready;
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.offAll();
			this.removeAllCallbacks();
			registry.removeInstanceByID(this._flashID);
			if (this._el.parentElement) {
				this._el.parentElement.removeChild(this._el);
			}
		}
	}]);
	return JSFlashBridge;
}();
function $asyncCallback(callbackID, err, result) {
	var _this3 = this;
	setTimeout(function () {
		var callback = _this3._callbacks.get(callbackID);
		if (callback) {
			_this3._callbacks.remove(callbackID);
			callback(err, result);
		}
	}, 0);
}
Object.defineProperty(JSFlashBridge, 'VPAID_FLASH_HANDLER', {
	writable: false,
	configurable: false,
	value: VPAID_FLASH_HANDLER
});
window[VPAID_FLASH_HANDLER] = function (flashID, typeID, typeName, callbackID, error, data) {
	var instance = registry.getInstanceByID(flashID);
	if (!instance) return;
	if (typeName === 'handShake') {
		instance._handShake(error, data);
	} else {
		if (typeID !== 'event') {
			instance._callCallback(typeName, callbackID, error, data);
		} else {
			instance._trigger(typeName, data);
		}
	}
};
},{"./jsFlashBridgeRegistry":6,"./registry":7,"./utils":8}],6:[function(require,module,exports){
'use strict';
var SingleValueRegistry = require('./registry').SingleValueRegistry;
var instances = new SingleValueRegistry();
var JSFlashBridgeRegistry = {};
Object.defineProperty(JSFlashBridgeRegistry, 'addInstance', {
	writable: false,
	configurable: false,
	value: function value(id, instance) {
		instances.add(id, instance);
	}
});
Object.defineProperty(JSFlashBridgeRegistry, 'getInstanceByID', {
	writable: false,
	configurable: false,
	value: function value(id) {
		return instances.get(id);
	}
});
Object.defineProperty(JSFlashBridgeRegistry, 'removeInstanceByID', {
	writable: false,
	configurable: false,
	value: function value(id) {
		return instances.remove(id);
	}
});
module.exports = JSFlashBridgeRegistry;
},{"./registry":7}],7:[function(require,module,exports){
'use strict';
var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();
Object.defineProperty(exports, "__esModule", {
	value: true
});
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}
var MultipleValuesRegistry = exports.MultipleValuesRegistry = function () {
	function MultipleValuesRegistry() {
		_classCallCheck(this, MultipleValuesRegistry);
		this._registries = {};
	}
	_createClass(MultipleValuesRegistry, [{
		key: 'add',
		value: function add(id, value) {
			if (!this._registries[id]) {
				this._registries[id] = [];
			}
			if (this._registries[id].indexOf(value) === -1) {
				this._registries[id].push(value);
			}
		}
	}, {
		key: 'get',
		value: function get(id) {
			return this._registries[id] || [];
		}
	}, {
		key: 'filterKeys',
		value: function filterKeys(handler) {
			return Object.keys(this._registries).filter(handler);
		}
	}, {
		key: 'findByValue',
		value: function findByValue(value) {
			var _this = this;
			var keys = Object.keys(this._registries).filter(function (key) {
				return _this._registries[key].indexOf(value) !== -1;
			});
			return keys;
		}
	}, {
		key: 'remove',
		value: function remove(key, value) {
			if (!this._registries[key]) {
				return;
			}
			var index = this._registries[key].indexOf(value);
			if (index < 0) {
				return;
			}
			return this._registries[key].splice(index, 1);
		}
	}, {
		key: 'removeByKey',
		value: function removeByKey(id) {
			var old = this._registries[id];
			delete this._registries[id];
			return old;
		}
	}, {
		key: 'removeByValue',
		value: function removeByValue(value) {
			var _this2 = this;
			var keys = this.findByValue(value);
			return keys.map(function (key) {
				return _this2.remove(key, value);
			});
		}
	}, {
		key: 'removeAll',
		value: function removeAll() {
			var old = this._registries;
			this._registries = {};
			return old;
		}
	}, {
		key: 'size',
		value: function size() {
			return Object.keys(this._registries).length;
		}
	}]);
	return MultipleValuesRegistry;
}();
var SingleValueRegistry = exports.SingleValueRegistry = function () {
	function SingleValueRegistry() {
		_classCallCheck(this, SingleValueRegistry);
		this._registries = {};
	}
	_createClass(SingleValueRegistry, [{
		key: 'add',
		value: function add(id, value) {
			this._registries[id] = value;
		}
	}, {
		key: 'get',
		value: function get(id) {
			return this._registries[id];
		}
	}, {
		key: 'filterKeys',
		value: function filterKeys(handler) {
			return Object.keys(this._registries).filter(handler);
		}
	}, {
		key: 'findByValue',
		value: function findByValue(value) {
			var _this3 = this;
			var keys = Object.keys(this._registries).filter(function (key) {
				return _this3._registries[key] === value;
			});
			return keys;
		}
	}, {
		key: 'remove',
		value: function remove(id) {
			var old = this._registries[id];
			delete this._registries[id];
			return old;
		}
	}, {
		key: 'removeByValue',
		value: function removeByValue(value) {
			var _this4 = this;
			var keys = this.findByValue(value);
			return keys.map(function (key) {
				return _this4.remove(key);
			});
		}
	}, {
		key: 'removeAll',
		value: function removeAll() {
			var old = this._registries;
			this._registries = {};
			return old;
		}
	}, {
		key: 'size',
		value: function size() {
			return Object.keys(this._registries).length;
		}
	}]);
	return SingleValueRegistry;
}();
},{}],8:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.unique = unique;
exports.noop = noop;
exports.callbackTimeout = callbackTimeout;
exports.createElementWithID = createElementWithID;
exports.isPositiveInt = isPositiveInt;
exports.stringEndsWith = stringEndsWith;
exports.hideFlashEl = hideFlashEl;
function unique(prefix) {
	var count = -1;
	return function (f) {
		return prefix + '_' + ++count;
	};
}
function noop() {}
function callbackTimeout(timer, onSuccess, onTimeout) {
	var timeout = setTimeout(function () {
		onSuccess = noop;
		onTimeout();
	}, timer);
	return function () {
		clearTimeout(timeout);
		onSuccess.apply(this, arguments);
	};
}
function createElementWithID(parent, id) {
	var cleanContent = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	var nEl = document.createElement('div');
	nEl.id = id;
	if (cleanContent) {
		parent.innerHTML = '';
	}
	parent.appendChild(nEl);
	return nEl;
}
function isPositiveInt(newVal, oldVal) {
	return !isNaN(parseFloat(newVal)) && isFinite(newVal) && newVal > 0 ? newVal : oldVal;
}
var endsWith = function () {
	if (String.prototype.endsWith) return String.prototype.endsWith;
	return function endsWith(searchString, position) {
		var subjectString = this.toString();
		if (position === undefined || position > subjectString.length) {
			position = subjectString.length;
		}
		position -= searchString.length;
		var lastIndex = subjectString.indexOf(searchString, position);
		return lastIndex !== -1 && lastIndex === position;
	};
}();
function stringEndsWith(string, search) {
	return endsWith.call(string, search);
}
function hideFlashEl(el) {
	el.style.position = 'absolute';
	el.style.left = '-1px';
	el.style.top = '-1px';
	el.style.width = '1px';
	el.style.height = '1px';
}
},{}],9:[function(require,module,exports){
'use strict';
var METHODS = [
	'handshakeVersion',
	'initAd',
	'startAd',
	'stopAd',
	'skipAd',
	'resizeAd',
	'pauseAd',
	'resumeAd',
	'expandAd',
	'collapseAd',
	'subscribe',
	'unsubscribe'
];
var EVENTS = [
	'AdLoaded',
	'AdStarted',
	'AdStopped',
	'AdSkipped',
	'AdSkippableStateChange',
	'AdSizeChange',
	'AdLinearChange',
	'AdDurationChange',
	'AdExpandedChange',
	'AdRemainingTimeChange',
	'AdVolumeChange',
	'AdImpression',
	'AdVideoStart',
	'AdVideoFirstQuartile',
	'AdVideoMidpoint',
	'AdVideoThirdQuartile',
	'AdVideoComplete',
	'AdClickThru',
	'AdInteraction',
	'AdUserAcceptInvitation',
	'AdUserMinimize',
	'AdUserClose',
	'AdPaused',
	'AdPlaying',
	'AdLog',
	'AdError'
];
var GETTERS = [
	'getAdLinear',
	'getAdWidth',
	'getAdHeight',
	'getAdExpanded',
	'getAdSkippableState',
	'getAdRemainingTime',
	'getAdDuration',
	'getAdVolume',
	'getAdCompanions',
	'getAdIcons'
];
var SETTERS = [
	'setAdVolume'
];
function IVPAIDAdUnit(creative, el, video) {}
IVPAIDAdUnit.prototype.handshakeVersion = function (VPAIDVersion, callback) {};
IVPAIDAdUnit.prototype.initAd = function(width, height, viewMode, desiredBitrate, creativeData, environmentVars, callback) {};
IVPAIDAdUnit.prototype.startAd = function(callback) {};
IVPAIDAdUnit.prototype.stopAd = function(callback) {};
IVPAIDAdUnit.prototype.skipAd = function(callback) {};
IVPAIDAdUnit.prototype.resizeAd = function(width, height, viewMode, callback) {};
IVPAIDAdUnit.prototype.pauseAd = function(callback) {};
IVPAIDAdUnit.prototype.resumeAd = function(callback) {};
IVPAIDAdUnit.prototype.expandAd = function(callback) {};
IVPAIDAdUnit.prototype.collapseAd = function(callback) {};
IVPAIDAdUnit.prototype.subscribe = function(event, handler, context) {};
IVPAIDAdUnit.prototype.unsubscribe = function(event, handler) {};
IVPAIDAdUnit.prototype.getAdLinear = function(callback) {};
IVPAIDAdUnit.prototype.getAdWidth = function(callback) {};
IVPAIDAdUnit.prototype.getAdHeight = function(callback) {};
IVPAIDAdUnit.prototype.getAdExpanded = function(callback) {};
IVPAIDAdUnit.prototype.getAdSkippableState = function(callback) {};
IVPAIDAdUnit.prototype.getAdRemainingTime = function(callback) {};
IVPAIDAdUnit.prototype.getAdDuration = function(callback) {};
IVPAIDAdUnit.prototype.getAdVolume = function(callback) {};
IVPAIDAdUnit.prototype.getAdCompanions = function(callback) {};
IVPAIDAdUnit.prototype.getAdIcons = function(callback) {};
IVPAIDAdUnit.prototype.setAdVolume = function(volume, callback) {};
addStaticToInterface(IVPAIDAdUnit, 'METHODS', METHODS);
addStaticToInterface(IVPAIDAdUnit, 'GETTERS', GETTERS);
addStaticToInterface(IVPAIDAdUnit, 'SETTERS', SETTERS);
addStaticToInterface(IVPAIDAdUnit, 'EVENTS',  EVENTS);
var VPAID1_METHODS = METHODS.filter(function(method) {
	return ['skipAd'].indexOf(method) === -1;
});
addStaticToInterface(IVPAIDAdUnit, 'checkVPAIDInterface', function checkVPAIDInterface (creative) {
	var result = VPAID1_METHODS.every(function(key) {
		return typeof creative[key] === 'function';
	});
	return result;
});
module.exports = IVPAIDAdUnit;
function addStaticToInterface(Interface, name, value) {
	Object.defineProperty(Interface, name, {
		writable: false,
		configurable: false,
		value: value
	});
}
},{}],10:[function(require,module,exports){
'use strict';
var IVPAIDAdUnit = require('./IVPAIDAdUnit');
var Subscriber = require('./subscriber');
var checkVPAIDInterface = IVPAIDAdUnit.checkVPAIDInterface;
var utils = require('./utils');
var METHODS = IVPAIDAdUnit.METHODS;
var ERROR = 'AdError';
var AD_CLICK = 'AdClickThru';
var FILTERED_EVENTS = IVPAIDAdUnit.EVENTS.filter(function (event) {
	return event != AD_CLICK;
});
function VPAIDAdUnit(VPAIDCreative, el, video, iframe) {
	this._isValid = checkVPAIDInterface(VPAIDCreative);
	if (this._isValid) {
		this._creative = VPAIDCreative;
		this._el = el;
		this._videoEl = video;
		this._iframe = iframe;
		this._subscribers = new Subscriber();
		$addEventsSubscribers.call(this);
	}
}
VPAIDAdUnit.prototype = Object.create(IVPAIDAdUnit.prototype);
VPAIDAdUnit.prototype.isValidVPAIDAd = function isValidVPAIDAd() {
	return this._isValid;
};
IVPAIDAdUnit.METHODS.forEach(function(method) {
	var ignores = [
		'subscribe',
		'unsubscribe',
		'initAd'
	];
	if (ignores.indexOf(method) !== -1) return;
	VPAIDAdUnit.prototype[method] = function () {
		var ariaty = IVPAIDAdUnit.prototype[method].length;
		var args = Array.prototype.slice.call(arguments);
		var callback = (ariaty === args.length) ? args.pop() : undefined;
		setTimeout(function () {
			var result, error = null;
			try {
				result = this._creative[method].apply(this._creative, args);
			} catch(e) {
				error = e;
			}
			callOrTriggerEvent(callback, this._subscribers, error, result);
		}.bind(this), 0);
	};
});
VPAIDAdUnit.prototype.initAd = function initAd(width, height, viewMode, desiredBitrate, creativeData, environmentVars, callback) {
	creativeData = creativeData || {};
	environmentVars = utils.extend({
		slot: this._el,
		videoSlot: this._videoEl
	}, environmentVars || {});
	setTimeout(function () {
		var error;
		try {
			this._creative.initAd(width, height, viewMode, desiredBitrate, creativeData, environmentVars);
		} catch (e) {
			error = e;
		}
		callOrTriggerEvent(callback, this._subscribers, error);
	}.bind(this), 0);
};
VPAIDAdUnit.prototype.subscribe = function subscribe(event, handler, context) {
	this._subscribers.subscribe(handler, event, context);
};
VPAIDAdUnit.prototype.unsubscribe = function unsubscribe(event, handler) {
	this._subscribers.unsubscribe(handler, event);
};
VPAIDAdUnit.prototype.on = VPAIDAdUnit.prototype.subscribe;
VPAIDAdUnit.prototype.off = VPAIDAdUnit.prototype.unsubscribe;
IVPAIDAdUnit.GETTERS.forEach(function(getter) {
	VPAIDAdUnit.prototype[getter] = function (callback) {
		setTimeout(function () {
			var result, error = null;
			try {
				result = this._creative[getter]();
			} catch(e) {
				error = e;
			}
			callOrTriggerEvent(callback, this._subscribers, error, result);
		}.bind(this), 0);
	};
});
VPAIDAdUnit.prototype.setAdVolume = function setAdVolume(volume, callback) {
	setTimeout(function () {
		var result, error = null;
		try {
			this._creative.setAdVolume(volume);
			result = this._creative.getAdVolume();
		} catch(e) {
			error = e;
		}
		if (!error) {
			error = utils.validate(result === volume, 'failed to apply volume: ' + volume);
		}
		callOrTriggerEvent(callback, this._subscribers, error, result);
	}.bind(this), 0);
};
VPAIDAdUnit.prototype._destroy = function destroy() {
	this.stopAd();
	this._subscribers.unsubscribeAll();
};
function $addEventsSubscribers() {
	FILTERED_EVENTS.forEach(function (event) {
		this._creative.subscribe($trigger.bind(this, event), event);
	}.bind(this));
	this._creative.subscribe($clickThruHook.bind(this), AD_CLICK);
	if (this._videoEl) {
		var documentElement = this._iframe.contentDocument.documentElement;
		var videoEl = this._videoEl;
		documentElement.addEventListener('click', function(e) {
			if (e.target === documentElement) {
				videoEl.click();
			}
		});
	}
}
function $clickThruHook(url, id, playerHandles) {
	this._subscribers.triggerSync(AD_CLICK, {url: url, id: id, playerHandles: playerHandles});
}
function $trigger(event) {
	this._subscribers.trigger(event, Array.prototype.slice(arguments, 1));
}
function callOrTriggerEvent(callback, subscribers, error, result) {
	if (callback) {
		callback(error, result);
	} else if (error) {
		subscribers.trigger(ERROR, error);
	}
}
module.exports = VPAIDAdUnit;
},{"./IVPAIDAdUnit":9,"./subscriber":12,"./utils":13}],11:[function(require,module,exports){
'use strict';
var utils = require('./utils');
var unique = utils.unique('vpaidIframe');
var VPAIDAdUnit = require('./VPAIDAdUnit');
var defaultTemplate = '<!DOCTYPE html>' +
	'<html lang="en">' +
	'<head><meta charset="UTF-8"></head>' +
	'<body style="margin:0;padding:0"><div class="ad-element"></div>' +
	'<script type="text/javascript" src="{{iframeURL_JS}}"></script>' +
	'<script type="text/javascript">' +
	'window.parent.postMessage(\'{"event": "ready", "id": "{{iframeID}}"}\', \'{{origin}}\');' +
	'</script>' +
	'</body>' +
	'</html>';
var AD_STOPPED = 'AdStopped';
function VPAIDHTML5Client(el, video, templateConfig, vpaidOptions) {
	templateConfig = templateConfig || {};
	this._id = unique();
	this._destroyed = false;
	this._frameContainer = utils.createElementInEl(el, 'div');
	this._videoEl = video;
	this._vpaidOptions = vpaidOptions || {timeout: 10000};
	this._templateConfig = {
		template: templateConfig.template || defaultTemplate,
		extraOptions: templateConfig.extraOptions || {}
	};
}
VPAIDHTML5Client.prototype.destroy = function destroy() {
	if (this._destroyed) {
		return;
	}
	this._destroyed = true;
	$unloadPreviousAdUnit.call(this);
};
VPAIDHTML5Client.prototype.isDestroyed = function isDestroyed() {
	return this._destroyed;
};
VPAIDHTML5Client.prototype.loadAdUnit = function loadAdUnit(adURL, callback) {
	$throwIfDestroyed.call(this);
	$unloadPreviousAdUnit.call(this);
	var that = this;
	var frame = utils.createIframeWithContent(
		this._frameContainer,
		this._templateConfig.template,
		utils.extend({
			iframeURL_JS: adURL,
			iframeID: this.getID(),
			origin: getOrigin()
		}, this._templateConfig.extraOptions)
	);
	this._frame = frame;
	this._onLoad = utils.callbackTimeout(
		this._vpaidOptions.timeout,
		onLoad.bind(this),
		onTimeout.bind(this)
	);
    window.addEventListener('message', this._onLoad);
	function onLoad (e) {
		if (e.origin !== getOrigin()) return;
		var result = JSON.parse(e.data);
		if (result.id !== that.getID()) return;
		var adUnit, error, createAd;
		if (!that._frame.contentWindow) {
			error = 'the iframe is not anymore in the DOM tree';
		} else {
			createAd = that._frame.contentWindow.getVPAIDAd;
			error = utils.validate(typeof createAd === 'function', 'the ad didn\'t return a function to create an ad');
		}
		if (!error) {
			var adEl = that._frame.contentWindow.document.querySelector('.ad-element');
			adUnit = new VPAIDAdUnit(createAd(), adEl, that._videoEl, that._frame);
			adUnit.subscribe(AD_STOPPED, $adDestroyed.bind(that));
			error = utils.validate(adUnit.isValidVPAIDAd(), 'the add is not fully complaint with VPAID specification');
		}
		that._adUnit = adUnit;
		$destroyLoadListener.call(that);
		callback(error, error ? null : adUnit);
		return true;
	}
	function onTimeout() {
		callback('timeout', null);
	}
};
VPAIDHTML5Client.prototype.unloadAdUnit = function unloadAdUnit() {
	$unloadPreviousAdUnit.call(this);
};
VPAIDHTML5Client.prototype.getID = function () {
	return this._id;
};
function $removeEl(key) {
	var el = this[key];
	if (el) {
		el.remove();
		delete this[key];
	}
}
function $adDestroyed() {
	$removeAdElements.call(this);
	delete this._adUnit;
}
function $unloadPreviousAdUnit() {
	$removeAdElements.call(this);
	$destroyAdUnit.call(this);
}
function $removeAdElements() {
	$removeEl.call(this, '_frame');
	$destroyLoadListener.call(this);
}
function $destroyLoadListener() {
	if (this._onLoad) {
		window.removeEventListener('message', this._onLoad);
		utils.clearCallbackTimeout(this._onLoad);
		delete this._onLoad;
	}
}
function $destroyAdUnit() {
	if (this._adUnit) {
		this._adUnit.stopAd();
		delete this._adUnit;
	}
}
function $throwIfDestroyed() {
	if (this._destroyed) {
		throw new Error ('VPAIDHTML5Client already destroyed!');
	}
}
function getOrigin() {
	if( window.location.origin ) {
		return window.location.origin;
	} else {
		return window.location.protocol + "//" +
		window.location.hostname +
		(window.location.port ? ':' + window.location.port: '');
	}
}
module.exports = VPAIDHTML5Client;
window.VPAIDHTML5Client = VPAIDHTML5Client;
},{"./VPAIDAdUnit":10,"./utils":13}],12:[function(require,module,exports){
'use strict';
function Subscriber() {
	this._subscribers = {};
}
Subscriber.prototype.subscribe = function subscribe(handler, eventName, context) {
	if (!this.isHandlerAttached(handler, eventName)) {
		this.get(eventName).push({handler: handler, context: context, eventName: eventName});
	}
};
Subscriber.prototype.unsubscribe = function unsubscribe(handler, eventName) {
	this._subscribers[eventName] = this.get(eventName).filter(function (subscriber) {
		return handler !== subscriber.handler;
	});
};
Subscriber.prototype.unsubscribeAll = function unsubscribeAll() {
	this._subscribers = {};
};
Subscriber.prototype.trigger = function(eventName, data) {
	var that = this;
	var subscribers = this.get(eventName)
	.concat(this.get('*'));
	subscribers.forEach(function (subscriber) {
		setTimeout(function () {
			if (that.isHandlerAttached(subscriber.handler, subscriber.eventName)) {
				subscriber.handler.call(subscriber.context, data);
			}
		}, 0);
	});
};
Subscriber.prototype.triggerSync = function(eventName, data) {
	var subscribers = this.get(eventName)
	.concat(this.get('*'));
	subscribers.forEach(function (subscriber) {
		subscriber.handler.call(subscriber.context, data);
	});
};
Subscriber.prototype.get = function get(eventName) {
	if (!this._subscribers[eventName]) {
		this._subscribers[eventName] = [];
	}
	return this._subscribers[eventName];
};
Subscriber.prototype.isHandlerAttached = function isHandlerAttached(handler, eventName) {
	return this.get(eventName).some(function(subscriber) {
		return handler === subscriber.handler;
	})
};
module.exports = Subscriber;
},{}],13:[function(require,module,exports){
'use strict';
function noop() {}
function validate(isValid, message) {
	return isValid ? null : new Error(message);
}
var timeouts = {};
function clearCallbackTimeout(func) {
	var timeout = timeouts[func];
	if (timeout) {
		clearTimeout(timeout);
		delete timeouts[func];
	}
}
function callbackTimeout(timer, onSuccess, onTimeout) {
	var callback, timeout;
	timeout = setTimeout(function () {
		onSuccess = noop;
		delete timeout[callback];
		onTimeout();
	}, timer);
	callback = function () {
		if (onSuccess.apply(this, arguments)) {
			clearCallbackTimeout(callback);
		}
	};
	timeouts[callback] = timeout;
	return callback;
}
function createElementInEl(parent, tagName, id) {
	var nEl = document.createElement(tagName);
	if (id) nEl.id = id;
	parent.appendChild(nEl);
	return nEl;
}
function createIframeWithContent(parent, template, data) {
	var iframe = createIframe(parent, null, data.zIndex);
	if (!setIframeContent(iframe, simpleTemplate(template, data))) return;
	return iframe;
}
function createIframe(parent, url, zIndex) {
	var nEl = document.createElement('iframe');
	nEl.src = url || 'about:blank';
	nEl.marginWidth = '0';
	nEl.marginHeight = '0';
	nEl.frameBorder = '0';
	nEl.width = '100%';
	nEl.height = '100%';
	nEl.style.position = 'absolute';
	nEl.style.left = '0';
	nEl.style.top = '0';
	nEl.style.margin = '0px';
	nEl.style.padding = '0px';
	nEl.style.border = 'none';
	if(zIndex){
		nEl.style.zIndex = zIndex;
	}
	nEl.setAttribute('SCROLLING','NO');
	parent.innerHTML = '';
	parent.appendChild(nEl);
	return nEl;
}
function simpleTemplate(template, data) {
	Object.keys(data).forEach(function (key) {
		var value = (typeof value === 'object') ? JSON.stringify(data[key]) : data[key];
		template = template.replace(new RegExp('{{' + key + '}}', 'g'), value);
	});
	return template;
}
function setIframeContent(iframeEl, content) {
	var iframeDoc = iframeEl.contentWindow && iframeEl.contentWindow.document;
	if (!iframeDoc) return false;
	iframeDoc.write(content);
	return true;
}
function extend(toExtend, fromSource) {
	Object.keys(fromSource).forEach(function(key) {
		toExtend[key] = fromSource[key];
	});
	return toExtend;
}
function unique(prefix) {
	var count = -1;
	return function () {
		return prefix + '_' + (++count);
	};
}
module.exports = {
	noop: noop,
	validate: validate,
	clearCallbackTimeout: clearCallbackTimeout,
	callbackTimeout: callbackTimeout,
	createElementInEl: createElementInEl,
	createIframeWithContent: createIframeWithContent,
	createIframe: createIframe,
	simpleTemplate: simpleTemplate,
	setIframeContent: setIframeContent,
	extend: extend,
	unique: unique
};
},{}],14:[function(require,module,exports){
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory();
	} else {
		root.swfobject = factory();
	}
}(this, function () {
	var UNDEF = "undefined",
		OBJECT = "object",
		SHOCKWAVE_FLASH = "Shockwave Flash",
		SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
		FLASH_MIME_TYPE = "application/x-shockwave-flash",
		EXPRESS_INSTALL_ID = "SWFObjectExprInst",
		ON_READY_STATE_CHANGE = "onreadystatechange",
		win = window,
		doc = document,
		nav = navigator,
		plugin = false,
		domLoadFnArr = [],
		regObjArr = [],
		objIdArr = [],
		listenersArr = [],
		storedFbContent,
		storedFbContentId,
		storedCallbackFn,
		storedCallbackObj,
		isDomLoaded = false,
		isExpressInstallActive = false,
		dynamicStylesheet,
		dynamicStylesheetMedia,
		autoHideShow = true,
		encodeURIEnabled = false,
		ua = function () {
			var w3cdom = typeof doc.getElementById !== UNDEF && typeof doc.getElementsByTagName !== UNDEF && typeof doc.createElement !== UNDEF,
				u = nav.userAgent.toLowerCase(),
				p = nav.platform.toLowerCase(),
				windows = p ? /win/.test(p) : /win/.test(u),
				mac = p ? /mac/.test(p) : /mac/.test(u),
				webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
				ie = nav.appName === "Microsoft Internet Explorer",
				playerVersion = [0, 0, 0],
				d = null;
			if (typeof nav.plugins !== UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] === OBJECT) {
				d = nav.plugins[SHOCKWAVE_FLASH].description;
				if (d && (typeof nav.mimeTypes !== UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) {
					plugin = true;
					ie = false;
					d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
					playerVersion[0] = toInt(d.replace(/^(.*)\..*$/, "$1"));
					playerVersion[1] = toInt(d.replace(/^.*\.(.*)\s.*$/, "$1"));
					playerVersion[2] = /[a-zA-Z]/.test(d) ? toInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1")) : 0;
				}
			} else if (typeof win.ActiveXObject !== UNDEF) {
				try {
					var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
					if (a) {
						d = a.GetVariable("$version");
						if (d) {
							ie = true;
							d = d.split(" ")[1].split(",");
							playerVersion = [toInt(d[0]), toInt(d[1]), toInt(d[2])];
						}
					}
				}
				catch (e) {}
			}
			return {w3: w3cdom, pv: playerVersion, wk: webkit, ie: ie, win: windows, mac: mac};
		}(),
		onDomLoad = function () {
			if (!ua.w3) { return; }
			if ((typeof doc.readyState !== UNDEF && (doc.readyState === "complete" || doc.readyState === "interactive")) || (typeof doc.readyState === UNDEF && (doc.getElementsByTagName("body")[0] || doc.body))) {
				callDomLoadFunctions();
			}
			if (!isDomLoaded) {
				if (typeof doc.addEventListener !== UNDEF) {
					doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false);
				}
				if (ua.ie) {
					doc.attachEvent(ON_READY_STATE_CHANGE, function detach() {
						if (doc.readyState === "complete") {
							doc.detachEvent(ON_READY_STATE_CHANGE, detach);
							callDomLoadFunctions();
						}
					});
					if (win == top) {
						(function checkDomLoadedIE() {
							if (isDomLoaded) { return; }
							try {
								doc.documentElement.doScroll("left");
							}
							catch (e) {
								setTimeout(checkDomLoadedIE, 0);
								return;
							}
							callDomLoadFunctions();
						}());
					}
				}
				if (ua.wk) {
					(function checkDomLoadedWK() {
						if (isDomLoaded) { return; }
						if (!/loaded|complete/.test(doc.readyState)) {
							setTimeout(checkDomLoadedWK, 0);
							return;
						}
						callDomLoadFunctions();
					}());
				}
			}
		}();
	function callDomLoadFunctions() {
		if (isDomLoaded || !document.getElementsByTagName("body")[0]) { return; }
		try {
			var t, span = createElement("span");
			span.style.display = "none";
			t = doc.getElementsByTagName("body")[0].appendChild(span);
			t.parentNode.removeChild(t);
			t = null;
			span = null;
		}
		catch (e) { return; }
		isDomLoaded = true;
		var dl = domLoadFnArr.length;
		for (var i = 0; i < dl; i++) {
			domLoadFnArr[i]();
		}
	}
	function addDomLoadEvent(fn) {
		if (isDomLoaded) {
			fn();
		} else {
			domLoadFnArr[domLoadFnArr.length] = fn;
		}
	}
	function addLoadEvent(fn) {
		if (typeof win.addEventListener !== UNDEF) {
			win.addEventListener("load", fn, false);
		} else if (typeof doc.addEventListener !== UNDEF) {
			doc.addEventListener("load", fn, false);
		} else if (typeof win.attachEvent !== UNDEF) {
			addListener(win, "onload", fn);
		} else if (typeof win.onload === "function") {
			var fnOld = win.onload;
			win.onload = function () {
				fnOld();
				fn();
			};
		} else {
			win.onload = fn;
		}
	}
	function testPlayerVersion() {
		var b = doc.getElementsByTagName("body")[0];
		var o = createElement(OBJECT);
		o.setAttribute("style", "visibility: hidden;");
		o.setAttribute("type", FLASH_MIME_TYPE);
		var t = b.appendChild(o);
		if (t) {
			var counter = 0;
			(function checkGetVariable() {
				if (typeof t.GetVariable !== UNDEF) {
					try {
						var d = t.GetVariable("$version");
						if (d) {
							d = d.split(" ")[1].split(",");
							ua.pv = [toInt(d[0]), toInt(d[1]), toInt(d[2])];
						}
					} catch (e) {
						ua.pv = [8, 0, 0];
					}
				} else if (counter < 10) {
					counter++;
					setTimeout(checkGetVariable, 10);
					return;
				}
				b.removeChild(o);
				t = null;
				matchVersions();
			}());
		} else {
			matchVersions();
		}
	}
	function matchVersions() {
		var rl = regObjArr.length;
		if (rl > 0) {
			for (var i = 0; i < rl; i++) {
				var id = regObjArr[i].id;
				var cb = regObjArr[i].callbackFn;
				var cbObj = {success: false, id: id};
				if (ua.pv[0] > 0) {
					var obj = getElementById(id);
					if (obj) {
						if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) {
							setVisibility(id, true);
							if (cb) {
								cbObj.success = true;
								cbObj.ref = getObjectById(id);
								cbObj.id = id;
								cb(cbObj);
							}
						} else if (regObjArr[i].expressInstall && canExpressInstall()) {
							var att = {};
							att.data = regObjArr[i].expressInstall;
							att.width = obj.getAttribute("width") || "0";
							att.height = obj.getAttribute("height") || "0";
							if (obj.getAttribute("class")) { att.styleclass = obj.getAttribute("class"); }
							if (obj.getAttribute("align")) { att.align = obj.getAttribute("align"); }
							var par = {};
							var p = obj.getElementsByTagName("param");
							var pl = p.length;
							for (var j = 0; j < pl; j++) {
								if (p[j].getAttribute("name").toLowerCase() !== "movie") {
									par[p[j].getAttribute("name")] = p[j].getAttribute("value");
								}
							}
							showExpressInstall(att, par, id, cb);
						} else {
							displayFbContent(obj);
							if (cb) { cb(cbObj); }
						}
					}
				} else {
					setVisibility(id, true);
					if (cb) {
						var o = getObjectById(id);
						if (o && typeof o.SetVariable !== UNDEF) {
							cbObj.success = true;
							cbObj.ref = o;
							cbObj.id = o.id;
						}
						cb(cbObj);
					}
				}
			}
		}
	}
	domLoadFnArr[0] = function () {
		if (plugin) {
			testPlayerVersion();
		} else {
			matchVersions();
		}
	};
	function getObjectById(objectIdStr) {
		var r = null,
			o = getElementById(objectIdStr);
		if (o && o.nodeName.toUpperCase() === "OBJECT") {
			if (typeof o.SetVariable !== UNDEF) {
				r = o;
			} else {
				r = o.getElementsByTagName(OBJECT)[0] || o;
			}
		}
		return r;
	}
	function canExpressInstall() {
		return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312);
	}
	function showExpressInstall(att, par, replaceElemIdStr, callbackFn) {
		var obj = getElementById(replaceElemIdStr);
		replaceElemIdStr = getId(replaceElemIdStr);
		isExpressInstallActive = true;
		storedCallbackFn = callbackFn || null;
		storedCallbackObj = {success: false, id: replaceElemIdStr};
		if (obj) {
			if (obj.nodeName.toUpperCase() === "OBJECT") {
				storedFbContent = abstractFbContent(obj);
				storedFbContentId = null;
			} else {
				storedFbContent = obj;
				storedFbContentId = replaceElemIdStr;
			}
			att.id = EXPRESS_INSTALL_ID;
			if (typeof att.width === UNDEF || (!/%$/.test(att.width) && toInt(att.width) < 310)) { att.width = "310"; }
			if (typeof att.height === UNDEF || (!/%$/.test(att.height) && toInt(att.height) < 137)) { att.height = "137"; }
			var pt = ua.ie ? "ActiveX" : "PlugIn",
				fv = "MMredirectURL=" + encodeURIComponent(win.location.toString().replace(/&/g, "%26")) + "&MMplayerType=" + pt + "&MMdoctitle=" + encodeURIComponent(doc.title.slice(0, 47) + " - Flash Player Installation");
			if (typeof par.flashvars !== UNDEF) {
				par.flashvars += "&" + fv;
			} else {
				par.flashvars = fv;
			}
			if (ua.ie && obj.readyState != 4) {
				var newObj = createElement("div");
				replaceElemIdStr += "SWFObjectNew";
				newObj.setAttribute("id", replaceElemIdStr);
				obj.parentNode.insertBefore(newObj, obj);
				obj.style.display = "none";
				removeSWF(obj);
			}
			createSWF(att, par, replaceElemIdStr);
		}
	}
	function displayFbContent(obj) {
		if (ua.ie && obj.readyState != 4) {
			obj.style.display = "none";
			var el = createElement("div");
			obj.parentNode.insertBefore(el, obj);
			el.parentNode.replaceChild(abstractFbContent(obj), el);
			removeSWF(obj);
		} else {
			obj.parentNode.replaceChild(abstractFbContent(obj), obj);
		}
	}
	function abstractFbContent(obj) {
		var ac = createElement("div");
		if (ua.win && ua.ie) {
			ac.innerHTML = obj.innerHTML;
		} else {
			var nestedObj = obj.getElementsByTagName(OBJECT)[0];
			if (nestedObj) {
				var c = nestedObj.childNodes;
				if (c) {
					var cl = c.length;
					for (var i = 0; i < cl; i++) {
						if (!(c[i].nodeType == 1 && c[i].nodeName === "PARAM") && !(c[i].nodeType == 8)) {
							ac.appendChild(c[i].cloneNode(true));
						}
					}
				}
			}
		}
		return ac;
	}
	function createIeObject(url, paramStr) {
		var div = createElement("div");
		div.innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='" + url + "'>" + paramStr + "</object>";
		return div.firstChild;
	}
	function createSWF(attObj, parObj, id) {
		var r, el = getElementById(id);
		id = getId(id);
		if (ua.wk && ua.wk < 312) { return r; }
		if (el) {
			var o = (ua.ie) ? createElement("div") : createElement(OBJECT),
				attr, attrLower, param;
			if (typeof attObj.id === UNDEF) {
				attObj.id = id;
			}
			for (param in parObj) {
				if (parObj.hasOwnProperty(param) && param.toLowerCase() !== "movie") {
					createObjParam(o, param, parObj[param]);
				}
			}
			if (ua.ie) { o = createIeObject(attObj.data, o.innerHTML); }
			for (attr in attObj) {
				if (attObj.hasOwnProperty(attr)) {
					attrLower = attr.toLowerCase();
					if (attrLower === "styleclass") {
						o.setAttribute("class", attObj[attr]);
					} else if (attrLower !== "classid" && attrLower !== "data") {
						o.setAttribute(attr, attObj[attr]);
					}
				}
			}
			if (ua.ie) {
				objIdArr[objIdArr.length] = attObj.id;
			} else {
				o.setAttribute("type", FLASH_MIME_TYPE);
				o.setAttribute("data", attObj.data);
			}
			el.parentNode.replaceChild(o, el);
			r = o;
		}
		return r;
	}
	function createObjParam(el, pName, pValue) {
		var p = createElement("param");
		p.setAttribute("name", pName);
		p.setAttribute("value", pValue);
		el.appendChild(p);
	}
	function removeSWF(id) {
		var obj = getElementById(id);
		if (obj && obj.nodeName.toUpperCase() === "OBJECT") {
			if (ua.ie) {
				obj.style.display = "none";
				(function removeSWFInIE() {
					if (obj.readyState == 4) {
						for (var i in obj) {
							if (typeof obj[i] === "function") {
								obj[i] = null;
							}
						}
						obj.parentNode.removeChild(obj);
					} else {
						setTimeout(removeSWFInIE, 10);
					}
				}());
			} else {
				obj.parentNode.removeChild(obj);
			}
		}
	}
	function isElement(id) {
		return (id && id.nodeType && id.nodeType === 1);
	}
	function getId(thing) {
		return (isElement(thing)) ? thing.id : thing;
	}
	function getElementById(id) {
		if (isElement(id)) { return id; }
		var el = null;
		try {
			el = doc.getElementById(id);
		}
		catch (e) {}
		return el;
	}
	function createElement(el) {
		return doc.createElement(el);
	}
	function toInt(str) {
		return parseInt(str, 10);
	}
	function addListener(target, eventType, fn) {
		target.attachEvent(eventType, fn);
		listenersArr[listenersArr.length] = [target, eventType, fn];
	}
	function hasPlayerVersion(rv) {
		rv += "";
		var pv = ua.pv, v = rv.split(".");
		v[0] = toInt(v[0]);
		v[1] = toInt(v[1]) || 0;
		v[2] = toInt(v[2]) || 0;
		return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
	}
	function createCSS(sel, decl, media, newStyle) {
		var h = doc.getElementsByTagName("head")[0];
		if (!h) { return; }
		var m = (typeof media === "string") ? media : "screen";
		if (newStyle) {
			dynamicStylesheet = null;
			dynamicStylesheetMedia = null;
		}
		if (!dynamicStylesheet || dynamicStylesheetMedia != m) {
			var s = createElement("style");
			s.setAttribute("type", "text/css");
			s.setAttribute("media", m);
			dynamicStylesheet = h.appendChild(s);
			if (ua.ie && typeof doc.styleSheets !== UNDEF && doc.styleSheets.length > 0) {
				dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1];
			}
			dynamicStylesheetMedia = m;
		}
		if (dynamicStylesheet) {
			if (typeof dynamicStylesheet.addRule !== UNDEF) {
				dynamicStylesheet.addRule(sel, decl);
			} else if (typeof doc.createTextNode !== UNDEF) {
				dynamicStylesheet.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
			}
		}
	}
	function setVisibility(id, isVisible) {
		if (!autoHideShow) { return; }
		var v = isVisible ? "visible" : "hidden",
			el = getElementById(id);
		if (isDomLoaded && el) {
			el.style.visibility = v;
		} else if (typeof id === "string") {
			createCSS("#" + id, "visibility:" + v);
		}
	}
	function urlEncodeIfNecessary(s) {
		var regex = /[\\\"<>\.;]/;
		var hasBadChars = regex.exec(s) !== null;
		return hasBadChars && typeof encodeURIComponent !== UNDEF ? encodeURIComponent(s) : s;
	}
	var cleanup = function () {
		if (ua.ie) {
			window.attachEvent("onunload", function () {
				var ll = listenersArr.length;
				for (var i = 0; i < ll; i++) {
					listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
				}
				var il = objIdArr.length;
				for (var j = 0; j < il; j++) {
					removeSWF(objIdArr[j]);
				}
				for (var k in ua) {
					ua[k] = null;
				}
				ua = null;
				for (var l in swfobject) {
					swfobject[l] = null;
				}
				swfobject = null;
			});
		}
	}();
	return {
		registerObject: function (objectIdStr, swfVersionStr, xiSwfUrlStr, callbackFn) {
			if (ua.w3 && objectIdStr && swfVersionStr) {
				var regObj = {};
				regObj.id = objectIdStr;
				regObj.swfVersion = swfVersionStr;
				regObj.expressInstall = xiSwfUrlStr;
				regObj.callbackFn = callbackFn;
				regObjArr[regObjArr.length] = regObj;
				setVisibility(objectIdStr, false);
			} else if (callbackFn) {
				callbackFn({success: false, id: objectIdStr});
			}
		},
		getObjectById: function (objectIdStr) {
			if (ua.w3) {
				return getObjectById(objectIdStr);
			}
		},
		embedSWF: function (swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {
			var id = getId(replaceElemIdStr),
				callbackObj = {success: false, id: id};
			if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
				setVisibility(id, false);
				addDomLoadEvent(function () {
					widthStr += "";
					heightStr += "";
					var att = {};
					if (attObj && typeof attObj === OBJECT) {
						for (var i in attObj) {
							att[i] = attObj[i];
						}
					}
					att.data = swfUrlStr;
					att.width = widthStr;
					att.height = heightStr;
					var par = {};
					if (parObj && typeof parObj === OBJECT) {
						for (var j in parObj) {
							par[j] = parObj[j];
						}
					}
					if (flashvarsObj && typeof flashvarsObj === OBJECT) {
						for (var k in flashvarsObj) {
							if (flashvarsObj.hasOwnProperty(k)) {
								var key = (encodeURIEnabled) ? encodeURIComponent(k) : k,
									value = (encodeURIEnabled) ? encodeURIComponent(flashvarsObj[k]) : flashvarsObj[k];
								if (typeof par.flashvars !== UNDEF) {
									par.flashvars += "&" + key + "=" + value;
								} else {
									par.flashvars = key + "=" + value;
								}
							}
						}
					}
					if (hasPlayerVersion(swfVersionStr)) {
						var obj = createSWF(att, par, replaceElemIdStr);
						if (att.id == id) {
							setVisibility(id, true);
						}
						callbackObj.success = true;
						callbackObj.ref = obj;
						callbackObj.id = obj.id;
					} else if (xiSwfUrlStr && canExpressInstall()) {
						att.data = xiSwfUrlStr;
						showExpressInstall(att, par, replaceElemIdStr, callbackFn);
						return;
					} else {
						setVisibility(id, true);
					}
					if (callbackFn) { callbackFn(callbackObj); }
				});
			} else if (callbackFn) { callbackFn(callbackObj); }
		},
		switchOffAutoHideShow: function () {
			autoHideShow = false;
		},
		enableUriEncoding: function (bool) {
			encodeURIEnabled = (typeof bool === UNDEF) ? true : bool;
		},
		ua: ua,
		getFlashPlayerVersion: function () {
			return {major: ua.pv[0], minor: ua.pv[1], release: ua.pv[2]};
		},
		hasFlashPlayerVersion: hasPlayerVersion,
		createSWF: function (attObj, parObj, replaceElemIdStr) {
			if (ua.w3) {
				return createSWF(attObj, parObj, replaceElemIdStr);
			} else {
				return undefined;
			}
		},
		showExpressInstall: function (att, par, replaceElemIdStr, callbackFn) {
			if (ua.w3 && canExpressInstall()) {
				showExpressInstall(att, par, replaceElemIdStr, callbackFn);
			}
		},
		removeSWF: function (objElemIdStr) {
			if (ua.w3) {
				removeSWF(objElemIdStr);
			}
		},
		createCSS: function (selStr, declStr, mediaStr, newStyleBoolean) {
			if (ua.w3) {
				createCSS(selStr, declStr, mediaStr, newStyleBoolean);
			}
		},
		addDomLoadEvent: addDomLoadEvent,
		addLoadEvent: addLoadEvent,
		getQueryParamValue: function (param) {
			var q = doc.location.search || doc.location.hash;
			if (q) {
				if (/\?/.test(q)) { q = q.split("?")[1]; }
				if (!param) {
					return urlEncodeIfNecessary(q);
				}
				var pairs = q.split("&");
				for (var i = 0; i < pairs.length; i++) {
					if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
						return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=") + 1)));
					}
				}
			}
			return "";
		},
		expressInstallCallback: function () {
			if (isExpressInstallActive) {
				var obj = getElementById(EXPRESS_INSTALL_ID);
				if (obj && storedFbContent) {
					obj.parentNode.replaceChild(storedFbContent, obj);
					if (storedFbContentId) {
						setVisibility(storedFbContentId, true);
						if (ua.ie) { storedFbContent.style.display = "block"; }
					}
					if (storedCallbackFn) { storedCallbackFn(storedCallbackObj); }
				}
				isExpressInstallActive = false;
			}
		},
		version: "2.3"
	};
}));
},{}],15:[function(require,module,exports){
'use strict';
var InLine = require('./InLine');
var Wrapper = require('./Wrapper');
function Ad(adJTree) {
	if (!(this instanceof Ad)) {
		return new Ad(adJTree);
	}
	this.initialize(adJTree);
}
Ad.prototype.initialize = function(adJTree) {
	this.id = adJTree.attr('id');
	this.sequence = adJTree.attr('sequence');
	if(adJTree.inLine) {
		this.inLine = new InLine(adJTree.inLine);
	}
	if(adJTree.wrapper){
		this.wrapper = new Wrapper(adJTree.wrapper);
	}
};
module.exports = Ad;
},{"./InLine":18,"./Wrapper":28}],16:[function(require,module,exports){
'use strict';
var TrackingEvent = require('./TrackingEvent');
var utilities = require('../../utils/utilityFunctions');
var xml = require('../../utils/xml');
function Companion(companionJTree) {
	if (!(this instanceof Companion)) {
		return new Companion(companionJTree);
	}
	this.creativeType = xml.attr(companionJTree.staticResource, 'creativeType');
	this.staticResource = xml.keyValue(companionJTree.staticResource);
	var htmlResource = null;
	if (xml.keyValue(companionJTree.HTMLResource)) {
		htmlResource = xml.keyValue(companionJTree.HTMLResource);
	} else if (xml.keyValue(companionJTree.hTMLResource)) {
		htmlResource = xml.keyValue(companionJTree.hTMLResource);
	}
	this.htmlResource = htmlResource;
	var iframeResource = null;
	if (xml.keyValue(companionJTree.IFrameResource)) {
		iframeResource = xml.keyValue(companionJTree.IFrameResource);
	} else if (xml.keyValue(companionJTree.iFrameresource)) {
		iframeResource = xml.keyValue(companionJTree.iFrameresource);
	}
	this.iframeResource = iframeResource;
	this.id = xml.attr(companionJTree, 'id');
	this.width = xml.attr(companionJTree, 'width');
	this.height = xml.attr(companionJTree, 'height');
	this.expandedWidth = xml.attr(companionJTree, 'expandedWidth');
	this.expandedHeight = xml.attr(companionJTree, 'expandedHeight');
	this.scalable = xml.attr(companionJTree, 'scalable');
	this.maintainAspectRatio = xml.attr(companionJTree, 'maintainAspectRatio');
	this.minSuggestedDuration = xml.attr(companionJTree, 'minSuggestedDuration');
	this.apiFramework = xml.attr(companionJTree, 'apiFramework');
	this.companionClickThrough = xml.keyValue(companionJTree.companionClickThrough);
	this.trackingEvents = parseTrackingEvents(companionJTree.trackingEvents && companionJTree.trackingEvents.tracking);
	function parseTrackingEvents(trackingEvents) {
		var trackings = [];
		if (utilities.isDefined(trackingEvents)) {
			trackingEvents = utilities.isArray(trackingEvents) ? trackingEvents : [trackingEvents];
			trackingEvents.forEach(function (trackingData) {
				trackings.push(new TrackingEvent(trackingData));
			});
		}
		return trackings;
	}
}
module.exports = Companion;
},{"../../utils/utilityFunctions":45,"../../utils/xml":46,"./TrackingEvent":21}],17:[function(require,module,exports){
'use strict';
var Linear = require('./Linear');
var Companion = require('./Companion');
var utilities = require('../../utils/utilityFunctions');
var xml = require('../../utils/xml');
function Creative(creativeJTree) {
	if(!(this instanceof Creative)) {
		return new Creative(creativeJTree);
	}
	this.id = creativeJTree.attr('id');
	this.sequence = creativeJTree.attr('sequence');
	this.adId = creativeJTree.attr('adId');
	this.apiFramework = creativeJTree.attr('apiFramework');
	if(creativeJTree.linear) {
		this.linear = new Linear(creativeJTree.linear);
	}
	if(creativeJTree.creativeExtensions) {
		var ext = [];
		if (utilities.isDefined(creativeJTree.creativeExtensions)) {
			var extensions = utilities.isArray(creativeJTree.creativeExtensions.creativeExtension) ? creativeJTree.creativeExtensions.creativeExtension : [creativeJTree.creativeExtensions.creativeExtension];
			extensions.forEach(function (extensionsData) {
				ext.push(new Extent(extensionsData));
			});
		}
		this.creativeExtensions = ext;
	}
	if (creativeJTree.companionAds) {
		var companions = [];
		var companionAds = creativeJTree.companionAds && creativeJTree.companionAds.companion;
		if (utilities.isDefined(companionAds)) {
			companionAds = utilities.isArray(companionAds) ? companionAds : [companionAds];
			companionAds.forEach(function (companionData) {
				companions.push(new Companion(companionData));
			});
		}
		this.companionAds = companions;
	}
}
Creative.prototype.isSupported = function(){
	if(this.linear) {
		return this.linear.isSupported();
	}
	return true;
};
Creative.parseCreatives = function parseCreatives(creativesJTree) {
	var creatives = [];
	var creativesData;
	if (utilities.isDefined(creativesJTree) && utilities.isDefined(creativesJTree.creative)) {
		creativesData = utilities.isArray(creativesJTree.creative) ? creativesJTree.creative : [creativesJTree.creative];
		creativesData.forEach(function (creative) {
			creatives.push(new Creative(creative));
		});
	}
	return creatives;
};
function Extent(extJTree) {
	this.type = extJTree.attr('type');
	this.key = xml.keyValue(extJTree);
}
module.exports = Creative;
},{"../../utils/utilityFunctions":45,"../../utils/xml":46,"./Companion":16,"./Linear":19}],18:[function(require,module,exports){
'use strict';
var vastUtil = require('./vastUtil');
var Creative = require('./Creative');
var utilities = require('../../utils/utilityFunctions');
var xml = require('../../utils/xml');
function InLine(inlineJTree) {
	if (!(this instanceof InLine)) {
		return new InLine(inlineJTree);
	}
	this.adTitle = xml.keyValue(inlineJTree.adTitle);
	this.adSystem = xml.keyValue(inlineJTree.adSystem);
	this.impressions = vastUtil.parseImpressions(inlineJTree.impression);
	this.creatives = Creative.parseCreatives(inlineJTree.creatives);
	this.description = xml.keyValue(inlineJTree.description);
	this.advertiser = xml.keyValue(inlineJTree.advertiser);
	this.surveys = parseSurveys(inlineJTree.survey);
	this.error = xml.keyValue(inlineJTree.error);
	this.pricing = xml.keyValue(inlineJTree.pricing);
	this.extensions = inlineJTree.extensions;
	function parseSurveys(inlineSurveys) {
		if (inlineSurveys) {
			return utilities.transformArray(utilities.isArray(inlineSurveys) ? inlineSurveys : [inlineSurveys], function (survey) {
				if(utilities.isNotEmptyString(survey.keyValue)){
					return {
						uri: survey.keyValue,
						type: survey.attr('type')
					};
				}
				return undefined;
			});
		}
		return [];
	}
}
InLine.prototype.isSupported = function(){
	var i,len;
	if(this.creatives.length === 0) {
		return false;
	}
	for(i = 0, len = this.creatives.length; i< len; i+=1){
		if(!this.creatives[i].isSupported()){
			return false;
		}
	}
	return true;
};
module.exports = InLine;
},{"../../utils/utilityFunctions":45,"../../utils/xml":46,"./Creative":17,"./vastUtil":30}],19:[function(require,module,exports){
'use strict';
var TrackingEvent = require('./TrackingEvent');
var MediaFile = require('./MediaFile');
var VideoClicks = require('./VideoClicks');
var utilities = require('../../utils/utilityFunctions');
var parsers = require('./parsers');
var xml = require('../../utils/xml');
function Linear(linearJTree) {
	if (!(this instanceof Linear)) {
		return new Linear(linearJTree);
	}
	this.duration = parsers.duration(xml.keyValue(linearJTree.duration));
	this.mediaFiles = parseMediaFiles(linearJTree.mediaFiles && linearJTree.mediaFiles.mediaFile);
	this.trackingEvents = parseTrackingEvents(linearJTree.trackingEvents && linearJTree.trackingEvents.tracking, this.duration);
	this.skipoffset = parsers.offset(xml.attr(linearJTree, 'skipoffset'), this.duration);
	if (linearJTree.videoClicks) {
		this.videoClicks = new VideoClicks(linearJTree.videoClicks);
	}
	if(linearJTree.adParameters) {
		this.adParameters = xml.keyValue(linearJTree.adParameters);
		if(xml.attr(linearJTree.adParameters, 'xmlEncoded')){
			this.adParameters = xml.decode(this.adParameters);
		}
	}
	function parseTrackingEvents(trackingEvents, duration) {
		var trackings = [];
		if (utilities.isDefined(trackingEvents)) {
			trackingEvents = utilities.isArray(trackingEvents) ? trackingEvents : [trackingEvents];
			trackingEvents.forEach(function (trackingData) {
				trackings.push(new TrackingEvent(trackingData, duration));
			});
		}
		return trackings;
	}
	function parseMediaFiles(mediaFilesJxonTree) {
		var mediaFiles = [];
		if (utilities.isDefined(mediaFilesJxonTree)) {
			mediaFilesJxonTree = utilities.isArray(mediaFilesJxonTree) ? mediaFilesJxonTree : [mediaFilesJxonTree];
			mediaFilesJxonTree.forEach(function (mfData) {
				mediaFiles.push(new MediaFile(mfData));
			});
		}
		return mediaFiles;
	}
}
Linear.prototype.isSupported = function () {
	var i, len;
	for(i=0, len=this.mediaFiles.length; i<len; i+=1) {
		if(this.mediaFiles[i].isSupported()) {
			return true;
		}
	}
	return false;
};
module.exports = Linear;
},{"../../utils/utilityFunctions":45,"../../utils/xml":46,"./MediaFile":20,"./TrackingEvent":21,"./VideoClicks":27,"./parsers":29}],20:[function(require,module,exports){
'use strict';
var xml = require('../../utils/xml');
var vastUtil = require('./vastUtil');
var attributesList = [
	'delivery',
	'type',
	'width',
	'height',
	'codec',
	'id',
	'bitrate',
	'minBitrate',
	'maxBitrate',
	'scalable',
	'maintainAspectRatio',
	'apiFramework'
];
function MediaFile(mediaFileJTree) {
	if (!(this instanceof MediaFile)) {
		return new MediaFile(mediaFileJTree);
	}
	this.src = xml.keyValue(mediaFileJTree);
	for(var x=0; x<attributesList.length; x++) {
		var attribute = attributesList[x];
		this[attribute] = mediaFileJTree.attr(attribute);
	}
}
MediaFile.prototype.isSupported = function(){
	if(vastUtil.isVPAID(this)) {
		return !!vastUtil.findSupportedVPAIDTech(this.type);
	}
	if (this.type === 'video/x-flv') {
		return vastUtil.isFlashSupported();
	}
	return true;
};
module.exports = MediaFile;
},{"../../utils/xml":46,"./vastUtil":30}],21:[function(require,module,exports){
'use strict';
var parsers = require('./parsers');
var xml = require('../../utils/xml');
function TrackingEvent(trackingJTree, duration) {
	if (!(this instanceof TrackingEvent)) {
		return new TrackingEvent(trackingJTree, duration);
	}
	this.name = trackingJTree.attr('event');
	this.uri = xml.keyValue(trackingJTree);
	if('progress' === this.name) {
		this.offset = parsers.offset(trackingJTree.attr('offset'), duration);
	}
}
module.exports = TrackingEvent;
},{"../../utils/xml":46,"./parsers":29}],22:[function(require,module,exports){
'use strict';
var Ad = require('./Ad');
var VASTError = require('./VASTError');
var VASTResponse = require('./VASTResponse');
var vastUtil = require('./vastUtil');
var async = require('../../utils/async');
var http = require('../../utils/http').http;
var utilities = require('../../utils/utilityFunctions');
var xml = require('../../utils/xml');
function VASTClient(options) {
	if (!(this instanceof VASTClient)) {
		return new VASTClient(options);
	}
	var defaultOptions = {
		WRAPPER_LIMIT: 5
	};
	options = options || {};
	this.settings = utilities.extend({}, options, defaultOptions);
	this.errorURLMacros = [];
}
VASTClient.prototype.getVASTResponse = function getVASTResponse(adTagUrl, callback) {
	var that = this;
	var error = sanityCheck(adTagUrl, callback);
	if (error) {
		if (utilities.isFunction(callback)) {
			return callback(error);
		}
		throw error;
	}
	async.waterfall([
		this._getVASTAd.bind(this, adTagUrl),
		buildVASTResponse
	], callback);
	function buildVASTResponse(adsChain, cb) {
		try {
			var response = that._buildVASTResponse(adsChain);
			cb(null, response);
		} catch (e) {
			cb(e);
		}
	}
	function sanityCheck(adTagUrl, cb) {
		if (!adTagUrl) {
			return new VASTError('on VASTClient.getVASTResponse, missing ad tag URL');
		}
		if (!utilities.isFunction(cb)) {
			return new VASTError('on VASTClient.getVASTResponse, missing callback function');
		}
	}
};
VASTClient.prototype._getVASTAd = function (adTagUrl, callback) {
	var that = this;
	getAdWaterfall(adTagUrl, function (error, vastTree) {
		var waterfallAds = vastTree && utilities.isArray(vastTree.ads) ? vastTree.ads : null;
		if (error) {
			that._trackError(error, waterfallAds);
			return callback(error, waterfallAds);
		}
		getAd(waterfallAds.shift(), [], waterfallHandler);
		function waterfallHandler(error, adChain) {
			if (error) {
				that._trackError(error, adChain);
				if (waterfallAds.length > 0) {
					getAd(waterfallAds.shift(),[], waterfallHandler);
				} else {
					callback(error, adChain);
				}
			} else {
				callback(null, adChain);
			}
		}
	});
	function getAdWaterfall(adTagUrl, callback) {
		var requestVastXML = that._requestVASTXml.bind(that, adTagUrl);
		async.waterfall([
			requestVastXML,
			buildVastWaterfall
		], callback);
	}
	function buildVastWaterfall(xmlStr, callback) {
		var vastTree;
		try {
			vastTree = xml.toJXONTree(xmlStr);
			if(utilities.isArray(vastTree.ad)) {
				vastTree.ads = vastTree.ad;
			} else if(vastTree.ad){
				vastTree.ads = [vastTree.ad];
			} else {
				vastTree.ads = [];
			}
			callback(validateVASTTree(vastTree), vastTree);
		} catch (e) {
			callback(new VASTError("on VASTClient.getVASTAd.buildVastWaterfall, error parsing xml", 100), null);
		}
	}
	function validateVASTTree(vastTree) {
		var vastVersion = xml.attr(vastTree, 'version');
		if (!vastTree.ad) {
			return new VASTError('on VASTClient.getVASTAd.validateVASTTree, no Ad in VAST tree', 303);
		}
		if (vastVersion && (vastVersion != 3 && vastVersion != 2)) {
			return new VASTError('on VASTClient.getVASTAd.validateVASTTree, not supported VAST version "' + vastVersion + '"', 102);
		}
		return null;
	}
	function getAd(adTagUrl, adChain, callback) {
		if (adChain.length >= that.WRAPPER_LIMIT) {
			return callback(new VASTError("on VASTClient.getVASTAd.getAd, players wrapper limit reached (the limit is " + that.WRAPPER_LIMIT + ")", 302), adChain);
		}
		async.waterfall([
			function (next) {
				if (utilities.isString(adTagUrl)) {
					requestVASTAd(adTagUrl, next);
				} else {
					next(null, adTagUrl);
				}
			},
			buildAd
		], function (error, ad) {
			if (ad) {
				adChain.push(ad);
			}
			if (error) {
				return callback(error, adChain);
			}
			if (ad.wrapper) {
				return getAd(ad.wrapper.VASTAdTagURI, adChain, callback);
			}
			return callback(null, adChain);
		});
	}
	function buildAd(adJxonTree, callback) {
		try {
			var ad = new Ad(adJxonTree);
			callback(validateAd(ad), ad);
		} catch (e) {
			callback(new VASTError('on VASTClient.getVASTAd.buildAd, error parsing xml', 100), null);
		}
	}
	function validateAd(ad) {
		var wrapper = ad.wrapper;
		var inLine = ad.inLine;
		var errMsgPrefix = 'on VASTClient.getVASTAd.validateAd, ';
		if (inLine && wrapper) {
			return new VASTError(errMsgPrefix +"InLine and Wrapper both found on the same Ad", 101);
		}
		if (!inLine && !wrapper) {
			return new VASTError(errMsgPrefix + "nor wrapper nor inline elements found on the Ad", 101);
		}
		if (inLine && !inLine.isSupported()) {
			return new VASTError(errMsgPrefix + "could not find MediaFile that is supported by this video player", 403);
		}
		if (wrapper && !wrapper.VASTAdTagURI) {
			return new VASTError(errMsgPrefix + "missing 'VASTAdTagURI' in wrapper", 101);
		}
		return null;
	}
	function requestVASTAd(adTagUrl, callback) {
		that._requestVASTXml(adTagUrl, function (error, xmlStr) {
			if (error) {
				return callback(error);
			}
			try {
				var vastTree = xml.toJXONTree(xmlStr);
				callback(validateVASTTree(vastTree), vastTree.ad);
			} catch (e) {
				callback(new VASTError("on VASTClient.getVASTAd.requestVASTAd, error parsing xml", 100));
			}
		});
	}
};
VASTClient.prototype._requestVASTXml = function requestVASTXml(adTagUrl, callback) {
	try {
		if (utilities.isFunction(adTagUrl)) {
			adTagUrl(requestHandler);
		} else {
			http.get(adTagUrl, requestHandler, {
				withCredentials: true
			});
		}
	} catch (e) {
		callback(e);
	}
	function requestHandler(error, response, status) {
		if (error) {
			var errMsg = utilities.isDefined(status) ? "on VASTClient.requestVastXML, HTTP request error with status '" + status + "'" : "on VASTClient.requestVastXML, Error getting the the VAST XML with he passed adTagXML fn";
			return callback(new VASTError(errMsg, 301), null);
		}
		callback(null, response);
	}
};
VASTClient.prototype._buildVASTResponse = function buildVASTResponse(adsChain) {
	var response = new VASTResponse();
	addAdsToResponse(response, adsChain);
	validateResponse(response);
	return response;
	function addAdsToResponse(response, ads) {
		ads.forEach(function (ad) {
			response.addAd(ad);
		});
	}
	function validateResponse(response) {
		var progressEvents = response.trackingEvents.progress;
		if (!response.hasLinear()) {
			throw new VASTError("on VASTClient._buildVASTResponse, Received an Ad type that is not supported", 200);
		}
		if (response.duration === undefined) {
			throw new VASTError("on VASTClient._buildVASTResponse, Missing duration field in VAST response", 101);
		}
		if (progressEvents) {
			progressEvents.forEach(function (progressEvent) {
				if (!utilities.isNumber(progressEvent.offset)) {
					throw new VASTError("on VASTClient._buildVASTResponse, missing or wrong offset attribute on progress tracking event", 101);
				}
			});
		}
	}
};
VASTClient.prototype._trackError = function (error, adChain) {
	if (!utilities.isArray(adChain) || adChain.length === 0) {
		return;
	}
	var errorURLMacros = [];
	adChain.forEach(addErrorUrlMacros);
	vastUtil.track(errorURLMacros, {ERRORCODE: error.code || 900});
	function addErrorUrlMacros(ad) {
		if (ad.wrapper && ad.wrapper.error) {
			errorURLMacros.push(ad.wrapper.error);
		}
		if (ad.inLine && ad.inLine.error) {
			errorURLMacros.push(ad.inLine.error);
		}
	}
};
module.exports = VASTClient;
},{"../../utils/async":40,"../../utils/http":42,"../../utils/utilityFunctions":45,"../../utils/xml":46,"./Ad":15,"./VASTError":23,"./VASTResponse":25,"./vastUtil":30}],23:[function(require,module,exports){
'use strict';
function VASTError(message, code) {
	this.message = 'VAST Error: ' + (message || '');
	if (code) {
		this.code = code;
	}
}
VASTError.prototype = new Error();
VASTError.prototype.name = "VAST Error";
module.exports = VASTError;
},{}],24:[function(require,module,exports){
'use strict';
var VASTResponse = require('./VASTResponse');
var VASTError = require('./VASTError');
var VASTTracker = require('./VASTTracker');
var vastUtil = require('./vastUtil');
var async = require('../../utils/async');
var dom = require('../../utils/dom');
var playerUtils = require('../../utils/playerUtils');
var utilities = require('../../utils/utilityFunctions');
function VASTIntegrator(player) {
	if (!(this instanceof VASTIntegrator)) {
		return new VASTIntegrator(player);
	}
	this.player = player;
}
VASTIntegrator.prototype.playAd = function playAd(vastResponse, callback) {
	var that = this;
	callback = callback || utilities.noop;
	if (!(vastResponse instanceof VASTResponse)) {
		return callback(new VASTError('On VASTIntegrator, missing required VASTResponse'));
	}
	async.waterfall([
		function (next) {
			next(null, vastResponse);
		},
		this._selectAdSource.bind(this),
		this._createVASTTracker.bind(this),
		this._addClickThrough.bind(this),
		this._addSkipButton.bind(this),
		this._addControls.bind(this),
		this._setupEvents.bind(this),
		this._playSelectedAd.bind(this)
	], function (error, response) {
		if (error && response) {
			that._trackError(error, response);
		}
		callback(error, response);
	});
	this._adUnit = {
		_src: null,
		type: 'VAST',
		pauseAd: function () {
			that.player.pause(true);
		},
		resumeAd: function () {
			that.player.play(true);
		},
		isPaused: function () {
			return that.player.paused(true);
		},
		getSrc: function () {
			return this._src;
		}
	};
	return this._adUnit;
};
VASTIntegrator.prototype._selectAdSource = function selectAdSource(response, callback) {
	var source;
	var playerWidth = dom.getDimension(this.player.el()).width;
	response.mediaFiles.sort(function compareTo(a, b) {
		var deltaA = Math.abs(playerWidth - a.width);
		var deltaB = Math.abs(playerWidth - b.width);
		return deltaA - deltaB;
	});
	source = this.player.selectSource(response.mediaFiles).source;
	if (source) {
		if (this._adUnit) {
			this._adUnit._src = source;
		}
		return callback(null, source, response);
	}
	callback(new VASTError("Could not find Ad mediafile supported by this player", 403), response);
};
VASTIntegrator.prototype._createVASTTracker = function createVASTTracker(adMediaFile, response, callback) {
	try {
		callback(null, adMediaFile, new VASTTracker(adMediaFile.src, response), response);
	} catch (e) {
		callback(e, response);
	}
};
VASTIntegrator.prototype._setupEvents = function setupEvents(adMediaFile, tracker, response, callback) {
	var previouslyMuted;
	var player = this.player;
	player.on('fullscreenchange', trackFullscreenChange);
	player.on('vast.adStart', trackImpressions);
	player.on('pause', trackPause);
	player.on('timeupdate', trackProgress);
	player.on('volumechange', trackVolumeChange);
	playerUtils.once(player, ['vast.adEnd', 'vast.adsCancel'], unbindEvents);
	playerUtils.once(player, ['vast.adEnd', 'vast.adsCancel', 'vast.adSkip'], function(evt){
		if(evt.type === 'vast.adEnd'){
			tracker.trackComplete();
		}
	});
	return callback(null, adMediaFile, response);
	function unbindEvents() {
		player.off('fullscreenchange', trackFullscreenChange);
		player.off('vast.adStart', trackImpressions);
		player.off('pause', trackPause);
		player.off('timeupdate', trackProgress);
		player.off('volumechange', trackVolumeChange);
	}
	function trackFullscreenChange() {
		if (player.isFullscreen()) {
			tracker.trackFullscreen();
		} else {
			tracker.trackExitFullscreen();
		}
	}
	function trackPause() {
		if (Math.abs(player.duration() - player.currentTime()) < 2) {
			return;
		}
		tracker.trackPause();
		playerUtils.once(player, ['play', 'vast.adEnd', 'vast.adsCancel'], function (evt) {
			if(evt.type === 'play'){
				tracker.trackResume();
			}
		});
	}
	function trackProgress() {
		var currentTimeInMs = player.currentTime() * 1000;
		tracker.trackProgress(currentTimeInMs);
	}
	function trackImpressions() {
		tracker.trackImpressions();
		tracker.trackCreativeView();
	}
	function trackVolumeChange() {
		var muted = player.muted();
		if (muted) {
			tracker.trackMute();
		} else if (previouslyMuted) {
			tracker.trackUnmute();
		}
		previouslyMuted = muted;
	}
};
VASTIntegrator.prototype._addSkipButton = function addSkipButton(source, tracker, response, callback) {
	var skipOffsetInSec;
	var that = this;
	if (utilities.isNumber(response.skipoffset)) {
		skipOffsetInSec = response.skipoffset / 1000;
		addSkipButtonToPlayer(this.player, skipOffsetInSec);
	}
	callback(null, source, tracker, response);
	function addSkipButtonToPlayer(player, skipOffset) {
		var skipButton = window.document.createElement("div"), skipButtonWr = window.document.createElement("div");
		dom.addClass(skipButton, "vast-skip-button"); dom.addClass(skipButtonWr, "vast-skip-button-wr");
		skipButtonWr.onclick = function (e) {
			if (dom.hasClass(skipButton, 'enabled')) {
				tracker.trackSkip();
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					window.adriver_video.exitFullscreen();
				}
				player.trigger('vast.adSkip');
			}
			if (window.Event.prototype.stopPropagation !== undefined) {
				e.stopPropagation();
			} else {
				return false;
			}
		};
		var updateSkipButton = updateSkipButtonState.bind(that, skipButton, skipOffset, player);
		player.el().appendChild(skipButtonWr);
		skipButtonWr.appendChild(skipButton);
		player.on('timeupdate', updateSkipButton);
		playerUtils.once(player, ['vast.adEnd', 'vast.adsCancel'], removeSkipButton);
		if (/Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			player.on('pause', function(){
				if(window.adriver_video.currentTime()<1){
					skipButtonWr.style.zIndex = 0;
					skipButtonWr.style.display = 'none';
				}
			});
			player.on('play', function(){
					skipButtonWr.style.zIndex = 12;
					skipButtonWr.style.display = 'block';
			});
		}
		function removeSkipButton() {
			player.off('timeupdate', updateSkipButton);
			dom.remove(skipButtonWr);
		}
	}
	function updateSkipButtonState(skipButton, skipOffset, player) {
		var timeLeft = Math.ceil(skipOffset - player.currentTime());
		if (timeLeft > 0) {
			skipButton.innerHTML = decodeURI('%D0%9F%D1%80%D0%BE%D0%BF%D1%83%D1%81%D1%82%D0%B8%D1%82%D1%8C%20%D1%87%D0%B5%D1%80%D0%B5%D0%B7 ') + utilities.toFixedDigits(timeLeft, 1) + " ...";
		} else {
			if (!dom.hasClass(skipButton, 'enabled')) {
				dom.addClass(skipButton, 'enabled');
				skipButton.innerHTML = decodeURI("&times;");
			}
		}
	}
};
VASTIntegrator.prototype._addControls = function addControls(mediaFile, tracker, response, callback) {
	var player = this.player;
	var pauseButton = window.document.createElement("div"),pauseButtonWr = window.document.createElement("div");
	dom.addClass(pauseButton, "vast-pause-button"); dom.addClass(pauseButtonWr, "vast-pause-button-wr");
	pauseButton.id = "ar-vast-pause-button";pauseButtonWr.id = "ar-vast-pause-button-wr";
	player.el().appendChild(pauseButtonWr);pauseButtonWr.appendChild(pauseButton);
	pauseButtonWr.onclick = function(e) {
		if(!player.paused()){
			pauseButton.className = "vast-play-button";
			player.pause();
		} else {
			pauseButton.className = "vast-pause-button";
			player.play();
		}
	};
	var cExtensions = response.ads[0].inLine.creatives[0].creativeExtensions, sImg, eImg;
	if(cExtensions){
		for (var i = 0; i < cExtensions.length; i++) {
			if(cExtensions[i].type == 'StartPicLink'){sImg = cExtensions[i].key;}
			if(cExtensions[i].type == 'EndPicLink'){eImg = cExtensions[i].key;}
		}
	}
	if(!sImg){eImg ? sImg = eImg : sImg = Adriver_Native_Video_Params.ar_MobileImgNameStart;} if(!eImg){sImg ? eImg = sImg : eImg = Adriver_Native_Video_Params.ar_MobileImgNameEnd;}
	if(sImg || eImg){
		if(!(/^\/\//).test(sImg) && !(/^https?:\/\//).test(sImg) && sImg){sImg = Adriver_Native_Video_Params.ar_folder+sImg;}
		if(!(/^\/\//).test(eImg) && !(/^https?:\/\//).test(eImg) && eImg){eImg = Adriver_Native_Video_Params.ar_folder+eImg;}
		var adPlayImg = window.document.createElement("img");
		dom.addClass(adPlayImg, "vast-adPlayImg");
		adPlayImg.id = "ar-vast-adPlayImg";
		adPlayImg.src = sImg ? sImg : eImg;
		if (!(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
			adPlayImg.style.zIndex = 0;
			adPlayImg.style.display = 'none';
		}
		player.el().appendChild(adPlayImg);
		if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			adPlayImg.onclick = function(e) {
				window.adriver_video.play();
				if (!(/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
					window.adriver_video.requestFullscreen();
				}
			}
			player.on('pause', function(){
				if(window.adriver_video.currentTime()>1 && !window.adriver_video.ended()){
					adPlayImg.style.zIndex = 0;
					adPlayImg.style.display = 'none';
				}
				if(window.adriver_video.currentTime()==0 || window.adriver_video.ended()){
					adPlayImg.style.zIndex = 8;
					adPlayImg.style.display = 'block';
				}
			});
			player.on('vast.adEnd', function(){
				adPlayImg.src = eImg ? eImg : sImg;
				adPlayImg.style.zIndex = 8;
				adPlayImg.style.display = 'block';
			});
			if (/Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				player.on('play', function(){
					adPlayImg.style.zIndex = 0;
					adPlayImg.style.display = 'none';
				});
			}
		} else {
			player.on('pause', function(){
				if(window.adriver_video.currentTime()==0 || window.adriver_video.ended()){
					adPlayImg.style.zIndex = 8;
					adPlayImg.style.display = 'block';
				}
			});
			player.on('play', function(){
				adPlayImg.style.zIndex = 0;
				adPlayImg.style.display = 'none';
			});
			player.on('vast.adEnd', function(){
				adPlayImg.src = eImg ? eImg : sImg;
				adPlayImg.style.zIndex = 8;
				adPlayImg.style.display = 'block';
			});
		}
	}
	var volumeButton = window.document.createElement("div"),volumeButtonWr = window.document.createElement("div");
	dom.addClass(volumeButton, "vast-vol-button"); dom.addClass(volumeButtonWr, "vast-vol-button-wr");
	volumeButton.id = "ar-vast-vol-button";
	player.el().appendChild(volumeButtonWr);volumeButtonWr.appendChild(volumeButton);
	volumeButtonWr.onclick = function(e) {
		var blocker = document.getElementById('ar-vast-blocker');
		blocker.onmouseover = null;
		volumeButtonWr.onmouseover = null;
		blocker.onmouseout = null;
		volumeButtonWr.onmouseout = null;
		if(player.volume() === 0){
			volumeButton.className = "vast-vol-up-button";
			player.volume(1);
			tracker.trackUnmute();
		} else {
			if(window.adriver_video.ar_vT){clearTimeout(window.adriver_video.ar_vT);}
			volumeButton.className = "vast-vol-button";
			player.volume(0);
			tracker.trackMute();
		}
	};
	if (!(/Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
		volumeButtonWr.onmouseover = function(e) {
			if(window.adriver_video.ar_vD){clearTimeout(window.adriver_video.ar_vD);window.adriver_video.ar_vD=0}
		};
		volumeButtonWr.onmouseout = function(e) {
			if(player.volume() != 0 && !player.paused()){
				window.adriver_video.ar_vD = setTimeout (function (){window.adriver_video.ar_vol_down()}, 500);
			}
		};
	}
	if (/Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		player.on('pause', function(){
			if(window.adriver_video.currentTime()<1){
				volumeButtonWr.style.zIndex = 0;
				volumeButtonWr.style.display = 'none';
				pauseButtonWr.style.zIndex = 0;
				pauseButtonWr.style.display = 'none';
			}
		});
		player.on('play', function(){
			if (!(/iPad/i.test(navigator.userAgent))) {
				volumeButtonWr.style.zIndex = 12;
				volumeButtonWr.style.display = 'block';
			}else{
				volumeButtonWr.style.zIndex = 0;
				volumeButtonWr.style.display = 'none';
			}
			pauseButtonWr.style.zIndex = 12;
			pauseButtonWr.style.display = 'block';
		});
	}
	var progressBar = window.document.createElement("div");
	dom.addClass(progressBar, "vast-progress-bar");
	window.adriver_video.progressBar = progressBar;
	progressBar.style.width = '0px';
	progressBar.style.setProperty("transform", "initial");
	progressBar.style.setProperty("-webkit-transition", "width 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) 0s");
	progressBar.style.setProperty("-moz-transition", "width 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) 0s");
	progressBar.style.setProperty("-o-transition", "width 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) 0s");
	progressBar.style.setProperty("transition", "width 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) 0s");
	var updateProgressBar = updateProgressBarState.bind(progressBar, player);
	player.el().appendChild(progressBar);
	player.on('timeupdate', updateProgressBar);
	function updateProgressBarState(progressBar, player) {
		var progressLeft = Math.ceil((window.adriver_video.width()*window.adriver_video.currentTime())/window.adriver_video.duration());
		window.adriver_video.progressBar.style.width = progressLeft+'px';
	}
	playerUtils.once(player, ['vast.adEnd', 'vast.adsCancel'], removeControls);
	function removeControls() {
		dom.remove(pauseButton);
		dom.remove(pauseButtonWr);
		dom.remove(volumeButton);
		dom.remove(volumeButtonWr);
		dom.remove(progressBar);
	}
	return callback(null, mediaFile, tracker, response);
};
VASTIntegrator.prototype._addClickThrough = function addClickThrough(mediaFile, tracker, response, callback) {
	var player = this.player;
	var blocker = createClickThroughBlocker(player, tracker, response);
	var updateBlocker = updateBlockerURL.bind(this, blocker, response, player);
	player.el().insertBefore(blocker, player.controlBar.el());
	player.on('timeupdate', updateBlocker);
	playerUtils.once(player, ['vast.adsCancel'], removeBlocker);
	if (/iPhone|iPod/i.test(navigator.userAgent)) {
		var iblocker = createClickThroughiBlocker(player, tracker, response);
		var q = document.getElementById(Adriver_Native_Video_Params.ar_divid)
		q.appendChild(iblocker);
		iblocker.innerHTML = decodeURIComponent(Adriver_Native_Video_Params.ar_iClickText);
		playerUtils.once(player, ['vast.adsCancel'], removeiBlocker);
		var p = parseInt(window.getComputedStyle(iblocker, null).getPropertyValue('height'));
		q.style.height = parseInt(q.style.height)+p+'px';
		Adriver_Native_Video_Params.iBlocker = p;
	}
	return callback(null, mediaFile, tracker, response);
	function createClickThroughBlocker(player, tracker, response) {
		var blocker = window.document.createElement("a");
		var clickThroughMacro = response.clickThrough;
		dom.addClass(blocker, 'vast-blocker');
		blocker.id = "ar-vast-blocker";
		blocker.href = generateClickThroughURL(clickThroughMacro, player);
		if (utilities.isString(clickThroughMacro)) {
			blocker.target = "_blank";
		}
		if (!(/Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
			blocker.onmouseout = function(e) {
				if(player.volume() != 0 && !player.paused()){
					player.ar_vD = setTimeout (function (){player.ar_vol_down()}, 500);
					tracker.trackMute();
					if(document.getElementById('ar-vast-vol-button')){document.getElementById('ar-vast-vol-button').className = "vast-vol-button";}
				}
			};
			blocker.onmouseover = function(e) {
				if(player.volume() === 0 && !player.paused() && !player.ar_vD){
					var vol=player.volume();
					player.ar_vol_up(vol);
					tracker.trackUnmute();
					if(document.getElementById('ar-vast-vol-button')){document.getElementById('ar-vast-vol-button').className = "vast-vol-up-button";}
				} else if(window.adriver_video.ar_vD){
					clearTimeout(window.adriver_video.ar_vD); window.adriver_video.ar_vD=0;
				}
			};
		}
		blocker.onclick = function (e) {
			if (player.paused()) {
				player.play();
				if (window.Event.prototype.stopPropagation !== undefined) {
					e.stopPropagation();
				}
				return false;
			}
			player.pause();
			if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				window.adriver_video.exitFullscreen();
				setTimeout( tracker.trackClick , 1000);
			} else { 
				tracker.trackClick();
			}
			player.trigger('vast.adEnd');
		};
		player.on('vast.adEnd', function(){
			blocker.onclick = function (e) {
				tracker.trackClick();
			}
		});
		return blocker;
	}
	function updateBlockerURL(blocker, response, player) {
		blocker.href = generateClickThroughURL(response.clickThrough, player);
	}
	function generateClickThroughURL(clickThroughMacro, player) {
		var variables = {
			ASSETURI: mediaFile.src,
			CONTENTPLAYHEAD: vastUtil.formatProgress(player.currentTime() * 1000)
		};
		return clickThroughMacro ? vastUtil.parseURLMacro(clickThroughMacro, variables) : '#';
	}
	function removeBlocker() {
		player.off('timeupdate', updateBlocker);
		dom.remove(blocker);
	}
	function createClickThroughiBlocker(player, tracker, response) {
		var iblocker = window.document.createElement("a");
		var clickThroughMacro = response.clickThrough;
		dom.addClass(iblocker, 'vast-iblocker');
		iblocker.id = "ar-vast-iblocker";
		iblocker.href = generateClickThroughURL(clickThroughMacro, player);
		if (utilities.isString(clickThroughMacro)) {
			iblocker.target = "_blank";
		}
		iblocker.onclick = function (e) {
			tracker.trackClick();
		}
		return iblocker;
	}
	function removeiBlocker() {
		dom.remove(iblocker);
	}
};
VASTIntegrator.prototype._playSelectedAd = function playSelectedAd(source, response, callback) {
	var player = this.player;
	player.preload("auto");
	player.src(source);
	playerUtils.once(player, ['durationchange', 'error', 'vast.adsCancel'], function (evt) {
		if (evt.type === 'durationchange') {
			playAd();
		} else if(evt.type === 'error') {
			callback(new VASTError("on VASTIntegrator, Player is unable to play the Ad", 400), response);
		}
	});
	function playAd() {
		playerUtils.once(player, ['playing', 'vast.adsCancel'], function (evt) {
			if(evt.type === 'vast.adsCancel'){
				return;
			}
			player.trigger('vast.adStart');
			player.on('ended', proceed);
			player.on('vast.adsCancel', proceed);
			player.on('vast.adSkip', proceed);
			function proceed(evt) {
				if(evt.type === 'ended' && (player.duration() - player.currentTime()) > 3 ) {
					return;
				}
				player.off('ended', proceed);
				player.off('vast.adsCancel', proceed);
				player.off('vast.adSkip', proceed);
				if(evt.type === 'ended' || evt.type === 'vast.adSkip'){
					callback(null, response);
				}
			}
		});
		player.play();
	}
};
VASTIntegrator.prototype._trackError = function trackError(error, response) {
	vastUtil.track(response.errorURLMacros, {ERRORCODE: error.code || 900});
};
module.exports = VASTIntegrator;
},{"../../utils/async":40,"../../utils/dom":41,"../../utils/playerUtils":43,"../../utils/utilityFunctions":45,"./VASTError":23,"./VASTResponse":25,"./VASTTracker":26,"./vastUtil":30}],25:[function(require,module,exports){
'use strict';
var Ad = require('./Ad');
var VideoClicks = require('./VideoClicks');
var Linear = require('./Linear');
var InLine = require('./InLine');
var Wrapper = require('./Wrapper');
var utilities = require('../../utils/utilityFunctions');
var xml = require('../../utils/xml');
function VASTResponse() {
	if (!(this instanceof VASTResponse)) {
		return new VASTResponse();
	}
	this._linearAdded = false;
	this.ads = [];
	this.errorURLMacros = [];
	this.impressions = [];
	this.clickTrackings = [];
	this.customClicks = [];
	this.trackingEvents = {};
	this.mediaFiles = [];
	this.clickThrough = undefined;
	this.adTitle = '';
	this.duration = undefined;
	this.skipoffset = undefined;
}
VASTResponse.prototype.addAd = function (ad) {
	var inLine, wrapper;
	if (ad instanceof Ad) {
		inLine = ad.inLine;
		wrapper = ad.wrapper;
		this.ads.push(ad);
		if (inLine) {
			this._addInLine(inLine);
		}
		if (wrapper) {
			this._addWrapper(wrapper);
		}
	}
};
VASTResponse.prototype._addErrorTrackUrl = function (error) {
	var errorURL = error instanceof xml.JXONTree ? xml.keyValue(error) : error;
	if (errorURL) {
		this.errorURLMacros.push(errorURL);
	}
};
VASTResponse.prototype._addImpressions = function (impressions) {
	utilities.isArray(impressions) && appendToArray(this.impressions, impressions);
};
VASTResponse.prototype._addClickThrough = function (clickThrough) {
	if (utilities.isNotEmptyString(clickThrough)) {
		this.clickThrough = clickThrough;
	}
};
VASTResponse.prototype._addClickTrackings = function (clickTrackings) {
	utilities.isArray(clickTrackings) && appendToArray(this.clickTrackings, clickTrackings);
};
VASTResponse.prototype._addCustomClicks = function (customClicks) {
	utilities.isArray(customClicks) && appendToArray(this.customClicks, customClicks);
};
VASTResponse.prototype._addTrackingEvents = function (trackingEvents) {
	var eventsMap = this.trackingEvents;
	if (trackingEvents) {
		trackingEvents = utilities.isArray(trackingEvents) ? trackingEvents : [trackingEvents];
		trackingEvents.forEach(function (trackingEvent) {
			if (!eventsMap[trackingEvent.name]) {
				eventsMap[trackingEvent.name] = [];
			}
			eventsMap[trackingEvent.name].push(trackingEvent);
		});
	}
};
VASTResponse.prototype._addTitle = function (title) {
	if (utilities.isNotEmptyString(title)) {
		this.adTitle = title;
	}
};
VASTResponse.prototype._addDuration = function (duration) {
	if (utilities.isNumber(duration)) {
		this.duration = duration;
	}
};
VASTResponse.prototype._addVideoClicks = function (videoClicks) {
	if (videoClicks instanceof VideoClicks) {
		this._addClickThrough(videoClicks.clickThrough);
		this._addClickTrackings(videoClicks.clickTrackings);
		this._addCustomClicks(videoClicks.customClicks);
	}
};
VASTResponse.prototype._addMediaFiles = function (mediaFiles) {
	utilities.isArray(mediaFiles) && appendToArray(this.mediaFiles, mediaFiles);
};
VASTResponse.prototype._addSkipoffset = function (offset) {
	if (offset) {
		this.skipoffset = offset;
	}
};
VASTResponse.prototype._addAdParameters = function (adParameters) {
	if (adParameters) {
		this.adParameters = adParameters;
	}
};
VASTResponse.prototype._addLinear = function (linear) {
	if (linear instanceof Linear) {
		this._addDuration(linear.duration);
		this._addTrackingEvents(linear.trackingEvents);
		this._addVideoClicks(linear.videoClicks);
		this._addMediaFiles(linear.mediaFiles);
		this._addSkipoffset(linear.skipoffset);
		this._addAdParameters(linear.adParameters);
		this._linearAdded = true;
	}
};
VASTResponse.prototype._addInLine = function (inLine) {
	var that = this;
	if (inLine instanceof InLine) {
		this._addTitle(inLine.adTitle);
		this._addErrorTrackUrl(inLine.error);
		this._addImpressions(inLine.impressions);
		inLine.creatives.forEach(function (creative) {
			if (creative.linear) {
				that._addLinear(creative.linear);
			}
		});
	}
};
VASTResponse.prototype._addWrapper = function (wrapper) {
	var that = this;
	if (wrapper instanceof Wrapper) {
		this._addErrorTrackUrl(wrapper.error);
		this._addImpressions(wrapper.impressions);
		wrapper.creatives.forEach(function (creative) {
			var linear = creative.linear;
			if (linear) {
				that._addVideoClicks(linear.videoClicks);
				that.clickThrough = undefined;
				that._addTrackingEvents(linear.trackingEvents);
			}
		});
	}
};
VASTResponse.prototype.hasLinear = function(){
	return this._linearAdded;
};
function appendToArray(array, items) {
	items.forEach(function (item) {
		array.push(item);
	});
}
module.exports = VASTResponse;
},{"../../utils/utilityFunctions":45,"../../utils/xml":46,"./Ad":15,"./InLine":18,"./Linear":19,"./VideoClicks":27,"./Wrapper":28}],26:[function(require,module,exports){
'use strict';
var VASTError = require('./VASTError');
var VASTResponse = require('./VASTResponse');
var vastUtil = require('./vastUtil');
var utilities = require('../../utils/utilityFunctions');
function VASTTracker(assetURI, vastResponse) {
	if (!(this instanceof VASTTracker)) {
		return new VASTTracker(assetURI, vastResponse);
	}
	this.sanityCheck(assetURI, vastResponse);
	this.initialize(assetURI, vastResponse);
}
VASTTracker.prototype.initialize = function(assetURI, vastResponse) {
	this.response = vastResponse;
	this.assetURI = assetURI;
	this.progress = 0;
	this.quartiles = {
		firstQuartile: {tracked: false, time: Math.round(25 * vastResponse.duration) / 100},
		midpoint: {tracked: false, time: Math.round(50 * vastResponse.duration) / 100},
		thirdQuartile: {tracked: false, time: Math.round(75 * vastResponse.duration) / 100}
	};
};
VASTTracker.prototype.sanityCheck = function(assetURI, vastResponse) {
	if (!utilities.isString(assetURI) || utilities.isEmptyString(assetURI)) {
		throw new VASTError('on VASTTracker constructor, missing required the URI of the ad asset being played');
	}
	if (!(vastResponse instanceof VASTResponse)) {
		throw new VASTError('on VASTTracker constructor, missing required VAST response');
	}
};
VASTTracker.prototype.trackURLs = function trackURLs(urls, variables) {
	if (utilities.isArray(urls) && urls.length > 0) {
		variables = utilities.extend({
			ASSETURI: this.assetURI,
			CONTENTPLAYHEAD: vastUtil.formatProgress(this.progress)
		}, variables || {});
		vastUtil.track(urls, variables);
	}
};
VASTTracker.prototype.trackEvent = function trackEvent(eventName, trackOnce) {
	this.trackURLs(getEventUris(this.response.trackingEvents[eventName]));
	if (trackOnce) {
		this.response.trackingEvents[eventName] = undefined;
	}
	function getEventUris(trackingEvents) {
		var uris;
		if (trackingEvents) {
			uris = [];
			trackingEvents.forEach(function (event) {
				uris.push(event.uri);
			});
		}
		return uris;
	}
};
VASTTracker.prototype.trackProgress = function trackProgress(newProgressInMs) {
	var that = this;
	var events = [];
	var ONCE = true;
	var ALWAYS = false;
	var trackingEvents = this.response.trackingEvents;
	if (utilities.isNumber(newProgressInMs)) {
		addTrackEvent('start', ONCE, newProgressInMs > 0);
		addTrackEvent('rewind', ALWAYS, hasRewound(this.progress, newProgressInMs));
		addQuartileEvents(newProgressInMs);
		trackProgressEvents(newProgressInMs);
		trackEvents();
		this.progress = newProgressInMs;
	}
	function hasRewound(currentProgress, newProgress) {
		var REWIND_THRESHOLD = 3000;
		return currentProgress > newProgressInMs && Math.abs(newProgress - currentProgress) > REWIND_THRESHOLD;
	}
	function addTrackEvent(eventName, trackOnce, canBeAdded) {
		if (trackingEvents[eventName] && canBeAdded) {
			events.push({
				name: eventName,
				trackOnce: !!trackOnce
			});
		}
	}
	function addQuartileEvents(progress) {
		var quartiles = that.quartiles;
		var firstQuartile = that.quartiles.firstQuartile;
		var midpoint = that.quartiles.midpoint;
		var thirdQuartile = that.quartiles.thirdQuartile;
		if (!firstQuartile.tracked) {
			trackQuartile('firstQuartile', progress);
		} else if (!midpoint.tracked) {
			trackQuartile('midpoint', progress);
		} else if (!thirdQuartile.tracked){
			trackQuartile('thirdQuartile', progress);
		}
		function trackQuartile(quartileName, progress){
			var quartile = quartiles[quartileName];
			if(canBeTracked(quartile, progress)){
				quartile.tracked = true;
				addTrackEvent(quartileName, ONCE, true);
			}
		}
	}
	function canBeTracked(quartile, progress) {
		var quartileTime = quartile.time;
		return progress >= quartileTime && progress <= (quartileTime + 5000);
	}
	function trackProgressEvents(progress) {
		if (!utilities.isArray(trackingEvents.progress)) {
			return;
		}
		var pendingProgressEvts = [];
		trackingEvents.progress.forEach(function (evt) {
			if (evt.offset <= progress) {
				that.trackURLs([evt.uri]);
			} else {
				pendingProgressEvts.push(evt);
			}
		});
		trackingEvents.progress = pendingProgressEvts;
	}
	function trackEvents() {
		events.forEach(function (event) {
			that.trackEvent(event.name, event.trackOnce);
		});
	}
};
[
	'rewind',
	'fullscreen',
	'exitFullscreen',
	'pause',
	'resume',
	'mute',
	'unmute',
	'acceptInvitation',
	'acceptInvitationLinear',
	'collapse',
	'expand'
].forEach(function (eventName) {
	VASTTracker.prototype['track' + utilities.capitalize(eventName)] = function () {
		this.trackEvent(eventName);
	};
});
[
	'start',
	'skip',
	'close',
	'closeLinear'
].forEach(function (eventName) {
	VASTTracker.prototype['track' + utilities.capitalize(eventName)] = function () {
		this.trackEvent(eventName, true);
	};
});
[
	'firstQuartile',
	'midpoint',
	'thirdQuartile'
].forEach(function (quartile) {
	VASTTracker.prototype['track' + utilities.capitalize(quartile)] = function () {
		this.quartiles[quartile].tracked = true;
		this.trackEvent(quartile, true);
	};
});
VASTTracker.prototype.trackComplete = function () {
	if(this.quartiles.thirdQuartile.tracked){
		this.trackEvent('complete', true);
	}
};
VASTTracker.prototype.trackErrorWithCode = function trackErrorWithCode(errorcode) {
	if (utilities.isNumber(errorcode)) {
		this.trackURLs(this.response.errorURLMacros, {ERRORCODE: errorcode});
	}
};
VASTTracker.prototype.trackImpressions = function trackImpressions() {
	this.trackURLs(this.response.impressions);
};
VASTTracker.prototype.trackCreativeView = function trackCreativeView() {
	this.trackEvent('creativeView');
};
VASTTracker.prototype.trackClick = function trackClick() {
	this.trackURLs(this.response.clickTrackings);
};
module.exports = VASTTracker;
},{"../../utils/utilityFunctions":45,"./VASTError":23,"./VASTResponse":25,"./vastUtil":30}],27:[function(require,module,exports){
'use strict';
var utilities = require('../../utils/utilityFunctions');
var xml = require('../../utils/xml');
function VideoClicks(videoClickJTree) {
	if (!(this instanceof VideoClicks)) {
		return new VideoClicks(videoClickJTree);
	}
	this.clickThrough = xml.keyValue(videoClickJTree.clickThrough);
	this.clickTrackings = parseClickTrackings(videoClickJTree.clickTracking);
	this.customClicks = parseClickTrackings(videoClickJTree.customClick);
	function parseClickTrackings(trackingData) {
		var clickTrackings = [];
		if (trackingData) {
			trackingData = utilities.isArray(trackingData) ? trackingData : [trackingData];
			trackingData.forEach(function (clickTrackingData) {
				clickTrackings.push(xml.keyValue(clickTrackingData));
			});
		}
		return clickTrackings;
	}
}
module.exports = VideoClicks;
},{"../../utils/utilityFunctions":45,"../../utils/xml":46}],28:[function(require,module,exports){
'use strict';
var vastUtil = require('./vastUtil');
var Creative = require('./Creative');
var utilities = require('../../utils/utilityFunctions');
var xml = require('../../utils/xml');
function Wrapper(wrapperJTree) {
	if(!(this instanceof Wrapper)) {
		return new Wrapper(wrapperJTree);
	}
	this.adSystem = xml.keyValue(wrapperJTree.adSystem);
	this.impressions = vastUtil.parseImpressions(wrapperJTree.impression);
	this.VASTAdTagURI = xml.keyValue(wrapperJTree.vASTAdTagURI);
	this.creatives = Creative.parseCreatives(wrapperJTree.creatives);
	this.error = xml.keyValue(wrapperJTree.error);
	this.extensions = wrapperJTree.extensions;
	this.followAdditionalWrappers = utilities.isDefined(xml.attr(wrapperJTree, 'followAdditionalWrappers'))? xml.attr(wrapperJTree, 'followAdditionalWrappers'): true;
	this.allowMultipleAds = xml.attr(wrapperJTree, 'allowMultipleAds');
	this.fallbackOnNoAd = xml.attr(wrapperJTree, 'fallbackOnNoAd');
}
module.exports = Wrapper;
},{"../../utils/utilityFunctions":45,"../../utils/xml":46,"./Creative":17,"./vastUtil":30}],29:[function(require,module,exports){
'use strict';
var utilities = require('../../utils/utilityFunctions');
var durationRegex = /(\d\d):(\d\d):(\d\d)(\.(\d\d\d))?/;
var parsers = {
	duration: function parseDuration(durationStr) {
		var match, durationInMs;
		if (utilities.isString(durationStr)) {
			match = durationStr.match(durationRegex);
			if (match) {
				durationInMs = parseHoursToMs(match[1]) + parseMinToMs(match[2]) + parseSecToMs(match[3]) + parseInt(match[5] || 0);
			}
		}
		return isNaN(durationInMs) ? null : durationInMs;
		function parseHoursToMs(hourStr) {
			return parseInt(hourStr, 10) * 60 * 60 * 1000;
		}
		function parseMinToMs(minStr) {
			return parseInt(minStr, 10) * 60 * 1000;
		}
		function parseSecToMs(secStr) {
			return parseInt(secStr, 10) * 1000;
		}
	},
	offset: function parseOffset(offset, duration) {
		if(isPercentage(offset)){
			return calculatePercentage(offset, duration);
		}
		return parsers.duration(offset);
		function isPercentage(offset) {
			var percentageRegex = /^\d+(\.\d+)?%$/g;
			return percentageRegex.test(offset);
		}
		function calculatePercentage(percentStr, duration) {
			if(duration) {
				return calcPercent(duration, parseFloat(percentStr.replace('%', '')));
			}
			return null;
		}
		function calcPercent(quantity, percent){
			return quantity * percent / 100;
		}
	}
};
module.exports = parsers;
},{"../../utils/utilityFunctions":45}],30:[function(require,module,exports){
'use strict';
var utilities = require('../../utils/utilityFunctions');
var VPAIDHTML5Tech = require('../vpaid/VPAIDHTML5Tech');
var VPAIDFlashTech = require('../vpaid/VPAIDFlashTech');
var VPAIDFLASHClient = require('VPAIDFLASHClient/js/VPAIDFLASHClient');
var vastUtil = {
	track: function track(URLMacros, variables) {
		var sources = vastUtil.parseURLMacros(URLMacros, variables);
		var trackImgs = [];
		sources.forEach(function (src) {
			var img = new Image();
			img.src = src;
			trackImgs.push(img);
		});
		return trackImgs;
	},
	parseURLMacros: function parseMacros(URLMacros, variables) {
		var parsedURLs = [];
		variables = variables || {};
		if (!(variables["CACHEBUSTING"])) {
			variables["CACHEBUSTING"] = Math.round(Math.random() * 1.0e+10);
		}
		URLMacros.forEach(function (URLMacro) {
			parsedURLs.push(vastUtil._parseURLMacro(URLMacro, variables));
		});
		return parsedURLs;
	},
	parseURLMacro: function parseMacro(URLMacro, variables) {
		variables = variables || {};
		if (!(variables["CACHEBUSTING"])) {
			variables["CACHEBUSTING"] = Math.round(Math.random() * 1.0e+10);
		}
		return vastUtil._parseURLMacro(URLMacro, variables);
	},
	_parseURLMacro: function parseMacro(URLMacro, variables) {
		variables = variables || {};
		utilities.forEach(variables, function (value, key) {
			URLMacro = URLMacro.replace(new RegExp("\\[" + key + "\\\]", 'gm'), value);
		});
		return URLMacro;
	},
	parseDuration: function parseDuration(durationStr) {
		var durationRegex = /(\d\d):(\d\d):(\d\d)(\.(\d\d\d))?/;
		var match, durationInMs;
		if (utilities.isString(durationStr)) {
			match = durationStr.match(durationRegex);
			if (match) {
				durationInMs = parseHoursToMs(match[1]) + parseMinToMs(match[2]) + parseSecToMs(match[3]) + parseInt(match[5] || 0);
			}
		}
		return isNaN(durationInMs) ? null : durationInMs;
		function parseHoursToMs(hourStr) {
			return parseInt(hourStr, 10) * 60 * 60 * 1000;
		}
		function parseMinToMs(minStr) {
			return parseInt(minStr, 10) * 60 * 1000;
		}
		function parseSecToMs(secStr) {
			return parseInt(secStr, 10) * 1000;
		}
	},
	parseImpressions: function parseImpressions(impressions) {
		if (impressions) {
			impressions = utilities.isArray(impressions) ? impressions : [impressions];
			return utilities.transformArray(impressions, function (impression) {
				if (utilities.isNotEmptyString(impression.keyValue)) {
					return impression.keyValue;
				}
				return undefined;
			});
		}
		return [];
	},
	formatProgress: function formatProgress(progress) {
		var hours, minutes, seconds, milliseconds;
		hours = progress / (60 * 60 * 1000);
		hours = Math.floor(hours);
		minutes = (progress / (60 * 1000)) % 60;
		minutes = Math.floor(minutes);
		seconds = (progress / 1000) % 60;
		seconds = Math.floor(seconds);
		milliseconds = progress % 1000;
		return utilities.toFixedDigits(hours, 2) + ':' + utilities.toFixedDigits(minutes, 2) + ':' + utilities.toFixedDigits(seconds, 2) + '.' + utilities.toFixedDigits(milliseconds, 3);
	},
	parseOffset: function parseOffset(offset, duration) {
		if (isPercentage(offset)) {
			return calculatePercentage(offset, duration);
		}
		return vastUtil.parseDuration(offset);
		function isPercentage(offset) {
			var percentageRegex = /^\d+(\.\d+)?%$/g;
			return percentageRegex.test(offset);
		}
		function calculatePercentage(percentStr, duration) {
			if (duration) {
				return calcPercent(duration, parseFloat(percentStr.replace('%', '')));
			}
			return null;
		}
		function calcPercent(quantity, percent) {
			return quantity * percent / 100;
		}
	},
	VPAID_techs: [
		VPAIDFlashTech,
		VPAIDHTML5Tech
	],
	isVPAID: function isVPAIDMediaFile(mediaFile) {
		return !!mediaFile && mediaFile.apiFramework === 'VPAID';
	},
	findSupportedVPAIDTech: function findSupportedVPAIDTech(mimeType) {
		var i, len, VPAIDTech;
		for (i = 0, len = this.VPAID_techs.length; i < len; i += 1) {
			VPAIDTech = this.VPAID_techs[i];
			if (VPAIDTech.supports(mimeType)) {
				return VPAIDTech;
			}
		}
		return null;
	},
	isFlashSupported: function isFlashSupported() {
		return VPAIDFLASHClient.isSupported();
	},
	runFlashSupportCheck: function runFlashSupportCheck(vpaidFlashLoaderPath) {
		VPAIDFLASHClient.runFlashTest({data: vpaidFlashLoaderPath});
	}
};
module.exports = vastUtil;
},{"../../utils/utilityFunctions":45,"../vpaid/VPAIDFlashTech":32,"../vpaid/VPAIDHTML5Tech":33,"VPAIDFLASHClient/js/VPAIDFLASHClient":3}],31:[function(require,module,exports){
'use strict';
var VASTError = require('../vast/VASTError');
var utilities = require('../../utils/utilityFunctions');
function VPAIDAdUnitWrapper(vpaidAdUnit, opts) {
	if (!(this instanceof VPAIDAdUnitWrapper)) {
		return new VPAIDAdUnitWrapper(vpaidAdUnit, opts);
	}
	sanityCheck(vpaidAdUnit, opts);
	this.options = utilities.extend({}, opts);
	this._adUnit = vpaidAdUnit;
	function sanityCheck(adUnit, opts) {
		if (!adUnit || !VPAIDAdUnitWrapper.checkVPAIDInterface(adUnit)) {
			throw new VASTError('on VPAIDAdUnitWrapper, the passed VPAID adUnit does not fully implement the VPAID interface');
		}
		if (!utilities.isObject(opts)) {
			throw new VASTError("on VPAIDAdUnitWrapper, expected options hash  but got '" + opts + "'");
		}
		if (!("responseTimeout" in opts) || !utilities.isNumber(opts.responseTimeout) ){
			throw new VASTError("on VPAIDAdUnitWrapper, expected responseTimeout in options");
		}
	}
}
VPAIDAdUnitWrapper.checkVPAIDInterface = function checkVPAIDInterface(VPAIDAdUnit) {
	var VPAIDInterfaceMethods = [
		'handshakeVersion', 'initAd', 'startAd', 'stopAd', 'resizeAd', 'pauseAd', 'expandAd', 'collapseAd'
	];
	for (var i = 0, len = VPAIDInterfaceMethods.length; i < len; i++) {
		if (!VPAIDAdUnit || !utilities.isFunction(VPAIDAdUnit[VPAIDInterfaceMethods[i]])) {
			return false;
		}
	}
	return canSubscribeToEvents(VPAIDAdUnit) && canUnsubscribeFromEvents(VPAIDAdUnit);
	function canSubscribeToEvents(adUnit) {
		return utilities.isFunction(adUnit.subscribe) || utilities.isFunction(adUnit.addEventListener) || utilities.isFunction(adUnit.on);
	}
	function canUnsubscribeFromEvents(adUnit) {
		return utilities.isFunction(adUnit.unsubscribe) || utilities.isFunction(adUnit.removeEventListener) || utilities.isFunction(adUnit.off);
	}
};
VPAIDAdUnitWrapper.prototype.adUnitAsyncCall = function () {
	var args = utilities.arrayLikeObjToArray(arguments);
	var method = args.shift();
	var cb = args.pop();
	var timeoutId;
	sanityCheck(method, cb, this._adUnit);
	args.push(wrapCallback());
	this._adUnit[method].apply(this._adUnit, args);
	timeoutId = setTimeout(function () {
		timeoutId = null;
		cb(new VASTError("on VPAIDAdUnitWrapper, timeout while waiting for a response on call '" + method + "'"));
		cb = utilities.noop;
	}, this.options.responseTimeout);
	function sanityCheck(method, cb, adUnit) {
		if (!utilities.isString(method) || !utilities.isFunction(adUnit[method])) {
			throw new VASTError("on VPAIDAdUnitWrapper.adUnitAsyncCall, invalid method name");
		}
		if (!utilities.isFunction(cb)) {
			throw new VASTError("on VPAIDAdUnitWrapper.adUnitAsyncCall, missing callback");
		}
	}
	function wrapCallback() {
		return function () {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			cb.apply(this, arguments);
		};
	}
};
VPAIDAdUnitWrapper.prototype.on = function (evtName, handler) {
	var addEventListener = this._adUnit.addEventListener || this._adUnit.subscribe || this._adUnit.on;
	addEventListener.call(this._adUnit, evtName, handler);
};
VPAIDAdUnitWrapper.prototype.off = function (evtName, handler) {
	var removeEventListener = this._adUnit.removeEventListener || this._adUnit.unsubscribe || this._adUnit.off;
	removeEventListener.call(this._adUnit, evtName, handler);
};
VPAIDAdUnitWrapper.prototype.waitForEvent = function (evtName, cb, context) {
	var timeoutId;
	sanityCheck(evtName, cb);
	context = context || null;
	this.on(evtName, responseListener);
	timeoutId = setTimeout(function () {
		cb(new VASTError("on VPAIDAdUnitWrapper.waitForEvent, timeout while waiting for event '" + evtName + "'"));
		timeoutId = null;
		cb = utilities.noop;
	}, this.options.responseTimeout);
	function sanityCheck(evtName, cb) {
		if (!utilities.isString(evtName)) {
			throw new VASTError("on VPAIDAdUnitWrapper.waitForEvent, missing evt name");
		}
		if (!utilities.isFunction(cb)) {
			throw new VASTError("on VPAIDAdUnitWrapper.waitForEvent, missing callback");
		}
	}
	function responseListener() {
		var args = utilities.arrayLikeObjToArray(arguments);
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
		args.unshift(null);
		cb.apply(context, args);
	}
};
VPAIDAdUnitWrapper.prototype.handshakeVersion = function (version, cb) {
	this.adUnitAsyncCall('handshakeVersion', version, cb);
};
VPAIDAdUnitWrapper.prototype.initAd = function (width, height, viewMode, desiredBitrate, adUnitData, cb) {
	this.waitForEvent('AdLoaded', cb);
	this._adUnit.initAd(width, height, viewMode, desiredBitrate, adUnitData);
};
VPAIDAdUnitWrapper.prototype.resizeAd = function (width, height, viewMode, cb) {
	this.adUnitAsyncCall('resizeAd', width, height, viewMode, cb);
};
VPAIDAdUnitWrapper.prototype.startAd = function (cb) {
	this.waitForEvent('AdStarted', cb);
	this._adUnit.startAd();
};
VPAIDAdUnitWrapper.prototype.stopAd = function (cb) {
	this.waitForEvent('AdStopped', cb);
	this._adUnit.stopAd();
};
VPAIDAdUnitWrapper.prototype.pauseAd = function (cb) {
	this.waitForEvent('AdPaused', cb);
	this._adUnit.pauseAd();
};
VPAIDAdUnitWrapper.prototype.resumeAd = function (cb) {
	this.waitForEvent('AdPlaying', cb);
	this._adUnit.resumeAd();
};
VPAIDAdUnitWrapper.prototype.expandAd = function (cb) {
	this.waitForEvent('AdExpandedChange', cb);
	this._adUnit.expandAd();
};
VPAIDAdUnitWrapper.prototype.collapseAd = function (cb) {
	this.waitForEvent('AdExpandedChange', cb);
	this._adUnit.collapseAd();
};
VPAIDAdUnitWrapper.prototype.skipAd = function (cb) {
	this.waitForEvent('AdSkipped', cb);
	this._adUnit.skipAd();
};
[
	'adLinear',
	'adWidth',
	'adHeight',
	'adExpanded',
	'adSkippableState',
	'adRemainingTime',
	'adDuration',
	'adVolume',
	'adCompanions',
	'adIcons'
].forEach(function (property) {
	var getterName = 'get' + utilities.capitalize(property);
	VPAIDAdUnitWrapper.prototype[getterName] = function (cb) {
		this.adUnitAsyncCall(getterName, cb);
	};
});
VPAIDAdUnitWrapper.prototype.setAdVolume = function(volume, cb){
	this.adUnitAsyncCall('setAdVolume',volume, cb);
};
module.exports = VPAIDAdUnitWrapper;
},{"../../utils/utilityFunctions":45,"../vast/VASTError":23}],32:[function(require,module,exports){
'use strict';
var VASTError = require('../vast/VASTError');
var VPAIDFLASHClient = require('VPAIDFLASHClient/js/VPAIDFLASHClient');
var utilities = require('../../utils/utilityFunctions');
var dom = require('../../utils/dom');
function VPAIDFlashTech(mediaFile, settings) {
	if (!(this instanceof VPAIDFlashTech)) {
		return new VPAIDFlashTech(mediaFile);
	}
	sanityCheck(mediaFile);
	this.name = 'vpaid-flash';
	this.mediaFile = mediaFile;
	this.containerEl = null;
	this.vpaidFlashClient = null;
	this.settings = settings;
	function sanityCheck(mediaFile) {
		if (!mediaFile || !utilities.isString(mediaFile.src)) {
			throw new VASTError('on VPAIDFlashTech, invalid MediaFile');
		}
	}
}
VPAIDFlashTech.VPAIDFLASHClient = VPAIDFLASHClient;
VPAIDFlashTech.supports = function (type) {
	return type === 'application/x-shockwave-flash' && VPAIDFlashTech.VPAIDFLASHClient.isSupported();
};
VPAIDFlashTech.prototype.loadAdUnit = function loadFlashCreative(containerEl, objectEl, callback) {
	var that = this;
	var flashClientOpts = this.settings && this.settings.vpaidFlashLoaderPath ? {data: this.settings.vpaidFlashLoaderPath} : undefined;
	sanityCheck(containerEl, callback);
	this.containerEl = containerEl;
	this.vpaidFlashClient = new VPAIDFlashTech.VPAIDFLASHClient(containerEl, function (error) {
		if (error) {
			return callback(error);
		}
		that.vpaidFlashClient.loadAdUnit(that.mediaFile.src, callback);
	}, flashClientOpts);
	function sanityCheck(container, cb) {
		if (!dom.isDomElement(container)) {
			throw new VASTError('on VPAIDFlashTech.loadAdUnit, invalid dom container element');
		}
		if (!utilities.isFunction(cb)) {
			throw new VASTError('on VPAIDFlashTech.loadAdUnit, missing valid callback');
		}
	}
};
VPAIDFlashTech.prototype.unloadAdUnit = function () {
	if (this.vpaidFlashClient) {
		try{
			this.vpaidFlashClient.destroy();
		} catch(e){
			if(console && utilities.isFunction(console.log)){
				console.log('VAST ERROR: trying to unload the VPAID adunit');
			}
		}
		this.vpaidFlashClient = null;
	}
	if (this.containerEl) {
		dom.remove(this.containerEl);
		this.containerEl = null;
	}
};
module.exports = VPAIDFlashTech;
},{"../../utils/dom":41,"../../utils/utilityFunctions":45,"../vast/VASTError":23,"VPAIDFLASHClient/js/VPAIDFLASHClient":3}],33:[function(require,module,exports){
'use strict';
var VASTError = require('../vast/VASTError');
var VPAIDHTML5Client = require('VPAIDHTML5Client/js/VPAIDHTML5Client');
var utilities = require('../../utils/utilityFunctions');
var dom = require('../../utils/dom');
function VPAIDHTML5Tech(mediaFile) {
	if(!(this instanceof VPAIDHTML5Tech)) {
		return new VPAIDHTML5Tech(mediaFile);
	}
	sanityCheck(mediaFile);
	this.name = 'vpaid-html5';
	this.containerEl = null;
	this.videoEl = null;
	this.vpaidHTMLClient = null;
	this.mediaFile = mediaFile;
	function sanityCheck(mediaFile) {
		if (!mediaFile || !utilities.isString(mediaFile.src)) {
			throw new VASTError(VPAIDHTML5Tech.INVALID_MEDIA_FILE);
		}
	}
}
VPAIDHTML5Tech.VPAIDHTML5Client = VPAIDHTML5Client;
VPAIDHTML5Tech.supports = function (type) {
	return !utilities.isOldIE() && type === 'application/javascript';
};
VPAIDHTML5Tech.prototype.loadAdUnit = function loadAdUnit(containerEl, videoEl, callback) {
	sanityCheck(containerEl, videoEl, callback);
	this.containerEl = containerEl;
	this.videoEl = videoEl;
	this.vpaidHTMLClient = new VPAIDHTML5Tech.VPAIDHTML5Client(containerEl, videoEl, {});
	this.vpaidHTMLClient.loadAdUnit(this.mediaFile.src, callback);
	function sanityCheck(container, video, cb) {
		if (!dom.isDomElement(container)) {
			throw new VASTError(VPAIDHTML5Tech.INVALID_DOM_CONTAINER_EL);
		}
		if (!dom.isDomElement(video) || video.tagName.toLowerCase() !== 'video') {
			throw new VASTError(VPAIDHTML5Tech.INVALID_DOM_CONTAINER_EL);
		}
		if (!utilities.isFunction(cb)) {
			throw new VASTError(VPAIDHTML5Tech.MISSING_CALLBACK);
		}
	}
};
VPAIDHTML5Tech.prototype.unloadAdUnit = function unloadAdUnit() {
	if (this.vpaidHTMLClient) {
		try {
			this.vpaidHTMLClient.destroy();
		} catch(e) {
			if (console && utilities.isFunction(console.log)) {
				console.log('VAST ERROR: trying to unload the VPAID adunit');
			}
		}
		this.vpaidHTMLClient = null;
	}
	if (this.containerEl) {
		dom.remove(this.containerEl);
		this.containerEl = null;
	}
};
var PREFIX = 'on VPAIDHTML5Tech';
VPAIDHTML5Tech.INVALID_MEDIA_FILE = PREFIX + ', invalid MediaFile';
VPAIDHTML5Tech.INVALID_DOM_CONTAINER_EL = PREFIX + ', invalid container HtmlElement';
VPAIDHTML5Tech.INVALID_DOM_VIDEO_EL = PREFIX + ', invalid HTMLVideoElement';
VPAIDHTML5Tech.MISSING_CALLBACK = PREFIX + ', missing valid callback';
module.exports = VPAIDHTML5Tech;
},{"../../utils/dom":41,"../../utils/utilityFunctions":45,"../vast/VASTError":23,"VPAIDHTML5Client/js/VPAIDHTML5Client":11}],34:[function(require,module,exports){
'use strict';
var VASTError = require('../vast/VASTError');
var VASTResponse = require('../vast/VASTResponse');
var VASTTracker = require('../vast/VASTTracker');
var vastUtil = require('../vast/vastUtil');
var VPAIDAdUnitWrapper = require('./VPAIDAdUnitWrapper');
var async = require('../../utils/async');
var dom = require('../../utils/dom');
var playerUtils = require('../../utils/playerUtils');
var utilities = require('../../utils/utilityFunctions');
function VPAIDIntegrator(player, settings) {
	if (!(this instanceof VPAIDIntegrator)) {
		return new VPAIDIntegrator(player);
	}
	this.VIEW_MODE = {
		NORMAL: 'normal',
		FULLSCREEN: "fullscreen",
		THUMBNAIL: "thumbnail"
	};
	this.player = player;
	this.containerEl = createVPAIDContainerEl(player);
	this.options = {
		responseTimeout: 5000,
		VPAID_VERSION: '2.0'
	};
	this.settings = settings;
	function createVPAIDContainerEl() {
		var containerEl = document.createElement('div');
		dom.addClass(containerEl, 'VPAID-container');
		player.el().insertBefore(containerEl, player.controlBar.el());
		return containerEl;
	}
}
VPAIDIntegrator.prototype.playAd = function playVPaidAd(vastResponse, callback) {
	if (!(vastResponse instanceof VASTResponse)) {
		return callback(new VASTError('on VASTIntegrator.playAd, missing required VASTResponse'));
	}
	var that = this;
	var player = this.player;
	var tech = this._findSupportedTech(vastResponse, this.settings);
	callback = callback || utilities.noop;
	this._adUnit = null;
	dom.addClass(player.el(), 'vjs-vpaid-ad');
	player.on('vast.adsCancel', triggerVpaidAdEnd);
	player.one('vpaid.adEnd', function(){
		player.off('vast.adsCancel', triggerVpaidAdEnd);
		removeAdUnit();
	});
	if (tech) {
		async.waterfall([
			function (next) {
				next(null, tech, vastResponse);
			},
			this._loadAdUnit.bind(this),
			this._playAdUnit.bind(this),
			this._finishPlaying.bind(this)
		], adComplete);
		this._adUnit = {
			_paused: true,
			type: 'VPAID',
			pauseAd: function() {
				player.trigger('vpaid.pauseAd');
				player.pause(true);
			},
			resumeAd: function() {
				player.trigger('vpaid.resumeAd');
			},
			isPaused: function() {
				return this._paused;
			},
			getSrc: function() {
				return tech.mediaFile;
			}
		};
	} else {
		var error = new VASTError('on VPAIDIntegrator.playAd, could not find a supported mediaFile', 403);
		adComplete(error, this._adUnit, vastResponse);
	}
	return this._adUnit;
	function adComplete(error, adUnit, vastResponse) {
		if (error && vastResponse) {
			that._trackError(vastResponse, error.code);
		}
		player.trigger('vpaid.adEnd');
		callback(error, vastResponse);
	}
	function triggerVpaidAdEnd(){
		player.trigger('vpaid.adEnd');
	}
	function removeAdUnit() {
		if (tech) {
			tech.unloadAdUnit();
		}
		dom.removeClass(player.el(), 'vjs-vpaid-ad');
	}
};
VPAIDIntegrator.prototype._findSupportedTech = function (vastResponse, settings) {
	if (!(vastResponse instanceof VASTResponse)) {
		return null;
	}
	var vpaidMediaFiles = vastResponse.mediaFiles.filter(vastUtil.isVPAID);
	var i, len, mediaFile, VPAIDTech;
	for (i = 0, len = vpaidMediaFiles.length; i < len; i += 1) {
		mediaFile = vpaidMediaFiles[i];
		VPAIDTech = vastUtil.findSupportedVPAIDTech(mediaFile.type);
		if (VPAIDTech) {
			return new VPAIDTech(mediaFile, settings);
		}
	}
	return null;
};
VPAIDIntegrator.prototype._createVPAIDAdUnitWrapper = function(adUnit, src, responseTimeout) {
	return new VPAIDAdUnitWrapper(adUnit, {src: src, responseTimeout: responseTimeout});
};
VPAIDIntegrator.prototype._loadAdUnit = function (tech, vastResponse, next) {
	var that = this;
	var player = this.player;
	var vjsTechEl = player.el().querySelector('.vjs-tech');
	var responseTimeout = this.settings.responseTimeout || this.options.responseTimeout;
	tech.loadAdUnit(this.containerEl, vjsTechEl, function (error, adUnit) {
		if (error) {
			return next(error, adUnit, vastResponse);
		}
		try {
			var WrappedAdUnit = that._createVPAIDAdUnitWrapper(adUnit, tech.mediaFile.src, responseTimeout);
			var techClass = 'vjs-' + tech.name + '-ad';
			dom.addClass(player.el(), techClass);
			player.one('vpaid.adEnd', function() {
				dom.removeClass(player.el(),techClass);
			});
			next(null, WrappedAdUnit, vastResponse);
		} catch (e) {
			next(e, adUnit, vastResponse);
		}
	});
};
VPAIDIntegrator.prototype._playAdUnit = function (adUnit, vastResponse, callback) {
	async.waterfall([
		function (next) {
			next(null, adUnit, vastResponse);
		},
		this._handshake.bind(this),
		this._initAd.bind(this),
		this._setupEvents.bind(this),
		this._addSkipButton.bind(this),
		this._linkPlayerControls.bind(this),
		this._startAd.bind(this)
	], callback);
};
VPAIDIntegrator.prototype._handshake = function handshake(adUnit, vastResponse, next) {
	adUnit.handshakeVersion(this.options.VPAID_VERSION, function (error, version) {
		if (error) {
			return next(error, adUnit, vastResponse);
		}
		if (version && isSupportedVersion(version)) {
			return next(null, adUnit, vastResponse);
		}
		return next(new VASTError('on VPAIDIntegrator._handshake, unsupported version "' + version + '"'), adUnit, vastResponse);
	});
	function isSupportedVersion(version) {
		var majorNum = major(version);
		return majorNum >= 1 && majorNum <= 2;
	}
	function major(version) {
		var parts = version.split('.');
		return parseInt(parts[0], 10);
	}
};
VPAIDIntegrator.prototype._initAd = function (adUnit, vastResponse, next) {
	var tech = this.player.el().querySelector('.vjs-tech');
	var dimension = dom.getDimension(tech);
	adUnit.initAd(dimension.width, dimension.height, this.VIEW_MODE.NORMAL, -1, {AdParameters: vastResponse.adParameters || ''}, function (error) {
		next(error, adUnit, vastResponse);
	});
};
VPAIDIntegrator.prototype._createVASTTracker = function(adUnitSrc, vastResponse) {
	return new VASTTracker(adUnitSrc, vastResponse);
};
VPAIDIntegrator.prototype._setupEvents = function (adUnit, vastResponse, next) {
	var adUnitSrc = adUnit.options.src;
	var tracker = this._createVASTTracker(adUnitSrc, vastResponse);
	var player = this.player;
	var that = this;
	adUnit.on('AdSkipped', function () {
		player.trigger('vpaid.AdSkipped');
		tracker.trackSkip();
	});
	adUnit.on('AdImpression', function () {
		player.trigger('vpaid.AdImpression');
		tracker.trackImpressions();
	});
	adUnit.on('AdStarted', function () {
		player.trigger('vpaid.AdStarted');
		tracker.trackCreativeView();
		notifyPlayToPlayer();
	});
	adUnit.on('AdVideoStart', function () {
		player.trigger('vpaid.AdVideoStart');
		tracker.trackStart();
		notifyPlayToPlayer();
	});
	adUnit.on('AdPlaying', function () {
		player.trigger('vpaid.AdPlaying');
		tracker.trackResume();
		notifyPlayToPlayer();
	});
	adUnit.on('AdPaused', function () {
		player.trigger('vpaid.AdPaused');
		tracker.trackPause();
		notifyPauseToPlayer();
	});
	function notifyPlayToPlayer(){
		if(that._adUnit && that._adUnit.isPaused()){
			that._adUnit._paused = false;
		}
		player.trigger('play');
	}
	function notifyPauseToPlayer() {
		if(that._adUnit){
			that._adUnit._paused = true;
		}
		player.trigger('pause');
	}
	adUnit.on('AdVideoFirstQuartile', function () {
		player.trigger('vpaid.AdVideoFirstQuartile');
		tracker.trackFirstQuartile();
	});
	adUnit.on('AdVideoMidpoint', function () {
		player.trigger('vpaid.AdVideoMidpoint');
		tracker.trackMidpoint();
	});
	adUnit.on('AdVideoThirdQuartile', function () {
		player.trigger('vpaid.AdVideoThirdQuartile');
		tracker.trackThirdQuartile();
	});
	adUnit.on('AdVideoComplete', function () {
		player.trigger('vpaid.AdVideoComplete');
		tracker.trackComplete();
	});
	adUnit.on('AdClickThru', function (data) {
		player.trigger('vpaid.AdClickThru');
		var url = data.url;
		var playerHandles = data.playerHandles;
		var clickThruUrl = utilities.isNotEmptyString(url) ? url : generateClickThroughURL(vastResponse.clickThrough);
		tracker.trackClick();
		if (playerHandles && clickThruUrl) {
			window.open(clickThruUrl, '_blank');
		}
		function generateClickThroughURL(clickThroughMacro) {
			var variables = {
				ASSETURI: adUnit.options.src,
				CONTENTPLAYHEAD: 0
			};
			return clickThroughMacro ? vastUtil.parseURLMacro(clickThroughMacro, variables) : null;
		}
	});
	adUnit.on('AdUserAcceptInvitation', function () {
		player.trigger('vpaid.AdUserAcceptInvitation');
		tracker.trackAcceptInvitation();
		tracker.trackAcceptInvitationLinear();
	});
	adUnit.on('AdUserClose', function () {
		player.trigger('vpaid.AdUserClose');
		tracker.trackClose();
		tracker.trackCloseLinear();
	});
	adUnit.on('AdUserMinimize', function () {
		player.trigger('vpaid.AdUserMinimize');
		tracker.trackCollapse();
	});
	adUnit.on('AdError', function () {
		player.trigger('vpaid.AdError');
		tracker.trackErrorWithCode(901);
	});
	adUnit.on('AdVolumeChange', function () {
		player.trigger('vpaid.AdVolumeChange');
		var lastVolume = player.volume();
		adUnit.getAdVolume(function (error, currentVolume) {
			if (currentVolume === 0 && lastVolume > 0) {
				tracker.trackMute();
			}
			if (currentVolume > 0 && lastVolume === 0) {
				tracker.trackUnmute();
			}
			player.volume(currentVolume);
		});
	});
	var updateViewSize = resizeAd.bind(this, player, adUnit, this.VIEW_MODE);
	var updateViewSizeThrottled = utilities.throttle(updateViewSize, 100);
	var autoResize = this.settings.autoResize;
	if (autoResize) {
		dom.addEventListener(window, 'resize', updateViewSizeThrottled);
		dom.addEventListener(window, 'orientationchange', updateViewSizeThrottled);
	}
	player.on('vast.resize', updateViewSize);
	player.on('vpaid.pauseAd', pauseAdUnit);
	player.on('vpaid.resumeAd', resumeAdUnit);
	player.one('vpaid.adEnd', function () {
		player.off('vast.resize', updateViewSize);
		player.off('vpaid.pauseAd', pauseAdUnit);
		player.off('vpaid.resumeAd', resumeAdUnit);
		if (autoResize) {
			dom.removeEventListener(window, 'resize', updateViewSizeThrottled);
			dom.removeEventListener(window, 'orientationchange', updateViewSizeThrottled);
		}
	});
	next(null, adUnit, vastResponse);
	function pauseAdUnit() {
		adUnit.pauseAd(utilities.noop);
	}
	function resumeAdUnit() {
		adUnit.resumeAd(utilities.noop);
	}
};
VPAIDIntegrator.prototype._addSkipButton = function (adUnit, vastResponse, next) {
	var skipButton;
	var player = this.player;
	adUnit.on('AdSkippableStateChange', updateSkipButtonState);
	playerUtils.once(player, ['vast.adEnd', 'vast.adsCancel'], removeSkipButton);
	next(null, adUnit, vastResponse);
	function updateSkipButtonState() {
		player.trigger('vpaid.AdSkippableStateChange');
		adUnit.getAdSkippableState(function (error, isSkippable) {
			if (isSkippable) {
				if (!skipButton) {
					addSkipButton(player);
				}
			} else {
				removeSkipButton(player);
			}
		});
	}
	function addSkipButton(player) {
		skipButton = createSkipButton(player);
		player.el().appendChild(skipButton);
	}
	function removeSkipButton() {
		dom.remove(skipButton);
		skipButton = null;
	}
	function createSkipButton() {
		var skipButton = window.document.createElement("div");
		dom.addClass(skipButton, "vast-skip-button");
		dom.addClass(skipButton, "enabled");
		skipButton.innerHTML = "Skip ad";
		skipButton.onclick = function (e) {
			adUnit.skipAd(utilities.noop);
			if (window.Event.prototype.stopPropagation !== undefined) {
				e.stopPropagation();
			} else {
				return false;
			}
		};
		return skipButton;
	}
};
VPAIDIntegrator.prototype._linkPlayerControls = function (adUnit, vastResponse, next) {
	var that = this;
	linkVolumeControl(this.player, adUnit);
	linkFullScreenControl(this.player, adUnit, this.VIEW_MODE);
	next(null, adUnit, vastResponse);
	function linkVolumeControl(player, adUnit) {
		player.on('volumechange', updateAdUnitVolume);
		adUnit.on('AdVolumeChange', updatePlayerVolume);
		player.one('vpaid.adEnd', function () {
			player.off('volumechange', updateAdUnitVolume);
		});
		function updateAdUnitVolume() {
			var vol = player.muted() ? 0 : player.volume();
			adUnit.setAdVolume(vol, logError);
		}
		function updatePlayerVolume() {
			player.trigger('vpaid.AdVolumeChange');
			adUnit.getAdVolume(function (error, vol) {
				if (error) {
					logError(error);
				} else {
					player.volume(vol);
				}
			});
		}
	}
	function linkFullScreenControl(player, adUnit, VIEW_MODE) {
		var updateViewSize = resizeAd.bind(that, player, adUnit, VIEW_MODE);
		player.on('fullscreenchange', updateViewSize);
		player.one('vpaid.adEnd', function () {
			player.off('fullscreenchange', updateViewSize);
		});
	}
};
VPAIDIntegrator.prototype._startAd = function (adUnit, vastResponse, next) {
	var player = this.player;
	adUnit.startAd(function (error) {
		if (!error) {
			player.trigger('vast.adStart');
		}
		next(error, adUnit, vastResponse);
	});
};
VPAIDIntegrator.prototype._finishPlaying = function (adUnit, vastResponse, next) {
	var player = this.player;
	adUnit.on('AdStopped', function () {
		player.trigger('vpaid.AdStopped');
		finishPlayingAd(null);
	});
	adUnit.on('AdError', function (error) {
		var errMsg = error? error.message : 'on VPAIDIntegrator error';
		finishPlayingAd(new VASTError(errMsg));
	});
	function finishPlayingAd(error) {
		next(error, adUnit, vastResponse);
	}
};
VPAIDIntegrator.prototype._trackError = function trackError(response, errorCode) {
	vastUtil.track(response.errorURLMacros, {ERRORCODE: errorCode || 901});
};
function resizeAd(player, adUnit, VIEW_MODE) {
	var tech = player.el().querySelector('.vjs-tech');
	var dimension = dom.getDimension(tech);
	var MODE = player.isFullscreen() ? VIEW_MODE.FULLSCREEN : VIEW_MODE.NORMAL;
	adUnit.resizeAd(dimension.width, dimension.height, MODE, logError);
}
function logError(error) {}
module.exports = VPAIDIntegrator;
},{"../../utils/async":40,"../../utils/dom":41,"../../utils/playerUtils":43,"../../utils/utilityFunctions":45,"../vast/VASTError":23,"../vast/VASTResponse":25,"../vast/VASTTracker":26,"../vast/vastUtil":30,"./VPAIDAdUnitWrapper":31}],35:[function(require,module,exports){
'use strict';
var dom = require('../../utils/dom');
var element = document.createElement('div');
element.className = 'vjs-ads-label vjs-control vjs-label-hidden';
element.innerHTML = 'Advertisement';
var AdsLabelFactory = function(baseComponent) {
	return {
		init: function init(player, options) {
			options.el = element;
			baseComponent.call(this, player, options);
			setTimeout(function () {
				var currentTimeComp = player.controlBar &&( player.controlBar.getChild("timerControls") || player.controlBar.getChild("currentTimeDisplay") );
				if(currentTimeComp) {
					player.controlBar.el().insertBefore(element, currentTimeComp.el());
				}
				dom.removeClass(element, 'vjs-label-hidden');
			}, 0);
		},
		el: function getElement() {
			return element;
		}
	};
};
module.exports = AdsLabelFactory;
},{"../../utils/dom":41}],36:[function(require,module,exports){
'use strict';
var baseVideoJsComponent = videojs.Component;
var AdsLabel = require('./ads-label')(baseVideoJsComponent);
videojs.AdsLabel = videojs.Component.extend(AdsLabel);
},{"./ads-label":35}],37:[function(require,module,exports){
'use strict';
var element = document.createElement('div');
var BlackPosterFactory = function(baseComponent) {
	return {
		init: function init(player, options) {
			options.el = element;
			element.className = 'vjs-black-poster';
			baseComponent.call(this, player, options);
			var posterImg = player.getChild('posterImage');
			setTimeout(function() {
				if(posterImg && player && player.el()) {
					player.el().insertBefore(element, posterImg.el());
				}
			}, 0);
		},
		el: function getElement() {
			return element;
		}
	};
};
module.exports = BlackPosterFactory;
},{}],38:[function(require,module,exports){
'use strict';
var baseVideoJsComponent = videojs.Component;
var BlackPoster = require('./black-poster')(baseVideoJsComponent);
videojs.BlackPoster = videojs.Component.extend(BlackPoster);
},{"./black-poster":37}],39:[function(require,module,exports){
'use strict';
var VASTClient = require('../ads/vast/VASTClient');
var VASTError = require('../ads/vast/VASTError');
var vastUtil = require('../ads/vast/vastUtil');
var VASTIntegrator = require('../ads/vast/VASTIntegrator');
var VPAIDIntegrator = require('../ads/vpaid/VPAIDIntegrator');
var async = require('../utils/async');
var dom = require('../utils/dom');
var playerUtils = require('../utils/playerUtils');
var utilities = require('../utils/utilityFunctions');
module.exports = function VASTPlugin(options) {
	var snapshot;
	var player = this;
	var vast = new VASTClient();
	var adsCanceled = false;
	var defaultOpts = {
		timeout: 25000,
		iosPrerollCancelTimeout: 25000,
		adCancelTimeout: 25000,
		playAdAlways: false,
		adsEnabled: true,
		autoResize: true,
		vpaidFlashLoaderPath: Adriver_Native_Video_Params.ar_folder+'VPAIDFlash.swf'
	};
	var settings = utilities.extend({}, defaultOpts, options || {});
	if(utilities.isUndefined(settings.adTagUrl) && utilities.isDefined(settings.url)){
		settings.adTagUrl = settings.url;
	}
	if (utilities.isString(settings.adTagUrl)) {
		settings.adTagUrl = utilities.echoFn(settings.adTagUrl);
	}
	if (utilities.isDefined(settings.adTagXML) && !utilities.isFunction(settings.adTagXML)) {
		return trackAdError(new VASTError('on VideoJS VAST plugin, the passed adTagXML option does not contain a function'));
	}
	if (!utilities.isDefined(settings.adTagUrl) && !utilities.isFunction(settings.adTagXML)) {
		return trackAdError(new VASTError('on VideoJS VAST plugin, missing adTagUrl on options object'));
	}
	vastUtil.runFlashSupportCheck(settings.vpaidFlashLoaderPath);
	playerUtils.prepareForAds(player);
	if (settings.playAdAlways) {
		player.on('vast.contentEnd', function () {
			setTimeout(function () {
				player.trigger('vast.reset');
			}, 0);
		});
	}
	player.on('vast.firstPlay', tryToPlayPrerollAd);
	player.on('vast.reset', function () {
		snapshot = null;
		cancelAds();
	});
	player.vast = {
		isEnabled: function () {
			return settings.adsEnabled;
		},
		enable: function () {
			settings.adsEnabled = true;
		},
		disable: function () {
			settings.adsEnabled = false;
		}
	};
	return player.vast;
	function tryToPlayPrerollAd() {
		playerUtils.removeNativePoster(player);
		playerUtils.once(player, ['vast.adsCancel', 'vast.adEnd'], function () {
			removeAdUnit();
			restoreVideoContent();
		});
		async.waterfall([
			checkAdsEnabled,
			preparePlayerForAd,
			startAdCancelTimeout,
			playPrerollAd
		], function (error, response) {
			if (error) {
				trackAdError(error, response);
			} else {
				player.trigger('vast.adEnd');
			}
		});
		function removeAdUnit() {
			if (player.vast && player.vast.adUnit) {
				player.vast.adUnit = null;
			}
		}
		function restoreVideoContent() {
			setupContentEvents();
			if (snapshot) {
				playerUtils.restorePlayerSnapshot(player, snapshot);
				snapshot = null;
			}
		}
		function setupContentEvents() {
			playerUtils.once(player, ['playing', 'vast.reset', 'vast.firstPlay'], function (evt) {
				if (evt.type !== 'playing') {
					return;
				}
				player.trigger('vast.contentStart');
				playerUtils.once(player, ['ended', 'vast.reset', 'vast.firstPlay'], function (evt) {
					if (evt.type === 'ended') {
						player.trigger('vast.contentEnd');
					}
				});
			});
		}
		function checkAdsEnabled(next) {
			if (settings.adsEnabled) {
				return next(null);
			}
			next(new VASTError('Ads are not enabled'));
		}
		function preparePlayerForAd(next) {
			if (canPlayPrerollAd()) {
				snapshot = playerUtils.getPlayerSnapshot(player);
				player.pause();
				addSpinnerIcon();
				if(player.paused()) {
					next(null);
				} else {
					playerUtils.once(player, ['playing'], function() {
						player.pause();
						next(null);
					});
				}
			} else {
				next(new VASTError('video content has been playing before preroll ad'));
			}
		}
		function canPlayPrerollAd() {
			return !utilities.isIPhone() || player.currentTime() <= settings.iosPrerollCancelTimeout;
		}
		function startAdCancelTimeout(next) {
			var adCancelTimeoutId;
			adsCanceled = false;
			adCancelTimeoutId = setTimeout(function () {
				trackAdError(new VASTError('timeout while waiting for the video to start playing', 402));
			}, settings.adCancelTimeout);
			playerUtils.once(player, ['vast.adStart', 'vast.adsCancel'], clearAdCancelTimeout);
			function clearAdCancelTimeout() {
				if (adCancelTimeoutId) {
					clearTimeout(adCancelTimeoutId);
					adCancelTimeoutId = null;
				}
			}
			next(null);
		}
		function addSpinnerIcon() {
			dom.addClass(player.el(), 'vjs-vast-ad-loading');
			playerUtils.once(player, ['vast.adStart', 'vast.adsCancel'], removeSpinnerIcon);
		}
		function removeSpinnerIcon() {
			setTimeout(function () {
				dom.removeClass(player.el(), 'vjs-vast-ad-loading');
			}, 100);
		}
	}
	function cancelAds() {
		player.trigger('vast.adsCancel');
		adsCanceled = true;
	}
	function playPrerollAd(callback) {
		async.waterfall([
			getVastResponse,
			playAd
		], callback);
	}
	function getVastResponse(callback) {
		vast.getVASTResponse(settings.adTagUrl ? settings.adTagUrl() : settings.adTagXML, callback);
	}
	function playAd(vastResponse, callback) {
		if (adsCanceled) {
			return;
		}
		var adIntegrator = isVPAID(vastResponse) ? new VPAIDIntegrator(player, settings) : new VASTIntegrator(player);
		var adFinished = false;
		playerUtils.once(player, ['vast.adStart', 'vast.adsCancel'], function (evt) {
			if (evt.type === 'vast.adStart') {
				addAdsLabel();
			}
		});
		playerUtils.once(player, ['vast.adEnd', 'vast.adsCancel'], removeAdsLabel);
		if (utilities.isIDevice()) {
			preventManualProgress();
		}
		player.vast.vastResponse = vastResponse;
		player.vast.adUnit = adIntegrator.playAd(vastResponse, callback);
		function addAdsLabel() {
			if (adFinished || player.controlBar.getChild('AdsLabel')) {
				return;
			}
			player.controlBar.addChild('AdsLabel');
		}
		function removeAdsLabel() {
			player.controlBar.removeChild('AdsLabel');
			adFinished = true;
		}
		function preventManualProgress() {
			var PROGRESS_THRESHOLD = 3;
			var previousTime = 0;
			var skipad_attempts = 0;
			player.on('timeupdate', preventAdSeek);
			player.on('ended', preventAdSkip);
			playerUtils.once(player, ['vast.adEnd', 'vast.adsCancel', 'vast.adError'], stopPreventManualProgress);
			function preventAdSkip() {
				if ((player.duration() - previousTime) > PROGRESS_THRESHOLD) {
					player.pause(true);
					player.play(true);
					player.currentTime(previousTime);
				}
			}
			function preventAdSeek() {
				var currentTime = player.currentTime();
				var progressDelta = Math.abs(currentTime - previousTime);
				if (progressDelta > PROGRESS_THRESHOLD) {
					skipad_attempts += 1;
					if (skipad_attempts >= 2) {
						player.pause(true);
					}
					player.currentTime(previousTime);
				} else {
					previousTime = currentTime;
				}
			}
			function stopPreventManualProgress() {
				player.off('timeupdate', preventAdSeek);
				player.off('ended', preventAdSkip);
			}
		}
	}
	function trackAdError(error, vastResponse) {
		player.trigger({type: 'vast.adError', error: error});
		cancelAds();
	}
	function isVPAID(vastResponse) {
		var i, len;
		var mediaFiles = vastResponse.mediaFiles;
		for (i = 0, len = mediaFiles.length; i < len; i++) {
			if (vastUtil.isVPAID(mediaFiles[i])) {
				return true;
			}
		}
		return false;
	}
};
},{"../ads/vast/VASTClient":22,"../ads/vast/VASTError":23,"../ads/vast/VASTIntegrator":24,"../ads/vast/vastUtil":30,"../ads/vpaid/VPAIDIntegrator":34,"../utils/async":40,"../utils/dom":41,"../utils/playerUtils":43,"../utils/utilityFunctions":45}],40:[function(require,module,exports){
var utilities = require('./utilityFunctions');
var async = {};
async.setImmediate = function (fn) {
	setTimeout(fn, 0);
};
async.iterator = function (tasks) {
	var makeCallback = function (index) {
		var fn = function () {
			if (tasks.length) {
				tasks[index].apply(null, arguments);
			}
			return fn.next();
		};
		fn.next = function () {
			return (index < tasks.length - 1) ? makeCallback(index + 1) : null;
		};
		return fn;
	};
	return makeCallback(0);
};
async.waterfall = function (tasks, callback) {
	callback = callback || function () { };
	if (!utilities.isArray(tasks)) {
		var err = new Error('Must be an array');
		return callback(err);
	}
	if (!tasks.length) {
		return callback();
	}
	var wrapIterator = function (iterator) {
		return function (err) {
			if (err) {
				callback.apply(null, arguments);
				callback = function () {};
			} else {
				var args = Array.prototype.slice.call(arguments, 1);
				var next = iterator.next();
				if (next) {
					args.push(wrapIterator(next));
				} else {
					args.push(callback);
				}
				async.setImmediate(function () {
					iterator.apply(null, args);
				});
			}
		};
	};
	wrapIterator(async.iterator(tasks))();
};
async.when = function (condition, callback) {
	if (!utilities.isFunction(callback)) {
		throw new Error("async.when error");
	}
	var isAllowed = utilities.isFunction(condition) ? condition : function () {
		return !!condition;
	};
	return function () {
		var args = utilities.arrayLikeObjToArray(arguments);
		var next = args.pop();
		if (isAllowed.apply(null, args)) {
			return callback.apply(this, arguments);
		}
		args.unshift(null);
		return next.apply(null, args);
	};
};
module.exports = async;
},{"./utilityFunctions":45}],41:[function(require,module,exports){
'use strict';
var utilities = require('./utilityFunctions');
var dom = {};
dom.isVisible = function isVisible(el) {
	var style = window.getComputedStyle(el);
	return style.visibility !== 'hidden';
};
dom.isHidden = function isHidden(el) {
	var style = window.getComputedStyle(el);
	return style.display === 'none';
};
dom.isShown = function isShown(el) {
	return !dom.isHidden(el);
};
dom.hide = function hide(el) {
	el.__prev_style_display_ = el.style.display;
	el.style.display = 'none';
};
dom.show = function show(el) {
	if (dom.isHidden(el)) {
		el.style.display = el.__prev_style_display_;
	}
	el.__prev_style_display_ = undefined;
};
dom.hasClass = function hasClass(el, cssClass) {
	var classes, i, len;
	if (utilities.isNotEmptyString(cssClass)) {
		if (el.classList) {
			return el.classList.contains(cssClass);
		}
		classes = utilities.isString(el.getAttribute('class')) ? el.getAttribute('class').split(/\s+/) : [];
		cssClass = (cssClass || '');
		for (i = 0, len = classes.length; i < len; i += 1) {
			if (classes[i] === cssClass) {
				return true;
			}
		}
	}
	return false;
};
dom.addClass = function (el, cssClass) {
	var classes;
	if (utilities.isNotEmptyString(cssClass)) {
		if (el.classList) {
			return el.classList.add(cssClass);
		}
		classes = utilities.isString(el.getAttribute('class')) ? el.getAttribute('class').split(/\s+/) : [];
		if (utilities.isString(cssClass) && utilities.isNotEmptyString(cssClass.replace(/\s+/, ''))) {
			classes.push(cssClass);
			el.setAttribute('class', classes.join(' '));
		}
	}
};
dom.removeClass = function (el, cssClass) {
	var classes;
	if (utilities.isNotEmptyString(cssClass)) {
		if (el.classList) {
			return el.classList.remove(cssClass);
		}
		classes = utilities.isString(el.getAttribute('class')) ? el.getAttribute('class').split(/\s+/) : [];
		var newClasses = [];
		var i, len;
		if (utilities.isString(cssClass) && utilities.isNotEmptyString(cssClass.replace(/\s+/, ''))) {
			for (i = 0, len = classes.length; i < len; i += 1) {
				if (cssClass !== classes[i]) {
					newClasses.push(classes[i]);
				}
			}
			el.setAttribute('class', newClasses.join(' '));
		}
	}
};
dom.addEventListener = function addEventListener(el, type, handler) {
	if(utilities.isArray(el)){
		utilities.forEach(el, function(e) {
			dom.addEventListener(e, type, handler);
		});
		return;
	}
	if(utilities.isArray(type)){
		utilities.forEach(type, function(t) {
			dom.addEventListener(el, t, handler);
		});
		return;
	}
	if (el.addEventListener) {
		el.addEventListener(type, handler, false);
	} else if (el.attachEvent) {
		el.attachEvent("on" + type, handler);
	}
};
dom.removeEventListener = function removeEventListener(el, type, handler) {
	if(utilities.isArray(el)){
		utilities.forEach(el, function(e) {
			dom.removeEventListener(e, type, handler);
		});
		return;
	}
	if(utilities.isArray(type)){
		utilities.forEach(type, function(t) {
			dom.removeEventListener(el, t, handler);
		});
		return;
	}
	if (el.removeEventListener) {
		el.removeEventListener(type, handler, false);
	} else if (el.detachEvent) {
		el.detachEvent("on" + type, handler);
	} else {
		el["on" + type] = null;
	}
};
dom.dispatchEvent = function dispatchEvent(el, event) {
	if (el.dispatchEvent) {
		el.dispatchEvent(event);
	} else {
		el.fireEvent("on" + event.eventType, event);
	}
};
dom.isDescendant = function isDescendant(parent, child) {
	var node = child.parentNode;
	while (node !== null) {
		if (node === parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
};
dom.getTextContent = function getTextContent(el){
	return el.textContent || el.text;
};
dom.prependChild = function prependChild(parent, child) {
	if(child.parentNode){
		child.parentNode.removeChild(child);
	}
	return parent.insertBefore(child, parent.firstChild);
};
dom.remove = function removeNode(node){
	if(node && node.parentNode){
		node.parentNode.removeChild(node);
	}
};
dom.isDomElement = function isDomElement(o) {
	return o instanceof Element;
};
dom.click = function(el, handler) {
	dom.addEventListener(el, 'click', handler);
};
dom.once = function(el, type, handler) {
	function handlerWrap() {
		handler.apply(null, arguments);
		dom.removeEventListener(el, type, handlerWrap);
	}
	dom.addEventListener(el, type, handlerWrap);
};
dom.getDimension = function getDimension(element) {
	var rect;
	if(!utilities.isOldIE() && element.getBoundingClientRect) {
		rect = element.getBoundingClientRect();
		return {
			width: rect.width,
			height: rect.height
		};
	}
	return {
		width: element.offsetWidth,
		height: element.offsetHeight
	};
};
module.exports = dom;
},{"./utilityFunctions":45}],42:[function(require,module,exports){
'use strict';
var urlUtils = require('./urlUtils');
var utilities = require('./utilityFunctions');
function HttpRequestError(message) {
	this.message = 'HttpRequest Error: ' + (message || '');
}
HttpRequestError.prototype = new Error();
HttpRequestError.prototype.name = "HttpRequest Error";
function HttpRequest(createXhr) {
	if (!utilities.isFunction(createXhr)) {
		throw new HttpRequestError('Missing XMLHttpRequest factory method');
	}
	this.createXhr = createXhr;
}
HttpRequest.prototype.run = function (method, url, callback, options) {
	sanityCheck(url, callback, options);
	var timeout, timeoutId;
	var xhr = this.createXhr();
	options = options || {};
	timeout = utilities.isNumber(options.timeout) ? options.timeout : 0;
	xhr.open(method, urlUtils.urlParts(url).href, true);
	if (options.headers) {
		setHeaders(xhr, options.headers);
	}
	if (options.withCredentials) {
		xhr.withCredentials = true;
	}
	xhr.onload = function () {
		var statusText, response, status;
		if (!xhr.getAllResponseHeaders) {
			xhr.getAllResponseHeaders = function () {
				return null;
			};
		}
		if (!xhr.status) {
			xhr.status = 200;
		}
		if (utilities.isDefined(timeoutId)) {
			clearTimeout(timeoutId);
			timeoutId = undefined;
		}
		statusText = xhr.statusText || '';
		response = ('response' in xhr) ? xhr.response : xhr.responseText;
		status = xhr.status === 1223 ? 204 : xhr.status;
		callback(
			status,
			response,
			xhr.getAllResponseHeaders(),
			statusText
		);
	};
	xhr.onerror = requestError;
	xhr.onabort = requestError;
	xhr.send();
	if (timeout > 0) {
		timeoutId = setTimeout(function () {
			xhr && xhr.abort();
		}, timeout);
	}
	function sanityCheck(url, callback, options) {
		if (!utilities.isString(url) || utilities.isEmptyString(url)) {
			throw new HttpRequestError("Invalid url '" + url + "'");
		}
		if (!utilities.isFunction(callback)) {
			throw new HttpRequestError("Invalid handler '" + callback + "' for the http request");
		}
		if (utilities.isDefined(options) && !utilities.isObject(options)) {
			throw new HttpRequestError("Invalid options map '" + options + "'");
		}
	}
	function setHeaders(xhr, headers) {
		utilities.forEach(headers, function (value, key) {
			if (utilities.isDefined(value)) {
				xhr.setRequestHeader(key, value);
			}
		});
	}
	function requestError() {
		callback(-1, null, null, '');
	}
};
HttpRequest.prototype.get = function (url, callback, options) {
	this.run('GET', url, processResponse, options);
	function processResponse(status, response, headersString, statusText) {
		if (isSuccess(status)) {
			callback(null, response, status, headersString, statusText);
		} else {
			callback(new HttpRequestError(statusText), response, status, headersString, statusText);
		}
	}
	function isSuccess(status) {
		return 200 <= status && status < 300;
	}
};
function createXhr() {
	var xhr = new XMLHttpRequest();
	if (!("withCredentials" in xhr)) {
		xhr = new XDomainRequest();
	}
	return xhr;
}
var http = new HttpRequest(createXhr);
module.exports = {
	http: http,
	HttpRequest: HttpRequest,
	HttpRequestError: HttpRequestError,
	createXhr: createXhr
};
},{"./urlUtils":44,"./utilityFunctions":45}],43:[function(require,module,exports){
'use strict';
var dom = require('./dom');
var utilities = require('./utilityFunctions');
var playerUtils = {};
playerUtils.getPlayerSnapshot = function getPlayerSnapshot(player) {
	var tech = player.el().querySelector('.vjs-tech');
	var snapshot = {
		ended: player.ended(),
		src: player.currentSrc(),
		currentTime: player.currentTime(),
		type: player.currentType(),
		playing: !player.paused(),
		suppressedTracks: getSuppressedTracks(player)
	};
	if (tech) {
		snapshot.nativePoster = tech.poster;
		snapshot.style = tech.getAttribute('style');
	}
	return snapshot;
	function getSuppressedTracks(player) {
		var tracks = player.remoteTextTracks ? player.remoteTextTracks() : [];
		if (tracks && utilities.isArray(tracks.tracks_)) {
			tracks = tracks.tracks_;
		}
		if (!utilities.isArray(tracks)) {
			tracks = [];
		}
		var suppressedTracks = [];
		tracks.forEach(function (track) {
			suppressedTracks.push({
				track: track,
				mode: track.mode
			});
			track.mode = 'disabled';
		});
		return suppressedTracks;
	}
};
playerUtils.restorePlayerSnapshot = function restorePlayerSnapshot(player, snapshot) {
	var tech = player.el().querySelector('.vjs-tech');
	var attempts = 20;
	if (snapshot.nativePoster) {
		tech.poster = snapshot.nativePoster;
	}
	if ('style' in snapshot) {
		tech.setAttribute('style', snapshot.style || '');
	}
	if (hasSrcChanged(player, snapshot)) {
		player.one('contentloadedmetadata', restoreTracks);
		player.one('canplay', tryToResume);
		ensureCanplayEvtGetsFired();
		player.src({src: snapshot.src, type: snapshot.type});
		player.load();
	} else {
		restoreTracks();
		if (snapshot.playing) {
			player.play();
		}
	}
	function ensureCanplayEvtGetsFired() {
		var timeoutId = setTimeout(function() {
			player.trigger('canplay');
		}, 1000);
		player.one('canplay', function(){
			clearTimeout(timeoutId);
		});
	}
	function hasSrcChanged(player, snapshot) {
		if (player.src()) {
			return player.src() !== snapshot.src;
		}
		return player.currentSrc() !== snapshot.src;
	}
	function restoreTracks() {
		var suppressedTracks = snapshot.suppressedTracks;
		suppressedTracks.forEach(function (trackSnapshot) {
			trackSnapshot.track.mode = trackSnapshot.mode;
		});
	}
	function tryToResume() {
		if (!playerUtils.isReadyToResume(player) && attempts--) {
			setTimeout(tryToResume, 50);
		} else {
			try {
				if(player.currentTime() !== snapshot.currentTime) {
					if (snapshot.playing) {
						player.one('seeked', function() {
							player.play();
						});
					}
					player.currentTime(snapshot.currentTime);
				} else if (snapshot.playing) {
					player.play();
				}
			} catch (e) {
				videojs.log.warn('Failed to resume the content', e);
			}
		}
	}
};
playerUtils.isReadyToResume = function (player) {
	if (player.readyState() > 1) {
		return true;
	}
	if (player.seekable() === undefined) {
		return true;
	}
	if (player.seekable().length > 0) {
		return true;
	}
	return false;
};
playerUtils.prepareForAds = function (player) {
	var blackPoster = player.addChild('blackPoster');
	var _firstPlay = true;
	var volumeSnapshot;
	monkeyPatchPlayerApi();
	player.on('play', tryToTriggerFirstPlay);
	player.on('vast.reset', resetFirstPlay);
	player.on('vast.firstPlay', restoreContentVolume);
	player.on('error', hideBlackPoster);
	player.on('vast.adStart', hideBlackPoster);
	player.on('vast.adsCancel', hideBlackPoster);
	player.on('vast.adError', hideBlackPoster);
	player.on('vast.adStart', addStyles);
	player.on('vast.adEnd', removeStyles);
	player.on('vast.adsCancel', removeStyles);
	function monkeyPatchPlayerApi() {
		var origPlay = player.play;
		player.play = function (callOrigPlay) {
			var that = this;
			if (isFirstPlay()) {
				firstPlay();
			} else {
				resume(callOrigPlay);
			}
			return this;
			function firstPlay() {
				if (!utilities.isIPhone()) {
					volumeSnapshot = saveVolumeSnapshot();
					player.muted(true);
				}
				origPlay.apply(that, arguments);
			}
			function resume(callOrigPlay) {
				if (isAdPlaying() && !callOrigPlay) {
					player.vast.adUnit.resumeAd();
				} else {
					origPlay.apply(that, arguments);
				}
			}
		};
		var origPause = player.pause;
		player.pause = function (callOrigPause) {
			if (isAdPlaying() && !callOrigPause) {
				player.vast.adUnit.pauseAd();
			} else {
				origPause.apply(this, arguments);
			}
			return this;
		};
		var origPaused = player.paused;
		player.paused = function (callOrigPaused) {
			if (isAdPlaying() && !callOrigPaused) {
				return player.vast.adUnit.isPaused();
			}
			return origPaused.apply(this, arguments);
		};
	}
	function isAdPlaying() {
		return player.vast && player.vast.adUnit;
	}
	function tryToTriggerFirstPlay() {
		if (isFirstPlay()) {
			_firstPlay = false;
			player.trigger('vast.firstPlay');
		}
	}
	function resetFirstPlay() {
		_firstPlay = true;
		blackPoster.show();
		restoreContentVolume();
	}
	function isFirstPlay() {
		return _firstPlay;
	}
	function saveVolumeSnapshot() {
		return {
			muted: player.muted(),
			volume: player.volume()
		};
	}
	function restoreContentVolume() {
		if (volumeSnapshot) {
			player.currentTime(0);
			restoreVolumeSnapshot(volumeSnapshot);
			volumeSnapshot = null;
		}
	}
	function restoreVolumeSnapshot(snapshot) {
		if (utilities.isObject(snapshot)) {
			player.volume(snapshot.volume);
			player.muted(snapshot.muted);
		}
	}
	function hideBlackPoster() {
		if (!dom.hasClass(blackPoster.el(), 'vjs-hidden')) {
			blackPoster.hide();
		}
	}
	function addStyles() {
		dom.addClass(player.el(), 'vjs-ad-playing');
	}
	function removeStyles() {
		dom.removeClass(player.el(), 'vjs-ad-playing');
	}
};
playerUtils.removeNativePoster = function (player) {
	var tech = player.el().querySelector('.vjs-tech');
	if (tech) {
		tech.removeAttribute('poster');
	}
};
playerUtils.once = function once(player, events, handler) {
	function listener() {
		handler.apply(null, arguments);
		events.forEach(function (event) {
			player.off(event, listener);
		});
	}
	events.forEach(function (event) {
		player.on(event, listener);
	});
};
module.exports = playerUtils;
},{"./dom":41,"./utilityFunctions":45}],44:[function(require,module,exports){
'use strict';
var utilities = require('./utilityFunctions');
var urlParsingNode = document.createElement("a");
var msie = document.documentMode;
function urlParts(url) {
	var href = url;
	if (msie) {
		urlParsingNode.setAttribute("href", href);
		href = urlParsingNode.href;
	}
	urlParsingNode.setAttribute('href', href);
	return {
		href: urlParsingNode.href,
		protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
		host: urlParsingNode.host,
		search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
		hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
		hostname: urlParsingNode.hostname,
		port: utilities.isNotEmptyString(urlParsingNode.port)? urlParsingNode.port: 80,
		pathname: (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
	};
}
function queryStringToObj(qs, cond) {
	var pairs, qsObj;
	cond = utilities.isFunction(cond)? cond : function() {
		return true;
	};
	qs = qs.trim().replace(/^\?/, '');
	pairs = qs.split('&');
	qsObj = {};
	utilities.forEach(pairs, function (pair) {
		var keyValue, key, value;
		if (pair !== '') {
			keyValue = pair.split('=');
			key = keyValue[0];
			value = keyValue[1];
			if(cond(key, value)){
				qsObj[key] = value;
			}
		}
	});
	return qsObj;
}
function objToQueryString(obj) {
	var pairs = [];
	utilities.forEach(obj, function (value, key) {
		pairs.push(key + '=' + value);
	});
	return pairs.join('&');
}
module.exports = {
	urlParts: urlParts,
	queryStringToObj: queryStringToObj,
	objToQueryString: objToQueryString
};
},{"./utilityFunctions":45}],45:[function(require,module,exports){
"use strict";
var NODE_TYPE_ELEMENT = 1;
var SNAKE_CASE_REGEXP = /[A-Z]/g;
var ISO8086_REGEXP = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
function noop(){ }
function isNull(o) {
	return o === null;
}
function isDefined(o){
	return o !== undefined;
}
function isUndefined(o){
	return o === undefined;
}
function isObject(obj) {
	return typeof obj === 'object';
}
function isFunction(str){
	return typeof str === 'function';
}
function isNumber(num){
	return typeof num === 'number';
}
function isWindow(obj) {
	return utilities.isObject(obj) && obj.window === obj;
}
function isArray(array){
	return Object.prototype.toString.call( array ) === '[object Array]';
}
function isArrayLike(obj) {
	if (obj === null || utilities.isWindow(obj) || utilities.isFunction(obj) || utilities.isUndefined(obj)) {
		return false;
	}
	var length = obj.length;
	if (obj.nodeType === NODE_TYPE_ELEMENT && length) {
		return true;
	}
	return utilities.isString(obj) || utilities.isArray(obj) || length === 0 ||
	typeof length === 'number' && length > 0 && (length - 1) in obj;
}
function isString(str){
	return typeof str === 'string';
}
function isEmptyString(str) {
	return utilities.isString(str) && str.length === 0;
}
function isNotEmptyString(str) {
	return utilities.isString(str) && str.length !== 0;
}
function arrayLikeObjToArray(args) {
	return Array.prototype.slice.call(args);
}
function forEach(obj, iterator, context) {
	var key, length;
	if (obj) {
		if (isFunction(obj)) {
			for (key in obj) {
				if (key !== 'prototype' && key !== 'length' && key !== 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
					iterator.call(context, obj[key], key, obj);
				}
			}
		} else if (isArray(obj)) {
			var isPrimitive = typeof obj !== 'object';
			for (key = 0, length = obj.length; key < length; key++) {
				if (isPrimitive || key in obj) {
					iterator.call(context, obj[key], key, obj);
				}
			}
		} else if (obj.forEach && obj.forEach !== forEach) {
			obj.forEach(iterator, context, obj);
		} else {
			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					iterator.call(context, obj[key], key, obj);
				}
			}
		}
	}
	return obj;
}
function snake_case(name, separator) {
	separator = separator || '_';
	return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
		return (pos ? separator : '') + letter.toLowerCase();
	});
}
function extend (obj) {
	var arg, i, k;
	for (i = 1; i < arguments.length; i++) {
		arg = arguments[i];
		for (k in arg) {
			if (arg.hasOwnProperty(k)) {
				if(isObject(obj[k]) && !isNull(obj[k]) && isObject(arg[k])){
					obj[k] = extend({}, obj[k], arg[k]);
				}else {
					obj[k] = arg[k];
				}
			}
		}
	}
	return obj;
}
function capitalize(s){
	return s.charAt(0).toUpperCase() + s.slice(1);
}
function decapitalize(s) {
	return s.charAt(0).toLowerCase() + s.slice(1);
}
function transformArray(array, transformer) {
	var transformedArray = [];
	array.forEach(function(item, index){
		var transformedItem = transformer(item, index);
		if(utilities.isDefined(transformedItem)) {
			transformedArray.push(transformedItem);
		}
	});
	return transformedArray;
}
function toFixedDigits(num, digits) {
	var formattedNum = num + '';
	digits = utilities.isNumber(digits) ? digits : 0;
	num = utilities.isNumber(num) ? num : parseInt(num, 10);
	if(utilities.isNumber(num) && !isNaN(num)){
		formattedNum = num + '';
		while(formattedNum.length < digits) {
			formattedNum = '0' + formattedNum;
		}
		return formattedNum;
	}
	return NaN + '';
}
function throttle(callback, delay) {
	var previousCall = new Date().getTime() - (delay + 1);
	return function() {
		var time = new Date().getTime();
		if ((time - previousCall) >= delay) {
			previousCall = time;
			callback.apply(this, arguments);
		}
	};
}
function debounce (callback, wait) {
	var timeoutId;
	return function (){
		if(timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(function(){
			callback.apply(this, arguments);
			timeoutId = undefined;
		}, wait);
	};
}
function treeSearch(root, getChildren, found){
	var children = getChildren(root);
	for (var i = 0; i < children.length; i++){
		if (found(children[i])) {
			return children[i];
		} else {
			var el = treeSearch(children[i], getChildren, found);
			if (el){
				return el;
			}
		}
	}
}
function echoFn(val) {
	return function () {
		return val;
	};
}
function isISO8601(value) {
	if(utilities.isNumber(value)){
		value = value + '';
	}
	if(!utilities.isString(value)){
		return false;
	}
	return ISO8086_REGEXP.test(value.trim());
}
function isOldIE() {
	var version = utilities.getInternetExplorerVersion(navigator);
	if (version === -1) {
		return false;
	}
	return version < 10;
}
function getInternetExplorerVersion(navigator) {
	var rv = -1;
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		var res = re.exec(ua);
		if (res !== null) {
			rv = parseFloat(res[1]);
		}
	}
	return rv;
}
function isIDevice() {
	return /iP(hone|ad)/.test(utilities._UA);
}
function isMobile() {
	return /iP(hone|ad|od)|Android|Windows Phone/.test(utilities._UA);
}
function isIPhone() {
	return /iP(hone|od)/.test(utilities._UA);
}
function isAndroid() {
	return /Android/.test(utilities._UA);
}
var utilities = {
	_UA: navigator.userAgent,
	noop: noop,
	isNull: isNull,
	isDefined: isDefined,
	isUndefined: isUndefined,
	isObject: isObject,
	isFunction: isFunction,
	isNumber: isNumber,
	isWindow: isWindow,
	isArray: isArray,
	isArrayLike: isArrayLike,
	isString: isString,
	isEmptyString: isEmptyString,
	isNotEmptyString: isNotEmptyString,
	arrayLikeObjToArray: arrayLikeObjToArray,
	forEach: forEach,
	snake_case: snake_case,
	extend: extend,
	capitalize: capitalize,
	decapitalize: decapitalize,
	transformArray: transformArray,
	toFixedDigits: toFixedDigits,
	throttle: throttle,
	debounce: debounce,
	treeSearch: treeSearch,
	echoFn: echoFn,
	isISO8601: isISO8601,
	isOldIE: isOldIE,
	getInternetExplorerVersion: getInternetExplorerVersion,
	isIDevice: isIDevice,
	isMobile: isMobile,
	isIPhone: isIPhone,
	isAndroid: isAndroid
};
module.exports = utilities;
},{}],46:[function(require,module,exports){
'use strict';
var utilities = require('./utilityFunctions');
var xml = {};
xml.strToXMLDoc = function strToXMLDoc(stringContainingXMLSource){
	if(typeof window.DOMParser === 'undefined'){
		var xmlDocument = new ActiveXObject('Microsoft.XMLDOM');
		xmlDocument.async = false;
		xmlDocument.loadXML(stringContainingXMLSource);
		return xmlDocument;
	}
	return parseString(stringContainingXMLSource);
	function parseString(stringContainingXMLSource){
		var parser = new DOMParser();
		var parsedDocument;
		try {
			parsedDocument = parser.parseFromString(stringContainingXMLSource, "application/xml");
			if(isParseError(parsedDocument) || utilities.isEmptyString(stringContainingXMLSource)){
				throw new Error();
			}
		}catch(e){
			throw new Error("xml.strToXMLDOC: Error parsing the string");
		}
		return parsedDocument;
	}
	function isParseError(parsedDocument) {
		try {
			var parser = new DOMParser(),
			erroneousParse = parser.parseFromString('INVALID', 'text/xml'),
			parsererrorNS = erroneousParse.getElementsByTagName("parsererror")[0].namespaceURI;
			if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
				return parsedDocument.getElementsByTagName("parsererror").length > 0;
			}
			return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
		} catch (e) {}
	}
};
xml.parseText = function parseText (sValue) {
	if (/^\s*$/.test(sValue)) { return null; }
	if (/^(?:true|false)$/i.test(sValue)) { return sValue.toLowerCase() === "true"; }
	if (isFinite(sValue)) { return parseFloat(sValue); }
	if (utilities.isISO8601(sValue)) { return new Date(sValue); }
	return sValue.trim();
};
xml.JXONTree = function JXONTree (oXMLParent) {
	var parseText = xml.parseText;
	if(oXMLParent.documentElement){
		return new xml.JXONTree(oXMLParent.documentElement);
	}
	if (oXMLParent.hasChildNodes()) {
		var sCollectedTxt = "";
		for (var oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {
			oNode = oXMLParent.childNodes.item(nItem);
			if ((oNode.nodeType - 1 | 1) === 3) {
				sCollectedTxt += oNode.nodeType === 3 ? oNode.nodeValue.trim() : oNode.nodeValue;
			} else if (oNode.nodeType === 1 && !oNode.prefix) {
				sProp = utilities.decapitalize(oNode.nodeName);
				vContent = new xml.JXONTree(oNode);
				if (this.hasOwnProperty(sProp)) {
					if (this[sProp].constructor !== Array) { this[sProp] = [this[sProp]]; }
					this[sProp].push(vContent);
				} else { this[sProp] = vContent; }
			}
		}
		if (sCollectedTxt) { this.keyValue = parseText(sCollectedTxt); }
	}
	var hasAttr = typeof oXMLParent.hasAttributes === 'undefined'? oXMLParent.attributes.length > 0: oXMLParent.hasAttributes();
	if (hasAttr) {
		var oAttrib;
		for (var nAttrib = 0; nAttrib < oXMLParent.attributes.length; nAttrib++) {
			oAttrib = oXMLParent.attributes.item(nAttrib);
			this["@" + utilities.decapitalize(oAttrib.name)] = parseText(oAttrib.value.trim());
		}
	}
};
xml.JXONTree.prototype.attr = function(attr) {
	return this['@' + utilities.decapitalize(attr)];
};
xml.toJXONTree = function toJXONTree(xmlString){
	var xmlDoc = xml.strToXMLDoc(xmlString);
	return new xml.JXONTree(xmlDoc);
};
xml.keyValue = function getKeyValue(xmlObj) {
	if(xmlObj){
		return xmlObj.keyValue;
	}
	return undefined;
};
xml.attr = function getAttrValue(xmlObj, attr) {
	if(xmlObj) {
		return xmlObj['@' + utilities.decapitalize(attr)];
	}
	return undefined;
};
xml.encode = function encodeXML(str) {
	return str.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
};
xml.decode = function decodeXML(str) {
	return str.replace(/&apos;/g, "'")
		.replace(/&quot;/g, '"')
		.replace(/&gt;/g, '>')
		.replace(/&lt;/g, '<')
		.replace(/&amp;/g, '&');
};
module.exports = xml;
},{"./utilityFunctions":45}],47:[function(require,module,exports){
'use strict';
require('./plugin/components/ads-label_4');
require('./plugin/components/black-poster_4');
var videoJsVAST = require('./plugin/videojs.vast.vpaid');
videojs.plugin('vastClient', videoJsVAST);
},{"./plugin/components/ads-label_4":36,"./plugin/components/black-poster_4":38,"./plugin/videojs.vast.vpaid":39}]},{},[47])
var Adriver_Native_Video = {
	shown: 0,
	addEvent: function(e,t,f){
		if (e.addEventListener) { e.addEventListener(t, f, false); }
		else if (e.attachEvent) { e.attachEvent('on'+t, f); }
	},
	removeEvent: function(e,t,f){
		if (e.removeEventListener) { e.removeEventListener(t, f, false); }
		else if (e.detachEvent) { e.detachEvent('on'+t, f); }
	},
	getScreenGeometry: function(){
		var g = {}, d = document, db = d.body, de = d.documentElement, cm = d.compatMode == 'CSS1Compat';
		g.cw = cm && de.clientWidth || self.innerWidth || db.clientWidth;
		g.ch = cm && de.clientHeight || self.innerHeight || db.clientHeight;
		g.sl = self.pageXOffset || cm && de.scrollLeft || db.scrollLeft;
		g.st = self.pageYOffset || cm && de.scrollTop || db.scrollTop;
		g.sh = cm && de.scrollHeight || db.scrollHeight || db.offsetHeight;
		g.sw = cm && de.scrollWidth || db.scrollWidth || db.offsetWidth;
		g.sh = g.sh < g.ch ? g.ch : g.sh;
		return g;
	},
	getPosition: function(e,scroll){
		var box = e.getBoundingClientRect ? e.getBoundingClientRect() : {left: -99999, top: -99999};
		if (scroll) {
			var sg = this.getScreenGeometry();
			return {left: box.left + sg.sl, top: box.top + sg.st};
		}
		return {left: Math.round(box.left), top: Math.round(box.top)};
	},
	del_ad: function(a){
		a.innerHTML = '';
		Adriver_Native_Video.removeEvent(window, 'resize', Adriver_Native_Video.check);
		Adriver_Native_Video.removeEvent(window, 'scroll', Adriver_Native_Video.check);
	},
	close_ad: function(a, b) {
		if(Adriver_Native_Video_Params.ar_close === 0 || b == 'error'){
			a.style.height = 0;
			setTimeout (function (){Adriver_Native_Video.del_ad(a)}, Adriver_Native_Video_Params.ar_speed);
		} else if (Adriver_Native_Video_Params.ar_close === -1){
			Adriver_Native_Video.removeEvent(window, 'resize', Adriver_Native_Video.check);
			Adriver_Native_Video.removeEvent(window, 'scroll', Adriver_Native_Video.check);
		} else if (Adriver_Native_Video_Params.ar_close > 0){
			Adriver_Native_Video_Params.ar_close = Adriver_Native_Video_Params.ar_close-1;
			setTimeout (function (){Adriver_Native_Video.close_ad(a, b)}, 1000);
		}
	},
	normalize: function(value, dimension){
		return ((/\d+$/).test(value) ? value + (dimension||'px') : value);
	},
	getDimsPlace: function(p){
		if(p.clientHeight>0){return {w: p.clientWidth, h: p.clientHeight};}
		else{return {w: Adriver_Native_Video_Params.ar_width, h: Adriver_Native_Video_Params.ar_height};}
	},
	getV: function(type, place, pos, sg){
		var isV = type === 'v',
			typePlace = isV ? 'h' : 'w',
			typePos = isV ? 'top' : 'left',
			typePage = isV ? 'ch' : 'cw',
			typeScroll = isV ? 'st' : 'sl',
			r = 0;
		if (pos[typePos] < sg[typeScroll]) {
			if (pos[typePos] + place[typePlace] > sg[typeScroll]) {
				r = pos[typePos] + place[typePlace] - sg[typeScroll];
				if (r > sg[typePage]) {
					r = sg[typePage];
				}
			}
		} else if (pos[typePos] < sg[typeScroll] + sg[typePage]) {
			if (pos[typePos] + place[typePlace] <= sg[typeScroll] + sg[typePage]) {
				r = place[typePlace];
			} else {
				r = sg[typeScroll] + sg[typePage] - pos[typePos];
			}
		}
		return r;
	},
	onBlur: function() {
		window.adriver_video.isActive = false;
		Adriver_Native_Video.check();
	},
	onFocus: function(){
		window.adriver_video.isActive = true;
		Adriver_Native_Video.check();
	},
	onEnd: function(){
		window.adriver_video.pause();
		window.adriver_video.cancelFullScreen();
	},
	sendPixel: function(){
		if(document.createElement&&document.body){
			var i=document.createElement('img');
			i.style.position='absolute';i.style.width=i.style.height='0px';
			i.src=Adriver_Native_Video_Params.ar_pix;
			document.body.insertBefore(i,document.body.firstChild);
		} else {new Image().src = Adriver_Native_Video_Params.ar_pix}
	},
	addFunc: function(a){
		window.adriver_video = window.videojs('adriver_video');
		window.adriver_video.ar_vT = "";window.adriver_video.ar_vD = "";window.adriver_video.isActive = true;
		window.adriver_video.ar_vol_up = function(o){
			if (o<1) {
				o = o+0.1;
				window.adriver_video.volume(o);
				window.adriver_video.ar_vT = setTimeout (function (){window.adriver_video.ar_vol_up(o)}, 300);
			}
		};
		window.adriver_video.ar_vol_down = function(){
			if(window.adriver_video.ar_vT){clearTimeout(window.adriver_video.ar_vT);}
			window.adriver_video.ar_vD=0;
			window.adriver_video.volume(0);
		};
		window.adriver_video.on('vast.adEnd', function(){
			Adriver_Native_Video.onEnd();
			window.adriver_video.on('play', function(){
				Adriver_Native_Video.onEnd();
			});
			Adriver_Native_Video.close_ad(a, 'end');
		});
		window.adriver_video.on('vast.contentEnd', function(){
			Adriver_Native_Video.onEnd();
			window.adriver_video.on('play', function(){
				Adriver_Native_Video.onEnd();
			});
			Adriver_Native_Video.close_ad(a, 'end');
		});
		window.adriver_video.on('vast.adSkip', function(){
			Adriver_Native_Video.onEnd();
		});
		window.adriver_video.on('vast.adError', function(){
			Adriver_Native_Video.onEnd();
			Adriver_Native_Video.close_ad(a, 'error');
		});
	},
	onAdStartSize: function(a){
		var p, h = 0, w = 0;
		if(typeof window.getComputedStyle !== 'undefined'){
			var p = parseInt(window.getComputedStyle(a.parentNode, null).getPropertyValue('width'));
		}else{
			var p = parseInt(a.parentNode.currentStyle.width);
		}
		if(!p){p = 0}
		var v = document.getElementById("adriver_video");
		a.style.opacity = 1;
		a.style.width = '100%';
		v.style.margin = '0 auto';
		if(typeof window.adriver_video.vast !== 'undefined'){
			if(typeof window.adriver_video.vast.adUnit !== 'undefined'){
				if(typeof window.adriver_video.vast.adUnit._src !== 'undefined'){
					h = window.adriver_video.vast.adUnit._src.height; w = window.adriver_video.vast.adUnit._src.width;
				}
			}
		}
		if(0 < w && w <= p && 0 < h){
			window.adriver_video.width(window.adriver_video.vast.adUnit._src.width);
			window.adriver_video.height(window.adriver_video.vast.adUnit._src.height);
			a.style.height = window.adriver_video.vast.adUnit._src.height+'px';
		} else if (0 < w && 0 < h && p){
			var ph = (h*p)/w;
			window.adriver_video.width(p);
			window.adriver_video.height(ph);
			a.style.height = ph+'px';
		} else if (Adriver_Native_Video_Params.ar_width <= p && Adriver_Native_Video_Params.ar_height){
			window.adriver_video.width(Adriver_Native_Video_Params.ar_width);
			window.adriver_video.height(Adriver_Native_Video_Params.ar_height);
			a.style.height = Adriver_Native_Video_Params.ar_height+'px';
		} else {
			var ph; p>0 ? ph = (9*p)/16 : ph = Adriver_Native_Video_Params.ar_height, p = Adriver_Native_Video_Params.ar_width;
			window.adriver_video.width(p);
			window.adriver_video.height(ph);
			a.style.height = ph+'px';
		}
		if (/iPhone|iPod/i.test(navigator.userAgent) && Adriver_Native_Video_Params.iBlocker) {
			a.style.height = parseInt(a.style.height)+Adriver_Native_Video_Params.iBlocker+'px'
		}
		if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			if(Adriver_Native_Video_Params.ar_MobilePlayStyle == 1){
				var adPlayBut = window.document.createElement("div");
				adPlayBut.className = "vast-adPlayBut";
				v.appendChild(adPlayBut);
				adPlayBut.onclick = function(e) {
					window.adriver_video.play();
					if (!(/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
						window.adriver_video.requestFullscreen();
					}
					document.getElementById('adriver_video').removeChild(adPlayBut);
				}
			}
		}
	},
	draw: function(a,b){
		a.innerHTML='<video id="adriver_video" class="video-js vjs-default-skin" data-setup=\'{"plugins": {"vastClient": {"adTagUrl": "'+b+'","adsCancelTimeout": 25000,"adsEnabled": true}}}\' preload="auto" width="100%" height="100%"><source src="'+Adriver_Native_Video_Params.ar_folder+'1.mp4" type="video/mp4"/><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that</p></video>';
		Adriver_Native_Video.addFunc(a);
		window.adriver_video.on('vast.adStart', function(){
			Adriver_Native_Video.onAdStartSize(a);
			Adriver_Native_Video.sendPixel();
		});
		window.adriver_video.volume(0);
		window.adriver_video.play();
		if (/*@cc_on!@*/false) {
			document.onfocusin = Adriver_Native_Video.onFocus;
			document.onfocusout = Adriver_Native_Video.onBlur;
		} else {
			window.onfocus = Adriver_Native_Video.onFocus;
			window.onblur = Adriver_Native_Video.onBlur;
		}
		this.addEvent(window, 'scroll', this.check);
		this.addEvent(window, 'resize', this.check);
		setTimeout (function (){Adriver_Native_Video.c();}, 1000);
	},
	play_mobile: function(a,b) {
		if(typeof window.adriver_video.vast !== 'undefined'){
			if(typeof window.adriver_video.vast.adUnit !== 'undefined'){
				if(Adriver_Native_Video_Params.ar_MobilePlayStyle == 1){
					Adriver_Native_Video.onAdStartSize(a);
					Adriver_Native_Video.sendPixel();
				}
				if(Adriver_Native_Video_Params.ar_MobilePlayStyle != 1){
					Adriver_Native_Video.addEvent(window, 'touchstart', function AdriverVideoFull() {
						window.adriver_video.play();
						Adriver_Native_Video.onAdStartSize(a);
						Adriver_Native_Video.sendPixel();
						if (!(/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
							window.adriver_video.requestFullscreen();
						}
						Adriver_Native_Video.removeEvent(window, 'touchstart', AdriverVideoFull);
					});
				}
			}
		}
	},
	draw_mobile: function(a,b) {
		a.innerHTML='<video id="adriver_video" class="video-js vjs-default-skin" data-setup=\'{"plugins": {"vastClient": {"adTagUrl": "'+b+'","adsCancelTimeout": 25000,"adsEnabled": true}}}\' preload="auto" width="100%" height="100%"><source src="'+Adriver_Native_Video_Params.ar_folder+'1.mp4" type="video/mp4"/><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that</p></video>';
		Adriver_Native_Video.addFunc(a);
		window.adriver_video.volume(100);
		Adriver_Native_Video.addEvent(window, 'touchstart', function AdriverVideoStart() {
			window.adriver_video.play();
			Adriver_Native_Video.removeEvent(window, 'touchstart', AdriverVideoStart);
		});
		window.adriver_video.on('firstplay', function(){
			if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
				window.adriver_video.cancelFullScreen();
			}
			window.adriver_video.pause();
			Adriver_Native_Video.addEvent(window, 'scroll', Adriver_Native_Video.mobile_c);
			Adriver_Native_Video.addEvent(window, 'resize', Adriver_Native_Video.mobile_c);
		});
	},
	c: function() {
		var a = document.getElementById(Adriver_Native_Video_Params.ar_divid);
		var place = Adriver_Native_Video.getDimsPlace(a),
		pos = Adriver_Native_Video.getPosition(a, 1),
		sg = Adriver_Native_Video.getScreenGeometry(),
		wVis = Adriver_Native_Video.getV('h', place, pos, sg),
		hVis = Adriver_Native_Video.getV('v', place, pos, sg);
		var S = place.h, curS = hVis, curN = sg.st+sg.ch, ar_op; Adriver_Native_Video.shown == 0 ? ar_op = 0.5 : ar_op = Adriver_Native_Video_Params.ar_open/100;
		if(((pos.top+Adriver_Native_Video_Params.ar_height*ar_op)>=sg.sh) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){Adriver_Native_Video_Params.ar_open = 0;}
		if(((pos.top<=sg.sh && curN>=pos.top && Adriver_Native_Video_Params.ar_open==0) || curS/S>=ar_op) && !Adriver_Native_Video.shown){
			Adriver_Native_Video.draw(a, Adriver_Native_Video_Params.ar_VAST_link);
			Adriver_Native_Video.shown = 1;
			Adriver_Native_Video.removeEvent(window, 'resize', Adriver_Native_Video.c);
			Adriver_Native_Video.removeEvent(window, 'scroll', Adriver_Native_Video.c);
		}
	},
	mobile_c: function() {
		var a = document.getElementById(Adriver_Native_Video_Params.ar_divid);
		var place = Adriver_Native_Video.getDimsPlace(a),
		pos = Adriver_Native_Video.getPosition(a, 1),
		sg = Adriver_Native_Video.getScreenGeometry(),
		wVis = Adriver_Native_Video.getV('h', place, pos, sg),
		hVis = Adriver_Native_Video.getV('v', place, pos, sg);
		var S = place.h, curS = hVis, curN = sg.st+sg.ch, ar_op; Adriver_Native_Video.shown == 0 ? ar_op = 0.5 : ar_op = Adriver_Native_Video_Params.ar_open/100;
		if((pos.top+Adriver_Native_Video_Params.ar_height*ar_op)>=sg.sh){Adriver_Native_Video_Params.ar_open = 0;}
		if(((pos.top<=sg.sh && curN>=pos.top && Adriver_Native_Video_Params.ar_open==0) || curS/S>=ar_op) && !Adriver_Native_Video.shown){
			Adriver_Native_Video.play_mobile(a, Adriver_Native_Video_Params.ar_VAST_link);
			Adriver_Native_Video.shown = 1;
			Adriver_Native_Video.removeEvent(window, 'resize', Adriver_Native_Video.mobile_c);
			Adriver_Native_Video.removeEvent(window, 'scroll', Adriver_Native_Video.mobile_c);
		}
	},
	check: function(){
		var a = document.getElementById(Adriver_Native_Video_Params.ar_divid);
		var place = Adriver_Native_Video.getDimsPlace(a),
		pos = Adriver_Native_Video.getPosition(a, 1),
		sg = Adriver_Native_Video.getScreenGeometry(),
		wVis = Adriver_Native_Video.getV('h', place, pos, sg),
		hVis = Adriver_Native_Video.getV('v', place, pos, sg);
		var S = place.w * place.h, curS = wVis * hVis;
		if (!(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
			if((curS/S < 0.5 && Adriver_Native_Video.shown && window.adriver_video) || window.adriver_video.isActive == false){
				var pb = document.getElementById('ar-vast-pause-button');var pbw = document.getElementById('ar-vast-pause-button-wr');
				if(pb && pbw){if(!window.adriver_video.paused()){window.adriver_video.pause();} pb.style.display = 'none';pbw.style.display = 'none';}
			}
			if(curS/S > 0.5 && Adriver_Native_Video.shown && window.adriver_video && window.adriver_video.isActive == true){
				var pb = document.getElementById('ar-vast-pause-button');var pbw = document.getElementById('ar-vast-pause-button-wr');
				if(pb && pbw){if(window.adriver_video.paused() && pb.className != 'vast-play-button'){window.adriver_video.play();} pb.style.display = 'block';pbw.style.display = 'block';}
			}
		}
	},
	indiv: function(tag,op){
		var sp = Adriver_Native_Video_Params.ar_speed;
		tag.style.margin = '0 auto';
		tag.style.textAlign = 'center';
		tag.style.width = this.normalize(Adriver_Native_Video_Params.ar_width);
		tag.style.position = "relative";
		tag.style.overflow = "hidden";
		tag.style.opacity = 0;
		if(op == 0){
			tag.style.height = this.normalize(Adriver_Native_Video_Params.ar_height);
			if(!document.all){
				tag.style.setProperty("transform", "initial");
				tag.style.setProperty("-webkit-transition", "opacity "+sp+"s ease-in-out");
				tag.style.setProperty("-moz-transition", "opacity "+sp+"s ease-in-out");
				tag.style.setProperty("-o-transition", "opacity "+sp+"s ease-in-out");
				tag.style.setProperty("transition", "opacity "+sp+"s ease-in-out");
			}
		}else{
			tag.style.height = 0;
			if(!document.all){
				tag.style.setProperty("transform", "initial");
				tag.style.setProperty("-webkit-transition", "height "+sp+"s cubic-bezier(.2,.9,.79,.89) 0s, opacity "+sp+"s ease-out");
				tag.style.setProperty("-moz-transition", "height "+sp+"s cubic-bezier(.2,.9,.79,.89) 0s, opacity "+sp+"s ease-out");
				tag.style.setProperty("-o-transition", "height "+sp+"s cubic-bezier(.2,.9,.79,.89) 0s, opacity "+sp+"s ease-out");
				tag.style.setProperty("transition", "height "+sp+"s cubic-bezier(.2,.9,.79,.89) 0s, opacity "+sp+"s ease-out");
			}
		}
	},
	Native_Video: function(x){ /* All the magic starts here. Please sit down and enjoy */
		var ar_s = Adriver_Native_Video_Params.ar_speed*1000;
		if(!x){var head=document.getElementsByTagName('head')[0],st=document.createElement('link');st.setAttribute('rel','stylesheet');st.setAttribute('href',Adriver_Native_Video_Params.ar_folder+'native.video.vast.css');head.insertBefore(st,head.firstChild);}
		if(document.readyState === "complete" || document.readyState === "interactive"){
			var a = document.getElementById(Adriver_Native_Video_Params.ar_divid);
			if(a){
				if(Adriver_Native_Video_Params.ar_num && a.innerHTML){
					var tag = a, inner = document.createElement('div');
					inner.id = Adriver_Native_Video_Params.ar_divid = 'ar_Adriver_Native_Video';
					for (var i = 0, r = 0, q = 0; i < tag.childNodes.length; i++) {
						if(r==Adriver_Native_Video_Params.ar_num || ((i+1)==tag.childNodes.length && !Adriver_Native_Video_Params.ar_tag)){
							tag.insertBefore(inner, tag.childNodes[i]);
							a = document.getElementById(Adriver_Native_Video_Params.ar_divid);
							Adriver_Native_Video.indiv(a,Adriver_Native_Video_Params.ar_open); break;
						}
						if(r!=Adriver_Native_Video_Params.ar_num && (i+1)==tag.childNodes.length && Adriver_Native_Video_Params.ar_tag) {
							tag.insertBefore(inner, tag.childNodes[q+1]);
							a = document.getElementById(Adriver_Native_Video_Params.ar_divid);
							Adriver_Native_Video.indiv(a,Adriver_Native_Video_Params.ar_open); break;
						}
						if(Adriver_Native_Video_Params.ar_tag && tag.childNodes[i].tagName == Adriver_Native_Video_Params.ar_tag.toUpperCase()){r++;q=i+1;} else if (!Adriver_Native_Video_Params.ar_tag && tag.childNodes[i].tagName && tag.childNodes[i].tagName != 'BR'){r++;}
					}
				}else{
					Adriver_Native_Video.indiv(a,Adriver_Native_Video_Params.ar_open);
				}
				if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
					Adriver_Native_Video.draw_mobile(a, Adriver_Native_Video_Params.ar_VAST_link);
				} else {
					Adriver_Native_Video.addEvent(window, 'scroll', Adriver_Native_Video.c);
					Adriver_Native_Video.addEvent(window, 'resize', Adriver_Native_Video.c);
					Adriver_Native_Video.c();
				}
				
			}
		} else {
			setTimeout(Adriver_Native_Video.Native_Video, 1000, 1);
		}
	}
};
var host = window.location.host;
var fullscreen = false;

function createEl(attr, type, parent) {
  var el = document.createElement(type);
  attrSetter(el, attr);
  parent.insertBefore(el, parent.firstChild);
}
function attrSetter(el, attr) {
  for( var k in attr ) {
    el.setAttribute(k, attr[k]);
  }
}
function setUrl(myFrame, link) {
  var appFrame = document.getElementById(myFrame);
  appFrame.src = link;
}
var resize = function() {
    console.log('resize');
    var element = document.getElementById('buttonResize');
    if(fullscreen) {
        cancelFullscreen(element);
    }
    else launchFullScreen(element);
};

var launchFullScreen = function () {
    var element = '';
    if(document.getElementsByTagName('video')[0] && document.getElementsByTagName('video')[0].hasAttribute('src')) {
        element = document.getElementsByTagName('video')[0];
        console.log('video');
    }
    else {
        if(document.getElementsByTagName('object')[0]) {
            if (RegExp('vgtv.no').test(host)){
                element = document.getElementsByTagName('object')[0].parentNode.parentNode.parentNode;
            }
            else
                element = document.getElementsByTagName('object')[0].parentNode;
            console.log('object');

        }

        else {
            element = document.body;
            console.log('body');
        }
    }
    fullscreen = true;
    if (element.requestFullscreen)
        element.requestFullscreen();
    else if (element.msRequestFullscreen)
        element.msRequestFullscreen();
    else if (element.mozRequestFullScreen)
        element.mozRequestFullScreen();
    else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen();
}
var cancelFullscreen = function () {
    fullscreen = false;
    if(document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
}

function addedNavbar(div) {
    div.innerHTML = '<nav class="navbar navbar-inverse navbar-fixed-top">\
						<div class="container container-left">\
						<div class="navbar-header">\
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\
						<span class="sr-only">Toggle navigation</span>\
					<span class="icon-bar"></span>\
						<span class="icon-bar"></span>\
						<span class="icon-bar"></span>\
						</button>\
						<ul id="pp-nav-logo" data-toggle="tooltip" data-placement="bottom" title="Back to the nest">\
						<li>\
						<a href="https://test.cstickmedia.com/" target="_blank">\
						<img src="https://test.cstickmedia.com/style/img/navbar-pp-logo-beta.png">\
						</a>\
						</li>\
						</ul>\
						</div>\
						<div id="navbar"  class="collapse navbar-collapse">\
						<ul class="nav navbar-nav">\
						<li  data-toggle="tooltip" data-placement="bottom" title="Watch live TV"><a href="https://test.cstickmedia.com/" target="_blank">Live TV</a></li>\
					<li  data-toggle="tooltip" data-placement="bottom" title="Browse movies"><a href="https://test.cstickmedia.com/services#category=movies#filter=" target="_blank">Movies</a></li>\
					<li  data-toggle="tooltip" data-placement="bottom" title="Browse TV-series"><a href="https://test.cstickmedia.com/services#category=tvseries#filter=" target="_blank">TV-Series</a></li>\
					</ul>\
					<div>\
					<ul class="nav navbar-nav navbar-center" >\
						<li>\
						<img id="buttonResize" src="http://uxrepo.com/static/icon-sets/ionicons/png32/512/000000/arrow-expand-512-000000.png">\
						</li>\
						</ul>\
					</div></div></div></div></nav>';
}

if(window === window.top) {
      $('body').addClass('sitesBody');
      $('html').addClass('sitesHtml');
      createEl({ 'id':'PPnav' }, 'div', document.body);
      var nav = document.getElementById('PPnav');
      addedNavbar(nav);
      var btn = document.getElementById('buttonResize');
      btn.addEventListener("click", resize);
        if (!RegExp('vgtv.no').test(host)){console.log('no vgtv.no');
            $('#buttonResize').addClass('btnResize');
        }
      btn.addEventListener("click", resize);
        if (RegExp('se.sbsdiscovery.no').test(host)){
            $('#page-header-container').addClass('sitePadding');
        }
        if (RegExp('youtube.com').test(host)){
            $('#masthead-positioner').addClass('sitePadding');
            $('#appbar-guide-menu').addClass('siteTop');
        }
        if (RegExp('sumo.tv2.no').test(host)){
            $('header#header').addClass('siteTop');
        }
        if (RegExp('underscorejs.org').test(host)){
            $('div#sidebar').addClass('siteTop');
        }
        if (RegExp('vgtv.no').test(host)){
            //$('body').addClass('siteTop');
            $('body').addClass('siteTop');
            $('div.wrapper').addClass('siteTop');
        }
}

    var _bindApi = function (name, callback) {
        var apiHandlers ;//= callback;
        var me = this;
        if (!apiHandlers) {console.log('apiHandlers');
            apiHandlers = {};
            window.addEventListener('message', function (event) {
                try {
                    // Check the origin of the data!
                    if (~event.origin.indexOf('http://localhost')) {
                        // The data has been sent from test environment
                        // TODO: COMMENT OFF on production
                        var objData = JSON.parse(event.data);
                        if (objData != null) {
                            var callback = apiHandlers[objData.eventName];
                            if (callback != null) {
                                var result = callback.apply(me, objData.args);
                                console.log(result);
                            }
                        }
                        return;
                    }
                } catch (err) {
            console.log(err);
            return;
          }
        });
      }
       apiHandlers[name] = callback;
    }

var bindResize = function (method) {
  _bindApi('resizeScreen', method);
}




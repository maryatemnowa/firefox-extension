var self = require('sdk/self');
var pageMod = require("sdk/page-mod");

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

//exports.dummy = dummy;
var buttons = require('sdk/ui/button/action');
var { ToggleButton } = require("sdk/ui/button/toggle");


// Import the page-mod API
// Create a page-mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
  include: [
	'*.tv.nrk.no',//+
	'*.vgtv.no',//+
	'*.sumo.tv2.no',//+
	'*.se.sbsdiscovery.no',
	'*.viaplay.no',
    '*.youtube.com',
	'*.netflix.com',
	'*.cmore.no',
	'*.hbonordic.com'
  ],
  contentScriptFile: [self.data.url("jquery.min.js"), self.data.url("toolbar.js"), self.data.url("scframe.js")],
  contentStyleFile: [self.data.url("styleSites.css"), self.data.url("pp.css"), self.data.url("scframe.css"),
                     self.data.url("pp-nav.scss"),self.data.url("pp-style.css"), self.data.url("bootstrap.min.css")]
});

//var myPanel = require("sdk/panel").Panel({
//    contentURL: self.data.url("toolbar.html")
//});
//myPanel.show();
console.log(self.data.url("/style/css/pp-style.css"));
console.log(self.data.url("/style/css/bootstrap.min.css"));
var button = ToggleButton({
    id: "my-button1",
    label: "ParrotPlay",
    icon: {
        "16": "./logo-bird.png",
        "48": "./icon-128.png"
    },
    //onChange: changed,
    //badge: 0,
    //badgeColor: "#00AAAA"
  });

//function changed(state) {
//myPanel.show();
//  button.badge = state.badge + 1;
//  if (state.checked) {
//    button.badgeColor = "#AA00AA";
//  }
//  else {
//    button.badgeColor = "#00AAAA";
//  }
//}



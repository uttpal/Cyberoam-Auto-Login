
var name = "extensions.uttpal25993@gmail.com.pass";
var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var url = require("sdk/simple-prefs").prefs.url;
var usr = require("sdk/simple-prefs").prefs.user;

var button = require("sdk/ui/button/action").ActionButton({
    id: "auto",
    label: "Cyberoam Auto Login",
    icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
    },
    onClick: function() {

        tabs.open({
        url: url,
        onReady: runScript
        });
        
        function runScript(tab) {
            if (require("sdk/simple-prefs").prefs.pass!="******"){

                require("sdk/passwords").search({
                    username: usr,
                    onComplete: function onComplete(credentials) {
                        credentials.forEach(require("sdk/passwords").remove);
                    }
                });

                require("sdk/passwords").store({
                    url: "http://172.22.2.2",
                    formSubmitURL: "http://172.22.2.2",
                    username: usr,
                    usernameField: "username",
                    password: require("sdk/simple-prefs").prefs.pass,
                    passwordField: "password"
                });
                require("sdk/preferences/service").set(name, "******");
            }


            var worker = tab.attach({
                contentScriptFile: data.url("scr.js")
            });

            require("sdk/passwords").search({
                username: usr,
                url: "http://172.22.2.2",
                onComplete: function onComplete(credentials) {
                    credentials.forEach(function(credential) {
                        worker.port.emit("user", credential.username);
                        worker.port.emit("pass", credential.password);
                    });
                }
            });
        }
    }
});

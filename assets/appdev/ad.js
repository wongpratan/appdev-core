
/**
 * @class AD_Client
 * @parent index 4
 *
 * ###Client side global AD namespace.
 *
 * This file defines standard functions and calls for appDev
 * objects on the client side.
 */

// Create our AD  Namespace only if it hasn't been created already
if (typeof window.AD == 'undefined') {


    AD = {};


    // AD.xxxx      These properties hold the defined Class/Controller/Model definitions
    //              for our loaded projects.
    AD.controllers = {};    // UI Controllers: user interactions and displays
    AD.models = {};         // Models and data access
    AD.models_base = {};    //    --> appdev generated Model Files
    AD.widgets = {};        // Reusable Widgets for UI display
    AD.classes = {};        // Domain Models
    AD.ui = {};


    // AD.Xxxxx     These properties hold helper/factory methods for our Class/Controller/Model
    // AD.Model     // factory for making models & base_models
    // AD.Control   // factory for making Controllers
    // AD.Class     // factory for making Class 



    AD.defaults = function(defObj, optObj) {
        if (optObj) {
            for (var o in optObj) {
                defObj[o] = optObj[o];
            }
        }
        return defObj;
    };


    AD.ui.bootup = {};
    AD.ui.bootup.requireSeries = function ( libraries ) {

        var linksLoaded = document.getElementsByTagName('link');
        var isLoaded = function(library) {

            // if the provided library obj has a cond() then run that:
            if (library.cond) {

                return library.cond();

            } else {

                // else check for matches with library.tag

                for (var i=0; i<linksLoaded.length; i++) {

                    if (linksLoaded[i].href.indexOf(library.tag) != -1 ) {
                        return true;
                    }
                    
                }

                // if we got here, there is not a link loaded with this library tag.
                return false;

            }
        }


        var librariesToLoad = [];
        libraries.forEach(function(series){

            var newSeries = [];

            series.forEach(function(library){

                if (!isLoaded(library)) {
                    newSeries.push(library.lib);
                }

            });

            if (newSeries.length > 0) {
                librariesToLoad.push(newSeries);
            }

        });


        // now do the actual loading of the required libraries

        // this recursive fn loads an array of libraries at a time:
        var loadSeries = function (indx) {

            if (indx >= librariesToLoad.length) {
                return;
            } else {

                console.log('loading series:');
                console.log(librariesToLoad[indx]);

                steal.apply(steal, librariesToLoad[indx])
                .then(
                    function() {
                        loadSeries(indx+1);
                    }
                );

            }
        }

        loadSeries(0);

    }

    
    function versionCompare(v1, v2, options) {
        var lexicographical = options && options.lexicographical,
            zeroExtend = options && options.zeroExtend,
            v1parts = v1.split('.'),
            v2parts = v2.split('.');

        function isValidPart(x) {
            return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
        }

        if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
            return NaN;
        }

        if (zeroExtend) {
            while (v1parts.length < v2parts.length) v1parts.push("0");
            while (v2parts.length < v1parts.length) v2parts.push("0");
        }

        if (!lexicographical) {
            v1parts = v1parts.map(Number);
            v2parts = v2parts.map(Number);
        }

        for (var i = 0; i < v1parts.length; ++i) {
            if (v2parts.length == i) {
                return 1;
            }

            if (v1parts[i] == v2parts[i]) {
                continue;
            }
            else if (v1parts[i] > v2parts[i]) {
                return 1;
            }
            else {
                return -1;
            }
        }

        if (v1parts.length != v2parts.length) {
            return -1;
        }

        return 0;
    }
    AD.util = {};
    AD.util.versionCompare = versionCompare;


    // is it possible we have a jQuery version conflict?
    AD.ui._resolveConflict = false;

}
  



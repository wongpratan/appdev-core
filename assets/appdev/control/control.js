steal('appdev/UIController.js',

    function() {



    // (function() {

        /**
         * @class AD.Control
         * @parent AD_Client
         *
         * This is our default 
         */
    	if (typeof AD.Control == "undefined") {
    		AD.Control = {

                /**
                 * @function extend
                 * Create a can.Control object namespaced under AD.controllers.* 
                 * 
                 * @param [string] name      The name of the controller.  The
                 *        name can be namespaced like so: 'application.info.list'.
                 *        This will create a: AD.controllers.application.info.list
                 *        controller, that you would then attach to the DOM like:
                 *        AD.controllers.application.info.list('#infoList', {
                 *          options:true
                 *        });
                 *
                 * @param [object] static    [optioinal] The static method 
                 *        definitions
                 * @param [object] instance  The instance definition
                 */
                extend:function(name, staticDef, instanceDef) {


                    // first lets figure out our namespacing:
                    var nameList = name.split('.');
                    var controlName = nameList.pop(); // remove the last one.

                    // for each remaining name segments, make sure we have a 
                    // namespace container for it:
                    var curr = AD.controllers;
                    nameList.forEach(function(name) {

                        if (typeof curr[name] == 'undefined' ) {
                            curr[name] = {};
                        }
                        curr = curr[name];
                    })


                    // now let's create our final control:
                    // We subclass the UIController here so our UI controllers have
                    // built in translation capabilities.
                    curr[controlName] = AD.classes.UIController.extend(staticDef, instanceDef);

                }
            };
    	}
        

    // })();

});
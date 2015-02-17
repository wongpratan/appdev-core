
steal(
    'jquery',
    'can',
    function() {

        
        /**
         * @class AD.classes.UIController
         * @parent can.Control
         *
         * Identical to can.Control except it automatically scans its contents during
         * initialization and sets up all elements with the 'app-label-key' attribute
         * as Label controls. These labels can then be translated using the 
         * translateLabels() method.
         */
        AD.classes.UIController = can.Control.extend({
            // Static properties
            
        },{
            // Instance properties

            domToString: function($el) {

                return $('<div>').append( $el.clone() ).html();

            },


            /**
             * @function domToTemplate
             *
             * return the contents of the given DOM element as a string template.
             *
             * This routine will perform common template setup routines:
             *
             */
            domToTemplate: function($el) {

                // remove anything specifically marked as mockup
                $el.find('.mockup').remove();
                
                var tmpl = $el.html();
console.log();
console.log(tmpl);
// <!--" (el) -> can.data(el, 'person', person) "-->
                var expectedTags = [ 
                    { from:'<!--', to:'<%'},
                    { from:'-->', to:'%>'},
                    { from:'[[=', to:'<%='},
                    { from:']]', to:'%>'}
                ];
                expectedTags.forEach(function(tag) {
                    tmpl = AD.util.string.replaceAll(tmpl, tag.from, tag.to);
                });


                // now embed any specified object references:
                tmpl = tmpl.replace(/obj-embed="(\w+)"/g, function($0, $1 ) {
                    return "<%= (el) -> can.data(el, '"+$1+"', "+$1+") %>";
                });

console.log();
console.log(tmpl);
                return tmpl;

            },

            hide:function() {
                this.element.hide();
            },

            show:function() {
                this.element.show();
            },
            
            init: function ($element) {
                this.labels = [];

                var keyAttr = AD.controllers.Label.constants.keyAttribute;
                var $labels = $element.find('[' + keyAttr + ']');
                var self = this;
                
                $labels.each(function(){
                    self.labels.push( new AD.controllers.Label($(this)) );
                });
                
            },
            
            /**
             * @function translateLabels
             * @param string lang (Optional)
             */
            translateLabels: function (lang) {
                $.each(this.labels, function(){
                    this.translate(lang);
                });
            }
            
        });

    });

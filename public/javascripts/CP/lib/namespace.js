(function(window, document, $, undefined) {

  // Set up the necessary namespaces for the editing Backbone classes

  window.dc || (window.dc = {});
  window.dc.ui || (window.dc.ui = {});
  window.dc.model || (window.dc.model = {});
  window.dc.lib || (window.dc.lib = {});
  window.DV.Backbone || ( window.DV.Backbone = Backbone.noConflict() );
  window.DV.easyXDM || ( window.DV.easyXDM = easyXDM.noConflict("DV") );

})(window, document, jQuery);

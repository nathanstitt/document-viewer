dc.ui.Login = Backbone.View.extend({


  initialize : function(options) {
    _.bindAll(this, 'close', 'delayedClose');
  },  

  open : function() {
    this.options.editor.remoteSocket.showLogin( this.delayedClose );
    this.$el.show();
  },

  delayedClose: function(){
    _.delay( this.close, 1500 );
  },

  close: function(){
    this.$el.hide();
  }

});
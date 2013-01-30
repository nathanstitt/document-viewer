dc.ui.Login = DV.Backbone.View.extend({


  initialize : function(options) {
    this.socket = options.socket;
    _.bindAll(this, 'close', 'delayedClose');
  },  

  open : function( callback ) {
    this.callback = callback;
    this.socket.showLogin( this.delayedClose );
    this.$el.show();
  },

  delayedClose: function(){
    _.delay( this.close, 1500 );
  },

  close: function(){
    if ( _.isFunction(this.callback) ){
      this.callback();
      this.callback = null;
    }
    this.$el.hide();
  }

});
(function(window, document, $, undefined) {

  // The ReplyDispatcher object binds its methods to 'this' so they can access
  // the document.  It handles replies back from the RPC socket
  function ReplyDispatcher( document ){
    this.document = document;

    this.onSuccess = _.bind(function( reply ){
      if (reply.account){
        dc.account.set( reply.account );
      } else {
        dc.account.clear();
      }
      if (reply.document)
        this.document.set( reply.document );
    },this);

    // need to decide what to do here.  The viewer
    // doesn't have a dialog or anything to show
    this.onFailure = _.bind(function( exception ){
      if ( console && console.warn ){
        console.warn( exception );
      }
    },this);

  }

  function RemoteSocket( document, viewer ) {
    this.dispatcher = new ReplyDispatcher( document );
    this.document = document;
    this.viewer = viewer;
    var me = this;

    this._socket = new DV.easyXDM.Rpc({
      remote: 'https://' + this.viewer.hostDomain + '/auth/iframe',
      container: this.viewer.$('.DV-loginContainer .frame')[0]
    }, {
      remote: {
        loadStartingPage:{}, // Loads the initial login page into the remote iframe
        getRemoteData:{}      // attempts to determine if the account is logged in and gets it's data
      },
      local: {
        loggedInStatus: function( data ){
          data.success ? me.dispatcher.onSuccess( data ) : me.dispatcher.onFailure( data );
          if ( _.isFunction(me._close_callback) ){
            me._close_callback( data );
          }
        }
      }
    });

    this.getRemoteData();
  }

  RemoteSocket.prototype.showLogin = function ( close_callback ){
    this._close_callback = close_callback;
    this._socket.loadStartingPage();
  };

  RemoteSocket.prototype.getRemoteData = function(){
    this._socket.getRemoteData( this.document.id, this.dispatcher.onSuccess, this.dispatcher.onFailure );
  },


  dc.lib.RemoteSocket = RemoteSocket;


})(window, document, jQuery);

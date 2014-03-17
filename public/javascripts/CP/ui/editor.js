
// Main controller for the in-viewer document editor. Orchestrates subviews.
dc.ui.editor = DV.Backbone.View.extend( {

  initialize : function() {

    this.viewer   = this.options.viewer;
    this.elements = this.viewer.elements;
    this.document     = new dc.model.Document( this.viewer.schema.document );
    this.remoteSocket = new dc.lib.RemoteSocket( this.document, this.viewer );
    this.createSubViews();
  },

  render: function(){
    this.setAccess();
    this.renderSubViews();
    return this;
  },


  // Create all of the requisite subviews.
  createSubViews : function() {
    this.controlPanel= new dc.ui.ViewerControlPanel( {
      el     : this.viewer.elements.controlPanel,
      editor : this,
      viewer : this.viewer
    });
  },

  login: function( callback ){
    if (! this._login)
      this._login = new dc.ui.Login( _.extend({ el:this.viewer.$('.DV-loginContainer')}, {socket: this.remoteSocket}) );
    this._login.open( callback );
  },

  logout: function(){
    this.remoteSocket.logout();
  },

  setAccess: function(){
    var access = 'DV-isCommentor';
    if (this.options.isReviewer) access = 'DV-isReviewer';
    if (this.options.isOwner) access = 'DV-isOwner';
    this.viewer.elements.viewer
      .addClass(access)
      .find('.DV-thumbnailsView').show();
  },

  // Render all of the existing subviews and place them in the DOM.
  renderSubViews : function() {

    this.$el.append( this.controlPanel.render().el );

    this.controlPanel.displayLoggedInStatus( false );
    this.controlPanel.render().$el.insertBefore( this.viewer.elements.well.find('.DV-logo') );

    this.viewer.api.roundTabCorners();

    var supp = this.viewer.elements.viewer.find('.DV-supplemental');
    if (supp.hasClass('DV-noNavigation')) {
      supp.removeClass('DV-noNavigation').addClass('DV-noNavigationMargin');
    }
  }


});

dc.ui.ViewerControlPanel = DV.Backbone.View.extend({

  attributes:{
    'class': 'control_panel'
  },

  events : {
    'click .public_annotation':     'togglePublicAnnotation',
    'click .private_annotation':    'togglePrivateAnnotation'
  },

  initialize : function() {
    _.bindAll(this,  'render');
    this.viewer = this.options.viewer;
    this.editor = this.options.editor;
    this.document = this.editor.document;
    this.listenTo( this.document, 'change:annotations_url', this.render );
    this.listenTo( dc.account,    'change', this.onAccountChange);
    this.annotationEditor   = new dc.ui.AnnotationEditor({ viewer: this.viewer, document: this.document });
  },

  displayLoggedInStatus: function(){
    this.viewer.elements.well.find('.DV-authenticate').
      toggleClass( 'DV-UnknownAccount', ! dc.account.isLoggedIn() ).
      html( this._loggedInMessage() );
  },

  onAccountChange: function(account){
    this.displayLoggedInStatus();
    this.render();
  },

  render : function() {
    if ( this.document.allowedAnnotations() ) {
      this.$el.html( JST['control_panel']({
        loggedIn: dc.account.isLoggedIn()
      } ) );
    } else {
      this.$el.html( '' );
    }
    return this;
  },

  toggleAnnotate: function( anno_type ){
    if ( dc.account.isLoggedIn() ){
      this.openDocumentTab();
      this.annotationEditor.toggle( anno_type );
    } else {
      this.editor.login( _.bind(this.toggleAnnotate, this, anno_type ));
    }
  },

  togglePublicAnnotation : function() {
    this.toggleAnnotate( 'public' );
  },

  togglePrivateAnnotation : function() {
    this.toggleAnnotate( 'private' );
  },

  openDocumentTab : function() {
    if (this.viewer.state != 'ViewDocument') {
        this.viewer.open('ViewDocument');
    }
  },
  _loggedInMessage: function(account){
    if ( dc.account.isLoggedIn() ){
      return DV.t('logged_in_as', dc.account.displayIdentifier() ) +
        '<div class="DV-logout minibutton">' + DV.t('log_out') + '</div>';
    } else {
      return '<div class="DV-login minibutton">' + DV.t('log_in') + '</div';
    }
  }


});

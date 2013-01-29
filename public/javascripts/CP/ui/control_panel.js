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
    this.listenTo( this.document, 'change:access', this.render );
    this.listenTo( dc.account,    'change', this.onAccountChange);

    this.annotationEditor   = new dc.ui.AnnotationEditor({ viewer: this.viewer, document: this.document });

  },

  onAccountChange: function(account){
    var auth_el   = this.viewer.elements.well.find('.DV-authenticate'),
        logged_in = account.isLoggedIn();

    auth_el.toggleClass( 'DV-UnknownAccount', ! logged_in ).
      html( logged_in ?
            "Logged in as "+account.displayIdentifier() :
            'Login'
          );

    this.render();
  },

  render : function() {
    if ( this.document.allowedAnnotations() )
      this.$el.html( JST['control_panel']({
        loggedIn: dc.account.isLoggedIn()
      } ) );
    else
      this.$el.html( '' );
    return this;
  },

  toggleAnnotate: function( anno_type ){
    if ( dc.account.isLoggedIn() ){
      this.openDocumentTab();
      this.annotationEditor.toggle( anno_type );
    } else {
      this.editor.login.open( _.bind(this.toggleAnnotate, this, anno_type ));
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
  }


});
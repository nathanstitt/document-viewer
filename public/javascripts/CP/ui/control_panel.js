dc.ui.ViewerControlPanel = Backbone.View.extend({

  attributes:{
    'class': 'control_panel'
  },

  events : {
    'click .public_annotation':     'togglePublicAnnotation',
    'click .private_annotation':    'togglePrivateAnnotation'
  },

  initialize : function() {
    _.bindAll(this,  'onDocumentChange', 'render');
    this.viewer = this.options.viewer;
    this.editor = this.options.editor;
    this.document = this.editor.document;
    this.listenTo( this.document, 'change:access', this.render );
    this.listenTo( this.document, 'change', this.onDocumentChange );
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
    var html = this.document.allowedAnnotations() ? JST['control_panel']() : '';
    this.$el.html( html );
    
    return this;
  },

  onDocumentChange : function(doc) {
    // this.viewer.api.setTitle(doc.get('title'));
    // this.viewer.api.setSource(doc.get('source'));
    // this.viewer.api.setRelatedArticle(doc.get('related_article'));
    // this.viewer.api.setPublishedUrl(doc.get('remote_url'));
    // this.viewer.api.setDescription(doc.get('description'));
    // this.setOnParent(doc, {
    //   title           : doc.get('title'),
    //   source          : doc.get('source'),
    //   related_article : doc.get('related_article'),
    //   remote_url      : doc.get('remote_url'),
    //   description     : doc.get('description'),
    //   access          : doc.get('access'),
    //   data            : _.clone(doc.get('data'))
    // });
    // if (doc.hasChanged('access')) {
    //   this.closeDocumentOnAccessChange();
    // }
  },

  togglePublicAnnotation : function() {
    this.openDocumentTab();
    this.annotationEditor.toggle('public');
  },

  togglePrivateAnnotation : function() {
    this.openDocumentTab();
    this.annotationEditor.toggle('private');
  },

  openDocumentTab : function() {
    if (this.viewer.state != 'ViewDocument') {
        this.viewer.open('ViewDocument');
    }
  }


});
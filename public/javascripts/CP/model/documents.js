


dc.model.Document = DV.Backbone.Model.extend({

  constructor : function(attrs,options) {
    this.notes = new dc.model.NoteSet();
    DV.Backbone.Model.call(this, attrs, options);
    if ( attrs && attrs.id )
      this.set('id', parseInt( attrs.id, 10) );
  },

  set: function(json){
    DV.Backbone.Model.prototype.set.apply(this, arguments );
    this.notes.reset( json.annotations || [] );
  },

  allowedAnnotations: function(){
    return _.contains( dc.access.COMMENTING_LEVELS, this.get('access') );
  },

  serverEndpoint: function(){
    return 'https://' + DV.Schema.helpers.extractHost( this.get('canonical_url') );
  },

  annotationsEndpoint: function(){
    return this.serverEndpoint() + '/documents/' + this.id + '/annotations';
  }
  

});




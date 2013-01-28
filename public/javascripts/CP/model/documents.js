
if (!dc.model.Document){


dc.model.Document = Backbone.Model.extend({

  constructor : function(attrs,options) {
    this.notes = new dc.model.NoteSet();
    Backbone.Model.call(this, attrs, options);
  },

  set: function(json){
    Backbone.Model.prototype.set.apply(this, arguments );
    if ( json.annotations ){
      this.notes.reset( json.annotations );
    }
  },

  allowedAnnotations: function(){
    return _.contains( dc.access.COMMENTING_LEVELS, this.get('access') );
  }
  

});



}
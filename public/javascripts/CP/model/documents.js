
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

  // FIXME.  Plug in an additional check for the new access level here
  // and check it against the documents access
  allowedAnnotations: function(){
    return dc.account.isLoggedIn();
  }
  

});



}

if (!dc.model.Note){


dc.model.Note = Backbone.Model.extend({

});



dc.model.NoteSet = Backbone.Collection.extend({

  model : dc.model.Note

});



}
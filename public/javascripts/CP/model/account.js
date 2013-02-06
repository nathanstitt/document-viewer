
dc.model.Account =  DV.Backbone.Model.extend({


  isOwner: function(doc){
    return doc.get('account_id') == this.id;
  },

  isLoggedIn: function(){
    return ! _.isUndefined(this.id);
  },

  fullName: function(){
    return this.get('first_name') + '  ' + this.get('last_name');
  },

  displayIdentifier: function(){
    return this.get('email') || this.fullName();
  },

  canEditAnnotation: function(anno){
    // New notes or ones marked as editable can can be edited by logged in users 
    return !!( ( ! anno.model.server_id || anno.model.editable ) && this.isLoggedIn() );
  }

});

// This is setup as global for two reasons:
// One - it was that way historically, so why change and break code
// Two - it really is a global.  A person can only be logged into one account at a time

dc.account = new dc.model.Account({uninitialized: true});


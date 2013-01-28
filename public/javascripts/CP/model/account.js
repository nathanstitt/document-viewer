
dc.model.Account =  Backbone.Model.extend({


  isOwner: function(doc){
    return doc.get('account_id') == this.id;
  },

  isLoggedIn: function(){
    return ! _.isUndefined(this.id);
  }

});

// This is setup as global for two reasons:
// One - it was that way historically, so why change and break code
// Two - it really is a global.  A person can only be logged into one account at a time

dc.account = new dc.model.Account();


describe("Login", function() {

  it("closes login box", viewer( function(viewer){
    viewer.loginManager.should.call('close').when( function(){
      viewer.loginManager.$('.close').trigger('click');
    });
  }));


});


describe("Viewer", function() {


  it("renders", viewer( function(viewer){
    assert.equal( "1-french-vocab", viewer.model.id );
  }));

  it("renders contributor", viewer( function(viewer){
    assert.equal( 'Contributed by: Testing Account, Testing Organization', viewer.$('.DV-contributor').text() );
  }));


  it("updates ui", viewer( function(viewer){
    expect( viewer.$('.DV-login').text() ).to.have.string('log in');
    DV.account.set({ id: 1, first_name:'foo'});
    expect( viewer.$('.DV-login').text() ).to.have.string('signed in as foo');
  }));


});

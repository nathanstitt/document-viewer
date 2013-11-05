describe("Viewer", function() {

  beforeEach(function(){
    this.document = new DV.model.NewDocument( window.fixtures.documents.french_vocab );
  })

  it("sets notes", function(){
    expect( this.document ).to.have.ownProperty('notes')
    expect( this.document.notes.url ).to.equal( 'http://dev.dcloud.org/notes' )
  });


});

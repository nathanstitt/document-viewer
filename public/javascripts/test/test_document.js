var expect = chai.expect;

describe("Viewer", function() {


  before( function(){
    this.document_json = {"id":"9-french-vocab","title":"French Vocab","pages":62,"description":null,"source":null,"created_at":"Tue, 27 Aug 2013 22:16:05 +0000","updated_at":"Wed, 23 Oct 2013 17:40:10 +0000","canonical_url":"http://dev.dcloud.org/documents/9-french-vocab.html","language":"eng","contributor":"Testing Account","contributor_organization":"Testing Organization","display_language":"spa","resources":{"pdf":"http://dev.dcloud.org/asset_store/documents/9/french-vocab.pdf","text":"http://dev.dcloud.org/asset_store/documents/9/french-vocab.txt","thumbnail":"http://dev.dcloud.org/asset_store/documents/9/pages/french-vocab-p1-thumbnail.gif","search":"http://dev.dcloud.org/documents/9/search.json?q={query}","print_annotations":"http://dev.dcloud.org/notes/print?docs[]=9","translations_url":"http://dev.dcloud.org/translations/{realm}/{language}","page":{"image":"http://dev.dcloud.org/asset_store/documents/9/pages/french-vocab-p{page}-{size}.gif","text":"http://dev.dcloud.org/documents/9/pages/french-vocab-p{page}.txt"}},"sections":[{"title":"Test Section #1","page":2}],"annotations":[{"location":{"image":"212,551,240,436"},"access":"public","content":"asdfasd","id":9,"title":"Nota sin T\u00edtulo","page":1},{"location":{"image":"344,612,483,401"},"access":"public","content":"<b>This is bold</b>.<i>This is italic</i>.  ","id":5,"title":"A Testing note","page":1},{"location":{"image":"93,666,159,354"},"access":"public","content":"","id":3,"title":"Vocab","page":6},{"access":"public","content":"","id":4,"title":"Page Note","page":15},{"location":{"image":"113,464,196,330"},"access":"public","content":"","id":2,"title":"Untitled Note","page":15}]};

    this.document = new DV.model.NewDocument( this.document_json );
  });

  it("should have properties", function() {
    should.exist( this.document.notes    );
    should.exist( this.document.sections );
  });

  it("has canonical host", function() {
    assert.equal( "dev.dcloud.org", this.document.canonical_host() );
  });

  it("contains pages", function(){
    should.exist( this.document.pages );
    assert.equal( 62, this.document.pages.pageTotal );
  });

  it("renders", function(done){
    var el = document.createElement('div'),
        viewer = DV.load( this.document_json, {
          container: el,
          afterLoad: _.bind(function(){
            assert.equal( this.document_json.id, viewer.model.id );
            assert.equal( 'ViewDocument', viewer.state.name );
            done()
          },this),
          width: 1100,   height: 500,
          sidebar: true, pdf: false
        });
  });


});

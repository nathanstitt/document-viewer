describe("Api", function(){
  var doc = window.fixtures.documents.french_vocab;

  apiTest("currentPage", function( api ){
    expect( api.currentPage() ).to.equal( 1 );
  });

  apiTest("setCurrentPage", function( api ){
    api.setCurrentPage( 2 );
    expect( api.currentPage() ).to.equal( 2 );
    expect( api.viewer.$('.DV-currentPage').text() ).to.equal( '2' );
  });

  apiTest("onPageChange", function( api ){
    var callback = sinon.spy();
    api.onPageChange( callback );
    api.viewer.$('.DV-trigger.DV-next').trigger('click');
    callback.should.have.been.called;
  });

  apiTest("getPageNumberForId", function(api){
    expect( api.getPageNumberForId('p0') ).to.equal( 1 );
    api.setCurrentPage( 2 );
    expect( api.getPageNumberForId('p0') ).to.equal( 1 );
    expect( api.getPageNumberForId('p1') ).to.equal( 2 );
    expect( api.getPageNumberForId('p2') ).to.equal( 3 );
  });

  apiTest("getSchema", function(api){
    expect( api.getSchema().id ).to.equal( window.fixtures.documents.french_vocab.id );
  });

  apiTest("getId", function(api){
    expect( api.getId() ).to.equal( window.fixtures.documents.french_vocab.id );
  });

  apiTest("getModelId", function(api){
    expect( api.getModelId() ).to.equal( parseInt( window.fixtures.documents.french_vocab.id ) );
  });

  apiTest("currentZoom", function(api){
    expect( api.currentZoom() ).to.equal( 1 );
  });

  apiTest("relativeZoom", function(api){
    // FIXME - can we somehow make this return a
    // differing value if the pages are sized different?
    expect( api.relativeZoom() ).to.equal( 1 );
  });

  apiTest("numberOfPages", function(api){
    expect( api.numberOfPages() ).to.equal( 62 );
  });

  apiTest("getContributor", function(api){
    api.getContributor().should.equal( 'Testing Account' );
  });

  apiTest("getContributorOrganization", function(api){
    api.getContributorOrganization().should.equal( 'Testing Organization' );
  });

  apiTest("getSections", function(api){
    expect( api.getSections() ).to.deep.equal( doc.sections );
  });

  apiTest("setSections", function(api){
    api.setSections( [{title:'New Section'}] );
    console.log( api.getSections() );
    expect( api.getSections() ).to.not.be.empty;
    expect( _.last(api.getSections()).title ).to.equal( 'New Section' );
  });

  apiTest("getDescription", function(api){
    expect( api.getDescription() ).to.equal( doc.description );
  });

  apiTest("setDescription", function(api){
    var desc = "Ce n'est pas une description";
    api.setDescription( desc );
    expect( api.getDescription() ).to.equal( desc );
    expect( api.viewer.$('.DV-descriptionText').text() ).to.equal( desc );
  });

  apiTest("getRelatedArticle", function(api){
    expect( api.getRelatedArticle() ).to.equal( doc.resources.related_article );
    expect( api.viewer.$('.DV-storyLink a').attr('href') ).to.equal( doc.resources.related_article );
  });

  apiTest("setRelatedArticle", function(api){
    api.setRelatedArticle( "an article name" );
    expect( api.getRelatedArticle() ).to.equal( "an article name" );
    expect( api.viewer.$('.DV-storyLink a').attr('href') ).to.equal("an article name");
  });

  apiTest("getPublishedUrl", function(api){
    expect( api.getPublishedUrl() ).to.equal( doc.resources.published_url );
  });

  apiTest("setPublishedUrl", function(api){
    api.setPublishedUrl("published_url");
    expect( api.getPublishedUrl() ).to.equal( "published_url" );
  });

  apiTest("getTitle", function(api){
    expect( api.getTitle() ).to.equal( doc.title );
  });

  apiTest("setTitle", function(api){
    var original = document.title;
    api.setTitle( "new title" );
    expect( api.getTitle() ).to.equal( 'new title' );
    expect( document.title ).to.equal( 'new title' );
    document.title = original;
  });

  apiTest("getSource", function(api){
    expect( api.getSource() ).to.equal( doc.source );
  });

  apiTest("setSource", function(api){
    api.setSource("foo");
    expect( api.getSource() ).to.equal( "foo" );
  });

  apiTest("getPageText", function(api){
    expect( api.getPageText(1) ).to.be.undefined;
  });

  apiTest("setPageText", function(api){
    api.setPageText('short phrase', 1);
    // FIXME
    // This is broken.  API expects text to be stored in an array,
    // but it's an object (hash) in schema
    expect( api.getPageText(1) ).to.equal( 'short phrase' );
  });

  apiTest("resetPageText", function(api, method){
    // FIXME
    // What should we look at to test here?
    expect( method ).to.not.throw(Error);
  });

  apiTest("redraw", function(api,method){
    expect( method ).to.not.throw(Error);
    // FIXME
    // add more tests here since this method is important
    // not quite sure exactly what we should look for though
    api.redraw(true);
  });

  apiTest("getAnnotationsBySortOrder", function(api){
    var ids = _.map( api.getAnnotationsBySortOrder(),function(note){ return note.id } );
    expect( ids ).to.deep.equal( [ 9,5,3,4,2] );
  });

  apiTest("getAnnotationsByPageIndex", function(api){
    expect( _.map( api.getAnnotationsByPageIndex(0),function(note){ return note.id } ) )
      .to.deep.equal( [ 9,5] );
    expect( _.map( api.getAnnotationsByPageIndex(14),function(note){ return note.id } ) )
      .to.deep.equal( [4,2] );
    expect( api.getAnnotationsByPageIndex(1) ).to.be.empty;
  });

  apiTest("getAnnotation", function(api){
    expect( api.getAnnotation(99) ).to.not.be.null;
    expect( api.getAnnotation(9) ).to.be.deep.equal(doc.annotations[0] );
  });

  apiTest("addAnnotation", function(api){
    var data = {id:42,title:'New Test Note',page:1,access:'public',location:{image:"113,464,196,330"} };
    var note = api.addAnnotation(data);
    expect( note ).to.not.be.null;
    expect( api.getAnnotation(42) ).to.equal( note ); // N.B. we're not deep equaling
    expect( api.getAnnotation(42) ).to.be.equal( note );
    expect( _.map( api.getAnnotationsByPageIndex(0),function(note){ return note.id } ) ).to.deep.equal( [ 42, 9, 5 ] );
  });

  apiTest("onAnnotationSave", function(api){
    var callback = sinon.spy();
    api.onAnnotationSave( callback );
    var note = api.getAnnotation(9);
    api.viewer.models.annotations.fireSaveCallbacks(note);
    callback.should.have.been.called;
  });

  apiTest("onAnnotationDelete", function(api){
    var callback = sinon.spy();
    api.onAnnotationDelete( callback );
    var note = api.getAnnotation(9);
    api.viewer.models.annotations.fireDeleteCallbacks(note);
    callback.should.have.been.called;
  });

  apiTest("setConfirmStateChange", function(api){
    var callback = sinon.spy();
    api.setConfirmStateChange( callback );
    api.viewer.open('ViewText')
    callback.should.have.been.called;
  });

  apiTest("onChangeState", function(api){
    var callback = sinon.spy();
    api.onChangeState( callback );
    api.viewer.open('ViewText')
    callback.should.have.been.called;
  });

  apiTest("getState", function(api){
    expect( api.getState() ).to.equal('ViewDocument')
  });

  apiTest("setState", function(api){
    api.setState('ViewText')
    expect( api.getState() ).to.equal('ViewText')
  });

  apiTest("resetRemovedPages", function(api){
    
  });

  apiTest("addPageToRemovedPages", function(api){
    
  });

  apiTest("removePageFromRemovedPages", function(api){
    
  });

  apiTest("resetReorderedPages", function(api){
    
  });

  apiTest("reorderPages", function(api){
    
  });

  apiTest("loadJS", function(api){
    
  });

  apiTest("roundTabCorners", function(api){
    
  });

  apiTest("registerHashListener", function(api){
    
  });

  apiTest("clearHashListeners", function(api){
    
  });

  apiTest("unload", function(api){
    
  });

  apiTest("enterRemovePagesMode", function(api){
    
  });

  apiTest("leaveRemovePagesMode", function(api){
    
  });

  apiTest("enterAddPagesMode", function(api){
    
  });

  apiTest("leaveAddPagesMode", function(api){
    
  });

  apiTest("enterReplacePagesMode", function(api){
    
  });

  apiTest("leaveReplacePagesMode", function(api){
    
  });

  apiTest("enterReorderPagesMode", function(api){
    
  });

  apiTest("leaveReorderPagesMode", function(api){
    
  });

  apiTest("enterEditPageTextMode", function(api){
    
  });

  apiTest("leaveEditPageTextMode", function(api){
    
  });

});

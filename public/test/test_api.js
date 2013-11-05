describe("Api", function(){
  var doc = window.fixtures.documents.french_vocab;

  apiTest("currentPage", function( cpfunc, api ){
    expect( cpfunc() ).to.equal( 1 );
  });

  apiTest("setCurrentPage", function( method, api ){
    method( 2 );
    expect( api.currentPage() ).to.equal( 2 );
    expect( api.viewer.$('.DV-currentPage').text() ).to.equal( '2' );
  });

  apiTest("onPageChange", function( method, api ){
    var callback = sinon.spy();
    method( callback );
    api.viewer.$('.DV-trigger.DV-next').trigger('click');
    callback.should.have.been.called;
  });

  apiTest("getPageNumberForId", function(method,api){
    expect( method('p0') ).to.equal( 1 );
    api.setCurrentPage( 2 );
    expect( method('p0') ).to.equal( 1 );
    expect( method('p1') ).to.equal( 2 );
    expect( method('p2') ).to.equal( 3 );
  });

  apiTest("getSchema", function(method,api){
    expect( method().id ).to.equal( window.fixtures.documents.french_vocab.id );
  });

  apiTest("getId", function(method,api){
    expect( method() ).to.equal( window.fixtures.documents.french_vocab.id );
  });

  apiTest("getModelId", function(method,api){
    expect( method() ).to.equal( parseInt( window.fixtures.documents.french_vocab.id ) );
  });

  apiTest("currentZoom", function(method,api){
    expect( method() ).to.equal( 1 )
  });

  apiTest("relativeZoom", function(method,api){
    expect( method() ).to.equal( 1 )
  });

  apiTest("numberOfPages", function(method,api){
    expect( method() ).to.equal( 62 )    
  });

  apiTest("getContributor", function(method,api){
    method().should.equal( 'Testing Account' )
  });

  apiTest("getContributorOrganization", function(method,api){
    method().should.equal( 'Testing Organization' )
  });

  apiTest("getSections", function(method,api){
    expect( method() ).to.deep.equal( doc.sections );
  });

  apiTest("setSections", function(method,api){
    method( [] );
    expect( api.getSections() ).to.deep.equal( [] );
  });

  apiTest("getDescription", function(method,api){
    expect( method() ).to.equal( doc.description );
  });

  apiTest("setDescription", function(method,api){
    var desc = "Ce n'est pas une description";
    method( desc );
    expect( api.getDescription() ).to.equal( desc );
    expect( api.viewer.$('.DV-descriptionText').text() ).to.equal( desc );
  });

  apiTest("getRelatedArticle", function(method,api){
    expect( method() ).to.equal( doc.resources.related_article );
    expect( api.viewer.$('.DV-storyLink a').attr('href') ).to.equal( doc.resources.related_article );
  });

  apiTest("setRelatedArticle", function(method,api){
    method( "none" );
    expect( api.getRelatedArticle() ).to.equal( "none" );
    expect( api.viewer.$('.DV-storyLink a').attr('href') ).to.equal('none');
  });

  apiTest("getPublishedUrl", function(method,api){
    expect( method() ).to.equal( doc.resources.published_url );
  });

  apiTest("setPublishedUrl", function(method,api){
    method("foo");
    expect( api.getPublishedUrl() ).to.equal( "foo" );
  });

  apiTest("getTitle", function(method,api){
    expect( method() ).to.equal( doc.title );
  });

  apiTest("setTitle", function(method,api){
    var original = document.title
    method( "null title" );
    expect( api.getTitle() ).to.equal( 'null title' );
    expect( document.title ).to.equal( 'null title' );
    document.title = original;
  });

  apiTest("getSource", function(method,api){
    expect( method() ).to.equal( doc.source );
  });

  apiTest("setSource", function(method,api){
    method("foo");
    expect( api.getSource() ).to.equal( "foo" );
  });

  apiTest("getPageText", function(method,api){
    expect( method(1) ).to.be.undefined;
  });

  apiTest("setPageText", function(method,api){
    method('short phrase', 1);
    // FIXME
    // This is broken.  API expects text to be stored in an array,
    // but it's an object in schema
    expect( method(1) ).to.equal( 'short phrase' );
  });

  apiTest("resetPageText", function(method,api){
    // FIXME
    // What should we look at to test here?
    expect( method ).to.not.throw(Error);
  });

  apiTest("redraw", function(method,api){
    
  });

  apiTest("getAnnotationsBySortOrder", function(method,api){
    
  });

  apiTest("getAnnotationsByPageIndex", function(method,api){
    
  });

  apiTest("getAnnotation", function(method,api){
    
  });

  apiTest("addAnnotation", function(method,api){
    
  });

  apiTest("onAnnotationSave", function(method,api){
    
  });

  apiTest("onAnnotationDelete", function(method,api){
    
  });

  apiTest("setConfirmStateChange", function(method,api){
    
  });

  apiTest("onChangeState", function(method,api){
    
  });

  apiTest("getState", function(method,api){
    
  });

  apiTest("setState", function(method,api){
    
  });

  apiTest("resetRemovedPages", function(method,api){
    
  });

  apiTest("addPageToRemovedPages", function(method,api){
    
  });

  apiTest("removePageFromRemovedPages", function(method,api){
    
  });

  apiTest("resetReorderedPages", function(method,api){
    
  });

  apiTest("reorderPages", function(method,api){
    
  });

  apiTest("loadJS", function(method,api){
    
  });

  apiTest("roundTabCorners", function(method,api){
    
  });

  apiTest("registerHashListener", function(method,api){
    
  });

  apiTest("clearHashListeners", function(method,api){
    
  });

  apiTest("unload", function(method,api){
    
  });

  apiTest("enterRemovePagesMode", function(method,api){
    
  });

  apiTest("leaveRemovePagesMode", function(method,api){
    
  });

  apiTest("enterAddPagesMode", function(method,api){
    
  });

  apiTest("leaveAddPagesMode", function(method,api){
    
  });

  apiTest("enterReplacePagesMode", function(method,api){
    
  });

  apiTest("leaveReplacePagesMode", function(method,api){
    
  });

  apiTest("enterReorderPagesMode", function(method,api){
    
  });

  apiTest("leaveReorderPagesMode", function(method,api){
    
  });

  apiTest("enterEditPageTextMode", function(method,api){
    
  });

  apiTest("leaveEditPageTextMode", function(method,api){
    
  });

});

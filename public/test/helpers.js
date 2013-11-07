var expect = chai.expect,
    assert = chai.assert,
    should = chai.should();


mocha.suite.on('pre-require', function(context, file, mocha){

  context.viewerTest = function(title, cb, config ){
    config =  _.defaults(config||{}, {
      width: 1100,   height: 500,
      sidebar: true, pdf: false
    });
    var json = window.fixtures.documents[ config.fixture_name || 'french_vocab' ];
    var   el = document.createElement('div');
    var   fn = function( done ){
      var viewer = DV.load( json, _.defaults({
        container: el,
        afterLoad: function(viewer){
          cb( viewer, {
            container: el
          } );
          done();
          el.remove();
        }
      },config ) );
    };
    fn.toString = function(){
      return cb.toString();
    };

    mocha.suite.addTest( new Mocha.Test(title,fn) );
  };

  context.apiTest = function(title, cb, config ){
    var fn = function( viewer, env ){
      cb( viewer.api, _.extend( env, { method: _.bind( viewer.api[title], viewer.api ) } ) );
    };
    fn.toString = function(){
      return cb.toString();
    };
    context.viewerTest( title, fn, config );
  };


});


mocha.setup('bdd')

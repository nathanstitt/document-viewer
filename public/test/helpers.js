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
          cb( viewer );
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
    var fn = function( viewer ){
      cb( _.bind( viewer.api[title], viewer.api ), viewer.api );
    };
    fn.toString = function(){
      return cb.toString();
    };
    context.viewerTest( title, fn, config );
  };

  // context.viewer = function( cb, doc, config ){
  //   doc = doc || 'french_vocab';
  //   config = _.defaults(config||{},{
  //     width: 1100,   height: 500,
  //     sidebar: true, pdf: false
  //   });
  //   var el = document.createElement('div');
  //   var fn = function( done ){
  //     var viewer = DV.load( fixtures.documents[doc], _.defaults({
  //       container: el,
  //       afterLoad: function(viewer){
  //         cb( viewer );
  //         done();
  //         el.remove();
  //       }
  //     },config ) );
  //   };
  //   fn.toString = function(){
  //     return cb.toString();
  //   };
  //   return fn;
  // };

});


mocha.setup('bdd')

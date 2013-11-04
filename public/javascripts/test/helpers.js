var expect = chai.expect,
    assert = chai.assert,
    should = chai.should();


mocha.suite.on('pre-require', function(context, file, mocha){

  context.viewer = function( cb, doc, config ){
    doc = doc || 'french_vocab';
    config = _.defaults(config||{},{
      width: 1100,   height: 500,
      sidebar: true, pdf: false
    });
    var el = document.createElement('div');
    var fn = function( done ){
      var viewer = DV.load( fixtures.documents[doc], _.defaults({
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
    return fn;
  };

});


mocha.setup('bdd')

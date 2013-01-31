dc.ui.AnnotationEditor = DV.Backbone.View.extend({

  id : 'annotation_editor',

  events : {
    'click .close': 'close'
  },

  initialize : function(options) {
    this._open    = false;
    this._buttons = {};
    this._inserts =  this.options.viewer.$('.DV-pageNoteInsert');
    this.viewer = this.options.viewer;
    this.document = this.options.document;

    _.bindAll(this, 'open', 'close', 'drawAnnotation', 'saveAnnotation', 'deleteAnnotation',
              'createPageNote', 'hideSaving', 'onShowAnnotation' );

    this.viewer.api.onAnnotationSave(this.saveAnnotation);

    this.viewer.api.onAnnotationShow(this.onShowAnnotation );
    this.viewer.api.onAnnotationDelete(this.deleteAnnotation);

    this.listenTo( this.document.notes, 'reset', this.resetAnnotations );

    this._inserts.click(this.createPageNote);
  },

  open : function(kind) {
    this._open          = true;
    var elmts = this.viewer.elements;
    this._buttons[kind] = elmts.controlPanel.find( '.' + kind + '_annotation' );
    this.pages          = elmts.viewer.find('.DV-pages');
    this.page           = elmts.viewer.find('.DV-page');
    this._guide         = elmts.viewer.find('#' + kind + '_note_guide');

    this.page.css({cursor : 'crosshair'});
    if (kind != 'redact') this._inserts.filter('.visible').show().addClass('DV-' + kind);
    this.page.bind('mousedown', this.drawAnnotation);
    elmts.viewer.bind('keydown', this.close);
    elmts.viewer.setMode(kind, 'editing');
    this._buttons[kind].addClass('open');
    this._guide.fadeIn('fast');
  },

  close : function() {
    this._open = false;
    this.page.css({cursor : ''});
    this.page.unbind('mousedown', this.drawAnnotation);
    this.viewer.elements.viewer.unbind('keydown', this.close);
    this.clearAnnotation();
    this.clearRedactions();
    this._inserts.hide().removeClass('DV-public DV-private');
    this.viewer.elements.viewer.setMode(null, 'editing');
    this._buttons[this._kind].removeClass('open');
    this._guide.hide();
  },

  toggle : function(kind) {
    if (this._open) {
      this.close();
      if (kind === this._kind) return;
    }
    this.open(this._kind = kind);
  },

  resetAnnotations: function( annotations ){
    // add/update viwer's annotations
    annotations.each( function(anno){
      var anno_data =  anno.toJSON() ;
      if ( ! this.viewer.schema.data.annotationsById[ anno.id ]){
        this.viewer.schema.loadAnnotation( anno_data);
      } else {
        _.extend( this.viewer.schema.data.annotationsById[ anno.id ], anno_data );
      }
    },this);
    // remove any viewer annotations that we shouldn't have
    _.each(this.viewer.schema.data.annotationsById, function( anno, id ){
      if ( ! annotations.get( id ) ){
        this.viewer.models.annotations.removeAnnotation( anno, true );
      }
    },this );
    this.viewer.models.annotations.sortAnnotations();
    this.viewer.api.redraw(true);
  },

  clearAnnotation : function() {
    if (this.region) DV.jQuery(this.region).remove();
  },

  clearRedactions : function() {
    this.viewer.elements.viewer.find('.DV-annotationRegion.DV-accessRedact').remove();
  },

  // When a page note insert line is clicked, create a page annotation above
  // the corresponding page.
  createPageNote : function(e) {
    this.close();
    var set = DV.jQuery(e.target).closest('.DV-set');
    var pageNumber = this.viewer.api.getPageNumberForId(set.attr('data-id'));
    this.viewer.api.addAnnotation({
      page            : pageNumber,
      unsaved         : true,
      access          : this._kind || 'public',
      owns_note       : true
    });
  },

  make: function(tagName, attributes, content) {
    var $el = DV.Backbone.$('<' + tagName + '>');
    if (attributes) $el.attr(attributes);
    if (content != null) $el.html(content);
    return $el[0];
  },

  // TODO: Clean up!
  drawAnnotation : function(e) {
    e.stopPropagation();
    e.preventDefault();
    this._activePage = DV.jQuery(e.currentTarget);

    this._activePageNumber = this.viewer.api.getPageNumberForId( this._activePage.closest('.DV-set').attr('data-id') );
    this.clearAnnotation();
    var offTop        = this._activePage.offset().top,
        offLeft       = this._activePage.offset().left,
        ox            = e.pageX - offLeft,
        oy            = e.pageY - offTop,
        borderBottom  = this._activePage.height() - 6,
        borderRight   = this._activePage.width() - 6;
    
    this.region = this.make('div', {'class' : 'DV-annotationRegion active ' + this._accessClass(this._kind), style:'position:absolute;'});
    (this._kind == 'redact' ? this._specificPage() : this._activePage).append(this.region);
    var contained = function(e) {
      return e.pageX > 0 && e.pageX < borderRight &&
             e.pageY > 0 && e.pageY < borderBottom;
    };
    var coords = function(e) {
      var x = e.pageX - offLeft - 3,
          y = e.pageY - offTop - 3;
      x = x < 0 ? 0 : (x > borderRight ? borderRight : x);
      y = y < 0 ? 0 : (y > borderBottom ? borderBottom : y);
      return {
        left    : Math.min(ox, x),
        top     : Math.min(oy, y),
        width   : Math.abs(x - ox),
        height  : Math.abs(y - oy)
      };
    };
    var region = DV.jQuery( this.region );
    region.css(coords(e));
    var drag = _.bind(function(e) {
      region.css(coords(e));
      return false;
    });
    var dragEnd = _.bind(function(e) {
      this.viewer.elements.viewer.unbind('keydown', this.close);

      this.pages.unbind('mouseup', dragEnd).unbind('mousemove', drag);
      var loc     = coords(e);
      loc.left    -= 1;
      loc.top     -= 1;
      loc.right   = loc.left + loc.width;
      loc.bottom  = loc.top + loc.height;
      if (this._kind != 'redact') {
        loc.top     += 2;
        loc.left    += 5;
        loc.right   += 15;
        loc.bottom  += 5;
      }
      var zoom    = this.viewer.api.relativeZoom();
      var image   = _.map([loc.top, loc.right, loc.bottom, loc.left], function(l){ return Math.round(l / zoom); }).join(',');
      if (this._kind == 'redact') {
        if (loc.width > 5 && loc.height > 5) {
          this.redactions.push({
            location: image,
            page: this._activePageNumber
          });
        } else {
          region.remove();
        }
        this.region = null;
      } else {
        this.close();
        if (loc.width > 5 && loc.height > 5) {
          this.viewer.api.addAnnotation({
            location        : {image : image},
            page            : this._activePageNumber,
            unsaved         : true,
            access          : this._kind,
            owns_note       : true
          });
        }
      }
      return false;
    }, this);
    this.pages.bind('mouseup', dragEnd).bind('mousemove', drag);
  },

  onShowAnnotation : function(anno){
    anno.allowEdit( dc.account.canEditAnnotation( anno ) );
  },

  saveAnnotation : function(anno) {
    this[anno.unsaved ? 'createAnnotation' : 'updateAnnotation'](anno);
  },

  // Convert an annotation object into serializable params understood by us.
  annotationToParams : function(anno, extra) {
    var params = {
      page_number : anno.page,
      content     : anno.text,
      title       : anno.title,
      access      : anno.access
    };
    if (anno.location) params.location = anno.location.image;
    return _.extend(params, extra || {});
  },

  hideSaving: function(){
    this.viewer.helpers.setActiveAnnotationIsSaving( false );
  },

  setSaving: function(){
    this.viewer.helpers.setActiveAnnotationIsSaving( true );
  },


  _performAjax: function( anno, url, request_options ){
    this.setSaving();
    DV.jQuery.ajax(url, _.extend({ 
      type     : 'POST', 
      dataType : 'json',
      complete : this.hideSaving,
      success  : function( resp ){
        delete anno.unsaved;
        anno.server_id = resp.id;
        anno.content = anno.html_content = resp.content;
        anno.editable = true;
      }
    }, request_options ) );

  },

  createAnnotation : function(anno) {
    this._performAjax( anno, this.document.annotationsEndpoint() + '.json',{
      data: this.annotationToParams(anno)
    });
  },

  updateAnnotation : function(anno) {
    this._performAjax( anno, this.document.annotationsEndpoint() + '/' + anno.server_id + '.json', {
      data: this.annotationToParams(anno,{_method: 'put'})
    } );
  },

  deleteAnnotation : function(anno) {
    if (!anno.server_id) return;
    this._performAjax( anno, this.document.annotationsEndpoint() + '/' + anno.server_id, {
      data     : {_method : 'delete'},
      success  : function(){}, // Don't do anything after request, the anno
      complete : function(){}  // has already been removed from the DOM
    } );
  },

  // Lazily create the page-specific div for persistent elements.
  _specificPage : function() {
    var already = $('.DV-pageSpecific-' + this._activePageNumber);
    if (already.length) return already;
    var el = this.make('div', {'class' : 'DV-pageSpecific DV-pageSpecific-' + this._activePageNumber});
    this._activePage.append(el);
    return $(el);
  },


  _accessClass : function(kind) {
    // capitalize kind.  Replace with dc.inflector.capitalize if we pull it in.
    return 'DV-access' + kind.charAt(0).toUpperCase() + kind.substring(1).toLowerCase();
  }

});

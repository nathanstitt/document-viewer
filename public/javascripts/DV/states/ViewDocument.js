DV.Schema.states.ViewDocument = {
  ViewDocument: function(){
    this.helpers.addObserver('drawPages');
    this.dragReporter.setBinding();
    this.elements.window.mouseleave($j.proxy(this.dragReporter.stop, this.dragReporter));
    this.acceptInput.allow();

    this.helpers.toggleContent('viewDocument');

    this.helpers.setActiveChapter(this.models.chapters.getChapterId(this.models.document.currentIndex()));

    this.helpers.jump(this.models.document.currentIndex());
    return true;
  },
  exit: function(destinationState){
    if(this.activeAnnotation){
      this.pageSet.cleanUp();
    }
    this.helpers.removeObserver('drawPages');
    if (this.elements.chaptersContainer.length) this.elements.chaptersContainer[0].id = '';
    this.dragReporter.unBind();
    return true;
  }
};
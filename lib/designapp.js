var DesignApp = {
  
  initialize: function() {} 
  
};



DesignApp.Toolbar = {
  
  selectedTool: null,
  tools: [],
  
  addTool: function(tool) {
    if (this.tools.indexOf(tool) == -1)
      this.tools.push(tool);
  },
  
  selectTool: function(index) {
    this.selectedTool = (index >= 0 && index < this.tools.length) ? index : null;
  }
  
};



DesignApp.Tool = Class({
  
  element: null,
  name: '',
  
  init: function() {
    this.createElement();
  },
  
  createElement: function() {
    this.element = $('<li>').addClass(this.name);
  }
  
});



DesignApp.Tool.Selector = DesignApp.Tool.extend({
  
  name: 'selector'
  
});



DesignApp.Palette = Class({
  
  name: '',
  
  init: function(){
    this.container = $('<div class="palette" />');
    this.createMarkup();
  },
  
  // Template methods to be overridden by subclasses.
  createMarkup: function() {}
  
});



DesignApp.Palette.Gradient = DesignApp.Palette.extend({
  
  name: 'Gradient',
  type: 'linear',
  start: {
    color: '#000', 
    pos: {
      h: 0,
      v: 0
    }
  },
  stops: [], 
  end: {
    color: '#fff', 
    pos: {
      h: 0,
      v: 100
    }
  },
  
  addStop: function(){
    this.stops.push({});
  }
});
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

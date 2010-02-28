var DesignApp = {
  
  initialize: function() {} 
  
};

DesignApp.Toolbar = {
  
  selectedTool: null,
  tools: []
    
};

DesignApp.Tool = Class({
  
  element: null,
  elementTemplate: '<li><img src=":icon"></li>',
  icon: '',
  
  init: function() {
    DesignApp.Toolbar.tools.push(this);
    this.createElement();
  },
  
  createElement: function() {
    this.element = $( this.elementTemplate.replace(':icon', this.icon) );
  }
  
});

DesignApp.Tool.Selector = DesignApp.Tool.extend({
  
  icon: 'selector.png',
  
  init: function() {
    this.__super__();
  }
  
});

DesignApp.Palette = Class({
  name: "", 
});

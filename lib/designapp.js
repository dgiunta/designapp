var DesignApp = {
  
  selectedTool: null,
  tools: [],
  
  initialize: function() {} 
  
};

DesignApp.Tool = Class({
  
  element: null,
  elementTemplate: '<li><img src=":icon"></li>',
  icon: '',
  
  init: function() {
    DesignApp.tools.push(this);
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

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
  init: function(){
    this.container = $('<div class="palette" />');
    this.createMarkup();
  },
  
  // Template methods to be overridden by subclasses.
  createMarkup: function() {}
});


DesignApp.Palette.Gradient = DesignApp.Palette.extend({
  name: "Gradient",
  type: "linear",
  start: {
    color: "#000", 
    pos: {
      h: 0,
      v: 0
    }
  },
  end: {
    color: "#fff", 
    pos: {
      h: 0,
      v: 100
    }
  }
});
var DesignApp = {
  
  tools: [],
  
  initialize: function() {} 
  
};

DesignApp.Tool = Class({
  
  init: function() {
    console.log('DesignApp.Tool');
    DesignApp.tools.push(this);
  }
  
});

DesignApp.Tool.Selector = DesignApp.Tool.extend({
  
  init: function() {
    this.__super__();
    console.log('DesignApp.Tool.Selector');    
  }
  
});

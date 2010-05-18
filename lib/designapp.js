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
  
  name: 'selector',
  
  predictionHelper: new DomPredictionHelper()
  
});



DesignApp.Style = {
  
  rules: [],
  
  addRule: function(rule) {
    if (this.rules.indexOf(rule) == -1)
      this.rules.push(rule);
  }
  
};



DesignApp.StyleRule = Class({
  
  properties: {},
  
  selector: '',
  
  init: function(selector, properties) {
    if (typeof selector != 'undefined')
      this.selector = selector;
    
    if (typeof selector != 'undefined')
      this.properties = properties;
  }
  
});



DesignApp.Palette = Class({
  
  name: '',
  
  DEFAULTS: {},
  
  init: function(){
    this.reset();
    this.container = $('<div class="palette" />');
    this.createMarkup();
  },
  
  reset: function() {
    // Arrays don't get merged using this method. WHY DOESN'T THIS WORK!? 
    // $.extend(true, this, this.DEFAULTS);
    var self = this;
    $.each(this.DEFAULTS, function(key, val) {
      self[key] = (typeof val == 'object')
        ? (Object.prototype.toString.call(val) == '[object Array]') 
          ? val.slice(0) 
          : $.extend(true, {}, val)
        : val;
    });
  },
  
  // Template methods to be overridden by subclasses.
  createMarkup: function() {}
  
});



DesignApp.Palette.Layout = DesignApp.Palette.extend({
  
  name: 'Layout',
  
  DEFAULTS: {
    height: 'auto',
    width: 'auto'
  }
  
});



DesignApp.Palette.Gradient = DesignApp.Palette.extend({
  
  name: 'Gradient',
  
  DEFAULTS: {
    type: 'linear',
    start: {
      color: '#000', 
      pos: { h: 0, v: 0 }
    },
    stops: [], 
    end: {
      color: '#fff', 
      pos: { h: 0, v: 100 }
    }
  },
  
  addStop: function(stop) {
    this.stops.push(stop);
    this.stops.sort( function(stop1, stop2) {
      return (stop1.position == stop2.position) 
        ? 0 
        : (stop1.position > stop2.position) ? 1 : -1;
    });
  },
  
  createAndAddStop: function(position, color) {
    this.addStop( this.createStop(position, color) );
  },
  
  createStop: function(position, color) {
    return {
      position: position, 
      color: color
    };
  }
  
});
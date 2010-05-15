describe 'DesignApp'

  it 'should exist'
    DesignApp.should_not.be_null
  end
  
  it 'should be able to initialize'
    DesignApp.initialize.should.be_a Function
  end
  
  describe 'initializing'
  end



  describe '.Toolbar'
  
    before_each
      DesignApp.Toolbar.tools = []
    end
  
    it 'should exist'
      DesignApp.Toolbar.should_not.be_null
    end
  
    it 'should have a list of tools'
      DesignApp.Toolbar.tools.should.be_an Array
    end
  
    it 'should add a tool to the list of tools'
      tool = new DesignApp.Tool()
      DesignApp.Toolbar.addTool(tool)
      DesignApp.Toolbar.tools.should.eql [ tool ]
    end
  
    it 'should not add the tool if it’s already in the tool list'
      tool = new DesignApp.Tool()
      DesignApp.Toolbar.addTool(tool)
      DesignApp.Toolbar.addTool(tool)
      DesignApp.Toolbar.tools.should.eql [ tool ]    
    end
  
    it 'should keep track of the selected tool'
      DesignApp.Toolbar.selectedTool.should_not.be_undefined
      DesignApp.Toolbar.selectedTool.should.be_null
    end
  
    describe 'selecting a tool'
  
      before_each
        DesignApp.Toolbar.addTool( new DesignApp.Tool() )
        DesignApp.Toolbar.addTool( new DesignApp.Tool() )
        DesignApp.Toolbar.addTool( new DesignApp.Tool() )
      end
        
      it 'should select a tool based on index'
        DesignApp.Toolbar.selectTool(0)
        DesignApp.Toolbar.selectedTool.should.be 0
      end
    
      it 'should not select a tool that doesn’t exist'
        DesignApp.Toolbar.selectTool(3)
        DesignApp.Toolbar.selectedTool.should.be_null
        DesignApp.Toolbar.selectTool(-1)
        DesignApp.Toolbar.selectedTool.should.be_null
      end
    
      it 'should deselect all tools'
        DesignApp.Toolbar.selectTool()
        DesignApp.Toolbar.selectedTool.should.be_null
      end

    end
  
  end
  
  
  
  describe '.Tool'

    it 'should exist'
      DesignApp.Tool.should_not.be_null
    end
  
    describe 'initialized'
  
      before_each
        tool = new DesignApp.Tool
      end
    
      it 'should have a name'
        tool.name.should.be_a String
      end
  
      it 'should be able to create an HTML element'
        tool.createElement()
        tool.element.should.be_an_instance_of jQuery
        tool.element.should.have_class tool.name
      end
    
      it 'should call createElement when initializing'
        tool.should.receive('createElement')
        tool.init()
      end
    
    end
  
  
  
    describe '.Selector'
  
      before_each
        selector = new DesignApp.Tool.Selector()        
      end
    
      it 'should extend DesignApp.Tool'
        selector.should.be_an_instance_of DesignApp.Tool.Selector
        selector.should.be_an_instance_of DesignApp.Tool
      end
    
      it 'should have a specific name'
        selector.name.should.be 'selector'
      end
      
      it 'should have a reference to the DomPredictionHelper'
        selector.predictionHelper.should.be_an_instance_of(DomPredictionHelper)
      end
    
    end
  
  end
  
  
  
  describe '.Palette'
    
    it 'should exist'
      DesignApp.Palette.should_not.be_null
    end
    
    describe 'when initialized'

      before_each
        palette = new DesignApp.Palette
      end

      it 'should have a name'
        palette.name.should.be ''
      end
      
      it 'should have DEFAULTS'
        palette.DEFAULTS.should.eql {}
      end
      
      it 'should reset the object’s properties to the DEFAULTS when calling reset, yet not overwriting properties it shouldn’t'
        the_defaults = { 
          string: 'string', 
          number: 10, 
          bool:   true,
          array:  [],
          obj:    { nested: { stuff: 'is fun' } }
        }
        
        palette.name     = 'Name'
        palette.DEFAULTS = jQuery.extend({}, the_defaults)
        palette.string   = 'blah blah'
        palette.number   = 20
        palette.bool     = false 
        palette.array    = [ 1, 2, 3 ]
        palette.obj      = {}
        
        palette.reset()
        
        palette.name.should.be 'Name'
        palette.DEFAULTS.should.eql the_defaults
        palette.string.should.be 'string'
        palette.number.should.be 10
        palette.bool.should.be true
        palette.array.should.eql []
        palette.obj.should.eql { nested: { stuff: 'is fun' } }
      end

      it 'should have a container element'
        palette.container.should.be_an_instance_of jQuery
        palette.container.should.have_class('palette')
      end
      
      it 'should call the createMarkup method'
        palette.should.receive('createMarkup')
        palette.init()
      end
      
      it 'should call the reset method'
        palette.should.receive('reset')
        palette.init()
      end
      
    end
    
    
    
    describe '.Gradient'
      
      before_each
        gradient = new DesignApp.Palette.Gradient
      end
      
      it 'should extend Palette'
        ( new DesignApp.Palette.Gradient ).should.be_an_instance_of DesignApp.Palette
      end
      
      it 'should have a name of "Gradient"'
        gradient.name.should.be 'Gradient'
      end
      
      describe 'DEFAULTS'

        it 'should have a type of "linear"'
          gradient.DEFAULTS.type.should.be "linear"
        end
      
        it 'should have a start point'
          gradient.DEFAULTS.start.should_not.be_null
          gradient.DEFAULTS.start.color.should.be '#000'
          gradient.DEFAULTS.start.pos.h.should.be 0
          gradient.DEFAULTS.start.pos.v.should.be 0
        end
        
        it 'should have an end point'
          gradient.DEFAULTS.end.should_not.be_null
          gradient.DEFAULTS.end.color.should.be '#fff'
          gradient.DEFAULTS.end.pos.h.should.be 0
          gradient.DEFAULTS.end.pos.v.should.be 100
        end
        
        it 'should have an empty list of color stops'
          gradient.DEFAULTS.stops.should.eql []
        end
        
      end
      
      describe 'resetting'
        
        it 'should set the start horizontal position to 0'
          gradient.start.pos.h = 30
          gradient.reset()
          gradient.start.pos.h.should.eql 0
        end

        it 'should set the end horizontal position to 100'
          gradient.end.pos.h = 80
          gradient.reset()
          gradient.end.pos.h.should.eql 0
        end
        
        it 'should remove any stops'
          gradient.createAndAddStop(10, "#111")
          gradient.createAndAddStop(20, "#222")
          gradient.createAndAddStop(30, "#333")
          console.log(gradient.stops)
          console.log(gradient.DEFAULTS.stops)
          gradient.reset()
          console.log(gradient.stops)
          gradient.stops.should.be_empty
        end
        
      end
      
      describe 'color stops'

        before_each
          gradient.stops = []
        end
        
        describe 'creating a new stop'

          it 'should have a position'
            stop = gradient.createStop(20)
            stop.position.should.eql 20
          end
        
          it 'should have a color'
            stop = gradient.createStop(20, "#ccc")
            stop.color.should.eql "#ccc"
          end
                  
        end
        
        describe 'adding a stop the stops list'
        
          it 'should add a stop the list of stops'
            stop = gradient.createStop(20, "#ccc")
            gradient.addStop(stop)
            gradient.stops[0].should.eql stop
            gradient.stops.length.should.eql 1
          end
          
          it 'should put the stop in the correct location'
            stop1 = gradient.createStop(10, "#bbb")
            stop2 = gradient.createStop(20, "#aaa")
            stop3 = gradient.createStop(30, "#ccc")
            gradient.addStop(stop3)
            gradient.addStop(stop1)
            gradient.addStop(stop2)
            gradient.stops[0].should.eql stop1
            gradient.stops[1].should.eql stop2
            gradient.stops[2].should.eql stop3
          end
                    
        end
        
      end
      
      describe 'markup'
      end
      
    end
    
    
    
    describe '.Layout'
      
      it 'should extend Palette'
        ( new DesignApp.Palette.Layout ).should.be_an_instance_of DesignApp.Palette
      end
      
      describe 'when initialized'
        
        before_each
          layout = new DesignApp.Palette.Layout
        end
        
        it 'should have a name of "Layout"'
          layout.name.should.be 'Layout'
        end
        
        describe 'DEFAULTS'
        
          it 'should have a default width'
            layout.DEFAULTS.width.should.be 'auto'
          end
          
          it 'should have a default height'
            layout.DEFAULTS.height.should.be 'auto'
          end
          
        end
      
      end
      
    end
    
  end


  
  describe '.Style'
    
    before_each
      DesignApp.Style.rules = []
    end
  
    it 'should exist'
      DesignApp.Style.should_not.be_null
    end
    
    it 'should have a list of "rules"'
      DesignApp.Style.rules.should.be_an Array
    end
    
    it 'should add a rule to the list of rules'
      rule = new DesignApp.StyleRule()
      DesignApp.Style.addRule(rule)
      DesignApp.Style.rules.should.eql [ rule ]
    end
  
    it 'should not add the rule if it’s already in the rule list'
      rule = new DesignApp.StyleRule()
      DesignApp.Style.addRule(rule)
      DesignApp.Style.addRule(rule)
      DesignApp.Style.rules.should.eql [ rule ]    
    end
    
  end
  
  
      
  describe '.StyleRule'
    
    it 'should exist'
      DesignApp.StyleRule.should_not.be_null
    end
    
    describe 'when first creating'
    
      before_each
        rule = new DesignApp.StyleRule()
      end
      
      it 'should have a blank string for a "selector"'
        rule.selector.should.be ''
      end
      
      it 'should have an empty "properties" object'
        rule.properties.should.eql {}
      end
    
    end
    
    describe 'creating with arguments'
      
      it 'should accept a selector string as the first argument'
        rule = new DesignApp.StyleRule('.awesome .cool sweet')
        rule.selector.should.be '.awesome .cool sweet'
      end
      
      it 'should accept an object of properties as the second argument'
        rule = new DesignApp.StyleRule('.the_selector', { 'this': 'is', 'way': 'cool' })
        rule.properties.should.eql { 'this': 'is', 'way': 'cool' }
      end
      
    end
    
  end

end

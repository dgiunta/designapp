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
        tool = new DesignApp.Tool()
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
    
    describe 'when first created'

      before_each
        palette = new DesignApp.Palette()
      end

      it 'should have a name'
        palette.name.should.be ''
      end
      
      it 'should have a container element'
        palette.container.should.be_an_instance_of jQuery
        palette.container.should.have_class('palette')
      end
      
      it 'should run the createMarkup method'
        palette.should.receive('createMarkup')
        palette.init();
      end
      
      it 'should have a reset function'
        palette.should.respond_to "reset"
      end

    end
        
    
    describe '.Gradient'
      
      before_each
        gradient = new DesignApp.Palette.Gradient();
      end
      
      it 'should exist'
        DesignApp.Palette.Gradient.should_not.be_null
      end
      
      it 'should have a name of "Gradient"'
        gradient.name.should.be 'Gradient'
      end
      
      describe 'defaults'

        it 'should have a type of "linear"'
          gradient.type.should.be "linear"
        end
      
        it 'should have a start point'
          gradient.start.should_not.be_null
          gradient.start.color.should.be '#000'
          gradient.start.pos.h.should.be 0
          gradient.start.pos.v.should.be 0
        end
        
        it 'should have an end point'
          gradient.end.should_not.be_null
          gradient.end.color.should.be '#fff'
          gradient.end.pos.h.should.be 0
          gradient.end.pos.v.should.be 100
        end
        
        it 'should have an empty list of color stops'
          gradient.stops.should.eql []
        end
        
      end
      
      describe 'resetting'
        
        it 'should remove any stops'
          gradient.createAndAddStop(20, "#ccc")
          gradient.createAndAddStop(20, "#ccc")
          gradient.createAndAddStop(20, "#ccc")
          gradient.reset()
          gradient.stops.should.be_empty
        end
        
        it 'should set the start horizontal position to 0'
          gradient.start.pos.h = 30
          gradient.reset()
          gradient.start.pos.h.should.eql 0
        end

        it 'should set the end horizontal position to 100'
          gradient.end.pos.h = 80
          gradient.reset()
          gradient.end.pos.h.should.eql 100
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
    
  end

end

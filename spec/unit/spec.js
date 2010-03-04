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

      it 'should be able to add a color stop to the list of stops'
        gradient.addStop()
        gradient.stops.length.should.be 1
      end
      
      describe 'color stops'
        before_each
          gradient.addStop()
        end
        
        it 'should have a position'
          // gradient.stops
        end
      end
      
      describe 'markup'
      end
      
    end
    
  end

end

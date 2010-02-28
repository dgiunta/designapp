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
    
    it 'should exist'
      DesignApp.Toolbar.should_not.be_null
    end
    
    it 'should have a list of tools'
      DesignApp.Toolbar.tools.should.be_an Array
    end
    
    it 'should have a selected tool'
      DesignApp.Toolbar.selectedTool.should_not.be_undefined
    end
  
  end
  
  describe '.Tool'
  
    // before_each
    //   DesignApp.Toolbar.tools = []
    // end
    
    it 'should exist'
      DesignApp.Tool.should_not.be_null
    end
    
    describe 'initialized'
    
      before_each
        tool = new DesignApp.Tool()
      end
      
      it 'should add itself to the list of DesignApp tools when initialized'
        DesignApp.Toolbar.tools.should.include tool
      end
    
      it 'should have an HTML element template'
        tool.elementTemplate.should.be '<li><img src=":icon"></li>'
      end
      
      it 'should have an icon'
        tool.icon.should.be_a String
      end
      
      it 'should be able to create an HTML element'
        tool.createElement()
        tool.element.should.be_an_instance_of jQuery
      end
      
      it 'should replace the :icon token in the element template with the icon'
        tool.icon = 'icon.png'
        tool.createElement()
        elements('img', tool.element).attr('src').should.eql 'icon.png'
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
      
      it 'should have a specific icon'
        selector.icon.should.be 'selector.png'
      end
      
    end
    
  end
  
  describe '.Palette'
    
    it 'should exist'
      DesignApp.Palette.should_not.be_null
    end
    
    describe 'when first created'
      it 'should have a name'
        new DesignApp.Palette().name.should.be ''
      end
    end
    
  end

end
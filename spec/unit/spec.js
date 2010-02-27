describe 'DesignApp'

  it 'should exist'
    DesignApp.should_not.be_null
  end
  
  it 'should have a list of tools'
    DesignApp.tools.should.be_an Array
  end
  
  it 'should have a selected tool'
    DesignApp.selectedTool.should_not.be_undefined
  end
  
  it 'should be able to initialize'
    DesignApp.initialize.should.be_a Function
  end
  
  describe 'initializing'
  end
  
  describe 'DesignApp.Tool'
  
    before_each
      DesignApp.tools = []
    end
    
    it 'should exist'
      DesignApp.Tool.should_not.be_null
    end
    
    it 'should add itself to the list of DesignApp tools when initialized'
      tool = new DesignApp.Tool()
      DesignApp.tools.should.include tool
    end
    
    describe 'initialized'
    
      before_each
        tool = new DesignApp.Tool()
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
    
    describe 'DesignApp.Tool.Selector'
    
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

end
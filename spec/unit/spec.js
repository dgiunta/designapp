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
        
      end
      
      
      describe 'markup'
        
      end
      
    end
    
  end

end
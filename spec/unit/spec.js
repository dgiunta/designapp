describe 'DesignApp'

  it 'should exist'
    DesignApp.should_not.be_null
  end
  
  it 'should have a list of tools'
    DesignApp.tools.should.be_an Array
  end
  
  it 'should be able to initialize'
    DesignApp.initialize.should.be_a Function
  end
  
  describe 'initializing'
    
    
  end
  
  describe 'DesignApp.Tool'
    
    it 'should exist'
      DesignApp.Tool.should_not.be_null
    end
    
    describe 'DesignApp.Tool.Selector'
      
      it 'should extend DesignApp.Tool'
        selector = new DesignApp.Tool.Selector()
        selector.should.be_an_instance_of DesignApp.Tool.Selector
        selector.should.be_an_instance_of DesignApp.Tool
      end
      
    end
    
  end

end
// jest.setup.js

// Add a mock container to the DOM before each test
beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';
  });
  
  // Clear the DOM after each test
  afterEach(() => {
    document.body.innerHTML = '';
  });
  
  // Mock console.error and console.warn globally
  global.console.error = jest.fn();
  global.console.warn = jest.fn();
  
const { fetchUserData } = require('../static/app');
jest.mock('three'); // Mock Three.js

describe('fetchUserData', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return user data when fetch is successful', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValue({
        results: [
          { name: { first: 'John', last: 'Doe' } },
          // ... other user objects
        ],
      }),
    };

    fetch.mockResolvedValue(mockResponse);

    const data = await fetchUserData();

    expect(data).toEqual([
      { name: { first: 'John', last: 'Doe' } },
      // ... other user objects
    ]);
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/random-users/?results=5');
  });

  it('should return an empty array when fetch fails', async () => {
    fetch.mockRejectedValue(new Error('Failed to fetch'));

    const data = await fetchUserData();

    expect(data).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Failed to fetch user data:', expect.any(Error));
  });
});

const { createVRButton } = require('../path/to/your/module');

describe('createVRButton', () => {
  let renderer;

  beforeEach(() => {
    renderer = new THREE.WebGLRenderer();
  });

  it('should create and style the VR button correctly', async () => {
    navigator.xr = {
      isSessionSupported: jest.fn().mockResolvedValue(true),
      requestSession: jest.fn().mockResolvedValue({
        addEventListener: jest.fn(),
        end: jest.fn(),
      }),
    };

    createVRButton(renderer);

    expect(navigator.xr.isSessionSupported).toHaveBeenCalledWith('immersive-vr');
    await navigator.xr.isSessionSupported();

    const button = document.querySelector('button');
    expect(button).not.toBeNull();
    expect(button.textContent).toBe('ENTER VR');
    expect(button.style.position).toBe('absolute');
    // Add other style checks as needed

    button.click();
    expect(navigator.xr.requestSession).toHaveBeenCalledWith('immersive-vr');
  });

  it('should display warning if WebXR is not supported', async () => {
    navigator.xr = {
      isSessionSupported: jest.fn().mockResolvedValue(false),
    };
    console.warn = jest.fn();

    createVRButton(renderer);

    await navigator.xr.isSessionSupported();
    expect(console.warn).toHaveBeenCalledWith('WebXR not supported');
  });
});

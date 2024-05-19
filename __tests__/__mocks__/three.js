const THREE = {
    Scene: jest.fn().mockImplementation(() => {
        return {
            add: jest.fn(),
            remove: jest.fn(),
            children: []
        };
    }),
    PerspectiveCamera: jest.fn().mockImplementation(() => {
        return {
            position: {
                set: jest.fn()
            }
        };
    }),
    WebGLRenderer: jest.fn().mockImplementation(() => {
        return {
            setSize: jest.fn(),
            domElement: {
                addEventListener: jest.fn(),
                style: {}
            },
            render: jest.fn()
        };
    }),
    AmbientLight: jest.fn(),
    DirectionalLight: jest.fn(),
    OrbitControls: jest.fn().mockImplementation(() => {
        return {
            enableZoom: true,
            update: jest.fn()
        };
    }),
    Raycaster: jest.fn().mockImplementation(() => {
        return {
            setFromCamera: jest.fn(),
            intersectObjects: jest.fn().mockReturnValue([])
        };
    }),
    Vector2: jest.fn().mockImplementation(() => {
        return {
            x: 0,
            y: 0
        };
    }),
    Mesh: jest.fn().mockImplementation(() => {
        return {
            material: {
                color: {
                    set: jest.fn()
                }
            },
            position: {
                set: jest.fn()
            },
            rotation: {
                x: 0
            },
            add: jest.fn()
        };
    }),
    BoxGeometry: jest.fn(),
    MeshToonMaterial: jest.fn(),
    FontLoader: jest.fn().mockImplementation(() => {
        return {
            load: jest.fn((url, callback) => {
                callback({}); // Mock font loading
            })
        };
    }),
    TextGeometry: jest.fn(),
    MeshBasicMaterial: jest.fn(),
    CylinderGeometry: jest.fn()
};

global.THREE = THREE;

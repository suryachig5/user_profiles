let coins = [];
let currentCard = null;
let currentModel = null;
let font;
const darkGray = 0x969696;
const gray = 0xDBE1E3;
const white = 0xffffff;
const animationTime = 2000;

init();

async function fetchUserData() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/random-users/?results=5');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return [];
    }
}


function createVRButton(renderer) {
    const button = document.createElement('button');

    function showEnterVR() {
        let currentSession = null;

        async function onSessionStarted(session) {
            session.addEventListener('end', onSessionEnded);
            renderer.xr.setSession(session);
            button.textContent = 'EXIT VR';
            currentSession = session;
        }

        function onSessionEnded() {
            currentSession.removeEventListener('end', onSessionEnded);
            button.textContent = 'ENTER VR';
            currentSession = null;
        }

        button.style.display = '';
        button.style.cursor = 'pointer';
        button.style.left = 'calc(50% - 50px)';
        button.style.width = '100px';

        button.textContent = 'ENTER VR';
        button.onmouseenter = function () {
            button.style.opacity = '1.0';
        };
        button.onmouseleave = function () {
            button.style.opacity = '0.5';
        };

        button.onclick = function () {
            if (currentSession === null) {
                navigator.xr.requestSession('immersive-vr').then(onSessionStarted);
            } else {
                currentSession.end();
            }
        };

        renderer.xr.addEventListener('sessionstart', onSessionStarted);
        renderer.xr.addEventListener('sessionend', onSessionEnded);

        button.style.position = 'absolute';
        button.style.bottom = '20px';
        button.style.padding = '12px 6px';
        button.style.border = '1px solid #fff';
        button.style.borderRadius = '4px';
        button.style.background = 'rgba(0,0,0,0.1)';
        button.style.color = '#fff';
        button.style.font = 'normal 13px sans-serif';
        button.style.textAlign = 'center';
        button.style.opacity = '0.5';
        button.style.outline = 'none';
        button.style.zIndex = '999';

        document.body.appendChild(button);
    }

    if ('xr' in navigator) {
        navigator.xr.isSessionSupported('immersive-vr').then(function (supported) {
            if (supported) {
                showEnterVR();
            } else {
                console.warn('WebXR not supported');
            }
        });
    } else {
        console.warn('WebXR not supported');
    }
}

function init() {
    const container = document.getElementById('container');
    console.log('surya container', container)

    // Three.js setup
    const scene = new THREE.Scene();
    console.log('surya scene', scene)
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(white, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(white, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // WebXR setup
    renderer.xr.enabled = true;
    createVRButton(renderer);

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    let intersectedObject = null;

    // Load font once
    const fontLoader = new THREE.FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', async function (loadedFont) {
        font = loadedFont;

        const users = await fetchUserData();
        createUserCoins(users, scene);
    });

    function createUserCoins(users, scene) {
        users.forEach((user, index) => {
            const geometry = new THREE.CylinderGeometry(3, 3, 1, 82);
            const material = new THREE.MeshToonMaterial({
                color: gray,
                transparent: true,
                opacity: 0.3
            });
            const userCoin = new THREE.Mesh(geometry, material);

            userCoin.position.set(index * 10 - 20, 0, 0);
            userCoin.rotation.x = Math.PI / 2; // Rotate the cylinder to have the top face the camera
            userCoin.userData = { user }; // Attach user data to the userCoin

            // Add initials to the userCoin
            const initials = `${user.name.first.charAt(0)}${user.name.last.charAt(0)}`;
            const textGeometry = new THREE.TextGeometry(initials, {
                font: font,
                size: 1.5, // Adjusted size for larger text
                height: 0.1,
            });
            const textMaterial = new THREE.MeshBasicMaterial({ color: white });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            textGeometry.computeBoundingBox();
            const textOffsetX = (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) / -2;
            textMesh.rotation.x = -Math.PI / 2; // Rotate text to lie flat on the face of userCoin
            textMesh.position.set(textOffsetX, 0, 0.51); // Adjust the position to ensure it's centered on the face of userCoin

            userCoin.add(textMesh);
            scene.add(userCoin);
            coins.push(userCoin); // Add userCoin to the array
        });
    }

    function createUserDetailsCard(user, scene) {
        const { dob, email, location, name, phone } = user;
        const { city, postcode, state, street } = location;

        if (currentCard || currentModel) {
            scene.remove(currentModel);
            scene.remove(currentCard);
        }

        const cardGeometry = new THREE.BoxGeometry(30, 10, 1);
        const cardMaterial = new THREE.MeshToonMaterial({
            color: gray,
            transparent: true,
            opacity: 0.3
        });
        const card = new THREE.Mesh(cardGeometry, cardMaterial);

        // Text for user details
        const infoFields = [
            `Name: ${name.first} ${name.last}`,
            `Age: ${dob.age}`,
            `Phone: ${phone}`,
            `Email: ${email}`,
            `Address: ${street.number} ${street.name}, ${city}, ${state} ${postcode}`
        ];

        // Create text meshes for each info field and add to the card
        infoFields.forEach((info, index) => {
            const textGeometry = new THREE.TextGeometry(info, {
                font: font,
                size: 0.6,
                height: 0.1,
            });
            const textMaterial = new THREE.MeshBasicMaterial({ color: white });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            textGeometry.computeBoundingBox();
            // Adjust the X position for left alignment
            const cardWidth = cardGeometry.parameters.width;
            const halfCardWidth = cardWidth / 2;
            const margin = 1;
            const textOffsetX = -halfCardWidth + margin;
            textMesh.position.set(textOffsetX, 3 - index * 1.5, 0.1);

            card.add(textMesh);
        });

        card.position.set(0, 20, 0); // Start position off-screen
        scene.add(card);
        currentCard = card;

        // Animate the card to fly in using tween.js
        new TWEEN.Tween(card.position)
            .to({ y: 5 }, animationTime)
            .easing(TWEEN.Easing.Elastic.Out)
            .start();

        const margin = 5;
        const modelStartPosition = new THREE.Vector3(card.position.x - cardGeometry.parameters.width / 2 - margin, 20, 0); // Start position off-screen
        const modelEndPosition = new THREE.Vector3(card.position.x - cardGeometry.parameters.width / 2 - margin, 5, 0); // End position next to the card
        loadModel('assets/spiderman.glb', modelStartPosition, 2, scene, modelEndPosition);

        // Animate the coins to move down
        coins.forEach((userCoin) => {
            new TWEEN.Tween(userCoin.position)
                .to({ y: -7 }, animationTime)
                .easing(TWEEN.Easing.Elastic.Out)
                .start();
        });
    }

    // Load a 3D model using GLTFLoader
    function loadModel(url, startPosition, scale, scene, endPosition) {
        const loader = new THREE.GLTFLoader();
        loader.load(url, function (gltf) {
            const model = gltf.scene;
            model.position.copy(startPosition);
            model.scale.set(scale, scale, scale);
            scene.add(model);
            currentModel = model;
            model.rotation.y = Math.PI / 8;

            // Animate the model to fly in using tween.js
            new TWEEN.Tween(model.position)
                .to(endPosition, animationTime) // End position and duration of the animation
                .easing(TWEEN.Easing.Elastic.Out) // Easing function for smooth animation
                .start();
        }, undefined, function (error) {
            console.error('An error happened while loading the model:', error);
        });
    }

    function animate() {
        renderer.setAnimationLoop(() => {
            controls.update();
            renderer.render(scene, camera);
            TWEEN.update();
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(scene.children);

            if (intersects.length > 0) {
                if (intersectedObject !== intersects[0].object) {
                    if (intersectedObject) intersectedObject.material.color.set(gray); // Reset previous intersected object color
                    intersectedObject = intersects[0].object;
                    intersectedObject.material.color.set(darkGray); // Set new intersected object color
                    container.style.cursor = 'pointer';
                }
            } else {
                if (intersectedObject) intersectedObject.material.color.set(gray); // Reset intersected object color
                intersectedObject = null;
                container.style.cursor = 'default';
            }
        });
    }

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function onMouseClick() {
        if (intersectedObject) {
            createUserDetailsCard(intersectedObject.userData.user, scene);
        }
    }

    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('click', onMouseClick, false);

    animate();
}

module.exports = { fetchUserData }; 

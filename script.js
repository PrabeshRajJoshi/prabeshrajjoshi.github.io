// Import necessary Three.js components
import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a WebGLRenderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube and add it to the scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add event listeners for interactivity
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('click', onClick);

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onClick() {
    // Cast a ray from the camera through the mouse position
    raycaster.setFromCamera(mouse, camera);

    // Find intersected objects
    const intersects = raycaster.intersectObjects(scene.children);

    // If the ray intersects with the cube, change its color
    if (intersects.length > 0 && intersects[0].object === cube) {
        cube.material.color.set(Math.random() * 0xffffff);
    }
}

// Animation function
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Start the animation loop
animate();

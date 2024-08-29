import * as THREE from 'three';
import './style.css';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setupScene, addLights } from './sceneSetup';
import { createStarField, animateStars } from './starField';
import { loadEarthModel, earthObject } from './modelLoader';
import gsap from "gsap";

// Scene, Camera, Renderer Setup
const scene = setupScene();
const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 10;
scene.add(camera);

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

// Lights
addLights(scene);

// Star Field
createStarField(scene);

// Load Earth Model and Clouds
let cloudsObject;
loadEarthModel(scene, () => {
  const timeline = gsap.timeline({ defaults: { duration: 1 } });
  // Example animation for Earth
  timeline.fromTo(earthObject.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
  timeline.fromTo(cloudsObject.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
  timeline.fromTo("nav", { y: "-100%" }, { y: "0%" });
  timeline.fromTo(".title", { opacity: 0 }, { opacity: 1 });
});

const cloudLoader = new GLTFLoader();
cloudLoader.load('models/LowPolyEarth_Final_Clouds.glb', function (gltf) {
  cloudsObject = gltf.scene;
  scene.add(cloudsObject);
  cloudsObject.scale.set(1.01, 1.01, 1.01); // Scale slightly larger than the Earth
}, undefined, function (error) {
  console.error(error);
});

// Resize Event
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

// Main Animation Loop
const loop = () => {
  controls.update();
  animateStars(); // Star animation
  
  if (cloudsObject) {
    cloudsObject.rotation.y += 0.001; // Rotate the clouds slowly
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

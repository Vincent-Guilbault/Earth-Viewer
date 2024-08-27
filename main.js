import * as THREE from 'three'; 
import './style.css';
import gsap from "gsap";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//Scene
const scene = new THREE.Scene();

//Create a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00FF83",
  roughness: 0.35,
});
const mesh = new THREE.Mesh(geometry, material); //Combines the geometry and the material to create a mesh.
scene.add(mesh); //Adds the sphere to the scene.

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.intensity = 100;
light.position.set(0, 10, 10); //xyz positions for the light.
scene.add(light);

// const ambientLight = new THREE.AmbientLight(0xffffff, 1, 100);
// ambientLight.intensity = 0.01;
// scene.add(ambientLight);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 3;

//Resize
window.addEventListener('resize', () => {
  //Update the sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update the camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()

  //Update the renderer
  renderer.setSize(sizes.width, sizes.height);
  // renderer.render(scene, camera);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

//Animation timeline with gsap
const timeline = gsap.timeline({ defaults: { duration:1 }});
timeline.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
timeline.fromTo("nav", { y: "-100%" }, { y: "0%" });
timeline.fromTo(".title", { opacity: 0 }, { opacity: 1 });
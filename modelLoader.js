import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export let earthObject;

export function loadEarthModel(scene, callback) {
  const loader = new GLTFLoader();
  loader.load('models/LowPolyEarth_Final.glb', function (gltf) {
    earthObject = gltf.scene;
    scene.add(earthObject);
    callback(earthObject); // Pass the earthObject to the callback
  }, undefined, function (error) {
    console.error(error);
  });
}

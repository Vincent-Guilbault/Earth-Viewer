import * as THREE from 'three';

export function setupScene() {
  const scene = new THREE.Scene();
  return scene;
}

export function addLights(scene) {
  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.intensity = 100;
  light.position.set(0, 10, 10);
  scene.add(light);
}

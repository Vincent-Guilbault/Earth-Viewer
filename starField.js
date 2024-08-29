import * as THREE from 'three';

export let starField;

export function createStarField(scene) {
  const starCount = 5000; // Number of stars
  const starGeometry = new THREE.BufferGeometry(); // Geometry to hold the star vertices
  const starVertices = []; // Array to store star positions
  const starSizes = []; // Array to store star sizes

  for (let i = 0; i < starCount; i++) {
    const theta = Math.random() * 2 * Math.PI; // Random angle around the z-axis
    const phi = Math.acos((Math.random() * 2) - 1); // Random angle from the z-axis
    const r = Math.random() * 85 + 85; // Random radius from the center
  
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
  
    starVertices.push(x, y, z);
    
    // Assign a random size to each star
    const size = Math.random() * 0.5 + 2; // Sizes between 0.5 and 2.5
    starSizes.push(size);
  }
  
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3)); // Convert to attribute
  starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1)); // Add size attribute

  // Load a circular texture for the stars
  const starTexture = new THREE.TextureLoader().load('./public/star64x64.png'); // You need a small circular texture
  
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    sizeAttenuation: true,
    map: starTexture, // Apply the texture
    transparent: true, // Make the edges of the circles smooth
    alphaTest: 0.5, // To ensure transparency works correctly
  });
  
  starField = new THREE.Points(starGeometry, starMaterial); // Create Points object from geometry and material
  scene.add(starField); // Add starfield to the scene
}

export function animateStars() {
  if (starField) {
    starField.rotation.y += -0.0005;
  }
}

import * as THREE from "./three.module.js";
import { TextGeometry } from './TextGeometry.js';
import { FontLoader } from './FontLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  10,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let textMesh = new THREE.Mesh();
let stars, starGeo;

lighting();
text();
particles();

setInterval(randColor, 3000);

function particles() {
  const points = [];

  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    points.push(star);
  }

  starGeo = new THREE.BufferGeometry().setFromPoints(points);

  let sprite = new THREE.TextureLoader().load("./assets/images/star.png");
  let starMaterial = new THREE.PointsMaterial({
    size: 0.7,
    map: sprite,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  stars.material.color.setRGB(Math.random(256), Math.random(256), Math.random(256));
  scene.add(stars);
}

function randColor(){
  stars.material.color.setRGB(Math.random(256), Math.random(256), Math.random(256));
}

function animateParticles() {
    starGeo.verticesNeedUpdate = true;
    stars.position.y -= 0.9;

    if (stars.position.y < -200){
      stars.position.y = 100;
    }
  }

function text() {
  const fontLoader = new FontLoader();
  
  fontLoader.load( './assets/fonts/helvetiker_bold.typeface.json', function ( font ) {
    const texture = new THREE.TextureLoader().load("./assets/textures/wooden.jpg");

    const textGeometry = new TextGeometry( 'Kenichi', {
        font: font,
        size: 3,
        height: 1,
    } );
    textGeometry.center();
    
    const textMaterial = new THREE.MeshPhongMaterial({ map: texture, specular: 'blue'});

    textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.z = -5;
    console.log(textMesh);

    scene.add(textMesh);
  } );

  camera.position.z = 15;
}

function lighting() {
  const light = new THREE.HemisphereLight(0x780a44, 0x1c3020, 12);
  scene.add(light);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 0, 15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;
  scene.add(spotLight);
}

function animate() {
  requestAnimationFrame(animate);

  animateParticles();

  textMesh.rotation.x += 0.008;
  textMesh.rotation.y += 0.008;
  renderer.render(scene, camera);
}

animate();

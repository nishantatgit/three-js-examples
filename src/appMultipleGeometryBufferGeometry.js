import * as THREE from 'three';
import Box from './Box';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.getElementById('webgl');
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// const geometry = new THREE.BoxGeometry(1,1,1);

const noOfTriangles = 1000;
const positionsArray = new Float32Array(noOfTriangles * 3 * 3)

for(let i = 0; i < noOfTriangles * 3 * 3; i++){
    positionsArray[i] = ( Math.random() - 0.5 ) * 3;
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray,3);

const geometry = new THREE.BufferGeometry();

geometry.setAttribute('position', positionsAttribute);


const material = new THREE.MeshBasicMaterial({
    color: 'purple',
    wireframe: true
});

const mesh = new THREE.Mesh(geometry,material);


const camera = new THREE.PerspectiveCamera(75, sizes.width/ sizes.height);
camera.position.z = 3;


const scene = new THREE.Scene();
scene.add(mesh);
scene.add(camera);


const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;

controls.update();
 


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});


renderer.setSize(sizes.width, sizes.height);
renderer.render(scene,camera);

function animate() {

    requestAnimationFrame( animate );

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render( scene, camera );

}

animate();


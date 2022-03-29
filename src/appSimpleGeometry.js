import * as THREE from 'three';
import Box from './Box';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.getElementById('webgl');
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//const geometry = new THREE.BoxGeometry(1,1,1);


const vector1 = new THREE.Vector3(0,0,0);
const vector2 = new THREE.Vector3(0,1,0);
const vector3 = new THREE.Vector3(1,0,0);

const geometry = new THREE.Geometry();
geometry.vertices.push(vector1);
geometry.vertices.push(vector2);
geometry.vertices.push(vector3);

const face = new THREE.Face3(0,1,2);

geometry.faces.push(face);

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
controls.target.set(0,.75,0);
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


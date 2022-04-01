import * as THREE from 'three';
import Box from './Box';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.getElementById('webgl');
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// const geometry = new THREE.BoxGeometry(1,1,1);



 const geometry = new THREE.Geometry();

 for(let i = 0; i < 150; i = i + 3){
     geometry.vertices.push(new THREE.Vector3((Math.random() -0.5) * 4, Math.random() * 4, Math.random() * 4));
     geometry.vertices.push(new THREE.Vector3(Math.random() * 4, Math.random() * 4, Math.random() * 4));
     geometry.vertices.push(new THREE.Vector3(Math.random() * 4, Math.random() * 4, Math.random() * 4));
     console.log(i,i+1,i+2);
     geometry.faces.push(new THREE.Face3(i, i+1,i+2));
 }

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


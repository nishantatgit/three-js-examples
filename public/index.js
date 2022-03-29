import *  as THREE from 'three';

console.log('THREE','THREE');
window.addEventListener('DOMContentLoaded',App);

function App(){
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({
        color: '#ff0000'
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 0.7;
    mesh.position.y = -0.6;
    mesh.position.z = 1;

    const control = new THREE.OrbitControls();

    const sizes = {
        height: 600,
        width: 800
    }

    const camera = new THREE.PerspectiveCamera(75, 800 / 600);
     camera.position.z = 5;
     camera.position.x = -1;
    scene.add(mesh);

    const canvas = document.querySelector('#webgl');
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });

    renderer.setSize(sizes.width, sizes.height);

    renderer.render(scene, camera);

    console.log('gltf loader ', THREE.GLTFLoader);
}


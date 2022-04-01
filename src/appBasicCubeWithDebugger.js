import * as Three from 'three';
import * as dat from 'dat.gui';
import gsap from 'gsap';

import { OrbitControls  } from 'three/examples/jsm/controls/OrbitControls';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const canvas = document.getElementById('webgl');

const geometry = new Three.BoxGeometry(1,1,1);
const material = new Three.MeshBasicMaterial({
    color: '#00fff0'
});

const mesh = new Three.Mesh(geometry,material);

const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

const scene = new Three.Scene();
scene.add(mesh);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;
controls.update();

const renderer = new Three.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene,camera);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

const debugObject = {
    color: '#00fff0',
    spin: () => {
        console.log('executing spin function ...');
        gsap.to(mesh.rotation, { duration: 3    , y : mesh.rotation.y + Math.PI * 2})
    }
}
//debug panel
const gui = new dat.GUI();
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01);
gui.add(mesh.position, 'x');
gui.add(material, 'wireframe').name('outline');
gui.addColor(debugObject,'color')
   .onChange(() => {
    material.color.set(debugObject.color)
   });
gui.add(debugObject,'spin');

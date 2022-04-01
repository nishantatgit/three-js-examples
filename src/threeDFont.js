import * as Three from 'three';
import * as dat from 'dat.gui';
import gsap from 'gsap';

import { OrbitControls  } from 'three/examples/jsm/controls/OrbitControls';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const canvas = document.getElementById('webgl');

const fontLoader = new Three.FontLoader();
fontLoader.load('Rock 3D_Regular.json',
    function(font){
        const textGeometry = new Three.TextBufferGeometry('Dr. Anjani Kumar',{
            font,
            color: '#ffffff',
            size: 0.5,
            height: 0.2,
        });
        const textMaterial = new Three.MeshBasicMaterial();

        const textMesh = new Three.Mesh(textGeometry, textMaterial);
        scene.add(textMesh);
    }
);

const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

const scene = new Three.Scene();
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
    // spin: () => {
    //     console.log('executing spin function ...');
    //     gsap.to(mesh.rotation, { duration: 3    , y : mesh.rotation.y + Math.PI * 2})
    // }
}

//debug panel
const gui = new dat.GUI();
gui.add(textMaterial, 'wireframe').name('outline');
gui.addColor(debugObject,'color')
   .onChange(() => {
    textMaterial.color.set(debugObject.color)
   });
gui.add(debugObject,'spin');

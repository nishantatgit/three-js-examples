import * as Three from 'three';
import * as dat from 'dat.gui';
import gsap from 'gsap';

import { OrbitControls  } from 'three/examples/jsm/controls/OrbitControls';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};


const canvas = document.getElementById('webgl');


const loadingManager = new Three.LoadingManager();

loadingManager.onStart = () => {
    console.info('loading started ... ');
};
loadingManager.onLoaded = () => {
    console.info('loading completed ...');
};
loadingManager.onProgress = () => {
    console.info('loading in progress ... ');
};

const textureLoader = new Three.TextureLoader(loadingManager);
const texture = textureLoader.load('red_bricks_04_diff_8k.jpg');
const normalTexture = textureLoader.load('red_bricks_04_nor_gl_8k.jpg');
const ambientOcculsionTexture = textureLoader.load('red_bricks_04_ao_8k.jpg');
const displacementTexture = textureLoader.load('red_bricks_04_disp_8k.jpg');
const roughnessTexture = textureLoader.load('red_bricks_04_rough_8k.jpg');

texture.minFilter = Three.NearestFilter;

const geometry = new Three.SphereBufferGeometry(2,48,48);
const material = new Three.MeshStandardMaterial({
    map: texture,
    aoMap: ambientOcculsionTexture,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    displacementMap: displacementTexture,
    displacementScale: 0.05
});

material.normalScale.set(0.5,0.5);


const mesh = new Three.Mesh(geometry,material);
mesh.geometry.setAttribute('uv2', new Three.BufferAttribute(mesh.geometry.attributes.uv.array,2));
console.log(mesh.geometry.attributes.uv);

const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 7;

const scene = new Three.Scene();
scene.add(mesh);
scene.add(camera);

const ambientLight = new Three.AmbientLight('#ffffff', 0.5);
scene.add(ambientLight);

const pointLight = new Three.PointLight('#ffffff', 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;
controls.update();

const renderer = new Three.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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
gui.add(mesh.position, 'x').min(-2).max(2).step(0.001);
gui.add(material, 'wireframe').name('outline');
gui.add(material,'metalness').min(0).max(1).step(0.0001);
gui.add(material,'roughness').min(0).max(1).step(0.0001);
gui.add(material,'aoMapIntensity').min(1).max(10).step(0.1);
gui.add(material,'displacementScale').min(0.05).max(1).step(0.05);
gui.addColor(debugObject,'color')
   .onChange(() => {
    material.color.set(debugObject.color)
   });
gui.add(debugObject,'spin');


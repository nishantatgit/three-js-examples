import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 
import * as dat from 'dat.gui';

const canvas = document.getElementById('webgl');
const sizes = {
    width: document.body.offsetWidth,
    height: document.body.offsetHeight
}

const geometry = new Three.BoxBufferGeometry(1,1,1);
const material = new Three.MeshStandardMaterial({
    color: '#ffffff'
});

const mesh = new Three.Mesh(geometry,material);
mesh.position.x = -1;

const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

const scene = new Three.Scene();
scene.add(mesh);
scene.add(camera);

const sphereGeometry = new Three.SphereBufferGeometry(1,32,32);
const sphereMaterial = new Three.MeshStandardMaterial({
    color: '#ffffff'
});

const sphereMesh = new Three.Mesh(sphereGeometry,sphereMaterial);
sphereMesh.position.x = 1;
scene.add(sphereMesh);

const ambientLight = new Three.AmbientLight('#ffffff', 1);
scene.add(ambientLight);

const directionalLight = new Three.DirectionalLight('#ffffff',1);
scene.add(directionalLight);

const directionLightHelper = new Three.DirectionalLightHelper(directionalLight,0.2);
scene.add(directionLightHelper);

console.log(directionalLight.position);

const hemiSphereLight = new Three.HemisphereLight('#ff0000','#0000ff', 0.5);
scene.add(hemiSphereLight);

const axesHelper = new Three.AxesHelper();
scene.add(axesHelper);

const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
controls.update();

const renderer = new Three.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.max(window.devicePixelRatio, 2));
renderer.render(scene, camera);

function animate(){
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}

animate();


// debug panel

const gui = new dat.GUI();

gui.add(material,'wireframe');
gui.add(ambientLight,'intensity').min(0).max(1).step(0.01).name('ambient light');
gui.add(directionalLight,'intensity').min(0).max(1).step(0.01).name('directional light');
gui.add(directionalLight.position,'x').min(-2).max(2).step(1).name('position x');
gui.add(directionalLight.position,'y').min(-2).max(2).step(1).name('position y');
gui.add(directionalLight.position,'z').min(-2).max(2).step(1).name('position z');
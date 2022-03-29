console.info(' ##### loader app #####');
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


const canvas = document.getElementById('webgl');
const sizes = {
    width: window.innerWidth -20,
    height: window.innerHeight - 20
}

const loader = new GLTFLoader();
const url = 'public/assets/gltf/simple_shape.glb';


const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 11;

const control = new OrbitControls(camera,canvas);
control.target.set(0, 0.75, 0)
control.enableDamping = true;

control.update();

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 5, 5, 0)
scene.add(directionalLight)

scene.add(axesHelper);


const renderer = new THREE.WebGLRenderer({
    canvas : canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


loader.load(url, (gltf) => {
    const root = gltf.scene;

    scene.add(root);

    renderer.render(scene, camera);

    function animate() {

        requestAnimationFrame( animate );
    
        // required if controls.enableDamping or controls.autoRotate are set to true
        control.update();
    
        renderer.render( scene, camera );
    
    }

    animate();
})

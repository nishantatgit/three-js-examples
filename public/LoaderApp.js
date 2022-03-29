console.info(' ##### loader app #####');


const canvas = document.getElementById('webgl');
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const loader = new THREE.GLTFLoader();
const url = 'assets/gltf/simple_shape.glb';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 17;

const control = new THREE.OrbitControls(camera,canvas);
control.target.set(0, 0.75, 0)
control.enableDamping = true

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer({
    canvas : canvas
});
renderer.setSize(sizes.width, sizes.height);

loader.onLoad = function(){
    alert('loaded ... ');
}

loader.load(url, (gltf) => {
    console.log('gltf loading successful ... ');
    console.log(gltf);
    const root = gltf.scene;

    scene.add(root);

    renderer.render(scene, camera);
})

loader.onError = function(err){
    console.log('error occured');
}
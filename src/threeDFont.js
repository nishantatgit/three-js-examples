import * as Three from 'three';
import * as dat from 'dat.gui';
import gsap from 'gsap';

import { OrbitControls  } from 'three/examples/jsm/controls/OrbitControls';
import { BufferGeometryLoader } from 'three';

const sizes = {
    width: document.body.clientWidth,
    height: document.body.clientHeight
};

const fontStyles = {
    rockFont : 'Rock 3D_Regular.json',
    robotoRegularFont : 'Roboto_Regular.json',
    caveatRegularFont: 'Caveat_Regular.json',
    lavishlyYoursFont: 'Lavishly Yours_Regular.json',
    rajdhaniRegularFont: 'Rajdhani_Regular.json'
}

const metcapStyles = {
    blackWhite : '512/0A0A0A_A9A9A9_525252_747474-512px.png',
    greenCitrus: '512/0C430C_257D25_439A43_3C683C-512px.png',
    blueBerry: '512/0C0CC3_04049F_040483_04045C-512px.png',
    blueMetal: '512/1A2461_3D70DB_2C3C8F_2C6CAC-512px.png',
    blueSoft: '512/2A4BA7_1B2D44_1F3768_233C81-512px.png',
    purpleBerry: '512/5C045C_BD0DBD_930493_A404A4-512px.png',
    darkPurple: '512/5F1827_9B4A60_1F0404_340406-512px.png',
    orange: '512/7D6651_F8E3BF_CEA987_E7C29C-512px.png',
    citrusGreen: '512/5C5C04_BDBD0D_939304_A4A404-512px.png',
    teal: '512/04E8E8_04B5B5_04CCCC_33FCFC-512px.png',
    bubblyPink: '512/AA526C_EAA6C9_DC88AF_D17BA0-512px.png',
    softPink: '512/906867_C7B6BC_5D2E26_BEA4A3-512px.png',
    offwhite: '512/E8DEE1_B5A6AA_CCBCC1_C4BBBC-512px.png',
    creamyYellow: '512/E2D3BC_867255_B39E7F_96836C-512px.png'
}
const canvas = document.getElementById('webgl');
document.body.style.backgroundColor = 'aliceblue';
let textMaterial, textGeometry, textMesh;

const textureLoader = new Three.TextureLoader();
const matcapTexture = textureLoader.load(metcapStyles.creamyYellow);
const matcapTexture2 = textureLoader.load(metcapStyles.teal);
const metcapTexture3 = textureLoader.load(metcapStyles.citrusGreen);
const fontLoader = new Three.FontLoader();
const displayText = 'Nishant Kumar' || 'निशांत कुमार';
fontLoader.load(fontStyles.rajdhaniRegularFont,
    function(font){
        textGeometry = new Three.TextBufferGeometry(displayText,{
            font,
            color: '#ffffff',
            size: 0.5,
            height: 0.2,
            curveSegments: 24,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 12
        });
        textGeometry.computeBoundingBox();
        textGeometry.translate(
            -textGeometry.boundingBox.max.x * 0.5,
            -textGeometry.boundingBox.max.y * 0.5,
            -textGeometry.boundingBox.max.z * 0.5,
        )
        console.log('-0---', textGeometry.boundingBox);
        textMaterial = new Three.MeshMatcapMaterial({
            matcap: matcapTexture
        });

        textMesh = new Three.Mesh(textGeometry, textMaterial);
        scene.add(textMesh);

        for(let i = 0; i < 1000; i++){
            const torusGeometry = new Three.TorusBufferGeometry(0.3,0.2,20,45);
            const torusMaterial = new Three.MeshMatcapMaterial({
                matcap: matcapTexture2
            });
            const torusMesh = new Three.Mesh(torusGeometry, torusMaterial);
            torusMesh.position.x = ( Math.random() + Math.random() - 1 ) * 51;
            torusMesh.position.y =  ( Math.random() + Math.random() - 1 ) * 51;
            torusMesh.position.z =  ( Math.random() + Math.random() - 1 ) * 51;
            torusMesh.rotation.z = ( Math.random() + Math.random() - 1 ) * 51;
            torusMesh.rotation.x = ( Math.random() + Math.random() - 1 ) * 51;
            scene.add(torusMesh);
        }

        for(let i = 0; i < 300; i++){
            const boxGeometry = new Three.BoxBufferGeometry(0.8,0.8,0.8);
            const boxMaterial = new Three.MeshMatcapMaterial({
                matcap: metcapTexture3
            });
            const boxMesh = new Three.Mesh(boxGeometry, boxMaterial);
            boxMesh.position.x = ( Math.random() + Math.random() - 1 ) * 91;
            boxMesh.position.y =  ( Math.random() + Math.random() - 1 ) * 91;
            boxMesh.position.z =  ( Math.random() + Math.random() - 1 ) * 91;
            boxMesh.rotation.z = ( Math.random() + Math.random() - 1 ) * 51;
            boxMesh.rotation.x = ( Math.random() + Math.random() - 1 ) * 51;
            scene.add(boxMesh);

            console.log('scene ', scene);
        }
        
    }
);

const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;

const scene = new Three.Scene();
scene.add(camera);

const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;
controls.update();

const renderer = new Three.WebGLRenderer({
    canvas: canvas,
    alpha: true
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


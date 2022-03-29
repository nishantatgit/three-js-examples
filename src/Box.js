import * as Three from 'three';


class Box {
    constructor(scene, camera, initialPosition = {}){
        this.geometry = new Three.BoxGeometry(1,1,1);
        this.material = new Three.MeshBasicMaterial({
            color: '#ff0000'
        });

        this.mesh = new Three.Mesh(this.geometry, this.material);
        this.mesh.position.x = initialPosition.x === undefined ?  1 : initialPosition.x;
        this.mesh.position.y = initialPosition.y === undefined ?  1 : initialPosition.y;
        this.mesh.position.z = initialPosition.z === undefined ?  1 : initialPosition.z;
        this.scene = scene;
        this.camera = camera;
    }

    getMesh(){
        return this.mesh;
    }
    
}

export default Box;
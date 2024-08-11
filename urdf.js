import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js';
import { LoadingManager } from '/build/three.module.js';
//import URDFLoader from '/urdf/URDFLoader.js';

console.log(THREE);

// ...init three.js scene...
const scene = document.querySelector('a-scene').object3D;

const manager = new LoadingManager();
const loader = new URDFLoader( manager );
/*loader.packages = {
    packageName : './package/dir/'            // The equivalent of a (list of) ROS package(s):// directory
};*/
loader.load(
  'ssh://gl/afs/umbc.edu./users/l/d/ldoyle1/home/ite201b/seniorProject/T12/urdf/T12.URDF',                    // The path to the URDF within the package OR absolute
  robot => {

    // The robot is loaded!
    scene.add( robot );

  }
);


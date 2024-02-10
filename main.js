import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls"

// select the canvas to render the object
const canvas = document.querySelector('.webgl')

// determine the size of the painted object
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// initialize and prepare the 3D scene
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio(2);
document.body.appendChild( renderer.domElement );

// add camera with appropriate field of view
const camera = new THREE.PerspectiveCamera( 45,
    sizes.width / sizes.height,
    0.1,
    1000);
camera.position.z = 20;

// add orbit controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

// define the geometry and material
const geometry = new THREE.SphereGeometry( 4, 32, 32 );
const material = new THREE.MeshLambertMaterial(
        {
			'wireframe': true,
			'color': 0x772667
        }
    );

// create and add the Mesh object
const meshObj = new THREE.Mesh( geometry, material );
scene.add( meshObj );


// add lighting to display the mesh object
const light = new THREE.PointLight(0xFFFFFF,2,100);
light.position.set(0, 50, 50);
scene.add( light );

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// resize object on window resize 
window.addEventListener("resize",() => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
})

/*
// recolour on mouse interaction
let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', ()=>(mouseDown=true));
window.addEventListener('mouseup', ()=>(mouseDown=false));
window.addEventListener('mousemove', (e)=>{
    if(mouseDown){
        rgb = [
            Math.round((e.pageX/sizes.width)*255),
            Math.round((e.pageY/sizes.height)*255),
            150
        ]

        let newColor = new THREE.Color(`rgb($rgb.join(","))`)
    }
});
*/


function animate() {
	/*
	main function to animate the object.
	Ideally, this should be the only "non-pure" function that uses/modifies variables beyond its context.
	*/
	window.requestAnimationFrame( animate );
	meshObj.rotation.x += 0.001;
	meshObj.rotation.y += 0.001;
	renderer.render( scene, camera );
    controls.update();
}

animate();




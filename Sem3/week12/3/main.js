import * as THREE from 'three';


// setting up the rendere, camera, scene, etc
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
)
camera.position.set(150, 50, 150)
camera.lookAt(0, 0, 0)

const scene = new THREE.Scene()


// creating 3 line materials (all have different colors)
const xAxisMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const yAxisMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
const zAxisMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

// creating the axes geometries
const xAxisGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(100, 0, 0)
])

const yAxisGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 100, 0),
])

const zAxisGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 100),
])

// finally the axes
const xAxis = new THREE.Line(xAxisGeometry, xAxisMaterial)
const yAxis = new THREE.Line(yAxisGeometry, yAxisMaterial)
const zAxis = new THREE.Line(zAxisGeometry, zAxisMaterial)




const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
const cube = new THREE.Mesh(geometry, material);
cube.position.set(20, 20, 20);

scene.add(xAxis, yAxis, zAxis, cube);


// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(50, 50, 50);
scene.add(directionalLight);




function animate() {
    requestAnimationFrame(animate)

    // rotate around the center
    const radius = 150
    const angle = Date.now() * 0.0005

    camera.position.x = radius * Math.sin(angle)
    camera.position.z = radius * Math.cos(angle)

    camera.lookAt(0, 0, 0)


    // cube stuff
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    const distance = 20
    const k = distance * Math.sin(4 * angle)

    cube.position.set(k, k, k)



    

    renderer.render(scene, camera)
}

animate()


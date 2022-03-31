import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import CV from './pluwumpy.jpg'
import { CVPDF } from './CV.pdf'
import { Color } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';


if(window.location.pathname == "/index.html"){
  /**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webglindex')

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/8.png');


/**
 * Fonts
 */
const fontLoader = new FontLoader();
fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  function (font){
    const textGeometry = new TextGeometry(
      'Bienvenue sur mon portfolio',
      {
        font: font,
        height: 0.2,
        size: 0.5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      }
    );
    textGeometry.center();

    const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture});
    const text = new THREE.Mesh(textGeometry, material);
    scene.add(text);

    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

    for(let i = 0; i < 150; i++){
      const donut = new THREE.Mesh(donutGeometry, material);

      donut.position.x = (Math.random() - 0.5) * 20;
      donut.position.y = (Math.random() - 0.5) * 20;
      donut.position.z = (Math.random()) * - 10;

      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;
      
      const scale = Math.random();
      donut.scale.set(scale, scale, scale);

      scene.add(donut)
  }
  }
)


/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

//scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth / 2,
    height: window.innerHeight / 3
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
}

if(window.location.pathname == "/about.html"){
  //console.log('bienvenue sur mon portfolio');
}

if(window.location.pathname == "/portfolio.html"){
  //console.log('bienvenue sur mon portfolio gamifié');
  /**
   * Debug
   */

  const parameters = {
    color : 0xff0000
  }

  /**
   * Images
   */
   const image = document.getElementById('imgCV');

  /**
   * 3D Models
   */
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');

  const gtlfLoader = new GLTFLoader();
  gtlfLoader.setDRACOLoader(dracoLoader);

  let bat1;
  gtlfLoader.load(
    '/models/house_3d_low_poly/scene.gltf',
    function(gltf){
      
      bat1 = gltf;
      gltf.scene.scale.set(1, 1, 1);
      gltf.scene.position.set(10, 0.1, -5);
      scene.add(gltf.scene);
    }
  )

  let playerbody;
  let mixer = null;
  gtlfLoader.load(
    '/models/AJ/walking.glb',
    function(gltf){
      mixer = new THREE.AnimationMixer(gltf.scene);
      console.log(gltf);
      const action = mixer.clipAction(gltf.animations[0]);

      action.play();
      playerbody = gltf;
      playerbody.scene.position.set(player1.position.x, player1.position.y, player1.position.z);
      gltf.scene.scale.set(1, 1, 1);
      gltf.scene.visible = false;
      scene.add(gltf.scene);
    }
  )

  let playerbodyidle;
  let mixer2 = null;
  gtlfLoader.load(
    '/models/AJ/idle.glb',
    function(gltf){
      mixer2 = new THREE.AnimationMixer(gltf.scene);
      console.log(gltf);
      const action = mixer2.clipAction(gltf.animations[0]);

      action.play();
      playerbodyidle = gltf;
      playerbodyidle.scene.position.set(player1.position.x, player1.position.y, player1.position.z);
      gltf.scene.scale.set(1, 1, 1);
      gltf.scene.visible = true;
      scene.add(gltf.scene);
    }
  )

  /**
 * Fonts
 */
const fontLoader = new FontLoader();
fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  function (font){
    const textGeometry = new TextGeometry(
      'Test',
      {
        font: font,
        height: 0.2,
        size: 0.5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      }
    );
    textGeometry.center();

    const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture});
    const text = new THREE.Mesh(textGeometry, {color: 0x000000});
    text.position.set(1, 2, 1)
    scene.add(text);
  });

  /**
   * Cursor
   */
  const cursor = {
    x: 0,
    y: 0
  };

  // Canvas
  const canvas = document.querySelector('canvas.webgl');

  // Scene
  const scene = new THREE.Scene();

    /**
   * Objects
   */
    const player = new THREE.Group();
    player.position.y = 1;
    player.scale.y = 2;
    scene.add(player);

    const player1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 1, 0.5),
        new THREE.MeshBasicMaterial({ color: parameters.color })
    );
    player1.visible = false;
    player.add(player1);

    const player1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    player1BB.setFromObject(player1);
    //console.log(player1BB);

    const batiments = new THREE.Group();
    scene.add(batiments);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20, 30, 30),
      new THREE.MeshBasicMaterial({ color : 0xB4B4B4 , side : THREE.DoubleSide})
    );
    ground.position.y = 0;
    ground.rotation.x = Math.PI / 2;
    scene.add(ground);

    const cvActivate = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.2, 2),
      new THREE.MeshBasicMaterial({ color: 0x00ff00})
    );
    cvActivate.material.visible = true;
    scene.add(cvActivate);
    cvActivate.position.set(5, 0, 5);
    let isOverlappingCvActivate = false;

    const turtleBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    turtleBB.setFromObject(cvActivate);

    /**
     * Lights
     */
    const lights = new THREE.Group();
    scene.add(lights);

    const light = new THREE.AmbientLight( 0x404040, 4.5 ); // soft white light
    lights.add(light);
    scene.add( light );

    const directionalLight = new THREE.DirectionalLight( 0x404040, 1 );
    lights.add(light);

    lights.position.set(0, 5, 0);
    directionalLight.lookAt(player1);
    scene.add( directionalLight );

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    window.addEventListener('resize', function(event){
      //Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      //Update camera
      camera.aspect = sizes.width/sizes.height;
      camera.updateProjectionMatrix();

      //Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    window.addEventListener('dblclick', function(){
      const nav = this.document.getElementById('nav');
      if(nav.style.display == "inline-block"){
        nav.style.display = 'none';
      }else{
        nav.style.display = "inline-block";
      }
    });

    /**
     * Camera
     */
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 5;
    camera.position.y = 6;
    camera.rotation.x = 0;
    scene.add(camera);
    player.add(camera);

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });
    renderer.setSize(sizes.width, sizes.height);


    // Clock
    const clock = new THREE.Clock();
    let previousTime = 0;

    // Fonction qui sert à mettre à jour ce qu'il y a dedans
    function tick(){
      player1BB.copy(player1.geometry.boundingBox).applyMatrix4(player1.matrixWorld);
      checkCollision();

      // Clock
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;

      // Update Mixer
      if(mixer !== null){
        mixer.update(deltaTime);
      }
      if(mixer2 !== null){
        mixer2.update(deltaTime);
      }

      camera.lookAt(player1.position);
      // Render
      renderer.render(scene, camera);
      /**
       * Bouclage de la fonction pour l'appeler toutes les frames
       */
      window.requestAnimationFrame(tick);
    }

    function checkCollision(){
      if(player1BB.intersectsBox(turtleBB)){
        isOverlappingCvActivate = true;
        textJeu.style.visibility = "visible";
        textJeu.innerHTML = "Appuyez sur E pour intéragir";
        //console.log("Overlapping");
      }else{
        isOverlappingCvActivate = false;
        image.style.visibility = 'hidden';
        textJeu.style.visibility = 'hidden';
        textJeu.innerHTML = "";
      }
    }
    tick();

    /**
     * Récupération des inputs
     */
    let isMoving = false;
    window.addEventListener("keydown", function(event) {
      if (event.preventDefaulted) {
        return; // Do nothing if event already handled
      }
    if(event.code == "KeyS" || event.code == "ArrowDown"){
      player1.translateZ(0.1);
      isMoving = true;
      playerbodyidle.scene.visible = false;
      playerbody.scene.visible = true;
      playerbody.scene.position.z = player1.position.z;
      playerbody.scene.rotation.y = Math.PI *2;
      playerbodyidle.scene.position.z = player1.position.z;
      playerbodyidle.scene.rotation.y = Math.PI *2;
      camera.position.z = player1.position.z + 5;
    }
    if(event.code == "KeyW" || event.code == "ArrowUp"){
      player1.translateZ(-0.1);
      isMoving = true;
      playerbodyidle.scene.visible = false;
      playerbody.scene.visible = true;
      playerbody.scene.position.z = player1.position.z;
      playerbody.scene.rotation.y = Math.PI;
      playerbodyidle.scene.position.z = player1.position.z;
      playerbodyidle.scene.rotation.y = Math.PI;
      camera.position.z = player1.position.z + 5;
    }
    if(event.code == "KeyA" || event.code == "ArrowLeft"){
      player1.translateX(-0.1);
      isMoving = true;
      playerbodyidle.scene.visible = false;
      playerbody.scene.visible = true;
      playerbody.scene.position.x = player1.position.x;
      playerbody.scene.rotation.y = Math.PI * -0.5;
      playerbodyidle.scene.position.x = player1.position.x;
      playerbodyidle.scene.rotation.y = Math.PI * -0.5;
      camera.position.x = player1.position.x;
    }
    if(event.code == "KeyD" || event.code == "ArrowRight"){
      player1.translateX(0.1);
      isMoving = true;
      playerbodyidle.scene.visible = false;
      playerbody.scene.visible = true;
      playerbody.scene.position.x = player1.position.x;
      playerbody.scene.rotation.y = Math.PI *0.5;
      playerbodyidle.scene.position.x = player1.position.x;
      playerbodyidle.scene.rotation.y = Math.PI *0.5;
      camera.position.x = player1.position.x;
    }
    if(event.code == "KeyE" && isOverlappingCvActivate == true){
      image.style.visibility = "visible";
    }
      // Consume the event so it doesn't get handled twice
      event.preventDefault();
    }, true);

    window.addEventListener("keyup", function(event2){
      if(event2.code == "KeyS" || event2.code2 == "ArrowDown"){
        playerbodyidle.scene.visible = true;
        playerbody.scene.visible = false;
      }
      if(event2.code == "KeyW" || event2.code2 == "ArrowUp"){
        playerbodyidle.scene.visible = true;
        playerbody.scene.visible = false;
      }
      if(event2.code == "KeyA" || event2.code2 == "ArrowLeft"){
        playerbodyidle.scene.visible = true;
        playerbody.scene.visible = false;
      }
      if(event2.code == "KeyD" || event2.code2 == "ArrowRight"){
        playerbodyidle.scene.visible = true;
        playerbody.scene.visible = false;
      }
    },true);
}

if(window.location.pathname == "/project.html"){
  //console.log('bienvenue sur mon portfolio');
}

if(window.location.pathname == "/contact.html"){
  //console.log('bienvenue sur mon portfolio');
}
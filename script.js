// ===============================
// 2B2R Ultimate Script
// ===============================

// ---------- Copy IP ----------

const copyButton = document.getElementById("copy");

copyButton.addEventListener("click", () => {

    navigator.clipboard.writeText("policy-stuck.gl.joinmc.link");

    copyButton.innerHTML = "COPIED ✓";

    setTimeout(() => {

        copyButton.innerHTML = "COPY IP";

    },2000);

});

// ---------- Fake Player Counter ----------

const playerText = document.getElementById("players");

let players = 0;

setInterval(()=>{

    players += Math.floor(Math.random()*4);

    if(players>500){

        players = Math.floor(Math.random()*50);

    }

    playerText.innerHTML = players + " / 500";

},4000);

// ---------- Three.js ----------

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(

60,

window.innerWidth/window.innerHeight,

0.1,

2000

);

camera.position.z = 120;

const renderer = new THREE.WebGLRenderer({

canvas:document.getElementById("bg"),

alpha:true,

antialias:true

});

renderer.setSize(

window.innerWidth,

window.innerHeight

);

renderer.setPixelRatio(

window.devicePixelRatio

);

// ---------- Stars ----------

const starGeometry = new THREE.BufferGeometry();

const starCount = 20000;

const positions = [];

for(let i=0;i<starCount;i++){

    positions.push(

        (Math.random()-0.5)*3000,

        (Math.random()-0.5)*3000,

        (Math.random()-0.5)*3000

    );

}

starGeometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(

positions,

3

)

);

const starMaterial = new THREE.PointsMaterial({

size:2,

color:0xffffff

});

const stars = new THREE.Points(

starGeometry,

starMaterial

);

scene.add(stars);

// ---------- Neon Cubes ----------

const cubes=[];

for(let i=0;i<150;i++){

    const cube = new THREE.Mesh(

        new THREE.BoxGeometry(

            Math.random()*2+1,

            Math.random()*2+1,

            Math.random()*2+1

        ),

        new THREE.MeshStandardMaterial({

            color:new THREE.Color(

                Math.random(),

                Math.random(),

                1

            ),

            emissive:new THREE.Color(

                Math.random(),

                0,

                1

            ),

            emissiveIntensity:2

        })

    );

    cube.position.set(

        (Math.random()-0.5)*350,

        (Math.random()-0.5)*250,

        (Math.random()-0.5)*350

    );

    scene.add(cube);

    cubes.push(cube);

}

// ---------- Lights ----------

const light1 = new THREE.PointLight(0x7a00ff,8);

light1.position.set(80,80,80);

scene.add(light1);

const light2 = new THREE.PointLight(0x00bfff,8);

light2.position.set(-80,-80,80);

scene.add(light2);

scene.add(new THREE.AmbientLight(0xffffff,0.8));

// ---------- Mouse ----------

let mouseX = 0;

let mouseY = 0;

document.addEventListener("mousemove",(e)=>{

    mouseX =

    (e.clientX/window.innerWidth-.5)*30;

    mouseY =

    (e.clientY/window.innerHeight-.5)*30;

});

// ---------- Animation ----------

function animate(){

    requestAnimationFrame(animate);

    stars.rotation.y += 0.0004;

    stars.rotation.x += 0.0002;

    cubes.forEach((cube,index)=>{

        cube.rotation.x += 0.01;

        cube.rotation.y += 0.01;

        cube.position.y +=

        Math.sin(Date.now()*0.001+index)*0.02;

    });

    camera.position.x +=

    (mouseX-camera.position.x)*0.05;

    camera.position.y +=

    (-mouseY-camera.position.y)*0.05;

    camera.lookAt(scene.position);

    renderer.render(scene,camera);

}

animate();

// ---------- Resize ----------

window.addEventListener("resize",()=>{

    camera.aspect=

    window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

});

const  answer = $("input.answer");
let answerTxt = "";
let answerFocus = false;


Physijs.scripts.worker = '../vendor/physijs_worker.js';
Physijs.scripts.ammo = '../vendor/ammo.js';

var scene = new Physijs.Scene;
scene.setGravity(new THREE.Vector3(0, -10, 0));

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 20 );
var renderer = new THREE.WebGLRenderer({ alpha: true });
document.getElementById("threejs").appendChild(renderer.domElement);
// control = new THREE.OrbitControls(camera, renderer.domElement);

//SIZE ---------
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
})
renderer.setClearColor( 0x000000, 0 );
renderer.toneMapping = THREE.LinearToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//CAMERA--------
camera.position.set(0, 12, 8);
camera.lookAt(0, 0, 0);  


// Light --------
let hemiLight = new THREE.HemisphereLight( 0xEBF7FD, 0xEBF7FD, 0.2 );
hemiLight.position.set( 0, 20, 20 );
scene.add( hemiLight );

var heroLight = new THREE.SpotLight( 0xffffff, 1, 20, 0.8, 1, 0);
heroLight.position.set( 0, 6, 0);
heroLight.castShadow = true;  
heroLight.receiveShadow = true;
heroLight.shadow.mapSize.width = 9000;
heroLight.shadow.mapSize.height = 9000;
scene.add( heroLight );

var lampLight = new THREE.SpotLight( 0xff0000, 0, 20, 0.8, 1, 0);
lampLight.position.set( 0, 4, 0);
lampLight.castShadow = true;  
lampLight.receiveShadow = true;
lampLight.shadow.mapSize.width = 9000;
lampLight.shadow.mapSize.height = 9000;
scene.add( lampLight );


// common Mat
const commonMat = new THREE.MeshStandardMaterial({color: 0xffffff});

// Hero --------
const heroHeadGeo = new THREE.SphereGeometry(0.5, 30, 30);
const heroHead = new THREE.Mesh(heroHeadGeo, commonMat);
heroHead.position.set(0, 0.5, 0);
heroHead.castShadow = true;
heroHead.receiveShadow = true;
scene.add(heroHead);

const heroBodyGeo = new THREE.CylinderBufferGeometry(0.25, 0.5, 2, 20);
const heroBody = new Physijs.BoxMesh(heroBodyGeo, commonMat);
heroBody.castShadow = true;
heroBody.receiveShadow = true;
heroBody.position.set(0, 2, 0);
scene.add(heroBody);

heroLight.target = heroBody;


// First Dead --------
const DeadHeadGeo = new THREE.SphereGeometry(0.5, 15, 30);
const DeadHead = new THREE.Mesh(DeadHeadGeo, commonMat);
DeadHead.position.set(1, -1.5, -4);
DeadHead.castShadow = true;
DeadHead.receiveShadow = true;
scene.add(DeadHead);

const DeadBodyGeo = new THREE.CylinderBufferGeometry(0.25, 0.5, 2, 20);
const DeadBody = new THREE.Mesh(DeadBodyGeo, commonMat);
DeadBody.castShadow = true;
DeadBody.receiveShadow = true;
DeadBody.position.set(2, -1.5, -5);
DeadBody.rotation.set(1.2, 0, 0);
scene.add(DeadBody);

// Second Dead --------
const DeadHeadGeo2 = new THREE.SphereGeometry(0.5, 15, 30);
const DeadHead2 = new THREE.Mesh(DeadHeadGeo2, commonMat);
DeadHead2.position.set(-3, -1.5, -15);
DeadHead2.castShadow = true;
DeadHead2.receiveShadow = true;
scene.add(DeadHead2);

const DeadBodyGeo2 = new THREE.CylinderBufferGeometry(0.25, 0.5, 2, 20);
const DeadBody2 = new THREE.Mesh(DeadBodyGeo2, commonMat);
DeadBody2.castShadow = true;
DeadBody2.receiveShadow = true;
DeadBody2.position.set(-2, -1.5, -13);
DeadBody2.rotation.set(1.2, 0, 2);
scene.add(DeadBody2);


// mtl 포함 obj----------------------------------------------------
function prosecution(){
    var pro_mtl =  new THREE.MTLLoader(),
    mtl_Src = "../fbx/prosecution.mtl";
    pro_3D = new THREE.Object3D;

    pro_mtl.load(mtl_Src, function (materials){
    materials.preload();

    var testobj = new THREE.OBJLoader();

    testobj.setMaterials(materials);
    
    testobj.load('../fbx/prosecution.obj', 
        function (object) {
            pro_3D = object;
            pro_3D.castShadow = true;
            pro_3D.receiveShadow = true;
            pro_3D.scale.set(2, 2, 2);
            pro_3D.position.set(16, -2, 0);
            pro_3D.rotation.set(0, Math.PI / 2 * -1, 0);
            scene.add(pro_3D);
    })
});
}

function police(){
    var police_mtl =  new THREE.MTLLoader(),
    mtl_Src = "../fbx/police.mtl";
    police_3D = new THREE.Object3D;

    police_mtl.load(mtl_Src, function (materials){
    materials.preload();

    var testobj = new THREE.OBJLoader();

    testobj.setMaterials(materials);
    
    testobj.load('../fbx/police.obj', 
        function (object) {
            police_3D = object;
            police_3D.castShadow = true;
            police_3D.receiveShadow = true;
            police_3D.scale.set(3, 3, 3);
            police_3D.position.set(-16, -2, 0);
            police_3D.rotation.set(0, Math.PI / 2 * -1, 0);
            scene.add(police_3D);
        })
    });
}

function hanzo(){
    var han_mtl =  new THREE.MTLLoader(),
    mtl_Src = "../fbx/hanzo.mtl";
    han_3D = new THREE.Object3D;

han_mtl.load(mtl_Src, function (materials){
    materials.preload();

    var testobj = new THREE.OBJLoader();

    testobj.setMaterials(materials);
    
    testobj.load('../fbx/hanzo.obj', 
        function (object) {
            han_3D = object;
            han_3D.castShadow = true;
            han_3D.receiveShadow = true;
            han_3D.scale.set(1.5, 1.5, 1.5);
            han_3D.position.set(0, -2, 9);
            han_3D.rotation.set(0, Math.PI / 2 * -1, 0);
            scene.add(han_3D);
    })
});
}

function prison(){
    var pri_mtl =  new THREE.MTLLoader(),
    mtl_Src = "../fbx/prison.mtl";
    pri_3D = new THREE.Object3D;

    pri_mtl.load(mtl_Src, function (materials){
    materials.preload();

    var testobj = new THREE.OBJLoader();

    testobj.setMaterials(materials);
    
    testobj.load('../fbx/prison.obj', 
        function (object) {
            pri_3D = object;
            pri_3D.castShadow = true;
            pri_3D.receiveShadow = true;
            pri_3D.scale.set(3, 3, 3);
            pri_3D.position.set(0, -1.8, 0);
            pri_3D.rotation.set(0, Math.PI / 2 * -1, 0);
            scene.add(pri_3D);
        })
    });
}

function car(){
    var car_mtl =  new THREE.MTLLoader(),
    mtl_Src = "../fbx/car.mtl";
    car_3D = new THREE.Object3D;

    car_mtl.load(mtl_Src, function (materials){
    materials.preload();

    var testobj = new THREE.OBJLoader();

    testobj.setMaterials(materials);
    
    testobj.load('../fbx/car.obj', 
        function (object) {
            car_3D = object;
            car_3D.castShadow = true;
            car_3D.receiveShadow = true;
            car_3D.scale.set(2, 2, 2);
            car_3D.position.set(11.5, -2, -11.5);
            car_3D.rotation.set(0, Math.PI / 2 * -1.5, 0);
            scene.add(car_3D);
        })
    });
}

function npc(){
    let x = -17,
        z = -17;

    const npcGeo_hat_deco = new THREE.OctahedronGeometry(0.2,1);
    const npcHat_Deco = new THREE.Mesh(npcGeo_hat_deco, commonMat);
    npcHat_Deco.position.set(x, 2, z);
    npcHat_Deco.castShadow = true;
    npcHat_Deco.receiveShadow = true;
    scene.add(npcHat_Deco);

    const npcGeo_hat = new THREE.ConeGeometry(0.5, 1.5, 30);
    const npcHat = new THREE.Mesh(npcGeo_hat, commonMat);
    npcHat.position.set(x, 1, z);
    npcHat.castShadow = true;
    npcHat.receiveShadow = true;
    scene.add(npcHat);

    const npcGeo = new THREE.SphereGeometry(0.5, 30, 30);
    const npcHead = new THREE.Mesh(npcGeo, commonMat);
    npcHead.position.set(x, 0, z);
    npcHead.castShadow = true;
    npcHead.receiveShadow = true;
    scene.add(npcHead);

    const npcGeo_body = new THREE.CylinderBufferGeometry(0.25, 0.5, 2, 20);
    const npcBody = new THREE.Mesh(npcGeo_body, commonMat);
    npcBody.castShadow = true;
    npcBody.receiveShadow = true;
    npcBody.position.set(x, -1, z);
    scene.add(npcBody);
}

function npc_2(){
    let x = -7,
        z = 5;

    const npcGeo = new THREE.SphereGeometry(0.4, 30, 30);
    const npcHead = new THREE.Mesh(npcGeo, commonMat);
    npcHead.position.set(x, 0, z);
    npcHead.castShadow = true;
    npcHead.receiveShadow = true;
    scene.add(npcHead);

    const npcGeo_body = new THREE.CylinderBufferGeometry(0.2, 0.5, 2, 20);
    const npcBody = new THREE.Mesh(npcGeo_body, commonMat);
    npcBody.castShadow = true;
    npcBody.receiveShadow = true;
    npcBody.position.set(x, -1, z);
    scene.add(npcBody);
}

function npc_3(){
    let x = 13,
        z = 9;

    const npcGeo = new THREE.SphereGeometry(0.5, 30, 30);
    const npcHead = new THREE.Mesh(npcGeo, commonMat);
    npcHead.position.set(x, 0, z);
    npcHead.castShadow = true;
    npcHead.receiveShadow = true;
    scene.add(npcHead);

    const npcGeo_body = new THREE.CylinderBufferGeometry(0.25, 0.5, 2, 20);
    const npcBody = new THREE.Mesh(npcGeo_body, commonMat);
    npcBody.castShadow = true;
    npcBody.receiveShadow = true;
    npcBody.position.set(x, -1, z);
    scene.add(npcBody);
}

function lamp(){
    var lamp_mtl =  new THREE.MTLLoader(),
    mtl_Src = "../fbx/lamp.mtl";
    lamp_3D = new THREE.Object3D;

    lamp_mtl.load(mtl_Src, function (materials){
    materials.preload();

    var testobj = new THREE.OBJLoader();

    testobj.setMaterials(materials);
    
    testobj.load('../fbx/lamp.obj', 
        function (object) {
            lamp_3D = object;
            lamp_3D.castShadow = true;
            lamp_3D.receiveShadow = true;
            lamp_3D.scale.set(9, 9, 9);
            lamp_3D.position.set(0, -1.8, 0);
            lamp_3D.rotation.set(0, Math.PI / 2 * -1, 0);
            scene.add(lamp_3D);
        })
    });
}




// Set-1
const groundGeo = new THREE.PlaneGeometry(10, 10, 1, 1);
const ground = new Physijs.BoxMesh(groundGeo, commonMat);
ground.rotation.x += Math.PI / 2 * -1;
ground.position.set(0, -2, -2);
ground.castShadow = true; 
ground.receiveShadow = true;
scene.add(ground);

// Set-2
const groundGeo2 = new THREE.PlaneGeometry(10, 10, 1, 1);
const ground_2 = new Physijs.BoxMesh(groundGeo2, commonMat);
ground_2.rotation.x += Math.PI / 2 * -1;
ground_2.position.set(0, -14, -11);
ground_2.castShadow = true; 
ground_2.receiveShadow = true;
scene.add(ground_2);

// Set-3
const groundGeo3 = new THREE.PlaneGeometry(45, 45, 1, 1);
const ground_3 = new Physijs.BoxMesh(groundGeo3, commonMat);
ground_3.rotation.x += Math.PI / 2 * -1;
ground_3.position.set(0, -14, -8);
ground_3.castShadow = true; 
ground_3.receiveShadow = true;
scene.add(ground_3);


// Fog ---------
const near = 0.1;
const far = 25; // 18
const color = 0x000000;
scene.fog = new THREE.Fog(color, near, far);
scene.background = new THREE.Color(color);


// Event -------
let w, s, a, d,
    groundUp_2 = false,
    groundUp_3 = false,
    speed, 
    run = false,
    create = true,
    set3 = false,
    count_pol = false,
    count_pro = false,
    count_han = false,
    isFailDead = false,
    isFailCatch = false,
    isSuccexx = false,
    isFinal = false;
    

function keyEvent(){
    if(!run){
        speed = 0.1;
    }else{
        speed = 0.2;
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    function onKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 87) {
            w = true;
        }else if (keyCode == 83) {
            s = true;
        } 
        else if (keyCode == 65) {
            a = true;
        } else if (keyCode == 68) {
            d = true;
        }else if (keyCode == 16) {
            run = true;
        } 

    };
    function onKeyUp(event) {
        var keyCode = event.which;
        if (keyCode == 87) {
            w = false;
        } else if (keyCode == 83) {
            s = false;
        } else if (keyCode == 65) {
            a = false;
        } else if (keyCode == 68) {
            d = false;
        }else if (keyCode == 16) {
            run = false;
        } 
    }; 
    if(w){
            heroBody.position.z -= speed;
            heroBody.__dirtyPosition = true;
    }
    if(s){
        heroBody.position.z += speed;  
        heroBody.__dirtyPosition = true;
    }
    if(a){
        heroBody.position.x -= speed;  
        heroBody.__dirtyPosition = true;
    }
    if(d){
        heroBody.position.x += speed; 
        heroBody.__dirtyPosition = true; 
    }
    heroHead.position.x = heroBody.position.x;
    heroHead.position.z = heroBody.position.z;
    heroHead.position.y = heroBody.position.y + 1.2;
    camera.position.z = heroBody.position.z + 8;
    camera.position.x = heroBody.position.x;
    heroLight.position.z = heroBody.position.z + 1;
    heroLight.position.x = heroBody.position.x + 1;

};
function set_2(){
    if(heroBody.position.x > 0.5 && heroBody.position.x < 3 && heroBody.position.z < -3.5 && heroBody.position.z > -6.5){
        if(camera.position.y > 7 ){
            $("div.part_1").css("opacity", 1);
            groundUp_2 = true;
        }
    }else
    {
        $("div.part_1").css("opacity", 0);
    }
    if(groundUp_2 && ground_2.position.y < -1.9){
        ground_2.position.y += 0.08;
        ground_2.__dirtyPosition = true;
    }
}
function set_3(){
    if(heroBody.position.x > -3.5 && heroBody.position.x < -1.2 && heroBody.position.z < -12.5 && heroBody.position.z > -15.5){
        $("div.part_2").css("opacity", 1);
        groundUp_3 = true;
        building();
    }else{
        $("div.part_2").css("opacity", 0);
    }
    if(groundUp_3 && ground_3.position.y < -1.9){
        ground_3.position.y += 0.06;
        ground_3.__dirtyPosition = true;
    }
}
function building(){
    if(create){
        prosecution();
        police();
        hanzo();
        prison();
        lamp();
        car();
        npc();
        npc_2();
        npc_3();
        create = false;
        set3 = true;
    }
}
function fall_hero(){
    if(heroBody.position.y < -10 || heroBody.rotation.x > 1 || heroBody.rotation.x < -1 || heroBody.rotation.z > 1 || heroBody.rotation.z < -1 || heroBody.rotation.y > 1 || heroBody.rotation.y < -1){
        Fail_Dead();
    }
}
function police_In(){
    if(heroBody.position.x > -18 && heroBody.position.x < -14 && heroBody.position.z < 2 && heroBody.position.z > -0.5){
        $("div.police").css("opacity", 1);
        count_pol = true;
    }else{
        $("div.police").css("opacity", 0);
    }
}
function Prosecution_In(){
    if(heroBody.position.x > 14 && heroBody.position.x < 18 && heroBody.position.z < 1.5 && heroBody.position.z > -1.5){
        $("div.Prosecution").css("opacity", 1);
        count_pro = true;
    }else{
        $("div.Prosecution").css("opacity", 0);
    }
}
function hanzo_In(){
    if(heroBody.position.x > -1.5 && heroBody.position.x < 1.5 && heroBody.position.z < 10 && heroBody.position.z > 8){
        $("div.hanzo").css("opacity", 1);
        count_han = true;
    }else{
        $("div.hanzo").css("opacity", 0);
    }
}
function car_In(){
    if(heroBody.position.x > 9.5 && heroBody.position.x < 14 && heroBody.position.z < -10 && heroBody.position.z > -13){
        $("div.part_3_car").css("opacity", 1);
    }else{
        $("div.part_3_car").css("opacity", 0);
    }
}
function npc_In(){
    if(heroBody.position.x > -18 && heroBody.position.x < -16 && heroBody.position.z < -16 && heroBody.position.z > -17.5){
        $("div.part_3_npc").css("opacity", 1);
    }else{
        $("div.part_3_npc").css("opacity", 0);
    }
}
function npc_2_In(){
    if(heroBody.position.x > -8 && heroBody.position.x < -6 && heroBody.position.z < 6 && heroBody.position.z > 4){
        $("div.part_3_npc_2").css("opacity", 1);
    }else{
        $("div.part_3_npc_2").css("opacity", 0);
    }
}
function npc_3_In(){
    if(heroBody.position.x > 12 && heroBody.position.x < 14 && heroBody.position.z < 10 && heroBody.position.z > 8){
        $("div.part_3_npc_3").css("opacity", 1);
    }else{
        $("div.part_3_npc_3").css("opacity", 0);
    }
}
function prison_In(){
    if(heroBody.position.x > -1.5 && heroBody.position.x < 1.5 && heroBody.position.z < 1.5 && heroBody.position.z > -1.5){
        $("div.part_3").css("opacity", 1);
        if(lampLight.intensity < 1){
            lampLight.intensity += 0.1;
        }
    }else{
        $("div.part_3").css("opacity", 0);
        if(lampLight.intensity > 0){
            lampLight.intensity -= 0.1;
        }
        if(lampLight.intensity < 0.1){
            lampLight.intensity = 0;
        }
    }
}
function prison_Answer_In(){
    if(heroBody.position.x > -1.5 && heroBody.position.x < 1.5 && heroBody.position.z < 1.5 && heroBody.position.z > -1.5 && !isFinal){
        answer.css({"opacity" : 1, "pointer-events" : "all"});
        if(lampLight.intensity < 1){
            lampLight.intensity += 0.1;
        }
    }else{
        answer.css({"opacity" : 0, "pointer-events" : "none"});
        if(lampLight.intensity > 0){
            lampLight.intensity -= 0.1;
        }
        if(lampLight.intensity < 0.1){
            lampLight.intensity = 0;
        }
    }
}
function anwerTyp(){
    answerTxt = answer.val();
}
function Fail_Dead(){
    isFailDead = true;
    isFinal = true;
}

// POSTPROCESSING
let composer;
composer = new POSTPROCESSING.EffectComposer(renderer);
composer.addPass(new POSTPROCESSING.RenderPass(scene,camera));

const effectPass = new POSTPROCESSING.EffectPass(
    camera,
    new POSTPROCESSING.BloomEffect()
);
effectPass.renderToScreen = true;
composer.addPass(effectPass);


//RENDER-------------------------------------------------------------------------------
const renderScene = new function renderScene() {
    requestAnimationFrame(renderScene);

    if(!isFailDead){
        if(!answerFocus){
            keyEvent();
        }
        fall_hero();
        set_2();
        set_3();
        if(set3){
            police_In();
            Prosecution_In();
            hanzo_In();
            car_In();
            npc_In();
            npc_2_In();
            npc_3_In();
            if(count_pol && count_pro && count_han){
                prison_Answer_In();
            }else{
                prison_In();
            }
        }
        anwerTyp();
    }else{
        $("div.Fail_Dead").addClass("deadTxt");
        setTimeout(()=>{
            location.reload();
        }, 6000)
    }

    if(isFinal){
        hemiLight.intensity -= 0.01;
        heroLight.intensity -= 0.01;
        lampLight.intensity -= 0.01;
    }


    // console.log(heroBody.position.x);
    // console.log(heroBody.position.y);
    // console.log(heroBody.position.z);



    scene.simulate(); 
    composer.render();
    // renderer.render(scene,camera);
}   

answer.focus(()=>{
    answerFocus = true;
})
answer.blur(()=>{
    answerFocus = false;
})
answer.keyup(key => {
    if (key.keyCode == 13) {
        if(answerTxt === "서동재"){
            isFinal = true;
        }else if(answerTxt === "황시목" || answerTxt === "이연재" || answerTxt === "이창준" || answerTxt === "장건" || answerTxt === "한여진"){
            isFinal = true;
            $("div.Fail_Catch").addClass("deadTxt");
            setTimeout(()=>{
                location.reload();
            }, 6000)
        }else{
            if(answer.hasClass("wrong")===false){
                answer.addClass("wrong");
                setTimeout(()=>{
                    answer.removeClass("wrong");
                }, 700)
            }

        }
    }
});

const introPage = $("div.intro"),
      startBtn = $("button.start_btn");


startBtn.click(()=>{
    introPage.css({"opacity" : 0, "pointer-events" : "none"})
    // threejs();
});


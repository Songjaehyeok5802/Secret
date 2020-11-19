


const  answer = $("input.answer");
let answerTxt = "";
let answerFocus = false;

function threejs() {

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
        var testmtl =  new THREE.MTLLoader(),
        mtl_Src = "../fbx/prosecution.mtl";
        main = new THREE.Object3D;

    testmtl.load(mtl_Src, function (materials){
        materials.preload();

        var testobj = new THREE.OBJLoader();

        testobj.setMaterials(materials);
        
        testobj.load('../fbx/prosecution.obj', 
            function (object) {
                main = object;
                main.castShadow = true;
                main.receiveShadow = true;
                main.scale.set(2, 2, 2);
                main.position.set(16, -2, 0);
                main.rotation.set(0, Math.PI / 2 * -1, 0);
                scene.add(main);
        })
    });
    }

    function police(){
        var testmtl =  new THREE.MTLLoader(),
        mtl_Src = "../fbx/police.mtl";
        main = new THREE.Object3D;

        testmtl.load(mtl_Src, function (materials){
        materials.preload();

        var testobj = new THREE.OBJLoader();

        testobj.setMaterials(materials);
        
        testobj.load('../fbx/police.obj', 
            function (object) {
                main = object;
                main.castShadow = true;
                main.receiveShadow = true;
                main.scale.set(3, 3, 3);
                main.position.set(-16, -2, 0);
                main.rotation.set(0, Math.PI / 2 * -1, 0);
                scene.add(main);
            })
        });
    }

    function hanzo(){
        var testmtl =  new THREE.MTLLoader(),
        mtl_Src = "../fbx/hanzo.mtl";
        main = new THREE.Object3D;

    testmtl.load(mtl_Src, function (materials){
        materials.preload();

        var testobj = new THREE.OBJLoader();

        testobj.setMaterials(materials);
        
        testobj.load('../fbx/hanzo.obj', 
            function (object) {
                main = object;
                main.castShadow = true;
                main.receiveShadow = true;
                main.scale.set(1.5, 1.5, 1.5);
                main.position.set(0, -2, 9);
                main.rotation.set(0, Math.PI / 2 * -1, 0);
                scene.add(main);
        })
    });
    }

    
    // Ground ---------
    // let groundScale = 25;
    const groundGeo = new THREE.PlaneGeometry(10, 10, 1, 1);
    const ground = new Physijs.BoxMesh(groundGeo, commonMat);
    ground.rotation.x += Math.PI / 2 * -1;
    ground.position.set(0, -2, -2);
    ground.castShadow = true; 
    ground.receiveShadow = true;
    scene.add(ground);


    const groundGeo2 = new THREE.PlaneGeometry(10, 10, 1, 1);
    const ground_2 = new Physijs.BoxMesh(groundGeo2, commonMat);
    ground_2.rotation.x += Math.PI / 2 * -1;
    ground_2.position.set(0, -14, -11);
    ground_2.castShadow = true; 
    ground_2.receiveShadow = true;
    scene.add(ground_2);

    const groundGeo3 = new THREE.PlaneGeometry(45, 45, 1, 1);
    const ground_3 = new Physijs.BoxMesh(groundGeo3, commonMat);
    ground_3.rotation.x += Math.PI / 2 * -1;
    ground_3.position.set(0, -14, -8);
    ground_3.castShadow = true; 
    ground_3.receiveShadow = true;
    scene.add(ground_3);


    // Fog ---------
    const near = 0.1;
    const far = 25;
    const color = 0x000000;
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(color);


    // Event -------
    let w, s, a, d,
        groundUp_2 = false,
        groundUp_3 = false,
        speed, 
        run = false;
        create = true;



    function keyEvent(){
        if(!run){
            speed = 0.05;
        }else{
            speed = 0.1;
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
                // camera.position.y -= 0.1;
                $("div.part_1").css("opacity", 1);
                groundUp_2 = true;
            }
        }else
        //if(camera.position.y < 12)
        {
            // camera.position.y += 0.1;
            $("div.part_1").css("opacity", 0);
        }
        if(groundUp_2 && ground_2.position.y < -1.9){
            ground_2.position.y += 0.06;
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
            create = false;
        }
    }
    function fall_hero(){
        if(heroBody.position.y < -10 || heroBody.rotation.x > 1 || heroBody.rotation.x < -1 || heroBody.rotation.z > 1 || heroBody.rotation.z < -1 || heroBody.rotation.y > 1 || heroBody.rotation.y < -1){
            location.reload();
        }
    }
    function police_In(){
        if(heroBody.position.x > -18 && heroBody.position.x < -14 && heroBody.position.z < 2 && heroBody.position.z > -0.5){
            $("div.police").css("opacity", 1);
        }else{
            $("div.police").css("opacity", 0);
        }
    }
    function Prosecution_In(){
        if(heroBody.position.x > 14 && heroBody.position.x < 18 && heroBody.position.z < 1.5 && heroBody.position.z > -1.5){
            $("div.Prosecution").css("opacity", 1);
        }else{
            $("div.Prosecution").css("opacity", 0);
        }
    }
    function hanzo_In(){
        if(heroBody.position.x > -1.5 && heroBody.position.x < 1.5 && heroBody.position.z < 10 && heroBody.position.z > 8){
            $("div.hanzo").css("opacity", 1);
        }else{
            $("div.hanzo").css("opacity", 0);
        }
    }
    function anwerTyp(){
        answerTxt = answer.val();
    }



    //RENDER-------------------------------------------------------------------------------
    const renderScene = new function renderScene() {
        requestAnimationFrame(renderScene);

        if(!answerFocus){
            keyEvent();
        }
        set_2();
        set_3();
        fall_hero();
        police_In();
        Prosecution_In();
        hanzo_In();
        anwerTyp();



        // console.log(heroBody.position.x);
        // console.log(heroBody.position.y);
        // console.log(heroBody.position.z);



        scene.simulate(); 
        renderer.render(scene,camera);
    }   
}
threejs();




answer.focus(()=>{
    answerFocus = true;
})

answer.blur(()=>{
    answerFocus = false;
})
answer.keydown(key => {
    if (key.keyCode == 13) {
        if(answerTxt === "서동재"){
            console.log("정답");
        }else{
            console.log("오답");
        }
    }
});

    

const introPage = $("div.intro"),
      startBtn = $("button.start_btn");


startBtn.click(()=>{
    introPage.css({"opacity" : 0, "pointer-events" : "none"})
    // threejs();
});


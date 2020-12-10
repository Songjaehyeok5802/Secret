console.clear();
const IS_TOUCH = 'ontouchstart' in window,
      introPage = $("div.intro"),
      startBtn = $("button.start_btn"),
      pad_wrap = $("div.pad_wrap");

console.log(IS_TOUCH);


function game(){  
    const  answer = $("input.answer");
    let answerTxt = "";
    let answerFocus = false;


    Physijs.scripts.worker = '../vendor/physijs_worker.js';
    Physijs.scripts.ammo = '../vendor/ammo.js';

    var scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0, -10, 0));

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100 );
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
    camera.position.set(0, 12, 8);  // 0, 12, 8
    camera.lookAt(0, 0, 0);  


    // Light --------
    let hemiLight = new THREE.HemisphereLight( 0xEBF7FD, 0xEBF7FD, 0.2);
    hemiLight.position.set( 0, 20, 20 );
    scene.add( hemiLight );

    var heroLight = new THREE.SpotLight( 0xffffff, 1, 20, 0.8, 1, 0);
    heroLight.position.set( 0, 6, 0);
    heroLight.castShadow = true;  
    heroLight.receiveShadow = true;
    heroLight.shadow.mapSize.width = 9000;
    heroLight.shadow.mapSize.height = 9000;
    scene.add( heroLight );

    var heroLight_2 = new THREE.PointLight( 0xffffff, 1.5, 20, 0.8, 1, 0);
    heroLight_2.position.set( 0, 0, 1);
    scene.add( heroLight_2 );

    var lampLight = new THREE.SpotLight( 0xff0000, 0, 20, 0.8, 1, 0);
    lampLight.position.set( 0, 4, 0);
    lampLight.castShadow = true;  
    lampLight.receiveShadow = true;
    lampLight.shadow.mapSize.width = 9000;
    lampLight.shadow.mapSize.height = 9000;
    scene.add( lampLight );



    // common Mat
    const whiteMat = new THREE.MeshStandardMaterial({color: 0xffffff});
    const redMat = new THREE.MeshStandardMaterial({color: 0xff6767});
    const orangeMat = new THREE.MeshStandardMaterial({color: 0xffc067});
    const greenMat = new THREE.MeshStandardMaterial({color: 0x67ff9f});
    const greyMat = new THREE.MeshStandardMaterial({color: 0x7a7a7a});

    // Hero --------
    const heroHeadGeo = new THREE.SphereGeometry(0.5, 30, 30);
    const heroHead = new THREE.Mesh(heroHeadGeo, whiteMat);
    heroHead.position.set(0, 0.5, 0);
    heroHead.castShadow = true;
    heroHead.receiveShadow = true;
    // scene.add(heroHead);

    const heroBodyGeo = new THREE.CylinderBufferGeometry(0.2, 0.5, 2, 20);
    const heroBody = new Physijs.BoxMesh(heroBodyGeo, whiteMat);
    heroBody.castShadow = true;
    heroBody.receiveShadow = true;
    heroBody.position.set(0, 2, 0);
    scene.add(heroBody);

    heroLight.target = heroBody;


    // First Dead --------
    const DeadHeadGeo = new THREE.SphereGeometry(0.5, 15, 30);
    const DeadHead = new THREE.Mesh(DeadHeadGeo, redMat);
    DeadHead.position.set(1, -1.5, -4);
    DeadHead.castShadow = true;
    DeadHead.receiveShadow = true;
    scene.add(DeadHead);

    const DeadBodyGeo = new THREE.CylinderBufferGeometry(0.25, 0.5, 2, 20);
    const DeadBody = new THREE.Mesh(DeadBodyGeo, redMat);
    DeadBody.castShadow = true;
    DeadBody.receiveShadow = true;
    DeadBody.position.set(2, -1.5, -5);
    DeadBody.rotation.set(1.2, 0, 0);
    scene.add(DeadBody);

    // Second Dead --------
    const DeadHeadGeo2 = new THREE.SphereGeometry(0.5, 15, 30);
    const DeadHead2 = new THREE.Mesh(DeadHeadGeo2, redMat);
    DeadHead2.position.set(-3, -1.5, -15);
    DeadHead2.castShadow = true;
    DeadHead2.receiveShadow = true;
    // scene.add(DeadHead2);

    const DeadBodyGeo2 = new THREE.CylinderBufferGeometry(0.25, 0.5, 2, 20);
    const DeadBody2 = new THREE.Mesh(DeadBodyGeo2, redMat);
    DeadBody2.castShadow = true;
    DeadBody2.receiveShadow = true;
    DeadBody2.position.set(-2, -1.5, -13);
    DeadBody2.rotation.set(1.2, 0, 2);
    // scene.add(DeadBody2);

    const soulGeo = new THREE.OctahedronGeometry(0.5, 1);
    const soul = new THREE.Mesh(soulGeo, whiteMat);
    soul.position.set(1.5, -3, -5);
    scene.add(soul);


    let soulLight_inten = 0;
    var soulLight_up = new THREE.SpotLight( 0xe8ff68, soulLight_inten, 1, 0.4, 1, 0);
    soulLight_up.position.set( 1.5, 3, -5);
    soulLight_up.target = soul;
    scene.add(soulLight_up);

    var soulLight_down = new THREE.SpotLight( 0xffffff, soulLight_inten, 1, 0.4, 1, 0);
    soulLight_down.position.set( 1.5, -1, -5);
    soulLight_down.target = soul;
    scene.add(soulLight_down);

    var soulLight_left = new THREE.SpotLight( 0xa5d8ff, soulLight_inten, 1, 0.4, 1, 0);
    soulLight_left.position.set( 0, 1, -5);
    soulLight_left.target = soul;
    scene.add(soulLight_left);

    var soulLight_right = new THREE.SpotLight( 0xfff596, soulLight_inten, 1, 0.4, 1, 0);
    soulLight_right.position.set( 3, 1, -5);
    soulLight_right.target = soul;
    scene.add(soulLight_right);

    var soulLight_front = new THREE.SpotLight( 0xffffff, soulLight_inten, 1, 0.4, 1, 0);
    soulLight_front.position.set( 1.5, 1, -3);
    soulLight_front.target = soul;
    scene.add(soulLight_front);

    var soulLight_back = new THREE.SpotLight( 0xffffff, soulLight_inten, 1, 0.4, 1, 0);
    soulLight_back.position.set( 1.5, 1, -7);
    soulLight_back.target = soul;
    scene.add(soulLight_back);



    var deadLight = new THREE.SpotLight( 0xffffff, 0, 20, 0.8, 1, 0);
    deadLight.position.set( 1.3, 4, -4.5);
    deadLight.target = soul;
    deadLight.castShadow = true;
    deadLight.receiveShadow = true;
    deadLight.shadow.mapSize.width = 9000;
    deadLight.shadow.mapSize.height = 9000;
    scene.add(deadLight);




    // mtl 포함 obj----------------------------------------------------

    function player(){
        var pro_mtl =  new THREE.MTLLoader(),
        mtl_Src = "../fbx/Player.mtl";
        player_3D = new THREE.Object3D;

        pro_mtl.load(mtl_Src, function (materials){
        materials.preload();

        var testobj = new THREE.OBJLoader();

        testobj.setMaterials(materials);
        
        testobj.load('../fbx/Player.obj', 
            function (object) {
                player_3D = object;
                player_3D.castShadow = true;
                player_3D.receiveShadow = true;
                player_3D.scale.set(0.8, 0.8, 0.8);
                player_3D.position.set(0, -1, 0);
                heroBody.add(player_3D);
            })
        });
    }
    player();

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
        const npcHat_Deco = new THREE.Mesh(npcGeo_hat_deco, orangeMat);
        npcHat_Deco.position.set(x, 2, z);
        npcHat_Deco.castShadow = true;
        npcHat_Deco.receiveShadow = true;
        scene.add(npcHat_Deco);

        const npcGeo_hat = new THREE.ConeGeometry(0.5, 1.5, 30);
        const npcHat = new THREE.Mesh(npcGeo_hat, orangeMat);
        npcHat.position.set(x, 1, z);
        npcHat.castShadow = true;
        npcHat.receiveShadow = true;
        scene.add(npcHat);

        const npcGeo = new THREE.SphereGeometry(0.5, 30, 30);
        const npcHead = new THREE.Mesh(npcGeo, whiteMat);
        npcHead.position.set(x, 0, z);
        npcHead.castShadow = true;
        npcHead.receiveShadow = true;
        scene.add(npcHead);

        const npcGeo_body = new THREE.CylinderBufferGeometry(0.25, 0.5, 2, 20);
        const npcBody = new THREE.Mesh(npcGeo_body, whiteMat);
        npcBody.castShadow = true;
        npcBody.receiveShadow = true;
        npcBody.position.set(x, -1, z);
        scene.add(npcBody);
    }

    function npc_2(){
        let x = -7,
            z = 5;

        const npcGeo = new THREE.SphereGeometry(0.4, 30, 30);
        const npcHead = new THREE.Mesh(npcGeo, whiteMat);
        npcHead.position.set(x, 0, z);
        npcHead.castShadow = true;
        npcHead.receiveShadow = true;
        scene.add(npcHead);

        const npcGeo_body = new THREE.CylinderBufferGeometry(0.2, 0.5, 2, 20);
        const npcBody = new THREE.Mesh(npcGeo_body, whiteMat);
        npcBody.castShadow = true;
        npcBody.receiveShadow = true;
        npcBody.position.set(x, -1, z);
        scene.add(npcBody);
    }

    function npc_3(){
        let x = 13,
            z = 9;

        const npcGeo = new THREE.SphereGeometry(0.5, 30, 30);
        const npcHead = new THREE.Mesh(npcGeo, whiteMat);
        npcHead.position.set(x, 0, z);
        npcHead.castShadow = true;
        npcHead.receiveShadow = true;
        scene.add(npcHead);

        const npcGeo_body = new THREE.CylinderBufferGeometry(0.25, 0.5, 2, 20);
        const npcBody = new THREE.Mesh(npcGeo_body, whiteMat);
        npcBody.castShadow = true;
        npcBody.receiveShadow = true;
        npcBody.position.set(x, -1, z);
        scene.add(npcBody);
    }

    function npc_4(){
        let x = 14.5,
            z = -26.5;

        const npcGeo = new THREE.SphereGeometry(0.5, 30, 30);
        const npcHead = new THREE.Mesh(npcGeo, greenMat);
        npcHead.position.set(x, 0, z);
        npcHead.castShadow = true;
        npcHead.receiveShadow = true;
        scene.add(npcHead);

        const npcGeo_body = new THREE.CylinderBufferGeometry(0.25, 0.5, 2, 20);
        const npcBody = new THREE.Mesh(npcGeo_body, greenMat);
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
    const ground = new Physijs.BoxMesh(groundGeo, greyMat);
    ground.rotation.x += Math.PI / 2 * -1;
    ground.position.set(0, -2, -2);
    ground.castShadow = true; 
    ground.receiveShadow = true;
    scene.add(ground);

    // Set-2
    const groundGeo2 = new THREE.PlaneGeometry(10, 10, 1, 1);
    const ground_2 = new Physijs.BoxMesh(groundGeo2, greyMat);
    ground_2.rotation.x += Math.PI / 2 * -1;
    ground_2.position.set(0, -14, -11);
    ground_2.castShadow = true; 
    ground_2.receiveShadow = true;
    scene.add(ground_2);

    // Set-3
    const groundGeo3 = new THREE.PlaneGeometry(45, 45, 1, 1);
    const ground_3 = new Physijs.BoxMesh(groundGeo3, greyMat);
    ground_3.rotation.x += Math.PI / 2 * -1;
    ground_3.position.set(0, -20, -8);
    ground_3.castShadow = true; 
    ground_3.receiveShadow = true;
    scene.add(ground_3);


    // Fog ---------
    const near = 0.1;
    const far = 30; // 18
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
        set2 = false,
        set3 = false,
        count_pol = false,
        count_pro = false,
        count_han = false,
        carTxt = false,
        npcTxt_1 = false,
        npcTxt_2 = false,
        npcTxt_3 = false,
        isFailDead = false,
        isFailCatch = false,
        isSuccess = false,
        isFinal = false,
        isFinalTxt = false,
        success_Txt = false;
        particle_group = [],
        par_x = [],
        par_y = [],
        par_z = [],
        particle_Time = false;

        
    const evidence = $("div.evidence"),
          evidence_cast = $("ul.evidence_cast"),
          npcTxt = $("ul.npcTxt");

    

    function keyEvent(){
        if(!run){
            speed = 0.1;
        }else{
            speed = 0.2;
        }
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
        // heroHead.position.x = heroBody.position.x;
        // heroHead.position.z = heroBody.position.z;
        // heroHead.position.y = heroBody.position.y + 1.2;
        camera.position.z = heroBody.position.z + 8;
        camera.position.x = heroBody.position.x;
        heroLight.position.z = heroBody.position.z + 1;
        heroLight.position.x = heroBody.position.x + 1;
        heroLight_2.position.z = heroBody.position.z + 1;
        heroLight_2.position.x = heroBody.position.x;

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
        if(groundUp_2 && ground_2.position.y < -2.0){
            ground_2.position.y += 0.1;
            ground_2.__dirtyPosition = true;
        }
        if(ground_2.position.y > -2.0 && !set2){
            scene.add(DeadHead2);
            scene.add(DeadBody2);
            set2 = true;
        }

    }
    function set_3(){
        if(heroBody.position.x > -3.5 && heroBody.position.x < -1.2 && heroBody.position.z < -12.5 && heroBody.position.z > -15.5){
            $("div.part_2").css("opacity", 1);
            groundUp_3 = true;
            // building();
        }else{
            $("div.part_2").css("opacity", 0);
        }
        if(groundUp_3 && ground_3.position.y < -1.9){
            ground_3.position.y += 0.1;
            ground_3.__dirtyPosition = true;
        }
        if(ground_3.position.y > -1.9){
            building();
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
            npc_4();
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
            if(!count_pol){
                evidence_cast.append("<li><img src='./Img/police/Han.jpg' alt='한여진 이미지'><span>한여진</span></li>");
                evidence_cast.append("<li><img src='./Img/police/Jang.jpg' alt='장건 이미지'><span>장건</span></li>");
            }
            count_pol = true;
        }else{
            $("div.police").css("opacity", 0);
        }
    }
    function Prosecution_In(){
        if(heroBody.position.x > 14 && heroBody.position.x < 18 && heroBody.position.z < 1.5 && heroBody.position.z > -1.5){
            $("div.Prosecution").css("opacity", 1);
            if(!count_pro){
                evidence_cast.append("<li><img src='./Img/Prosecution/Hwang.jpg' alt='황시목 이미지'><span>황시목</span></li>");
                evidence_cast.append("<li><img src='./Img/Prosecution/Seo.jpg' alt='서동재 이미지'><span>서동재</span></li>");
            }
            count_pro = true;
        }else{
            $("div.Prosecution").css("opacity", 0);
        }
    }
    function hanzo_In(){
        if(heroBody.position.x > -1.5 && heroBody.position.x < 1.5 && heroBody.position.z < 10 && heroBody.position.z > 8){
            $("div.hanzo").css("opacity", 1);
            if(!count_han){
                evidence_cast.append("<li><img src='./Img/hanzo/LeeCh.jpg' alt='이창준 이미지'><span>이창준</span></li>");
                evidence_cast.append("<li><img src='./Img/hanzo/LeeYe.jpg' alt='이연재 이미지'><span>이연재</span></li>");
            }
            count_han = true;
        }else{
            $("div.hanzo").css("opacity", 0);
        }
    }
    function car_In(){
        if(heroBody.position.x > 9.5 && heroBody.position.x < 14 && heroBody.position.z < -10 && heroBody.position.z > -13){
            $("div.part_3_car").css("opacity", 1);
            if(!carTxt){
                npcTxt.append("<li> - 용의자의 옷은 어두운색이었다.</li>");
            }
            carTxt = true;
        }else{
            $("div.part_3_car").css("opacity", 0);
        }
    }
    function npc_In(){
        if(heroBody.position.x > -18 && heroBody.position.x < -16 && heroBody.position.z < -16 && heroBody.position.z > -17.5){
            $("div.part_3_npc").css("opacity", 1);
            if(!npcTxt_1){
                npcTxt.append("<li> - 그 사람이 통화하는 걸 들었는데 법을 잘 아는 것 같았어요.</li>");
            }
            npcTxt_1 = true;
        }else{
            $("div.part_3_npc").css("opacity", 0);
        }
    }
    function npc_2_In(){
        if(heroBody.position.x > -8 && heroBody.position.x < -6 && heroBody.position.z < 6 && heroBody.position.z > 4){
            $("div.part_3_npc_2").css("opacity", 1);
            if(!npcTxt_2){
                npcTxt.append("<li> - 안경을 썼던 것 같아요.</li>");
            }
            npcTxt_2 = true;
        }else{
            $("div.part_3_npc_2").css("opacity", 0);
        }
    }
    function npc_3_In(){
        if(heroBody.position.x > 12 && heroBody.position.x < 14 && heroBody.position.z < 10 && heroBody.position.z > 8){
            $("div.part_3_npc_3").css("opacity", 1);
            if(!npcTxt_3){
                npcTxt.append("<li> - 얼굴은 제대로 보이지 않았지만 주위는 밝았어요.</li>");
            }
            npcTxt_3 = true;
        }else{
            $("div.part_3_npc_3").css("opacity", 0);
        }
    }
    function npc_4_In(){
        if(heroBody.position.x > 13 && heroBody.position.x < 16 && heroBody.position.z < -25 && heroBody.position.z > -27.5){
            $("div.part_3_npc_4").css({"opacity": 1, "pointer-events" : "all"});
        }else{
            $("div.part_3_npc_4").css({"opacity": 0, "pointer-events" : "none"});
        }
    }
    function prison_In(){
        if(heroBody.position.x > -1.5 && heroBody.position.x < 1.5 && heroBody.position.z < 1.5 && heroBody.position.z > -1.5){
            $("div.part_3").css("opacity", 1);
            evidence.css("opacity", 1);
            if(lampLight.intensity < 1){
                lampLight.intensity += 0.1;
            }
        }else{
            $("div.part_3").css("opacity", 0);
            evidence.css("opacity", 0);
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
            evidence.css("opacity", 1);
            if(lampLight.intensity < 1){
                lampLight.intensity += 0.1;
            }
        }else{
            answer.css({"opacity" : 0, "pointer-events" : "none"});
            evidence.css("opacity", 0);
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
        isFinal = true;
        isFailDead = true;
        pad_wrap.removeClass("active");
    }
    function particle_start(){
        const particleGeo = new THREE.SphereGeometry(0.1, 10, 10);
        for(let i = 0 ; i < 1000 ; i++){
            const particle = new THREE.Mesh(particleGeo, whiteMat);
            particle.position.x = 1.5 + (Math.random() - Math.random());
            particle.position.y = 8 + (Math.random() - Math.random());
            particle.position.z = -5 + (Math.random() - Math.random());
            par_x.push(particle.position.x - 1.5);
            par_y.push(particle.position.y - 8);
            par_z.push(particle.position.z + 5);
            particle_group.push(particle);
            scene.add(particle);
        }
    }
    function Final_Txt(){
        $("div.Fianl_Group").children().eq(0).addClass("Final_Thank");
        setTimeout(()=>{
            $("div.Fianl_Group").children().eq(1).addClass("Final_Thank");
        }, 4000);
        setTimeout(()=>{
            $("div.Fianl_Group").children().eq(2).css({"opacity" : 1, "pointer-events" : "all"});
        }, 8000);
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

        if(!isFinal){
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
                npc_4_In();
                if(count_pol && count_pro && count_han){
                    prison_Answer_In();
                }else{
                    prison_In();
                }
            }
            anwerTyp();
        }else if(isFailDead){
            $("div.Fail_Dead").addClass("finalTxt").css({"pointer-events" : "all"});
            // setTimeout(()=>{
            //     location.reload();
            // }, 6000)
        }else if(isSuccess){
            for(let i = 0 ; i < particle_group.length ; i++){
                particle_group[i].position.x += par_x[i];
                particle_group[i].position.y += par_y[i];
                particle_group[i].position.z += par_z[i];
            }
            camera.lookAt(soul.position.x, soul.position.y, soul.position.z);
            soulLight_up.position.y = soul.position.y + 2;
            soulLight_down.position.y = soul.position.y - 2;
            soulLight_front.position.y = soul.position.y;
            soulLight_back.position.y = soul.position.y;
            soulLight_left.position.y = soul.position.y;
            soulLight_right.position.y = soul.position.y;
            if(soulLight_up.intensity < 1){
                soulLight_up.intensity +=0.01;
                soulLight_down.intensity +=0.01;
                soulLight_front.intensity +=0.01;
                soulLight_back.intensity +=0.01;
                soulLight_left.intensity +=0.01;
                soulLight_right.intensity +=0.01;
            }
            soul.position.y += 0.015;
            answer.css({"opacity" : 0, "pointer-events" : "none"});
            if(camera.position.x < 1.4){
                camera.position.x += 0.1;
            }
            if(camera.position.y > 2){
                camera.position.y -= 0.1;
            }
            if(camera.position.z > -2.1){
                camera.position.z -= 0.1;
            }
            if(lampLight.intensity < 0.1){
                lampLight.intensity = 0
            }else{
                lampLight.intensity -= 0.1;
            }
            if(heroLight.intensity < 0.1){
                heroLight.intensity = 0
            }else{
                heroLight.intensity -= 0.05;
            }
            if(deadLight.intensity < 0.7){
                deadLight.intensity += 0.1;
            }
            if(soul.position.y > 5 && !particle_Time){
                hemiLight.intensity = 1;
                particle_start();
                scene.remove(soul);
                particle_Time = true;
                if(!isFinalTxt){
                    Final_Txt();
                    isFinalTxt = true;
                }        
            }

            if(soul.position.y > 1.5 && !success_Txt){
                $("div.Success_Catch").css({"opacity" : 1});
                success_Txt = true;
            }else if(soul.position.y > 4){
                $("div.Success_Catch").css({"opacity" : 0});
            }
        }
        if(isFinal){
            if(!isSuccess){
                hemiLight.intensity -= 0.01;
                heroLight.intensity -= 0.01;
                lampLight.intensity -= 0.01;
            }
        }


        // console.log(camera.position.x);
        // console.log(camera.position.y);
        // console.log(camera.position.z);
        // console.log(heroBody.position.x);
        // console.log(heroBody.position.y);
        // console.log(heroBody.position.z);
        scene.simulate(); 
        composer.render();
    }

    const upBtn = document.querySelector("button.upBtn"),
          leftBtn = document.querySelector("button.leftBtn"),
          downBtn = document.querySelector("button.downBtn"),
          rightBtn = document.querySelector("button.rightBtn"),
          runBtn = document.querySelector("button.runBtn");    

    upBtn.addEventListener("touchstart", ()=>{w = true; });
    leftBtn.addEventListener("touchstart", ()=>{a = true;});
    downBtn.addEventListener("touchstart", ()=>{s = true;});
    rightBtn.addEventListener("touchstart", ()=>{d = true;});
    runBtn.addEventListener("touchstart", ()=>{run = true;});
    upBtn.addEventListener("touchend", ()=>{w = false;});
    leftBtn.addEventListener("touchend", ()=>{a = false;});
    downBtn.addEventListener("touchend", ()=>{s = false;});
    rightBtn.addEventListener("touchend", ()=>{d = false;});
    runBtn.addEventListener("touchend", ()=>{run = false;});

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

    answer.focus(()=>{
        answerFocus = true;
    })
    answer.blur(()=>{
        answerFocus = false;
    })
    answer.keyup(key => {
        if (key.keyCode == 13) {
            if(answerTxt === "서동재"){
                pad_wrap.removeClass("active");
                evidence.css("opacity", 0);
                isSuccess = true;
                isFinal = true;
            }else if(answerTxt === "황시목" || answerTxt === "이연재" || answerTxt === "이창준" || answerTxt === "장건" || answerTxt === "한여진"){
                isFinal = true;
                pad_wrap.removeClass("active");
                evidence.css("opacity", 0);
                answer.css({"opacity" : 0, "pointer-events" : "none"});
                $("div.Fail_Catch").addClass("finalTxt").css({"pointer-events" : "all"});
                // setTimeout(()=>{
                //     location.reload();
                // }, 6000)
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

    
}




// game();

startBtn.click(()=>{
    introPage.css({"opacity" : 0, "pointer-events" : "none"})
    if(IS_TOUCH){
        console.log(123);
        pad_wrap.addClass("active");
    }
    game();
});


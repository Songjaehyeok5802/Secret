
function threejs() {

    Physijs.scripts.worker = '../vendor/physijs_worker.js';
    Physijs.scripts.ammo = '../vendor/ammo.js';

    var scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0, -10, 0));

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    document.getElementById("threejs").appendChild(renderer.domElement);
    control = new THREE.OrbitControls(camera, renderer.domElement);

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

    var heroLight = new THREE.SpotLight( 0xffffff, 1, 10, 0.5, 1, 0);
    heroLight.position.set( 0, 5, 0);
    heroLight.castShadow = false;  
    heroLight.shadow.mapSize.width = 4500;
    heroLight.shadow.mapSize.height = 4500;
    scene.add( heroLight );
    
    // Hero --------
    const heroHeadGeo = new THREE.SphereGeometry(0.5, 30, 30);
    const heroHeadMat = new THREE.MeshStandardMaterial({color: 0xffffff});
    const heroHead = new THREE.Mesh(heroHeadGeo, heroHeadMat);
    heroHead.position.set(0, 0.5, 0);
    heroHead.castShadow = true;
    heroHead.receiveShadow = true;
    scene.add(heroHead);

    const heroBodyGeo = new THREE.CylinderBufferGeometry(0.25, 0.5, 2, 20);
    const heroBodyMat = new THREE.MeshStandardMaterial({color: 0xffffff});
    const heroBody = new Physijs.BoxMesh(heroBodyGeo, heroBodyMat);
    heroBody.castShadow = true;
    heroBody.receiveShadow = true;
    heroBody.position.set(0, 2, 0);
    scene.add(heroBody);

    heroLight.target = heroBody;


    // Dead --------
    const DeadHeadGeo = new THREE.SphereGeometry(0.5, 15, 30);
    const DeadHeadMat = new THREE.MeshStandardMaterial({color: 0xffffff});
    const DeadHead = new THREE.Mesh(DeadHeadGeo, DeadHeadMat);
    DeadHead.position.set(1, -1.5, -4);
    DeadHead.castShadow = true;
    DeadHead.receiveShadow = true;
    scene.add(DeadHead);

    const DeadBodyGeo = new THREE.CylinderBufferGeometry(0.25, 0.5, 2, 20);
    const DeadBodyMat = new THREE.MeshStandardMaterial({color: 0xffffff});
    const DeadBody = new THREE.Mesh(DeadBodyGeo, DeadBodyMat);
    DeadBody.castShadow = true;
    DeadBody.receiveShadow = true;
    DeadBody.position.set(2, -1.5, -5);
    DeadBody.rotation.set(1.2, 0, 0);
    scene.add(DeadBody);

    
    
    // Ground ---------
    // let groundScale = 25;
    const groundGeo = new THREE.PlaneGeometry(10, 10, 1, 1);
    const groundMat = new THREE.MeshStandardMaterial({color : 0xf0ffff});
    const ground = new Physijs.BoxMesh(groundGeo, groundMat);
    ground.rotation.x += Math.PI / 2 * -1;
    ground.position.set(0, -2, -2);
    ground.castShadow = true; 
    ground.receiveShadow = true;
    scene.add(ground);


    const ground_2 = new Physijs.BoxMesh(groundGeo, groundMat);
    ground_2.rotation.x += Math.PI / 2 * -1;
    ground_2.position.set(0, -12, -11.8);
    scene.add(ground_2);

    // Fog ---------
    const near = 0.1;
    const far = 40;
    const color = 0x000000;
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(color);

    let w, s, a, d;
    let groundUp = false;



    //RENDER-------------------------------------------------------------------------------
    const renderScene = new function renderScene() {
        requestAnimationFrame(renderScene);

        function keyEvent(){
            let speed = 0.05;
            document.addEventListener("keydown", onKeyDown);
            document.addEventListener("keyup", onKeyUp);
            function onKeyDown(event) {
                var keyCode = event.which;
                if (keyCode == 87) {
                    w = true;
                } else if (keyCode == 83) {
                    s = true;
                } else if (keyCode == 65) {
                    a = true;
                } else if (keyCode == 68) {
                    d = true;
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
            heroLight.position.x = heroBody.position.x;

        };
        keyEvent();

        if(heroBody.position.x > 0.5 && heroBody.position.x < 3 && heroBody.position.z < -3.5 && heroBody.position.z > -6.5){
            if(camera.position.y > 7 ){
                // camera.position.y -= 0.1;
                $("div.explain").css("opacity", 1);
                groundUp = true;
            }
        }else
        //if(camera.position.y < 12)
        {
            // camera.position.y += 0.1;
            $("div.explain").css("opacity", 0);
        }

        if(groundUp && ground_2.position.y < -1.9){
            ground_2.position.y += 0.1;
            ground_2.__dirtyPosition = true;
        }


        scene.simulate(); 
        renderer.render(scene,camera);
    }   
}
window.onload = threejs();


# Secret

2020년 학교에서 만든 드라마 "비밀의 숲" 웹사이트입니다.      
기존의 웹사이트 형식에서 벗어나 정보 전달이 목적이 아닌    
사용자에게 새로운 경험을 제공하고자 제작하였습니다.    



<hr />

## 사용 언어
 - HTML, CSS, JavaScript, jQuery, Three.js     

### 중점 작업  
1. 키보드로 3D 오브젝트를 컨트롤을 가능하게 만들었습니다.   
2. 스토리가 진행됨에 따라 해당하는 애니메이션과 텍스트를 활성화시켰습니다.    
3. 키보드가 없는 기기에서도 사용 가능하게 만들었습니다.
4. 포스트 프로세싱을 활용하여 비주얼적인 그래픽을 더하였습니다.

<hr />


## 웹사이트 구성

### Intro Page
페이지 로드 시 인트로 화면을 만들어 본 웹페이지의 개요와 조작법을 간단하게 설명하였습니다.    

<img src="./img/readme/intro.jpg" width="100%">

### Main Page


#### Scene - 1
메인 페이지입니다.
화면 중앙에 Maya 에서 모델링 한 오브젝트를 배치하였습니다.    
W, A, S, D로 상하좌우 키보드 컨트롤이 가능하며 Shift를 누를 시 속도가 증가합니다.     
오브젝트가 움직임에 따라 camera와 light가 같이 움직이게 하였습니다.    

JavaScript   

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
        camera.position.z = heroBody.position.z + 8;
        camera.position.x = heroBody.position.x;
        heroLight.position.z = heroBody.position.z + 1;
        heroLight.position.x = heroBody.position.x + 1;
        heroLight_2.position.z = heroBody.position.z + 1;
        heroLight_2.position.x = heroBody.position.x;
    };

<img src="./img/readme/scene_1.jpg" width="100%">

물리엔진을 적용시켜 중력을 구현하였습니다. 땅에서 떨어질 경우 죽는 엔딩을 제작하였습니다.     
엔딩 페이지에서는 다시 할 수 있는 버튼을 제작하였습니다.      

<img src="./img/readme/final_dead.png" width="100%">


#### Scene - 2
NPC에게 다가갈 시 텍스가 페이드인 되며 땅이 올라와 이동 범위를 확장시켜줍니다.      

JavaScript       

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

<img src="./img/readme/scene_2.jpg" width="100%">


#### Scene - 3

세 번째(마지막)땅이 올라오면 사용자는 NPC와 건물들을     
탐색하며 용의자와 증거를 찾습니다.     
찾은 단서들은 중앙 감옥에서 다시 확인할 수 있으며    
용의자를 모두 찾게 되면 범인을 검거합니다.     

<img src="./img/readme/scene_3.jpg" width="100%">
<img src="./img/readme/scene_4.jpg" width="100%">
<img src="./img/readme/scene_5.jpg" width="100%">


#### Scene - 3 검거에 실패

검거에 실패 시 화면이 어두워지며 간단한 멘트와    
다시하기 버튼이 나옵니다.

<img src="./img/readme/final_fail.png" width="100%">


#### Scene - 3 검거에 성공

카메라 position을 변경하여 포커스를 메인 오브젝트의 영혼에 집중시킵니다.    
영혼은 땅에서부터 하늘로 떠오르며 텍스트를 보여줍니다.      
포스트 프로세싱을 활용하여 빛을 번지게 하여     
화사한 분위기를 연출하였으며 오브젝트가 일정 높이 이상으로 올라가게 되면    
제거함과 동시에 작은 구체를 퍼뜨려 파티클 효과를 나타내었습니다.    
그 후 저의 이름과 사용 코드, 감사합니다. 라는 문구를 순서대로 보여주며 끝냈습니다.     

<img src="./img/readme/final_success_1.jpg.jpg" width="100%">
<img src="./img/readme/final_success_2.jpg.jpg" width="100%">
<img src="./img/readme/final_success_3.jpg.jpg" width="100%">

송재혁입니다.    
감사합니다!
window.onload = init;

var canvas;
var ctx;
var img;

var num = 1;

var su = 0; // blockValue의 인덱스

var walk_v = 0; // 걷기 값
var rotate_v = 0; // 회전 값

var now_location = 315; // 현재 위치
var now_top = 500;
var now_rotation = 0; // 현재 회전

 //아이템 사용 유무(아이템 여러게 되면 배열로 쓰면 될 듯)
var towel_flag = 0;
var thread_flag = 0;

var fish = false;
var see_fish = false;

var distinction = [0,]; // 구별할 수 있는 배열
var blockValue = [0,]; // 움직임이 담긴 배열

var heartSu = 0;

var one_fish = false;
var one_fishshop = false;


function init() {
    canvas = document.getElementById("stage2_gameMain");
    ctx = canvas.getContext("2d");
}

// '걷기' 블록
function walk(){

    distinction[num] = 'walk';
    blockValue[su] = 1;

    document.getElementById("play"+num).style.backgroundColor = "#f70044";
    num++;
    su++;
}

// '곱하기' 블록
function mutiply(){
    let result = prompt( '몇 만큼 곱할까요?', '' );

    if(distinction[num-1] === 'walk'){
        walk_v *= result;
    }
    else if(distinction[num-1] === 'rotate'){
        rotate_v *= result;
    }

    if(blockValue[su-1] == 1) {
        for(var i=0; i<result-1; i++) {
            blockValue[su] = 1;
            su++
        }
    } else if(blockValue[su-1] == 2) {
        for(var i=0; i<=result-3; i++) {
            blockValue[su] = 2;
            su++;
        }
    }
    
    document.getElementById("play"+num).style.backgroundColor = "#f5d601";
    num++;
}

// '회전' 블록 -> 파란색
function rotation(){

    distinction[num] = 'rotate';
    blockValue[su] = 2;

    document.getElementById("play"+num).style.backgroundColor = "#12cd86";
    num++;
    su++;
}

// '수건깔기' 블록
function towel() {

    distinction[num] = 'item';
    blockValue[su] = 3;
    towel_flag = 1;

    document.getElementById("play"+num).style.backgroundColor = "#066fa6";
    num++;
    su++;
}

// '실타래' 블록
function thread() {

    distinction[num] = 'item';
    blockValue[su] = 4;
    

    document.getElementById("play"+num).style.backgroundColor = "#b000e3";
    num++;
    su++;
}

// '쓰레기' 블록 -> 흰색
function trash(){

    num--;
    su--;

    // num이 0이 되면 .style을 읽을 때 오류가 나므로 1로 변경한다.
    if(num == 0){
        num = 1;
    }

    // 배열을 비워준다.
    distinction[num] = 0;

    blockValue.length = 0;
    su = -1;

    document.getElementById("play"+num).style.backgroundColor = "white";
}

// 플레이 버튼
function play(){

    let j =0;
 
    run = setInterval(function(){
    if(j==blockValue.length){
 
        for(let i=num; i>0; i--) {
            trash();
            su++;
        }

        clearInterval(run);
 
    }else{
    
        //alert(blockValue[j]);

        if(blockValue[j] == 1){ // 걷기일때
            walk_v += 120; // 10만큼 걷기 (기본값)
        }
        else if(blockValue[j] == 2){ // 회전일때
            rotate_v += 90; // 90도 돌기 (기본값)
        }
        else if(blockValue[j] == 3){ // 수건 놓기 아이템일때
            towel_flag = 1;
        }
        else if(blockValue[j] == 4){ // 실타래 아이템일때
            thread_flag = 1;
        }

        document.getElementById("cat").src="pic/stage/cat/cat2_side.png";

        console.log(blockValue);


        let cat = document.getElementById("cat");

        // 누적하기
        now_rotation += rotate_v;

        // 고양이 움직이기
        switch((now_rotation/90)%4) {
            case 1:
                now_top += walk_v;
                if(now_top > 510) {
                    alert("범위를 벗어났습니다!");
                    now_top = 500;
                }
                cat.style.top = now_top + "px";
                break;
            case 2:
                now_location -= walk_v;
                if(now_location < 310) {
                    alert("범위를 벗어났습니다!");
                    now_location = 315;
                }
                cat.style.left = now_location + "px";
                break;
            case 3:
                now_top -= walk_v;
                if(now_top < 128) {
                    alert("범위를 벗어났습니다!");
                    now_top = 140;
                }
                cat.style.top = now_top + "px";
                break;
            case 0:
                
                now_location += walk_v;
                if(now_location > 1050) {
                    alert("범위를 벗어났습니다!");
                    now_location = 1038;
                }
                cat.style.left = now_location + "px";
                break;
            }

        // 확인용
        console.log(now_top+"만큼 위에서 있서용");
        console.log(now_location+"만큼 걷기");
        console.log(now_rotation+"만큼 회전하기");
        
        // 쥐 충돌 처리
        if(now_top == 500 && now_location == 1035){
            gameover("mouse");
        }
        else if(now_top == 380 && now_location == 675){
            gameover("mouse");
        }

        // 물 웅덩이 충돌 처리
        if(now_top == 260 && now_location == 795  && towel_flag == 0){
            gameover("water");
        }
        else if( (now_location == 795 && now_top == 380) && (towel_flag == 1)){
            document.getElementById("stage2_towel1").style.display="block"; 
            towel_flag = 2;
        }
        else if( (now_location == 795 && now_top == 140) && (towel_flag == 1)){
            document.getElementById("stage2_towel1").style.display="block"; 
            towel_flag = 2;
        }
        else if( (now_location == 915 && now_top == 260) && (towel_flag == 1)){
            document.getElementById("stage2_towel1").style.display="block"; 
            towel_flag = 2;
        }

        // 맨홀 충돌 처리
        if(now_top == 260 && now_location == 555) {
            gameover("hall");
        }

        // 쓰레기통 충돌 처리
        if((now_top == 140 && now_location == 315)){
            gameover("trash");
        }
        else if(now_top == 260 && now_location == 1035) {
            gameover("trash");
        }

        // 실타래 충돌 처리
        if(now_top == 140 && now_location == 915 && thread_flag == 0) {
            gameover("thread");
        }
        else if(now_location == 795 && now_top == 140 && thread_flag == 1) {
            document.getElementById("stage2_thread1").style.display="block"; 
            thread_flag = 2;
        }
        else if(now_location == 915 && now_top == 260 && thread_flag == 1) {
            document.getElementById("stage2_thread1").style.display="block"; 
            thread_flag = 2;
        }

        // 끌리아
        if(now_location == 1035 && now_top == 140 && fish == true){
            document.getElementById("r_clearPage").style.visibility = "visible";
            document.getElementById("r_goBtn").style.visibility = "visible";
            document.getElementById("r_stopBtn").style.visibility = "visible";
        }
        else if(now_location == 1035 && now_top == 140 && fish == false) {
            document.getElementById("event_nogofishshop").style.display="block";
        }

        // 생선가게
        if(now_location == 675 && now_top == 260 && one_fishshop==fasle) {
            document.getElementById("event_arrivefishshop").style.display="block"; 
            document.getElementById("stage2_fish").style.display="block"; 
            see_fish = true;
            one_fishshop = true;
        }

        // 생선찾기
        if(now_location == 1035 && now_top == 380 && see_fish == true && one_fish==false) {
            document.getElementById("event_findfish").style.display="block"; 
            document.getElementById("stage2_fish").style.display="none"; 
            fish = true;
            one_fish=true;

        }

        cat.style.transform = 'rotate('+now_rotation+'deg)';
        
        walk_v -= walk_v;
        rotate_v -= rotate_v;

        j++;
    }
}, 600);

}

function heart() {
    heartSu++;
    if(heartSu<3) {
        var hrt = document.getElementById("hrt" + heartSu);
        hrt.style.visibility = "hidden";
    } else {
    document.getElementById("overPage").style.visibility = "visible";
    document.getElementById("restart").style.visibility = "visible";
    }
}

function gameover(reason){
    
    cat.style.left = '315px';
    cat.style.transform = 'rotate(0 deg)';
    cat.style.top = '500px';

    now_location = 315;
    now_rotation = 0;
    now_top = 500;

    document.getElementById("stage2_towel1").style.display="none"; 
    document.getElementById("cat").src="pic/stage/cat/cat2_front.png";

    // 레이어 팝업
    document.getElementById("gameOver").src = "pic/stage/gameOver/" + reason + ".png";
    document.getElementById("gameOver").style.visibility = "visible";
    document.getElementById("goBtn").style.visibility = "visible";
    document.getElementById("stopBtn").style.visibility = "visible";

    towel_flag=0;
    thread_flag=0;

    clearInterval(run);

}

function go() {
    heart();
    document.getElementById("gameOver").style.visibility = "hidden";
    document.getElementById("goBtn").style.visibility = "hidden";
    document.getElementById("stopBtn").style.visibility = "hidden";

    for(let i=num; i>0; i--) {
        trash();
        su++;
    }
}

function stop() {
    location.reload();
}

function restart() {
    location.reload();
    document.getElementById("overPage").style.visibility = "hidden";
    document.getElementById("restart").style.visibility = "hidden";
}
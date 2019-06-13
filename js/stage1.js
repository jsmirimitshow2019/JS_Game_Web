window.onload = init;

var canvas;
var ctx;
var img;

var num = 1;

var walk_v = 0; // 걷기 값
var rotate_v = 0; // 회전 값

var now_location = 315; // 현재 위치
var now_top = 500;
var now_rotation = 0; // 현재 회전

var itemFlag = 0; //아이템 사용 유무(아이템 여러게 되면 배열로 쓰면 될 듯)

var distinction = [0,]; // 구별할 수 있는 배열

var heartSu = 0;


function init() {
    canvas = document.getElementById("stage1_gameMain");
    ctx = canvas.getContext("2d");
}

// '걷기' 블록 -> 노란색
function walk(){

    distinction[num] = 'walk'; 
    walk_v += 125; // 10만큼 걷기 (기본값)

    document.getElementById("play"+num).style.backgroundColor = "yellow";
    num++;
}

// '곱하기' 블록 -> 초록색
function mutiply(){
    let result = prompt( '몇 만큼 곱할까요?', '' );

    if(distinction[num-1] === 'walk'){
        walk_v *= result;
    }
    else if(distinction[num-1] === 'rotate'){
        rotate_v *= result;
    }
    
    document.getElementById("play"+num).style.backgroundColor = "green";
    num++;
}

// '회전' 블록 -> 파란색
function rotation(){

    distinction[num] = 'rotate'; 
    rotate_v += 90; // 90도 돌기 (기본값)

    document.getElementById("play"+num).style.backgroundColor = "blue";
    num++;
}

// '아이템' 블록 -> 보라색
function item() {

    distinction[num] = 'item';
    
    if(itemFlag == 2){
        itemFlag = 3;
    }
    else {
        itemFlag = 1;
    }

    document.getElementById("play"+num).style.backgroundColor = "purple";
    num++;
}

// '쓰레기' 블록 -> 흰색
function trash(){

    num--;

    // num이 0이 되면 .style을 읽을 때 오류가 나므로 1로 변경한다.
    if(num == 0){
        num = 1;
    }

    // 배열을 비워준다.
    distinction[num] = 0; 

    document.getElementById("play"+num).style.backgroundColor = "white";
}

// 플레이 버튼
function play(){

    let cat = document.getElementById("cat");

    // 누적하기
    now_rotation += rotate_v;

    // 고양이 움직이기
    switch((now_rotation/90)%4) {
        case 1:
            now_top += walk_v;
            if(now_top > 540) {
                alert("범위를 벗어났습니다!");
                now_top = 495;
            }
            cat.style.top = now_top + "px";
            break;
        case 2:
            now_location -= walk_v;
            if(now_location < 300) {
                alert("범위를 벗어났습니다!");
                now_location = 315;
            }
            cat.style.left = now_location + "px";
            break;
        case 3:
            now_top -= walk_v;
            if(now_top < 218) {
                alert("범위를 벗어났습니다!");
                now_top = 250;
            }
            cat.style.top = now_top + "px";
            break;
        case 0:
            document.getElementById("cat").src="pic/stage/cat/cat1_side.png";
            now_location += walk_v;
            if(now_location > 980) {
                alert("범위를 벗어났습니다!");
                now_location = 915;
            }
            cat.style.left = now_location + "px";
            break;
        }

    // 확인용
    console.log(now_top+"만큼 위에서 있서용");
    console.log(now_location+"만큼 걷기");
    console.log(now_rotation+"만큼 회전하기");
    console.log(itemFlag+"아이템 상태");
    
    // 수건1 충돌처리
    if(now_location >= 440 && now_top == 500  && itemFlag == 0){
        gameover("water");

    }
    else if( (now_location >= 315 && now_top == 500) && (itemFlag == 1)){
        document.getElementById("stage1_towel1").style.display="block"; 
        itemFlag = 2;
    }
    else if( (now_location >= 440 && now_top == 375) && (itemFlag == 1)){
        document.getElementById("stage1_towel1").style.display="block"; 
        itemFlag = 2;
    }

    // 쥐 충돌처리
    if((now_top == 375 && now_location == 565)){
        gameover("mouse");
    }

    // 맨홀 충돌처리
    if((now_top == 250 && now_location == 440)){
        gameover("hall");
    }

    
    // 수건2 충돌처리
    if(now_location == 815 && now_top == 250  && itemFlag == 2){
        gameover("water");
    }
    else if( (now_location == 815 && now_top == 375) && (itemFlag == 3)){
        document.getElementById("stage1_towel2").style.display="block"; 
    }
    else if( (now_location == 690 && now_top == 250) && (itemFlag == 3)){
        document.getElementById("stage1_towel2").style.display="block"; 
    }

    
    // 끌리아
    if(now_location == 940 && now_top == 250){
        alert("클리어!");
        location.href="stage_2.html";
    }


    cat.style.transform = 'rotate('+now_rotation+'deg)';
    
    walk_v -= walk_v;
    rotate_v -= rotate_v;

    for(var i=num; i>0; i--) {
        trash();
    }


}

function heart() {
    heartSu++;
    if(heartSu<3) {
        var hrt = document.getElementById("hrt" + heartSu);
        hrt.style.visibility = "hidden";
    } else {
        alert("게임이 완전히 오버되었네용");
        location.reload();
    }
}

function gameover(reason){
    
    cat.style.left = '315px';
    cat.style.transform = 'rotate(0 deg)';
    cat.style.top = '500px';

    now_location = 315;
    now_rotation = 0;
    now_top = 500;

    document.getElementById("stage1_towel1").style.display="none"; 
    document.getElementById("stage1_towel2").style.display="none"; 
    document.getElementById("cat").src="pic/stage/cat/cat1_front.png";

    // 레이어 팝업
    document.getElementById("gameOver").src = "pic/stage/gameOver/" + reason + ".png";
    document.getElementById("gameOver").style.visibility = "visible";
    document.getElementById("goBtn").style.visibility = "visible";
    document.getElementById("stopBtn").style.visibility = "visible";

    itemFlag=0;

}

function go() {
    heart();
    document.getElementById("gameOver").style.visibility = "hidden";
    document.getElementById("goBtn").style.visibility = "hidden";
    document.getElementById("stopBtn").style.visibility = "hidden";
}

function stop() {
    location.reload();
}
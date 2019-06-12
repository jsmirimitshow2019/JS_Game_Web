window.onload = init;

var canvas;
var ctx;
var img;

var num = 1;

var walk_v = 0; // 걷기 값
var rotate_v = 0; // 회전 값

var now_location = 315; // 현재 위치
var now_top = 540;
var now_rotation = 0; // 현재 회전

var itemFlag = 0; //아이템 사용 유무(아이템 여러게 되면 배열로 쓰면 될 듯)

var distinction = [0,]; // 구별할 수 있는 배열



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
    itemFlag = 1;

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


    // 확인용
    console.log(now_top+"만큼 위에서 있서용");
    console.log(now_location+"만큼 걷기");
    console.log(now_rotation+"만큼 회전하기");


    // 고양이 움직이기
    switch((now_rotation/90)%4) {
    case 1:
        now_top += (walk_v-25);
        cat.style.top = now_top + "px";
        break;
    case 2:
        now_location -= walk_v;
        cat.style.left = now_location + "px";
        break;
    case 3:
        now_top -= (walk_v-25);
        cat.style.top = now_top + "px";
        break;
    case 0:
        now_location += walk_v;
        cat.style.left = now_location + "px";
        break;
    }

    // 수건1 충돌처리
    if(now_location >= 440 && now_top == 540 && itemFlag == 0){
        alert("게임 오버되었습니다. 사유 : 물에서 미끄러짐");
        cat.style.left = '315px';
        cat.style.transform = 'rotate(0 deg)';
        cat.style.top = '539.5px';

        now_location = 315;
        now_rotation = 0;
        now_top = 560;

    }
    else if(now_location >= 315 && now_top == 540 && itemFlag == 1){
        document.getElementById("stage1_towel1").style.display="block"; 
    }

    // 쥐 충돌처리
    if((now_top == 540 && now_location == 565) || (now_location >= 465 && now_location <= 440 )){
        alert("게임 오버되었습니다. 사유 : 쥐를 쫓다 도망감");

        console.log("찍직");
        console.log(now_top+"만큼 위에서 있서용");
        console.log(now_location+"만큼 걷기");
        console.log(now_rotation+"만큼 회전하기");

        // cat.style.left = '315px';
        // cat.style.transform = 'rotate(0 deg)';
        // cat.style.top = '539.5px';

        // now_location = 315;
        // now_rotation = 0;
        // now_top = 560;
    }

    
    // 끌리아
    if(now_location >= 900 && now_top <= 300){
        alert("끌리아!");
        now_location -= walk_v;
        now_rotation -= rotate_v;
    }


    cat.style.transform = 'rotate('+now_rotation+'deg)';
    
    walk_v -= walk_v;
    rotate_v -= rotate_v;

    for(var i=num; i>0; i--) {
        trash();
    }
}
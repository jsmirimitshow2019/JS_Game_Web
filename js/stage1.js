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

var itemFlag = 0; //아이템 사용 유무(아이템 여러게 되면 배열로 쓰면 될 듯)
var itemFlag2 = 0; //아이템 사용 유무(아이템 여러게 되면 배열로 쓰면 될 듯)

var distinction = [0,]; // 구별할 수 있는 배열
var blockValue = [0,]; // 움직임이 담긴 배열

var heartSu = 0;

var count = 0;


function init() {
    canvas = document.getElementById("stage1_gameMain");
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
        for(var i=0; i<=result-2; i++) {
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
function item() {

    distinction[num] = 'item';
    blockValue[su] = 3;
    

    document.getElementById("play"+num).style.backgroundColor = "#066fa6";
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
    blockValue[su] = 0;

    document.getElementById("play"+num).style.backgroundColor = "white";
}

function garbage() {
    num--;

    if(num == 0){
        num = 1;
    }

    distinction[num] = 0;
    blockValue.length = 0;
    su = -1;

    document.getElementById("play"+num).style.backgroundColor = "white";
}

// 플레이 버튼
function play(){

    count ++;
    let j =0;
 
    run = setInterval(function(){
    if(j==blockValue.length){
 
        for(let i=num; i>0; i--) {
            garbage();
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
        else if(blockValue[j] == 3){ // 아이템일때
            if(itemFlag == 2){
                itemFlag2 = 1;
            }
            else {
                itemFlag = 1;
            }
        }

        document.getElementById("cat").src="pic/stage/cat/cat1_side.png";

        console.log(blockValue);


        let cat = document.getElementById("cat");

        // 누적하기
        now_rotation += rotate_v;

        // 고양이 움직이기
        switch((now_rotation/90)%4) {
            case 1:
                now_top += walk_v;
                if(now_top > 510) {
                    gameover("wall");
                }
                cat.style.top = now_top + "px";
                break;
            case 2:
                now_location -= walk_v;
                if(now_location < 310) {
                    gameover("wall");
                }
                cat.style.left = now_location + "px";
                break;
            case 3:
                now_top -= walk_v;
                if(now_top < 218) {
                    gameover("wall");
                }
                cat.style.top = now_top + "px";
                break;
            case 0:
                
                now_location += walk_v;
                if(now_location > 980) {
                    gameover("wall");
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
        if(now_location == 435 && now_top == 500  && itemFlag == 0){
            gameover("water");
        }
        else if( (now_location == 315 && now_top == 500) && (itemFlag == 1)){
            document.getElementById("stage1_towel1").style.display="block"; 
            itemFlag = 2;
        }
        else if( (now_location >= 435 && now_top == 380) && (itemFlag == 1)){
            document.getElementById("stage1_towel1").style.display="block"; 
            itemFlag = 2;
        }

        // 쥐 충돌처리
        if((now_top == 380 && now_location == 555)){
            gameover("mouse");
        }

        // 맨홀 충돌처리
        if((now_top == 260 && now_location == 435)){
            gameover("hall");
        }

        // 쓰레기통 충돌처리
        if((now_top == 380 && now_location == 915)){
            gameover("trash");
        }
        

        
        // 수건2 충돌처리
        if(now_location == 795 && now_top == 260  && itemFlag2 == 0){
            gameover("water");
        }
        else if( (now_location == 795 && now_top == 380) && (itemFlag2 == 1)){
            document.getElementById("stage1_towel2").style.display="block"; 
        }
        else if( (now_location == 675 && now_top == 260) && (itemFlag2 == 1)){
            document.getElementById("stage1_towel2").style.display="block"; 
        }

        
        // 끌리아
        if(now_location == 915 && now_top == 260){
            document.getElementById("r_clearPage").style.visibility = "visible";
            document.getElementById("r_goBtn").style.visibility = "visible";
            document.getElementById("r_stopBtn").style.visibility = "visible";
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
    
    for(let i=num; i>0; i--) {
        garbage();
        su++;
    }

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

function gogo(){
    location.href='stage_2.html?asd6gv4ad6g65dfh1s='+count;
}


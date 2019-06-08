var num = 1;

var walk_v = 0; // 걷기 값
var rotate_v = 0; // 회전 값

var now_location = 0; // 현재 위치
var now_rotation = 0; // 현재 회전

var distinction = [0,]; // 구별할 수 있는 배열


// '걷기' 블록 -> 노란색
function walk(){

    distinction[num] = 'walk'; 
    walk_v += 10; // 10만큼 걷기 (기본값)

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
    rotate_v = 90; // 90도 돌기 (기본값)

    document.getElementById("play"+num).style.backgroundColor = "blue";
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
    now_location += walk_v;
    now_rotation += rotate_v;

    // 확인용
    console.log(now_location+"만큼 걷기");
    console.log(now_rotation+"만큼 회전하기");

    // 고양이 움직이기
    cat.style.left = now_location + "px";
    cat.style.transform = 'rotate('+now_rotation+'deg)';
    
}
var num = 1;

// '걷기' 블록 -> 빨간색
function walk(){
    document.getElementById("play"+num).style.backgroundColor = "red";
    num++;
}

// '곱하기' 블록 -> 초록색
function mutiply(){
    document.getElementById("play"+num).style.backgroundColor = "green";
    num++;
}

// '회전' 블록 -> 파란색
function rotation(){
    document.getElementById("play"+num).style.backgroundColor = "blue";
    num++;
}

// '쓰레기' 블록 -> 흰색
function trash(){
    num--;
    document.getElementById("play"+num).style.backgroundColor = "white";
}
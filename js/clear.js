window.onload = init;

var value;

var index = -1;


function init() {
    value  = getParameterByName('value');
    history.replaceState({}, null, location.pathname);

    var userName = prompt('당신의 총점은 ' + value + '점 입니다', '이름을 입력해주세요');
    if(userName == "" || userName == "이름을 입력해주세요") {
        userName = "익명";
    }

    // localStorage.clear();

    index = localStorage.getItem("index");
    if(index == null) {
        index = -1;
    }
    console.log("index: " + index);
    index++;

    localStorage.setItem("localName["+index+"]", userName);
    localStorage.setItem("localValue["+index+"]", value);
    localStorage.setItem("index", index);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
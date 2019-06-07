    meter = 0;
    document.getElementById("now").innerHTML = 0;

    function goRight(){
        var cat = document.getElementById("cat");
        var location = document.getElementById("rightMt").value;
        var num = document.getElementById("rightNum").value;

        for(var i=0; i<num; i++) {
            meter = Number(meter) +  Number(location);
            cat.style.left = meter + "px";
        }

        document.getElementById("now").innerHTML = meter;
    }

    function goLeft(){
        var cat = document.getElementById("cat");
        var location = document.getElementById("leftMt").value;
        var num = document.getElementById("leftNum").value;

        for(var i=0; i<num; i++) {
            meter = parseInt(cat.style.left) - Number(location);

            if(meter >= 0) {
                cat.style.left = meter + "px";
            } else {
                alert("왼쪽 끝입니당^_^");
                meter = 0;
                break;
            }
        }   

        document.getElementById("now").innerHTML = meter;
    }
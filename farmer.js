var answerArr = [];
var resultArr = [];
//生命起始值
var life = 3;
//農田總數
var groundnum = 3;
//生命值圖片路徑
var lifeImg = "pic/heart.png";
//計時4分鐘遊戲結束
//game = setTimeout(gameover, 240000);

//開始遊戲
function start() {
    init();
    displayLife(life);

    var startPage = document.getElementById('div_startpage');
    startPage.style.display = 'none';
    var game = document.getElementById('div_game');
    game.style.display = 'block';

}

//初始化
function init() {
    //顯示倒數畫面
    document.getElementById("div_precountdown").className =
        document.getElementById("div_precountdown").className.replace(/\bfadeOut\b/, '');

    var imageele = document.getElementsByClassName('precountdown');
    var image = 'pic/321.gif' + '?' + (new Date().getTime());
    imageele[0].style.background = 'url(' + image + ') center no-repeat';

    //清空陣列
    answerArr = [];
    resultArr = [];


    //產生resultArr
    generateRange(groundnum, 1, groundnum);

    //關卡設定
    levelSettings();
    //倒數畫面消失
    setTimeout(function () { fadeOutPrecount(div_precountdown); }, 4000);
}

//顯示生命值
function displayLife(life) {
    var element = document.getElementById('life');

    // for (i = 1; i <= life; i++) {
    //     var img = document.createElement('img');
    //     img.src = lifeImg;
    //     img.height = 25;
    //     img.width = 25;
    //     element.appendChild(img);
    // }

}

//關卡設定
function levelSettings() {
    //顯示ground
    for (i = 1; i <= resultArr.length; i++) {
        var grd = ("ground" + i).toString();
        var grdele = document.getElementById(grd);
        grdele.style.display = 'block';

        //隱藏growgif
        var grow = ("grow" + i).toString();
        var growele = document.getElementById(grow);
        growele.style.display = 'none';

        //隱藏harvestgif
        var harvest = ("harvest" + i).toString();
        var harvestele = document.getElementById(harvest);
        harvestele.classList.remove("changeZindexto0");
        harvestele.style.display = 'none';

    }
    for (i = 1; i <= groundnum; i++) {
        var id = ("ground" + i).toString();
        var element = document.getElementById(id);
        element.style.visibility = 'visible';

    }
    //現在關卡文字
    document.getElementById('levelInfo').innerHTML = groundnum - 2;


}

//產生亂數陣列
function generateRange(pCount, pMin, pMax) {
    min = pMin;
    max = pMax;
    //var resultArr = [], randNumber;
    while (pCount > 0) {
        randNumber = Math.round(min + Math.random() * (max - min));
        if (resultArr.indexOf(randNumber) == -1) {
            resultArr.push(randNumber);
            pCount--;
        }
    }
    console.log(resultArr)
    return resultArr;
}
//農作物生長
function grow() {

    var counter = 0;
    var i = setInterval(function () {
        hideground("ground" + resultArr[counter]);
        showgrow("grow" + resultArr[counter]);

        counter++;
        if (counter === resultArr.length) {
            clearInterval(i);
        }
    }, 4000);

}
//採收
function harvest(i) {
    if (answerArr.length < resultArr.length) {
        answerArr.push(i);
        console.log(answerArr);

        hidegrow("grow" + i);
        showharvest("harvest" + i);

        //如過採收完畢 則比較陣列
        if (answerArr.length == resultArr.length) {
            compareArray(resultArr, answerArr);
        }
    }
};

//比對陣列
function compareArray(resultArr, answerArr) {
    var result = _.isEqual(resultArr, answerArr);
    if (result == false) {
        answerWrong();

    } else if (result == true) {
        answerCorrect();
    }
    console.log(result);
}

//隱藏ground div區塊
function hideground(id) {
    var element = document.getElementById(id);

    element.style.display = 'none';
}

//顯示grow div區塊
function showgrow(id) {
    var element = document.getElementById(id);
    var imgele = element.getElementsByTagName('img')[0];

    element.style.display = 'unset';
    //imgele.style.vertical-align='top';
    if (id == "grow7" || id == "grow8" || id == "grow9") {
        imgele.src = "pic/carrot_left.gif" + '?' + (new Date().getTime());
    } else if (id == "grow1" || id == "grow2" || id == "grow3") {
        imgele.src = "pic/carrot_middle.gif" + '?' + (new Date().getTime());
    } else if (id == "grow4" || id == "grow5" || id == "grow6") {
        imgele.src = "pic/carrot_right.gif" + '?' + (new Date().getTime());
    }
}

//隱藏grow div區塊
function hidegrow(id) {
    var element = document.getElementById(id);
    element.style.display = 'none';
}

//顯示harvest div區塊
function showharvest(id) {
    var element = document.getElementById(id);
    var imgele = element.getElementsByTagName('img')[0];

    element.style.display = 'unset';
    if (id == "harvest7" || id == "harvest8" || id == "harvest9") {
        assignindex(id);
        imgele.src = "pic/pullcarrot_left.gif" + '?' + (new Date().getTime());
        //changeindex(id);
    } else if (id == "harvest1" || id == "harvest2" || id == "harvest3") {
        assignindex(id);
        imgele.src = "pic/pullcarrot_middle.gif" + '?' + (new Date().getTime());
        //changeindex(id);
    } else if (id == "harvest4" || id == "harvest5" || id == "harvest6") {
        assignindex(id);
        imgele.src = "pic/pullcarrot_right.gif" + '?' + (new Date().getTime());
        //changeindex(id);
    }
    setTimeout(function () {
        changeindex(id);
    }, 3000);

}

function fadeOutPrecount(id) {
    var element = document.getElementById(id.id);
    if (element) {
        element.className += element.className ? ' fadeOut' : ' fadeOut';

        grow();
    }
}

//遊戲結束
function gameover() {
    var gamePage = document.getElementById('div_game');
    gamePage.style.display = 'none';
    var gameoverPage = document.getElementById('div_gameover');
    gameoverPage.style.display = 'block';

    clearTimeout(game);
}

//答錯
function answerWrong() {
    // life--;
    //var element = document.getElementById('life');
    //var image = element.querySelectorAll('[src="' + lifeImg + '"]');
    setTimeout(function () {
        var wrongclass = document.getElementsByClassName('wrong');
        wrongclass[0].style.visibility = 'visible';
        //叉叉持續2秒
        setTimeout(function () {
            wrongclass[0].style.visibility = 'hidden';
            // if (image != []) {
            //     element.removeChild(image[0]);
            // }
            // if (life == 0) {
            //     //遊戲結束
            //     gameover();
            // } else {
            //這關再來一次
            init();
            //}
        }, 2000);
    }, 3000)


}

//答對
function answerCorrect() {
    //先讓最後一個拔的動畫完成
    setTimeout(function () {
        var correctclass = document.getElementsByClassName('correct');
        correctclass[0].style.visibility = 'visible';
        //打鉤持續2秒
        setTimeout(function () {
            correctclass[0].style.visibility = 'hidden';
            //進入下一關
            if (groundnum != 9) {
                groundnum++;
                init();
            } else {
                //遊戲結束
                gameover();
            }


        }, 2000);
    }, 3000)
   
}

//改變index
function changeindex(div) {
    var element = document.getElementById(div);

    if (div.includes("3") || div.includes("6") || div.includes("9")) {
        element.classList.remove("assignZindex3");
    } else if (div.includes("2") || div.includes("5") || div.includes("8")) {
        element.classList.remove("assignZindex2");
    } else if (div.includes("1") || div.includes("4") || div.includes("7")) {
        element.classList.remove("assignZindex1");
    }
    element.classList.add('changeZindexto0');

}
function assignindex(div) {
    var element = document.getElementById(div);
    if (div.includes("3") || div.includes("6") || div.includes("9")) {
        element.classList.add('assignZindex3');
    } else if (div.includes("2") || div.includes("5") || div.includes("8")) {
        element.classList.add('assignZindex2');
    } else if (div.includes("1") || div.includes("4") || div.includes("7")) {
        element.classList.add('assignZindex1');
    }


}






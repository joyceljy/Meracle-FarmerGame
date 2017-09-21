var answerArr = [];
var resultArr = [];
//生命起始值
var life = 3;
//農田總數
var groundnum = 3;
//生命值圖片路徑
var lifeImg = "pic/heart.png";
//document.getElementById("startgame").onclick = start();
// init();
// displayLife(life);

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
    var image = 'pic/countdown.gif' + '?' + (new Date().getTime());
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

    for (i = 1; i <= life; i++) {
        var img = document.createElement('img');
        img.src = lifeImg;
        img.height = 25;
        img.width = 25;
        element.appendChild(img);
    }

}

//關卡設定
function levelSettings() {
    for (i = 1; i <= resultArr.length; i++) {
        var grd = ("ground" + i).toString();
        var grdele = document.getElementById(grd);
        grdele.style.display = 'block';
        var grow = ("grow" + i).toString();
        var growele = document.getElementById(grow);
        growele.getElementsByTagName('img')[0].style.display = 'none';
    }
    for (i = 1; i <= groundnum; i++) {
        var id = ("ground" + i).toString();
        var element = document.getElementById(id);
        element.style.visibility = 'visible';

    }
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
        hide("ground" + resultArr[counter]);
        showgrow("grow" + resultArr[counter]);

        counter++;
        if (counter === resultArr.length) {
            clearInterval(i);
        }
    }, 2000);

}
//採收
function harvest(i) {
    if (answerArr.length < resultArr.length) {
        answerArr.push(i);
        console.log(answerArr);
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

//隱藏div區塊
function hide(id) {
    var element = document.getElementById(id);

    element.style.display = 'none';
}

//顯示div區塊
function showgrow(id) {
    var element = document.getElementById(id);
    var imgele = element.getElementsByTagName('img')[0];
    console.log(imgele);
    imgele.style.display = 'block';
    imgele.src = "pic/blossom2.gif" + '?' + (new Date().getTime());
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
}

//答錯
function answerWrong() {
    life--;
    var element = document.getElementById('life');
    var image = element.querySelectorAll('[src="' + lifeImg + '"]');
    var wrongclass = document.getElementsByClassName('wrong');
    wrongclass[0].style.visibility = 'visible';
    setTimeout(function () {
        wrongclass[0].style.visibility = 'hidden';
        if (image != []) {
            element.removeChild(image[0]);
        }
        if (life == 0) {
            //遊戲結束
            gameover();
        } else {
            //這關再來一次
            init();
        }
    }, 2000);
}

//答對
function answerCorrect() {
    var correctclass = document.getElementsByClassName('correct');
    correctclass[0].style.visibility = 'visible';
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
}






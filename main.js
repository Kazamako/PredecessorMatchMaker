const bgImg = new Image();

window.onload = function(){
  // チーム分け背景画像
  bgImg.src = "background.jpg";
  // Canvas準備
  var canvas = document.getElementById("preview");
  var ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 200;
  // 背景画像読込後にCanvasに描画
  bgImg.onload = () => {
    canvas.width = bgImg.width;
    canvas.height = bgImg.height;
    ctx.drawImage(bgImg, 0, 0);
}
}

// ランダムチーム分け
function randomMatch(){
  // userlistに名前とELOを格納
  var userlist = [
    [document.getElementById("username1").value, document.getElementById("userelo1").value],
    [document.getElementById("username2").value, document.getElementById("userelo2").value],
    [document.getElementById("username3").value, document.getElementById("userelo3").value],
    [document.getElementById("username4").value, document.getElementById("userelo4").value],
    [document.getElementById("username5").value, document.getElementById("userelo5").value],
    [document.getElementById("username6").value, document.getElementById("userelo6").value],
    [document.getElementById("username7").value, document.getElementById("userelo7").value],
    [document.getElementById("username8").value, document.getElementById("userelo8").value],
    [document.getElementById("username9").value, document.getElementById("userelo9").value],
    [document.getElementById("username10").value, document.getElementById("userelo10").value],
  ];    
  var randomlist = [];

  // ランダム化
  randomlist = shuffle(userlist);

  // チーム毎に平均ELOを計算
  var nAlphaELO = (Number(randomlist[0][1]) + Number(randomlist[1][1]) + Number(randomlist[2][1]) + Number(randomlist[3][1]) + Number(randomlist[4][1])) / 5; 
  var nBravoELO = (Number(randomlist[5][1]) + Number(randomlist[6][1]) + Number(randomlist[7][1]) + Number(randomlist[8][1]) + Number(randomlist[9][1])) / 5; 
  // 小数点1桁に整形
  var alphaELO = Number(nAlphaELO).toFixed(1);
  var bravoELO = Number(nBravoELO).toFixed(1);

  // CANVAS準備
  var canvas = document.getElementById("preview");
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 500, 200);
  ctx.drawImage(bgImg, 0, 0)
  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#87ceeb';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';

  // チーム結果を出力
  var alphax1 = 10;
  var alphax2 = 80;
  ctx.fillText("Aチーム　ave:" + alphaELO, alphax1, 10);
  ctx.fillText(randomlist[0][1], alphax1, 50);
  ctx.fillText(randomlist[1][1], alphax1, 80);
  ctx.fillText(randomlist[2][1], alphax1, 110);
  ctx.fillText(randomlist[3][1], alphax1, 140);
  ctx.fillText(randomlist[4][1], alphax1, 170);
  ctx.fillText(randomlist[0][0], alphax2, 50, 150);
  ctx.fillText(randomlist[1][0], alphax2, 80, 150);
  ctx.fillText(randomlist[2][0], alphax2, 110, 150);
  ctx.fillText(randomlist[3][0], alphax2, 140, 150);
  ctx.fillText(randomlist[4][0], alphax2, 170, 150);
  var bravox1 = 260;
  var bravox2 = 320;
  ctx.fillStyle = '#f08080';
  ctx.fillText("Bチーム　ave:" + bravoELO, bravox1, 10);
  ctx.fillText(randomlist[5][1], bravox1, 50);
  ctx.fillText(randomlist[6][1], bravox1, 80);
  ctx.fillText(randomlist[7][1], bravox1, 110);
  ctx.fillText(randomlist[8][1], bravox1, 140);
  ctx.fillText(randomlist[9][1], bravox1, 170);
  ctx.fillText(randomlist[5][0], bravox2, 50, 150);
  ctx.fillText(randomlist[6][0], bravox2, 80, 150);
  ctx.fillText(randomlist[7][0], bravox2, 110, 150);
  ctx.fillText(randomlist[8][0], bravox2, 140, 150);
  ctx.fillText(randomlist[9][0], bravox2, 170, 150);

  // テキスト版のチーム分けも更新（非表示）
  document.getElementById("kekka").value =
    "Aチーム aveELO : " + alphaELO + "\n" +
    padd(randomlist[0][1]) + " : " + randomlist[0][0] + "\n" + 
    padd(randomlist[1][1]) + " : " + randomlist[1][0] + "\n" + 
    padd(randomlist[2][1]) + " : " + randomlist[2][0] + "\n" + 
    padd(randomlist[3][1]) + " : " + randomlist[3][0] + "\n" + 
    padd(randomlist[4][1]) + " : " + randomlist[4][0] + "\n" + 
    "―――――――――――――――――――――" + "\n" +
    "Bチーム aveELO : " + bravoELO + "\n" +
    padd(randomlist[5][1]) + " : " + randomlist[5][0] + "\n" + 
    padd(randomlist[6][1]) + " : " + randomlist[6][0] + "\n" + 
    padd(randomlist[7][1]) + " : " + randomlist[7][0] + "\n" + 
    padd(randomlist[8][1]) + " : " + randomlist[8][0] + "\n" + 
    padd(randomlist[9][1]) + " : " + randomlist[9][0] ;
}

// ELO考慮したチーム分け
function eloMatch(){
  var userlist = [];
  var randomELOUserList = [];
  var goodTeamList = [0,0,0,0,0,0,0,0,0,0];
  var goodTeamELOdiff = 99999999;
  var goodTeamAlphaELO = 0;
  var goodTeamBravoELO = 0;

  for (var loop = 0; loop < 10; loop++){
    // 毎回同じチームにならないように完全ランダムのチーム分けを[loop]回数行って、
    // 2チームの平均値が一番小さくなるものを出力する。

    // userlistに名前とELOを格納
    userlist = [
      [document.getElementById("username1").value, document.getElementById("userelo1").value],
      [document.getElementById("username2").value, document.getElementById("userelo2").value],
      [document.getElementById("username3").value, document.getElementById("userelo3").value],
      [document.getElementById("username4").value, document.getElementById("userelo4").value],
      [document.getElementById("username5").value, document.getElementById("userelo5").value],
      [document.getElementById("username6").value, document.getElementById("userelo6").value],
      [document.getElementById("username7").value, document.getElementById("userelo7").value],
      [document.getElementById("username8").value, document.getElementById("userelo8").value],
      [document.getElementById("username9").value, document.getElementById("userelo9").value],
      [document.getElementById("username10").value, document.getElementById("userelo10").value],
    ];
    randomELOUserList = userlist;

    // ELOにプラマイX%の差を付ける
    var ELORANDOM = 0.05;
    for (var i = 0; i < randomELOUserList.length; i++){
      var plusflg = Math.floor(Math.random()*2);
      var plusnum = Math.floor(Math.random()*Number(randomELOUserList[i][1])*ELORANDOM);
      if(plusflg == 0){
        randomELOUserList[i][1] = Number(randomELOUserList[i][1]) + plusnum;
      }else{
        randomELOUserList[i][1] = Number(randomELOUserList[i][1]) - plusnum;
      }
    }

    // 5人分チームを振り分け
    var teamList = [0,0,0,0,0,0,0,0,0,0];
    while(5 > sum(teamList)){
			var rand = Math.floor(Math.random()*10);
			teamList[rand] = 1;
		}

    // チーム毎にELOを計算
    var alphaELO = 0;
    var bravoELO = 0;
    for(var i = 0; i < teamList.length; i++){
      if(teamList[i] == 0){ alphaELO = alphaELO + randomELOUserList[i][1]; }
      else{ bravoELO = bravoELO + randomELOUserList[i][1]; }
    }
    alphaELO = alphaELO / 5;
    bravoELO = bravoELO / 5;
    alphaELO = alphaELO.toFixed(1);
    bravoELO = bravoELO.toFixed(1);

    // チームの平均が近ければ採用
    if(goodTeamELOdiff > Math.abs(alphaELO - bravoELO)){
      goodTeamELOdiff = Math.abs(alphaELO - bravoELO);
      goodTeamList = teamList;
      goodTeamAlphaELO = alphaELO;
      goodTeamBravoELO = bravoELO;
    }
  }

  // 最良の結果を出力
  // CANVAS準備
  var canvas = document.getElementById("preview");
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 500, 200);
  ctx.drawImage(bgImg, 0, 0)
  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#87ceeb';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';

  // チーム結果を出力
  var alphax1 = 10;
  var alphax2 = 80;
  var bravox1 = 260;
  var bravox2 = 320;
  var y = 50;

  ctx.fillText("Aチーム　ave:" + goodTeamAlphaELO, alphax1, 10);
  for(var i = 0; i < goodTeamList.length; i++){
    if(goodTeamList[i] == 0){
      ctx.fillText(userlist[i][1], alphax1, y);
      ctx.fillText(userlist[i][0], alphax2, y, 150);
      y = y + 30;
    }
  }
  y = 50;
  ctx.fillStyle = '#f08080';
  ctx.fillText("Bチーム　ave:" + goodTeamBravoELO, bravox1, 10);
  for(var i = 0; i < goodTeamList.length; i++){
    if(goodTeamList[i] == 1){
      ctx.fillText(userlist[i][1], bravox1, y);
      ctx.fillText(userlist[i][0], bravox2, y, 150);
      y = y + 30;
    }
  }
}


// リスト内の並び替え
const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

// リスト内合計値計算
var sum = function(arr){
  var total = 0, i = 0, len = 0;
  if(Object.prototype.toString.call(arr) !== '[object Array]') return;
  for (i = 0, len = arr.length; i < len; i++) { total += arr[i]; }
  return total;
};

// 桁数調整
function padd(val) {
    var len = 4;
    for(var i = 0; i < len; i++){
        val = val + " ";
    } 
    return val.substr(0,len);
}
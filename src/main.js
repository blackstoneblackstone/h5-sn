//初始化舞台
Laya.init(828, 1400);
Laya.stage.bgColor = null;
Laya.stage.alignV = Laya.Stage.ALIGN_CENTER
Laya.stage.alignH = Laya.Stage.ALIGN_CENTER
Laya.stage.frameRate = Laya.Stage.FRAME_MOUSE
Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH
var skeleton;
var musicPlay = document.getElementById("music");
document.getElementById("load").addEventListener("click", function () {
  musicPlay.play()
});
Laya.loader.load("res/atlas/images.atlas", Laya.Handler.create(this, onLoaded), Laya.Handler.create(this, function (e) {
  document.getElementById("ln").style.width = Math.ceil(e * 100) + "%"
}))
var mov;
var music;
var playing = true
skeleton = new Laya.Skeleton();
skeleton.load("res/spine/tuzi/tuzi.sk");
function onLoaded() {
  document.getElementById("load").style.display = "none"
  var bg = new Laya.Image()
  bg.skin = "images/bigbg.png"
  bg.height = Laya.stage.height
  bg.width = Laya.stage.width
  Laya.stage.addChildAt(bg, 0)

  var bottom = new Laya.Image()
  bottom.skin = "images/sdd.png"
  bottom.width = 122
  bottom.height = 68
  bottom.x = Laya.stage.width / 2 - 61
  bottom.y = Laya.stage.height - 130
  Laya.stage.addChildAt(bottom, 1)

  //添加到舞台
  var index = new indexUI()
  Laya.stage.addChildAt(skeleton, 1);
  skeleton.pos(100, 1120);
  skeleton.scaleX = 1.5
  skeleton.scaleY = 1.5
  index.x = 70
  Laya.stage.addChildAt(index, 1);
  Laya.Tween.from(skeleton, { alpha: 0, y: 1500 }, 2000, Laya.Ease.elasticInOut, null, 0)
  index.show.play(1, false)
  document.getElementById("tg").addEventListener("click", function () {
    p2()
  })
  index.on(Laya.Event.CLICK, this, function (e) {
    document.getElementById("layaContainer").style.display = "none"
    // document.getElementById("vid").style.display = "block"
    // mov = document.getElementById("mov")
    // mov.play()
    // musicPlay.pause()
    // playing = false
    // music.skin = "images/music-close.png";
    Laya.stage.removeChildren(1);
    // mov.onended = function () {
      p2()
    // }
  })
  musicShow()
}
var page2;

function musicShow() {
  music = new Laya.Image()
  music.skin = "images/music.png"
  music.top = 80
  music.right = 80
  music.zOrder = 10
  if (playing) {
    musicPlay.play()
    music.skin = "images/music.png";
  } else {
    music.skin = "images/music-close.png";
  }
  music.on(Laya.Event.CLICK, this, function (e) {
    if (playing) {
      playing = false
      musicPlay.pause();
      music.skin = "images/music-close.png";
    } else {
      playing = true
      musicPlay.play();
      music.skin = "images/music.png";
    }
  })
  Laya.stage.addChildAt(music, 1);
}

function p2() {
  document.getElementById("code").style.display = "none"
  for (var i = 0; i < 5; i++) {
    document.getElementsByClassName("pc")[i].src = document.getElementsByClassName("pc")[i].dataset.src
    document.getElementsByClassName("pc")[i].style.display = "none"
  }
  playing = true
  musicShow()
  // mov.pause()
  var bottom = new Laya.Image()
  bottom.skin = "images/sdd.png"
  bottom.width = 122
  bottom.height = 68
  bottom.x = Laya.stage.width / 2 - 61
  bottom.alpha = 0
  bottom.y = Laya.stage.height
  Laya.stage.addChildAt(bottom, 1)
  Laya.Tween.to(bottom, { alpha: 1, y: Laya.stage.height - 130 }, 1000, Laya.Ease.elasticInOut, null, 100)
  document.getElementById("vid").style.display = "none"
  document.getElementById("layaContainer").style.display = "block"
  page2 = new page2UI()
  page2.x = 30
  page2.zOrder = 2
  for (var i = 0; i < 15; i++) {
    page2.sp.getChildAt(i).alpha = 0
    page2.sp.getChildAt(i).scaleX = 3
    page2.sp.getChildAt(i).scaleY = 3
    Laya.Tween.to(page2.sp.getChildAt(i), { alpha: 1, scaleX: 1, scaleY: 1 }, 500, Laya.Ease.linearIn, null, 100 * i)
  }
  Laya.stage.addChildAt(page2, 1)
  //动画结束
  setTimeout(function () {
    page2.f5.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP3()
    })
    page2.f8.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP3()
    })
    page2.f9.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP3()
    })
    page2.f14.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP3()
    })
    page2.f2.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP4()
    })
    page2.f6.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP4()
    })
    page2.f12.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP4()
    })

    page2.f4.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP5()
    })
    page2.f15.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP5()
    })
    page2.f3.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP6()
    })
    page2.f7.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP6()
    })
    page2.f10.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP6()
    })
    page2.f1.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP7()
    })
    page2.f11.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP7()
    })
    page2.f13.on(Laya.Event.CLICK, this, function (e) {
      hideP2toP7()
    })
  }, 2000);

}
function hideP2toP3() {
  for (var j = 0; j < 15; j++) {
    Laya.Tween.to(page2.sp.getChildAt(j), { alpha: 0, scaleX: 0, scaleY: 0 }, 500, Laya.Ease.linearIn, null, 50 * j)
  }
  setTimeout(function () {
    Laya.stage.removeChildren(1)
    p3()
  }, 1000);
}
function hideP2toP4() {
  for (var j = 0; j < 15; j++) {
    Laya.Tween.to(page2.sp.getChildAt(j), { alpha: 0, scaleX: 0, scaleY: 0 }, 500, Laya.Ease.linearIn, null, 50 * j)
  }
  setTimeout(function () {
    Laya.stage.removeChildren(1)
    p4()
  }, 1000);
}

function hideP2toP5() {
  for (var j = 0; j < 15; j++) {
    Laya.Tween.to(page2.sp.getChildAt(j), { alpha: 0, scaleX: 0, scaleY: 0 }, 500, Laya.Ease.linearIn, null, 50 * j)
  }
  setTimeout(function () {
    Laya.stage.removeChildren(1)
    p5()
  }, 1000);
}

function hideP2toP6() {
  for (var j = 0; j < 15; j++) {
    Laya.Tween.to(page2.sp.getChildAt(j), { alpha: 0, scaleX: 0, scaleY: 0 }, 500, Laya.Ease.linearIn, null, 50 * j)
  }
  setTimeout(function () {
    Laya.stage.removeChildren(1)
    p6()
  }, 1000);
}
function hideP2toP7() {
  for (var j = 0; j < 15; j++) {
    Laya.Tween.to(page2.sp.getChildAt(j), { alpha: 0, scaleX: 0, scaleY: 0 }, 500, Laya.Ease.linearIn, null, 50 * j)
  }
  setTimeout(function () {
    Laya.stage.removeChildren(1)
    p7()
  }, 1000);
}
function p3() {
  for (var i = 0; i < 5; i++) { document.getElementsByClassName("pc")[i].style.display = "none" }
  document.getElementById("pc1").style.display = "block"
  musicShow()
  var p3 = new page3UI()
  p3.bot.y = Laya.stage.height - 130
  Laya.stage.addChildAt(p3, 1);
  p3.zOrder = 2
  p3.show.play(1, false)
  p3.on(Laya.Event.CLICK, this, function (e) {
    Laya.Tween.from(p3, { alpha: 0 }, 500, Laya.Ease.linearIn, Laya.Handler.create(function () {
    }), 0)
    Laya.stage.removeChildren(1);
    p2()
  })
  setInterval(function () {
    for (var i = 0; i < 4; i++) {
      Laya.Tween.from(p3.topNum.getChildAt(i), { alpha: 0, y: -30 }, 500, Laya.Ease.linearIn, null, 200 * i)
    }
  }, 3000);
  actor()
}
function p4() {
  for (var i = 0; i < 5; i++) { document.getElementsByClassName("pc")[i].style.display = "none" }
  document.getElementById("pc2").style.display = "block"
  musicShow()
  var p4
  p4 = new page4UI()
  p4.bot.y = Laya.stage.height - 130
  p4.zOrder = 2
  Laya.stage.addChildAt(p4, 1);
  p4.on(Laya.Event.CLICK, this, function (e) {
    Laya.Tween.from(p4, { alpha: 0 }, 500, Laya.Ease.linearIn, Laya.Handler.create(function () {
    }), 0)
    Laya.stage.removeChildren(1);
    p2()
  })
  p4.show.play(1, false)
  setInterval(function () {
    for (var i = 0; i < 4; i++) {
      Laya.Tween.from(p4.topNum.getChildAt(i), { alpha: 0, y: -20 }, 500, Laya.Ease.linearIn, null, 200 * i)
    }
  }, 3000);
  actor()
}
function p5() {
  for (var i = 0; i < 5; i++) {
    document.getElementsByClassName("pc")[i].style.display = "none"
  }
  document.getElementById("pc3").style.display = "block"
  musicShow()
  var p5
  p5 = new page5UI()
  p5.bot.y = Laya.stage.height - 130
  p5.zOrder = 2
  Laya.stage.addChildAt(p5, 1);
  p5.show.play(1, false)
  p5.on(Laya.Event.CLICK, this, function (e) {
    Laya.Tween.from(p5, { alpha: 0 }, 500, Laya.Ease.linearIn, Laya.Handler.create(function () {
    }), 0)
    Laya.stage.removeChildren(1);
    p2()
  })
  setInterval(function () {
    for (var i = 0; i < 4; i++) {
      Laya.Tween.from(p5.topNum.getChildAt(i), { alpha: 0, y: -20 }, 500, Laya.Ease.linearIn, null, 200 * i)
    }
  }, 3000);
  actor()
}

function p6() {
  for (var i = 0; i < 5; i++) { document.getElementsByClassName("pc")[i].style.display = "none" }
  document.getElementById("pc4").style.display = "block"
  musicShow()
  var p6
  p6 = new page6UI()
  p6.bot.y = Laya.stage.height - 130
  p6.zOrder = 2
  Laya.stage.addChildAt(p6, 1);
  p6.show.play(1, false)
  p6.on(Laya.Event.CLICK, this, function (e) {
    Laya.Tween.from(p6, { alpha: 0 }, 500, Laya.Ease.linearIn, Laya.Handler.create(function () {
    }), 0)
    Laya.stage.removeChildren(1);
    p2()
  })
  setInterval(function () {
    for (var i = 0; i < 4; i++) {
      Laya.Tween.from(p6.topNum.getChildAt(i), { alpha: 0, y: -20 }, 500, Laya.Ease.linearIn, null, 200 * i)
    }
  }, 3000);
  actor()
}

function p7() {
  for (var i = 0; i < 5; i++) { document.getElementsByClassName("pc")[i].style.display = "none" }
  document.getElementById("pc5").style.display = "block"
  musicShow()
  var p7
  p7 = new page7UI()
  p7.bot.y = Laya.stage.height - 130
  p7.zOrder = 2
  Laya.stage.addChildAt(p7, 1);
  p7.show.play(1, false)
  p7.on(Laya.Event.CLICK, this, function (e) {
    Laya.Tween.from(p7, { alpha: 0 }, 500, Laya.Ease.linearIn, Laya.Handler.create(function () {
    }), 0)
    Laya.stage.removeChildren(1);
    p2()
  })
  setInterval(function () {
    for (var i = 0; i < 4; i++) {
      Laya.Tween.from(p7.topNum.getChildAt(i), { alpha: 0, y: -20 }, 500, Laya.Ease.linearIn, null, 200 * i)
    }
  }, 3000);
  actor()
}

function actor() {
  var actor = new Laya.Image()
  actor.width = 65
  actor.height = 65
  actor.x = 315
  actor.y = 785
  actor.skin = window.actorPic;
  actor.zOrder = 3
  var sp = new Laya.Sprite();
  //自定义路径
  var path = [
    ["moveTo", 0, 0], //画笔的起始点，
    ["arcTo", 65, 0, 65, 5, 5], //p1（500,0）为夹角B，（500,30）为端点p2
    ["arcTo", 65, 65, 60, 65, 5],//p1（500,300）为夹角C，（470,300）为端点p2
    ["arcTo", 0, 65, 0, 55, 5], //p1(0,300)为夹角D，（0,270）为端点p2
    ["arcTo", 0, 0, 5, 0, 5],//p1(0,0)为夹角A，（30,0）为端点p2
  ];
  //绘制圆角矩形
  sp.graphics.drawPath(0, 0, path, { fillStyle: "#ff0000" });
  actor.mask = sp;
  var name = new Laya.Text()
  name.text = window.actorName;
  name.color = "#aa816d";
  name.width = 200;
  name.height = 30;
  name.x = 385;
  name.y = 794;
  name.fontSize = 20;
  name.zOrder = 3;
  Laya.stage.addChildAt(name, 1);
  Laya.stage.addChildAt(actor, 1);
  document.getElementById("code").style.display = "block"
  
}
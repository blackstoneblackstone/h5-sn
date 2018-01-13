//初始化舞台
Laya.init(828, 1400);
Laya.stage.bgColor = null;
Laya.stage.alignV = Laya.Stage.ALIGN_CENTER
Laya.stage.alignH = Laya.Stage.ALIGN_CENTER
Laya.stage.frameRate = Laya.Stage.FRAME_MOUSE
Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH
var skeleton;
var musicPlay = document.getElementById("music");
document.getElementById("load").addEventListener("click",function(){
  musicPlay.play()
});
Laya.loader.load([{ url: "res/atlas/images.atlas" }, { url: "res/atlas/f1.atlas" }, { url: "res/atlas/f2.atlas" }, { url: "res/atlas/f3.atlas" }, { url: "res/atlas/f4.atlas" }, { url: "res/atlas/f5.atlas" }],
  Laya.Handler.create(this, onLoaded),null, Laya.Loader.ATLAS);
var p1p = 0, p2p = 0, p3p = 0, p4p = 0, p5p = 0, p6p = 0
Laya.loader.load("res/atlas/images.atlas", null, Laya.Handler.create(this, function (e) {
  p1p = Math.ceil(e * 100) * 0.2
  document.getElementById("ln").style.width = p1p + p2p + p3p + p4p + p5p + p6p + "%"
}))
Laya.loader.load("res/atlas/f1.atlas", null, Laya.Handler.create(this, function (e) {
  p2p = Math.ceil(e * 100) * 0.2
  document.getElementById("ln").style.width = p1p + p2p + p3p + p4p + p5p + p6p + "%"
}))
Laya.loader.load("res/atlas/f2.atlas", null, Laya.Handler.create(this, function (e) {
  p3p = Math.ceil(e * 100) * 0.2
  document.getElementById("ln").style.width = p1p + p2p + p3p + p4p + p5p + p6p + "%"
}))
Laya.loader.load("res/atlas/f3.atlas", null, Laya.Handler.create(this, function (e) {
  p4p = Math.ceil(e * 100) * 0.2
  document.getElementById("ln").style.width = p1p + p2p + p3p + p4p + p5p + p6p + "%"
}))
Laya.loader.load("res/atlas/f4.atlas", null, Laya.Handler.create(this, function (e) {
  p5p = Math.ceil(e * 100) * 0.2
  document.getElementById("ln").style.width = p1p + p2p + p3p + p4p + p5p + p6p + "%"
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
    document.getElementById("vid").style.display = "block"
    mov = document.getElementById("mov")
    mov.play()
    musicPlay.pause()
    playing = false
    music.skin = "images/music-close.png";
    Laya.stage.removeChildren(1);
    mov.onended = function () {
      p2()
    }
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
  for(var i=0;i<5;i++){     document.getElementsByClassName("pc")[i].style.display="none"       }
  playing = true
  musicShow()
  mov.pause()
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
    Laya.loader.load("res/atlas/f1.atlas", Laya.Handler.create(this, p3), null)
  }, 1000);
}
function hideP2toP4() {
  for (var j = 0; j < 15; j++) {
    Laya.Tween.to(page2.sp.getChildAt(j), { alpha: 0, scaleX: 0, scaleY: 0 }, 500, Laya.Ease.linearIn, null, 50 * j)
  }
  setTimeout(function () {
    Laya.stage.removeChildren(1)
    Laya.loader.load("res/atlas/f2.atlas", Laya.Handler.create(this, p4), null)
  }, 1000);
}

function hideP2toP5() {
  for (var j = 0; j < 15; j++) {
    Laya.Tween.to(page2.sp.getChildAt(j), { alpha: 0, scaleX: 0, scaleY: 0 }, 500, Laya.Ease.linearIn, null, 50 * j)
  }
  setTimeout(function () {
    Laya.stage.removeChildren(1)
    Laya.loader.load("res/atlas/f3.atlas", Laya.Handler.create(this, p5), null)
  }, 1000);
}

function hideP2toP6() {
  for (var j = 0; j < 15; j++) {
    Laya.Tween.to(page2.sp.getChildAt(j), { alpha: 0, scaleX: 0, scaleY: 0 }, 500, Laya.Ease.linearIn, null, 50 * j)
  }
  setTimeout(function () {
    Laya.stage.removeChildren(1)
    Laya.loader.load("res/atlas/f4.atlas", Laya.Handler.create(this, p6), null)
  }, 1000);
}
function hideP2toP7() {
  for (var j = 0; j < 15; j++) {
    Laya.Tween.to(page2.sp.getChildAt(j), { alpha: 0, scaleX: 0, scaleY: 0 }, 500, Laya.Ease.linearIn, null, 50 * j)
  }
  setTimeout(function () {
    Laya.stage.removeChildren(1)
    Laya.loader.load("res/atlas/f5.atlas", Laya.Handler.create(this, p7), null)
  }, 1000);
}
function p3() {
   for(var i=0;i<5;i++){     document.getElementsByClassName("pc")[i].style.display="none"       }
  document.getElementById("pc1").style.display="block"
  musicShow()
  var p3 = new page3UI()
  var ani = new Laya.Animation();
  ani.loadAtlas("res/atlas/f5.atlas"); // 加载图集动画
  ani.interval = 50;			// 设置播放间隔（单位：毫秒）
  ani.play(0, false); 				// 播放图集动画

  p3.bot.y = Laya.stage.height - 130
  // 获取动画的边界信息
  var bounds = ani.getGraphicBounds();
  ani.pivot(bounds.width / 2, bounds.height / 2);
  ani.pos(Laya.stage.width / 2, Laya.stage.height / 2 + 50);
  ani.scaleX = 1.8
  ani.scaleY = 1.8
  ani.zOrder = 1
  Laya.stage.addChildAt(ani, 1);
  Laya.Tween.to(ani, {scaleX: 1.5, scaleY: 1.4,y:500}, 500, Laya.Ease.linearIn, null, 2000)
  ani.on(Laya.Event.COMPLETE, this, function (e) {
    Laya.stage.addChildAt(p3, 1);
    p3.zOrder = 2
    p3.show.play(1, false)
    p3.topNum.on(Laya.Event.CLICK, this, function (e) {
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
  })
}
function p4() {
   for(var i=0;i<5;i++){     document.getElementsByClassName("pc")[i].style.display="none"       }
  document.getElementById("pc2").style.display="block"
  musicShow()
  var ani = new Laya.Animation();
  ani.loadAtlas("res/atlas/f1.atlas"); // 加载图集动画
  ani.interval = 50;			// 设置播放间隔（单位：毫秒）
  ani.play(0, false); 				// 播放图集动画

  // 获取动画的边界信息
  var bounds = ani.getGraphicBounds();
  ani.pivot(bounds.width / 2, bounds.height / 2);
  ani.pos(Laya.stage.width / 2, Laya.stage.height / 2);
  ani.scaleX = 1.8
  ani.scaleY = 1.8
  ani.zOrder = 1
  Laya.stage.addChildAt(ani, 1);
  Laya.Tween.to(ani, {scaleX: 1.4, scaleY: 1.2,y:500}, 500, Laya.Ease.linearIn, null, 2000)  
  var p4
  ani.on(Laya.Event.COMPLETE, this, function (e) {
    p4 = new page4UI()
    p4.bot.y = Laya.stage.height - 130
    p4.zOrder = 2
    Laya.stage.addChildAt(p4, 1);
    p4.topNum.on(Laya.Event.CLICK, this, function (e) {
      Laya.Tween.from(p4, { alpha: 0 }, 500, Laya.Ease.linearIn, Laya.Handler.create(function () {
      }), 0)
      Laya.stage.removeChildren(1);
      p2()
    })
    p4.show.play(1, false)
  })
  setInterval(function () {
    for (var i = 0; i < 4; i++) {
      Laya.Tween.from(p4.topNum.getChildAt(i), { alpha: 0, y: -20 }, 500, Laya.Ease.linearIn, null, 200 * i)
    }
  }, 3000);
}
function p5() {
  for(var i=0;i<5;i++){
    document.getElementsByClassName("pc")[i].style.display="none"    
  }
  document.getElementById("pc3").style.display="block"
  musicShow()
  var ani = new Laya.Animation();
  ani.loadAtlas("res/atlas/f4.atlas"); // 加载图集动画
  ani.interval = 30;			// 设置播放间隔（单位：毫秒）
  ani.play(0, false); 				// 播放图集动画
  // 获取动画的边界信息
  var bounds = ani.getGraphicBounds();
  ani.pivot(bounds.width / 2, bounds.height / 2);
  ani.pos(Laya.stage.width / 2, Laya.stage.height / 2 - 50);
  ani.scaleX = 1.7
  ani.scaleY = 1.7
  ani.zOrder = 1
  Laya.stage.addChildAt(ani, 1);
  Laya.Tween.to(ani, {scaleX: 1.4, scaleY: 1.2,y:500}, 500, Laya.Ease.linearIn, null, 2000)  
  var p5
  ani.on(Laya.Event.COMPLETE, this, function (e) {
    p5 = new page5UI()
    p5.bot.y = Laya.stage.height - 130
    p5.zOrder = 2
    Laya.stage.addChildAt(p5, 1);
    p5.show.play(1, false)
    p5.topNum.on(Laya.Event.CLICK, this, function (e) {
      Laya.Tween.from(p5, { alpha: 0 }, 500, Laya.Ease.linearIn, Laya.Handler.create(function () {
      }), 0)
      Laya.stage.removeChildren(1);
      p2()
    })
  })
  setInterval(function () {
    for (var i = 0; i < 4; i++) {
      Laya.Tween.from(p5.topNum.getChildAt(i), { alpha: 0, y: -20 }, 500, Laya.Ease.linearIn, null, 200 * i)
    }
  }, 3000);
}
function p6() {
   for(var i=0;i<5;i++){     document.getElementsByClassName("pc")[i].style.display="none"       }
  document.getElementById("pc4").style.display="block"
  musicShow()
  var ani = new Laya.Animation();
  ani.loadAtlas("res/atlas/f2.atlas"); // 加载图集动画
  ani.interval = 40;			// 设置播放间隔（单位：毫秒）
  ani.play(0, false); 				// 播放图集动画
  // 获取动画的边界信息
  var bounds = ani.getGraphicBounds();
  ani.pivot(bounds.width / 2, bounds.height / 2);
  ani.pos(Laya.stage.width / 2, Laya.stage.height / 2);
  ani.scaleX = 1.5
  ani.scaleY = 1.5
  ani.zOrder = 1
  Laya.stage.addChildAt(ani, 1);
  Laya.Tween.to(ani, {scaleX: 1.4, scaleY: 1.2,y:500}, 500, Laya.Ease.linearIn, null, 2000)  
  var p6
  ani.on(Laya.Event.COMPLETE, this, function (e) {
    p6 = new page6UI()
    p6.bot.y = Laya.stage.height - 130
    p6.zOrder = 2
    Laya.stage.addChildAt(p6, 1);
    p6.show.play(1, false)
    p6.topNum.on(Laya.Event.CLICK, this, function (e) {
      Laya.Tween.from(p6, { alpha: 0 }, 500, Laya.Ease.linearIn, Laya.Handler.create(function () {
      }), 0)
      Laya.stage.removeChildren(1);
      p2()
    })
  })
  setInterval(function () {
    for (var i = 0; i < 4; i++) {
      Laya.Tween.from(p6.topNum.getChildAt(i), { alpha: 0, y: -20 }, 500, Laya.Ease.linearIn, null, 200 * i)
    }
  }, 3000);
}
function p7() {
   for(var i=0;i<5;i++){     document.getElementsByClassName("pc")[i].style.display="none"       }
  document.getElementById("pc5").style.display="block"
  musicShow()
  var ani = new Laya.Animation();
  ani.loadAtlas("res/atlas/f3.atlas"); // 加载图集动画
  ani.interval = 40;			// 设置播放间隔（单位：毫秒）
  ani.play(0, false); 				// 播放图集动画
  // 获取动画的边界信息
  var bounds = ani.getGraphicBounds();
  ani.pivot(bounds.width / 2, bounds.height / 2);
  ani.pos(Laya.stage.width / 2, Laya.stage.height / 2);
  ani.scaleX = 1.8
  ani.scaleY = 1.8
  ani.zOrder = 1
  Laya.stage.addChildAt(ani, 1);
  Laya.Tween.to(ani, {scaleX: 1.5, scaleY: 1.4,y:500}, 500, Laya.Ease.linearIn, null, 2000)  
  var p7
  ani.on(Laya.Event.COMPLETE, this, function (e) {
    p7 = new page7UI()
    p7.bot.y = Laya.stage.height - 130
    p7.zOrder = 2
    Laya.stage.addChildAt(p7, 1);
    p7.show.play(1, false)
    p7.topNum.on(Laya.Event.CLICK, this, function (e) {
      Laya.Tween.from(p7, { alpha: 0 }, 500, Laya.Ease.linearIn, Laya.Handler.create(function () {
      }), 0)
      Laya.stage.removeChildren(1);
      p2()
    })
  })
  setInterval(function () {
    for (var i = 0; i < 4; i++) {
      Laya.Tween.from(p7.topNum.getChildAt(i), { alpha: 0, y: -20 }, 500, Laya.Ease.linearIn, null, 200 * i)
    }
  }, 3000);
}

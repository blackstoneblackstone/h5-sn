<?php
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4069e1635ae1be38&redirect_uri=http%3a%2f%2fwww.wexue.top%2fwxAuth.php&response_type=code&scope=snsapi_base&state=http%3a%2f%2fwww.wexue.top%3a20000%2fhuaxue%2findex.html#wechat_redirect
header("Content-type: text/html; charset=utf-8");
$code = $_GET['code'];
$state = $_GET['state'];
if(empty($code)||empty($state)){
   header("Location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4069e1635ae1be38&redirect_uri=http%3a%2f%2fwww.simamedia.cn%2fgames%2fsn%2findex.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect");
   exit;
}
$url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx4069e1635ae1be38&secret=4578c042ea9361b6e16626f1aa3d7e52&code=' . $code . '&grant_type=authorization_code';
$user = null;
try {
    $result = curlGet($url);
    $obj = json_decode($result);
    $openid = $obj->openid;
	if(empty($openid)){
	header("Location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4069e1635ae1be38&redirect_uri=http%3a%2f%2fwww.simamedia.cn%2fgames%2fsn%2findex.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect");
      exit;
	}
    $at=$obj->access_token;
    $userInfo=curlGet("https://api.weixin.qq.com/sns/userinfo?access_token=".$at."&openid=".$openid."&lang=zh_CN");
    $user = json_decode($userInfo);
} catch (Exception $e) {
    echo $e->getTraceAsString();
}

$wxParams = curlGet("http://www.simamedia.cn/weixinjs.php?url=" . base64_encode('http://www.simamedia.cn' . $_SERVER["REQUEST_URI"]));
function curlGet($url, $method = 'get', $data = '')
{
    $ch = curl_init();
    $header = "Accept-Charset: utf-8";
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, strtoupper($method));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $temp = curl_exec($ch);
    return $temp;
}

?>

<head>
	<meta charset='utf-8' />
	<title>首农送福 戊戌大吉</title>
	<meta name='viewport' content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
	/>
	<meta name="renderer" content="webkit">
	<meta name='apple-mobile-web-app-capable' content='yes' />
	<meta name='full-screen' content='true' />
	<meta name='x5-fullscreen' content='true' />
	<meta name='360-fullscreen' content='true' />
	<meta name="laya" screenorientation="landscape" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta http-equiv='expires' content='0' />
	<meta http-equiv="Cache-Control" content="no-siteapp" />
	<style>
		body,
		.loading {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			text-align: center;
			margin: 0;
		}

		.top {
			height: 50%
		}

		.vid {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.9);
			display: none;
		}

		#mov {
			margin-top: -120px;
			width: 100%;
		}

		.tg {
			color: #ffe6df;
			position: absolute;
			right: 30px;
			top: 30px;
			font-size: 18px;
		}

		.sdd {
			margin: -70px auto auto auto;
			width: 30%;
		}


		#loadingNum {
			height: 3px;
			width: 130px;
			margin: 10px auto;
			background-color: #fff;
			border-radius: 20px;
			text-align: center;
			border: solid #fff 2px;
		}

		#ln {
			width: 1%;
			height: 3px;
			border-radius: 20px;
			background-color: #ff0000;
		}

		.bbg {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: -1;
		}
			.code{
			position: absolute;
			z-index: 10;
			bottom:60px;
			width: 30px;
			height: 30px;
			left: 50%;
			margin-left: -15px;
			display: none;
		}
		.pc{
		  position:absolute;
		  bottom:0px;
		  height:300px;
		  bottom:0;
		  z-index:100;
		  width:100%;
		  left: 0;
			opacity: 0.01;
			display: none;
		}
	</style>
	<script>
		window.actorName = "<?php 
		 echo $user->nickname;
		 ?>";
		window.actorPic=  "<?php 
		 echo $user->headimgurl;
		 ?>";
	</script>
</head>
<body>
	<div class="loading" id="load">
		<div class="top"></div>
		<img src="images/sdd.png" class="sdd">
		<div id="loadingNum">
			<div id="ln"></div>
		</div>
		<img src="images/bbbg.png" class="bbg">
	</div>
	<div class="vid" id="vid">
		<div class="tg" id="tg">
			跳过
		</div>
		<div class="top"></div>
		<video src="mp4/mov.mp4" preload="auto"  id="mov"></video>
	</div>
	<img data-src="http://data.simamedia.cn/index.php?g=Restful&m=Sn&a=pic&openid=<?php  echo $user->openid;?>&p=p1&name=<?php  echo $user->nickname;?>&actor=<?php  echo $user->headimgurl;?>" class="pc" id="pc1">
	<img data-src="http://data.simamedia.cn/index.php?g=Restful&m=Sn&a=pic&openid=<?php  echo $user->openid;?>&p=p2&name=<?php  echo $user->nickname;?>&actor=<?php  echo $user->headimgurl;?>" class="pc" id="pc2">
	<img data-src="http://data.simamedia.cn/index.php?g=Restful&m=Sn&a=pic&openid=<?php  echo $user->openid;?>&p=p3&name=<?php  echo $user->nickname;?>&actor=<?php  echo $user->headimgurl;?>" class="pc" id="pc3">
	<img data-src="http://data.simamedia.cn/index.php?g=Restful&m=Sn&a=pic&openid=<?php  echo $user->openid;?>&p=p4&name=<?php  echo $user->nickname;?>&actor=<?php  echo $user->headimgurl;?>" class="pc" id="pc4">
	<img data-src="http://data.simamedia.cn/index.php?g=Restful&m=Sn&a=pic&openid=<?php  echo $user->openid;?>&p=p5&name=<?php  echo $user->nickname;?>&actor=<?php  echo $user->headimgurl;?>" class="pc" id="pc5">
    <audio src="mp4/music.mp3" id="music" loop="loop"> 
        <!--核心包，封装了显示对象渲染，事件，时间管理，时间轴动画，缓动，消息交互,socket，本地存储，鼠标触摸，声音，加载，颜色滤镜，位图字体等-->
        <script type="text/javascript" src="libs/min/laya.core.min.js"></script>
        <!--是动画模块，包含了swf动画，骨骼动画等-->
        <script type="text/javascript" src="libs/min/laya.ani.min.js"></script>
        <!--粒子类库-->
        <script type="text/javascript" src="libs/min/laya.ui.min.js"></script>
        <script type="text/javascript" src="libs/min/jweixin-1.0.0.js"></script>
        <script src="src/ui/layaUI.max.all.js?v=343343"></script>
        <!--自定义的js(bin/js文件夹下)文件自动添加到下面jsfile模块标签里面里，js的顺序可以手动修改，修改后保留修改的顺序，新增加的js会默认依次追加到标签里-->
        <!--删除标签，ide不会自动添加js文件，请谨慎操作-->
        <!--jsfile--startTag-->
        <script src="src/main.js?v=324143"></script>
        <!--jsfile--endTag-->
        <script type="text/javascript">
    var _mtac = {};
    (function () {
                    var _mtac = {};
                    var mta = document.createElement("script");
                    mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.2";
                    mta.setAttribute("name", "MTAH5");
                    mta.setAttribute("sid", "500567272");
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(mta, s);      
        wx.config(
            <?php echo $wxParams;?>
        );
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: '首农给您送福啦！', // 分享标题
                link: 'http://www.simamedia.cn/games/sn/index.php', // 分享链接
                imgUrl: 'http://www.simamedia.cn/games/sn/images/icon.png', // 分享图标
                success: function () {
                    MtaH5.clickStat('shareCircle');
                },
                cancel: function () {
                }
            });
            wx.onMenuShareAppMessage({
                title: '首农给您送福啦！', // 分享标题
                desc: '福气从天降，谁也挡不住啊！', // 分享描述
                link: 'http://www.simamedia.cn/games/sn/index.php', // 分享链接
                imgUrl: 'http://www.simamedia.cn/games/sn/images/icon.png', // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    MtaH5.clickStat('shareFriend');
                    // 用户确认分享后执行Ï的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    })();
</script>

</body>

</html>
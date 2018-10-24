var isShowBtm = false; //用于判断是否显示了底部菜单

var imageLayer = new AMap.ImageLayer({
  url: './img/haixinsha03.png',
  // url: 'https://hi.cxtrip.cc/cxyTicket/html/haiquanwan/img/map1.png',
  zooms: [3, 20],
  bounds: new AMap.Bounds(
    [113.320263,23.109838], //左下角
    // [113.330113,23.112956] //右上角
    [113.330188,23.113072]
  ),
});

var map = new AMap.Map("container", {
  // viewMode: '3D', //值有'3D'、'2D'，缺省为'2D'，设置为3D时将在webgl环境满足条件的的浏览器中显示为三维地图
  // pitch: 45, //设置地图的倾角，0-83
  rotation: 0, //设置地图的旋转角度
  resizeEnable: true, //是否监控地图容器尺寸变化，默认值为false
  center: [113.324394,23.111545],
  zoom: 17,
  layers: [
    new AMap.TileLayer(),
    imageLayer
  ]
});



 //获取json数据
 $.getJSON('/test.json',function(res){
   console.log(res)
   var str = '';
   $('.nav-bar').empty()
   for( var i=0;i<res.length;i++){
      data = res[i];
      // var i = 1;
      str += '<div class="nav-item">'+
             '<div class="nav-item-con">'+
             '<img class="nav-img1" src="./img/icon'+data.id+'.png" alt="" width="20px" style="margin-bottom: -3px">'+
             '<img class="nav-img2 disnone" src="./img/icon'+data.id+'_w.png" alt="" width="20px" style="margin-bottom: -3px">'+data.type+
             '</div>'+
             '</div>'
   }
   $('.nav-bar').html(str)
   // 头部菜单
   $('.nav-item').bind('click', function () {
    $(this).find('.nav-item-con').addClass('nav-active');
    $(this).siblings().find('.nav-item-con').removeClass('nav-active');
    $(this).find('.nav-img1').addClass('disnone');
    $(this).find('.nav-img2').removeClass('disnone');
    $(this).siblings().find('.nav-img1').removeClass('disnone');
    $(this).siblings().find('.nav-img2').addClass('disnone');
    if ($(this).index() == 0) {
      // ---------------------------------线路------------------------------------------------------------------
      isShowBtm = !isShowBtm;
      if (isShowBtm === false) {
        $('.rode-line').animate({ // 隐藏线路
          height: '0px'
        }, 400);
        map.clearMap(); // 清除地图覆盖物
      } else {
        $('.rode-line').animate({ // 显示线路
          height: '152px'
        }, 400);
        $('.rode-item').eq(0).siblings().find('span').removeClass('active');
        $('.rode-item').eq(0).siblings().find('p').removeClass('active');
        $('.rode-item').eq(0).find('span').addClass('active');
        $('.rode-item').eq(0).find('p').addClass('active');
        map.clearMap(); // 清除地图覆盖物

        const markers = [{
          btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(1, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
          title: '<p class="marker-title">海心园</p><p class="marker-con">海心园</p>',
          icon: './img/num4.png',
          position: [113.320907,23.111735]
        }, {
          btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(2, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
          title: '<p class="marker-title">亚运展馆</p><p class="marker-con">亚运展馆</p>',
          icon: './img/num3.png',
          position: [113.322334,23.1121]
        }, {
          btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(3, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
          title: '<p class="marker-title">亚运看台</p><p class="marker-con">亚运看台</p>',
          icon: './img/num2.png',
          position: [113.32242,23.111424]
        }, {
          btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(4, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
          title: '<p class="marker-title">珠江夜游</p><p class="marker-con">珠江夜游</p>',
          icon: './img/num1.png',
          position: [113.322801,23.112125]
        }];
        
        markers.forEach(function (marker) { // 添加点到地图上
          const newObj = new AMap.Marker({
            map: map,
            icon: marker.icon,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-12, -36)
          });
          newObj.content = '<div class="marker-box">' + marker.title + marker.btntxt + '</div>';
          newObj.on('click', markerClick);
          newObj.emit('click', {
            target: newObj
          });
        });
        map.setFitView(); // 自动适配到合适视野范围；无参数，默认包括所有覆盖物的情况
      }
    } else if ($(this).index() == 1) {
      // ---------------------------------餐饮------------------------------------------------------------------
      isShowBtm = false; //关闭了底部弹窗
      $('.rode-line').animate({ // 隐藏线路
        height: '0px'
      }, 400);
      map.clearMap(); // 清除地图覆盖物
      const markers = [{
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(5, 101)" class="marker-btn yuyueBtn"><img src="./img/yuyue_w.png" alt=""><span>预定</span></a><a href="javascript:void(0);" onclick="lineMapFun(5, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">花辣私厨花园餐吧</p><p class="marker-con">花辣私厨花园餐吧......</p>',
        icon: './img/eat.png',
        position: [113.329083,23.111192]
      }];
      markers.forEach(function (marker) { // 添加点到地图上
        const newObj = new AMap.Marker({
          map: map,
          icon: marker.icon,
          position: [marker.position[0], marker.position[1]],
          offset: new AMap.Pixel(-12, -36)
        });
        newObj.content = '<div class="marker-box">' + marker.title + marker.btntxt + '</div>';
        newObj.on('click', markerClick);
        newObj.emit('click', {
          target: newObj
        });
      });
      map.setFitView(); // 自动适配到合适视野范围；无参数，默认包括所有覆盖物的情况
    } else if ($(this).index() == 2) {
      // ---------------------------------游乐------------------------------------------------------------------
      isShowBtm = false; //关闭了底部弹窗
      $('.rode-line').animate({ // 隐藏线路
        height: '0px'
      }, 400);
      map.clearMap(); // 清除地图覆盖物

      const markers = [{
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(1, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">海心园</p><p class="marker-con">海心园</p>',
        icon: './img/play.png',
        position: [113.320907,23.111735]
      }, {
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(2, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">亚运展馆</p><p class="marker-con">亚运展馆</p>',
        icon: './img/play.png',
        position: [113.322334,23.1121]
      }, {
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(3, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">亚运看台</p><p class="marker-con">亚运看台</p>',
        icon: './img/play.png',
        position: [113.32242,23.111424]
      }, {
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(4, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">珠江夜游</p><p class="marker-con">珠江夜游</p>',
        icon: './img/play.png',
        position: [113.322801,23.112125]
      }];
      
      markers.forEach(function (marker) { // 添加点到地图上
        const newObj = new AMap.Marker({
          map: map,
          icon: marker.icon,
          position: [marker.position[0], marker.position[1]],
          offset: new AMap.Pixel(-12, -36)
        });
        newObj.content = '<div class="marker-box">' + marker.title + marker.btntxt + '</div>';
        newObj.on('click', markerClick);
        newObj.emit('click', {
          target: newObj
        });
      });
      map.setFitView(); // 自动适配到合适视野范围；无参数，默认包括所有覆盖物的情况
    } else if ($(this).index() == 3) {
      // ---------------------------------观光车------------------------------------------------------------------
      isShowBtm = false; //关闭了底部弹窗
      $('.rode-line').animate({ // 隐藏线路
        height: '0px'
      }, 400);
      map.clearMap(); // 清除地图覆盖物
      $('.mask-box').show(); //显示遮罩层
      $('.msg-box').show(); // 显示弹窗
      $('.msg-con').html('').html('确定呼叫观光车？');
      $('.msg-cancel').bind('click', function () {
        $('.msg-box').hide(); // 隐藏弹窗
        $('.mask-box').hide(); //隐藏遮罩层
      });
      $('.msg-confirm').bind('click', function () {
        $('.msg-con').html('').html('观光车已经在来的路上，请稍等');
      });
    }
  });
 })




// 对 Map 底图操作后触发的事件 add by Zed 2018-09-29
map.on('click', function(ev) {
	  // 触发事件的对象
	  var target = ev.target;
	  // 触发事件的地理坐标，AMap.LngLat 类型
	  var lnglat = ev.lnglat;
	  // 触发事件的像素坐标，AMap.Pixel 类型
	  var pixel = ev.pixel;
	  // 触发事件类型
	  var type = ev.type;
	  console.log("map click...");
      map.clearMap(); // 清除地图覆盖物
    //点击地图隐藏右侧菜单
    if($('.ativity-box').is('.ativity-box-a')){
      $('.ativity-box').toggleClass('ativity-box-a');
    }
});

//信息弹窗体
const infoWindow = new AMap.InfoWindow({
  offset: new AMap.Pixel(0, -30)
});

// 信息弹窗体点击事件
function markerClick(e) {
  infoWindow.setContent(e.target.content);
  infoWindow.open(map, e.target.getPosition());
  var index;
  if (e.target.content.indexOf('海泉湾拓展训练营') > 0) {
    index = 0;
  } else if (e.target.content.indexOf('加勒比水公园') > 0) {
    index = 1;
  } else if (e.target.content.indexOf('垂直极限') > 0) {
    index = 2;
  } else if (e.target.content.indexOf('海泉神塔') > 0) {
    index = 3;
  }
  $('.rode-item').eq(index).siblings().find('span').removeClass('active');
  $('.rode-item').eq(index).siblings().find('p').removeClass('active');
  $('.rode-item').eq(index).find('span').addClass('active');
  $('.rode-item').eq(index).find('p').addClass('active');
}

// 获取当前位置信息
// 加载地图，调用浏览器定位服务
// map.plugin('AMap.Geolocation', function () {
//   // geolocation 是获得地理位置
//   const geolocation = new AMap.Geolocation({
//     enableHighAccuracy: true, //是否使用高精度定位，默认:true
//     timeout: 10000, //超过10秒后停止定位，默认：无穷大
//     buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
//     zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
//     buttonPosition: 'LB',
//     useNative: true,
//     showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
//     showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
//     panToLocation: false, //定位成功后将定位到的位置作为地图中心点，默认：true
//   });
//   map.addControl(geolocation);
//   geolocation.getCurrentPosition();
//   AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
//   AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
// });
// 解析定位结果：Lat是经度，Lng纬度
// function onComplete(data) {
//   const Lng = data.position.getLng();
//   const Lat = data.position.getLat();
//   console.log(Lat + ',' + Lng);
// }
// 解析定位错误信息
// function onError(data) {
//   alert("定位失败，请刷新再次获取");
// }

const linePoint = [{
  id: 1,
  name: '海心园',
  position: [113.320907,23.111735]
}, {
  id: 2,
  name: '亚运展馆',
  position: [113.322334,23.1121]
}, {
  id: 3,
  name: '亚运看台',
  position: [113.32242,23.111424]
}, {
  id: 4,
  name: '珠江夜游',
  position: [113.322801,23.112125]
}, {
  id: 5,
  name: '水舞台',
  position: [113.323101,23.111488]
}, {
  id: 6,
  name: '音乐喷泉',
  position: [113.324458,23.111898]
}, {
  id: 7,
  name: '亚运公园',
  position: [113.325118,23.111745]
}, {
  id: 8,
  name: '海洋之舟',
  position: [113.326266,23.111479]
}, {
  id: 9,
  name: '映月传说',
  position: [113.327226,23.111227]
}, {
  id: 10,
  name: '二号餐厅',
  position: [113.327945,23.111691]
}, {
  id: 11,
  name: '龙堡吧',
  position: [113.328594,23.110956]
}, {
  id: 12,
  name: '花辣私厨花园餐吧',
  position: [113.329083,23.111192]
}];

/**
 * 地图信息窗体的点击事件
 * @param {id} id
 * @param {事件类型：100-去这里，101-预约，102-语音} types
 */
function lineMapFun(id, types) {
  linePoint.map(function (item, index, self) {
    if (item.id === id) {
      if (types === 102) {
        yuyinWeChat();

      } else if (types === 101) {
        yuyueWeChat(item.id);

      } else if (types === 100) {
        gotoWeChat(item.name, item.position);
      }
      return;
    }
  });
}

/**
 * 预约，跳转小程序
 * @param {id} idx
 */
function yuyueWeChat(idx) {
  if (idx === 5) { //海港餐厅
    wx.miniProgram.navigateTo({
      url: '../restaurant/restaurant'
    });
  } else { // if (idx === 6)云霄飞车
    wx.miniProgram.navigateTo({
      url: '../scheduleDetail/scheduleDetail'
    });
  }
}

/**
 * 去这里，跳转小程序
 * @param {名称} name
 * @param {坐标} position
 */
function gotoWeChat(name, position) {
  // 直接跳小程序页面
  // wx.miniProgram.navigateTo({
  //   url: '../gotoMap/gotoMap?name=' + name + '&lat=' + position[1] + '&lon=' + position[0]
  // });

  // 需要调用 wxConfigFun()
  wx.ready(function () {
    wx.openLocation({
      latitude: position[1],
      longitude: position[0],
      name: name,
    });
  });
}

/**
 * 语音，跳转小程序
 */
function yuyinWeChat() {
  wx.miniProgram.navigateTo({
    url: '../player/player'
  });
}

/**
 * 微信小程序 wx.config
 * @param {当前页面url} path 
 */
function wxConfigFun(path) {
  $.ajax({
    url: "https://hi.cxtrip.cc/cxyTicket/wechat/spot/getNormalConfig", //后台给你提供的接口
    type: "GET",
    data: {
      "url": path
    },
    async: true,
    dataType: "json",
    success: function (data) {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
        appId: data.content.appId, // 必填，公众号的唯一标识
        timestamp: data.content.timeStamp, // 必填，生成签名的时间戳
        nonceStr: data.content.nonceStr, // 必填，生成签名的随机串
        signature: data.content.paySign, // 必填，签名，见附录1
        jsApiList: data.content.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.error(function (res) {
        alert.log('wx', res);
      });
    },
    error: function (error) {
      alert('error', error)
    }
  });
}

$(function () {
  // 设置微信config
  wxConfigFun(location.href);
  // 我的（跳转到小程序）
  $('#myBtn').bind('click', function () {
    console.log('跳转小程序')
    wx.miniProgram.redirectTo({
      url: '../personal/index'
    });
  });
  // 头部菜单
  $('.nav-item').bind('click', function () {
    $(this).find('.nav-item-con').addClass('nav-active');
    $(this).siblings().find('.nav-item-con').removeClass('nav-active');
    $(this).find('.nav-img1').addClass('disnone');
    $(this).find('.nav-img2').removeClass('disnone');
    $(this).siblings().find('.nav-img1').removeClass('disnone');
    $(this).siblings().find('.nav-img2').addClass('disnone');
    if ($(this).index() == 0) {
      // ---------------------------------线路------------------------------------------------------------------
      isShowBtm = !isShowBtm;
      if (isShowBtm === false) {
        $('.rode-line').animate({ // 隐藏线路
          height: '0px'
        }, 400);
        map.clearMap(); // 清除地图覆盖物
      } else {
        $('.rode-line').animate({ // 显示线路
          height: '152px'
        }, 400);
        $('.rode-item').eq(0).siblings().find('span').removeClass('active');
        $('.rode-item').eq(0).siblings().find('p').removeClass('active');
        $('.rode-item').eq(0).find('span').addClass('active');
        $('.rode-item').eq(0).find('p').addClass('active');
        map.clearMap(); // 清除地图覆盖物

        const markers = [{
          btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(1, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
          title: '<p class="marker-title">海心园</p><p class="marker-con">海心园</p>',
          icon: './img/num4.png',
          position: [113.320907,23.111735]
        }, {
          btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(2, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
          title: '<p class="marker-title">亚运展馆</p><p class="marker-con">亚运展馆</p>',
          icon: './img/num3.png',
          position: [113.322334,23.1121]
        }, {
          btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(3, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
          title: '<p class="marker-title">亚运看台</p><p class="marker-con">亚运看台</p>',
          icon: './img/num2.png',
          position: [113.32242,23.111424]
        }, {
          btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(4, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
          title: '<p class="marker-title">珠江夜游</p><p class="marker-con">珠江夜游</p>',
          icon: './img/num1.png',
          position: [113.322801,23.112125]
        }];
        
        markers.forEach(function (marker) { // 添加点到地图上
          const newObj = new AMap.Marker({
            map: map,
            icon: marker.icon,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-12, -36)
          });
          newObj.content = '<div class="marker-box">' + marker.title + marker.btntxt + '</div>';
          newObj.on('click', markerClick);
          newObj.emit('click', {
            target: newObj
          });
        });
        map.setFitView(); // 自动适配到合适视野范围；无参数，默认包括所有覆盖物的情况
      }
    } else if ($(this).index() == 1) {
      // ---------------------------------餐饮------------------------------------------------------------------
      isShowBtm = false; //关闭了底部弹窗
      $('.rode-line').animate({ // 隐藏线路
        height: '0px'
      }, 400);
      map.clearMap(); // 清除地图覆盖物
      const markers = [{
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(5, 101)" class="marker-btn yuyueBtn"><img src="./img/yuyue_w.png" alt=""><span>预定</span></a><a href="javascript:void(0);" onclick="lineMapFun(5, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">花辣私厨花园餐吧</p><p class="marker-con">花辣私厨花园餐吧......</p>',
        icon: './img/eat.png',
        position: [113.329083,23.111192]
      }];
      markers.forEach(function (marker) { // 添加点到地图上
        const newObj = new AMap.Marker({
          map: map,
          icon: marker.icon,
          position: [marker.position[0], marker.position[1]],
          offset: new AMap.Pixel(-12, -36)
        });
        newObj.content = '<div class="marker-box">' + marker.title + marker.btntxt + '</div>';
        newObj.on('click', markerClick);
        newObj.emit('click', {
          target: newObj
        });
      });
      map.setFitView(); // 自动适配到合适视野范围；无参数，默认包括所有覆盖物的情况
    } else if ($(this).index() == 2) {
      // ---------------------------------游乐------------------------------------------------------------------
      isShowBtm = false; //关闭了底部弹窗
      $('.rode-line').animate({ // 隐藏线路
        height: '0px'
      }, 400);
      map.clearMap(); // 清除地图覆盖物

      const markers = [{
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(1, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">海心园</p><p class="marker-con">海心园</p>',
        icon: './img/play.png',
        position: [113.320907,23.111735]
      }, {
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(2, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">亚运展馆</p><p class="marker-con">亚运展馆</p>',
        icon: './img/play.png',
        position: [113.322334,23.1121]
      }, {
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(3, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">亚运看台</p><p class="marker-con">亚运看台</p>',
        icon: './img/play.png',
        position: [113.32242,23.111424]
      }, {
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(4, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">珠江夜游</p><p class="marker-con">珠江夜游</p>',
        icon: './img/play.png',
        position: [113.322801,23.112125]
      }];
      
      markers.forEach(function (marker) { // 添加点到地图上
        const newObj = new AMap.Marker({
          map: map,
          icon: marker.icon,
          position: [marker.position[0], marker.position[1]],
          offset: new AMap.Pixel(-12, -36)
        });
        newObj.content = '<div class="marker-box">' + marker.title + marker.btntxt + '</div>';
        newObj.on('click', markerClick);
        newObj.emit('click', {
          target: newObj
        });
      });
      map.setFitView(); // 自动适配到合适视野范围；无参数，默认包括所有覆盖物的情况
    } else if ($(this).index() == 3) {
      // ---------------------------------观光车------------------------------------------------------------------
      isShowBtm = false; //关闭了底部弹窗
      $('.rode-line').animate({ // 隐藏线路
        height: '0px'
      }, 400);
      map.clearMap(); // 清除地图覆盖物
      $('.mask-box').show(); //显示遮罩层
      $('.msg-box').show(); // 显示弹窗
      $('.msg-con').html('').html('确定呼叫观光车？');
      $('.msg-cancel').bind('click', function () {
        $('.msg-box').hide(); // 隐藏弹窗
        $('.mask-box').hide(); //隐藏遮罩层
      });
      $('.msg-confirm').bind('click', function () {
        $('.msg-con').html('').html('观光车已经在来的路上，请稍等');
      });
    }
  });

  // 线路：1、2、3、4点击时
  $('.rode-item').bind('click', function () {
    $(this).siblings().find('span').removeClass('active');
    $(this).siblings().find('p').removeClass('active');
    $(this).find('span').addClass('active');
    $(this).find('p').addClass('active');
    const index = 4 - $(this).find('span').html();
    const markers = [{
      btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(1, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
      title: '<p class="marker-title">海心园</p><p class="marker-con">海心园</p>',
      icon: './img/num4.png',
      position: [113.320907,23.111735]
    }, {
      btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(2, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
      title: '<p class="marker-title">亚运展馆</p><p class="marker-con">亚运展馆</p>',
      icon: './img/num3.png',
      position: [113.322334,23.1121]
    }, {
      btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(3, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
      title: '<p class="marker-title">亚运看台</p><p class="marker-con">亚运看台</p>',
      icon: './img/num2.png',
      position: [113.32242,23.111424]
    }, {
      btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(4, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
      title: '<p class="marker-title">珠江夜游</p><p class="marker-con">珠江夜游</p>',
      icon: './img/num1.png',
      position: [113.322801,23.112125]
    }];

    const newObj = new AMap.Marker({
      map: map,
      icon: markers[index].icon,
      position: [markers[index].position[0], markers[index].position[1]],
      offset: new AMap.Pixel(-12, -36)
    });
    newObj.content = '<div class="marker-box">' + markers[index].title + markers[index].btntxt + '</div>';
    newObj.on('click', markerClick);
    newObj.emit('click', {
      target: newObj
    });
    map.setFitView(); // 自动适配到合适视野范围；无参数，默认包括所有覆盖物的情况
  });

  // 点击遮罩层
  $('.mask-box').bind('click', function () {
    isShowBtm = false; //关闭了底部弹窗
    $(this).hide(); //隐藏遮罩层
    // 菜单
    $('.right-menu').animate({
      height: '0px'
    }, 400);
    // 提示弹窗
    $('.msg-box').hide(); // 隐藏弹窗
  });

  // 右侧菜单图标
  $('.right-item').bind('click', function () {
    if (isShowBtm == false) {
      if ($(this).index() == 0) {
        // ---------------------------------消息------------------------------------------------------------------
        $(this).find('img').eq(0).toggleClass('disnone');
        $(this).find('img').eq(1).toggleClass('disnone');
        $('.ativity-box').toggleClass('ativity-box-a');
        $('.ativity-info').addClass('disnone');
        $('.ativity-con').bind('click', function () {
          $('.ativity-info').toggleClass('disnone');
        });
      } else if ($(this).index() == 1) {
        // ---------------------------------菜单------------------------------------------------------------------
        isShowBtm = true; //打开了底部弹窗
        $('.mask-box').show(); //显示遮罩层
        $('.right-menu').animate({
          height: '120px'
        }, 400);
      } else if ($(this).index() == 2) {
        // ---------------------------------客服------------------------------------------------------------------
        console.log('跳转客服')
        wx.miniProgram.navigateTo({
          url: '../service/service'
        });
      } else if ($(this).index() == 3) {
        // ---------------------------------红包优惠卷------------------------------------------------------------------
        console.log('跳转小程序')
        wx.miniProgram.navigateTo({
          url: '../coupon/coupon'
        });
      }
    }
  });

  // 菜单列表点击时
  $('.right-menu-item').bind('click', function () {
    isShowBtm = false;
    $('.mask-box').hide(); //隐藏遮罩层
    $('.right-menu').animate({
      height: '0px'
    }, 400);
    if ($(this).index() == 0) {
      // ---------------------------------停车场------------------------------------------------------------------
      map.clearMap(); // 清除地图覆盖物
      const markers = [{
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(7, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">停车场</p>',
        icon: './img/park.png',
        position: [113.327049,23.111883]
      }, {
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(8, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">停车场</p>',
        icon: './img/park.png',
        position: [113.327049,23.111883]
      }, {
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(9, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">停车场</p>',
        icon: './img/park.png',
        position: [113.327049,23.111883]
      }];
      markers.forEach(function (marker) { // 添加点到地图上
        const newObj = new AMap.Marker({
          map: map,
          icon: marker.icon,
          position: [marker.position[0], marker.position[1]],
          offset: new AMap.Pixel(-12, -36)
        });
        newObj.content = '<div class="marker-box">' + marker.title + marker.btntxt + '</div>';
        newObj.on('click', markerClick);
        newObj.emit('click', {
          target: newObj
        });
      });
      map.setFitView(); // 自动适配到合适视野范围；无参数，默认包括所有覆盖物的情况
    } else if ($(this).index() == 1) {
      // ---------------------------------卫生间------------------------------------------------------------------
      map.clearMap(); // 清除地图覆盖物
      

      const markers = [{
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(10, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">卫生间</p>',
        icon: './img/wc.png',
        position: [113.32397,23.110679]
      },{
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(10, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">卫生间</p>',
        icon: './img/wc.png',
        position: [113.327902,23.111493]
      }];

      markers.forEach(function (marker) { // 添加点到地图上
        const newObj = new AMap.Marker({
          map: map,
          icon: marker.icon,
          position: [marker.position[0], marker.position[1]],
          offset: new AMap.Pixel(-12, -36)
        });
        newObj.content = '<div class="marker-box">' + marker.title + marker.btntxt + '</div>';
        newObj.on('click', markerClick);
        newObj.emit('click', {
          target: newObj
        });
      });
      map.setFitView(); // 自动适配到合适视野范围；无参数，默认包括所有覆盖物的情况
    } else if ($(this).index() == 2) {
      // ---------------------------------便利店------------------------------------------------------------------
      map.clearMap(); // 清除地图覆盖物
      const markers = [{
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(11, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">便利店</p>',
        icon: './img/shop.png',
        position: [113.114742, 22.070709]
      }];
      markers.forEach(function (marker) { // 添加点到地图上
        const newObj = new AMap.Marker({
          map: map,
          icon: marker.icon,
          position: [marker.position[0], marker.position[1]],
          offset: new AMap.Pixel(-12, -36)
        });
        newObj.content = '<div class="marker-box">' + marker.title + marker.btntxt + '</div>';
        newObj.on('click', markerClick);
        newObj.emit('click', {
          target: newObj
        });
      });
      map.setFitView(); // 自动适配到合适视野范围；无参数，默认包括所有覆盖物的情况
    } else if ($(this).index() == 3) {
      // ---------------------------------行李寄存------------------------------------------------------------------
      map.clearMap(); // 清除地图覆盖物
      const markers = [{
        btntxt: '<div class="marker-btn-box"><a href="javascript:void(0);" onclick="lineMapFun(12, 100)" class="marker-btn gotoBtn"><img src="./img/goto_w.png" alt=""><span>去这里</span></a></div>',
        title: '<p class="marker-title">行李寄存</p>',
        icon: './img/bag.png',
        position: [113.115053, 22.070834]
      }];
      markers.forEach(function (marker) { // 添加点到地图上
        const newObj = new AMap.Marker({
          map: map,
          icon: marker.icon,
          position: [marker.position[0], marker.position[1]],
          offset: new AMap.Pixel(-12, -36)
        });
        newObj.content = '<div class="marker-box">' + marker.title + marker.btntxt + '</div>';
        newObj.on('click', markerClick);
        newObj.emit('click', {
          target: newObj
        });
      });
      map.setFitView(); // 自动适配到合适视野范围；无参数，默认包括所有覆盖物的情况
    }
  });
});
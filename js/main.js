function big(){
    //获取原始高度和宽度  height()  width()
    var $yuangao = $('#BigPic1 img').height();
    var $yuankuan = $('#BigPic1 img').width();

    //增大动画效果，每次给宽度增加5px
    //新高 = (新宽*原高)/原宽;
    var $xinkuan = $yuankuan + 20;
    var $xingao = ($xinkuan * $yuangao) / $yuankuan;

    //设置原始高度和宽度  height(val)  width(val)
    $('#BigPic1 img').height($xingao);
    $('#BigPic1 img').width($xinkuan);
}
function small(){
    //获取原始高度和宽度  height()  width()
    var $yuangao = $('#BigPic1 img').height();
    var $yuankuan = $('#BigPic1 img').width();
    //减小动画效果，每次给宽度减少5px
    //新高 = (新宽*原高)/原宽;
    var $xinkuan = $yuankuan - 20;
    var $xingao = ($xinkuan * $yuangao) / $yuankuan;
    //设置原始高度和宽度  height(val)  width(val)
    $('#BigPic1 img').height($xingao);
    $('#BigPic1 img').width($xinkuan);
}
var app = {
    init:function () {
    },
    //创建元素函数
    element: function (tag,attrs,html) {
        var element = document.createElement(tag);
        // 判断第二个参数是属性还是内容
        if(typeof(attrs) === "string"){
            html = attrs;
            attrs = null;
        }
        // 判断是否有属性
        if(attrs !== undefined){
            for(var attr in attrs){
                element.setAttribute(attr,attrs[attr]);
            }
        }
        // 判断是否有内容
        if(html !== undefined){
            element.innerHTML = html;
        }
        return element;
    },

    //地图
    map : function () {  // 百度地图API功能
        var map = new BMap.Map("myMap");    // 创建Map实例

        var point=new BMap.Point(114.0579778,22.5435410);
        map.centerAndZoom(point,15);  // 初始化地图,设置中心点坐标和地图级别

        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        //添加比例尺等控件
        var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});// 左上角，添加比例尺
        var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
        //var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
        /*缩放控件type有四种类型:
            BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/
        map.addControl(top_left_control);
        map.addControl(top_left_navigation);

        //添加缩略图
        var overView = new BMap.OverviewMapControl();
        var overViewOpen = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
        map.addControl(overView);          //添加默认缩略地图控件
        // map.addControl(overViewOpen);      //右下角，打开
        //添加点
        var marker = new BMap.Marker(point); // 创建点
        map.addOverlay(marker);            //增加点

        // 百度地图API功能
        function G(id) {
            return document.getElementById(id);
        }

        // 定义一个控件类,即function
        function ZoomControl() {
            this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
            this.defaultOffset = new BMap.Size(10, 10);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ZoomControl.prototype.initialize = function(map){
            // 创建一个DOM元素
            var div = document.createElement("div");
            div.innerHTML = '<div id="r-result">搜索地址:<input type="text" id="suggestId" size="20" value="百度" style="width:150px;" /></div><div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>';

            // 添加DOM元素到地图中
            map.getContainer().appendChild(div);
            // 将DOM元素返回
            return div;
        }

        // 创建控件
        var myZoomCtrl = new ZoomControl();
        // 添加到地图当中
        map.addControl(myZoomCtrl);


        var ac = new BMap.Autocomplete( //建立一个自动完成的对象
            {"input" : "suggestId"
                ,"location" : map
            });

        ac.addEventListener("onhighlight", function(e) { //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("searchResultPanel").innerHTML = str;
        });

        var myValue;
        ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
            G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

            setPlace();
        });

        function setPlace(){
            map.clearOverlays(); //清除地图上所有覆盖物
            function myFun(){
                var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
                map.centerAndZoom(pp, 14);
                map.addOverlay(new BMap.Marker(pp)); //添加标注
            }
            var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });
            local.search(myValue);
        }

    },



};
app.init();
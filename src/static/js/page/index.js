import '../../scss/index.scss';
import '../../scss/fullpage.css';
import '../plugin/loading/loading.min.css';

import 'swiper/css/swiper.min.css';
import Swiper from 'swiper/js/swiper';

require('../plugin/amap.min.js');
require('../plugin/fullpage.js');
require('../plugin/validform.js');
require('../plugin/livechatinc.js');
require('../plugin/jquery.lazyload.js');

import Loading from '../plugin/loading/loading.min.js';

import mapIcon from '../../images/amap-marker.png';
import logo1 from '../../images/logo.png';
import logo2 from '../../images/logo2.png';

class indexPage {
    init() {
        this.loading();
        $('.fullPage').show();
        this.validform();
        this.map();
        this.fullpage();
        this.proSwiper();
    }

    loading() {
        new Loading({
            timeToHide: 1500, //Time in milliseconds for fakeLoader disappear   你的loading需要显示的时间
            zIndex: 9999, // Default zIndex    z-index层
            spinner: 'Loading12', //Options: 'loading1', 'loading2', 'loading3', 'loading4', 'loading5', 'loading6',......, 'loading48' 共48种特效
            bgColor: '#5e5d5d', //Hex, RGB or RGBA colors  遮罩背景颜色
            //imagePath:"yourPath/customizedImage.gif" //你的gif图片路径  可选
        });
    }

    proSwiper() {
        var proSwiper = new Swiper('.pro-item', {
            slidesPerView: 1,
            slidesPerGroup: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    fullpage() {
        $('#full-box').fullpage({
            anchors: [
                'home',
                'laboratory',
                'voopoo',
                'cbd-sectors',
                'odm-services',
                'msg',
            ],
            menu: '.nav',
            verticalCentered: false,
            navigation: true,
            afterLoad: function(anchorLink, index) {
                if (index == 1) {
                    var video = document.getElementById('video');
                    video.play();
                } else if (index == 2) {
                    $('.full-box .full2').lazyload();
                    $('.header').addClass('active');
                    $('.logo img').attr('src', logo2);
                    $('.full2 .text').animate(
                        {
                            marginLeft: -620,
                            opacity: 1,
                        },
                        500
                    );
                } else if (index == 3) {
                    $('.full-box .full3').lazyload();
                    $(
                        '.full3 .voopoo,.full3 .drag1,.full3 .wrap,.full3 .link-web'
                    ).addClass('active');
                    $('.full3 .spark img').animate(
                        {
                            opacity: 1,
                        },
                        500
                    );
                    $('.spark')
                        .delay(500)
                        .animate(
                            {
                                opacity: 0,
                            },
                            500
                        );
                    $('.full3 .voopoo')
                        .delay(1000)
                        .animate(
                            {
                                opacity: 1,
                            },
                            500
                        )
                        .animate(
                            {
                                top: 170,
                            },
                            1200
                        );
                    $('.full3 .mask')
                        .delay(1500)
                        .animate(
                            {
                                opacity: 0,
                                zIndex: 5,
                            },
                            500
                        );
                } else if (index == 4) {
                    $('.full-box .full4').lazyload();
                    $('.header').addClass('active');
                    $('.logo img').attr('src', logo2);
                    $(
                        '.full4 .dopex,.full4 .devices,.full4 .link-web,.full4 .list'
                    ).addClass('active');
                } else if (index == 5) {
                    $('.full-box .full5 .bg').lazyload();
                    $('.to-top').show();
                    $('.header').addClass('active');
                    $('.logo img').attr('src', logo2);
                } else if (index == 6) {
                    $('.full-box .full6').lazyload();
                    $('.to-top').show();
                }
            },
            onLeave: function(index, nextIndex, direction) {
                if (index == 1) {
                    var video = document.getElementById('video');
                    video.pause();
                } else if (index == 2 || index == 4 || index == 5) {
                    $('.to-top').hide();
                    $('.header').removeClass('active');
                    $('.logo img').attr('src', logo1);
                } else if (index == 6) {
                    $('.to-top').hide();
                }
            },
        });
    }

    validform() {
        $('#mesForm').Validform({
            btnSubmit: '#mesSubmit',
            tiptype: function(msg, o, cssctl) {
                if (!o.obj.is('form')) {
                    var objtip = $('#msgdemo2');
                    //var objtip=o.obj.parents('li').find(".Validform_checktip");
                    cssctl(objtip, o.type);
                    objtip.text(msg);
                }
            },
            postonce: true,
            ajaxPost: true,
            callback: function(data) {
                if (data.status == 1) {
                    alert(
                        'Submitted successfully, please wait for our feedback'
                    );
                    $('#mesForm')
                        .Validform()
                        .resetForm();
                    resetForm();
                } else {
                    console.log(data);
                    alert('System error, please try again later');
                }
            },
        });
        $.Tipmsg.r = '';
    }
    map() {
        //初始化地图
        let map = new AMap.Map('container', {
            resizeEnable: true, //是否监控地图容器尺寸变化
            zoom: 17, //初始地图级别
            center: [113.9524205, 22.533599999], //初始地图中心点
            lang: 'en', //可选值：en，zh_en, zh_cn
        });

        //显示地图层级与中心点信息
        function logMapinfo() {
            var zoom = map.getZoom(); //获取当前地图级别
            var center = map.getCenter(); //获取当前地图中心位置

            // document.querySelector("#map-zoom").innerText = zoom;
            // document.querySelector("#map-center").innerText = center.toString();
        }

        //绑定地图移动与缩放事件
        map.on('moveend', logMapinfo);
        map.on('zoomend', logMapinfo);
        // -------------------------------------------------------------------------------------------------------------
        // --------------------------------------------------------------------------------------------------------
        var marker = new AMap.Marker({
            position: map.getCenter(),
            icon: mapIcon,
            offset: new AMap.Pixel(-2, -12),
        });

        marker.setMap(map);

        // 设置鼠标划过点标记显示的文字提示
        // marker.setTitle('我是marker的title');
        AMap.plugin(['AMap.ToolBar'], function() {
            // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
            map.addControl(
                new AMap.ToolBar({
                    // 简易缩放模式，默认为 false
                    liteStyle: true,
                })
            );
        });
    }
}

new indexPage().init();

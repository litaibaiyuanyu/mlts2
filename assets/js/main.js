var iUp = (function () {
    // 保持原有动画逻辑不变
    var t = 0,
        d = 150,
        clean = function () {
            t = 0;
        },
        up = function (e) {
            setTimeout(function () {
                $(e).addClass("up")
            }, t);
            t += d;
        },
        down = function (e) {
            $(e).removeClass("up");
        },
        toggle = function (e) {
            setTimeout(function () {
                $(e).toggleClass("up")
            }, t);
            t += d;
        };
    return {
        clean: clean,
        up: up,
        down: down,
        toggle: toggle
    }
})();

$(document).ready(function () {

    // 固定一言数据
    const FIXED_HITOKOTO = {
        hitokoto: "在有限的时间里无限的爱你！",
        from: "鵷羽"
    };
    $('#description').html(
        `${FIXED_HITOKOTO.hitokoto}<br/> -「<strong>${FIXED_HITOKOTO.from}</strong>」`
    );

    // 固定背景设置
    const $panel = $('#panel');
    const FIXED_BG_URL = 'background.png'; // 当前目录下的图片

    // 设置背景并添加错误处理
    $panel.css({
        'background': `url('${FIXED_BG_URL}') center/cover no-repeat #666`,
        'background-size': 'cover'
    }).on('error', function() {
        console.error('背景图片加载失败');
        $(this).css('background', '#666'); // 降级方案
    });

    // 保持原有动画初始化
    $(".iUp").each(function (i, e) {
        iUp.up(e);
    });

    // 保持头像加载逻辑
    $(".js-avatar")[0].onload = function () {
        $(".js-avatar").addClass("show");
    }
});

// 保持移动菜单切换逻辑不变
$('.btn-mobile-menu__icon').click(function() {
    if ($('.navigation-wrapper').css('display') == "block") {
      $('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
        $('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
      });
      $('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');

    } else {
      $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
    }
    $('.btn-mobile-menu__icon').toggleClass('social iconfont icon-list social iconfont icon-angleup animated fadeIn');
});

$(function() {
        $("#search_box").fixDiv({
            top : 0
        });

        $("#search_btn").click(highlight);
        $('#search_str').keydown(function(e) {
            var key = e.which;
            if (key == 13) highlight();
        });

        var i = 0;
        var sCurText;
        function highlight() {
            clearSelection(); //清空上一次高亮显示的内容
            var flag = 0;
            var bStart = true;
            $('#tip').text('');
            $('#tip').hide();
            var searchText = $('#search_str').val();
            var _searchTop = $('#search_str').offset().top + 30;
            var _searchLeft = $('#search_str').offset().left;
            if ($.trim(searchText) == "") {
                showTips("请输入关键字", _searchTop, 3, _searchLeft);
                return;
            }
            //查找匹配
            var searchText = $('#search_str').val();
            var regExp = new RegExp(searchText, 'g');
            var content = $("#content").text();
            if (!regExp.test(content)) {
                showTips("没有找到", _searchTop, 3, _searchLeft);
                return;
            } else {
                if (sCurText != searchText) {
                    i = 0;
                    sCurText = searchText;
                }
            }
            //高亮显示
            $('p').each(function() {
                var html = $(this).html();
                var newHtml = html.replace(regExp, '<span class="highlight">' + searchText + '</span>');
                $(this).html(newHtml);
                flag = 1;
            });
            //定位并提示信息
            if (flag == 1) {
                if ($(".highlight").size() > 1) {
                    var _top = $(".highlight").eq(i).offset().top +
                    $(".highlight").eq(i).height();
                    var _tip = $(".highlight").eq(i).parent().find("strong").text();
                    if (_tip == "") {
                        _tip = $(".highlight").eq(i).parent().parent().find("strong").text();
                    }
                    var _left = $(".highlight").eq(i).offset().left;
                    var _tipWidth = $("#tip").width();
                    if (_left > $(document).width() - _tipWidth) {
                        _left = _left - _tipWidth;
                    }
                    $("#tip").html(_tip).show();
                    $("#tip").offset({
                        top : _top,
                        left : _left
                    });
                    $("#search_btn").val("查找下一个");
                } else {
                    var _top = $(".highlight").offset().top + $(".highlight").height();
                    var _tip = $(".highlight").parent().find("strong").text();
                    var _left = $(".highlight").offset().left;
                    $('#tip').show();
                    $("#tip").html(_tip).offset({
                        top : _top,
                        left : _left
                    });
                }
                $("html, body").animate({
                    scrollTop : _top - 50
                });
                i++;
                if (i > $(".highlight").size() - 1) {
                    i = 0;
                }
            }
        }
        function clearSelection() {
            $('p').each(function() {
                //找到所有highlight属性的元素；
                $(this).find('.highlight').each(function() {
                    $(this).replaceWith($(this).html()); //将他们的属性去掉；
                });
            });
        }


        var tipsDiv = '<div class="tipsClass"></div>';
        $('body').append(tipsDiv);
        function showTips(tips, height, time, left) {
            var windowWidth = document.documentElement.clientWidth;
            $('.tipsClass').text(tips);
            $('div.tipsClass').css({
                'top' : height + 'px',
                'left' : left + 'px',
                'position' : 'absolute',
                'padding' : '8px 6px',
                'background' : '#000000',
                'font-size' : 14 + 'px',
                'font-weight' : 900,
                'margin' : '0 auto',
                'text-align' : 'center',
                'width' : 'auto',
                'color' : '#fff',
                'border-radius' : '2px',
                'opacity' : '0.8',
                'box-shadow' : '0px 0px 10px #000',
                '-moz-box-shadow' : '0px 0px 10px #000',
                '-webkit-box-shadow' : '0px 0px 10px #000'
            }).show();
            setTimeout(function() {
                $('div.tipsClass').fadeOut();
            }, (time * 1000));
        }
    })
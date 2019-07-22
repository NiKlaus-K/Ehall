$(function() {
    $("#search_btn").click(highlight);
    var i = 0;
    var sCurText;

    function highlight() {
        clearSelection(); //清空上一次高亮显示的内容
        var flag = 0;
        // var bStart = true;
        $('#t1').text('');
        $('#t1').hide();
        var searchText = $('#search_str').val();
        var _searchTop = $('#search_str').offset().top + 30;
        var _searchLeft = $('#search_str').offset().left;
        if (searchText == "") {
            showTips("请输入关键字", _searchTop, 3, _searchLeft);
            return;
        }
        //定义查找字符串
        var searchText = $('#search_str').val();
        // 正则表达式匹配new RegExp(pattern, attributes);
        // pattern 是一个字符串，指定了正则表达式的模式或其他正则表达式
        // attributes 是一个可选的字符串，包含属性 "g"、"i" 和 "m"，分别用于指定全局匹配、区分大小写的匹配和多行匹配。
        // 返回值：一个新的 RegExp 对象，具有指定的模式和标志。如果参数 pattern 是正则表达式而不是字符串，那么 RegExp() 构造函数将用与指定的 RegExp 相同的模式和标志创建一个新的 RegExp 对象。
        var regExp = new RegExp(searchText, 'g');
        var content = $("#content").text();
        // test() 方法用于检测一个字符串是否匹配某个模式
        // RegExpObject.test(string) 如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。
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
        // .each() 方法用来会迭代jQuery对象中的每一个DOM元素。每次回调函数执行时，会传递当前循环次数作为参数(从0开始计数)。更重要的是，回调函数是在当前DOM元素为上下文的语境中触发的。
        // 因此关键字 this 总是指向这个元素。
        $('a').each(function() {
            var html = $(this).html();
            var newHtml = html.replace(regExp, '<span class="highlight">' + searchText + '</span>');
            $(this).html(newHtml);
            flag = 1;

        });
        //定位并提示信息
        if (flag == 1) {
            // 返回jQuery对象中的元素数。
            // 从jQuery 1.8开始，.size()该方法已弃用。请改用该.length属性
            if ($(".highlight").length > 1) {
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
                    top: _top,
                    left: _left
                });
                // $("#search_btn").val("查找下一个");
            } else {
                var _top = $(".highlight").offset().top + $(".highlight").height();
                var _tip = $(".highlight").parent().find("strong").text();
                var _left = $(".highlight").offset().left;
                $('#tip').show();
                $("#tip").html(_tip).offset({
                    top: _top,
                    left: _left
                });
            }
            $("html, body").animate({
                scrollTop: _top - 50
            });
            i++;
            if (i > $(".highlight").length - 1) {
                i = 0;
            }
        }
    }

    function clearSelection() {
        $('a').each(function() {
            //找到所有highlight属性的元素；
            $(this).find('.highlight').each(function() {
                $(this).replaceWith($(this).html()); //将他们的属性去掉；
            });
        });
    }


    var tipsDiv = '<div class="tipsClass"></div>';
    $('body').append(tipsDiv);
    // 设置提示标签
    function showTips(tips, height, time, left) {
        var windowWidth = document.documentElement.clientWidth;
        $('.tipsClass').text(tips);
        $('div.tipsClass').css({
            'top': height + 'px',
            'left': left + 'px',
            'position': 'absolute',
            'padding': '8px 6px',
            'background': '#000000',
            'font-size': 14 + 'px',
            'font-weight': 900,
            'margin': '0 auto',
            'text-align': 'center',
            'width': 'auto',
            'color': '#fff',
            'border-radius': '2px',
            'opacity': '0.8',
            'box-shadow': '0px 0px 10px #000',
            '-moz-box-shadow': '0px 0px 10px #000',
            '-webkit-box-shadow': '0px 0px 10px #000'
        }).show();
        setTimeout(function() {
            $('div.tipsClass').fadeOut();
        }, (time * 1000));
    }
})
//=============Check Browser============
if ($.browser.mozilla && $.browser.version >= "2.0") {
//   alert('Mozilla above 1.9');
}

if ($.browser.safari) {
//   alert('Safari');
}

if ($.browser.opera) {
//   alert('Opera');
}

if ($.browser.msie && $.browser.version <= 6) {
//   alert('IE 6 or below version');
}

if ($.browser.msie && $.browser.version > 6) {
//   alert('IE above 6');
}
//=============================================

function draggable(elm) {
    var l, t, x, y;
    var dragged = false;
    var element = $('#' + elm);
    var z_idx = 0;
    if (element.css('left') == 'auto') {
        element.css('left', 0);
    }
    if (element.css('top') == 'auto') {
        element.css('top', 0);
    }
    element.hover(function () {
        $(this).css('cursor', 'move');
    });
    element.live("mousedown.draggable_" + elm, function (e) {
        dragged = true;
        element.addClass('draggable');
        var me = $(this);
        x = parseInt(me.css('left'));
        y = parseInt(me.css('top'));
        l = e.pageX;
        t = e.pageY;
        $('.draggable').each(function () {
            var z = parseInt($(this).css('z-index'));
            if (z_idx <= z) {
                z_idx = z + 1;
            }
        });
        element.css('z-index', z_idx);
        return false;
    });

    $(document).live("mousemove.draggable_" + elm,
        function (e) {
            if (dragged) {
                var left = e.pageX - l + x;
                var top = e.pageY - t + y;
                if (left < 0) {
                    left = 0
                }
                if (top < 0) {
                    top = 0
                }
                element.css({
                    'left': left,
                    'top': top
                });
            }
        }).live("mouseup.draggable_" + elm, function () {
            dragged = false;
            element.removeClass('draggable');
        });
}

function tableResize(elm) {
    var table = $('#' + elm);
    var tableResizeable = false;
    var head, c, width, l, r;
    var target;
    var idx;
    var curr_idx;
    var head_list;
    var content_list;
    var tableResize = $('.tableResize', table);
    var n = $('li', $('.tblHead', table)).length;
    var wCtn = 0;
    for (var i = 0; i < n; i++) {
        wCtn = wCtn + $('li:eq(' + i + ')', $('.tblContent>li', table)).outerWidth() + 1;
    }
    if (wCtn < $('.tableContainer', table).width()) {
        wCtn = $('.tableContainer', table).width();
    }
    $('.tblHead,.tblContent', table).width(wCtn);
    $(window).resize(function () {
        wCtn = ($('li', $('.tblHead', table)).outerWidth() + 2) * n;
        if (wCtn < $('.tableContainer', table).width()) {
            wCtn = $('.tableContainer', table).width();
        }
        $('.tblHead,.tblContent', table).width(wCtn);
    });
    tableResize.bind("mousedown.tableResize_" + elm, function (e) {
        tableResizeable = true;
        target = $(e.target);
        head = target.closest('li');
        head_list = $('.tblHead>li', table);
        content_list = $('ul>li', $('.tblContent>li', table));
        idx = head.index();
        for (var i = 0; i < head_list.length; i++) {
            var h_li = head_list[i];
            var c_li = content_list[i];
            if ($(h_li)[i] == head[i]) {
                curr_idx = idx;
                break;
            }
        }
        $(this).addClass('isResize').css('opacity', 1);
        width = head.width();
        l = e.pageX;
        return false;
    });
    $(document).bind("mousemove.tableResize_" + elm,
        function (e) {
            if (tableResizeable) {
                var w = e.pageX - l + width;
                var rows = $('.tblContent>li', table);
                var content = $('ul>li:eq(' + curr_idx + ')', rows);
                head.css('width', w + 'px');
                content.css('width', w + 'px');
                var wUl = 0;
                for (var i = 0; i < n; i++) {
                    wUl = wUl + $('li:eq(' + i + ')', rows).outerWidth() + 1;
                }
                if (wUl < $('.tableContainer', table).width()) {
                    wUl = $('.tableContainer', table).width();
                }
                $('.tblHead,.tblContent', table).width(wUl);
            }
        }).bind("mouseup.tableResize_" + elm, function () {
            tableResizeable = false;
            $('.isResize').removeAttr('style').removeClass('isResize');
        });
}

function updateTable() {
    $('.table').each(function () {
        var wUl = 0;
        var me = $('#' + $(this).attr('id'));
        var rows = $('.tblHead', me);
        var col = $('li', me).length;
        for (var i = 0; i < col; i++) {
            wUl = wUl + $('li:eq(' + i + ')', rows).outerWidth() + 1;
        }
        if (wUl < $('.tableContainer', me).width()) {
            wUl = $('.tableContainer', me).width();
        }
        $('.tblHead,.tblContent', me).width(wUl);
    });
}

function accordionCustom(container, head, content, type) {
    //type : single or multiple
    var accordionContainer = $('.' + container);
    //$('.' + content, accordionContainer).hide();
    //$('.' + content, accordionContainer).first().show();
    //$('.' + head, accordionContainer).first().find('.arrowAcc').addClass('openArrow');
    $('.' + head, accordionContainer).find('.arrowAcc').addClass('openArrow');
    $('.' + head, accordionContainer).first().css('border-bottom', '1px dotted #CCCCCC');
    accordionContainer.each(function () {
        var me = $(this);
        var accordionTitle = $('.' + head, me);
        accordionTitle.css("cursor", "pointer");
        var accordionContent = $('.' + content, me);
        accordionTitle.live("click", function () {
            if (type == "multiple") {
                if ($(this).closest(me).find($('.' + content)).css('display') != 'block') {
                    accordionContent.slideDown(100);
                    $(this).css('border-bottom', '1px dotted #CCCCCC');
                    $(this).find('.arrowAcc').addClass('openArrow');
                } else {
                    accordionContent.slideUp(100);
                    $(this).css('border-bottom', 'none');
                    $(this).find('.arrowAcc').removeClass('openArrow');
                }
            } else {
                $('.' + content, accordionContainer).slideUp(100);
                if ($(this).closest(me).find($('.' + content)).css('display') != 'block') {
                    accordionContent.slideDown(100);
                }
            }
        });
    });
}

function getDaysInMonth(m, y) {
    return /8|3|5|10/.test(--m) ? 30 : m == 1 ? (!(y % 4) && y % 100) || !(y % 400) ? 29 : 28 : 31;
}

/* date Picker */
(function ($) {
    $.fn.jcalpic = function (options) {
        //type : 0 (when click), 1(always show)
        var opts = $.extend({
            start: '',
            place: '',
            max60day: false,
            leftReduce: 0,
            todayDefault: false,
            timeValidity: false,
            birthDate: false,
            type: 0,
            weekdays: ["M", "T", "W", "T", "F", "S", "S"],
            weekdays_long: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            monthname: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            format: 'DD-MM-YYYY'
        }, options);

        return this.each(function () {
            var input = $(this);
            var cp;
            var active_date = new Date();
            var cm = {
                init: function () {
                    if (opts.type == 1) {
                        cm.action();
                    } else {
                        input.live('click', function () {
                            cm.action();
                        });
                    }
                    if (opts.todayDefault) {
                        var default_value = active_date.getDate() + '-' + active_date.getMonth() + '-' + active_date.getFullYear();
                        input.val(default_value);
                    }
                    styleForm();
                },
                action: function () {
                    var current_data = input.data('date');
                    active_date = (current_data == undefined) ? (new Date()) : new Date(current_data);
                    active_date.setDate(active_date.getDate() - active_date.getDate() + 1);
                    cm.createelm();
                    cm.createcal(current_data);
                    var year = active_date.getFullYear();
                    $('.jcp-prev', cp).bind('click', function () {
                        var month = active_date.getMonth() - 1;
                        if (month < 0) {
                            month = 11;
                            year -= 1;
                        }
                        active_date.setFullYear(year, month, 1);
                        cm.createcal(current_data);
                        styleForm();
                        return false;
                    });
                    $('.jcp-next', cp).bind('click', function () {
                        var month = active_date.getMonth() + 1;
                        if (month > 11) {
                            month = 0;
                            year += 1;
                        }
                        active_date.setFullYear(year, month, 1);
                        cm.createcal(current_data);
                        styleForm();
                        return false;
                    });
                    //var available = $('.available').length;
                    //console.log(available);
                    if (opts.type != 1) {
                        $(document).unbind('click.jcalendarpicker').bind('click.jcalendarpicker', function (e) {
                            var target = $(e.target);
                            if (target.closest('.jcalendarpicker').length <= 0 && target[0] !== input[0]) {
                                cp.slideUp(200, function () {
                                    cm.remove();
                                });
                                input.focusout();
                                $(document).unbind('click.jcalendarpicker');
                            }
                        });
                    }
                },
                createelm: function () {
                    cp = $('.jcalendarpicker');
                    if (cp.length <= 0) {
                        var cal_place = '';
                        if (opts.place == '') {
                            cal_place = $('body');
                        } else {
                            cal_place = opts.place;
                        }
                        cal_place.append('<div class="jcalendarpicker float"></div>');
                        var weekend_txt = ' class="jcp-weekend"';
                        cp = $('.jcalendarpicker');
                        if (opts.type == 1) {
                            cp.removeClass('float');
                        }
                        if (opts.max60day) {
                            cp.addClass('maxDay');
                        }
                        cp.append('<input type="hidden" id="max" value="0"/>');
                        cp.append('<div class="jcpl"></div>');
                        cp.append('<div class="jcpr"></div>');
                        cp.append('<div class="jcpc"></div>');
                        var jcpc = $('.jcpc', cp);
                        jcpc.append('<div class="jcp-head"></div>');
                        var jcp_head = $('.jcp-head', jcpc);
                        jcp_head.append('<div class="jcp-hl"><a class="jcp-prev">&lt;</a></div>');
                        jcp_head.append('<div class="jcp-hr"><a class="jcp-next">&gt;</a></div>');
                        jcp_head.append('<div class="jcp-hc"></div>');
                        var jcp_head_center = $('.jcp-hc', jcp_head);
                        jcp_head_center.append('<select class="jcp-month selectDatePicker"></select>');
                        var jcp_head_month = $('.jcp-month', jcp_head_center);
                        var curr_month = active_date.getMonth();
                        for (var mi = 0; mi < opts.monthname.length; mi++) {
                            var sel_month = (curr_month == mi) ? 'selected' : '';
                            jcp_head_month.append('<option value="' + mi + '" ' + sel_month + '>' + opts.monthname[mi] + '</option>');
                        }
                        jcp_head_center.append('<select class="jcp-year selectDatePicker"></select>');
                        var jcp_head_year = $('.jcp-year', jcp_head_center);
                        var curr_year = active_date.getFullYear();
                        var start_year = curr_year - 10;
                        var end_year = curr_year + 10;
                        if (opts.birthDate) {
                            start_year = curr_year - 80;
                            end_year = curr_year;
                        }
                        for (var yi = start_year; yi <= end_year; yi++) {
                            var sel_year = (curr_year == yi) ? 'selected' : '';
                            jcp_head_year.append('<option value="' + yi + '" ' + sel_year + '>' + yi + '</option>');
                        }
                        jcpc.append('<div class="jcp-days"></div>');
                        var jcp_head = $('.jcp-days', jcpc);
                        jcp_head.append('<ul></ul>');
                        var weekdays = opts.weekdays;
                        for (var wd = 0; wd < weekdays.length; wd++) {
                            $('ul', jcp_head).append('<li>' + weekdays[wd] + '</li>');
                        }
                        $('ul', jcp_head).append('<div class="clear"></div>');
                        jcpc.append('<div class="jcp-dates"><ul></ul></div>');
                        var jcp_dates = $('.jcp-dates ul', jcpc);
                        for (var wk = 1; wk <= 6; wk++) {
                            jcp_dates.append('<li class="jcp-week jcp-w' + wk + '"><ul></ul></li>');
                            var curr_week = $('.jcp-w' + wk + ' ul');
                            for (var dy = 1; dy <= 7; dy++) {
                                curr_week.append('<li' + ((dy == 7) ? weekend_txt : '') + '></li>');
                            }
                        }
                        curr_week.append('<div class="clear"></div>');
                    }

                    var input_left = input.offset()['left'];
                    var input_top = input.offset()['top'];
                    var input_w = input.outerWidth();
                    var input_h = input.outerHeight();
                    var cal_w = cp.outerWidth();
                    var cal_h = cp.outerHeight();
                    var window_w = $('body').outerWidth();
                    var window_h = $('body').outerHeight();
                    var cal_left = input_left + input_w;
                    var cal_top = input_top;
                    if (cal_left + cal_w > window_w) {
                        if (input_top + input_h + cal_h <= window_h && input_left + cal_w <= window_w) {
                            cal_left = input_left;
                            cal_top = input_top + input_h;
                        }
                        else {
                            cal_left = input_left - cal_w;
                        }
                    }

                    //============custom position===============//
                    cal_left = input.offset().left + input.width() - cp.width();
                    if (cal_left < input.offset().left) {
                        cal_left = input.offset().left;
                    }
                    cal_top = input.offset().top + input.outerHeight() + 3;
                    //==========================================

                    if (opts.type != 1) {
                        cp.hide().slideDown(200);
                        cal_left = cal_left - opts.leftReduce;
                        cp.css('left', cal_left);
                        cp.css('top', cal_top);
                    }
                },
                remove: function () {
                    cp.remove();
                },
                createcal: function (current_data) {
                    cm.updatecal(current_data);
                    $('.jcp-month', cp).change(function () {
                        var month_val = $('.jcp-month', cp).val();
                        var year_val = $('.jcp-year', cp).val();
                        active_date.setFullYear(year_val, month_val, 1);
                        active_date = new Date(active_date);
                        cm.updatecal(current_data);
                    });
                    $('.jcp-year', cp).change(function () {
                        var month_val = $('.jcp-month', cp).val();
                        var year_val = $('.jcp-year', cp).val();
                        active_date.setFullYear(year_val, month_val, 1);
                        active_date = new Date(active_date);
                        cm.updatecal(current_data);
                    });
                },
                updatecal: function (current_data) {
                    var current_date = new Date(active_date);
                    while (current_date.getDay() != 1) {
                        current_date.setDate(current_date.getDate() - 1);
                    }
                    var days = current_date;

                    var week = 1;
                    var month_elm = $('.jcp-month', cp);
                    $('option', month_elm).removeAttr('selected');
                    $('option[value="' + active_date.getMonth() + '"]', month_elm).attr('selected', 'selected');
                    var year_elm = $('.jcp-year', cp);
                    $('option', year_elm).removeAttr('selected');
                    $('option[value="' + active_date.getFullYear() + '"]', year_elm).attr('selected', 'selected');
                    $('.jcp-week li', cp).removeClass('jcp-inactive');

                    var today = new Date();

                    var last_day = new Date();
                    last_day.setDate(last_day.getDate() + 60);
                    var last_date = last_day.getDate();
                    var last_month = last_day.getMonth();
                    var last_year = last_day.getFullYear();

                    for (var i = 1; i <= 42; i++) {
                        var current_day = $('.jcp-w' + week + ' li')[(i - 1) % 7];
                        var content = days.getDate();
                        content = '<a>' + content + '</a>';
                        $(current_day).html(content);
                        var date_data = new Date(days);
                        $('a', current_day).data('date', date_data);

                        if (current_data != undefined &&
                            date_data.getDate() == current_data.getDate() &&
                            date_data.getMonth() == current_data.getMonth() &&
                            date_data.getFullYear() == current_data.getFullYear()) {
                            $(current_day).addClass('active');
                        }
                        else {
                            $(current_day).removeClass('active');
                        }

                        if (days.getMonth() != active_date.getMonth()) {
                            $(current_day).addClass('jcp-inactive');
                        }
                        // Change day, put everything above this line
                        days.setDate(days.getDate() + 1);
                        if (i % 7 == 0) {
                            week++;
                        }

                        //set today
                        if (date_data.getDate() == today.getDate() &&
                            date_data.getMonth() == today.getMonth() &&
                            date_data.getFullYear() == today.getFullYear()) {
                            $(current_day).addClass('today');
                        } else {
                            $(current_day).removeClass('today');
                        }

                        if (opts.max60day) {
                            //not available in 2 month later
                            var today_d = today.getDate();
                            var today_m = today.getMonth() + 1;
                            var today_y = today.getFullYear();
                            var d_total = getDaysInMonth(today_m, today_y);

                            var next_m_1, next_y_1, next_d_total_1;
                            (today_m == 12) ? next_m_1 = 1 : next_m_1 = today_m + 1;
                            (today_m == 12) ? next_y_1 = today_y + 1 : next_y_1 = today_y;
                            next_d_total_1 = getDaysInMonth(next_m_1, next_y_1);

                            var next_m_2, next_y_2, next_d_total_2;
                            (next_m_1 == 12) ? next_m_2 = 1 : next_m_2 = next_m_1 + 1;
                            (next_m_1 == 12) ? next_y_2 = next_y_1 + 1 : next_y_2 = next_y_1;
                            next_d_total_2 = getDaysInMonth(next_m_2, next_y_2);

                            var next_m_3, next_y_3, next_d_total_3;
                            (next_m_2 == 12) ? next_m_3 = 1 : next_m_3 = next_m_2 + 1;
                            (next_m_2 == 12) ? next_y_3 = next_y_2 + 1 : next_y_3 = next_y_2;
                            next_d_total_3 = getDaysInMonth(next_m_3, next_y_3);

                            var av_1 = d_total - today_d;
                            var av_2 = 60 - av_1;

                            var selected_m = parseInt($('.jcp-month').val()) + 1;
                            var selected_y = parseInt($('.jcp-year').val());

                            $(current_day).removeClass('available');
                            if (selected_m == today_m) {
                                for (var x = today_d; x <= d_total; x++) {
                                    if ($(current_day).find('a').text() == x) {
                                        $(current_day).addClass('available');
                                    }
                                    if ($(current_day).hasClass('jcp-inactive')) {
                                        $(current_day).addClass('available');
                                    }
                                }
                            } else if (selected_m == next_m_1 || selected_m == next_m_2) {
                                for (var y = 0; y <= next_d_total_1; y++) {
                                    if ($(current_day).find('a').text() == y) {
                                        $(current_day).addClass('available');
                                    }
                                    if ($(current_day).hasClass('jcp-inactive')) {
                                        $(current_day).addClass('available');
                                    }
                                }
                            }
                            if (selected_m == next_m_2) {
                                if ($(current_day).find('a').text() == last_date) {
                                    $(current_day).addClass('expired').removeClass('available');
                                }
                                $('.expired', cp).nextAll().removeClass('available');
                                $('.expired', cp).closest('.jcp-week').nextAll().find('.available').removeClass('available');
                            }
                            //-------------------------------
                        }
                    }

                    if (opts.max60day) {
                        $('.today', cp).prevAll().removeClass('available');
                        $('.today', cp).closest('.jcp-week').prevAll().find('.available').removeClass('available');
                    }

                    $('.jcp-week ul li a', cp).bind('click', function () {
                        if (opts.max60day) {
                            if ($(this).parent().hasClass('available')) {
                                //$('#notificationContainer li').first().fadeOut(150, function () {
                                //$(this).remove();
                                //});
                                cm.insertcal($(this).data('date'));
                                input.data('date', $(this).data('date'));
                            } else {
                                //notification('Please select available date',0);
                                return false
                            }
                        } else {
                            cm.insertcal($(this).data('date'));
                            input.data('date', $(this).data('date'));
                        }
                        if (opts.timeValidity) {
                            var new_date = $(this).data('date');
                            var today = new Date();
                            if (new_date.getDate() == today.getDate() &&
                                new_date.getMonth() == today.getMonth() &&
                                new_date.getFullYear() == today.getFullYear()) {
                                console.log('now');
                                var set_h = today.getHours() + 2;
                                var set_m = today.getMinutes();

                                if (set_m > 0 && set_m <= 15) {
                                    set_m = 15
                                }
                                else if (set_m > 15 && set_m <= 30) {
                                    set_m = 30
                                }
                                else if (set_m > 30 && set_m <= 45) {
                                    set_m = 45
                                }
                                else if (set_m > 45) {
                                    set_h = set_h + 1;
                                    set_m = 0
                                }

                                (set_h < 10) ? set_h = '0' + set_h : set_h;
                                (set_m < 10) ? set_m = '0' + set_m : set_m;


                                $('#time').val(set_h + ':' + set_m)
                            }
                        }
                        if (opts.type != 1) {
                            cp.slideUp(200, function () {
                                cm.remove();
                            });
                        } else {
                            $(this).closest(cp).find('.active').removeClass('active');
                            $(this).closest('li').addClass('active');
                        }
                    });
                },
                insertcal: function (cal_data) {
                    var return_str = opts.format;
                    return_str = return_str.replace(/DDDD/g, '-_-_-');
                    return_str = return_str.replace(/MMMM/g, '_-_-_');
                    return_str = return_str.replace(/DD/g, ('0' + cal_data.getDate()).substr(-2));
                    return_str = return_str.replace(/D/g, cal_data.getDate());
                    return_str = return_str.replace(/MM/g, ('0' + (cal_data.getMonth() + 1)).substr(-2));
                    return_str = return_str.replace(/M/g, cal_data.getMonth() + 1);
                    return_str = return_str.replace(/YYYY/g, cal_data.getFullYear());
                    return_str = return_str.replace(/YY/g, String(cal_data.getFullYear()).substr(-2));

                    var day_num = parseInt(parseInt(cal_data.getDay()) - 1);
                    return_str = return_str.replace(/-_-_-/gi, opts.weekdays_long[(day_num < 0) ? 6 : day_num]);
                    var month_num = parseInt(cal_data.getMonth());
                    return_str = return_str.replace(/_-_-_/gi, opts.monthname[(month_num > 11) ? 0 : month_num]);
                    input.val(return_str);

                    var str_d = return_str.split('-')[0];
                    var str_m = return_str.split('-')[1];
                    var str_y = return_str.split('-')[2];
                    $('#real_date').val(str_m + '-' + str_d + '-' + str_y);
                }
            };
            cm.init();
        });
    }
})($);

/* Time Picker */
(function ($) {
    $.timePic = {};
    $.timePic.version = "__BUILD_VERSION_NUMBER__";
    $.timePic.options = {
//        containerClass: undefined,
//        containerWidth: '22em',
//        hoursLabel:     'Hour',
//        minutesLabel:   'Minutes',
//        setButtonLabel: 'Set',
//        popupImage:     undefined,
        onFocusDisplay: true,
        zIndex: 25,
        onBeforeShow: undefined,
        validAfter2H: true,
        onClose: undefined
    };
    $.timePic._timePicInit = function () {

    }();// $.timePicInit()

    $.timePic.setHr = function (h) {
        $('#timePicUserSelHr').empty().append(h);
    };// END setHr() function

    $.timePic.setMin = function (m) {
        $('#timePicUserSelMin').empty().append(m);
    };// END setMin() function

    $.timePic.setTime = function () {
        var tSel = $('#timePicUserSelHr').text() + ":" + $('#timePicUserSelMin').text();
        $(".isPtTimeSelectActive").val(tSel);
        this.closeCntr();
    };// END setTime() function

    $.timePic.getHr = function (hour) {
        var selectHour = $('#timePicCntr').find('.timePicHr');
        var optH = '';

        for (var h = hour; h < 24; h++) {
            if (h < 10) {
                h = '0' + h;
            }
            optH += '<option value="' + h + '">' + h + '</option>';
        }
        selectHour.html(optH);
    };// END setHr() function

    $.timePic.getMin = function (min, hr) {
        var selectMin = $('#timePicCntr').find('.timePicMin');
        var optMin = '';

        if (min > 0 && min <= 15) {
            min = 15
        }
        else if (min > 15 && min <= 30) {
            min = 30
        }
        else if (min > 30 && min <= 45) {
            min = 45
        }
        else if (min > 45) {
            hr = hr + 1;
            min = 0
        }

        for (var m = min; m < 60; m = m + 15) {
            var nol = '';
            if (m < 10) {
                nol = '0';
            }
            optMin += '<option value="' + m + '">' + nol + m + '</option>';
        }
        selectMin.html(optMin);
    };// END setMin() function
    $.timePic.openCntr = function (ele) {
        $(document).ready(
            function () {
                //====================
                var today = new Date();
                var now_d = today.getDate();
                var now_h = today.getHours();
                var now_m = today.getMinutes();
                //now_h = 15;
                //now_m = 55
                var curr_d = $('#dateAvailable').val().split('-')[0];
                curr_d = parseInt(curr_d);
                var init_h = 0;
                var init_m = 0;
                if (now_d == curr_d) {
                    init_h = now_h + 2;
                    init_m = now_m;
                }
                //==================

                $('#timePicCntr').remove();
                if (!$('#timePicCntr').length) {
                    $("body").append(
                        '<div id="timePicCntr" class="timePicker">' +
                            '    <div class="head">' +
                            '        <div class="left">Preview</div>' +
                            '        <div class="right timePreview" id="timePicUserTime">' +
                            '           <span id="timePicUserSelHr">01</span>' +
                            '           <span id="">:</span>' +
                            '           <span id="timePicUserSelMin">00</span> ' +
                            '        </div>' +
                            '        <div class="clear"></div>' +
                            '    </div>' +
                            '    <div class="body">' +
                            '        <div class="timeList">' +
                            '            <div class="left label">Hour</div>' +
                            '            <div class="left dvd">:</div>' +
                            '            <div class="left selectTime">' +
                            '                <select class="selectTimePicker timePicHr"></select>' +
                            '            </div>' +
                            '            <div class="clear"></div>' +
                            '        </div>' +
                            '        <div class="timeList">' +
                            '            <div class="left label">Minutes</div>' +
                            '            <div class="left dvd">:</div>' +
                            '            <div class="left selectTime">' +
                            '                <select class="selectTimePicker timePicMin"></select>' +
                            '            </div>' +
                            '            <div class="clear"></div>' +
                            '        </div>' +
                            '        <div class="separatorTime"></div>' +
                            '        <div class="timeBtn right" id="cancelTime">Cancel</div>' +
                            '        <div class="timeBtn right" id="setTime">OK</div>' +
                            '        <div class="clear"></div>' +
                            '    </div>' +
                            '    <div class="cpBottom "></div>' +
                            '</div>'
                    );

                    var e = $('#timePicCntr').hide();

                    e.find('#cancelTime').bind("click", function () {
                        $.timePic.closeCntr();
                    });

                    e.find('#setTime').bind("click", function () {
                        $.timePic.setTime()
                    });


                    if (init_h == (now_h + 2) && init_m > 45) {
                        init_h = init_h + 1;
                    }

                    $.timePic.getHr(init_h);
                    $.timePic.getMin(init_m, hr);

                    e.find('.timePicMin').bind("change", function () {
                        $.timePic.setMin($(this).val());
                        updateTime($('#timePicUserSelHr').text(), $(this).val());
                    });

                    e.find('.timePicHr').bind("change", function () {
                        $.timePic.setHr($(this).val());
                        var min = (parseInt($(this).val()) <= init_h) ? init_m : 0;
                        $.timePic.getMin(min, hr);
                        if (min > 0 && min <= 15) {
                            min = 15
                        }
                        else if (min > 15 && min <= 30) {
                            min = 30
                        }
                        else if (min > 30 && min <= 45) {
                            min = 45
                        }
                        else if (min > 45) {
                            hr = hr + 1;
                            min = 0
                        }
                        updateTime($(this).val(), min);
                    });

                    $(document).mousedown($.timePic._doCheckMouseClick);
                }//end if
            }
        );

        $.timePic.closeCntr();
        $(".isPtTimeSelectActive").removeClass("isPtTimeSelectActive");
        var cntr = $("#timePicCntr");
        var i = $(ele).eq(0).addClass("isPtTimeSelectActive");
        var opt = i.data("timePicOptions");
        var style = i.offset();
        style['z-index'] = opt.zIndex;
        style.top = (style.top + i.outerHeight());
        style.left = (style.left + i.width() - cntr.width());
        cntr.css(style);
        var hr = '00';
        var min = '00';
        if (i.val()) {
            var re = /([0-9]{1,2}).*:.*([0-9]{2})/i;
            var match = re.exec(i.val());
            if (match) {
                hr = match[1] || '00';
                min = match[2] || '00';
            }
        }

        //====================
        var today = new Date();
        var now_d = today.getDate();
        var now_h = today.getHours();
        var now_m = today.getMinutes();
        //now_h = 15;
        //now_m = 55
        var curr_d = $('#dateAvailable').val().split('-')[0];
        curr_d = parseInt(curr_d);
        if (now_d == curr_d) {
            hr = now_h + 2;
            min = now_m;
            (hr < 10) ? hr = '0' + hr : hr;
            (min < 10) ? min = '0' + min : min;
        }
        //==================
        if (min > 0 && min <= 15) {
            min = 15
        }
        else if (min > 15 && min <= 30) {
            min = 30
        }
        else if (min > 30 && min <= 45) {
            min = 45
        }
        else if (min > 45) {
            hr = hr + 1;
            min = 0
        }

//        cntr.find("#timePicUserSelHr").empty().append(hr);
//        cntr.find("#timePicUserSelMin").empty().append(min);
        updateTime(hr, min);

        function updateTime(hr, min) {
            hr = parseInt(hr);
            min = parseInt(min);
            (hr < 10) ? hr = '0' + hr : hr;
            (min < 10) ? min = '0' + min : min;
            cntr.find("#timePicUserSelHr").empty().append(hr);
            cntr.find("#timePicUserSelMin").empty().append(min);
        }

        var selH = cntr.find(".timePicHr");
        var selMin = cntr.find(".timePicMin");
        $('option', selH).removeAttr('selected');
        $('option', selMin).removeAttr('selected');
        $('option[value=' + hr + ']', selH).attr('selected', 'selected');
        $('option[value=' + min + ']', selMin).attr('selected', 'selected');
        if (opt.onBeforeShow) {
            opt.onBeforeShow(i, cntr);
        }
        if (cntr.css('display') == 'none' || cntr.css('display') != 'block') {
            cntr.slideDown(200);
        }
        styleForm();

    };// END openCntr()

    $.timePic.closeCntr = function (i) {
        var e = $("#timePicCntr");
        if (e.is(":visible") == true) {

            // If IE, then check to make sure it is realy visible
            if ($.support.tbody == false) {
                if (!(e[0].offsetWidth > 0) && !(e[0].offsetHeight > 0)) {
                    return;
                }
            }

            $('#timePicCntr').slideUp(200, function () {
                $(this).remove();
            });
            if (!i) {
                i = $(".isPtTimeSelectActive");
            }
            if (i) {
                var opt = i.removeClass("isPtTimeSelectActive").data("timePicOptions");
                if (opt && opt.onClose) {
                    opt.onClose(i);
                }
            }
        }
        return;
    };//end closeCntr()

    $.timePic._doCheckMouseClick = function (ev) {
        if (!$("#timePicCntr:visible").length) {
            return;
        }
        if (!$(ev.target).closest("#timePicCntr").length
            && $(ev.target).not("input.isPtTimeSelectActive").length) {
            $.timePic.closeCntr();
        }

    };// $.timePic._doCheckMouseClick

    $.fn.timePic = function (opt) {
        return this.each(function () {
            if (this.nodeName.toLowerCase() != 'input') return;
            var e = $(this);
            if (e.hasClass('hasPtTimeSelect')) {
                return this;
            }
            var thisOpt = {};
            thisOpt = $.extend(thisOpt, $.timePic.options, opt);
            e.addClass('hasPtTimeSelect').data("timePicOptions", thisOpt);

            if (thisOpt.popupImage || !thisOpt.onFocusDisplay) {
                var img = $('<span>&nbsp;</span><a href="javascript:" onclick="' +
                    '$.timePic.openCntr($(this).data(\'timePicEle\'));">' +
                    thisOpt.popupImage + '</a>'
                ).data("timePicEle", e);
                e.after(img);
            }
            if (thisOpt.onFocusDisplay) {
                e.focus(function () {
                    $.timePic.openCntr(this);
                });
            }
            return this;
        });
    };// End of $.fn.timePic

})($);

/*dragSort*/
(function ($) {
    var dragging, placeholders = $();
    $.fn.sortable = function (options, callback) {
        var method = String(options);
        options = $.extend({
            connectWith: false
        }, options);
        return this.each(function () {
            if (/^enable|disable|destroy$/.test(method)) {
                var items = $(this).children($(this).data('items')).attr('draggable', method == 'enable');
                if (method == 'destroy') {
                    items.add(this).removeData('connectWith items')
                        .off('dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s');
                }
                return;
            }
            var isHandle, index, items = $(this).children(options.items);
            var placeholder = $('<' + (/^ul|ol$/i.test(this.tagName) ? 'li' : 'div') + ' class="sortable-placeholder"><div class="plc">Placed Here</div>');
            items.find(options.handle).mousedown(function () {
                isHandle = true;
            }).mouseup(function () {
                    isHandle = false;
                });
            $(this).data('items', options.items);
            placeholders = placeholders.add(placeholder);
            if (options.connectWith) {
                $(options.connectWith).add(this).data('connectWith', options.connectWith);
            }
            items.attr('draggable', 'true').on('dragstart.h5s',function (e) {
                if (options.handle && !isHandle) {
                    return false;
                }
                isHandle = false;
                var dt = e.originalEvent.dataTransfer;
                dt.effectAllowed = 'move';
                dt.setData('Text', 'dummy');
                index = (dragging = $(this)).addClass('sortable-dragging').index();
            }).on('dragend.h5s',function () {
                    dragging.removeClass('sortable-dragging').show();
                    placeholders.detach();
                    if (index != dragging.index()) {
                        items.parent().trigger('sortupdate', {item: dragging});
                    }
                    dragging = null;

                    // =============================
                    if (typeof (callback) == 'function') {
                        callback();
                    }
                    // =============================


                }).not('a[href], img').on('selectstart.h5s',function () {
                    this.dragDrop && this.dragDrop();
                    return false;
                }).end().add([this, placeholder]).on('dragover.h5s dragenter.h5s drop.h5s', function (e) {
                    if (!items.is(dragging) && options.connectWith !== $(dragging).parent().data('connectWith')) {
                        return true;
                    }
                    if (e.type == 'drop') {
                        e.stopPropagation();
                        placeholders.filter(':visible').after(dragging);
                        return false;
                    }
                    e.preventDefault();
                    e.originalEvent.dataTransfer.dropEffect = 'move';
                    if (items.is(this)) {
                        if (options.forcePlaceholderSize) {
                            placeholder.height(dragging.outerHeight());
                        }
                        dragging.hide();
                        $(this)[placeholder.index() < $(this).index() ? 'after' : 'before'](placeholder);
                        placeholders.not(placeholder).detach();
                    } else if (!placeholders.is(this) && !$(this).children(options.items).length) {
                        placeholders.detach();
                        $(this).append(placeholder);
                    }
                    return false;
                });
        });
    };
})($);

/* calender */
(function ($) {
    var active_date = new Date();

    function createCalendar(events) {
        active_date.setDate(active_date.getDate() - active_date.getDate() + 1);
        var current_date = new Date(active_date);
        while (current_date.getDay() != 1) {
            current_date.setDate(current_date.getDate() - 1);
        }
        var days = current_date;
        var week = 1;
        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var monthname = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        $('#jmonthyear').html(monthname[active_date.getMonth()] + " " + active_date.getFullYear());
        $('.jcalendar .month').css('margin-left', Math.floor($('.jcalendar .month').width() / 2) * -1);
        $('.jcalendar li').removeClass('inactive');
        for (var i = 1; i <= 42; i++) {
            var current_day = $('#jweek' + week + ' li')[(i - 1) % 7];
            var content = days.getDate();
            var event_date = days.getFullYear() + "-" + ("00" + (days.getMonth() + 1)).substr(-2) + "-" + ("00" + days.getDate()).substr(-2);
            var event = events[event_date];
            var evDay = event_date.substr(-2);
            var evMonth = monthname[days.getMonth()];
            var evYear = event_date.substr(-10, 4);
            if (event != undefined) {
                var len = event.length;
                var str = "";
                var event_date = "";
                var event_name = "";
                var event_detail = "";
                var event_image = "";
                for (var j = 0; j < len; j++) {
//                    str = str + "<div class='block'><p class='ttl'>" + event[j][0] + "</p><p>" + event[j][1] + "</p></div>";
                    //str = str + "<h1 style='text-align: left;'>" + event[j][0] + "</h1><div class='height10'></div><div class='date'>" + evDay + " " + evMonth + " " + evYear + "</div><div class='height10'></div><div class='evDescCont indent'>" + event[j][1] + "</div>";

                    event_date = evDay + " " + evMonth + " " + evYear;
                    event_name = event[j][0];
                    event_detail = event[j][1];
                    event_image = event[j][2];
                }
                //content = "<div class='eventDates'><a href=\"#id/" + event[0][2] + "\" class=\"simpletip\" title=\"" + str + "\">" + content + "</a></div>";
                content = '' +
                    '<div class="eventDates">' +
                    '   <a href="#id/"' + event[0][2] + ' class="simpletip"' +
                    '       data-event-date="' + event_date + '"' +
                    '       data-event-name="' + event_name + '"' +
                    '       data-event-detail="' + event_detail + '"' +
                    '       data-event-image="' + event_image + '"' +
                    '   >' + content + '</a>' +
                    '</div>';
            }
            $(current_day).html(content);
            if (days.getMonth() != active_date.getMonth()) {
                $(current_day).addClass('inactive');
            }

            var time = new Date();
            var curday = weekdays[time.getDay()];
            var curdate = time.getDate();
            var curmonth = time.getMonth();
            var curyear = time.getFullYear();

            if (days.getDate() == curdate &&
                days.getMonth() == curmonth &&
                days.getFullYear() == curyear) {
                $(current_day).addClass('currday');
                $('.dayDate').html(curdate);
                $('.day').html(curday);
                if (curdate < 10) {
                    $('.pos').css({right: '65px'});
                }
            } else {
                $(current_day).removeClass('currday');
            }

            // Change day, put everything above this line
            days.setDate(days.getDate() + 1);
            if (i % 7 == 0) {
                week++;
            }
        }
        //applyTooltip();
        showEvent();
    }

    $.fn.jCalendar = function (options) {
        $(this).append('' +
            '<div class="calendar">' +
            '<div class="head">' +
            '<div class="hl">' +
            '    <a href="javascript:void(0);" class="jprevmonth"><</a>' +
            '    </div>' +
            '        <div class="hr">' +
            '            <a href="javascript:void(0);" class="jnextmonth">></a>' +
            '        </div>' +
            '        <div class="hc">' +
            '            <span id="jmonthyear"></span>' +
            '        </div>' +
            '    </div>' +
            '        <div class="days">' +
            '            <ul class="cols">' +
            '                <li class="col first">Mon</li>' +
            '                <li class="col">Tue</li>' +
            '                <li class="col">Wed</li>' +
            '                <li class="col">Thu</li>' +
            '                <li class="col">Fri</li>' +
            '                <li class="col">Sat</li>' +
            '                <li class="col">Sun</li>' +
            '            </ul>' +
            '        </div>' +
            '        <div id="jdates" class="dates">' +
            '            <ul class="rows">' +
            '                <li id="jweek1" class="row">' +
            '                    <ul class="cols">' +
            '                        <li class="col first"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col weekend"></li>' +
            '                    </ul>' +
            '                </li>' +
            '                <li id="jweek2" class="row">' +
            '                    <ul class="cols">' +
            '                        <li class="col first"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col weekend"></li>' +
            '                    </ul>' +
            '                </li>' +
            '                <li id="jweek3" class="row">' +
            '                    <ul class="cols">' +
            '                        <li class="col first"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col weekend"></li>' +
            '                    </ul>' +
            '                </li>' +
            '                <li id="jweek4" class="row">' +
            '                    <ul class="cols">' +
            '                        <li class="col first"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col weekend"></li>' +
            '                    </ul>' +
            '                </li>' +
            '                <li id="jweek5" class="row">' +
            '                    <ul class="cols">' +
            '                        <li class="col first"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col weekend"></li>' +
            '                    </ul>' +
            '                </li>' +
            '                <li id="jweek6" class="row">' +
            '                    <ul class="cols">' +
            '                        <li class="col first"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col"></li>' +
            '                        <li class="col weekend"></li>' +
            '                    </ul>' +
            '                </li>' +
            '            </ul>' +
            '        </div>' +
            '        <div class="clear"></div>' +
            '    </div>' +
            '    <div class="clear"></div>'
        );
        var setting = $.extend({
            'event': []
        }, options);

        createCalendar(setting['event']);
        var year = active_date.getFullYear();
        $('.jcalendar .jprevmonth').bind('click', function () {
            var month = active_date.getMonth() - 1;
            if (month < 0) {
                month = 11;
                year -= 1;
            }
            active_date.setFullYear(year, month, 1);
            createCalendar(setting['event']);
        });
        $('.jcalendar .jnextmonth').bind('click', function () {
            var month = active_date.getMonth() + 1;
            if (month > 11) {
                month = 0;
                year += 1;
            }
            active_date.setFullYear(year, month, 1);
            createCalendar(setting['event']);
        });
    };
})(jQuery);

function addArray(arr, key, val) {
    if (arr[key] != undefined) {
        var idx = arr[key].length;
        arr[key][idx] = val;
    }
    else {
        arr[key] = new Array(val);
    }
    return arr;
}

function applyTooltip() {
    var elm = $('.evCont');
    $('.simpletip').hover(
        function (e) {
            elm.removeAttr('style');
            // Hover over code
            var title = $(this).attr('title');
            $(this).data('tipText', title).removeAttr('title');
            elm.html(title);
            setTimeout(function () {
                var l = e.pageX - elm.outerWidth() - 10;
                var t = e.pageY + 15;
                elm.css({
                    'position': 'absolute',
                    'left': l,
                    'top': t
                }).fadeIn(200);
            }, 10);
        },
        function () {
            elm.removeAttr('style');
            // Hover out code
            $(this).attr('title', $(this).data('tipText'));
            $('.evCont').fadeOut(200);
        });
}

function showEvent() {
    var popup_container = $('#popupPromo');
    var popup_event_date = $('#promo-date', popup_container);
    var popup_event_image = $('#promo-image', popup_container);
    var popup_event_name = $('#promo-name', popup_container);
    var popup_event_detail = $('#promo-detail', popup_container);
    $('.simpletip').click(function () {
        var event_date = $(this).attr('data-event-date');
        var event_name = $(this).attr('data-event-name');
        var event_detail = $(this).attr('data-event-detail');
        var event_image = $(this).attr('data-event-image');
        popup_event_date.html(event_date);
        popup_event_name.html(event_name);
        popup_event_detail.html(event_detail);
        popup_event_image.attr('src', event_image);

        popup('popupPromo', 'closeBox', function () {
            //do action
        });
    });
}
//---------------

function showTime() {
    var time = new Date();
    var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    var monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var curday = weekdays[time.getDay()];
    var curdate = time.getDate();
    var curmonth = monthname[time.getMonth()];
    var curyear = time.getFullYear();
    $('.nowDay').text(curday);
    $('.nowDate').text(curdate);
    $('.nowYear').text(curyear);
    $('.nowMonth').text(curmonth);
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    if (hours > 12) {
//        hours = hours - 12;
    } else {
    }
    if (hours == 0) {
        hours = 12
    }
    if (minutes <= 9) {
        minutes = "0" + minutes
    }
    if (seconds <= 9) {
        seconds = "0" + seconds
    }
    $('.nowTime').text(hours + ":" + minutes + ":" + seconds);
    /*if ($('.nowTime').text() == '17:30:00') {
     $('html').remove();
     alert('MESSAGE....!')
     }*/
    setTimeout(function () {
        showTime()
    }, 1000)
}

function styleForm() {
    destroyStyleForm($('select'), $('input'));
    $.jStyling.createSelect($('select.selectBox'), {extraClass: "selectBox", dropDown: true, autoWidth: false});
    $.jStyling.createCheckbox($('input[type=checkbox].checkBox'), {extraClass: "checkBox"});
    $.jStyling.createCheckbox($('input[type=checkbox].checkBoxCircle'), {extraClass: "checkBox checkBoxCircle"});
    $.jStyling.createRadio($('input[type=radio].radioButton'), {extraClass: "radioButton"});
    $.jStyling.createFileInput($('input[type=file].inputFile'), {extraClass: "inputFile", rounded: true});

    $('input:file').change(function () {
        if ($(this).closest('.jstyling-file')) {
            var val = $(this).val();
            val = val.split("\\");
            var parent = $(this).closest('.jstyling-file');
            $('.jstyling-file-f-c', parent).html(val[2]);
        } else {
            var val = $(this).val();
            val = val.split("\\");
            $(this).val(val[2]);
        }
    });

    $('.jstyling-select-l').prepend('<span class="ddTriangle"></span> ');
    $('.jstyling-select').not('.selectBoxTab').each(function () {
        $('.jstyling-select-l', $(this)).css({'overflow-y': 'auto'})
    });
}

function destroyStyleForm(select, input) {
    $.jStyling.destroySelect(select);
    $.jStyling.destroyCheckbox(input);
    $.jStyling.destroyRadio(input);
    $.jStyling.destroyFileInput(input);
}

function createCustomSelect(elm) {
    var autoWidth;
    elm.each(function () {
        autoWidth = false;
        var el = $(this);
        if (el.hasClass('autoWidthBox')) {
            autoWidth = true;
        }
        $.jStyling.createSelect(el, {
            extraClass: 'selectBox',
            dropDown: true,
            autoWidth: autoWidth
        });
    });
}

function getContent(method, url, data) {
    data = '';
    $.ajax({
        type: method,
        url: url,
        data: data,
        cache: false,
        beforeSend: function () {
            $('.overViewContent').html('<div class="loading2"></div>');
        },
        success: function (response) {
            $('.overViewContent').html(response, function () {
                $('#backTopBtn').fadeIn();
                //lightHover('tMList', 'rgba(136, 136, 136, 0.7)', 75, 'rgba(136, 136, 136, 0.5)', 'rgba(35, 41, 49, 0)', 80);

            });
            tooltipInfo();
            updateTable();
            styleForm();
        },
        error: function () {
            getContent('GET', 'ajax/errorLoad.html');
        }
    });
}

function updateTableRowColor(elm, row1, row2) {
    var n = elm.length;
    var r;
    if (n > 0) {
        for (var i = 0; i < n; i++) {
            (i % 2 == 0) ? r = row1 : r = row2;
            $(elm[i]).removeClass(row1);
            $(elm[i]).removeClass(row2);
            $(elm[i]).addClass(r);
        }
    }
}

function notification(message, type) {
    //type = succesNotif or failedNotif or warningNotif
//    clearTimeout();
    var icon = '';
    if (type == 0) {
        icon = 'error';
    } else if (type == 1) {
        icon = 'warning';
    } else {
        icon = 'success';
    }

    var notif_str = '' +
        '    <li id="" class="">' +
        '      <div class="notification ' + icon + '">' +
        '           <div class="notifIcon ' + icon + '"></div>' +
        '           <div class="notifText left"><div>' + message + '</div></div>' +
        '           <div class="clear"></div>' +
        '        </div>' +
        '        <div class="notifCloseBtn ' + icon + '">x</div>' +
        '      </div>' +
        '    </li>';
    $('#notificationContainer li').first().remove();
    $('#notificationContainer').prepend(notif_str).hide().slideDown(200);
    if ($('#notificationContainer li').length < 1) {
        $('#notificationContainer').first().append(notif_str);
        $('#notificationContainer li').first().hide().slideDown(100);
        $('#notificationContainer .notifText').text(message);
    }
    setTimeout(function () {
        $('#notificationContainer li').first().fadeOut(5000, function () {
            $(this).remove();
        });
    }, 60000);
    $('.notifCloseBtn', '#notificationContainer li').live("click", function () {
        $(this).closest('#notificationContainer li').slideUp(500, function () {
            $(this).remove();
        });
    });
}

function show_alert(title, content) {
    var date = new Date();
    var milisec = date.getMilliseconds();
    var alert_id = 'alert' + milisec;

    var alert_str = '' +
        '<div class="dialogBox show_alert" id="' + alert_id + '">' +
        '    <div class="dBHeader">' +
        '        <div class="dBHL"></div>' +
        '        <div class="dBHR"></div>' +
        '        <div class="dBHC">' +
        '            <div class="dBTitle alertTitle">' + title + '</div>' +
        '        </div>' +
        '    </div>' +
        '    <div class="dBContent">' +
        '        <div class="dBCGroup left">' +
        '            <div class="radioBtn left">' +
        '                <label class="radioLabel left">' + content + '</label>' +
        '            </div>' +
        '            <div class="clear"></div>' +
        '        </div>' +
        '        <div class="clear"></div>' +
        '        <div class="marginTop10">' +
        '           <a href="#" class="btn right marginR10" id="OK">' +
        '               <span class="btnL"></span>' +
        '               <span class="btnR"></span>' +
        '               <span class="btnC relative">Okay' +
        '                   <span class="btnLight absolute"></span>' +
        '               </span>' +
        '           </a>' +
        '       </div>' +
        '    </div>' +
        '</div>';

    $('.show_alert').remove();
    $('body').append(alert_str);
    var alert_elm = $('#' + alert_id);
    showOverlay();
    if (($.browser.msie && $.browser.version <= 6) || ($.browser.msie && $.browser.version > 6)) {
        alert_elm.fadeIn(200);
    } else {
        alert_elm.show().animate({'zoom': 1.14}, 100, function () {
            $(this).animate({'zoom': 0.99}, 100, function () {
                $(this).animate({'zoom': 1}, 50);
            });
        });
    }

    styleForm();
    $('#OK').die().live("click", function () {
        if (($.browser.msie && $.browser.version <= 6) || ($.browser.msie && $.browser.version > 6)) {
            alert_elm.fadeOut(300, function () {
                $(this).remove();
            });
        } else {
            alert_elm.animate({'zoom': 1.14}, 100, function () {
                $(this).animate({'zoom': 0}, 200, function () {
                    $(this).remove();
                });
            });
        }

        removeOverlay();
    });
}

function show_confirm_dialog(title, content, callback) {
    var date = new Date();
    var milisec = date.getMilliseconds();
    var alert_id = 'confirm' + milisec;
    var alert_str = '' +
        '<div class="dialogBox show_confirm_dialog" id="' + alert_id + '">' +
        '    <div class="dBHeader">' +
        '        <div class="dBHL"></div>' +
        '        <div class="dBHR"></div>' +
        '        <div class="dBHC">' +
        '            <div class="dBTitle alertTitle">' + title + '</div>' +
        '        </div>' +
        '    </div>' +
        '    <div class="dBContent">' +
        '        <div class="dBCGroup left">' +
        '            <div class="radioBtn left">' +
        '                <label class="radioLabel left">' + content + '</label>' +
        '            </div>' +
        '            <div class="clear"></div>' +
        '        </div>' +
        '        <div class="clear"></div>' +
        '        <div class="marginTop10">' +
        '           <a href="#" class="btn right marginR10" id="OK">' +
        '               <span class="btnL"></span>' +
        '               <span class="btnR"></span>' +
        '               <span class="btnC relative">Okay' +
        '                   <span class="btnLight absolute"></span>' +
        '               </span>' +
        '           </a>' +
        '           <a href="#" class="btn right marginR10" id="CANCEL">' +
        '               <span class="btnL"></span>' +
        '               <span class="btnR"></span>' +
        '               <span class="btnC relative">Cancel' +
        '                   <span class="btnLight absolute"></span>' +
        '               </span>' +
        '           </a>' +
        '       </div>' +
        '    </div>' +
        '</div>';

    $('.show_confirm_dialog').remove();
    $('body').append(alert_str);
    var alert_elm = $('#' + alert_id);
    showOverlay();

    if (($.browser.msie && $.browser.version <= 6) || ($.browser.msie && $.browser.version > 6)) {
        alert_elm.fadeIn(200);
    } else {
        alert_elm.show().animate({'zoom': 1.14}, 100, function () {
            $(this).animate({'zoom': 0.99}, 50, function () {
                $(this).animate({'zoom': 1}, 30);
            });
        });
    }

    styleForm();
    if (typeof(callback) == 'function') {
        $('#OK').bind("click", function () {
            callback();
            if (($.browser.msie && $.browser.version <= 6) || ($.browser.msie && $.browser.version > 6)) {
                alert_elm.fadeOut(300, function () {
                    $(this).remove();
                });
            } else {
                alert_elm.animate({'zoom': 1.14}, 100, function () {
                    $(this).animate({'zoom': 0}, 200, function () {
                        $(this).remove();
                    });
                });
            }
            removeOverlay();
        });
    }
    $('#CANCEL').die().live("click", function () {
        if (($.browser.msie && $.browser.version <= 6) || ($.browser.msie && $.browser.version > 6)) {
            alert_elm.fadeOut(300, function () {
                $(this).remove();
            });
        } else {
            alert_elm.animate({'zoom': 1.14}, 100, function () {
                $(this).animate({'zoom': 0}, 200, function () {
                    $(this).remove();
                });
            });
        }
        removeOverlay();
    });
}

function show_box(id, submit, callback) {
    var mb_id = $('#' + id);
    showOverlay();
    mb_id.fadeIn(300);
    styleForm();
    if (typeof(callback) == 'function') {
        if (submit != '' || submit != undefined) {
            $('#' + submit, mb_id).live("click", function () {
                callback();
                mb_id.fadeOut(300);
                removeOverlay();
            });
        }
    }

    $('#CANCEL,.closeBox', mb_id).die().live("click", function () {
        $(this).closest(mb_id).fadeOut(300);
        removeOverlay();
    });
}

function popup(id, close, callback) {
    showOverlay();
    var mb_id = $('#' + id);
    mb_id.fadeIn(300);
    if (typeof(callback) == 'function') {
        callback();
    }

    $('.' + close, mb_id).die().live("click", function () {
        $(this).closest(mb_id).fadeOut(300);
        removeOverlay();
    });
    styleForm();
}

function showOverlay() {
    //check browser supprt css3
    var supports = (function () {
        var div = document.createElement('div'),
            vendors = 'Khtml Ms O Moz Webkit'.split(' '),
            len = vendors.length;

        return function (prop) {
            if (prop in div.style) return true;

            prop = prop.replace(/^[a-z]/, function (val) {
                return val.toUpperCase();
            });

            while (len--) {
                if (vendors[len] + prop in div.style) {
                    // browser supports box-shadow. Do what you need.
                    // Or use a bang (!) to test if the browser doesn't.
                    return true;
                }
            }
            return false;
        };
    })();

    var overlay = $('.overlay');
    overlay.remove();
    $('body').append('<div class="overlay" id="overlay2"></div><div class="overlay" id="overlay3"></div>');
    overlay.hide();

    if (supports('textShadow')) {//css3.show; css2.hide()
        $('#overlay2').hide();
        $('#overlay3').fadeIn(500);
    } else {//css2.show;css3.hide;
        $('#overlay2').fadeIn(500);
        $('#overlay3').hide();
    }

    if ($.browser.opera) {
        $('#overlay2').fadeIn(500);
        $('#overlay3').hide();
    }
}

function removeOverlay() {
    $('.overlay').fadeOut(500, function () {
        $(this).remove();
    });
}

function showLoading() {
    var loading = $('.loading');
    loading.remove();
    $('body').append('<div class="loading"></div>');
    loading.hide().fadeIn(300);
}

function showLoadingCustom(elm, loading) {
    var load_class = (loading == undefined) ? 'loading_circle' : loading;
    var loading = $('.loading_circle', elm);
    loading.remove();
    elm.append('<div class="' + load_class + '"></div>');
    loading.hide().fadeIn(0);
}

function removeLoadingCustom(elm, callback) {
    $('.loading_circle', elm).fadeOut(0, function () {
        if (typeof (callback) == 'function') {
            callback();
        }
        $(this).remove();
    });
}

function removeLoading() {
    $('.loading').fadeOut(300, function () {
        $(this).remove();
    });
}

function tooltipInfo() {
    /* CONFIG */
    var xOffset = 10;
    var yOffset = 20;
    // these 2 variable determine popup's distance from the cursor
    // you might want to adjust to get the right result
    /* END CONFIG */
    var t = '';
    var id = '';
    var tooltip = $(".tooltipInfo");
    var ttw = 0;
    tooltip.hover(function (e) {
            t = $(this).attr('rel');
            var xpos = e.pageX + yOffset;
            var ypos = e.pageY - xOffset + 10;
            $("body").append('<div id="tooltipInfo"><div class="ttiText">' + t + '</div></div>');
            id = $("#tooltipInfo");
            id.css({"top": ypos + "px", "left": xpos + "px"});
            id.fadeIn("fast");
            if ((xpos + id.outerWidth()) > $(window).width()) {
                ttw = id.outerWidth() + $(this).outerWidth() + 20;
                xpos = xpos - ttw;
                id.css("left", xpos + "px");
            } else {
                id.css("left", xpos + "px");
            }
        },
        function () {
            id = $("#tooltipInfo");
            id.remove();
        });
    tooltip.bind("mousemove", function (e) {
        id = $("#tooltipInfo");
        id.css("top", (e.pageY - xOffset) + "px");
        /*if ((e.pageX + yOffset + id.outerWidth()) > $(window).width()) {
         id.css("left", (e.pageX - xOffset - ttw+20) + "px");
         } else {
         id.css("left", (e.pageX + yOffset) + "px");
         }*/
        id.css("left", (e.pageX + yOffset) + "px");
    });
}

function previewImageUpload(input, preview) {
    input.change(function () {
        var file = this.files[0];
        //name = file.fileName;
        //size = file.size;
        //type = file.type;
        reader = new FileReader();
        reader.onloadend = function (e) {
            var src = e.target.result;
            preview.hide().html('<img src="' + src + '"/>').fadeIn(200);
        }
        reader.readAsDataURL(file);
    });
}

function tab(id) {
    id = $('#' + id);
    var btn = $('.listTab', id);
    var body = $('.listBody', id);
    body.hide();
    if (btn.length > 0) {
        $(btn[0]).addClass('active');
        $(body[0]).show();
        btn.click(function () {
            var idx = $(this).index();
            btn.not($(btn[idx])).removeClass('active');
            body.not($(body[idx])).hide();
            $(btn[idx]).addClass('active');
            $(body[idx]).fadeIn(100);

        });
    }
}

function mycarousel_initCallback(carousel) {
    $('.slider-nav a').bind('click', function () {
        carousel.scroll(jQuery.jcarousel.intval(jQuery(this).text()));
        return false;
    });
    $('.slider-next').bind('click', function () {
        carousel.next();
        return false;
    });
    $('.slider-prev').bind('click', function () {
        carousel.prev();
        return false;
    });
}

function mycarousel_itemFirstInCallback(carousel, item, idx, state) {
    $('.slider-nav ul li a').removeClass('active');
    $('.slider-nav ul li a').eq(idx - 1).addClass('active');

    var list = $('.listSlider:eq(' + (idx - 1) + ')');
    var title = $('.s_title', list).text();
    var text = $('.s_text', list).text();
    var link = $('.s_link', list).text();
    $('.slider_title').text(title).hide().fadeIn();
    $('.slider_text').text(text).hide().fadeIn();
    $('.slider_read_more').attr('href', link);
    $('.slider_read_more').click(function () {
        window.location.href = $(this).attr('href');
    })
}

function mycarousel_itemFirstInCallback_noDetail(carousel, item, idx, state) {
    $('.slider-nav ul li a').removeClass('active');
    $('.slider-nav ul li a').eq(idx - 1).addClass('active');
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function slide(elm, n, callback) {
    var id = $('#' + elm);
    var prev = $('.prevSlide', id);
    var next = $('.nextSlide', id);
    var overflow = $('.overflowMenu', id);
    var menu = $('ul', overflow);
    var list = $('li', menu);
    var count = list.length;
    var w = list.outerWidth();
    var left = parseInt(menu.css('left'));

    if (n > count) {
        n = count;
        prev.addClass('disabled');
        next.addClass('disabled');
        list.css('width', overflow.outerWidth() / n);
    } else {
        if (left >= 0) {
            prev.addClass('disabled');
        } else {
            prev.removeClass('disabled');
        }
        if (left < -(w * (count - n - 1))) {
            next.addClass('disabled');
        } else {
            next.removeClass('disabled');
        }
        list.css('width', overflow.outerWidth() / n);
        prev.live("click", function () {
            w = list.outerWidth();
            left = parseInt(menu.css('left'));
            left = left + w;
            next.removeClass('disabled');
            if (left >= 0) {
                left = 0;
                prev.addClass('disabled');
            } else {
                prev.removeClass('disabled');
            }
            menu.animate({'left': left}, 250);
        });
        next.live("click", function () {
            w = list.outerWidth();
            left = parseInt(menu.css('left'));
            left = left - w;
            prev.removeClass('disabled');
            if (left <= -(w * (count - n))) {
                left = -(w * (count - n));
            }
            if (left < -(w * (count - n - 1))) {
                next.addClass('disabled');
            } else {
                next.removeClass('disabled');
            }
            menu.animate({'left': left}, 250);
        });
    }

    setTimeout(function () {
        if (typeof(callback) == 'function') {
            callback();
        }
    }, 101);
    menu.width(count * (list.outerWidth() + 1));
}

function validateMyForm() {
    $("#myForm").validate({
        rules: {
            first_name: "required",
            last_name: "required",
            email: {
                required: true,
                email: true
            },
            confirm_email: {
                required: true,
                email: true,
                equalTo: "#email"
            },
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 5
            },
            confirm_password: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
            birth_date: "required",
            captcha: "required",
            gender: "required",
            'allergies[]': "required",
            'fav_cuisine[]': "required"
        },
        messages: {
            first_name: "Please enter your First Name",
            last_name: "Please enter your Last Name",
            email: "Please enter a valid Email Address",
            username: {
                required: "Please enter your Username",
                minlength: "Your username must consist of at least 2 characters"
            },
            password: {
                required: "Please provide a Password",
                minlength: "Your password must be at least 5 characters long"
            },
            confirm_password: {
                required: "Please enter a Confirm Password",
                minlength: "Your password must be at least 5 characters long",
                equalTo: "Please enter the same Password as above"
            },
            birth_date: "Please select your Birth Date",
            captcha: "Please enter a text below",
            gender: "Please select your Gender",
            'allergies[]': "Please select your Allergies",
            'fav_cuisine[]': "Please select your Favourite Cuisine"
        }
    });
}
function validateFormGroupBooking() {
    $("#formGroupBooking").validate({
        rules: {
            first_name: "required",
            last_name: "required",
            email: {
                required: true,
                email: true
            },
            telephone: {
                required: true
            },
            n_people: {
                required: true
            },
            event_date: "required",
            event_time: "required",
            budget: "required",
            'special_preference': "required"
        },
        messages: {
            first_name: "Please enter your First Name",
            last_name: "Please enter your Last Name",
            email: "Please enter a valid Email Address"
        }
    });
}

function validateFormAvailabilityCheck() {
    $("#availability_check").validate({
        rules: {
            date: "required",
            time: "required"
        },
        focusInvalid: false,
    });
}

function validateFormReservation() {
    $("#make_reservation").validate({
        rules: {
            fname: "required",
            lname: "required",
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true
            },
            splrequest: {
                required: true
            }
        }
    });
}

function redeemPoint(myPoint) {
    var arrow = $('.pointArrow');
    var maxPoint = 100000;
    if (myPoint < 0) {
        myPoint = 0
    }
    if (myPoint > maxPoint) {
        myPoint = maxPoint
    }
    var end;//max 180, min 0
    end = (myPoint / maxPoint) * 180;
    var delay =  (myPoint / maxPoint) * 5;
    delay = delay + 1;
    arrow.css({
        'transition': delay + 's',
        '-webkit-transition': delay + 's',
        '-moz-transition': delay + 's',
        '-o-transition': delay + 's',
        '-webkit-transform': 'rotate(' + end + 'deg)',
        '-moz-transform': 'rotate(' + end + 'deg)',
        '-ms-transform': 'rotate(' + end + 'deg)',
        '-o-transform': 'rotate(' + end + 'deg)'
    });

    getPoint(myPoint);

    var seconds = 0;
    var stop = false;

    function getPoint(myPoint) {
        var pointWrap = $('#point');
        var tm;
        seconds = seconds + 100;
        pointWrap.text(numberWithCommas(seconds));
        tm = setTimeout(function () {
            getPoint(myPoint);
        }, 0);
        if (seconds >= myPoint) {
            stop = true;
        }
        if (stop) {
            clearTimeout(tm)
        }
    }
}
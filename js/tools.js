$(document).ready(function() {

    $('.menu-mobile-link').click(function(e) {
        if ($('html').hasClass('menu-mobile-open')) {
            $('html').removeClass('menu-mobile-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $(window).scrollTop($('html').data('scrollTop'));
        } else {
            var curWidth = $(window).width();
            if (curWidth < 375) {
                curWidth = 375;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('menu-mobile-open');
            $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
            $('html').data('scrollTop', curScroll);
        }
        e.preventDefault();
    });

    $('.nav > ul > li').each(function() {
        if ($(this).find('ul').length > 0) {
            $(this).addClass('with-submenu');
        }
    });

    $('.nav > ul > li > a').click(function(e) {
        if ($(window).width() < 1220) {
            var curItem = $(this).parent();
            if (curItem.find('ul').length > 0) {
                curItem.toggleClass('open');
                e.preventDefault();
            }
        }
    });

    $('.partners-section').each(function() {
        var curSection = $(this);
        var curSlider = curSection.find('.partners-list');
        const swiper = new Swiper(curSlider[0], {
            touchAngle: 30,
            slidesPerView: 1,
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1220: {
                    slidesPerView: 4
                },
                1580: {
                    slidesPerView: 5
                }
            }
        });

        curSection.find('.partners-section-prev').click(function(e) {
            swiper.slidePrev();
            e.preventDefault();
        });

        curSection.find('.partners-section-next').click(function(e) {
            swiper.slideNext();
            e.preventDefault();
        });
    });

    $('.main-events-list').each(function() {
        var curSlider = $(this);
        const swiper = new Swiper(curSlider[0], {
            touchAngle: 30,
            slidesPerView: 1,
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1220: {
                    slidesPerView: 3
                }
            }
        });
    });

    $('.program').each(function() {
        var colorsData = null;
        var programData = null;

        $('.program').addClass('loading');
        $.ajax({
            type: 'POST',
            url: $('.program').attr('data-url'),
            dataType: 'json',
            cache: false,
            timeout: 30000
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert($('.program').attr('data-server-error'));
        }).done(function(data) {
            colorsData = data.colors;
            programData = data.data;

            var htmlDates = '';
            for (var i = 0; i < programData.length; i++) {
                htmlDates += '<div class="program-filter-date">' + programData[i].date + '</div>';
            }
            $('.program-filter-dates').html(htmlDates);
            $('.program-filter-date').eq(0).addClass('active');

            updateProgram();
        });

        $('body').on('click', '.program-filter-date', function() {
            var curItem = $(this);
            if (!curItem.hasClass('active')) {
                $('.program-filter-date.active').removeClass('active');
                curItem.addClass('active');
                updateProgram();
            }
        });

        function updateProgram() {
            $('.program').addClass('loading');

            var newHTML =   '<div class="program-container">';

            var curDate = $('.program-filter-date.active').html();
            var curEvents = null;

            for (var i = 0; i < programData.length; i++) {
                if (programData[i].date == curDate) {
                    curEvents = programData[i].events;
                }
            }

            var minHour = 23;
            var maxHour = 0;

            if (curEvents != null) {
                for (var i = 0; i < curEvents.length; i++) {
                    var curHour = Number(curEvents[i].start.split(':')[0]);
                    if (curHour < minHour) {
                        minHour = curHour;
                    }
                    curHour = Number(curEvents[i].end.split(':')[0]);
                    if (curEvents[i].end.split(':')[1] != '00') {
                        curHour++;
                    }
                    if (curHour > maxHour) {
                        maxHour = curHour;
                    }
                }

                newHTML +=      '<div class="program-hours">';
                for (var i = minHour; i <= maxHour; i++) {
                    newHTML +=      '<div class="program-hour"><span>' + String('0' + i).slice(-2) + ':00</span></div>';
                    if (i < maxHour) {
                        newHTML +=  '<div class="program-hour"></div>';
                    }
                }
                newHTML +=      '</div>';

                newHTML +=      '<div class="program-halls">';

                var curHalls = [];
                for (var i = 0; i < curEvents.length; i++) {
                    if (curHalls.indexOf(curEvents[i].hall) == -1) {
                        curHalls.push(curEvents[i].hall);
                    }
                }

                var heightHour = 221;

                for (var i = 0; i < curHalls.length; i++) {
                    var curHall = curHalls[i];
                    newHTML +=      '<div class="program-hall">' +
                                        '<div class="title-small">' + curHall + '</div>';
                    for (var j = 0; j < curEvents.length; j++) {
                        var curEvent = curEvents[j];
                        if (curEvent.hall == curHall) {
                            var startHour = Number(curEvent.start.split(':')[0]);
                            var startMinutes = Number(curEvent.start.split(':')[1]);

                            var endHour = Number(curEvent.end.split(':')[0]);
                            var endMinutes = Number(curEvent.end.split(':')[1]);

                            var curTop = (startHour - minHour) * heightHour + startMinutes / 60 * heightHour + (startHour - minHour) + 1;

                            var curHeight = ((endHour + endMinutes / 60) - (startHour + startMinutes / 60)) * heightHour;

                            var curColor = null;
                            for (var c = 0; c < colorsData.length; c++) {
                                if (colorsData[c].id == curEvent.color) {
                                    curColor = colorsData[c];
                                }
                            }

                            var bgColor = '';
                            var textColor = '';
                            if (curColor != null) {
                                bgColor = 'background:' + curColor.bg + ';';
                                textColor = 'color:' + curColor.color + ';';
                            }

                            var openTag = 'div';
                            var closeTag = 'div';
                            if (typeof(curEvent.link) != 'undefined') {
                                openTag = 'a href="' + curEvent.link + '"';
                                closeTag = 'a';
                            }

                            newHTML +=  '<' + openTag + ' class="program-item" style="top:' + curTop +'px; min-height:' + curHeight + 'px; max-height:' + curHeight + 'px; ' + bgColor + '">' +
                                            '<div class="program-item-top">' +
                                                '<div class="program-item-time"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-time"></use></svg>' + curEvent.start + '–' + curEvent.end + '</div>' +
                                                '<div class="title-medium">' + curEvent.title + '</div>' +
                                            '</div>';
                            if (typeof(curEvent.format) != 'undefined' || typeof(curEvent.track) != 'undefined') {
                                newHTML +=  '<div class="program-item-bottom">';
                                    if (typeof(curEvent.format) != 'undefined') {
                                        newHTML +=  '<div class="program-item-format">' + curEvent.format + '</div>';
                                    }
                                    if (typeof(curEvent.track) != 'undefined') {
                                        newHTML +=  '<div class="program-item-track"><span style="' + textColor + '">' + curEvent.track.join(', ') + '</span></div>';
                                    }
                                newHTML +=  '</div>';
                            }
                            newHTML +=  '</' + closeTag + '>';
                        }
                    }
                    newHTML +=      '</div>';
                }

                newHTML +=      '</div>';
            }

            newHTML +=      '</div>';

            $('.program').html(newHTML);
            $('.program').removeClass('loading');
        }
    });

});

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();

    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    $('.main-title, .main-anonce').each(function() {
        var curBlock = $(this);
        if (windowScroll + windowHeight - 100 > curBlock.offset().top) {
            curBlock.addClass('animated');
        } else {
            curBlock.removeClass('animated');
        }
    });

});
$(document).ready(function() {

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $.validator.addMethod('inputDate',
        function(curDate, element) {
            if (this.optional(element) && curDate == '') {
                return true;
            } else {
                if (curDate.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
                    var userDate = new Date(curDate.substr(6, 4), Number(curDate.substr(3, 2)) - 1, Number(curDate.substr(0, 2)));
                    if ($(element).attr('min')) {
                        var minDateStr = $(element).attr('min');
                        var minDate = new Date(minDateStr.substr(6, 4), Number(minDateStr.substr(3, 2)) - 1, Number(minDateStr.substr(0, 2)));
                        if (userDate < minDate) {
                            $.validator.messages['inputDate'] = 'Минимальная дата - ' + minDateStr;
                            return false;
                        }
                    }
                    if ($(element).attr('max')) {
                        var maxDateStr = $(element).attr('max');
                        var maxDate = new Date(maxDateStr.substr(6, 4), Number(maxDateStr.substr(3, 2)) - 1, Number(maxDateStr.substr(0, 2)));
                        if (userDate > maxDate) {
                            $.validator.messages['inputDate'] = 'Максимальная дата - ' + maxDateStr;
                            return false;
                        }
                    }
                    return true;
                } else {
                    $.validator.messages['inputDate'] = 'Дата введена некорректно';
                    return false;
                }
            }
        },
        ''
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.window-link', function(e) {
        var curLink = $(this);
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

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
        var swiper = new Swiper(curSlider[0], {
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

    $('.slider').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider[0], {
            loop: true,
            touchAngle: 30,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    });

    $('.main-sections-item-title').click(function() {
        var curItem = $(this).parents().filter('.main-sections-item');
        curItem.toggleClass('open');
    });

    $('.main-events-list').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider[0], {
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

    $('.partners-reviews').each(function() {
        var curBlock = $(this);
        if (curBlock.find('.partners-reviews-item').length > 3) {
            curBlock.find('.more-link').addClass('visible');
        }
    });

    $('.partners-reviews-list-more a').click(function(e) {
        var curBlock = $(this).parents().filter('.partners-reviews');
        curBlock.find('.partners-reviews-item:gt(2)').toggle();
        curBlock.find('.more-link').toggleClass('open');
        e.preventDefault();
    });

    $('.faq-item-title').click(function(e) {
        var curItem = $(this).parents().filter('.faq-item');
        curItem.find('.faq-item-content').slideToggle();
        curItem.toggleClass('open');
        e.preventDefault();
    });

    $('.archive-years').each(function() {
        $('.archive-years-current span').html($('.archive-years ul li.active a').html());
    });

    $('.archive-years-current').click(function() {
        $('.archive-years').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.archive-years').length == 0) {
            $('.archive-years').removeClass('open');
        }
    });

    $('.archive-history').each(function() {
        var curBlock = $(this);
        if (curBlock.find('.archive-history-item').length > 4) {
            curBlock.find('.archive-history-more').addClass('visible');
        }
    });

    $('.archive-history-more a').click(function(e) {
        var curBlock = $(this).parents().filter('.archive-history');
        curBlock.toggleClass('open');
        curBlock.find('.archive-history-item:gt(3)').slideToggle();
        e.preventDefault();
    });

    $('.stands-menu').each(function() {
        $('.stands-menu-current span').html($('.stands-menu ul li.active a').html());
    });

    $('.stands-menu-current').click(function() {
        $('.stands-menu').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.stands-menu').length == 0) {
            $('.stands-menu').removeClass('open');
        }
    });

    $('.stands-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.stands-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.stands-menu ul li').index(curLi);
            $('.stands-content.active').removeClass('active');
            $('.stands-content').eq(curIndex).addClass('active');
        }
        $('.stands-menu').removeClass('open');
        e.preventDefault();
    });

    $('.stands-item-photos-slider').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider[0], {
            loop: true,
            touchAngle: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
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

    $('.participation-events-list').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider[0], {
            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesProgress: true,
            scrollbar: {
                el: '.swiper-scrollbar',
            }
        });
    });

    $('body').on('click', '[data-lightbox]', function(e) {
        var curItem = $(this);
        var curGroup = curItem.attr('data-lightbox');
        if (curGroup == '') {
            var curGallery = curItem;
        } else {
            var curGallery = $('[data-lightbox="' + curGroup + '"]');
        }
        var curIndex = curGallery.index(curItem);

        var curWidth = $(window).width();
        if (curWidth < 375) {
            curWidth = 375;
        }
        var curScroll = $(window).scrollTop();
        var curPadding = $('.wrapper').width();
        $('html').addClass('window-photo-open');
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});
        $('html').data('scrollTop', curScroll);
        $('.wrapper').css({'top': -curScroll});

        var windowHTML =    '<div class="window-photo">';

        windowHTML +=           '<div class="window-photo-preview swiper">' +
                                    '<div class="window-photo-preview-list swiper-wrapper">';

        var galleryLength = curGallery.length;

        for (var i = 0; i < galleryLength; i++) {
            var curGalleryItem = curGallery.eq(i);
            windowHTML +=               '<div class="window-photo-preview-list-item swiper-slide"><a href="#" style="background-image:url(' + curGalleryItem.find('img').attr('src') + ')"></a></div>';
        }
        windowHTML +=               '</div>' +
                                    '<div class="swiper-scrollbar"></div>' +
                                '</div>';

        windowHTML +=           '<div class="window-photo-slider swiper">' +
                                    '<div class="window-photo-slider-list swiper-wrapper">';

        for (var i = 0; i < galleryLength; i++) {
            var curGalleryItem = curGallery.eq(i);
            windowHTML +=               '<div class="window-photo-slider-list-item swiper-slide">' +
                                            '<div class="window-photo-slider-list-item-inner"><img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZC0xIiB5Mj0iMSIgeDI9IjAiPgogICAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iNSUiIHN0b3AtY29sb3I9IiMwMEFFRUYiIHN0b3Atb3BhY2l0eT0iMC41IiAvPgogICAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwQUVFRiIgc3RvcC1vcGFjaXR5PSIwLjAiIC8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQtMiIgeTI9IjEiIHgyPSIwIj4KICAgICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjUlIiBzdG9wLWNvbG9yPSIjMDBBRUVGIiBzdG9wLW9wYWNpdHk9IjAuMCIgLz4KICAgICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMEFFRUYiIHN0b3Atb3BhY2l0eT0iMS4wIiAvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPHBhdHRlcm4gaWQ9InBhdHRlcm4iIHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZC0xKSIgLz4KICAgICAgICAgICAgICA8cmVjdCB4PSI1MCUiIHk9IjAiIHdpZHRoPSI1MCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkLTIpIiAvPgogICAgICAgIDwvcGF0dGVybj4KICAgIDwvZGVmcz4KCiAgICA8Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSIxMy43NSIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZT0idXJsKCNwYXR0ZXJuKSI+CiAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiB2YWx1ZXM9IjAgMTUgMTU7MzYwIDE1IDE1IiBrZXlUaW1lcz0iMDsxIj48L2FuaW1hdGVUcmFuc2Zvcm0+CiAgICA8L2NpcmNsZT4KCiAgICA8ZWxsaXBzZSBjeD0iMTUiIGN5PSIyOC43NSIgcng9IjEuMjUiIHJ5PSIxLjI1IiBmaWxsPSIjMDBBRUVGIj4KICAgICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMXMiIHZhbHVlcz0iMCAxNSAxNTszNjAgMTUgMTUiIGtleVRpbWVzPSIwOzEiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KICAgIDwvZWxsaXBzZT4KPC9zdmc+" data-src="' + curGalleryItem.attr('href') + '" /></div>' +
                                        '</div>';
        }
        windowHTML +=               '</div>' +
                                    '<div class="swiper-button-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-prev"></use></svg></div>' +
                                    '<div class="swiper-button-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-next"></use></svg></div>' +
                                '</div>';

        windowHTML +=           '<a href="#" class="window-photo-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-close"></use></svg></a>';
        windowHTML +=           '<a href="#" class="window-photo-download" target="_blank" download><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-download"></use></svg></a>';
        windowHTML +=           '<div class="window-photo-count"><span>' + (curIndex + 1) + '</span>&nbsp;/&nbsp;' + galleryLength + '</div>';

        windowHTML +=       '</div>';

        $('.window-photo').remove();
        $('body').append(windowHTML);
        $('.window-photo-preview-list-item').eq(curIndex).addClass('active');

        $('.window-photo-slider').each(function() {
            var curSlider = $(this);

            var thumbsSwiper = new Swiper('.window-photo-preview', {
                slidesPerView: 'auto',
                freeMode: true,
                watchSlidesProgress: true,
                scrollbar: {
                    el: '.swiper-scrollbar',
                }
            });

            var swiper = new Swiper(curSlider[0], {
                loop: false,
                initialSlide: curIndex,
                touchAngle: 30,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                thumbs: {
                    swiper: thumbsSwiper,
                },
                on: {
                    afterInit: function () {
                        var currentSlide = $('.window-photo-slider-list .swiper-slide-active');

                        var curIMG = currentSlide.find('img');
                        $('.window-photo-download').attr('href', curIMG.attr('data-src'));
                        if (curIMG.attr('src') !== curIMG.attr('data-src')) {
                            var newIMG = $('<img src="" alt="" style="position:fixed; left:-9999px; top:-9999px" />');
                            $('body').append(newIMG);
                            newIMG.one('load', function(e) {
                                curIMG.attr('src', curIMG.attr('data-src'));
                                newIMG.remove();
                            });
                            newIMG.attr('src', curIMG.attr('data-src'));
                            window.setTimeout(function() {
                                curIMG.attr('src', curIMG.attr('data-src'));
                                if (newIMG) {
                                    newIMG.remove();
                                }
                            }, 3000);
                        }
                    },
                    slideChangeTransitionStart: function () {
                        var currentSlide = $('.window-photo-slider-list .swiper-slide-active');
                        if (typeof(swiper) != 'undefined') {
                            $('.window-photo-count span').html(swiper.activeIndex + 1);
                            $('.window-photo-preview-list-item.active').removeClass('active');
                            $('.window-photo-preview-list-item').eq(swiper.activeIndex).addClass('active');
                        }

                        var curIMG = currentSlide.find('img');
                        $('.window-photo-download').attr('href', curIMG.attr('data-src'));
                    },
                    slideChangeTransitionEnd: function () {
                        var currentSlide = $('.window-photo-slider-list .swiper-slide-active');

                        var curIMG = currentSlide.find('img');
                        if (curIMG.attr('src') !== curIMG.attr('data-src')) {
                            var newIMG = $('<img src="" alt="" style="position:fixed; left:-9999px; top:-9999px" />');
                            $('body').append(newIMG);
                            newIMG.one('load', function(e) {
                                curIMG.attr('src', curIMG.attr('data-src'));
                                newIMG.remove();
                            });
                            newIMG.attr('src', curIMG.attr('data-src'));
                            window.setTimeout(function() {
                                curIMG.attr('src', curIMG.attr('data-src'));
                                if (newIMG) {
                                    newIMG.remove();
                                }
                            }, 3000);
                        }
                    }
                }
            });

            $('.window-photo-preview-list-item a').click(function(e) {
                var curItem = $(this).parent();
                if (!curItem.hasClass('active')) {
                    var curIndex = $('.window-photo-preview-list-item').index(curItem);
                    if (typeof(swiper) != 'undefined') {
                        swiper.slideTo(curIndex);
                    }
                }
                e.preventDefault();
            });
        });

        e.preventDefault();
    });

    $('body').on('click', '.window-photo-close', function(e) {
        $('.window-photo').remove();
        $('html').removeClass('window-photo-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $(window).scrollTop($('html').data('scrollTop'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            if ($('.window-photo').length > 0) {
                $('.window-photo-close').trigger('click');
            }
        }
    });

    $('.gallery').each(function() {
        var curSlider = $(this);
        const swiper = new Swiper(curSlider[0], {
            loop: true,
            touchAngle: 30,
            autoHeight: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            on: {
                afterInit: function () {
                    var curSlide = curSlider.find('.swiper-slide-active');
                    var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
                    curSlider.find('.swiper-pagination').css({'top': curPhotoHeight});
                    curSlider.find('.swiper-button-prev').css({'top': curPhotoHeight / 2});
                    curSlider.find('.swiper-button-next').css({'top': curPhotoHeight / 2});
                    if (!curSlider.find('.swiper-pagination').hasClass('swiper-pagination-lock')) {
                        curSlider.addClass('with-pagination');
                    }
                },
                slideChangeTransitionEnd: function () {
                    var curSlide = curSlider.find('.swiper-slide-active');
                    var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
                    curSlider.find('.swiper-pagination').css({'top': curPhotoHeight});
                    curSlider.find('.swiper-button-prev').css({'top': curPhotoHeight / 2});
                    curSlider.find('.swiper-button-next').css({'top': curPhotoHeight / 2});
                }
            }
        });
    });

    $('.news-others-list').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider[0], {
            touchAngle: 30,
            slidesPerView: 1,
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1220: {
                    slidesPerView: 3
                },
                1580: {
                    slidesPerView: 4
                }
            }
        });
    });

});

$.fn.datepicker.language['ru'] =  {
    days: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    daysShort: ['Вос','Пон','Вто','Сре','Чет','Пят','Суб'],
    daysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthsShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
    today: 'Сегодня',
    clear: 'Очистить',
    dateFormat: 'dd.mm.yyyy',
    timeFormat: 'hh:ii',
    firstDay: 1
};

function initForm(curForm) {
    curForm.find('input.phoneRU').attr('autocomplete', 'off');
    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.find('.form-input-date input').mask('00.00.0000');
    curForm.find('.form-input-date input').attr('autocomplete', 'off');
    curForm.find('.form-input-date input').addClass('inputDate');

    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-input input, .form-input textarea').focus(function() {
        $(this).parent().addClass('focus');
    });
    curForm.find('.form-input input, .form-input textarea').blur(function(e) {
        $(this).parent().removeClass('focus');
        if ($(this).val() == '') {
            $(this).parent().removeClass('full');
        } else {
            $(this).parent().addClass('full');
        }
        if (e.originalEvent !== undefined && $(e.originalEvent.relatedTarget).hasClass('form-input-clear')) {
            $(this).parent().find('.form-input-clear').trigger('click');
        }
    });

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
        $(this).on('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    curForm.find('input[autofocus]').trigger('focus');

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 10,
            closeOnSelect: false
        };
        if (typeof(curSelect.attr('data-searchplaceholder')) != 'undefined') {
            options['searchInputPlaceholder'] = curSelect.attr('data-searchplaceholder');
        }
        curSelect.select2(options);
        curSelect.parent().find('.select2-container').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.on('select2:select', function(e) {
            $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
            $(e.delegateTarget).parent().find('.select2-search--inline input').val('').trigger('input.search').trigger('focus');
            $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-searchplaceholder'));
        });
        curSelect.on('select2:unselect', function(e) {
            if (curSelect.find('option:selected').length == 0) {
                $(e.delegateTarget).parent().find('.select2-container').removeClass('select2-container--full');
                $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-placeholder'));
            } else {
                $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-searchplaceholder'));
            }
        });
        curSelect.on('select2:close', function(e) {
            if (curSelect.find('option:selected').length == 0) {
                $(e.delegateTarget).parent().find('.select2-container').removeClass('select2-container--full');
                $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-placeholder'));
            }
        });
        if (typeof(curSelect.attr('multiple')) != 'undefined') {
            curSelect.on('select2:open', function(e) {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
                $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-searchplaceholder'));
            });
        }
        if (curSelect.find('option:selected').length > 0 && curSelect.find('option:selected').html() != '') {
            curSelect.trigger({type: 'select2:select'})
        }
    });

    curForm.find('.form-input-date input').on('change', function() {
        var curValue = $(this).val();
        if (curValue.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
            var userDate = new Date(curValue.substr(6, 4), Number(curValue.substr(3, 2)) - 1, Number(curValue.substr(0, 2)));
            var isCorrectDate = true;
            if ($(this).attr('min')) {
                var minDateStr = $(this).attr('min');
                var minDate = new Date(minDateStr.substr(6, 4), Number(minDateStr.substr(3, 2)) - 1, Number(minDateStr.substr(0, 2)));
                if (userDate < minDate) {
                    isCorrectDate = false;
                }
            }
            if ($(this).attr('max')) {
                var maxDateStr = $(this).attr('max');
                var maxDate = new Date(maxDateStr.substr(6, 4), Number(maxDateStr.substr(3, 2)) - 1, Number(maxDateStr.substr(0, 2)));
                if (userDate > maxDate) {
                    isCorrectDate = false;
                }
            }
            if (isCorrectDate) {
                var myDatepicker = $(this).data('datepicker');
                if (myDatepicker) {
                    var curValueArray = curValue.split('.');
                    myDatepicker.selectDate(new Date(Number(curValueArray[2]), Number(curValueArray[1]) - 1, Number(curValueArray[0])));
                }
            } else {
                var myDatepicker = $(this).data('datepicker');
                if (myDatepicker) {
                    myDatepicker.clear();
                }
            }
        }
    });

    curForm.find('.form-input-date input').on('keyup', function() {
        var curValue = $(this).val();
        if (curValue.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
            var isCorrectDate = true;
            var userDate = new Date(curValue.substr(6, 4), Number(curValue.substr(3, 2)) - 1, Number(curValue.substr(0, 2)));
            if ($(this).attr('min')) {
                var minDateStr = $(this).attr('min');
                var minDate = new Date(minDateStr.substr(6, 4), Number(minDateStr.substr(3, 2)) - 1, Number(minDateStr.substr(0, 2)));
                if (userDate < minDate) {
                    isCorrectDate = false;
                }
            }
            if ($(this).attr('max')) {
                var maxDateStr = $(this).attr('max');
                var maxDate = new Date(maxDateStr.substr(6, 4), Number(maxDateStr.substr(3, 2)) - 1, Number(maxDateStr.substr(0, 2)));
                if (userDate > maxDate) {
                    isCorrectDate = false;
                }
            }
            if (isCorrectDate) {
                var myDatepicker = $(this).data('datepicker');
                if (myDatepicker) {
                    var curValueArray = curValue.split('.');
                    myDatepicker.selectDate(new Date(Number(curValueArray[2]), Number(curValueArray[1]) - 1, Number(curValueArray[0])));
                    myDatepicker.show();
                    $(this).focus();
                }
            } else {
                $(this).addClass('error');
                return false;
            }
        }
    });

    curForm.find('.form-input-date input').each(function() {
        var minDateText = $(this).attr('min');
        var minDate = null;
        if (typeof (minDateText) != 'undefined') {
            var minDateArray = minDateText.split('.');
            minDate = new Date(Number(minDateArray[2]), Number(minDateArray[1]) - 1, Number(minDateArray[0]));
        }
        var maxDateText = $(this).attr('max');
        var maxDate = null;
        if (typeof (maxDateText) != 'undefined') {
            var maxDateArray = maxDateText.split('.');
            maxDate = new Date(Number(maxDateArray[2]), Number(maxDateArray[1]) - 1, Number(maxDateArray[0]));
        }
        if ($(this).hasClass('maxDate1Year')) {
            var curDate = new Date();
            curDate.setFullYear(curDate.getFullYear() + 1);
            curDate.setDate(curDate.getDate() - 1);
            maxDate = curDate;
            var maxDay = curDate.getDate();
            if (maxDay < 10) {
                maxDay = '0' + maxDay
            }
            var maxMonth = curDate.getMonth() + 1;
            if (maxMonth < 10) {
                maxMonth = '0' + maxMonth
            }
            $(this).attr('max', maxDay + '.' + maxMonth + '.' + curDate.getFullYear());
        }
        var startDate = new Date();
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
            }
        }
        $(this).datepicker({
            language: 'ru',
            minDate: minDate,
            maxDate: maxDate,
            startDate: startDate,
            autoClose: true,
            toggleSelected: false,
            prevHtml: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L5 8L10 13" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /></svg>',
            nextHtml: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L10 8L5 3" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /></svg>'
        });
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
                $(this).data('datepicker').selectDate(startDate);
            }
        }
    });

    window.setInterval(function() {
        $('.form-input-date input').each(function() {
            if ($(this).val() != '') {
                $(this).parent().addClass('focus');
            }
        });
    }, 100);

    curForm.find('.captcha-container').each(function() {
        if ($('script#smartCaptchaScript').length == 0) {
            $('body').append('<script src="https://captcha-api.yandex.ru/captcha.js?render=onload&onload=smartCaptchaLoad" defer id="smartCaptchaScript"></script>');
        } else {
            if (window.smartCaptcha) {
                var curID = window.smartCaptcha.render(this, {
                    sitekey: smartCaptchaKey,
                    callback: smartCaptchaCallback,
                    invisible: true,
                    hideShield: true,
                    hl: 'ru'
                });
                $(this).attr('data-smartid', curID);
            }
        }
    });

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);

            var smartCaptchaWaiting = false;
            curForm.find('.captcha-container').each(function() {
                if (curForm.attr('form-smartcaptchawaiting') != 'true') {
                    var curBlock = $(this);
                    var curInput = curBlock.find('input[name="smart-token"]');
                    curInput.removeAttr('value');
                    smartCaptchaWaiting = true;
                    $('form[form-smartcaptchawaiting]').removeAttr('form-smartcaptchawaiting');
                    curForm.attr('form-smartcaptchawaiting', 'false');

                    if (!window.smartCaptcha) {
                        alert('Сервис временно недоступен, попробуйте позже.');
                        return;
                    }
                    var curID = $(this).attr('data-smartid');
                    window.smartCaptcha.execute(curID);
                } else {
                    curForm.removeAttr('form-smartcaptchawaiting');
                }
            });

            if (!smartCaptchaWaiting) {

                if (curForm.hasClass('ajax-form')) {
                    curForm.addClass('loading');
                    var formData = new FormData(form);

                    $.ajax({
                        type: 'POST',
                        url: curForm.attr('action'),
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        data: formData,
                        cache: false
                    }).fail(function(jqXHR, textStatus, errorThrown) {
                        curForm.find('.message').remove();
                        curForm.append('<div class="message message-error">Сервис временно недоступен, попробуйте позже.</div>')
                        curForm.removeClass('loading');
                    }).done(function(data) {
                        curForm.find('.message').remove();
                        if (data.status) {
                            curForm.html('<div class="message message-success">' + data.message + '</div>')
                        } else {
                            curForm.prepend('<div class="message message-error">' + data.message + '</div>')
                        }
                        curForm.removeClass('loading');
                    });
                } else {
                    form.submit();
                }
            }
        }
    });
}

var smartCaptchaKey = 'uahGSHTKJqjaJ0ezlhjrbOYH4OxS6zzL9CZ47OgY';

function smartCaptchaLoad() {
    $('.captcha-container').each(function() {
        if (!window.smartCaptcha) {
            return;
        }
        var curID = window.smartCaptcha.render(this, {
            sitekey: smartCaptchaKey,
            callback: smartCaptchaCallback,
            invisible: true,
            hideShield: true
        });
        $(this).attr('data-smartid', curID);
    });
}

function smartCaptchaCallback(token) {
    $('form[form-smartcaptchawaiting]').attr('form-smartcaptchawaiting', 'true');
    $('form[form-smartcaptchawaiting] [type="submit"]').trigger('click');
}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curWidth = $(window).width();
        if (curWidth < 375) {
            curWidth = 375;
        }
        var curScroll = $(window).scrollTop();
        var curPadding = $('.wrapper').width();
        $('html').addClass('window-open');
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});
        $('html').data('scrollTop', curScroll);
        $('.wrapper').css({'top': -curScroll});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
    } else {
        $('.window').append('<div class="window-loading"></div>')
        $('.window-container').addClass('window-container-preload');
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }

        window.setTimeout(function() {
            $('.window-container-preload').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));
        });
    });
}

function windowClose() {
    if ($('.window').length > 0) {

        var isEmptyForm = true;
        $('.window .form-input input, .window .form-input textarea, .window .form-select select').each(function() {
            if ($(this).val() != '') {
                isEmptyForm = false;
            }
        });
        if (isEmptyForm) {
            $('.window').remove();
            $('html').removeClass('window-open');
            $('body').css({'margin-right': 0});
            $('.wrapper').css({'top': 0});
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $(window).scrollTop($('html').data('scrollTop'));
        } else {
            if (confirm('Закрыть форму?')) {
                $('.window .form-input input, .window .form-input textarea, .window .form-select select').val('');
                windowClose();
            }
        }
    }
}

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();

    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    $('.main-title, .main-anonce, .archive-photos-item').each(function() {
        var curBlock = $(this);
        if (windowScroll + windowHeight - 100 > curBlock.offset().top) {
            curBlock.addClass('animated');
        } else {
            curBlock.removeClass('animated');
        }
    });

});
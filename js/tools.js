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

    $('.header-search-link').click(function(e) {
        $('html').toggleClass('header-search-open');
        if ($('html').hasClass('header-search-open')) {
            $('.header-search-input input').focus();
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-search').length == 0) {
            $('html').removeClass('header-search-open');
        }
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
            },
            navigation: {
                nextEl: curSection.find('.partners-section-next')[0],
                prevEl: curSection.find('.partners-section-prev')[0],
            },
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
                },
                1580: {
                    slidesPerView: 4
                }
            }
        });
    });

    $('.main-add-links').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider[0], {
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
            window.location.hash = $(this).attr('href').hash.replace('#', '');
        }
        $('.stands-menu').removeClass('open');
        e.preventDefault();
    });

    if ($('.stands-menu').length > 0) {
        if (window.location.hash != '') {
            var curID = window.location.hash.replace('#', '');
            $('.stands-menu ul li a[href="#' + curID + '"]').trigger('click');
        }
    }

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

    $('.program-video-ctrl a').click(function(e) {
        $('.program-video').toggleClass('open');
        e.preventDefault();
    });

    $('.program').each(function() {
        var colorsData = null;
        var programData = null;
        var listHalls = null;

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
            listHalls = data.halls;

            var curDay = '';
            var htmlDates = '';
            var listTracks = [];
            var listFormats = [];
            for (var i = 0; i < programData.length; i++) {
                if (typeof(programData[i].active) != 'undefined' && programData[i].active) {
                    curDay = programData[i].date;
                }
                htmlDates += '<div class="program-filter-date" data-day="' + programData[i].day + '">' + programData[i].date + '</div>';
                for (var j = 0; j < programData[i].events.length; j++) {
                    var curEvent = programData[i].events[j];
                    if (typeof(curEvent.track) != 'undefined') {
                        var eventTracks = curEvent.track;
                        for (var k = 0; k < eventTracks.length; k++) {
                            curTrack = eventTracks[k];
                            if (listTracks.indexOf(curTrack) == -1) {
                                listTracks.push(curTrack);
                            }
                        }
                    }
                    if (typeof(curEvent.format) != 'undefined') {
                        var curFormat = curEvent.format;
                        if (listFormats.indexOf(curFormat) == -1) {
                            listFormats.push(curFormat);
                        }
                    }
                }
            }
            $('.program-filter-dates-select-list').html(htmlDates);
            var vars = window.location.search.substring(1).split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) == 'day') {
                    curDay = decodeURIComponent(pair[1]);
                }
            }
            var today = new Date();
			var todayMonth = ('0' + (today.getMonth() + 1)).slice(-2);
			var todayDay = ('0' + today.getDate()).slice(-2);
            var todayLink = $('.program-filter-date:contains("' + todayDay + '.' + todayMonth + '")');

            if (curDay == '') {
                if (todayLink.length == 1) {
                    todayLink.trigger('click');
                } else {
                    $('.program-filter-date').eq(0).trigger('click');
                }
            } else {
                var curLink = $('.program-filter-date:contains("' + curDay + '")');
                if (curLink.length == 1) {
                    curLink.trigger('click');
                } else {
                    if (todayLink.length == 1) {
                        todayLink.trigger('click');
                    } else {
                        $('.program-filter-date').eq(0).trigger('click');
                    }
                }
            }

            var htmlHalls = '';
            for (var i = 0; i < listHalls.length; i++) {
                htmlHalls += '<div class="program-filter-hall">' + listHalls[i] + '</div>';
            }
            $('.program-filter-halls-select-list').html(htmlHalls);

            var htmlFormats = '<option value=""></option>';
            for (var i = 0; i < listFormats.length; i++) {
                htmlFormats += '<option value="' + listFormats[i] + '">' + listFormats[i] + '</option>';
            }
            $('.program-filter-formats select').html(htmlFormats).trigger('change');

            var htmlTracks = '<option value=""></option>';
            for (var i = 0; i < listTracks.length; i++) {
                htmlTracks += '<option value="' + listTracks[i] + '">' + listTracks[i] + '</option>';
            }
            $('.program-filter-tracks select').html(htmlTracks).trigger('change');

            updateProgram();
        });

        $('body').on('click', '.program-filter-date', function() {
            var curItem = $(this);
            if (!curItem.hasClass('active')) {
                $('.program-filter-date.active').removeClass('active');
                curItem.addClass('active');
                $('.program-filter-dates-select-value').html(curItem.attr('data-day'));
                updateProgram();
            }
            $('.program-filter-dates-select').removeClass('open');
        });

        $('body').on('click', '.program-filter-dates-select-current', function() {
            $('.program-filter-dates-select').toggleClass('open');
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.program-filter-dates-select').length == 0) {
                $('.program-filter-dates-select').removeClass('open');
            }
        });

        $('body').on('click', '.program-filter-hall', function() {
            var curItem = $(this);
            $('.program-filter-hall.active').removeClass('active');
            curItem.addClass('active');
            $('.program-filter-halls-select-value').html(curItem.html());

            $('.program-hall.active').removeClass('active');
            var activeHall = curItem.html();
            $('.program-hall').each(function() {
                var curHall = $(this);
                if (curHall.find('> .title-small').html() == activeHall) {
                    curHall.addClass('active');
                }
            });
            $('.program-filter-halls-select').removeClass('open');
        });

        $('body').on('click', '.program-filter-halls-select-current', function() {
            $('.program-filter-halls-select').toggleClass('open');
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.program-filter-halls-select').length == 0) {
                $('.program-filter-halls-select').removeClass('open');
            }
        });

        $('.program-filter-tracks select, .program-filter-formats select').change(function() {
            var selectedTracks = $('.program-filter-tracks select').val();
            var selectedFormats = $('.program-filter-formats select').val();
            $('.program-item').each(function() {
                var curItem = $(this);
                var isFormat = true;
                if (selectedFormats.length > 0) {
                    if (curItem.find('.program-item-format').length == 1) {
                        if (selectedFormats.indexOf(curItem.find('.program-item-format').html()) == -1) {
                            isFormat = false;
                        }
                    } else {
                        isFormat = false;
                    }
                }
                var isTrack = true;
                if (selectedTracks.length > 0) {
                    if (curItem.find('.program-item-track').length == 1) {
                        var itemTracks = curItem.find('.program-item-track span').html().split(', ');
                        isTrack = false;
                        for (var i = 0; i < itemTracks.length; i++) {
                            if (selectedTracks.indexOf($('<div>' + itemTracks[i] + '</div>').text()) != -1) {
                                isTrack = true;
                            }
                        }
                    } else {
                        isTrack = false;
                    }
                }
                if (isFormat && isTrack) {
                    curItem.removeClass('hidden');
                } else {
                    curItem.addClass('hidden');
                }
            });
        });

        function updateProgram() {
            $('.program').addClass('loading');

            var newHTML =   '<div class="program-wrapper swiper">' +
                                '<div class="program-wrapper-inner swiper-wrapper">' +
                                    '<div class="program-container swiper-slide">';

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

                var curHalls = listHalls;

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

                            var curTop = (startHour - minHour) * heightHour + startMinutes / 60 * heightHour + (startHour - minHour) + 2;

                            var curHeight = ((endHour + endMinutes / 60) - (startHour + startMinutes / 60)) * heightHour - 3;

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

                            newHTML +=  '<' + openTag + ' class="program-item" data-id="' + curEvent.id + '" style="top:' + curTop +'px; min-height:' + curHeight + 'px; max-height:' + curHeight + 'px; ' + bgColor + '">' +
                                            '<div class="program-item-top">' +
                                                '<div class="program-item-time"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-time"></use></svg>' + curEvent.start + '&ndash;' + curEvent.end + '</div>' +
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
                            var isFavourite = ''
                            if (typeof $.cookie('program-item-favourite-' + curEvent.id) != 'undefined' && $.cookie('program-item-favourite-' + curEvent.id) == 'true') {
                                isFavourite = ' active';
                            }
                            newHTML +=  '<div class="program-item-favourite ' + isFavourite + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg></div>';
                            newHTML +=  '</' + closeTag + '>';
                        }
                    }
                    newHTML +=      '</div>';
                }

                newHTML +=      '</div>';
            }

            newHTML +=              '</div>' +
                                '</div>' +
                                '<div class="swiper-scrollbar"></div>' +
                            '</div>';

            $('.program').html(newHTML);
            if ($('.program-hall').length == 4) {
                $('.program-container').addClass('program-container-4');
            }

            $('.program-wrapper').each(function() {
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

            $('.program-filter-hall').eq(0).trigger('click');
            $('.program-filter-tracks select, .program-filter-formats select').trigger('change');
            $('.program').removeClass('loading');
        }
    });

    $('body').on('click', '.program-item-favourite', function() {
        var curItem = $(this).parents().filter('.program-item');
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $.cookie('program-item-favourite-' + curItem.attr('data-id'), 'true', {expires: 365});
        } else {
            $.removeCookie('program-item-favourite-' + curItem.attr('data-id'));
        }
        return false;
    });

    $('.event-others-cards .program-item').each(function() {
        var curItem = $(this);
        var curID = curItem.attr('data-id');
        if (typeof $.cookie('program-item-favourite-' + curID) != 'undefined' && $.cookie('program-item-favourite-' + curID) == 'true') {
            curItem.find('.program-item-favourite').addClass('active');
        }
    });

    $('.event-others-list').each(function() {
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

    $('.presentations').each(function() {
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
            windowHTML +=               '<div class="window-photo-preview-list-item swiper-slide"><a href="#" style="background-image:url(\'' + curGalleryItem.find('img').attr('src') + '\')"></a></div>';
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

    $('.about-digits-list').each(function() {
        var maxTime = 750;

        $('.about-digits-item').each(function() {
            var curItem = $(this);
            curItem.find('.about-digits-item-value span').html(0);

            var maxValue = Number(curItem.find('.about-digits-item-value').attr('data-value'));
            var curPeriod = 10;
            var curOffset = Math.ceil(maxValue / (maxTime / curPeriod))
            if (maxValue / (maxTime / curPeriod) < 1) {
                curOffset = 1;
                curPeriod = Math.ceil(maxTime / maxValue);
            }
            curItem.attr('data-period', curPeriod);
            curItem.attr('data-offset', curOffset);
        });
    });

    var isPageClick = false;

    $('.filter-form form').each(function() {
        var curForm = $(this);
        var validator = curForm.validate();
        if (validator) {
            validator.destroy();
        }
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                $('.filter-container').addClass('loading');

                var curData = curForm.serialize();
                if ($('.filter-container .pager a.active').length == 1) {
                    curData += '&page=' + $('.pager a.active').attr('data-value');
                }
                $.ajax({
                    type: 'POST',
                    url: curForm.attr('action'),
                    dataType: 'html',
                    data: curData,
                    cache: false
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    alert('Сервис временно недоступен, попробуйте позже.');
                    $('.filter-container').removeClass('loading');
                }).done(function(html) {
                    $('.filter-container').html($(html).html());

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

                    $('.filter-container').removeClass('loading');
                    if (isPageClick) {
                        isPageClick = false;
                        var curMargin = $('header').height();
                        $('html, body').animate({'scrollTop': $('.filter-container').offset().top - curMargin});
                    }
                });
            }
        });
    });

    $('body').on('change', '.filter-form .form-select select', function() {
        $('.filter-form form').trigger('submit');
    });

    $('body').on('change', '.filter-form .form-input input', function() {
        $('.filter-form form').trigger('submit');
    });

    $('body').on('click', '.filter-container .pager a', function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.filter-container .pager a.active').removeClass('active');
            curLink.addClass('active');
            if (e.originalEvent === undefined) {
                isPageClick = false;
            } else {
                isPageClick = true;
            }
            $('.filter-form form').trigger('submit');
        }
        e.preventDefault();
    });

    $('.filter-form-participation-dates').each(function() {
        var curItem = $('.filter-form-participation-dates-select-list input:checked').parents().filter('label');
        $('.filter-form-participation-dates-select-value').html(curItem.attr('data-day'));
    });

    $('body').on('click', '.filter-form-participation-dates-select-list label', function() {
        $('.filter-form-participation-dates-select').removeClass('open');
    });

    $('body').on('change', '.filter-form-participation-dates-select-list input', function() {
        var curItem = $(this).parents().filter('label');
        $('.filter-form-participation-dates-select-value').html(curItem.attr('data-day'));
        $('.filter-form-participation-dates-select').removeClass('open');
        $('.filter-form form').trigger('submit');
    });

    $('body').on('click', '.filter-form-participation-dates-select-current', function() {
        $('.filter-form-participation-dates-select').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.filter-form-participation-dates-select').length == 0) {
            $('.filter-form-participation-dates-select').removeClass('open');
        }
    });

    $('body').on('click', '.slider-item-video', function(e) {
        $('body').removeClass('page-main');
        $('.slider').remove();
        $('.main-video').show();
        e.preventDefault();
    });

    $('.program-main-more a').click(function(e) {
        $('.program-main-page').toggleClass('open');
        e.preventDefault();
    });

    $('.scheme-map').each(function() {

        var schemeMapWidth = 1087;
        var schemeMapHeight = 666;

        if ($(window).width() < 1220) {
            schemeMapWidth = 676;
            schemeMapHeight = 425;
        }

        if ($(window).width() < 768) {
            schemeMapWidth = 306;
            schemeMapHeight = 196;
        }

        $('.scheme-map').data('zoom', 1);
        $('.scheme-map-img').data('curLeft', 0);
        $('.scheme-map-img').data('curTop', 0);

        var schemeMapZoomIntensity = 0.5;

        $('body').on('click', '.scheme-zoom-inc', function(e) {
            var curZoom = Number($('.scheme-map').data('zoom'));

            var curLeft = Number($('.scheme-map-img').data('curLeft'));
            var curTop = Number($('.scheme-map-img').data('curTop'));

            var mouseX = schemeMapWidth / 2;
            var mouseY = schemeMapHeight / 2;

            var scale = curZoom + schemeMapZoomIntensity;
            curLeft += mouseX / (curZoom * scale) - mouseX / curZoom;
            curTop += mouseY / (curZoom * scale) - mouseY / curZoom;

            if (scale > 1) {
                $('.scheme-zoom-dec').removeClass('disabled');
            }

            curZoom = curZoom + schemeMapZoomIntensity;
            $('.scheme-map').data('zoom', curZoom);

            $('.scheme-map-img').css({'transform': 'translate(' + curLeft + 'px, ' + curTop + 'px)', 'width': curZoom * schemeMapWidth, 'height': curZoom * schemeMapHeight});
            $('.scheme-map-img').data('curLeft', curLeft);
            $('.scheme-map-img').data('curTop', curTop);
            e.preventDefault();
        });

        $('body').on('click', '.scheme-zoom-dec', function(e) {
            var curZoom = Number($('.scheme-map').data('zoom'));

            var curLeft = Number($('.scheme-map-img').data('curLeft'));
            var curTop = Number($('.scheme-map-img').data('curTop'));

            var mouseX = schemeMapWidth / 2;
            var mouseY = schemeMapHeight / 2;

            var scale = curZoom - schemeMapZoomIntensity;
            if (scale < 1) {
                scale = 1;
            }
            if (scale == 1) {
                $('.scheme-zoom-dec').addClass('disabled');
            }
            curLeft -= mouseX / (curZoom * scale) - mouseX / curZoom;
            curTop -= mouseY / (curZoom * scale) - mouseY / curZoom;
            if (scale == 1) {
                curLeft = 0;
                curTop = 0;
            }

            curZoom = curZoom - schemeMapZoomIntensity;
            if (curZoom < 1) {
                curZoom = 1;
            }
            $('.scheme-map').data('zoom', curZoom);

            if (curLeft > 0) {
                curLeft = 0;
            }
            if (curLeft < $('.scheme-map').width() - curZoom * schemeMapWidth) {
                curLeft = $('.scheme-map').width() - curZoom * schemeMapWidth;
            }
            if (curTop > 0) {
                curTop = 0;
            }
            if (curTop < $('.scheme-map').height() - curZoom * schemeMapHeight) {
                curTop = $('.scheme-map').height() - curZoom * schemeMapHeight;
            }

            $('.scheme-map-img').css({'transform': 'translate(' + curLeft + 'px, ' + curTop + 'px)', 'width': curZoom * schemeMapWidth, 'height': curZoom * schemeMapHeight});
            $('.scheme-map-img').data('curLeft', curLeft);
            $('.scheme-map-img').data('curTop', curTop);
            e.preventDefault();
        });

        var mapDrag = false;
        var mapMove = false;
        var mapMoveTimer = null;
        var mapStartX = 0;
        var mapStartY = 0;

        if ($(window).width() >= 1220) {
            $('.scheme-map').on('mousedown', function(e) {
                if (Number($('.scheme-map').data('zoom')) > 1) {
                    mapDrag = true;
                    mapStartX = e.pageX;
                    mapStartY = e.pageY;
                }
            });

            $('.scheme-map').on('mousemove', function(e) {
                if (mapDrag) {
                    mapMove = true;
                    var curLeft = Number($('.scheme-map-img').data('curLeft'));
                    var curTop = Number($('.scheme-map-img').data('curTop'));
                    var curDiffX = e.pageX;
                    var curDiffY = e.pageY;
                    curDiffX = curDiffX - mapStartX;
                    curDiffY = curDiffY - mapStartY;
                    curLeft += curDiffX;
                    if (curLeft > 0) {
                        curLeft = 0;
                    }
                    var curZoom = Number($('.scheme-map').data('zoom'));
                    if (curLeft < $('.scheme-map').width() - curZoom * schemeMapWidth) {
                        curLeft = $('.scheme-map').width() - curZoom * schemeMapWidth;
                    }
                    curTop += curDiffY;
                    if (curTop > 0) {
                        curTop = 0;
                    }
                    if (curTop < $('.scheme-map').height() - curZoom * schemeMapHeight) {
                        curTop = $('.scheme-map').height() - curZoom * schemeMapHeight;
                    }
                    mapStartX = e.pageX;
                    mapStartY = e.pageY;
                    $('.scheme-map-img').css({'transform': 'translate(' + curLeft + 'px, ' + curTop + 'px)'});
                    $('.scheme-map-img').data('curLeft', curLeft);
                    $('.scheme-map-img').data('curTop', curTop);
                }
            });

            $(document).on('mouseup', function(e) {
                mapDrag = false;
                if (mapMove) {
                    window.clearTimeout(mapMoveTimer);
                    mapMoveTimer = null;
                    mapMoveTimer = window.setTimeout(function() {
                        mapMove = false;
                    }, 100);
                }
            });
        } else {
            $('.scheme-map').on('touchstart', function(e) {
                mapDrag = true;
                mapStartX = e.originalEvent.touches[0].pageX;
                mapStartY = e.originalEvent.touches[0].pageY;
            });

            $('.scheme-map').on('touchmove', function(e) {
                if (mapDrag) {
                    var curLeft = Number($('.scheme-map-img').data('curLeft'));
                    var curTop = Number($('.scheme-map-img').data('curTop'));
                    var curDiffX = e.originalEvent.touches[0].pageX;
                    var curDiffY = e.originalEvent.touches[0].pageY;
                    curDiffX = curDiffX - mapStartX;
                    curDiffY = curDiffY - mapStartY;
                    curLeft += curDiffX;
                    if (curLeft > 0) {
                        curLeft = 0;
                    }
                    var curZoom = Number($('.scheme-map').data('zoom'));
                    if (curLeft < $('.scheme-map').width() - curZoom * schemeMapWidth) {
                        curLeft = $('.scheme-map').width() - curZoom * schemeMapWidth;
                    }
                    curTop += curDiffY;
                    if (curTop > 0) {
                        curTop = 0;
                    }
                    if (curTop < $('.scheme-map').height() - curZoom * schemeMapHeight) {
                        curTop = $('.scheme-map').height() - curZoom * schemeMapHeight;
                    }
                    mapStartX = e.originalEvent.touches[0].pageX;
                    mapStartY = e.originalEvent.touches[0].pageY;
                    $('.scheme-map-img').css({'transform': 'translate(' + curLeft + 'px, ' + curTop + 'px)'});
                    $('.scheme-map-img').data('curLeft', curLeft);
                    $('.scheme-map-img').data('curTop', curTop);
                }
                e.preventDefault();
            });

            $(document).on('touchend', function(e) {
                mapDrag = false;
            });
        }
    });

    $('.participation-stat-list').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider[0], {
            loop: true,
            touchAngle: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    });

    $('.event-detail').each(function() {
        var curBlock = $(this);
        if (curBlock.find('.event-detail-info-group').length == 3) {
            curBlock.addClass('three-quarters');
        }
        if (curBlock.find('.event-detail-info-group').length == 2) {
            curBlock.addClass('half');
        }
    });

    $('.spikers-list').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider[0], {
            loop: true,
            autoplay: {
                delay: 6000,
            },
            touchAngle: 30,
            navigation: {
                nextEl: $('.spikers-ctrl .swiper-button-next')[0],
                prevEl: $('.spikers-ctrl .swiper-button-prev')[0],
            },
            pagination: {
                el: $('.spikers-ctrl .swiper-pagination')[0],
                clickable: true
            }
        });
    });

    $('body').on('click', '.video-link', function(e) {
        var curLink = $(this);

        var curWidth = $(window).width();
        if (curWidth < 375) {
            curWidth = 375;
        }

        var curScroll = $(window).scrollTop();
        $('html').addClass('window-video-open');
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
        $('html').data('scrollTop', curScroll);

        var windowHTML =    '<div class="window-video">';

        windowHTML +=           '<a href="#" class="window-video-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-close"></use></svg></a>';

        var videoLink = curLink.attr('href');
        if (videoLink.indexOf('?') != -1) {
            videoLink += '&amp;rel=0&amp;autoplay=1';
        } else {
            videoLink += '?rel=0&amp;autoplay=1';
        }

        windowHTML +=           '<div class="window-video-player"><iframe width="560" height="315" src="' + videoLink + '" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';

        windowHTML +=       '</div>';

        $('.window-video').remove();
        $('body').append(windowHTML);

        e.preventDefault();
    });

    $('body').on('click', '.window-video-close', function(e) {
        $('.window-video').remove();
        $('html').removeClass('window-video-open');
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $(window).scrollTop($('html').data('scrollTop'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            if ($('.window-video').length > 0) {
                $('.window-video-close').trigger('click');
            }
        }
    });

    $('.videos-group').each(function() {
        var curBlock = $(this);
        if (curBlock.find('.videos-group-item').length > 4) {
            curBlock.find('.videos-group-more').addClass('visible');
        }
    });

    $('.videos-group-more a').click(function(e) {
        var curBlock = $(this).parents().filter('.videos-group');
        curBlock.toggleClass('open');
        curBlock.find('.videos-group-item:gt(7)').slideToggle();
        e.preventDefault();
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
    curForm.find('.form-input-date-range input').prop('readonly', true);
    curForm.find('.form-input-date-range input').attr('autocomplete', 'off');

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
        curSelect.parent().find('.select2-selection__rendered').attr('data-placeholder', curSelect.attr('data-placeholder'));
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
                $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', '');
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

    curForm.find('.form-input-date-range input').each(function() {
        var curInput = $(this);
        var minDateText = curInput.attr('min');
        var minDate = null;
        if (typeof (minDateText) != 'undefined') {
            var minDateArray = minDateText.split('.');
            minDate = new Date(Number(minDateArray[2]), Number(minDateArray[1]) - 1, Number(minDateArray[0]));
        }
        var maxDateText = curInput.attr('max');
        var maxDate = null;
        if (typeof (maxDateText) != 'undefined') {
            var maxDateArray = maxDateText.split('.');
            maxDate = new Date(Number(maxDateArray[2]), Number(maxDateArray[1]) - 1, Number(maxDateArray[0]));
        }
        curInput.datepicker({
            language: 'ru',
            minDate: minDate,
            maxDate: maxDate,
            range: true,
            multipleDatesSeparator: ' – ',
            prevHtml: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L5 8L10 13" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /></svg>',
            nextHtml: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L10 8L5 3" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /></svg>',
            onSelect: function(date, formattedDate, datepicker) {
                curInput.trigger('change');
            }
        });
    });

    window.setInterval(function() {
        $('.form-input-date input, .form-input-date-range input').each(function() {
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

var lastScrollTop = 0;
var didScroll = false;
var delta = 5;

$(window).on('scroll', function() {
    didScroll = true;
    window.setInterval(function() {
        if (didScroll) {
            var st = $(window).scrollTop();
            if (Math.abs(lastScrollTop - st) <= delta) {
                return;
            }
            if (st > lastScrollTop && st > $('header').height()) {
                $('header').addClass('header-up');
            } else {
                if (st + $(window).height() < $(document).height()) {
                    $('header').removeClass('header-up');
                }
            }
			lastScrollTop = st;
            didScroll = false;
        }
    }, 50);
});

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();

    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    if (windowScroll > 0) {
        $('header').addClass('fixed')
    } else {
        $('header').removeClass('fixed')
    }

    $('.main-title, .main-anonce, .archive-photos-item').each(function() {
        var curBlock = $(this);
        if (windowScroll + windowHeight - 100 > curBlock.offset().top) {
            curBlock.addClass('animated');
        } else {
            curBlock.removeClass('animated');
        }
    });

    $('.about-digits-item').each(function() {
        var curItem = $(this);
        if (windowScroll + windowHeight > curItem.offset().top) {
            if (!curItem.hasClass('animated')) {
                curItem.addClass('animated');

                var curTimer = null;
                var curPeriod = Number(curItem.attr('data-period'));
                var curOffset = Number(curItem.attr('data-offset'));
                var curMax = Number(curItem.find('.about-digits-item-value').attr('data-value'));

                function updateValue() {
                   var curValue = Number(curItem.find('.about-digits-item-value span').html());
                   curValue += curOffset;
                   if (curValue > curMax) {
                       curValue = curMax;
                   }
                   curItem.find('.about-digits-item-value span').html(curValue);
                   if (curValue < curMax) {
                       curTimer = window.setTimeout(updateValue, curPeriod);
                   }
                }

                curTimer = window.setTimeout(updateValue, curPeriod);
            }
        }
    });

    $('.participation-sections').each(function() {
        var curItem = $(this);
        var curStart = curItem.offset().top - windowHeight;
        var curStop = curItem.offset().top + curItem.outerHeight();
        if (windowScroll > curStart) {
            if (windowScroll < curStop) {
                var curOffset = (windowScroll - windowHeight) / (curStop - curStart) * 400;
                $('.participation-sections-bg').css({'transform': 'translateY(' + (curOffset) + 'px)'});
            }
        } else {
            $('.participation-sections-bg').css({'transform': 'translateY(0px)'});
        }
    });

    $('.guide-sections').each(function() {
        var curItem = $(this);
        var curStart = curItem.offset().top - windowHeight;
        var curStop = curItem.offset().top + curItem.outerHeight();
        if (windowScroll > curStart) {
            if (windowScroll < curStop) {
                var curOffset = (windowScroll - windowHeight) / (curStop - curStart) * 400;
                $('.guide-sections-bg').css({'transform': 'translateY(' + (curOffset) + 'px)'});
            }
        } else {
            $('.guide-sections-bg').css({'transform': 'translateY(0px)'});
        }
    });

});

$(document).ready(function() {
    if ($('.window-notification-container').length == 1) {
        if (typeof $.cookie('is-notification') == 'undefined' || $.cookie('is-notification') == 'false') {
            window.setTimeout(function() {
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

                var newHTML = $('.window-notification-container').html();

                if ($('.window-container').length == 0) {
                    $('.window').html('<div class="window-container window-container-preload">' + newHTML + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
                } else {
                    $('.window-container').html(newHTML + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
                    $('.window .window-loading').remove();
                }

                window.setTimeout(function() {
                    $('.window-container-preload').removeClass('window-container-preload');
                }, 100);
                $.cookie('is-notification', 'true', {expires: 365});
            }, 6000);
        }
    }

    if ($('.archive-photos-list').length > 0) {
        var $grid = $('.archive-photos-list').masonry({
            itemSelector: '.archive-photos-item',
            gutter: 0,
            percentPosition: true
        });
    }

});
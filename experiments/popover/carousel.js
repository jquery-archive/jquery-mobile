/*
* jQuery Mobile Framework : carousel component
* Copyright (c) 2010 Adobe Systems Incorporated - Alexandre Capt (acapt@adobe.com)
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change
*/
$(function () {
    // Used to output caught errors
    function errorLog(error, message) {
        try {
            if (typeof console != 'undefined' && typeof console.log != 'undefined') {
                console.log(error);
                console.log(message);
            } else {
                alert(error.name + ':\n' + error.message + '.\n' + message + '.');
            }
        } catch (e) {
        }
    }

    try {
        // Opacity fading conflicts in IE8 with the PNG fix and text anti-aliasing
        var fadingSpeed = $.browser.msie ? 0 : 250;

        // Removes the URL hash if it corresponds to the id of an element in the given context
        function removeHash(context) {
            try {
                if (window.location.hash.length > 0 && $(window.location.hash, context).length > 0) {
                    window.location = (window.location + '').replace(window.location.hash, '');
                }
            } catch (e) {
                errorLog(e, 'Could not remove hash');
            }
        }

        // carousel code
        try {
            $('.carousel').each(function () {
                var carousel = $(this);
                var playDelay = +$("var[title='play-delay']", this).text();
                if (!playDelay) {
                    playDelay = 6000;
                }
                var slidingSpeed = +$("var[title='transition-time']", this).text();
                if (!slidingSpeed) {
                    slidingSpeed = 1000;
                }
                var banners = $('.carousel-banners', this);
                //do not why, but
                // var links = $('.carousel-banner-switch a', this);
                //returns more links than expected after component reload. Changed to "find" = works......
                var switcher = $('.carousel-banner-switch', this);
                var links = switcher.find('a');
                var items = $('.carousel-banner-item', this);
                var width = items.outerWidth();
                var itemActive = items.filter(':first');
                var itemPrevious = null;
                var interval = null;
                var i = 0;

                var ctlPrev = $('a.carousel-control-prev', this);
                ctlPrev.click(function() {
                    if (ctlPrev.is('.carousel-active')) {
                        $(links[(i + links.length - 1) % links.length]).click();
                    }
                    return false;
                });
                var ctlNext = $('a.carousel-control-next', this);
                ctlNext.click(function() {
                    if (ctlNext.is('.carousel-active')) {
                        $(links[(i + 1) % links.length]).click();
                    }
                    return false;
                });
                if (links.length > 1) {
                    ctlNext.addClass('carousel-active');
                }
                function play() {
                    stop();
                    if (playDelay > 0) {
                        interval = setInterval(function () {
                            $(links[(i + 1) % links.length]).click();
                        }, playDelay);
                    }
                }

                function stop() {
                    if (interval !== null) {
                        clearInterval(interval);
                        interval = null;
                    }
                }

                // Show first item (needed for browsers that don't support CSS3 selector :first-of-type)
                if (fadingSpeed || $.browser.version > 6) {
                    itemActive.css('left', 0);
                } else {
                    itemActive.show();
                }

                links
                        .click(function () {
                    var link = $(this);
                    var itemNew = items.filter(link.attr('href'));
                    var j = itemNew.prevAll().length;
                    var direction = (j > i || interval !== null) ? 1 : -1;

                    if (!link.is('.carousel-active')) {
                        links.removeClass('carousel-active');
                        link.addClass('carousel-active');

                        if (itemActive.is(':animated')) {
                            itemActive.stop(true, true);
                            itemPrevious.stop(true, true);
                        }

                        if (fadingSpeed) {
                            itemNew.css({'left': direction * width}).animate({'left': 0, 'opacity': 1}, slidingSpeed);
                            itemActive.animate({'left': -direction * width, 'opacity': 0}, slidingSpeed);
                        } else {
                            if ($.browser.version > 6) {
                                itemNew.css({'left': direction * width}).animate({'left': 0}, slidingSpeed);
                                itemActive.animate({'left': -direction * width}, slidingSpeed);
                            } else {
                                itemNew.fadeIn();
                                itemActive.fadeOut();
                            }
                        }

                        itemPrevious = itemActive;
                        itemActive = itemNew;
                        i = j;
                        if (i > 0) {
                            ctlPrev.addClass('carousel-active');
                        } else {
                            ctlPrev.removeClass('carousel-active');
                        }
                        if (i < links.length - 1) {
                            ctlNext.addClass('carousel-active');
                        } else {
                            ctlNext.removeClass('carousel-active');
                        }
                    }

                    return false;
                })
                        .each(function () {
                    var link = $(this);

                    link.attr('title', link.text());
                })
                        .filter(':first').addClass('carousel-active');

                play();
                carousel.hover(
                        function() {
                            stop();
                            ctlPrev.fadeIn();
                            ctlNext.fadeIn();
                        },
                        function() {
                            play();
                            ctlPrev.fadeOut();
                            ctlNext.fadeOut();
                        }
                        );

                // Accessing the page with the anchor of a banner in the URL can break the layout
                removeHash(this);
            });
        } catch (e) {
            errorLog(e, 'Could not initialize the banners');
        }
    } catch (e) {
        errorLog(e, 'Init failed');
    }

});
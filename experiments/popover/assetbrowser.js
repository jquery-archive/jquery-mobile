/*
* jQuery Mobile Framework : asset browser demo component
* Copyright (c) 2010 Adobe Systems Incorporated - Alexandre Capt (acapt@adobe.com)
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change
*/
$(function () {
    window.AssetsBrowser = function() {

        var getPopover = function(options) {
            return $("<div>")
                    .appendTo($.mobile.activePage)
                    .popover(options);

        };

        return {
            create: function(origin, mask) {
                var popover = getPopover({
                    theme: "a",
                    modal: mask
                });
                popover.addClass("popover-assets");

                var content = $('<div data-role="controlgroup"><h3>Assets Browser</h3></div>').controlgroup();
                popover.append(content);

                //get images and build the carousel
                $.ajax({
                    type: "GET",
                    url: "./images.json",
                    data: {},
                    success: function(data, textStatus) {
                        var html = '<div class="carousel ui-carousel">' +
                                '<var title="play-delay">-1</var>' +
                                '<var title="transition-time">1000</var>' +
                                '<div class="carousel-banners ui-carousel-banners">';
                        var nbBanner = 0;
                        data = data || [];
                        for (var i = 0; i < data.length; i++) {
                            if (i % 4 == 0) {
                                var style = "left: -1000px; opacity: 0;";
                                if (i == 0) {
                                    style = "opacity: 1; left: 0px;";
                                } else {
                                    html += '</div>';
                                }
                                html += '<div style="' + style + '" id="cqc-ui-carousel-test' + (nbBanner + 1) + '" class="carousel-banner-item ui-carousel-banner-item">';
                                nbBanner++;
                            }
                            var img = data[i];
                            var title = img.title || "";
                            if (title.length > 20) {
                                title = title.substring(0, 17) + "...";
                            }
                            html += '<div class="asset-wrap">' +
                                    '<div class="asset-preview" style="background-image: url(' + img.path + ');" title="' + img.title + '" path="' + img.path + '"></div>' +
                                    '<span class="asset-title">' + title + '</span>' +
                                    '</div>';

                        }
                        html += '</div>';
                        html += '<div class="carousel-banner-switches-bc ui-carousel-banner-switches-bc">';
                        html += '<ul class="carousel-banner-switch ui-carousel-banner-switch">';
                        html += '<li><a class="carousel-active ui-carousel-active" title="" href="#cqc-ui-carousel-test1"><img src="images/0.gif" alt="0"></a></li>';
                        for (var i = 1; i < nbBanner; i++) {
                            html += '<li><a class="" title="" href="#cqc-ui-carousel-test' + (i + 1) + '"><img src="images/0.gif" alt="0"></a></li>';
                        }
                        html += '</ul>';
                        html += '</div>';

                        html += '</div>';


                        html += '</div>';
                        content.append(html);
                        $.getScript("./carousel.js");

                        var marker = this;
                        //swipe right to navigate to right
                        $('.ui-carousel-banner-item').bind("swiperight", function(event) {
                            if( marker.timeout ) {
                                window.clearTimeout(marker.timeout);
                                marker.timeout = null;
                            }
                            //find previous and click
                            $("a[href='#" + this.id + "']").parent().prev().children("a").trigger("click");
                            event.stopPropagation();
                            event.preventDefault();
                        });

                        //swipe left to navigate to left
                        $('.ui-carousel-banner-item').bind("swipeleft", function(event) {
                            if( marker.timeout ) {
                                window.clearTimeout(marker.timeout);
                                marker.timeout = null;
                            }
                            //find next and click
                            $("a[href='#" + this.id + "']").parent().next().children("a").trigger("click");
                            event.stopPropagation();
                            event.preventDefault();
                        });

                        //asset selection
                        $('.ui-carousel-banner-item').bind($.support.touch ? "touchend" : "mouseup", function(event) {
                            var target = $(event.target);

                            if( target.hasClass("asset-preview")) {
                                //delay to give priority to swipes
                                marker.timeout = window.setTimeout(function() {
                                    var asset = target.parent();
                                    if( !asset.hasClass("asset-selected")) {
                                        asset.addClass("asset-selected");
                                    } else {
                                        asset.removeClass("asset-selected");
                                    }
                                }, 100);
                            }
                        });


                        popover.popover("showCentered");
                    },
                    error: function(xhr, textStatus, errorThrow) {
                        var text = $(xhr.responseText).html();
                        console.log("Failed to load images", text);
                    },
                    "dataType": "json"
                });
            }

        }
    }();
});
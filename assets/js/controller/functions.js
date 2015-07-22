/**
 * Created by fanzhang on 6/10/15.
 */

function addTextField(e) {
    //this is ver 1:
//    var tempET = new ETextObject(++lastId);
//    etArray.push(tempET);
//    $(".op-slideContainer").append(tempET.domE);
//    applyDraggable($('#et' + tempET.id));
//
//    if (e) {
//        $('#et' + tempET.id).css({
//            top: e.pageY - 80 + "px",
//            left: e.pageX - 250 + "px"
//        });
//    }

    //this is ver 2:
    var sob = new SlideObj(++lastId);
    if (e) {
        sob.top = e.pageY - 80;
        sob.left = e.pageX - 250;
    }
    AllSlides[currentSlideNum].content.push(sob);
    renderSlide(AllSlides[currentSlideNum]);

    // add item in components window
    $('.componentsList').append('<li class="oneComponent" data-siId="' + lastId + '">' +
        '<i class="text">T</i>' +
        '<p>Double Click to Edit</p>' +
        '</li>');
    $(".componentsList").sortable().disableSelection();
}

function updatePropertyPanel(id) {
    if (id != null) {
        var target = $("#" + id);
        $("#topValue").html(Math.round(target.offset().top) + " px");
        $("#leftValue").html(Math.round(target.offset().left) + " px");
        $("#widthValue").html(target.width() + " px");
        $("#heightValue").html(target.height() + " px");
        $("#zIndexValue").html(target.css("z-index") + "");
    } else {
        $("#topValue").html("-");
        $("#leftValue").html("-");
        $("#widthValue").html("-");
        $("#heightValue").html("-");
        $("#zIndexValue").html("-");
    }
}

function settingCurrentItem(item) {
    if (item) {
        currentItem = item;
        $('#deleteElement').removeClass('disabled');
        $('#moveForward').removeClass('disabled');
        $('#moveBackWard').removeClass('disabled');
        $('#bringToFront').removeClass('disabled');
        $('#bringToBack').removeClass('disabled');
    } else {
        currentItem = null;
        $('#deleteElement').addClass('disabled');
        $('#moveForward').addClass('disabled');
        $('#moveBackWard').addClass('disabled');
        $('#bringToFront').addClass('disabled');
        $('#bringToBack').addClass('disabled');
    }
}

function getScreenshotFor(slideNum) {
//    slideNum = 1;
    html2canvas(document.getElementById('slideContent'), {
        onrendered: function (canvas) {
            $(canvas).css({
                'width': $('.slidesThumbnail').width(),
                'height': $('.slidesThumbnail').height()
            }).attr('id', 'tbn' + slideNum);
            if ($('#tbn' + slideNum) != undefined) {
                $('#tbn' + slideNum).remove();
            }
            $('#stn' + slideNum).append(canvas);
        }
    });
}

function saveCurrentSlide() {
//    $('.editText').attr('class', 'editText');
//    currentSlideContent = $("#slideContent").html();
//    AllSlides[currentSlideNum] = {
//        'domHtml': $("#slideContent").html(),
//        'numOfBoxes': lastId
//    };
    getScreenshotFor(currentSlideNum+1);
//    loadSlide(currentSlideNum);
}

function loadSlide(num) {
    saveCurrentSlide();
    currentSlideNum = num;
    clearCurrentSlide();
//    $('#slideContent').html(AllSlides[num].domHtml);
    highlightCurrent();
//    setTimeout(function () {
//        for (var i = 1; i <= AllSlides[num].numOfBoxes; i++) {
//            applyDraggable($('#et' + i));
//        }
//    }, 1000);
    lastId = AllSlides[num].content.length;
    renderSlide(AllSlides[num]);
}

function newSlide(content, isFirstTime) {
    var slide = new Slide(totalSlideNum);

    if (content) {
        slide.content = content.content;
    }

    AllSlides.push(slide);
    currentSlideNum = totalSlideNum;
//    ++currentSlideNum;
    $('.slideWrap').append(
            '<div class="slidesThumbnail" id="stn' + ++totalSlideNum + '">\
                <div class="pageNumber">' + totalSlideNum + '</div>\
             </div>'
    );
    clearCurrentSlide();

    highlightCurrent();
    resortAllSlides();
    startValue = JSON.parse(JSON.stringify(AllSlides[currentSlideNum]));

    setTimeout(function(){
        loadSlide(currentSlideNum);
    },100);
    if (isFirstTime === true) {
        saveCurrentSlide();
    }
    saveCurrentSlide();
}

function setContent(content) {
//    $('.op-slideContainer').html(content);

}

function clearCurrentSlide() {
    $('.op-slideContainer').html('');
}

function highlightCurrent() {
    $('.slidesThumbnail').css("border", '4px solid #464646');
    $('#stn' + (currentSlideNum+1)).css('border', '4px solid rgba(0, 127, 122, 0.5)');
//    $($('.slidesThumbnail')[currentSlideNum-1]).css("border",'4px solid rgba(0, 127, 122, 0.5);');
}

function updateEleWidth() {
    console.log(currentItem.attr('id'));
}

function deleteSlide(index) {
    $('#stn' + index).remove();
//    AllSlides.splice(index,1);
//    totalSlideNum--;
    resortAllSlides();
}

function findIndexFromArray(slideNum) {
    for (var i = 0; i < AllSlides.length; i++) {
        if (slideNum == $(AllSlides[1].domHtml).attr('id').substring(2)) {
            return i;
        }
    }
    return -1;
}

function changeTheme(id) {
    $('#customizedCss').remove();
    $('head').append('<link id="customizedCss" rel="stylesheet" href="themes/pt' + id + '.css" type="text/css" />');
}

function toggleGridSnap() {
    if (toggleGridSnapFlag) {
        $('.editText').draggable("option", "grid", [10, 10]);
    } else {
        $('.editText').draggable("option", "grid", false);
    }
    toggleGridSnapFlag = !toggleGridSnapFlag;
}

function applyDraggable(jObj) {
    jObj
        .draggable({
            start: function (event, ui) {
                initTop = event.pageY;
                initLeft = event.pageX;
            },
            drag: function (event, ui) {
                var draggable = $(this).data("ui-draggable");
                $.each(draggable.snapElements, function (index, element) {
                    ui = $.extend({}, ui, {
                        snapElement: $(element.item),
                        snapping: element.snapping
                    });
                    if (element.snapping) {
                        if (!element.snappingKnown) {
                            element.snappingKnown = true;
                            draggable._trigger("snapped", event, ui);
                        }
                    } else if (element.snappingKnown) {
                        element.snappingKnown = false;
                        draggable._trigger("snapLeft", event, ui);
                    }
                });
                updateShadowBorder($(event.target).offset().top, $(event.target).offset().left, $(event.target).width(), $(event.target).height());
            },
//            containment: "parent",
            snap: '#slideContent,.slidItem',
            snapTolerance: 3,
            snapped: function (event, ui) {
                $(ui.helper).css('border-color', 'rgba(255,0,0,0.2)');
                ui.snapElement.css('border-color', 'rgba(255,0,0,0.2)');
            },
            snapLeft: function (event, ui) {
                $(ui.helper).css('border-color', '#167efb');
                ui.snapElement.css('border-color', 'rgba(0,0,0,0.2)');
            },
            stop: function (event, ui) {
                $('.editText').css('border-color', 'rgba(0, 0, 0, 0.2)');
                $(ui.helper).css('border-color', '#167efb');
                $('.snappingDiv').hide();
                if (isMultiSelect) {
                    var deltaTop = event.pageY - initTop;
                    var deltaLeft = event.pageX - initLeft;
                    updateMultipleHost(deltaTop, deltaLeft);
                } else {
                    updateHostSpec();
                }
            }
        })
//        .resizable("destroy")
        .resizable({
            handles: 'ne, se, sw, nw, s, w, e, n',
            start: function (event, ui) {
            },
            stop: function (event, ui) {
                if (isMultiSelect) {
                    updateMultipleHostResize(ui.originalPosition, ui.position, ui.originalSize, ui.size);
                } else {
                    updateHostSpec();
                }
            }
        })
}


function updateShadowBorder(top, left, width, height) {
    $('.snappingDiv').hide();
    var tolerance = 4;

    var right = left + width;
    var bottom = top + height;
    var target = $('.op-slideContainer');
    var targetOffset = target.offset();
    if (top == targetOffset.top) {
        $('.sideDiveUp').show()
    }

    if (left == targetOffset.left) {
        $('.sideDiveLeft').show()
    }

    if (right == targetOffset.left + target.width() - 2) {
        $('.sideDiveRight').show()
    }

    if (bottom == targetOffset.top + target.height() - 2) {
        $('.sideDiveDown').show()
    }

    var middle = {
        top: top + (height / 2),
        left: left + (width / 2)
    };
    var middleLineTop = targetOffset.top + (target.height() / 2) - 2;
    var middleLineLeft = targetOffset.left + (target.width() / 2) - 2;

    console.log(middle.top + '|' + middle.left + '/' + middleLineTop + '|' + middleLineLeft);


    if (!(middleLineTop - tolerance < middle.top && middle.top < middleLineTop + tolerance)
        && !(middleLineLeft - tolerance < middle.left && middle.left < middleLineLeft + tolerance)) {
        $('.ghostSizing').draggable("option", "grid", false);
    }


    if (middleLineTop - tolerance < middle.top && middle.top < middleLineTop + tolerance) {
        $('.sideDiveCenterH').show();
        $('.ghostSizing').draggable("option", "grid", [1, tolerance + 1]);
    }
    if (middleLineLeft - tolerance < middle.left && middle.left < middleLineLeft + tolerance) {
        $('.sideDiveCenterV').show();
        $('.ghostSizing').draggable("option", "grid", [tolerance + 1, 1]);
    }

    if ((middleLineTop - tolerance < middle.top && middle.top < middleLineTop + tolerance)
        && (middleLineLeft - tolerance < middle.left && middle.left < middleLineLeft + tolerance)) {
        $('.ghostSizing').draggable("option", "grid", [tolerance + 1, tolerance + 1]);
    }
}

function deselectCurrentEl(target) {
    itemSelected = false;
    $('.editText').css('border', '1px solid rgba(0,0,0,0.2)');

    updatePropertyPanel();
    settingCurrentItem();
    if (target) {
        target.blur();
    }
}
function selectCurrentEl(target) {

    lastSelectedItem = target;

    itemSelected = true;
    target.css('border', '1px solid #167efb');

    settingCurrentItem(target);
    updatePropertyPanel(target.attr('id'));
}

function toggleMultiSelect() {
    if (isMultiSelect) {
        disableMultiSelect();
    } else {
        enableMultiselect();
    }
}

function disableMultiSelect() {
    isMultiSelect = false;
    $('.MultiSelect-toggle').css({
        'background': 'transparent'
    })
}

function enableMultiselect() {
    isMultiSelect = true;
    $('.MultiSelect-toggle').css({
        'background': 'black'
    })
}

//function addToSelectedItems(id) {
//    multiSelectedItems.push(id);
//}
//
//function removeFromSelectedItems(id) {
//    multiSelectedItems.push(id);
//}

function updateHostSpec() {
    var target = $('.ghostSizing');
    if (currentSlideNum != undefined && resizingHost != undefined) {
        var host = AllSlides[currentSlideNum].content[resizingHost];
        host.top = target.getCss('top') + 5;
        host.left = target.getCss('left') + 5;
        host.width = target.getCss('width') - 10;
        host.height = target.getCss('height') - 10;
        host.content = $('#si' + (resizingHost + 1)).html();
        $('.oneComponent[data-siid=' + (resizingHost + 1) + '] p').html(host.content.length > 20 ? host.content.substring(0, 19) + '...' : host.content);
        renderSlide(AllSlides[currentSlideNum]);
        addToStack();
    }
}

function updateMultipleHost(deltaTop, deltaLeft) {
    for (var i = 0; i < multiSelectedItems.length; i++) {
        var host = AllSlides[currentSlideNum].content[multiSelectedItems[i]];
        host.top += deltaTop;
        host.left += deltaLeft;
//        host.width = target.getCss('width') - 10;
//        host.height = target.getCss('height') - 10;
//        host.content = $('#si' + (resizingHost + 1)).html();
    }
    renderSlide(AllSlides[currentSlideNum]);
}

function updateComponentList() {

}

function calculateGhostSize(items) {
    var gTop, gLeft, gWidth, gHeight;
    if (items.length > 0) {
        var firstEl = $('#si' + (items[0] + 1));
        gTop = firstEl.getCss('top');
        gLeft = firstEl.getCss('left');
        gWidth = firstEl.getCss('width') + firstEl.getCss('left') - gLeft;
        gHeight = firstEl.getCss('height') + firstEl.getCss('top') - gTop;
        for (var i = 0; i < items.length; i++) {
            var currentEl = $('#si' + (items[i] + 1));
            gTop = gTop > currentEl.getCss('top') ? currentEl.getCss('top') : gTop;
            gLeft = gLeft > currentEl.getCss('left') ? currentEl.getCss('left') : gLeft;
        }
        for (var i = 0; i < items.length; i++) {
            var currentEl = $('#si' + (items[i] + 1));
            gWidth = gWidth < currentEl.getCss('width') + currentEl.getCss('left') - gLeft ?
                currentEl.getCss('width') + currentEl.getCss('left') - gLeft :
                gWidth;
            gHeight = gHeight < currentEl.getCss('height') + currentEl.getCss('top') - gTop ?
                currentEl.getCss('height') + currentEl.getCss('top') - gTop :
                gHeight;
        }
    }
    return {gTop: gTop, gLeft: gLeft, gWidth: gWidth, gHeight: gHeight};
}

function updateMultipleHostResize(origPosition, position, origSize, size) {
    var factorW, factorH, ghostSize;

    factorW = size.width / origSize.width;
    factorH = size.height / origSize.height;
    ghostSize = calculateGhostSize(multiSelectedItems);

    if (origPosition.left == position.left
        &&
        origPosition.top == position.top) {

        for (var i = 0; i < multiSelectedItems.length; i++) {
            var host = AllSlides[currentSlideNum].content[multiSelectedItems[i]];
            host.width *= factorW;
            host.height *= factorH;
            if (host.left - ghostSize.gLeft > 0) {
                host.left = ghostSize.gLeft + (host.left - ghostSize.gLeft) * factorW;
            }
            if (host.top - ghostSize.gTop > 0) {
                host.top = ghostSize.gTop + (host.top - ghostSize.gTop) * factorH;
            }
        }
        renderSlide(AllSlides[currentSlideNum]);
        ghostSize = calculateGhostSize(multiSelectedItems);
        $('.ghostSizing')
            .css({
                top: ghostSize.gTop - 5,
                left: ghostSize.gLeft - 5,
                width: ghostSize.gWidth + 10,
                height: ghostSize.gHeight + 10
            });
    } else {

        for (var i = 0; i < multiSelectedItems.length; i++) {
            var host = AllSlides[currentSlideNum].content[multiSelectedItems[i]];
            var oldLeft = host.left;
            var oldTop = host.top;
            var oldWidth = host.width;
            var oldHeight = host.height;
            host.width *= factorW;
            host.height *= factorH;
            // 2 page calculation for universal situation #1 try.
            host.left = -( (origPosition.left + origSize.width - oldLeft - oldWidth) * factorW - position.left - size.width + host.width);
            host.top = -( (origPosition.top + origSize.height - oldTop - oldHeight) * factorH - position.top - size.height + host.height);
        }

        renderSlide(AllSlides[currentSlideNum]);
        ghostSize = calculateGhostSize(multiSelectedItems);
        $('.ghostSizing')
            .css({
                top: ghostSize.gTop - 5,
                left: ghostSize.gLeft - 5,
                width: ghostSize.gWidth + 10,
                height: ghostSize.gHeight + 10
            });
    }
}

jQuery.fn.extend({
    getCss: function (key) {
        switch (key) {
            case 'top':
                return parseInt(this.css('top').substring(0, this.css('top').length - 2));
            case 'left':
                return parseInt(this.css('left').substring(0, this.css('left').length - 2));
            case 'width':
                return parseInt(this.css('width').substring(0, this.css('width').length - 2));
            case 'height':
                return parseInt(this.css('height').substring(0, this.css('height').length - 2));
        }
    }
});
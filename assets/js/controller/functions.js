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
    $('.componentsList').append('<li class="oneComponent" data-siId="1">' +
        '<i class="text">T</i>' +
        '<p>Click to Edit</p>' +
        '</li>');
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
    $('.editText').attr('class', 'editText');
//    currentSlideContent = $("#slideContent").html();
    AllSlides[currentSlideNum] = {
        'domHtml': $("#slideContent").html(),
        'numOfBoxes': lastId
    };
    getScreenshotFor(currentSlideNum);
//    loadSlide(currentSlideNum);
}

function loadSlide(num) {
    saveCurrentSlide();
    currentSlideNum = num;
    clearCurrentSlide();
    $('#slideContent').html(AllSlides[num].domHtml);
    highlightCurrent();
    setTimeout(function () {
        for (var i = 1; i <= AllSlides[num].numOfBoxes; i++) {
            applyDraggable($('#et' + i));
        }
    }, 1000);
    lastId = AllSlides[num].numOfBoxes;
}

function newSlide(content, isFirstTime) {
    if (isFirstTime === true) {
        saveCurrentSlide();
    }
    var slide = new Slide(totalSlideNum);
    AllSlides.push(slide);
    currentSlideNum = totalSlideNum;
//    ++currentSlideNum;
    $('.slideWrap').append(
            '<div class="slidesThumbnail" id="stn' + ++totalSlideNum + '">\
                <div class="pageNumber">' + totalSlideNum + '</div>\
             </div>'
    );
    clearCurrentSlide();

    if (content) {
        setContent(content);
        setTimeout(function () {
            loadSlide(currentSlideNum);
        }, 1);
    }
    highlightCurrent();
    resortAllSlides();
}

function setContent(content) {
    $('.op-slideContainer').html(content);
}

function clearCurrentSlide() {
    $('.op-slideContainer').html('');
}

function highlightCurrent() {
    $('.slidesThumbnail').css("border", '4px solid #464646');
    $('#stn' + currentSlideNum).css('border', '4px solid rgba(0, 127, 122, 0.5)');
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
                updateHostSpec();
            }
        })
//        .resizable("destroy")
        .resizable({
            handles: 'ne, se, sw, nw, s, w, e, n',
            stop: function (event, ui) {
                updateHostSpec()
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
    var host = AllSlides[currentSlideNum].content[resizingHost];
    host.top = parseInt(target.css('top').substring(0, target.css('top').length - 2)) + 5;
    host.left = parseInt(target.css('left').substring(0, target.css('top').length - 2)) + 5;
    host.width = parseInt(target.css('width').substring(0, target.css('top').length - 2)) - 10;
    host.height = parseInt(target.css('height').substring(0, target.css('top').length - 2)) - 10;
    host.content = $('#si' + (resizingHost + 1)).html();
    renderSlide(AllSlides[currentSlideNum]);
}
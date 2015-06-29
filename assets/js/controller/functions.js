/**
 * Created by fanzhang on 6/10/15.
 */

// --- NotUsed ---
//function enableEdit(ev) {
//    ev.preventDefault();
////    console.log($(ev.target).closest('.editText'));
//    var target = $(ev.target).closest('.editText');
//    console.log(target);
//    if (!target.hasClass("cke_editable_inline")) {
//        CKEDITOR.disableAutoInline = true;
//        CKEDITOR.inline(target.attr('id'));
//        console.log(target.attr('id'));
//        currentEditId = target.attr('id');
//        $('#' + target.attr('id')).draggable("destroy");
//
//        CKEDITOR.instances[target.attr('id')].on('blur', function () {
//            console.log('onblur fired at ' + target.attr('id'));
//            setTimeout(function () {
//                $('#' + target.attr('id'))
//                    .draggable({
//                        containment: "parent"
//                    }).resizable("destroy")
//                    .resizable({
//                        handles: "se",
//                        containment: "parent"
//                    });
//            }, 100);
//
//        });
//    } else {
//        console.log(target.attr('id'));
//        $('#' + target.attr('id')).draggable("destroy");
//
//        CKEDITOR.instances[target.attr('id')].on('blur', function () {
//            console.log('onblur fired at ' + target.attr('id'));
//            setTimeout(function () {
//                $('#' + target.attr('id'))
//                    .draggable({
//                        containment: "parent"
//                    }).resizable("destroy")
//                    .resizable({
//                        handles: "se",
//                        containment: "parent"
//                    });
//            }, 100);
//        });
//    }
//}


function addTextField(e) {
    var tempET = new ETextObject(++lastId);
    etArray.push(tempET);
    $(".op-slideContainer").append(tempET.domE);
    $('#et' + tempET.id)
        .draggable({
            containment: "parent"
        })
        .resizable({
            handles: 'ne, se, sw, nw, s, w, e, n',
            containment: "parent"
        });
    if (e) {
        $('#et' + tempET.id).css({
            top: e.pageY - 80 + "px",
            left: e.pageX - 250 + "px"
        });
    }
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
            $('#et' + i)
                .draggable({
                    containment: "parent"
                })
                .resizable({
                    handles: 'ne, se, sw, nw, s, w, e, n',
                    containment: "parent"
                });
        }
    }, 1000);
    lastId = AllSlides[num].numOfBoxes;
}

function newSlide(content,isFirstTime) {
    if(isFirstTime===true){
        saveCurrentSlide();
    }
//    ++currentSlideNum;
    $('.slideWrap').append(
            '<div class="slidesThumbnail" id="stn' + ++totalSlideNum + '">\
                <div class="pageNumber">' + totalSlideNum + '</div>\
             </div>'
    );
    clearCurrentSlide();
    currentSlideNum = totalSlideNum;
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
    $('#stn'+index).remove();
//    AllSlides.splice(index,1);
//    totalSlideNum--;
    resortAllSlides();
}

function findIndexFromArray(slideNum) {
    for (var i = 0; i < AllSlides.length; i++) {
        if(slideNum==$(AllSlides[1].domHtml).attr('id').substring(2)){
            return i;
        }
    }
    return -1;
}

function changeTheme(id) {
    $('#customizedCss').remove();
    $('head').append('<link id="customizedCss" rel="stylesheet" href="themes/pt' + id + '.css" type="text/css" />');
}
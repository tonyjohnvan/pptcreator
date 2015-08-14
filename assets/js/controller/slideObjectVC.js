/**
 * Created by fanzhang on 7/9/15.
 */


//--- functions ---
function renderSlide(slide) {
    var slideContainer = $('#slideContent');
    slideContainer.html('');
    for (var i = 0; i < slide.content.length; i++) {
        var domItem = slide.content[i];
        if (!domItem.hidden) {
            var domEle = '<div class="slidItem" ' +
                'contenteditable="true" ' +
                'style="' +
                'top: ' + domItem.top + 'px; ' +
                'left: ' + domItem.left + 'px; ' +
                'width: ' + domItem.width + 'px; ' +
                'height: ' + domItem.height + 'px; ' +
//            'background: rgba(0, 50, 255, 0.2);' +
//            'font-size: ' + domItem.fontsize + 'px; ' +
                'text-align: ' + domItem.textAlign +
                ';" ' +
                'id="si' + domItem.id + '">' + domItem.content +
                '</div>';
            slideContainer.append(domEle);
        }
    }

    updateComponentList(slide);
}

function updateComponentList(slide) {
    var regex = /(<([^>]+)>)/ig;
    $('.componentsList').html('');
    slide.content.sort(function (a, b) {
        return parseFloat(a.zindex) - parseFloat(b.zindex);
    });
    for (var i = 0; i < slide.content.length; i++) {
        var obj = slide.content[i];
        var showContent = obj.content.replace(regex, "").length < 26  ?
            obj.content.replace(regex, "") :
            obj.content.replace(regex, "").substr(0, 22) + '...' + obj.content.replace(regex, "").substr(obj.content.replace(regex, "").length - 3, 3);
        if (!obj.hidden) {
            $('.componentsList').prepend('<li class="oneComponent" data-siId="' + obj.id + '">' +
                '<i class="text">T</i>' +
                '<p>' + showContent + '</p>' +
                '<a class="showHide" onclick="showHideItem(event)"><i class="glyphicon glyphicon-eye-open"></i></a>' +
                '</li>');
            $(".componentsList").sortable({
                stop: function (event, ui) {
//                    console.log($('.componentsList li').attr('data-siid'));
//                    updateSlideItemOrder();
                }
            }).disableSelection();
        } else {
            $('.componentsList').prepend('<li class="oneComponent" data-siId="' + obj.id + '">' +
                '<i class="text">T</i>' +
                '<p>' + showContent + '</p>' +
                '<a class="showHide" onclick="showHideItem(event)"><i class="glyphicon glyphicon-eye-close"></i></a>' +
                '</li>');
            $(".componentsList").sortable({
                stop: function (event, ui) {
//                    console.log($('.componentsList li').attr('data-siid'));
//                    updateSlideItemOrder();
                }
            }).disableSelection();
        }
    }
}

function updateSlideItemOrder() {
    var allItems = $('.componentsList li');
    var total = allItems.length;
    var highestZIndex = total;
    for (var i = 0; i < total; i++) {
        findSlideItem(parseInt($(allItems[0]).attr('data-siid'))).zindex = --highestZIndex;
    }
}

function findSlideItem(id) {
    var list = AllSlides[currentSlideNum].content;
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            return list[i];
        }
    }
    return null;
}


var SOModiStr = '\
<div class="container">\
<div class="row black-nav">\
    <ul class="nav navbar-nav col-xm-4">\
        <li class="">\
            <a href="#" onclick="{document.execCommand(\'bold\', false);}" class="dropdown-toggle" data-toggle="dropdown"\
            aria-expanded="false">\
                <i class="glyphicon glyphicon-bold"></i>\
            </a>\
        </li>\
        <li class="">\
            <a href="#" onclick="{document.execCommand(\'italic\', false);}" class="dropdown-toggle" data-toggle="dropdown"\
            aria-expanded="false">\
                <i class="glyphicon glyphicon-italic"></i>\
            </a>\
        </li>\
        <li class="">\
            <a href="#" onclick="{document.execCommand(\'justifyLeft\', false);}" class="dropdown-toggle" data-toggle="dropdown"\
            aria-expanded="false">\
                <i class="glyphicon glyphicon-align-left"></i>\
            </a>\
        </li>\
    </ul>\
    <ul class="nav navbar-nav col-xm-4">\
    <li class="">\
        <a href="#" onclick="{document.execCommand(\'justifyCenter\', false);}" class="dropdown-toggle" data-toggle="dropdown"\
        aria-expanded="false">\
            <i class="glyphicon glyphicon-align-center"></i>\
        </a>\
    </li>\
    <li class="">\
        <a href="#" onclick="{document.execCommand(\'justifyRight\', false);}" class="dropdown-toggle" data-toggle="dropdown"\
        aria-expanded="false">\
            <i class="glyphicon glyphicon-align-right"></i>\
        </a>\
    </li>\
    <li class="">\
        <a href="#" onclick="{document.execCommand(\'insertOrderedList\', false);}" class="dropdown-toggle" data-toggle="dropdown"\
        aria-expanded="false">\
            <i class="glyphicon glyphicon-th-list"></i>\
        </a>\
    </li>\
</ul>\
<ul class="nav navbar-nav col-xm-4">\
    <li class="">\
        <a href="#" onclick="{document.execCommand(\'insertUnorderedList\', false);}" class="dropdown-toggle" data-toggle="dropdown"\
        aria-expanded="false">\
            <i class="glyphicon glyphicon-list"></i>\
        </a>\
    </li>\
    <li class="">\
        <a href="#" onclick="{document.execCommand(\'indent\', false);}" class="dropdown-toggle" data-toggle="dropdown"\
        aria-expanded="false">\
            <i class="glyphicon glyphicon-indent-left"></i>\
        </a>\
    </li>\
    <li class="">\
        <a href="#" onclick="{document.execCommand(\'outdent\', false);}" class="dropdown-toggle" data-toggle="dropdown"\
        aria-expanded="false">\
            <i class="glyphicon glyphicon-indent-right"></i>\
        </a>\
    </li>\
    <li class="">\
        <div class="dropdown">\
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\
            FontSize\
                <span class="caret"></span>\
            </button>\
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">\
                <li><a href="#" onclick="{document.execCommand(\'fontSize\', false, 1);}">XXSmall</a></li>\
                <li><a href="#" onclick="{document.execCommand(\'fontSize\', false, 2);}">XSmall</a></li>\
                <li><a href="#" onclick="{document.execCommand(\'fontSize\', false, 3);}">Small</a></li>\
                <li><a href="#" onclick="{document.execCommand(\'fontSize\', false, 4);}">Normal</a></li>\
                <li><a href="#" onclick="{document.execCommand(\'fontSize\', false, 5);}">Large</a></li>\
                <li><a href="#" onclick="{document.execCommand(\'fontSize\', false, 6);}">XLarge</a></li>\
                <li><a href="#" onclick="{document.execCommand(\'fontSize\', false, 7);}">XXLarge</a></li>\
            </ul>\
        </div>\
    </li>\
</ul>\
</div>\
</div>\
    <div class="container inputWrap">\
        <div class="row">\
            <div id="directText" contenteditable="true"></div>\
        </div>\
    </div>';
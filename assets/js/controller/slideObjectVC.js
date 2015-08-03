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
    slide.content.sort(function(a, b) {
        return parseFloat(a.zindex) - parseFloat(b.zindex);
    });
    for (var i = 0; i < slide.content.length; i++) {
        var obj = slide.content[i];
        if (!obj.hidden) {
            $('.componentsList').prepend('<li class="oneComponent" data-siId="' + obj.id + '">' +
                '<i class="text">T</i>' +
                '<p>' + obj.content.replace(regex, "") + '</p>' +
                '<a class="showHide" onclick="showHideItem(event)"><i class="glyphicon glyphicon-eye-open"></i></a>' +
                '</li>');
            $(".componentsList").sortable({
                stop: function( event, ui ) {
//                    console.log($('.componentsList li').attr('data-siid'));
//                    updateSlideItemOrder();
                }
            }).disableSelection();
        } else {
            $('.componentsList').prepend('<li class="oneComponent" data-siId="' + obj.id + '">' +
                '<i class="text">T</i>' +
                '<p>' + obj.content.replace(regex, "") + '</p>' +
                '<a class="showHide" onclick="showHideItem(event)"><i class="glyphicon glyphicon-eye-close"></i></a>' +
                '</li>');
            $(".componentsList").sortable({
                stop: function( event, ui ) {
//                    console.log($('.componentsList li').attr('data-siid'));
//                    updateSlideItemOrder();
                }
            }).disableSelection();
        }
    }
}

function updateSlideItemOrder(){
    var allItems = $('.componentsList li');
    var total = allItems.length;
    var highestZIndex = total;
    for(var i=0; i<total; i++){
        findSlideItem(parseInt($(allItems[0]).attr('data-siid'))).zindex = --highestZIndex;
    }
}

function findSlideItem(id){
    var list = AllSlides[currentSlideNum].content;
    for(var i=0; i<list.length; i++){
        if(list[i].id==id){
            return list[i];
        }
    }
    return null;
}
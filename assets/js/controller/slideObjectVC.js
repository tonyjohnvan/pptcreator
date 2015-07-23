/**
 * Created by fanzhang on 7/9/15.
 */


//--- functions ---

function renderSlide(slide) {
    var slideContainer = $('#slideContent');
    slideContainer.html('');
    for (var i = 0; i < slide.content.length; i++) {
        var domItem = slide.content[i];
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

    updateComponentList(slide);
}

function updateComponentList(slide) {
    $('.componentsList').html('');
    for (var i = 0; i < slide.content.length; i++) {
        var obj = slide.content[i];
        $('.componentsList').append('<li class="oneComponent" data-siId="' + obj.id + '">' +
            '<i class="text">T</i>' +
            '<p>' + obj.content + '</p>' +
            '</li>');
        $(".componentsList").sortable().disableSelection();
    }
}
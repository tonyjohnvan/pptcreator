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
            'background: rgba(0, 50, 255, 0.2);' +
            'text-align: ' + domItem.textAlign +
            ';" ' +
            'id="si' + domItem.id + '">' + domItem.content +
            '</div>';
        slideContainer.append(domEle);
    }
}

//function newSlide(){
//}
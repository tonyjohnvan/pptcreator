/**
 * Created by fanzhang on 7/16/15.
 */
var undoStack, EditCommand, startValue;
var undoStkId = 0;

$(function () {
    undoStack = new Undo.Stack();
    EditCommand = Undo.Command.extend({
        constructor: function (oldValue, newValue) {
            this.oldValue = oldValue;
            this.newValue = newValue;
        },
        execute: function () {
        },
        undo: function () {
            updateSlideItem(this.oldValue);
        },

        redo: function () {
            updateSlideItem(this.newValue);
        }
    });
    undoStack.changed = function () {
        stackUI();
    };

    var undo = $(".undo"),
        redo = $(".redo"),
        dirty = $(".dirty");

    function stackUI() {
        undo.attr("disabled", !undoStack.canUndo());
        redo.attr("disabled", !undoStack.canRedo());
//        dirty.toggle(undoStack.dirty());
    }

//    startValue = $.extend(true, {}, AllSlides[currentSlideNum]);

    stackUI();
});

function OPStackObj(targetId, innerHTML, width, height, left, top) {
    this.id = undoStkId;
    this.targetId = targetId;
    this.innerHTML = innerHTML;
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
}

function updateSlideItem(opsObj) {
//    if (opsObj.targetId != undefined) {
//        var host = AllSlides[currentSlideNum].content[opsObj.targetId];
//        host.top = opsObj.top;
//        host.left = opsObj.left;
//        host.width = opsObj.width;
//        host.height = opsObj.height;
//        host.content = opsObj.innerHTML;
////        $('.oneComponent[data-siid=' + (opsObj.targetId + 1) + '] p').html(host.content.length > 20 ? host.content.substring(0, 19) + '...' : host.content);
//
//        $('.ghostSizing')
//            .css({
//                top: host.top - 5,
//                left: host.left - 5,
//                width: host.width + 10,
//                height: host.height + 10
//            });
//    }

    renderSlide(opsObj);
}

//function addToStack() {
//    var host = AllSlides[currentSlideNum].content[resizingHost];
//    var newValue = new OPStackObj(resizingHost, host.content, host.width, host.height, host.left, host.top);
//    if (newValue != startValue) {
//        undoStack.execute(new EditCommand(startValue, newValue));
//        startValue = newValue
//    }
//}
function addToStack() {
//    var host = AllSlides[currentSlideNum].content[resizingHost];
//    var newValue = $.extend(true, {}, AllSlides[currentSlideNum]);
    var newValue = JSON.parse(JSON.stringify(AllSlides[currentSlideNum]));
    var newValueContent = JSON.stringify(newValue.content);
    var startValueContent = JSON.stringify(startValue.content);
    if (newValueContent != startValueContent) {
        undoStack.execute(new EditCommand(startValue, newValue));
        startValue = newValue
    }
}
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
            handles: "se",
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
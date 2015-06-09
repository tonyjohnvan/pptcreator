/**
 * Created by fanzhang on 6/8/15.
 */

var lastId = 0;
var etArray = [];


function addTextField() {
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
}

function enableEdit(ev) {
    ev.preventDefault();
//    console.log($(ev.target).closest('.editText'));
    var target = $(ev.target).closest('.editText');
    console.log(target);
    if (!target.hasClass("cke_editable_inline")) {
        CKEDITOR.disableAutoInline = true;
        CKEDITOR.inline(target.attr('id'));
        console.log(target.attr('id'));
        currentEditId = target.attr('id');
        $('#' + target.attr('id')).draggable("destroy");

        CKEDITOR.instances[target.attr('id')].on('blur', function () {
            console.log('onblur fired at ' + target.attr('id'));
            setTimeout(function () {
                $('#' + target.attr('id'))
                    .draggable({
                        containment: "parent"
                    }).resizable("destroy")
                    .resizable({
                        handles: "se",
                        containment: "parent"
                    });
            }, 100);

        });
    } else {
        console.log(target.attr('id'));
        $('#' + target.attr('id')).draggable("destroy");

        CKEDITOR.instances[target.attr('id')].on('blur', function () {
            console.log('onblur fired at ' + target.attr('id'));
            setTimeout(function () {
                $('#' + target.attr('id'))
                    .draggable({
                        containment: "parent"
                    }).resizable("destroy")
                    .resizable({
                        handles: "se",
                        containment: "parent"
                    });
            }, 100);
        });
    }
}


$(document).ready(function () {
    "use strict";
    $(".op-slideContainer").delegate('.editText', 'click', function (ev) {
        ev.preventDefault();
//    console.log($(ev.target).closest('.editText'));
        var target = $(ev.target).closest('.editText');
        console.log(target);
        if (!target.hasClass("cke_editable_inline")) {
            CKEDITOR.disableAutoInline = true;
            CKEDITOR.inline(target.attr('id'));
            console.log(target.attr('id'));
            $('#' + target.attr('id')).draggable("destroy");
            CKEDITOR.instances[target.attr('id')].on('blur', function () {
                console.log('onblur fired at ' + target.attr('id'));
                setTimeout(function () {
                    $('#' + target.attr('id'))
                        .draggable({
                            containment: "parent"
                        }).resizable("destroy")
                        .resizable({
                            handles: "se",
                            containment: "parent"
                        });
                }, 100);

            });
        } else {
            console.log(target.attr('id'));
            $('#' + target.attr('id')).draggable("destroy");
            CKEDITOR.instances[target.attr('id')].on('blur', function () {
                console.log('onblur fired at ' + target.attr('id'));
                setTimeout(function () {
                    $('#' + target.attr('id'))
                        .draggable({
                            containment: "parent"
                        }).resizable("destroy")
                        .resizable({
                            handles: "se",
                            containment: "parent"
                        });
                }, 100);
            });
        }
    })
        .delegate('.editText', 'keydown', function (e) {
//            console.log(e.target);
            var target = $(e.target);
            $('#' + target.attr('id')).resizable("destroy")
                .resizable({
                    handles: "se",
                    containment: "parent"
                });
        })
});


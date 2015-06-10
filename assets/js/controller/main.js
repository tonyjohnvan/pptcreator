/**
 * Created by fanzhang on 6/8/15.
 */

var lastId = 0;
var etArray = [];


$(document).ready(function () {
    "use strict";

    // MAKE EVENT on every new text box
    $(".op-slideContainer").delegate('.editText', 'click', function (ev) {
        ev.preventDefault();
        var target = $(ev.target).closest('.editText');
        updatePropertyPanel(target.attr('id'));
        //console.log(target);
        if (!target.hasClass("cke_editable_inline")) {
            CKEDITOR.disableAutoInline = true;
            CKEDITOR.inline(target.attr('id'));
        }

        if (target.hasClass("ui-draggable")) {
            $('#' + target.attr('id')).draggable("destroy");
        }
        CKEDITOR.instances[target.attr('id')].on('blur', function () {
            //console.log('onblur fired at ' + target.attr('id'));
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
            updatePropertyPanel();
        });

    }).delegate('.editText', 'keydown', function (e) {
        var target = $(e.target);
        $('#' + target.attr('id')).resizable("destroy")
            .resizable({
                handles: "se",
                containment: "parent"
            });
    }).delegate('.editText', 'drag', function (ev) {
        var target = $(ev.target).closest('.editText');
        updatePropertyPanel(target.attr('id'));
    }).delegate('.editText', 'resize', function (ev) {
        var target = $(ev.target).closest('.editText');
        updatePropertyPanel(target.attr('id'));
    });


    // MAKE THE floating panel floating...
    $(".floating-panel").draggable({containment: "parent"});


    // MAKE THE Customized right click...
    $(document).bind("contextmenu", function (event) {
        event.preventDefault();
        // Show contextmenu
        $(".custom-right-menu").finish().toggle(100).
            // In the right position (the mouse)
            css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });
    }).bind("mousedown", function (e) {
        // If the clicked element is not the menu
        if (!$(e.target).parents(".custom-right-menu").length > 0) {
            // Hide it
            $(".custom-right-menu").hide(100);
        }
    });
    // If the menu element is clicked
    $(".custom-right-menu li").click(function (e) {
        // This is the triggered action name
        switch ($(this).attr("data-action")) {
            // A case for each action. Your actions here
            case "newElement":
            {
                // Hide it AFTER the action was triggered
                $(".custom-right-menu").hide(100);
            }
                break;
            case "deleteElement":
            {
                if (!$(this).hasClass('disabled')) {
                    console.log($(this).attr("data-action"));
                    // Hide it AFTER the action was triggered
                    $(".custom-right-menu").hide(100);
                }
            }
                break;
            case "newSlide":
            {
                console.log($(this).attr("data-action"));
                // Hide it AFTER the action was triggered
                $(".custom-right-menu").hide(100);
            }
                break;
            case "deleteSlide":
            {
                console.log($(this).attr("data-action"));
                // Hide it AFTER the action was triggered
                $(".custom-right-menu").hide(100);
            }
                break;
            default :
            {

            }
                break;
        }
    });
});



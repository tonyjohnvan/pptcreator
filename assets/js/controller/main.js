/**
 * Created by fanzhang on 6/8/15.
 */

var lastId = 0;
var etArray = [];

var currentItem;
var currentSlideNum = 0;

var currentSlideContent = "";

var totalSlideNum = 0;

var AllSlides = [];

var rightClickSlide = "";

var toggleGridSnapFlag = false;

var itemSelected = false;

var lastSelectedItem = null;

$(document).ready(function () {
    "use strict";

    CKEDITOR.disableAutoInline = true;
    highlightCurrent();

    $('.op-slideContainer').click(function (e) {
        console.log(e.target);
        if (itemSelected && $(e.target).hasClass('op-slideContainer')) {
            deselectCurrentEl();
        }
    });

    // MAKE EVENT on every new text box
    $(".op-slideContainer").delegate('.editText', 'click', function (ev) {
        //click to select div
        var target = $(ev.target).closest('.editText');

        if (!itemSelected) {
            selectCurrentEl(target);
        } else {
            if (lastSelectedItem.attr('id') == target.attr('id')) {
                if (target.hasClass("ui-draggable")) {
                    $('#' + target.attr('id')).draggable("destroy");
                }
                if (!target.hasClass("cke_editable_inline")) {
                    CKEDITOR.inline(target.attr('id'));
                    target.focus();
                } else {
                    target.focus();
                }
                CKEDITOR.instances[target.attr('id')].on('blur', function () {
                    applyDraggable($('#' + target.attr('id')));
                    deselectCurrentEl();
                });
            } else {
                deselectCurrentEl(lastSelectedItem);
//                deselectCurrentEl();
//                selectCurrentEl(target);

            }

        }


    }).delegate('.editText', 'keydown', function (e) {
        var key = (e.keyCode ? e.keyCode : e.which);
        console.log(key);
        if (key == 65) {
            e.preventDefault();
            deselectCurrentEl(lastSelectedItem);
        }

        var target = $(e.target);
        $('#' + target.attr('id'))
            .resizable("destroy");
        setTimeout(function () {
            $('#' + target.attr('id'))
                .resizable({
                    handles: 'ne, se, sw, nw, s, w, e, n'
//                    grid: [ 10, 10 ],
                    //containment: "parent"
                });
        }, 1);
    }).delegate('.editText', 'drag', function (ev) {
        var target = $(ev.target).closest('.editText');
        settingCurrentItem(target);

        deselectCurrentEl();
        selectCurrentEl(target);

        updatePropertyPanel(target.attr('id'));

        updateShadowBorder($(ev.target).offset().top, $(ev.target).offset().left, $(ev.target).width(), $(ev.target).height());

    }).delegate('.editText', 'dragend', function (ev) {
//        settingCurrentItem();
//        updatePropertyPanel();
        selectCurrentEl(target);
    }).delegate('.editText', 'resize', function (ev) {
        var target = $(ev.target).closest('.editText');
        settingCurrentItem(target);
        updatePropertyPanel(target.attr('id'));
    }).delegate('.editText', 'blur', function (ev) {
        var target = $(ev.target).closest('.editText');
        setTimeout(function () {
//            settingCurrentItem();
//            updatePropertyPanel();
            deselectCurrentEl();
        }, 100);
    });


    // MAKE THE floating panel floating...
    $(".floating-panel").draggable({containment: "parent"});


    // MAKE THE Customized right click...
    $(document).bind("contextmenu", function (event) {
        event.preventDefault();
        var target = $(event.target).closest('.editText');
//        console.log(target);
        if (target.hasClass("editText")) {
            settingCurrentItem(target);
            updatePropertyPanel(target.attr('id'));
        } else {
//            settingCurrentItem();
//            updatePropertyPanel();
        }
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

    $('.slideWrap').delegate('.slidesThumbnail', 'click', function (e) {
        //console.log($(e.target).closest('.slidesThumbnail').attr('id').substr(3));
        var clickedNum = parseInt($(e.target).closest('.slidesThumbnail').attr('id').substr(3));
        loadSlide(clickedNum);
    }).delegate('.slidesThumbnail', 'mousedown', function (e) {
        rightClickSlide = parseInt($(e.target).closest('.slidesThumbnail').attr('id').substr(3));
        if (e.which === 3) {
            console.log(rightClickSlide);
        }
    });

    $('.presentationsWrap').delegate('.PresentationItemTitle', 'keypress', function (event) {
        var key = (event.keyCode ? event.keyCode : event.which);
        console.log(key);
        if (key == 13) {
            event.preventDefault();
            $(this).blur();
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
//                console.log(currentItem.attr('id'));
                if (!$(this).hasClass('disabled')) {
                    $('#' + currentItem.attr('id')).remove();
                    // Hide it AFTER the action was triggered
                    $(".custom-right-menu").hide(100);
                }
            }
                break;
            case "newSlide":
            {
//                console.log($(this).attr("data-action"));
                newSlide();
                // Hide it AFTER the action was triggered
                $(".custom-right-menu").hide(100);
            }
                break;
            case "deleteSlide":
            {
                deleteSlide(rightClickSlide);
//                console.log($(this).attr("data-action"));
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


    $('#themeCard1').on('click', function () {
        newSlide(themeCard1Content);
        lastId = 3;
    });
    $('#themeCard2').on('click', function () {
        newSlide(themeCard2Content);
        lastId = 3;
    });
    $('#themeCard3').on('click', function () {
        newSlide(themeCard3Content);
        lastId = 2;
    });
    $('#themeCard4').on('click', function () {
        newSlide(themeCard4Content);
        lastId = 3;
    });

//    $("#slider1").slider();
//    $("#slider2").slider();
//    $("#slider3").slider();


    $('#themeStyle1').on('click', function () {
        changeTheme(1);
    });
    $('#themeStyle2').on('click', function () {
        changeTheme(2);
    });
    $('#themeStyle3').on('click', function () {
        changeTheme(3);
    });
    $('#themeStyle4').on('click', function () {
        changeTheme(4);
    });
});



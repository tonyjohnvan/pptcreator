/**
 * Created by fanzhang on 6/23/15.
 */

var presentationRatio = 0;
var presentationName = "";
var newPresentationTheme = "";

function bringUpNewPresentationPanel() {
    $('.newPresentationWindowWrap').show().addClass('animated fadeIn');
    $('#selectThemePanel').show().addClass('animated fadeIn');
}

function createThemeStandard() {
    $('.tabButtonWrap.right').removeClass('active');
    $('.tabButtonWrap.left').addClass('active');
    presentationRatio = 1;
    $('#wideWrap').hide();
    $('#standardWrap').show();
}

function createThemeWide() {
    $('.tabButtonWrap.left').removeClass('active');
    $('.tabButtonWrap.right').addClass('active');
    presentationRatio = 2;
    $('#wideWrap').show();
    $('#standardWrap').hide();
}

function createNewPresentation(e) {
    newPresentationTheme = $(e.target).attr('id').substring(2);
    $('#selectThemePanel').removeClass('animated fadeIn').addClass('animated fadeOutLeftBig');
    setTimeout(function () {
        $('#selectThemePanel').hide().removeClass('animated fadeOutLeftBig');
    }, 1000);
    $('#fileNamePanel').show().addClass('animated fadeInRight');
}

function NewPresentationNameBack() {
    $('#selectThemePanel').show().addClass('animated fadeInLeft');
    $('#fileNamePanel').removeClass('animated fadeInRight').addClass('animated fadeOutRightBig');
    setTimeout(function () {
        $('#fileNamePanel').hide().removeClass('animated fadeOutRightBig');
    }, 1000);
}

function FinishCreatingNewPresentation() {
    presentationName = $('#newPresentationNameInput').val() || "Presentation";
    $('#fileNamePanel').addClass('animated fadeOut');
    setTimeout(function () {
        $('#fileNamePanel').hide().removeClass('animated fadeOut');
    }, 1000);
    $('.loadingIndicator').show(400);

    setTimeout(function () {
        $('.loadingIndicator').hide(400);
        $('.newPresentationWindowWrap').removeClass('animated fadeIn').addClass('animated fadeOut');
        $('.newPresentationWindow').addClass('animated fadeOutDownBig');
    }, 3000);
    setTimeout(function () {
        $('.newPresentationWindowWrap').hide().removeClass('animated fadeOut');
        $('.newPresentationWindow').hide().removeClass('animated fadeOutDownBig');

        $('.slideWrap').sortable({placeholder: "ui-state-highlight"}).disableSelection();
    }, 4000);

    initializePresentation();
}

function initializePresentation() {
    // initialize the presentation with associated style and firstpage
    // -- first page init
    newSlide(themeCard1Content,true);
    lastId = 3;

    $('.slideWrap').sortable({
        placeholder: "ui-state-highlight",
        update: function (event, ui) {
            resortAllSlides();
        }
    })
        .disableSelection();

    // -- associate CSS to existing page
    $('head').append('<link id="customizedCss" rel="stylesheet" href="themes/pt' + newPresentationTheme + '.css" type="text/css" />');
}

function resortAllSlides() {
    var slidsList = $('.slideWrap').children();
    for (var i = 0; i < slidsList.length; i++) {
//        $($('.slideWrap').children()[i]).attr('id', 'stn' + (i + 1));
        $($('.slideWrap').children()[i]).children('.pageNumber').html(i + 1);
//        $($('.slideWrap').children()[i]).children('canvas').attr('id', 'tbn' + (i + 1));
    }
}

function searchPresentations(event) {
    var key = (event.keyCode ? event.keyCode : event.which);
    console.log(key);
    // TODO:front end search logic

    if (key == 13) {
        event.preventDefault();
        $(event.target).blur();

        // TODO:server search logic
    }
}
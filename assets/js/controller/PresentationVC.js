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
    setTimeout(function(){
        $('#selectThemePanel').hide().removeClass('animated fadeOutLeftBig');
    },1000);
    $('#fileNamePanel').show().addClass('animated fadeInRight');
}

function NewPresentationNameBack(){
    $('#selectThemePanel').show().addClass('animated fadeInLeft');
    $('#fileNamePanel').removeClass('animated fadeInRight').addClass('animated fadeOutRightBig');
    setTimeout(function(){
        $('#fileNamePanel').hide().removeClass('animated fadeOutRightBig');
    },1000);
}

function FinishCreatingNewPresentation() {
    presentationName = $('#newPresentationNameInput').val() || "Presentation";
    $('#fileNamePanel').addClass('animated fadeOut');
    setTimeout(function() {
        $('#fileNamePanel').hide().removeClass('animated fadeOut');
    },1000);
    $('.loadingIndicator').show(400);

    setTimeout(function(){
        $('.loadingIndicator').hide(400);
        $('.newPresentationWindowWrap').removeClass('animated fadeIn').addClass('animated fadeOut');
        $('.newPresentationWindow').addClass('animated fadeOutDownBig');
    },3000);
    setTimeout(function(){
        $('.newPresentationWindowWrap').hide().removeClass('animated fadeOut');
        $('.newPresentationWindow').hide().removeClass('animated fadeOutDownBig');
    },4000);
}
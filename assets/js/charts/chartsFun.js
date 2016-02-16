/**
 * Created by fanzhang on 1/5/16.
 */

// http://52.23.227.64:8080/nwo/chartrender/getdatasources

function addChartIntoSlide(chart, data) {
    switch (chart) {
        case 'cid-08':
            jumpToExternal('10004');
            break;
        case 'cid-05':
            jumpToExternal('10011');
            break;
        case 'cid-06':
            jumpToExternal('10016');
            break;
        case 'cid-37':
            jumpToExternal('10018');
            break;
        case 'cid-38':
            jumpToExternal('10017');
            break;
        case 'cid-39':
            jumpToExternal('10003');
            break;
    }

}

function jumpToExternal(id) {
    bootbox.dialog({
        title: "Work on external editor.",
        message: "<p> the system has navigate you to external editor of chart editing, after finishing working there, please choose save and view image from that editor and copy the image address from your browser, comeback and paste it here.</p>" +
            "<input id='externalImageURL' type='text' placeholder='http://52.3.202.244:8080/osmps/" + id + ".png'/>" +
            "<h5 class='text-center'>If this not happen automatically, please use the navigate button blew to go-to the external editor</h5>" +
            "<div class='externalEditorWrap'><a class='text-center' href='http://52.3.202.244/charts/" + id + "/edit' target='_blank' ><button class='btn btn-success'>External Editor</button></a></div>",
        buttons: {
            insert: {
                label: "Insert Chart",
                className: "btn-primary",
                callback: function () {
                    var urlTarget = $('#externalImageURL');
                    var url = !urlTarget.val() ? urlTarget.attr('placeholder') : urlTarget.val();
                    insertChartImage(url, id);
                }
            },
            cancel: {
                label: "Cancel",
                className: "btn-default"
            }
        }
    });
}

function insertChartImage(url, cid) {
    var factor = 0.8;
    $("<img/>", {
        load: function () {
            var width = this.width * factor;
            var height = this.height * factor;

            var cob = new ChartObj(++lastId, url, cid, width, height);
            AllSlides[currentSlideNum].content.push(cob);
            renderSlide(AllSlides[currentSlideNum]);
            $('.bootbox.modal').hide();
            $('.modal-backdrop').hide();
        },
        src: url
    });
}
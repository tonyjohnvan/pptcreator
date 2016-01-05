/**
 * Created by fanzhang on 1/5/16.
 */
function addChartIntoSlide(chart,data){
    switch(chart){
        case 'cid-01':{
            var cob = new ChartObj(++lastId,data);

            AllSlides[currentSlideNum].content.push(cob);

            renderSlide(AllSlides[currentSlideNum]);
        } break;
        case 'cid-02':{

        } break;
        case 'cid-03':{

        } break;
    }

}
/**
 * Created by fanzhang on 6/9/15.
 */

function ETextObject(itemId) {
    this.domE = '<div class="editText" ' +
//        'rows="5" cols="20" ' +
//        'onclick="enableEdit(event)" ' +
        'contenteditable="true" ' +
        'id="et' + itemId +
        '"><p>Click to Edit</p></div>';
    this.id = itemId;
}


var themeCard1Content =
    '<div class="editText" ' +
        'contenteditable="true" ' +
        'style="top: 300px; left: 217px; width: 682px; height: 138px; text-align: center;" ' +
        'id="et1' +
        '"><h1><span style="font-size: 90px;">Click to Edit</span></h1>' +
    '</div>'
    +
    '<div class="editText" ' +
        'contenteditable="true" ' +
        'style="top: 440px; left: 272px; width: 583px; height: 108px; text-align: center;" ' +
        'id="et2' +
    '"><h2><span style="font-size: 40px;">Click to Edit</span></h2>' +
    '</div>'
    ;

var themeCard2Content =
    '<div class="editText" ' +
        'contenteditable="true" ' +
        'style="top: 76px; left: 93px; width: 962px; height: 132px;font-size: 100px;text-align: center;" ' +
        'id="et1' +
        '"><h1><span style="font-size: 100px;">Click to Edit</span></h1>' +
    '</div>'
    +
    '<div class="editText" ' +
        'contenteditable="true" ' +
        'style="top: 225px; left: 93px; width: 962px; height: 540px;font-size: 30px;text-align: left;" ' +
        'id="et2' +
    '"><ul><li><span style="font-size: 30px;">Click to Edit</span></li></ul>' +
    '</div>'
    ;

var themeCard3Content =
    '<div class="editText" ' +
        'contenteditable="true" ' +
        'style="top: 362px; left: 120px; width: 918px; height: 195px; font-size: 120px; text-align: center;" ' +
        'id="et1' +
        '"><h1><span style="font-size: 120px;">Click to Edit</span></h1>' +
    '</div>'
    ;

var themeCard4Content =
    '<div class="editText" ' +
        'contenteditable="true" ' +
        'style="top: 445px; left: 172px; width: 787px; height: 68px;font-size: 50px;text-align: center;" ' +
        'id="et1' +
        '"><h3><span style="font-size: 50px;">"Type a Quote here"</span></h3>' +
    '</div>'
    +
    '<div class="editText" ' +
        'contenteditable="true" ' +
        'style="top: 551px; left: 304px; height: 55px; width: 653px;font-size: 30px;text-align: center;" ' +
        'id="et2' +
    '"><h4><span style="font-size: 30px;">—— John Don</span></h4>' +
    '</div>'
    ;
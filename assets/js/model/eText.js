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


//var themeCard1Content =
//    '<div class="editText" ' +
//        'contenteditable="true" ' +
//        'style="top: 300px; left: 217px; width: 682px; height: 138px; text-align: center;" ' +
//        'id="et1' +
//        '"><h1><span style="font-size: 90px;">Click to Edit</span></h1>' +
//    '</div>'
//    +
//    '<div class="editText" ' +
//        'contenteditable="true" ' +
//        'style="top: 440px; left: 272px; width: 583px; height: 108px; text-align: center;" ' +
//        'id="et2' +
//    '"><h2><span style="font-size: 40px;">Click to Edit</span></h2>' +
//    '</div>'
//    ;
//
//var themeCard2Content =
//    '<div class="editText" ' +
//        'contenteditable="true" ' +
//        'style="top: 76px; left: 93px; width: 962px; height: 132px;font-size: 100px;text-align: center;" ' +
//        'id="et1' +
//        '"><h1><span style="font-size: 100px;">Click to Edit</span></h1>' +
//    '</div>'
//    +
//    '<div class="editText" ' +
//        'contenteditable="true" ' +
//        'style="top: 225px; left: 93px; width: 962px; height: 540px;font-size: 30px;text-align: left;" ' +
//        'id="et2' +
//    '"><ul><li><span style="font-size: 30px;">Click to Edit</span></li></ul>' +
//    '</div>'
//    ;
//
//var themeCard3Content =
//    '<div class="editText" ' +
//        'contenteditable="true" ' +
//        'style="top: 362px; left: 120px; width: 918px; height: 195px; font-size: 120px; text-align: center;" ' +
//        'id="et1' +
//        '"><h1><span style="font-size: 120px;">Click to Edit</span></h1>' +
//    '</div>'
//    ;
//
//var themeCard4Content =
//    '<div class="editText" ' +
//        'contenteditable="true" ' +
//        'style="top: 445px; left: 172px; width: 787px; height: 68px;font-size: 50px;text-align: center;" ' +
//        'id="et1' +
//        '"><h3><span style="font-size: 50px;">"Type a Quote here"</span></h3>' +
//    '</div>'
//    +
//    '<div class="editText" ' +
//        'contenteditable="true" ' +
//        'style="top: 551px; left: 304px; height: 55px; width: 653px;font-size: 30px;text-align: center;" ' +
//        'id="et2' +
//    '"><h4><span style="font-size: 30px;">—— John Don</span></h4>' +
//    '</div>'
//    ;

var themeCard1Content = JSON.parse('{"id":0,"content":[{"id":1,"content":"Double Click to Edit","top":301,"left":173,"width":808,"height":135,"centerX":50,"centerY":25,"zindex":100,"background":"transparent","textAlign":"center"},{"id":2,"content":"Double Click to Edit","top":457,"left":266,"width":622,"height":115,"centerX":50,"centerY":25,"zindex":100,"background":"transparent","textAlign":"center"}]}');
var themeCard2Content = JSON.parse('{"id":0,"content":[{"id":1,"content":"Double Click to Edit","top":55,"left":70,"width":1014,"height":143,"centerX":50,"centerY":25,"zindex":100,"background":"transparent","textAlign":"center"},{"id":2,"content":"Double Click to Edit","top":205,"left":70,"width":1010,"height":608,"centerX":50,"centerY":25,"zindex":100,"background":"transparent","textAlign":"center"}]}');
var themeCard3Content = JSON.parse('{"id":0,"content":[{"id":1,"content":"Double Click to Edit","top":341,"left":222,"width":706,"height":188,"centerX":50,"centerY":25,"zindex":100,"background":"transparent","textAlign":"center"}]}');
var themeCard4Content = JSON.parse('{"id":0,"content":[{"id":1,"content":"Double Click to Edit","top":442,"left":222,"width":706,"height":83,"centerX":50,"centerY":25,"zindex":100,"background":"transparent","textAlign":"center"},{"id":2,"content":"Double Click to Edit","top":547,"left":326,"width":499,"height":76,"centerX":50,"centerY":25,"zindex":100,"background":"transparent","textAlign":"center"}]}');
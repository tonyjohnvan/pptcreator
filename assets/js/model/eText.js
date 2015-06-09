/**
 * Created by fanzhang on 6/9/15.
 */

function ETextObject(itemId) {
    this.domE = '<div class="editText" ' +
//        'rows="5" cols="20" ' +
//        'onclick="enableEdit(event)" ' +
        'contenteditable="true" ' +
        'id="et' + itemId +
        '"></div>';
    this.id = itemId;
}

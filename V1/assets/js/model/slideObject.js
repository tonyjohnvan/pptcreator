/**
 * Created by fanzhang on 7/9/15.
 */

function SlideObj(itemId) {
    this.id = itemId;
    this.content = "";
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.centerX = (this.x + this.width) / 2;
    this.centerY = (this.y + this.height) / 2;
    this.zindex = 100;
    this.background = 'transparent'
}

function Slide(slidId) {
    this.id = slidId;
    this.content = [];
}

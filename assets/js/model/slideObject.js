/**
 * Created by fanzhang on 7/9/15.
 */

function SlideObj(itemId) {
    this.id = itemId;
    this.content = "Double Click to Edit";
    this.top = 0;
    this.left = 0;
    this.width = 100;
    this.height = 50;
    this.centerX = (this.top + this.width) / 2;
    this.centerY = (this.left + this.height) / 2;
    this.zindex = 100;
    this.background = 'transparent';
    this.textAlign = 'center';
    this.fontsize = 16;
    this.hidden = false;
}

function Slide(slidId) {
    this.id = slidId;
    this.content = [];
}


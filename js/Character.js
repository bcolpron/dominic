function Character(x, y, class_) {
    this.sprites = $('<div class="character"/>');
    $("body").append(this.sprites);

    this.setClass(class_);
    this.setPosition(x,y);
    this.setDirection(0);
}

Character.prototype.setClass = function(class_) {
    this.class_ = class_;
    var html = '<img class="sprite" src="images/' + this.class_ + '.gif" style="">\
        <img class="sprite" src="images/' + this.class_ + '-up.gif" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-left.gif" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-right.gif" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-ani.gif" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-aniup.gif" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-anileft.gif" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-aniright.gif" style="display: none">';
    this.sprites.html(html);
}

Character.prototype.DOWN  = 0;
Character.prototype.UP    = 1;
Character.prototype.LEFT  = 2;
Character.prototype.RIGHT = 3;
Character.prototype.ANIM  = 4;

Character.prototype.getPosition = function() {
    return {x: this.position.x, y: this.position.y};
}

Character.prototype.setPosition = function(x,y) {
    if  (typeof x === "object") {
        y = x.y;
        x = x.x;
    }

    this.position = {x:x, y:y};
    
    var left = this.position.x * 96;
    var top = this.position.y * 96;

    this.sprites.each(function(i,e){
        e.style.left = left;
        e.style.top = top;
    });

};

Character.prototype.setDirection = function(direction) {
    this.direction = direction;
    this.sprites.find(".sprite").hide().eq(direction).show();
}

Character.prototype.moveLeft = function() {
    this.setDirection(this.LEFT | this.ANIM);
};

Character.prototype.moveUp = function() {
    this.setDirection(this.UP | this.ANIM);
};

Character.prototype.moveRight = function() {
    this.setDirection(this.RIGHT | this.ANIM);
};

Character.prototype.moveDown = function() {
    this.setDirection(this.DOWN | this.ANIM);
};

Character.prototype.setMoving = function() {
    this.setDirection(this.direction | this.ANIM);
};

Character.prototype.stopMoving = function() {
    this.setDirection(this.direction & 0x3);
};

Character.prototype.remove = function() {
    this.sprites.remove();
    this.sprites = null;
}

function Window(column, y) {

    this.column = column;
    
    this.x = this.column.x + this.column.width / 3;
    this.y = y;
    this.width = this.column.width / 3;
    this.height = cHeight * 0.1;

    this.fire = new Fire(this);

    this.show = function() {
        fill("black");
        rect(this.x, this.y, this.width, this.height);
        this.fire.show();
    }
}
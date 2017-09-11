class Drag {

    constructor(_node) {
        this.handle;
        this.startX;
        this.startY;
        this.dragClickOffsetX;
        this.dragClickOffsetY;
        this.lastDragX;
        this.lastDragY;
        this.node = _node;
        this.init()
    }
    init(){
        this.node.draggable = true;
        this.addListeners();
    }

    addListeners() {
        this.node.addEventListener('dragstart', this.onDragStart.bind(this));
        this.node.addEventListener('drag', this.onDrag.bind(this));
        this.node.addEventListener('dragend', this.onDragEnd.bind(this));
    }

    onDragStart(e) {
        var element = e.target;
        this.handle = this.makeClone(element);
        this.dragClickOffsetX = e.layerX;
        this.dragClickOffsetY = e.layerY;
        element.style.opacity = 0;
        this.startX = e.x;
        this.startY = e.y;
        this.styleHandle(element);
    }

    onDrag(e) {
        var element = e.target;

        var useX = e.layerX + parseInt($(element).css('left')),
            useY = e.layerY + parseInt($(element).css('top'));

        if (useX === 0 || useY === 0) return;

        this.translate(useX - this.dragClickOffsetX, useY - this.dragClickOffsetY, this.handle, element);

        this.lastDragX = useX;
        this.lastDragY = useY;
        //console.log("drag", this.lastDragX + "   " + this.lastDragY);
    }

    onDragEnd(e) {
        var element = e.target;
        element.style.opacity = 1;

        this.handle.parentNode.removeChild(this.handle);
        $(element).css('top', this.lastDragY - this.dragClickOffsetY).css('left', this.lastDragX - this.dragClickOffsetX);
    }

    styleHandle(node) {
        node.style['userSelect'] = 'none';
    }

    translate(x, y, _handle, node) {
        _handle.style.left = x + 'px';
        _handle.style.top = y + 'px';
    }

    makeClone(node) {
        /*var div = document.createElement('div');
        $(div).appendTo($(node.parentNode));*/
        var clone;
        clone = node.cloneNode(true);
        this.styleClone(clone, node.offsetWidth, node.offsetHeight);
        //div.insertBefore(clone);
        node.parentNode.insertBefore(clone, node);
        $(this.node).find(".canvas").each(function (index) {
            //console.log(this);
        });
        return clone;
    }

    styleClone(node, width, height) {
        node.style.position = 'absolute';
        node.style.zIndex = 9999;
        node.style.width = width + 'px';
        node.style.height = height + 'px';
        node.style.left = '-9999px';
        node.style.margin = 0;
        node.style.padding = 0;
    }

    removelisteners() {
        console.log("remove drag listeners");
        this.node.removeEventListener('dragstart', this.onDragStart.bind(this));
        this.node.removeEventListener('drag', this.onDrag.bind(this));
        this.node.removeEventListener('dragend', this.onDragEnd.bind(this));
        $(this.node).unbind('dragstart');
        $(this.node).unbind('drag');
        $(this.node).unbind('dragend');
        delete this.node;
    }
}
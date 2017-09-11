class Canvas {

    constructor(node) {
        this.canvas;
        this.node = node;
        this.addCanvas();
    }

    addCanvas() {
        var dragClickOffsetX;
        var dragClickOffsetY;
        var lastDragX;
        var lastDragY;
        var dragTimer = 0;
        var _class = this;

        this.canvas = document.createElement('canvas');
        $(this.canvas).addClass('canvas');

        $(this.canvas).appendTo($(this.node.parentNode));

        this.setCanvasSizeAndPos(this.node);
        this.setCanvasSizeAndPos(this.node);

        this.node.addEventListener('dragstart', function (e) {
            if (e.target != _class.node) return;
            dragClickOffsetX = e.layerX;
            dragClickOffsetY = e.layerY;
            dragTimer = 0;
        });

        this.node.addEventListener('drag', function (e) {
            if (e.target != _class.node) return;
            if (dragTimer > 10) {
                var useX = e.layerX + parseInt($(e.target).css('left')),
                    useY = e.layerY + parseInt($(e.target).css('top'));
                lastDragX = useX - dragClickOffsetX;
                lastDragY = useY - dragClickOffsetY;
                _class.setCanvasSizeAndPos(e.target, true, lastDragX, lastDragY);
                dragTimer = 0;
            }
            dragTimer++;
        });
        this.node.addEventListener('dragend', function (e) {
            if (e.target != _class.node) return;
            var useX = e.layerX + parseInt($(e.target).css('left')),
                useY = e.layerY + parseInt($(e.target).css('top'));
            lastDragX = useX - dragClickOffsetX;
            lastDragY = useY - dragClickOffsetY;
            _class.setCanvasSizeAndPos(e.target, true, lastDragX, lastDragY);
            var event = new Event('refresh');
            _class.canvas.dispatchEvent(event);
        });
    }
    refresh() {
        this.setCanvasSizeAndPos(this.node);
    }
    destruct() {
        $(this.node).unbind('dragstart');
        $(this.node).unbind('drag');
        $(this.node).unbind('dragend');
        var context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        $(this.canvas).remove();
        //this = null;

    }

    setCanvasSizeAndPos(target, isevent = false, lastDragX = 0, lastDragY = 0) {
        if (!isevent) {
            var nodeTop = parseInt(target.style.top);
            var nodeLeft = parseInt(target.style.left);
        } else {
            nodeTop = lastDragY;
            nodeLeft = lastDragX;
        }

        var nodeWidth = target.offsetWidth;
        var nodeHeight = target.offsetHeight;

        var parWidth = this.node.parentNode.offsetWidth;
        var parHeight = this.node.parentNode.offsetHeight;

        this.canvas.style.position = 'absolute';
        this.canvas.style.pointerEvents = "none";

        var height = 0;
        var width = 0;

        var position = this.getCanvasPosition(nodeLeft, nodeTop, nodeHeight, nodeWidth, parHeight, parWidth);
        var distance = this.getDistance(nodeLeft, nodeTop, nodeHeight, nodeWidth, parHeight, parWidth, position);
        /*console.log("nodeLeft "+nodeLeft, "nodeTop"+nodeTop, "nodeHeight"+nodeHeight,
                    "nodeWidth "+nodeWidth,"parHeight "+ parHeight,"parWidth "+ parWidth,
                    "canvasLeft "+canvasLeft, "this.canvas.width "+ this.canvas.width,
                    "this.canvas.height "+ this.canvas.height);*/
        if (distance < 0) {
            var context = this.canvas.getContext("2d");
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return;
        }
        //console.log("distance ",distance);
        if (position.pos_up) {
            //console.log("position up");
            if (nodeLeft < 0) {
                width = Math.abs(nodeLeft) + parWidth;
            } else {
                width = (nodeLeft + nodeWidth) < parWidth ? parWidth : (nodeLeft + nodeWidth);
            }
            height = Math.abs(nodeTop) - nodeHeight;
            this.canvas.width = width;
            this.canvas.height = height
            this.canvas.style.top = (0 - (height)) + "px";
            this.canvas.style.left = (nodeLeft < 0 ? nodeLeft : 0) + "px";
        }
        else if (position.pos_left) {
            //console.log("position left");
            width = Math.abs(0 - (nodeLeft + nodeWidth));
            if (nodeTop < 0) {
                height = Math.abs(nodeTop) + parHeight;
            } else {
                height = (nodeTop + nodeWidth) < parHeight ? parHeight : (nodeTop + parHeight);
            }
            this.canvas.width = width
            this.canvas.height = height
            this.canvas.style.top = (nodeTop < 0 ? nodeTop : 0) + "px";
            this.canvas.style.left = 0 - width + "px";
        }
        else if (position.pos_down) {
            //console.log("position down");
            if (nodeLeft < 0) {
                width = Math.abs(nodeLeft) + parWidth;
            } else {
                width = (nodeLeft + nodeWidth) < parWidth ? parWidth : (nodeLeft + nodeWidth);
            }
            this.canvas.width = width;
            this.canvas.height = nodeTop - parHeight;
            this.canvas.style.top = parHeight + "px";
            this.canvas.style.left = (nodeLeft < 0 ? nodeLeft : 0) + "px";
        }
        else if (position.pos_right) {
            //console.log("position right");
            width = nodeLeft - parWidth;
            if (nodeTop < 0) {
                height = Math.abs(nodeTop) + parHeight;
            } else {
                height = (nodeTop + nodeWidth) < parHeight ? parHeight : (nodeTop + parHeight);
            }
            this.canvas.width = width
            this.canvas.height = height
            this.canvas.style.top = (nodeTop < 0 ? nodeTop : 0) + "px";
            this.canvas.style.left = parWidth + "px";
        }
        this.makeLink(position, nodeLeft, nodeTop, nodeHeight, nodeWidth, parHeight, parWidth);
    }

    makeLink(position, nodeLeft, nodeTop, nodeHeight, nodeWidth, parHeight, parWidth) {
        var fromx, fromy, tox, toy;

        var canvasTop = parseInt(this.canvas.style.top);
        var canvasLeft = parseInt(this.canvas.style.left);

        if (position.pos_up) {
            fromx = Math.abs(canvasLeft) + parWidth / 2;
            fromy = this.canvas.height - 5;
            tox = nodeLeft <= 0 ? (nodeWidth / 2) + 3 : (nodeLeft + (nodeWidth) / 2) + 3;
            toy = 13;
        } else if (position.pos_right) {
            fromx = 5;
            fromy = Math.abs(canvasTop) + parHeight / 2;
            tox = this.canvas.width - 13;
            toy = nodeTop <= 0 ? (nodeHeight / 2) + 3 : (nodeTop + (nodeHeight / 2)) + 3;
        } else if (position.pos_down) {
            fromx = Math.abs(canvasLeft) + parWidth / 2;
            fromy = 5;
            tox = nodeLeft <= 0 ? (nodeWidth / 2) + 3 : (nodeLeft + (nodeWidth) / 2) + 3;
            toy = this.canvas.height - 13;
        } else if (position.pos_left) {
            fromx = this.canvas.width - 5;
            fromy = Math.abs(canvasTop) + parHeight / 2;
            tox = 13;
            toy = nodeTop <= 0 ? (nodeHeight / 2) + 3 : (nodeTop + (nodeHeight / 2)) + 3;
        }
        this.drawArrow(fromx, fromy, tox, toy);
    }

    drawArrow(fromx, fromy, tox, toy) {
        var context = this.canvas.getContext("2d");
        var headlen = 8;
        var angle = Math.atan2(toy - fromy, tox - fromx);
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        /*context.fillStyle = 'rgba(225,225,225,0.3)';
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        context.fill();*/
        context.fillStyle = "#656464";
        context.arc(fromx, fromy, 5, 0, 2 * Math.PI, false);
        context.fill();
        context.lineWidth = "2";
        context.strokeStyle = "#656464";
        context.beginPath();
        context.moveTo(fromx, fromy);
        context.lineTo(tox, toy);
        context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        context.moveTo(tox, toy);
        context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        context.closePath();
        context.stroke();
    }

    getCanvasPosition(nodeLeft, nodeTop, nodeHeight, nodeWidth, parHeight, parWidth) {
        var position = { pos_left: false, pos_right: false, pos_up: false, pos_down: false };

        var nodeCenter = { x: nodeLeft + nodeWidth / 2, y: nodeTop + nodeHeight / 2 };
        var parentCenter = { x: parWidth / 2, y: parHeight / 2 };
        var angleDeg = Math.atan2(parentCenter.y - nodeCenter.y, parentCenter.x - nodeCenter.x) * 180 / Math.PI;
        //console.log("angle " + angleDeg);

        if (angleDeg >= -140 && angleDeg <= -40) position.pos_down = true;
        else if (angleDeg <= 140 && angleDeg >= 40) position.pos_up = true;
        else if ((angleDeg >= 140 && angleDeg <= 180) || (angleDeg <= -140 && angleDeg >= -180)) position.pos_right = true;
        else position.pos_left = true;

        if (position.pos_right && nodeLeft < parWidth + 20 && nodeTop > parHeight) {
            position.pos_right = false;
            position.pos_down = true;
        }
        if (position.pos_right && nodeLeft < parWidth + 20 && nodeTop < 0) {
            position.pos_right = false;
            position.pos_up = true;
        }
        if (position.pos_left && nodeLeft + nodeWidth > -20 && nodeTop > parHeight) {
            position.pos_left = false;
            position.pos_down = true;
        }
        if (position.pos_left && nodeLeft + nodeWidth > -20 && nodeTop < 0) {
            position.pos_left = false;
            position.pos_up = true;
        }
        return position;
    }
    getDistance(nodeLeft, nodeTop, nodeHeight, nodeWidth, parHeight, parWidth, position) {
        var distance;
        if (position.pos_up) {
            distance = Math.abs(nodeTop) - parHeight;
        }
        else if (position.pos_left) {
            distance = Math.abs(nodeLeft) - nodeWidth;
        }
        else if (position.pos_down) {
            distance = nodeTop - parHeight;
        }
        else if (position.pos_right) {
            distance = nodeLeft - parWidth;
        }
        return distance;
    }
}

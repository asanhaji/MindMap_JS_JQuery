
class Node {
    constructor(parent, index, title = "", x = 0, y = 0, draggable = "true") {
        this.node;
        this.drag;
        this.canvasClass;
        this.span;
        this.spanSize;
        this.master;
        this.index = index;
        this.addRightbt;
        this.addLeftBt;
        this.deleteBt;
        this.destructMethod = this.destruct;
        this.addNode(parent, title, x, y, draggable);
        this.bindEvents();
        this.addLinks();
    }

    addNode(parent, title = "", x = 0, y = 0, draggable = "true") {
        this.node = document.createElement('div');
        this.span = document.createElement('span');
        $(this.node).addClass('node');
        $(this.node).data('class', this);
        $(this.node).appendTo($(parent));
        $(this.span).appendTo($(this.node));
        $(this.span).html(title != "" ? title : "Child " + this.index);
        this.spanSize = { width: this.span.offsetWidth, height: this.span.offsetHeight };
        if (this.index == 1) {
            this.master = true;
            $(this.node).addClass('master');
            $(this.span).addClass('master_span');
            $(this.span).css('left', (this.node.offsetWidth - this.span.offsetWidth) / 2);
        }

        var yPos = y != 0 ? y : Math.max(0, ((parent.height() - $(this.node).outerHeight()) / 2) + parent.scrollTop());
        var xPos = x != 0 ? x : Math.max(0, ((parent.width() - $(this.node).outerWidth()) / 2) + parent.scrollLeft());
        $(this.node).css("top", yPos + "px");
        $(this.node).css("left", xPos + "px");

        if (this.index > 1) {
            this.canvasClass = new Canvas(this.node);
        }
        if (draggable) {
            this.drag = new Drag(this.node);
        }
    }
    bindEvents() {
        var _class = this;
        $(this.node).bind('dblclick', function () {
            //$(_class.span).attr('contentEditable', true);
        });
        $(this.span).bind('dblclick',
            function () {
                $(_class.span).attr('contentEditable', true);
            });
        $(this.span).bind('DOMSubtreeModified',
            function (e) {
                if (e.target != _class.span) return;
                if (e.target.offsetWidth != _class.spanSize.width || e.target.offsetHeight != _class.spanSize.height) {
                    _class.spanSize.width = e.target.offsetWidth;
                    _class.spanSize.height = e.target.offsetHeight;
                    _class.canvasClass.refresh();
                    $(_class.node).find(".node").each(function (index) {
                        $(this).data('class').canvasClass.refresh();
                    });
                }
            });
    }

    destruct() {
        $(this.node).unbind("mouseenter");
        $(this.node).unbind("mouseleave");
        $(this.addRightbt).unbind("mouseup");
        $(this.addLeftBt).unbind("mouseup");
        $(this.deleteBt).unbind("mouseup");
        $(this.span).unbind('DOMSubtreeModified');
        $(this.span).unbind('dblclick');
        $(this.addRightbt).remove();
        $(this.addLeftBt).remove();
        $(this.deleteBt).remove();
        this.drag.removelisteners();
        $(this.node).find(".node").each(function (index) {
            $(this).data('class').destructMethod;
            //console.log($(this).data('class'));
        });
        $(this.node).remove();
        if (this.canvasClass != null) this.canvasClass.destruct();
    }

    addLinks() {
        var _class = this;
        this.addRightbt = $("<a href='#' class='button add right' alt='Add child node to the right'>Add right</a>").appendTo(this.node);
        this.addLeftBt = $("<a href='#' class='button add left' alt='Add child node to the left'>Add left</a>").appendTo(this.node);
        this.deleteBt = $("<a href='#' class='button delete' alt='Delete node and all his childs'>Delete</a>").appendTo(this.node);
        $(this.deleteBt).data('class', this);
        $(this.addRightbt).hide();
        $(this.addLeftBt).hide();
        $(this.deleteBt).hide();
        $(".delete").not($(".master > .delete")).css('left', (this.node.offsetWidth - 16) / 2);
        $(".master > .button").css('bottom', '35px');
        $(".master > .delete").css('left', '30px');

        $(this.node).mouseover(function (e) {
            if (e.target != _class.node) return;
            $(_class.addRightbt).show();
            $(_class.addLeftBt).show();
            $(_class.deleteBt).show();
        });
        $(this.node).mouseleave(function (e) {
            if (e.target != _class.node) return;
            $(".add").hide();
            $(".delete").hide();
        });
        $(this.addRightbt).mouseup(function (e) {
            if (e.target.parentNode != _class.node) return;
            var event = new Event('add_right');
            _class.node.dispatchEvent(event);
        });
        $(this.addLeftBt).mouseup(function (e) {
            if (e.target.parentNode != _class.node) return;
            var event = new Event('add_left');
            _class.node.dispatchEvent(event);
        });
        $(this.deleteBt).mouseup(function (e) {
            if (e.target.parentNode != _class.node) return;
            var event = new Event('delete');
            _class.node.dispatchEvent(event);

        });
    }
}

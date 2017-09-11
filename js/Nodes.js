class Nodes {
    constructor(mainContainer, title) {
        this.index = 1;
        var nodeClass = this.addNode(mainContainer, title);


        mainContainer.on('dragover', function (e) {
            e.preventDefault();
        });
        mainContainer.on('drop', function (e) {
            e.preventDefault();
        });
    }
    addNode(parent, title = "", direction = "right") {
        if (this.index == 2) {
            var x = direction == "right" ? 100 : -100;
            var y = 100;
        } else if (this.index > 2) {
            x = direction == "right" ? 50 : -50;
            y = 50;
        } else {
            x = 0;
            y = 0;
        }
        var nodeClass = new Node(parent, this.index++, title, x, y);
        this.addBtnListeners(nodeClass.node);
        return nodeClass;
    }

    addBtnListeners(node) {
        var _class = this;
        node.addEventListener("add_right", function (e) {
            _class.addNode(e.target)
        });
        node.addEventListener("add_left", function (e) {
            _class.addNode(e.target, "", "left")
        })
        node.addEventListener("delete", function (e) {
            var confirm = window.confirm("Are you sure ?");
            if (confirm) {
                $(e.target).data('class').destruct();
            }
            //_class.addNode(e.target)
        })
    }
}
(function ($) {

    $.fn.mindmap = function (title) {

        var container = this;
        var index = 1;

        $.when(
            $.getScript("js/Drag.js"),
            $.getScript("js/Canvas.js"),
            $.getScript("js/Node.js"),
            $.getScript("js/Nodes.js"),
            $.Deferred(function (deferred) {
                $(deferred.resolve);
            })
        ).done(init);

        function init() {
            new Nodes(container, title);
            var aside = $("<aside id='menu'><p><label for='hcolor'>map color : </label><input type='color' id='hcolor' name='hcolor' /></p></aside>").appendTo($(container));
            new Drag($('#menu')[0]);
            $("#hcolor").change(function(e){
                console.log(event.target.value);
            });

        }
        return this;
    };
})(jQuery);

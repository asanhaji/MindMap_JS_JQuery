$(document).ready(function () {

    if ($("#mindmap_container").length) {
        launchMindmap();
    }

    if ($(".form").length) {
        $("#submit").click(function (e) {
            if ($("#input").val().length > 6) {
                localStorage.setItem('texte', $("#input").val());
                window.location.replace("http://coding_academy.com/JQuery_RUSH/mindmap.html");
                $(location).attr('href', 'http://coding_academy.com/JQuery_RUSH/mindmap.html')
            } else {
                $(".error").html("Your title is too short");
                //return false;
            }

        })
    }

    function launchMindmap() {
        $('#mindmap_container').mindmap("Ma première node de début");
    }
});
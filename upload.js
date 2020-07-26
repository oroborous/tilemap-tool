$(document).ready(function () {

    $("#uploadButton").click(function () {

        var fd = new FormData();
        var newMapImage = $('#fileToUpload')[0].files[0];
        fd.append('file', newMapImage);

        $.ajax({
            url: 'upload.php',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response != 0) {
                    alert(response);
                    $("#map").css("background-image", "url('" + response + "')");
                } else {
                    alert(response);
                }
            },
        });
    });
});
$(function () {
    getInfo();
    $("#submit").click(function () {
        let solution = $('#select-panel')[0].selectedOptions[0].textContent;
        $.post("/action", { solution: solution }).done(function (data) {
            getInfo();
        });
    });
    $("#retry").click(function () {
        $.get("/info?restart").done(function (data) {
            getInfo();
            $('#dead').hide();
            $('#alive').show();
        });
    });
});

function getInfo() {
    $.get("/info").done(function (data) {
        if(data.alive) {
            $('#info')[0].textContent = "你的hp为:" + data.health + "  架势条为:" + data.posture;
            $.get("/attack").done(function (data) {
                $('#attack-info')[0].textContent = "弦一郎使出了: " + data;
            });
        }
        else{
            $('#alive').hide();
            $('#dead').show();
        }
    });
}
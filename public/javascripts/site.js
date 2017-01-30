"use strict";
$(function () {
    $("button").click(function (e) {
        var snackbar = document.querySelector(".mdl-snackbar");

        var name = $("input#name").val().trim();
        if (name.length === 0) {
            snackbar.MaterialSnackbar.showSnackbar({
                message: "请填写名字",
                timeout: 2000
            });
            return;
        }

        var selection = $(".mdl-checkbox.is-checked > input[type='checkbox']").map(function () {
            return this.value;
        }).get();

        $(e.currentTarget).attr("disabled", "disabled");
        $.post({
            url: "./api/poll",
            contentType: "application/json",
            data: JSON.stringify({
                name: name,
                selection: selection
            }),
            dataType: "json"
        }).then(function (data) {
            snackbar.MaterialSnackbar.showSnackbar({
                message: "提交成功",
                timeout: 2000
            });
        }, function () {
            snackbar.MaterialSnackbar.showSnackbar({
                message: "提交失败",
                timeout: 2000,
                actionText: "重试",
                actionHandler: function (event) {
                    $("button").click();
                }
            });
        }).always(function () {
            $(e.currentTarget).removeAttr("disabled");
        });
    });
});
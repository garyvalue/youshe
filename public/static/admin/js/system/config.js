define(["jquery", "easy-admin", "vue"], function ($, ea, Vue) {

    var form = layui.form;

    var Controller = {
        index: function () {

            $('.show-type-item').hide();
            $('.show-type-item.' + upload_type).show();
            form.on("radio(upload_type)", function (data) {

                $('.show-type-item').hide();
                $('.show-type-item.' + this.value).show();
            });

            ea.listen();
        }
    };
    return Controller;
});
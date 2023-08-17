define(["jquery", "easy-admin"], function ($, ea) {

    var init = {
        table_elem: '#currentTable',
        table_render_id: 'currentTableRenderId',
        index_url: 'debug.log/index',
        add_url: 'debug.log/add',
        edit_url: 'debug.log/edit',
        delete_url: 'debug.log/delete',
        export_url: 'debug.log/export',
        modify_url: 'debug.log/modify',
    };

    var Controller = {

        index: function () {
            var uidList = [];
            ea.table.render({
                init: init,
                size: 'sm',
                limit: 50,
                cols: [[
                    { type: 'checkbox' },
                    { field: 'id', title: 'id', search: 'number_limit' },
                    { field: 'id', title: 'id模糊匹配', trueHide: true, fieldAlias: '[id]like' },
                    { field: 'id', title: '最大id', trueHide: true, fieldAlias: '[id]max', searchOp: 'max' },
                    {
                        field: 'uid', title: 'uid', minWidth: 120,
                    },
                    { field: 'level', title: 'level', minWidth: 70 },
                    {
                        field: 'content', title: '日志内容', minWidth: 450, align: 'left', templet: function (data) {

                            if (uidList.indexOf(data.uid) < 0) {
                                uidList.push(data.uid);
                            }
                            var currentUidIndex = uidList.indexOf(data.uid);

                            var className = 'log-group log-group-' + (currentUidIndex % 2)
                            return '<div class="' + className + '">' + data.content + '</div>'
                        }
                    },
                    { field: 'create_time', title: '记录时间', minWidth: 160, search: 'time_limit' },
                    { field: 'app_name', title: 'app_name' },
                    { field: 'controller_name', title: 'controller_name', },
                    { field: 'action_name', title: 'action_name' },
                ]],
                toolbar: [
                    'refresh',
                    'export'
                ]
            });

            ea.listen();
        },
        add: function () {
            ea.listen();
        },
        edit: function () {
            ea.listen();
        },
    };
    return Controller;
});
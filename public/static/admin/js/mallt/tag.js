define(["jquery", "easy-admin"], function($, ea) {

    var init = {
        table_elem: '#currentTable',
        table_render_id: 'currentTableRenderId',
        index_url: 'mallt.tag/index',
        add_url: 'mallt.tag/add',
        edit_url: 'mallt.tag/edit',
        delete_url: 'mallt.tag/delete',
        export_url: 'mallt.tag/export',
        modify_url: 'mallt.tag/modify',
    };

    var Controller = {

        index: function() {
            ea.table.render({
                init: init,
                cols: [
                    [
                        { type: 'checkbox' },
                        { field: 'id', title: 'id' },
                        { field: 'title', title: '名称' },
                        { width: 250, title: '操作', templet: ea.table.tool },
                    ]
                ],
            });

            ea.listen();
        },
        add: function() {
            ea.listen();
        },
        edit: function() {
            ea.listen();
        },
    };
    return Controller;
});
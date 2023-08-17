define(["jquery", "tableSelect", "ckeditor", 'miniTheme', 'tableData', 'citypicker', 'tagInput', 'propertyInput', 'miniTab', 'clipboardjs'], function ($, tableSelect, undefined, miniTheme, tableData, citypicker, tagInput, propertyInput, miniTab, ClipboardJS) {

    window.onInitElemStyle = function () {
        miniTheme.renderElemStyle()

        $('iframe').each(function (index, iframe) {

            if (typeof iframe.contentWindow.onInitElemStyle == "function") {
                iframe.contentWindow.onInitElemStyle();
            }
        })

    }
    window.onInitElemStyle();

    var lastTableWhere = {};

    var selectMode, selectConfirmCallback;

    var form = layui.form,
        layer = layui.layer,
        table = layui.table,
        laydate = layui.laydate,
        upload = layui.upload,
        element = layui.element,
        laytpl = layui.laytpl,
        tableSelect = layui.tableSelect,
        util = layui.util;

    layer.config({
        skin: 'layui-layer-easy'
    });

    var init = {
        table_elem: '#currentTable',
        table_render_id: 'currentTableRenderId',
        upload_url: 'ajax/upload',
        upload_exts: '',
    };


    var extGroup = {
        // 图片扩展名数组
        'image': ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'ico', 'webp', 'svg'],
        // word扩展名数组
        'word': ['doc', 'docx'],
        // excel扩展名数组
        'excel': ['xls', 'xlsx'],
        // ppt扩展名数组
        'ppt': ['ppt', 'pptx'],
        // pdf扩展名数组
        'pdf': ['pdf'],
        // 压缩文件扩展名数组
        'zip': ['zip', 'rar', '7z'],
        // 文本文件扩展名数组
        'txt': ['txt'],
        // 音乐文件扩展名数组
        'music': ['mp3', 'wma', 'wav', 'mid', 'm4a'],
        // 视频文件扩展名数组
        'video': ['mp4', 'avi', 'wmv', '3gp', 'flv'],
        // visio扩展名数组
        'visio': ['vsd', 'vsdx'],
        'file': []
    }

    var allExtGroup = [];

    for (const extGroupName in extGroup) {
        if (Object.hasOwnProperty.call(extGroup, extGroupName)) {
            const extGroupList = extGroup[extGroupName];

            allExtGroup = allExtGroup.concat(extGroupList)

        }
    }
    init.upload_exts += allExtGroup.join('|')

    extGroup['office'] = [].concat(extGroup['word'], extGroup['excel'], extGroup['ppt'], extGroup['pdf'])
    extGroup['media'] = [].concat(extGroup['image'], extGroup['music'], extGroup['video'])

    var admin = {
        config: {
            shade: [0.02, '#000'],
        },
        url: function (url) {

            var urlPrefixCheck = ['/', 'http://', 'https://'];

            for (const index in urlPrefixCheck) {
                if (Object.hasOwnProperty.call(urlPrefixCheck, index)) {
                    const prefix = urlPrefixCheck[index];
                    if (url.indexOf(prefix) === 0) {
                        return url;
                    }
                }
            }

            return '/' + CONFIG.ADMIN + '/' + url;
        },
        headers: function () {
            return { 'X-CSRF-TOKEN': window.CONFIG.CSRF_TOKEN };
        },

        checkAuth: function (node, elem) {
            if (CONFIG.IS_SUPER_ADMIN) {
                return true;
            }
            if ($(elem).attr('data-auth-' + node) === '1') {
                return true;
            } else {
                return false;
            }
        },
        parame: function (param, defaultParam) {
            return param !== undefined ? param : defaultParam;
        },
        request: {
            post: function (option, ok, no, ex) {
                return admin.request.ajax('post', option, ok, no, ex);
            },
            get: function (option, ok, no, ex) {
                return admin.request.ajax('get', option, ok, no, ex);
            },
            ajax: function (type, option, ok, no, ex) {
                type = type || 'get';
                option.url = option.url || '';
                option.data = option.data || {};
                option.prefix = option.prefix || false;
                option.statusName = option.statusName || 'code';
                option.statusCode = option.statusCode || 1;
                ok = ok || function (res) {
                };
                no = no || function (res) {
                    var msg = res.msg == undefined ? '返回数据格式有误' : res.msg;
                    admin.msg.error(msg);
                    return false;
                };
                ex = ex || function (res) {
                };
                if (option.url == '') {
                    admin.msg.error('请求地址不能为空');
                    return false;
                }
                if (option.prefix == true) {
                    option.url = admin.url(option.url);
                }
                loading.show()
                $.ajax({
                    url: option.url,
                    type: type,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    dataType: "json",
                    headers: admin.headers(),
                    data: option.data,
                    timeout: 60000,
                    success: function (res) {
                        loading.hide();
                        if (eval('res.' + option.statusName) == option.statusCode) {
                            return ok(res);
                        } else {
                            return no(res);
                        }
                    },
                    error: function (xhr, textstatus, thrown) {
                        admin.msg.error('Status:' + xhr.status + '，' + xhr.statusText + '，请稍后再试！', function () {
                            ex(this);
                        });
                        return false;
                    },
                    complete: function () {
                        // @todo 刷新csrf-token
                    }
                });
            }
        },
        common: {
            parseNodeStr: function (node) {
                var array = node.split('/');
                $.each(array, function (key, val) {
                    if (key === 0) {
                        val = val.split('.');
                        $.each(val, function (i, v) {
                            val[i] = admin.common.humpToLine(v.replace(v[0], v[0].toLowerCase()));
                        });
                        val = val.join(".");
                        array[key] = val;
                    }
                });
                node = array.join("/");
                return node;
            },
            lineToHump: function (name) {
                return name.replace(/\_(\w)/g, function (all, letter) {
                    return letter.toUpperCase();
                });
            },
            humpToLine: function (name) {
                return name.replace(/([A-Z])/g, "_$1").toLowerCase();
            },
        },
        msg: {
            // 成功消息
            success: function (msg, callback) {
                if (callback === undefined) {
                    callback = function () {
                    }
                }
                var index = layer.msg(msg, { icon: 1, shade: admin.config.shade, scrollbar: false, time: 800, shadeClose: true }, callback);
                return index;
            },
            // 失败消息
            error: function (msg, callback) {
                if (callback === undefined) {
                    callback = function () {
                    }
                }
                var index = layer.msg(msg, { icon: 2, shade: admin.config.shade, scrollbar: false, time: 3000, shadeClose: true }, callback);
                return index;
            },
            // 警告消息框
            alert: function (msg, callback) {
                var index = layer.alert(msg, { end: callback, scrollbar: false });
                return index;
            },
            // 对话框
            confirm: function (msg, ok, no) {
                var index = layer.confirm(msg, { title: '操作确认', btn: ['确认', '取消'] }, function () {
                    typeof ok === 'function' && ok.call(this);
                }, function () {
                    typeof no === 'function' && no.call(this);
                    self.close(index);
                });
                return index;
            },
            // 消息提示
            tips: function (msg, time, callback) {
                var index = layer.msg(msg, { time: (time || 0.8) * 1000, shade: this.shade, end: callback, shadeClose: true });
                return index;
            },
            // 加载中提示
            loading: function (msg, callback) {
                var index = msg ? layer.msg(msg, { icon: 16, scrollbar: false, shade: this.shade, time: 0, end: callback }) : layer.load(2, { time: 0, scrollbar: false, shade: this.shade, end: callback });
                return index;
            },
            // 关闭消息框
            close: function (index) {
                return layer.close(index);
            }
        },
        table: {
            render: function (options) {
                options.init = options.init || init;
                options.modifyReload = admin.parame(options.modifyReload, true);
                options.elem = options.elem || options.init.table_elem;
                options.id = options.id || options.init.table_render_id;
                options.scrollPos = options.scrollPos || 'fixed';
                options.layFilter = options.id + '_LayFilter';
                options.url = options.url || admin.url(options.init.index_url);
                options.headers = admin.headers();
                options.page = admin.parame(options.page, true);
                options.search = admin.parame(options.search, true);
                options.skin = options.skin || 'line';
                options.autoSort = options.autoSort || false;
                options.limit = options.limit || 15;
                options.limits = options.limits || [10, 15, 20, 25, 50, 100];
                options.cols = options.cols || [];

                var defaultToolbar = ['filter', 'print'];

                if (options.search) {
                    defaultToolbar.push({
                        title: '搜索',
                        layEvent: 'TABLE_SEARCH',
                        icon: 'layui-icon-search',
                        extend: 'data-table-id="' + options.id + '"'
                    })
                }
                if (options.defaultToolbar === undefined) {
                    options.defaultToolbar = defaultToolbar
                }

                var table2card = function () {

                    if (admin.checkMobile()) {
                        var domTable = $('[lay-id="' + options.id + '"]');

                        var colsHeader = [];
                        domTable.find('.layui-table-header').first().find('.layui-table-cell').each(function (index, cell) {

                            if ($(cell).hasClass('laytable-cell-checkbox')) {
                                colsHeader.push('选择');
                            } else {
                                colsHeader.push($(cell).find('span').first().text())
                            }
                        })

                        domTable.find('.layui-table-main').find('tr').each(function (index, domTr) {

                            $(domTr).find('td').each(function (indexTd, domTd) {

                                $('<div class="data-item">' + colsHeader[indexTd] + '</div>').insertBefore($(domTd).find('.layui-table-cell'))
                            })
                        })
                    }

                }

                var tableFixedAutoHeight = function () {
                    $(".layui-table-main tr").each(function (index, val) {
                        $(".layui-table-fixed").each(function () {
                            $($(this).find(".layui-table-body tbody tr")[index]).height($(val).height());
                        });
                    });
                }

                var optionDone = function () { }
                if (options.done != undefined) {
                    optionDone = options.done;
                }
                options.done = function () {
                    optionDone()
                    table2card()
                    tableFixedAutoHeight()

                    // 监听表格内的复制组件
                    admin.api.copyText('[lay-id=' + options.id + ']');
                }


                selectMode = admin.getQueryVariable("select_mode");

                selectConfirmCallback = admin.getQueryVariable('select_confirm_callback', 'onTableDataConfirm');


                // 判断是否为移动端
                if (admin.checkMobile()) {
                    options.defaultToolbar = !options.search ? ['filter'] : ['filter', {
                        title: '搜索',
                        layEvent: 'TABLE_SEARCH',
                        icon: 'layui-icon-search',
                        extend: 'data-table-id="' + options.id + '"'
                    }];


                    options.page = {
                        layout: ['first', 'prev', 'page', 'next', 'last', 'count']
                    }
                }


                if (selectMode == 'checkbox') {
                    if (options.cols[0][0].type == 'radio') {
                        options.cols[0][0].type = 'checkbox';
                    } else if (options.cols[0][0].type != 'checkbox') {
                        options.cols[0].unshift({
                            type: 'checkbox'
                        })
                    }
                } else if (selectMode == 'radio') {
                    if (options.cols[0][0].type == 'checkbox') {
                        options.cols[0][0].type = 'radio';

                    } else if (options.cols[0][0].type != 'radio') {
                        options.cols[0].unshift({
                            type: 'radio'
                        })

                    }
                }

                // 判断元素对象是否有嵌套的
                options.cols = admin.table.formatCols(options.cols, options.init);

                // 初始化表格lay-filter
                $(options.elem).attr('lay-filter', options.layFilter);

                // 初始化表格搜索
                if (options.search === true) {
                    options = admin.table.renderSearch(options.cols, options.elem, options.id, options);
                }

                // 初始化表格左上方工具栏
                options.toolbar = options.toolbar || ['refresh', 'add', 'delete', 'export'];

                if (selectMode == 'checkbox' || selectMode == 'radio') {
                    options.toolbar.unshift('selectConfirm');

                    options.height = 'full-85'
                }

                if (options.init.formFullScreen == true) {
                    options.init.formFullScreen = 'true'
                } else {
                    options.init.formFullScreen = 'false'
                }

                options.toolbar = admin.table.renderToolbar(options.toolbar, options.elem, options.id, options.init);

                // 判断是否有操作列表权限
                options.cols = admin.table.renderOperat(options.cols, options.elem);

                // 判断是否有操作列表权限
                options.cols = admin.table.renderTrueHide(options.cols, options);


                var parseData = function (res) { return res }

                if (typeof options.parseData === 'function') {
                    parseData = options.parseData;
                }

                options.parseData = function (res) {

                    // 初始化已经选择的值
                    if (selectMode == 'checkbox' || selectMode == 'radio') {

                        var selectedIds = admin.getQueryVariable('selectedIds', '');

                        if (selectedIds.length > 0) {
                            var selectedIdArr = selectedIds.split(',');

                            for (let index = 0; index < res.data.length; index++) {
                                const dataItem = res.data[index];

                                if (selectedIdArr.indexOf(dataItem.id.toString()) > -1) {
                                    res.data[index].LAY_DISABLED = true;
                                }
                            }
                        }
                    }

                    res = parseData(res)
                    return res;
                }


                // 初始化表格
                var newTable = table.render(options);

                // 监听表格搜索开关显示
                admin.table.listenToolbar(options.layFilter, options.id);

                // 监听表格瓶排序
                admin.table.listenTableSort(options);

                // 监听表格开关切换
                admin.table.renderSwitch(options.cols, options.init, options.id, options.modifyReload);

                // 监听表格开关切换
                admin.table.listenEdit(options.init, options.layFilter, options.id, options.modifyReload);

                // 监听导出事件
                admin.table.listenExport(options);

                // 监听表格选择器
                admin.table.listenTableSelectConfirm(options)

                return newTable;
            },
            renderToolbar: function (data, elem, tableId, init) {
                data = data || [];
                var toolbarHtml = '';
                $.each(data, function (i, v) {
                    if (v === 'refresh') {
                        toolbarHtml += ' <button class="layui-btn layui-btn-sm layuimini-btn-primary" data-table-refresh="' + tableId + '"><i class="fa fa-refresh"></i> </button>\n';
                    } else if (v === 'add') {
                        if (admin.checkAuth('add', elem)) {
                            toolbarHtml += '<button class="layui-btn layui-btn-normal layui-btn-sm" data-open="' + init.add_url + '" data-title="添加" data-full="' + init.formFullScreen + '"><i class="fa fa-plus"></i> 添加</button>\n';
                        }
                    } else if (v === 'delete') {
                        if (admin.checkAuth('delete', elem)) {
                            toolbarHtml += '<button class="layui-btn layui-btn-sm layui-btn-danger" data-url="' + init.delete_url + '" data-table-delete="' + tableId + '"><i class="fa fa-trash-o"></i> 删除</button>\n';
                        }
                    } else if (v === 'export') {
                        if (admin.checkAuth('export', elem)) {
                            toolbarHtml += '<button class="layui-btn layui-btn-sm layui-btn-success easyadmin-export-btn" data-url="' + init.export_url + '" data-table-export="' + tableId + '"><i class="fa fa-file-excel-o"></i> 导出</button>\n';
                        }
                    } else if (v === 'selectConfirm') {
                        toolbarHtml += '<button class="layui-btn layui-btn-sm layui-btn-success easyadmin-export-btn select-confirm" data-table-target="' + tableId + '"> 确定选择</button>\n';
                    } else if (typeof v === "object") {
                        $.each(v, function (ii, vv) {
                            vv.class = vv.class || '';
                            vv.icon = vv.icon || '';
                            vv.auth = vv.auth || 'add';
                            vv.url = vv.url || '';
                            vv.method = vv.method || 'open';
                            vv.title = vv.title || vv.text;
                            vv.text = vv.text || vv.title;
                            vv.extend = vv.extend || '';
                            vv.checkbox = vv.checkbox || false;
                            if (admin.checkAuth(vv.auth, elem)) {
                                toolbarHtml += admin.table.buildToolbarHtml(vv, tableId);
                            }
                        });
                    }
                });
                return '<div>' + toolbarHtml + '</div>';
            },
            renderSearch: function (cols, elem, tableId, options) {
                // TODO 只初始化第一个table搜索字段，如果存在多个(绝少数需求)，得自己去扩展
                cols = cols[0] || {};
                var newCols = [];
                var formHtml = '';
                var formatFilter = {},
                    formatOp = {};
                $.each(cols, function (i, d) {
                    d.field = d.field || false;
                    d.fieldAlias = admin.parame(d.fieldAlias, d.field);
                    d.title = d.title || d.field || '';
                    d.selectList = d.selectList || {};
                    d.search = admin.parame(d.search, true);
                    d.searchTip = d.searchTip || '请输入' + d.title || '';
                    d.searchValue = d.searchValue || '';
                    d.searchHide = d.searchHide || '';
                    d.defaultSearchValue = d.defaultSearchValue;
                    d.searchOp = d.searchOp || '%*%';
                    d.timeType = d.timeType || 'datetime';

                    d.elemIdName = d.fieldAlias;

                    if (typeof d.fieldAlias == 'string') {

                        if (d.fieldAlias.indexOf('[') == 0) {

                            var fieldPlusArr = d.fieldAlias.replace('[').split(']');

                            d.elemIdName = fieldPlusArr.join('-')
                        }

                        d.elemIdName = d.elemIdName.replace('.', '-');
                    }


                    if (d.defaultSearchValue != undefined) {
                        if (d.searchValue.length == 0) {
                            d.searchValue = d.defaultSearchValue;
                        }

                        formatFilter[d.field] = d.defaultSearchValue;
                        formatOp[d.field] = d.searchOp;
                    }


                    var formSearchHideClass = '';

                    if (d.searchHide) {
                        formSearchHideClass = ' search-hide-item'
                    }

                    if (d.field !== false && d.search !== false) {
                        switch (d.search) {
                            case true:
                                formHtml += '\t<div class="layui-form-item layui-inline ' + formSearchHideClass + ' ">\n' +
                                    '<label class="layui-form-label">' + d.title + '</label>\n' +
                                    '<div class="layui-input-inline">\n' +
                                    '<input id="c-' + d.elemIdName + '" name="' + d.fieldAlias + '" data-search-op="' + d.searchOp + '" value="' + d.searchValue + '" placeholder="' + d.searchTip + '" class="layui-input">\n' +
                                    '</div>\n' +
                                    '</div>';
                                break;
                            case 'select':
                                d.searchOp = '=';
                                var selectHtml = '';

                                $.each(d.selectList, function (sI, sV) {
                                    var selected = '';
                                    if (sI === d.searchValue) {
                                        selected = 'selected=""';
                                    }
                                    selectHtml += '<option value="' + sI + '" ' + selected + '>' + sV + '</option>/n';
                                });
                                formHtml += '\t<div class="layui-form-item layui-inline ' + formSearchHideClass + ' ">\n' +
                                    '<label class="layui-form-label">' + d.title + '</label>\n' +
                                    '<div class="layui-input-inline">\n' +
                                    '<select class="layui-select" id="c-' + d.elemIdName + '" name="' + d.fieldAlias + '"  data-search-op="' + d.searchOp + '" >\n' +
                                    '<option value="">- 全部 -</option> \n' +
                                    selectHtml +
                                    '</select>\n' +
                                    '</div>\n' +
                                    '</div>';
                                break;
                            case 'range':
                                d.searchOp = 'range';
                                formHtml += '\t<div class="layui-form-item layui-inline ' + formSearchHideClass + ' ">\n' +
                                    '<label class="layui-form-label">' + d.title + '</label>\n' +
                                    '<div class="layui-input-inline">\n' +
                                    '<input id="c-' + d.elemIdName + '" name="' + d.fieldAlias + '"  data-search-op="' + d.searchOp + '"  value="' + d.searchValue + '" placeholder="' + d.searchTip + '" class="layui-input">\n' +
                                    '</div>\n' +
                                    '</div>';
                                break;
                            case 'time':
                                d.searchOp = '=';
                                formHtml += '\t<div class="layui-form-item layui-inline ' + formSearchHideClass + ' ">\n' +
                                    '<label class="layui-form-label">' + d.title + '</label>\n' +
                                    '<div class="layui-input-inline">\n' +
                                    '<input id="c-' + d.elemIdName + '" name="' + d.fieldAlias + '"  data-search-op="' + d.searchOp + '"  value="' + d.searchValue + '" placeholder="' + d.searchTip + '" class="layui-input">\n' +
                                    '</div>\n' +
                                    '</div>';
                                break;
                            case 'time_limit':
                                d.searchOp = '=';
                                formHtml += '\t<div class="layui-form-item form-item-time-limit layui-inline ' + formSearchHideClass + ' ">\n' +
                                    '<label class="layui-form-label">' + d.title + '</label>\n' +
                                    '<div class="layui-input-inline">\n' +
                                    '<input id="c-' + d.elemIdName + '-min_date" name="[' + d.fieldAlias + ']min_date"  data-search-op="min_date"  value="' + d.searchValue + '" placeholder="最小值" class="layui-input">\n' +
                                    '<input id="c-' + d.elemIdName + '-max_date" name="[' + d.fieldAlias + ']max_date"  data-search-op="max_date"  value="' + d.searchValue + '" placeholder="最大值" class="layui-input">\n' +
                                    '</div>\n' +
                                    '</div>';
                                break;
                            case 'number_limit':
                                d.searchOp = '=';
                                formHtml += '\t<div class="layui-form-item form-item-number-limit layui-inline ' + formSearchHideClass + ' ">\n' +
                                    '<label class="layui-form-label">' + d.title + '</label>\n' +
                                    '<div class="layui-input-inline">\n' +
                                    '<input id="c-' + d.elemIdName + '-min" name="[' + d.fieldAlias + ']min"  data-search-op="min" type="text" value="' + d.searchValue + '" placeholder="最小值" class="layui-input">\n' +
                                    '<input id="c-' + d.elemIdName + '-max" name="[' + d.fieldAlias + ']max"  data-search-op="max" type="text" value="' + d.searchValue + '" placeholder="最大值" class="layui-input">\n' +
                                    '</div>\n' +
                                    '</div>';
                                break;
                        }
                        newCols.push(d);
                    }
                });
                if (formHtml !== '') {

                    $(elem).before('<fieldset id="searchFieldset_' + tableId + '" class="table-search-fieldset layui-hide">\n' +
                        '<legend>条件搜索</legend>\n' +
                        '<form class="layui-form layui-form-pane form-search" lay-filter="' + tableId + '_filter_form">\n' +
                        formHtml +
                        '<div class="layui-form-item layui-inline" style="margin-left: 115px">\n' +
                        '<button type="submit" class="layui-btn layui-btn-normal" data-type="tableSearch" data-table="' + tableId + '" lay-submit lay-filter="' + tableId + '_filter"> 搜 索</button>\n' +
                        '<button type="reset" class="layui-btn layui-btn-primary" data-table-reset="' + tableId + '"> 重 置 </button>\n' +
                        ' </div>' +
                        '</form>' +
                        '</fieldset>');

                    admin.table.listenTableSearch(tableId);

                    // 初始化form表单
                    form.render();
                    $.each(newCols, function (ncI, ncV) {
                        if (ncV.search === 'range') {
                            laydate.render({ range: true, type: ncV.timeType, elem: '[name="' + ncV.fieldAlias + '"]' });
                        }
                        if (ncV.search === 'time') {
                            laydate.render({ type: ncV.timeType, elem: '[name="' + ncV.fieldAlias + '"]' });
                        }
                        if (ncV.search === 'time_limit') {
                            laydate.render({ type: ncV.timeType, elem: '[name="[' + ncV.fieldAlias + ']min_date"]' });
                            laydate.render({ type: ncV.timeType, elem: '[name="[' + ncV.fieldAlias + ']max_date"]' });
                        }
                    });
                }

                options.where = {
                    filter: JSON.stringify(formatFilter),
                    op: JSON.stringify(formatOp)
                }

                lastTableWhere[tableId] = options.where;

                return options;
            },
            renderSwitch: function (cols, tableInit, tableId, modifyReload) {
                tableInit.modify_url = tableInit.modify_url || false;
                cols = cols[0] || {};
                tableId = tableId || init.table_render_id;
                if (cols.length > 0) {
                    $.each(cols, function (i, v) {
                        v.filter = v.filter || false;
                        if (v.filter !== false && tableInit.modify_url !== false) {
                            admin.table.listenSwitch({ filter: v.filter, url: tableInit.modify_url, tableId: tableId, modifyReload: modifyReload });
                        }
                    });
                }
            },
            renderOperat(data, elem) {
                for (dk in data) {
                    var col = data[dk];
                    var operat = col[col.length - 1].operat;
                    if (operat !== undefined) {
                        var check = false;
                        for (key in operat) {
                            var item = operat[key];
                            if (typeof item === 'string') {
                                if (admin.checkAuth(item, elem)) {
                                    check = true;
                                    break;
                                }
                            } else {
                                for (k in item) {
                                    var v = item[k];
                                    if (v.auth == undefined) {
                                        v.auth = 'add'
                                    }
                                    if (admin.checkAuth(v.auth, elem)) {
                                        check = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (!check) {
                            data[dk].pop()
                        }
                    }

                }
                return data;
            },
            renderTrueHide(data, options) {
                var newData = [];
                for (dk in data) {
                    var newCol = [];
                    var col = data[dk];

                    col.forEach(colItem => {
                        var trueHide = false;
                        if (typeof colItem.trueHide == 'function') {
                            trueHide = colItem.trueHide(colItem, col, options)
                        } else if (typeof colItem.trueHide == 'string') {
                            trueHide = !admin.checkAuth(colItem.trueHide, options.elem);
                        } else {
                            trueHide = colItem.trueHide;
                        }

                        if (!trueHide) {
                            newCol.push(colItem)
                        }
                    });

                    newData.push(newCol)
                }

                return newData;
            },
            buildToolbarHtml: function (toolbar, tableId) {
                var html = '';
                toolbar.class = toolbar.class || '';
                toolbar.icon = toolbar.icon || '';
                toolbar.auth = toolbar.auth || 'add';
                toolbar.url = toolbar.url || '';
                toolbar.extend = toolbar.extend || '';
                toolbar.method = toolbar.method || 'open';
                toolbar.field = toolbar.field || 'id';
                toolbar.title = toolbar.title || toolbar.text;
                toolbar.text = toolbar.text || toolbar.title;
                toolbar.checkbox = toolbar.checkbox || false;

                var formatToolbar = toolbar;
                formatToolbar.icon = formatToolbar.icon !== '' ? '<i class="' + formatToolbar.icon + '"></i> ' : '';
                formatToolbar.class = formatToolbar.class !== '' ? 'class="' + formatToolbar.class + '" ' : '';
                if (toolbar.method === 'open') {
                    formatToolbar.method = formatToolbar.method !== '' ? 'data-open="' + formatToolbar.url + '" data-title="' + formatToolbar.title + '" ' : '';
                } else if (toolbar.method === 'none') { // 常用于与extend配合，自定义监听按钮
                    formatToolbar.method = '';
                } else if (toolbar.method === 'blank') {
                    formatToolbar.method = ' href="' + formatToolbar.url + '" target="_blank" ';

                } else {
                    formatToolbar.method = formatToolbar.method !== '' ? 'data-request="' + formatToolbar.url + '" data-title="' + formatToolbar.title + '" ' : '';
                }
                formatToolbar.checkbox = toolbar.checkbox ? ' data-checkbox="true" ' : '';
                formatToolbar.tableId = tableId !== undefined ? ' data-table="' + tableId + '" ' : '';
                html = '<button ' + formatToolbar.class + formatToolbar.method + formatToolbar.extend + formatToolbar.checkbox + formatToolbar.tableId + '>' + formatToolbar.icon + formatToolbar.text + '</button>';

                return html;
            },
            buildOperatHtml: function (operat, data) {
                var html = '';
                operat.class = operat.class || '';
                operat.icon = operat.icon || '';
                operat.auth = operat.auth || 'add';
                operat.url = operat.url || '';
                operat.extend = operat.extend || '';
                operat.method = operat.method || 'open';
                operat.field = operat.field || 'id';
                operat.data = operat.data || ['id'];
                operat.titleField = operat.titleField || 'title';
                operat.title = operat.title || operat.text;
                operat.text = operat.text || operat.title;


                var titleEndfix = '';

                if (typeof operat.titleField == 'function') {
                    titleEndfix = operat.titleField(data)
                } else if (data[operat.titleField]) {
                    titleEndfix = '-' + data[operat.titleField];
                }

                var formatOperat = operat;
                formatOperat.icon = formatOperat.icon !== '' ? '<i class="' + formatOperat.icon + '"></i> ' : '';
                formatOperat.class = formatOperat.class !== '' ? 'class="' + formatOperat.class + '" ' : '';
                if (operat.method === 'open') {
                    formatOperat.method = formatOperat.method !== '' ? 'data-open="' + formatOperat.url + '" data-title="' + formatOperat.title + titleEndfix + '" ' : '';
                } else if (operat.method === 'none') { // 常用于与extend配合，自定义监听按钮
                    formatOperat.method = '';
                } else if (operat.method === 'blank') {
                    formatOperat.method = ' href="' + formatOperat.url + '" target="_blank" ';
                } else if (operat.method === 'tab') {
                    formatOperat.method = ' layuimini-content-href="' + formatOperat.url + '" data-title="' + formatOperat.title + titleEndfix + '"';
                } else {
                    formatOperat.method = formatOperat.method !== '' ? 'data-request="' + formatOperat.url + '" data-title="' + formatOperat.title + titleEndfix + '" ' : '';
                }

                formatOperat.dataBind = ' ';
                operat.data.forEach((item, index) => {
                    formatOperat.dataBind += 'data-' + item + '="' + data[item] + '" '
                });

                html = '<a ' + formatOperat.class + formatOperat.method + formatOperat.extend + formatOperat.dataBind + '>' + formatOperat.icon + formatOperat.text + '</a>';

                return html;
            },
            toolSpliceUrl(url, field, data) {
                url = url.indexOf("?") !== -1 ? url + '&' + field + '=' + data[field] : url + '?' + field + '=' + data[field];
                return url;
            },
            formatCols: function (cols, init) {
                for (i in cols) {
                    var col = cols[i];
                    for (index in col) {
                        var val = col[index];

                        if (val['width'] == undefined && val['minWidth'] == undefined) {
                            var width = null;
                            if (val.title) {
                                width = val.title.length * 15 + 55
                            }

                            if (width != null) {
                                cols[i][index]['minWidth'] = width
                            }
                        }

                        if (val.sort === undefined) {

                            cols[i][index]['sort'] = true;
                        }

                        // 判断是否包含初始化数据
                        if (val.init === undefined) {
                            cols[i][index]['init'] = init;
                        }

                        // 格式化列操作栏
                        if (val.templet === admin.table.tool && val.operat === undefined) {
                            cols[i][index]['operat'] = ['edit', 'delete'];
                        }
                        // 格式化列操作栏
                        if (val.templet === admin.table.tool) {
                            cols[i][index]['sort'] = false;
                        }

                        // 判断是否包含开关组件
                        if (val.templet === admin.table.switch && val.filter === undefined) {
                            cols[i][index]['filter'] = val.field;
                        }

                        // 判断是否含有搜索下拉列表
                        if (val.selectList !== undefined && val.search === undefined) {
                            cols[i][index]['search'] = 'select';
                        }

                        // 判断是否初始化对齐方式
                        if (val.align === undefined) {
                            cols[i][index]['align'] = 'center';
                        }

                        // 部分字段开启排序
                        var sortDefaultFields = ['id', 'sort'];
                        if (val.sort === undefined && sortDefaultFields.indexOf(val.field) >= 0) {
                            cols[i][index]['sort'] = true;
                        }

                        // 初始化图片高度
                        if (val.templet === admin.table.image && val.imageHeight === undefined) {
                            cols[i][index]['imageHeight'] = 40;
                            cols[i][index]['sort'] = false;
                        }

                        // 判断是否列表数据转换
                        if (val.selectList !== undefined && val.templet === undefined) {
                            cols[i][index]['templet'] = admin.table.list;
                        }

                        // 判断是否多层对象
                        if (val.field !== undefined && val.field.split(".").length > 1) {
                            if (val.templet === undefined) {
                                cols[i][index]['templet'] = admin.table.value;
                            }
                        }

                        // 如果未定义则默认使用value
                        if (cols[i][index]['templet'] === undefined) {
                            cols[i][index]['templet'] = admin.table.value;
                        } else {
                            // 针对特定的模板做数据调整

                            if (cols[i][index]['templet'] == admin.table.list) {
                                if (val.selectValue) {

                                    var newSelectList = {};
                                    val.selectList.map(item => {
                                        newSelectList[item[val.selectValue]] = item[val.selectLabel];
                                    });

                                    cols[i][index]['selectList'] = newSelectList;

                                }
                            }
                        }

                        if (val.fieldFormat == undefined) {

                            switch (val.templet) {
                                case admin.table.image:
                                    val.fieldFormat = 'image';
                                    break;
                                case admin.table.date:
                                    val.fieldFormat = 'date';
                                    break;
                                default:
                                    val.fieldFormat = 'text';

                                    if (val.selectList !== undefined) {
                                        val.fieldFormat = 'select';
                                    }
                                    break;
                            }
                        }

                        if (admin.checkMobile()) {
                            if (val.fixed !== undefined) {
                                val.fixed = false;
                            }
                        }

                        // 重新整理配置参数，兼容templet在edit时缺少LAY_COL的问题，如果在layui2.8解决，那么应当删除这些代码

                        var endVal = { ...col[index] };
                        endVal.endTemplet = endVal.templet;
                        endVal.templet = function (data) {
                            if (!data.LAY_COL) {
                                data.LAY_COL = this
                            }

                            return this.endTemplet(data)
                        }

                        cols[i][index] = endVal;



                    }
                }
                return cols;
            },
            tool: function (data) {
                var option = data.LAY_COL;
                option.operat = option.operat || ['edit', 'delete'];
                var elem = option.init.table_elem || init.table_elem;
                var html = '';
                $.each(option.operat, function (i, item) {
                    if (typeof item === 'string') {
                        switch (item) {
                            case 'edit':
                                var operat = {
                                    class: 'layui-btn layui-btn-success layui-btn-xs',
                                    method: 'open',
                                    field: 'id',
                                    icon: '',
                                    text: '编辑',
                                    title: '编辑信息',
                                    auth: 'edit',
                                    url: option.init.edit_url,
                                    extend: option.init.formFullScreen == 'true' ? ' data-full="true"' : ''
                                };
                                operat.url = admin.table.toolSpliceUrl(operat.url, operat.field, data);
                                if (admin.checkAuth(operat.auth, elem)) {
                                    html += admin.table.buildOperatHtml(operat, data);
                                }
                                break;
                            case 'delete':
                                var operat = {
                                    class: 'layui-btn layui-btn-danger layui-btn-xs',
                                    method: 'get',
                                    field: 'id',
                                    icon: '',
                                    text: '删除',
                                    title: '确定删除？',
                                    auth: 'delete',
                                    url: option.init.delete_url,
                                    extend: ""
                                };
                                operat.url = admin.table.toolSpliceUrl(operat.url, operat.field, data);
                                if (admin.checkAuth(operat.auth, elem)) {
                                    html += admin.table.buildOperatHtml(operat, data);
                                }
                                break;
                        }

                    } else if (typeof item === 'object') {
                        $.each(item, function (i, operat) {
                            operat.class = operat.class || '';
                            operat.icon = operat.icon || '';
                            operat.auth = operat.auth || 'add';
                            operat.url = operat.url || '';
                            operat.method = operat.method || 'open';
                            operat.field = operat.field || 'id';
                            operat.title = operat.title || operat.text;
                            operat.text = operat.text || operat.title;
                            operat.extend = operat.extend || '';

                            operat._if = operat._if || function () { return true };

                            if (typeof operat._if == 'function') {
                                if (operat._if(data, operat) !== true) {
                                    return '';
                                }
                            } else if (typeof operat._if == 'string') {
                                var ifValue = admin.table.returnColumnValue(data, operat._if, false);
                                if (!ifValue) {
                                    return ''
                                }
                            }

                            // 自定义表格opreat按钮的弹窗标题风格，extra是表格里的欲加入标题中的字段
                            operat.extra = operat.extra || '';
                            if (data[operat.extra] !== undefined) {
                                operat.title = data[operat.extra] + ' - ' + operat.title;
                            }

                            if (typeof operat.url == 'function') {
                                operat.url = operat.url(data, operat);
                            }


                            if (typeof operat.field != 'function') {
                                if (!admin.empty(operat.field)) {
                                    operat.url = admin.table.toolSpliceUrl(operat.url, operat.field, data);
                                }
                            } else {

                                var fieldParam = operat.field(data, operat);

                                if (typeof fieldParam == 'string') {
                                    operat.url = fieldParam
                                } else {
                                    var querys = '';
                                    if (operat.url.indexOf("?") !== -1) {
                                        if (operat.url.indexOf("?") !== operat.url.length - 1) {
                                            querys = '&'
                                        }
                                    } else {
                                        querys = '?'
                                    }
                                    operat.url += querys + $.param(fieldParam)
                                }

                            }

                            if (admin.checkAuth(operat.auth, elem)) {
                                html += admin.table.buildOperatHtml(operat, data);
                            }
                        });
                    }
                });
                return html;
            },
            list: function (data) {
                var option = data.LAY_COL;
                option.selectList = option.selectList || {};

                var value = admin.table.returnColumnValue(data);
                if (option.selectList[value] === undefined || option.selectList[value] === '' || option.selectList[value] === null) {
                    return value;
                } else {
                    return option.selectList[value];
                }
            },
            filePreview: function (data) {
                var mimeName = data.mime_type.split('/')[0];

                if (mimeName == 'image') {
                    return admin.table.image(data);
                } else {

                    var value = admin.table.returnColumnValue(data);

                    var groupName = admin.getExtGroupName(data.file_ext);

                    return '<a href="' + value + '"><img style="height:40px;width:40px" src="/static/admin/images/upload-icons/' + groupName + '.png" /></a>'
                }

            },
            image: function (data) {
                var option = data.LAY_COL;
                option.imageWidth = option.imageWidth || 200;
                option.imageHeight = option.imageHeight || 40;
                option.imageSplit = option.imageSplit || '|';
                option.imageJoin = option.imageJoin || '<br>';
                option.title = option.title || option.field;
                var title = data[option.title];
                var value = admin.table.returnColumnValue(data);
                if (value === undefined || value === null) {
                    return '<img style="max-width: ' + option.imageWidth + 'px; height: ' + option.imageHeight + 'px;" src="' + value + '" data-image="' + title + '">';
                } else {
                    var values = value.split(option.imageSplit),
                        valuesHtml = [];
                    values.forEach((value, index) => {
                        valuesHtml.push('<img style="max-width: ' + option.imageWidth + 'px; height: ' + option.imageHeight + 'px;" src="' + value + '" data-image="' + title + '">');
                    });
                    return valuesHtml.join(option.imageJoin);
                }
            },
            url: function (data) {
                var option = data.LAY_COL;

                var urlNameField = option.urlNameField || '';

                var value = admin.table.returnColumnValue(data);

                if (admin.empty(value)) {
                    return ''
                }

                var urlName = value;

                if (urlNameField != '') {
                    try {
                        var urlNameFieldType = typeof urlNameField;

                        if (urlNameFieldType == 'string') {
                            urlName = data[urlNameField]
                        } else if (urlNameFieldType == 'function') {
                            urlName = urlNameField(data)
                        }

                    } catch (e) {

                    }
                }

                return '<a class="layuimini-table-url" href="' + value + '" target="_blank" class="label bg-green">' + urlName + '</a>';
            },
            switch: function (data) {
                var option = data.LAY_COL;

                if (!admin.checkAuth('modify', option.init.table_elem)) {
                    return admin.table.list(data);
                }

                option.filter = option.filter || option.field || null;
                option.checked = option.checked || 1;
                option.tips = option.tips || '开|关';

                var value = admin.table.returnColumnValue(data);
                var checked = value === option.checked ? 'checked' : '';
                return laytpl('<input type="checkbox" name="' + option.field + '" value="' + data.id + '" lay-skin="switch" lay-text="' + option.tips + '" lay-filter="' + option.filter + '" ' + checked + ' >').render(data);
            },
            price: function (data) {
                var value = admin.table.returnColumnValue(data);
                return '<span>￥' + value + '</span>';
            },
            percent: function (data) {
                var value = admin.table.returnColumnValue(data);
                return '<span>' + value + '%</span>';
            },
            icon: function (data) {
                var value = admin.table.returnColumnValue(data);
                return '<i class="' + value + '"></i>';
            },
            text: function (data) {
                var value = admin.table.returnColumnValue(data);
                return '<span class="line-limit-length">' + value + '</span>';
            },
            value: function (data) {
                var value = admin.table.returnColumnValue(data);
                return '<span>' + value + '</span>';
            },
            //时间戳转日期
            date: function (data) {
                var option = data.LAY_COL;

                value = admin.table.returnColumnValue(data);
                if (!admin.empty(value)) {
                    value = util.toDateString(value * 1000, option.format || 'yyyy-MM-dd HH:mm:ss');
                }
                return '<span>' + value + '</span>';
            },
            bytes: (data) => {
                var size = admin.table.returnColumnValue(data);
                sizeReadable = admin.bytes(size)
                return sizeReadable
            },
            copyText(data) {
                var option = data.LAY_COL;
                var value = admin.table.returnColumnValue(data);
                var copyValue = value;
                var copyText = option.copyText;

                if (typeof copyText === 'function') {
                    copyValue = copyText(value, data);
                }

                return '<span data-toggle="copy-text" data-clipboard-text="' + copyValue + '"><i class="fa fa-copy"></i> ' + value + '</span>';
            },
            // 统一列返回数据处理
            returnColumnValue(data, field, defaultValue) {
                if (!data.LAY_COL) {
                    return '';
                }
                var option = data.LAY_COL;
                field = field || option.field;
                defaultValue = defaultValue || option.defaultValue;
                var valueParser = option.valueParser;
                var value = defaultValue;
                try {
                    value = eval("data." + field);
                } catch (e) {
                    value = undefined;
                }

                if (typeof valueParser == 'function') {
                    value = valueParser(value, data);
                }

                return value;
            },
            listenTableSearch: function (tableId) {
                form.on('submit(' + tableId + '_filter)', function (data) {
                    var dataField = data.field;
                    var formatFilter = {},
                        formatOp = {};
                    $.each(dataField, function (key, val) {
                        if (val !== '') {
                            formatFilter[key] = val;

                            var elemId = admin.table.renderSearchFormItemElementId(key)

                            var op = $('#c-' + elemId).attr('data-search-op');
                            op = op || '%*%';
                            formatOp[key] = op;
                        }
                    });

                    var where = {
                        filter: JSON.stringify(formatFilter),
                        op: JSON.stringify(formatOp)
                    }
                    lastTableWhere[tableId] = where
                    table.reloadData(tableId, {
                        page: {
                            curr: 1
                        }
                        , where: where
                    }, 'data');
                    return false;
                });
            },
            listenSwitch: function (option, ok) {
                option.filter = option.filter || '';
                option.url = option.url || '';
                option.field = option.field || option.filter || '';
                option.tableId = option.tableId || init.table_render_id;
                option.modifyReload = option.modifyReload || false;
                form.on('switch(' + option.filter + ')', function (obj) {
                    var checked = obj.elem.checked ? 1 : 0;
                    if (typeof ok === 'function') {
                        return ok({
                            id: obj.value,
                            checked: checked,
                        });
                    } else {
                        var data = {
                            id: obj.value,
                            field: option.field,
                            value: checked,
                        };
                        admin.request.post({
                            url: option.url,
                            prefix: true,
                            data: data,
                        }, function (res) {
                            if (option.modifyReload) {
                                table.reloadData(option.tableId);
                            }
                        }, function (res) {
                            admin.msg.error(res.msg, function () {
                                table.reloadData(option.tableId);
                            });
                        }, function () {
                            table.reloadData(option.tableId);
                        });
                    }
                });
            },
            listenTableSort(option) {
                //触发排序事件 
                table.on('sort(' + option.layFilter + ')', function (obj) { //注：sort 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"

                    var lastWhere = lastTableWhere[option.id] ?? {};

                    lastWhere.sort = {}
                    lastWhere.sort[obj.field] = obj.type;

                    table.reloadData(option.id, {
                        initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。
                        , where: lastWhere
                    });


                });
            },
            listenToolbar: function (layFilter, tableId) {
                table.on('toolbar(' + layFilter + ')', function (obj) {

                    // 搜索表单的显示
                    switch (obj.event) {
                        case 'TABLE_SEARCH':
                            var searchFieldsetId = 'searchFieldset_' + tableId;
                            var _that = $("#" + searchFieldsetId);
                            if (_that.hasClass("layui-hide")) {
                                _that.removeClass('layui-hide');
                            } else {
                                _that.addClass('layui-hide');
                            }
                            break;
                    }
                });
            },
            listenEdit: function (tableInit, layFilter, tableId, modifyReload) {
                tableInit.modify_url = tableInit.modify_url || false;
                tableId = tableId || init.table_render_id;
                if (tableInit.modify_url !== false) {
                    table.on('edit(' + layFilter + ')', function (obj) {
                        var value = obj.value,
                            data = obj.data,
                            id = data.id,
                            field = obj.field;
                        var _data = {
                            id: id,
                            field: field,
                            value: value,
                        };
                        admin.request.post({
                            url: tableInit.modify_url,
                            prefix: true,
                            data: _data,
                        }, function (res) {
                            if (modifyReload) {
                                table.reloadData(tableId);
                            }
                        }, function (res) {
                            admin.msg.error(res.msg, function () {
                                table.reloadData(tableId);
                            });
                        }, function () {
                            table.reloadData(tableId);
                        });
                    });
                }
            },
            listenTableSelectConfirm(options) {
                $('.select-confirm').click(function () {
                    var checkStatus = table.checkStatus(options.id);

                    if (checkStatus.data.length == 0) {
                        layer.msg('请选择数据');
                        return false;
                    }

                    parent.window[selectConfirmCallback](checkStatus.data);
                })
            },
            listenExport: function (options) {

                var exportFields = {};

                var imageFields = [];

                var selectFields = {};

                var dateFields = [];

                options.cols[0].forEach(col => {
                    if (col.field) {

                        exportFields[col.field] = col.title;

                        options.cols[0].forEach(col => {
                            if (col.field) {

                                exportFields[col.field] = col.title;

                                switch (col.fieldFormat) {
                                    case 'image':
                                        imageFields.push(col.field)
                                        break;

                                    case 'select':
                                        if (Object.keys(col.selectList).length > 0) {
                                            selectFields[col.field] = col.selectList;
                                        }
                                        break;
                                    case 'date':

                                        dateFields.push(col.field)
                                        break;

                                    default:
                                        break;
                                }

                            }
                        });

                    }
                });

                // excel导出
                $('body').on('click', '[data-table-export]', function () {
                    var tableId = $(this).attr('data-table-export'),
                        url = $(this).attr('data-url');

                    var searchVals = form.val(tableId + '_filter_form');

                    var dataField = searchVals;

                    var formatFilter = {},
                        formatOp = {};
                    $.each(dataField, function (key, val) {
                        if (val !== '') {
                            formatFilter[key] = val;

                            var elemId = admin.table.renderSearchFormItemElementId(key)

                            var op = $('#c-' + elemId).attr('data-search-op');
                            op = op || '%*%';
                            formatOp[key] = op;
                        }
                    });

                    var searchQuery = {
                        filter: JSON.stringify(formatFilter),
                        op: JSON.stringify(formatOp),
                        fields: JSON.stringify(exportFields),
                        image_fields: JSON.stringify(imageFields),
                        select_fields: JSON.stringify(selectFields),
                        date_fields: JSON.stringify(dateFields),
                    }

                    var query = $.param(searchQuery);

                    var index = admin.msg.confirm('根据查询进行导出，确定导出？', function () {

                        toUrl = admin.url(url);
                        if (toUrl.indexOf('?') < 0) {
                            toUrl += '?';
                        } else {
                            toUrl += '&'
                        }
                        toUrl += query;

                        window.open(toUrl)

                        layer.close(index);
                    });
                });
            },
            renderSearchFormItemElementId(key) {

                var elemId = key;
                if (key.indexOf('[') == 0) {
                    var keyArr = key.replace('[', '').split(']');

                    elemId = keyArr[0] + '-' + keyArr[1];
                }

                elemId = elemId.replace('.', '-');

                return elemId;
            }
        },
        checkMobile: function () {
            var userAgentInfo = navigator.userAgent;
            var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
            var mobile_flag = false;
            //根据userAgent判断是否是手机
            for (var v = 0; v < mobileAgents.length; v++) {
                if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
                    mobile_flag = true;
                    break;
                }
            }
            var screen_width = window.screen.width;
            var screen_height = window.screen.height;
            //根据屏幕分辨率判断是否是手机
            if (screen_width < 600 && screen_height < 800) {
                mobile_flag = true;
            }
            return mobile_flag;
        },
        open: function (title, url, width, height, isResize, shadeClose = false) {
            isResize = isResize === undefined ? true : isResize;
            var index = layer.open({
                title: title,
                type: 2,
                area: [width, height],
                content: url,
                maxmin: true,
                moveOut: true,
                shadeClose: shadeClose,
                success: function (layero, index) {
                    var body = layer.getChildFrame('body', index);
                    if (body.length > 0) {
                        $.each(body, function (i, v) {

                            // todo 优化弹出层背景色修改
                            $(v).before('<style>\n' +
                                'html, body {\n' +
                                '    background: #ffffff;\n' +
                                '}\n' +
                                '</style>');
                        });
                    }
                },
                end: function () {
                    index = null
                }
            });
            if (admin.checkMobile() || width === undefined || height === undefined) {
                layer.full(index);
            }
            if (isResize) {
                $(window).on("resize", function () {
                    index && layer.full(index);
                })
            }
        },
        listen: function (preposeCallback, ok, no, ex) {

            // 监听表单是否为必填项
            admin.api.formRequired();

            // 监听表单提交事件
            admin.api.formSubmit(preposeCallback, ok, no, ex);

            // 监听按钮操作
            admin.api.button();

            // 初始化图片显示以及监听上传事件
            admin.api.upload();

            // 监听富文本初始化
            admin.api.editor();

            // 监听下拉选择生成
            admin.api.select();

            // 监听时间控件生成
            admin.api.date();

            // 监听通用表格数据控件生成
            admin.api.tableData();

            // 监听标签输入控件生成
            admin.api.tagInput();
            // 监听属性输入控件生成
            admin.api.propertyInput();

            // 监听点击复制
            admin.api.copyText();

            // 监听tab操作
            miniTab.listen();

            // 初始化layui表单
            form.render();

            // 表格修改
            $("body").on("mouseenter", ".table-edit-tips", function () {
                var openTips = layer.tips('点击行内容可以进行修改', $(this), { tips: [2, '#e74c3c'], time: 4000 });
            });

            // 监听弹出层的打开
            $('body').on('click', '[data-open]', function () {

                var clienWidth = $(this).attr('data-width'),
                    clientHeight = $(this).attr('data-height'),
                    dataFull = $(this).attr('data-full'),
                    checkbox = $(this).attr('data-checkbox'),
                    url = $(this).attr('data-open'),
                    external = $(this).attr('data-external') || false,
                    tableId = $(this).attr('data-table');

                if (checkbox === 'true') {
                    tableId = tableId || init.table_render_id;
                    var checkStatus = table.checkStatus(tableId),
                        data = checkStatus.data;
                    if (data.length <= 0) {
                        admin.msg.error('请勾选需要操作的数据');
                        return false;
                    }
                    var ids = [];
                    $.each(data, function (i, v) {
                        ids.push(v.id);
                    });
                    if (url.indexOf("?") === -1) {
                        url += '?id=' + ids.join(',');
                    } else {
                        url += '&id=' + ids.join(',');
                    }
                }

                if (clienWidth === undefined || clientHeight === undefined) {
                    var width = document.body.clientWidth,
                        height = document.body.clientHeight;
                    if (width >= 800 && height >= 600) {
                        clienWidth = '800px';
                        clientHeight = '600px';
                    } else {
                        clienWidth = '100%';
                        clientHeight = '100%';
                    }
                }
                if (dataFull === 'true') {
                    clienWidth = '100%';
                    clientHeight = '100%';
                }

                admin.open(
                    $(this).attr('data-title'),
                    external ? url : admin.url(url),
                    clienWidth,
                    clientHeight,
                );
            });

            // 放大图片
            $('body').on('click', '[data-image]', function () {
                var title = $(this).attr('data-image'),
                    src = $(this).attr('src'),
                    alt = $(this).attr('alt');
                var photos = {
                    "title": title,
                    "id": Math.random(),
                    "data": [
                        {
                            "alt": alt,
                            "pid": Math.random(),
                            "src": src,
                            "thumb": src
                        }
                    ]
                };
                layer.photos({
                    photos: photos,
                    anim: 5
                });
                return false;
            });

            // 放大一组图片
            $('body').on('click', '[data-images]', function () {
                var doms = $(this).closest(".layuimini-upload-show").children("li"),  // 从当前元素向上找layuimini-upload-show找到第一个后停止, 再找其所有子元素li
                    currentSrc = $(this).attr('src'), // 被点击的图片地址
                    start = 0,
                    data = [];
                $.each(doms, function (key, value) {
                    var img = $(value).find('img'),
                        src = img.attr('src'),
                        alt = img.attr('alt');
                    data.push({
                        "alt": alt,
                        "pid": Math.random(),
                        "src": src,
                        "thumb": src
                    });
                    if (src === currentSrc) {
                        start = key;
                    }
                });
                var photos = {
                    "title": '',
                    "start": start,
                    "id": Math.random(),
                    "data": data,
                };

                layer.photos({
                    photos: photos,
                    anim: 5
                });
                return false;
            });


            // 监听动态表格刷新
            $('body').on('click', '[data-table-refresh]', function () {
                var tableId = $(this).attr('data-table-refresh');
                if (tableId === undefined || tableId === '' || tableId == null) {
                    tableId = init.table_render_id;
                }
                table.reloadData(tableId);
            });

            // 监听搜索表格重置
            $('body').on('click', '[data-table-reset]', function () {
                var tableId = $(this).attr('data-table-reset');
                if (tableId === undefined || tableId === '' || tableId == null) {
                    tableId = init.table_render_id;
                }
                var where = {
                    filter: '{}',
                    op: '{}'
                };
                table.reloadData(tableId, {
                    page: {
                        curr: 1
                    }
                    , where: where
                }, 'data');
            });

            // 监听请求
            $('body').on('click', '[data-request]', function () {
                var title = $(this).attr('data-title'),
                    url = $(this).attr('data-request'),
                    tableId = $(this).attr('data-table'),
                    checkbox = $(this).attr('data-checkbox'),
                    direct = $(this).attr('data-direct'),
                    field = $(this).attr('data-field') || 'id',
                    endMethod = $(this).attr('data-end-method') || 'reload-table';

                title = title || '确定进行该操作？';

                if (direct === 'true') {
                    admin.msg.confirm(title, function () {
                        window.location.href = url;
                    });
                    return false;
                }

                var postData = {};
                if (checkbox === 'true') {
                    tableId = tableId || init.table_render_id;
                    var checkStatus = table.checkStatus(tableId),
                        data = checkStatus.data;
                    if (data.length <= 0) {
                        admin.msg.error('请勾选需要操作的数据');
                        return false;
                    }
                    var ids = [];
                    $.each(data, function (i, v) {
                        ids.push(v[field]);
                    });
                    postData[field] = ids;
                }

                url = admin.url(url);

                admin.msg.confirm(title, function () {
                    admin.request.post({
                        url: url,
                        data: postData,
                    }, function (res) {
                        admin.msg.success(res.msg, function () {
                            if (endMethod == 'reload-table') {
                                tableId = tableId || init.table_render_id;
                                table.reloadData(tableId);
                            } else if (endMethod == 'refresh-page') {
                                location.reload();
                            }
                        });
                    })
                });
                return false;
            });



            // 数据表格多删除
            $('body').on('click', '[data-table-delete]', function () {
                var tableId = $(this).attr('data-table-delete'),
                    url = $(this).attr('data-url');
                tableId = tableId || init.table_render_id;
                url = url !== undefined ? admin.url(url) : window.location.href;
                var checkStatus = table.checkStatus(tableId),
                    data = checkStatus.data;
                if (data.length <= 0) {
                    admin.msg.error('请勾选需要删除的数据');
                    return false;
                }
                var ids = [];
                $.each(data, function (i, v) {
                    ids.push(v.id);
                });
                admin.msg.confirm('确定删除？', function () {
                    admin.request.post({
                        url: url,
                        data: {
                            id: ids
                        },
                    }, function (res) {
                        admin.msg.success(res.msg, function () {
                            table.reloadData(tableId);
                        });
                    });
                });
                return false;
            });

        },
        api: {
            button: function () {
                $('button[target="_blank"]').click(function () {
                    window.open(admin.url($(this).attr('href')))
                })
            },
            form: function (url, data, ok, no, ex, refreshTable) {
                if (refreshTable === undefined) {
                    refreshTable = true;
                }
                ok = ok || function (res) {
                    res.msg = res.msg || '';
                    admin.msg.success(res.msg, function () {
                        admin.api.closeCurrentOpen({
                            refreshTable: refreshTable
                        });
                    });
                    return false;
                };
                admin.request.post({
                    url: url,
                    data: data,
                }, ok, no, ex);
                return false;
            },
            closeCurrentOpen: function (option) {
                option = option || {};
                option.refreshTable = option.refreshTable || false;
                option.refreshFrame = option.refreshFrame || false;
                if (option.refreshTable === true) {
                    option.refreshTable = init.table_render_id;
                }
                var index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
                if (option.refreshTable !== false) {
                    parent.layui.table.reloadData(option.refreshTable);
                }
                if (option.refreshFrame) {
                    parent.location.reload();
                }
                return false;
            },
            refreshFrame: function () {
                parent.location.reload();
                return false;
            },
            refreshTable: function (tableName, mode) {
                tableName = tableName || 'currentTableRenderId';
                if (mode == 'table') {
                    table.reload(tableName);
                } else {
                    table.reloadData(tableName);
                }
            },
            // var options = {
            //     url :'system.menu/index?id=1'
            // }
            // ea.api.reloadTable('currentTableRenderId',options)
            reloadTable: function (tableName, options, mode) {
                tableName = tableName || 'currentTableRenderId';
                if (mode == 'table') {
                    table.reload(tableName, options);
                } else {
                    table.reloadData(tableName, options);
                }
            },
            formRequired: function () {
                var verifyList = document.querySelectorAll("[lay-verify]");
                if (verifyList.length > 0) {
                    $.each(verifyList, function (i, v) {
                        var verify = $(this).attr('lay-verify');

                        // todo 必填项处理
                        if (verify.includes('required')) {
                            var label = $(this).parent().prev();
                            if (label.is('label') && !label.hasClass('required')) {
                                label.addClass('required');
                            }
                            if ($(this).attr('lay-reqtext') === undefined && $(this).attr('placeholder') !== undefined) {
                                $(this).attr('lay-reqtext', $(this).attr('placeholder'));
                            }
                            if ($(this).attr('placeholder') === undefined && $(this).attr('lay-reqtext') !== undefined) {
                                $(this).attr('placeholder', $(this).attr('lay-reqtext'));
                            }
                        }

                    });
                }
            },
            formSubmit: function (preposeCallback, ok, no, ex) {
                var formList = document.querySelectorAll("[lay-submit]");

                // 表单提交自动处理
                if (formList.length > 0) {
                    $.each(formList, function (i, v) {
                        var filter = $(this).attr('lay-filter'),
                            type = $(this).attr('data-type'),
                            refresh = $(this).attr('data-refresh'),
                            url = $(this).attr('lay-submit');
                        // 表格搜索不做自动提交
                        if (type === 'tableSearch') {
                            return false;
                        }
                        // 判断是否需要刷新表格
                        if (refresh === 'false') {
                            refresh = false;
                        } else {
                            refresh = true;
                        }
                        // 自动添加layui事件过滤器
                        if (filter === undefined || filter === '') {
                            filter = 'save_form_' + (i + 1);
                            $(this).attr('lay-filter', filter)
                        }
                        if (url === undefined || url === '' || url === null) {
                            url = window.location.href;
                        } else {
                            url = admin.url(url);
                        }
                        form.on('submit(' + filter + ')', function (data) {
                            var dataField = data.field;

                            dataField = admin.api.formSubmitEditor(dataField, v)

                            dataField = admin.api.formSubmitCity(dataField, v)

                            if (typeof preposeCallback === 'function') {
                                dataField = preposeCallback(dataField);
                            }
                            admin.api.form(url, dataField, ok, no, ex, refresh);

                            return false;
                        });
                    });
                }

            },
            formSubmitEditor(dataField, form) {
                // 富文本数据处理
                var editorList = $(form).closest('.layui-form').find('.editor')
                if (editorList.length > 0) {
                    $.each(editorList, function (i, v) {
                        var name = $(this).attr("name");
                        dataField[name] = CKEDITOR.instances[name].getData();
                    });
                }

                return dataField;
            },

            formSubmitCity(dataField, form) {

                var cityList = $(form).closest('.layui-form').find('[data-toggle="city-picker"]');

                if (cityList.length > 0) {
                    $.each(cityList, function (i, v) {

                        var fieldName = $(v).attr('name');
                        var code = $(v).data('citypicker').getCode();
                        var text = $(v).data('citypicker').getVal();
                        var level = $(v).data('level');
                        var formatTargetList = {};

                        formatTargetList['name'] = 1;
                        formatTargetList['code'] = 1;
                        formatTargetList['name-province'] = 1;
                        formatTargetList['name-city'] = 1;
                        formatTargetList['name-district'] = 1;
                        formatTargetList['code-province'] = 1;
                        formatTargetList['code-city'] = 1;
                        formatTargetList['code-district'] = 1;


                        $.each(formatTargetList, function (targetType, value) {

                            var valueSet = $(v).data('field-' + targetType);

                            if (valueSet == 0) {
                                formatTargetList[targetType] = 0;
                            }

                        })

                        var codeArr = code.split('/')
                        var textArr = text.split('/');

                        if (formatTargetList['name'] == 1) {
                            dataField[fieldName] = text;
                        }
                        if (formatTargetList['code'] == 1) {
                            dataField[fieldName + '_code'] = code;
                        }
                        if (formatTargetList['name-province'] == 1) {
                            dataField[fieldName + '_name_province'] = textArr[0] || '';
                        }
                        if (formatTargetList['name-city'] == 1) {
                            dataField[fieldName + '_name_city'] = textArr[1] || '';
                        }
                        if (formatTargetList['name-district'] == 1) {
                            dataField[fieldName + '_name_district'] = textArr[2] || '';
                        }
                        if (formatTargetList['code-province'] == 1) {
                            dataField[fieldName + '_code_province'] = codeArr[0] || '';
                        }
                        if (formatTargetList['code-city'] == 1) {
                            dataField[fieldName + '_code_city'] = codeArr[1] || '';
                        }
                        if (formatTargetList['code-district'] == 1) {
                            dataField[fieldName + '_code_district'] = codeArr[2] || '';
                        }

                    })
                }
                return dataField
            },
            upload: function () {
                var uploadList = document.querySelectorAll("[data-upload]");
                var uploadSelectList = document.querySelectorAll("[data-upload-select]");

                if (uploadList.length > 0) {
                    $.each(uploadList, function (i, v) {
                        var uploadExts = $(this).attr('data-upload-exts'),
                            uploadName = $(this).attr('data-upload'),
                            uploadNumber = $(this).attr('data-upload-number') || 'one',
                            uploadSign = $(this).attr('data-upload-sign') || '|',
                            uploadAccept = $(this).attr('data-upload-accept') || 'file',
                            uploadAcceptMime = $(this).attr('data-upload-mimetype') || '',
                            uploadDisablePreview = $(this).attr('data-upload-disable-preview') || '0',
                            uploadFilenameField = $(this).attr('data-upload-filename-field') || '',
                            elem = "input[name='" + uploadName + "']",

                            uploadElem = this;
                        if (uploadFilenameField) {
                            var elemFilenameField = "input[name='" + uploadFilenameField + "']";
                        }
                        if (uploadExts == '*') {
                            uploadExts = init.upload_exts;
                        } else if (uploadExts.charAt(0) == '*') {
                            var extGroupName = uploadExts.slice(1);
                            if (extGroup[extGroupName]) {
                                uploadExts = extGroup[extGroupName].join('|');
                            }
                        }

                        // 监听上传事件
                        upload.render({
                            elem: this,
                            url: admin.url(init.upload_url),
                            exts: uploadExts,
                            accept: uploadAccept,//指定允许上传时校验的文件类型
                            acceptMime: uploadAcceptMime,//规定打开文件选择框时，筛选出的文件类型
                            multiple: uploadNumber !== 'one',//是否多文件上传
                            headers: admin.headers(),
                            done: function (res) {
                                if (res.code === 1) {
                                    var url = res.data.url;
                                    var filename = res.data.original_name;
                                    if (uploadNumber !== 'one') {
                                        var oldUrl = $(elem).val();
                                        if (oldUrl !== '') {
                                            url = oldUrl + uploadSign + url;
                                        }
                                        if (elemFilenameField) {
                                            var oldFilename = $(elemFilenameField).val();
                                            if (oldFilename !== '') {
                                                filename = oldFilename + uploadSign + filename;
                                            }

                                        }
                                    }
                                    if (elemFilenameField) {
                                        $(elemFilenameField).val(filename);
                                    }
                                    $(elem).val(url);
                                    $(elem).trigger("input");
                                    admin.msg.success(res.msg);
                                } else {
                                    admin.msg.error(res.msg);
                                }
                                return false;
                            }
                        });

                        if (uploadDisablePreview == 0) {
                            // 监听上传input值变化
                            $(elem).bind("input propertychange", function (event) {
                                var urlString = $(this).val(),
                                    urlArray = urlString.split(uploadSign),
                                    uploadIcon = $(uploadElem).attr('data-upload-icon') || "file";

                                $('#bing-' + uploadName).remove();
                                if (urlString.length > 0) {
                                    var parant = $(this).parent('div');
                                    var liHtml = '';
                                    $.each(urlArray, function (i, v) {

                                        // 获取链接扩展名
                                        var ext = v.substr(v.lastIndexOf('.') + 1);

                                        if (extGroup.image.indexOf(ext) != -1) {
                                            // 是图片
                                            liHtml += '<li><a title="点击预览"><img src="' + v + '" data-images  onerror="this.src=\'' + BASE_URL + 'admin/images/upload-icons/' + uploadIcon + '.png\';this.onerror=null"></a><small class="uploads-delete-tip bg-red badge" data-upload-delete="' + uploadName + '" data-upload-filename-field="'+uploadFilenameField+'" data-upload-url="' + v + '" data-upload-sign="' + uploadSign + '">×</small></li>\n';

                                        } else {
                                            // 不是图片
                                            // 遍历extGroup数组找到扩展名所在的索引

                                            uploadIcon = admin.getExtGroupName(ext);

                                            liHtml += '<li><a title="点击打开文件" target="_blank" href="' + v + '" ><img src="/static/admin/images/upload-icons/' + uploadIcon + '.png"></a><small class="uploads-delete-tip bg-red badge" data-upload-delete="' + uploadName + '" data-upload-filename-field="'+uploadFilenameField+'" data-upload-url="' + v + '" data-upload-sign="' + uploadSign + '">×</small></li>\n';

                                        }

                                    });
                                    parant.after('<ul id="bing-' + uploadName + '" class="layui-input-block layuimini-upload-show">\n' + liHtml + '</ul>');
                                }

                            });

                            // 非空初始化图片显示
                            if ($(elem).val() !== '') {
                                $(elem).trigger("input");
                            }
                        }

                    });

                    // 监听上传文件的删除事件
                    $('body').on('click', '[data-upload-delete]', function () {
                        var uploadName = $(this).attr('data-upload-delete'),
                            deleteUrl = $(this).attr('data-upload-url'),
                            uploadFilenameField = $(this).attr('data-upload-filename-field'),
                            sign = $(this).attr('data-upload-sign');
                        var confirm = admin.msg.confirm('确定删除？', function () {
                            var elem = "input[name='" + uploadName + "']";
                            var elemFilenameField = "input[name='" + uploadFilenameField + "']";
                            var currentUrl = $(elem).val();
                            var currentFilename = $(elemFilenameField).val();

                            var currentUrlList = currentUrl.split(sign);
                            var deleteIndex = currentUrlList.indexOf(deleteUrl);

                            currentUrlList.splice(deleteIndex, 1)
                            $(elem).val(currentUrlList.join(sign));
                            $(elem).trigger("input");

                            if (currentFilename) {

                                var currentFilenameList = currentFilename.split(sign);
                                currentFilenameList.splice(deleteIndex, 1)

                                $(elemFilenameField).val(currentFilenameList.join(sign));
                            }

                            admin.msg.close(confirm);
                        });
                        return false;
                    });
                }

                if (uploadSelectList.length > 0) {
                    $.each(uploadSelectList, function (i, v) {
                        var uploadName = $(this).attr('data-upload-select'),
                            uploadNumber = $(this).attr('data-upload-number') || 'one',
                            uploadSign = $(this).attr('data-upload-sign') || '|';
                        uploadFilenameField = $(this).attr('data-upload-filename-field') || '';

                        if (uploadFilenameField) {
                            var elemFilenameField = "input[name='" + uploadFilenameField + "']";
                        }

                        var selectCheck = uploadNumber === 'one' ? 'radio' : 'checkbox';
                        var elem = "input[name='" + uploadName + "']",
                            uploadElem = $(this).attr('id');

                        tableSelect.render({
                            elem: "#" + uploadElem,
                            checkedKey: 'id',
                            searchType: 'more',
                            searchList: [
                                { searchKey: 'title', searchPlaceholder: '请输入文件名' },
                            ],
                            table: {
                                url: admin.url('ajax/getUploadFiles'),
                                cols: [[
                                    { type: selectCheck },
                                    { field: 'id', title: 'ID' },
                                    { field: 'url', minWidth: 80, search: false, title: '图片信息', imageHeight: 40, align: "center", templet: admin.table.filePreview },
                                    { field: 'original_name', width: 150, title: '文件原名', align: "center" },
                                    { field: 'mime_type', width: 120, title: 'mime类型', align: "center" },
                                    { field: 'create_time', width: 200, title: '创建时间', align: "center", search: 'range' },
                                ]]
                            },
                            done: function (e, data) {
                                var urlArray = [];
                                var filenameArray = [];
                                $.each(data.data, function (index, val) {
                                    urlArray.push(val.url)
                                    filenameArray.push(val.original_name)
                                });
                                var url = urlArray.join(uploadSign);
                                var filename = filenameArray.join(uploadSign);
                                admin.msg.success('选择成功', function () {
                                    $(elem).val(url);
                                    if (uploadFilenameField) {
                                        $(elemFilenameField).val(filename);
                                    }
                                    $(elem).trigger("input");
                                });
                            }
                        })

                    });

                }
            },
            editor: function () {
                CKEDITOR.tools.setCookie('ckCsrfToken', window.CONFIG.CSRF_TOKEN);

                var editorList = document.querySelectorAll(".editor");
                if (editorList.length > 0) {
                    $.each(editorList, function (i, v) {
                        CKEDITOR.replace(
                            $(this).attr("name"),
                            {
                                height: $(this).height(),
                                filebrowserImageUploadUrl: admin.url('ajax/uploadEditor'),
                            });
                    });
                }
            },
            select: function () {

                var selectList = document.querySelectorAll("[data-select]");
                $.each(selectList, function (i, v) {
                    var url = $(this).attr('data-select'),
                        selectFields = $(this).attr('data-fields'),
                        value = $(this).attr('data-value'),
                        that = this,
                        html = '<option value=""></option>';

                    var template = $(that).data('template');

                    if (typeof template != 'function') {
                        template = function (data, fields) {
                            return data[fields[1]];
                        }
                    }

                    var fields = selectFields.replace(/\s/g, "").split(',');
                    if (fields.length < 2) {
                        return admin.msg.error('下拉选择字段有误');
                    }
                    admin.request.get(
                        {
                            url: url,
                            data: {
                                selectFields: selectFields
                            },
                        }, function (res) {
                            var list = res.data;



                            list.forEach(val => {
                                var key = val[fields[0]];

                                var valueTitle = template(val, fields);

                                if (value !== undefined && key.toString() === value) {
                                    html += '<option value="' + key + '" selected="">' + valueTitle + '</option>';
                                } else {
                                    html += '<option value="' + key + '">' + valueTitle + '</option>';
                                }
                            });
                            $(that).html(html);
                            form.render();
                        }
                    );
                });
            },
            date: function () {
                var dateList = document.querySelectorAll("[data-date]");
                if (dateList.length > 0) {
                    $.each(dateList, function (i, v) {
                        var format = $(this).attr('data-date'),
                            type = $(this).attr('data-date-type'),
                            range = $(this).attr('data-date-range');
                        if (type === undefined || type === '' || type === null) {
                            type = 'datetime';
                        }
                        var options = {
                            elem: this,
                            type: type,
                        };
                        if (format !== undefined && format !== '' && format !== null) {
                            options['format'] = format;
                        }
                        if (range !== undefined) {
                            if (range === null || range === '') {
                                range = '-';
                            }
                            options['range'] = range;
                        }
                        laydate.render(options);
                    });
                }
            },
            tableData() {
                var tableList = document.querySelectorAll('[data-toggle="table-data"]');
                $.each(tableList, function (i, v) {
                    var data = $(v).data()
                    tableData.render(v, data, admin);
                });

            },
            tagInput() {
                var list = document.querySelectorAll('[data-toggle="tag-input"]');
                $.each(list, function (i, v) {
                    var data = $(v).data()
                    tagInput.render(v, data, admin);
                });

            },
            propertyInput() {
                var list = document.querySelectorAll('[data-toggle="property-input"]');
                $.each(list, function (i, v) {
                    var data = $(v).data()
                    data.value = $(v).text()

                    propertyInput.render(v, data, admin);
                });

            },
            copyText(elem) {
                if (elem == undefined) {
                    elem = 'body'
                }
                var list = $(elem).find('[data-toggle="copy-text"]');

                $.each(list, function (i, v) {

                    if ($(v).hasClass('copy-rendered')) {
                        return false;
                    }

                    $(v).addClass('copy-rendered');
                    var clipboard = new ClipboardJS(v);

                    clipboard.on('success', function (e) {
                        admin.msg.success('复制成功')
                    });

                    clipboard.on('error', function (e) {
                        admin.msg.error('复制失败')

                    });
                });
            }
        },
        getQueryVariable(variable, defaultValue) {
            if (typeof defaultValue == 'undefined') {
                defaultValue = undefined;
            }

            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) { return decodeURIComponent(pair[1]); }
            }
            return defaultValue;
        },
        dataBrage: null,
        getDataBrage(keys, defaultValue) {
            if (this.dataBrage == null) {
                this.dataBrage = JSON.parse($('#data-brage').text());
            }

            if (typeof defaultValue == 'undefined') {
                defaultValue = undefined;
            }

            return (
                (!Array.isArray(keys)
                    ? keys.replace(/\[/g, '.').replace(/\]/g, '').split('.')
                    : keys
                ).reduce((o, k) => (o || {})[k], this.dataBrage) || defaultValue
            );

        },
        getExtGroupName(ext) {
            var groupName = 'file';
            for (const extGroupName in extGroup) {
                if (Object.hasOwnProperty.call(extGroup, extGroupName)) {
                    const extGroupList = extGroup[extGroupName];
                    if (extGroupList.indexOf(ext) != -1) {
                        groupName = extGroupName;
                        break;
                    }
                }
            }

            return groupName;
        },
        //js版empty，判断变量是否为空
        empty: function (r) {
            var n, t, e, f = [void 0, null, !1, 0, "", "0"];
            for (t = 0, e = f.length; t < e; t++) if (r === f[t]) return !0;
            if ("object" == typeof r) {
                for (n in r) if (r.hasOwnProperty(n)) return !1;
                return !0
            }
            return !1
        },

        bytes(size) {
            if (size > 0) {
                const kb = 1024
                const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
                const i = Math.floor(Math.log(size) / Math.log(kb))
                const num = (size / Math.pow(kb, i)).toPrecision(3)
                const u = unit[i]
                return num + u;
            }
            return '0B';
        }

    };
    return admin;
});

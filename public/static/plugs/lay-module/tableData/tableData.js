define(['jquery', 'vue'], function ($, Vue) {
    const tableDataCss = '/static/plugs/lay-module/tableData/tableData.css';
    const tableDataHtml = '/static/plugs/lay-module/tableData/tableData.html';

    var tableData = function () {
        var cssElement = document.createElement('link');

        cssElement.setAttribute('rel', 'stylesheet');

        cssElement.setAttribute('href', tableDataCss);

        document.body.appendChild(cssElement);
    };
    var tableDataTemplate = '';

    $.ajax({
        type: "get",
        url: tableDataHtml,
        cache: true,
        async: false,
        success: function (template) {
            tableDataTemplate = template;
        }

    });

    tableData.prototype.render = function (elem, data) {
        var app;
        var clienWidth, clientHeight;
        var width = document.body.clientWidth,
            height = document.body.clientHeight;
        if (width >= 800 && height >= 600) {
            clienWidth = '800px';
            clientHeight = '600px';
        } else {
            clienWidth = '100%';
            clientHeight = '100%';
        }

        var defaultOption = {
            width: clienWidth,
            height: clientHeight,
            placeholder: '请选择',
            selectConfirmCallback: 'onTableDataConfirm',
        }

        var options = $.extend(defaultOption, data);

        var valueField = options.valueField;

        if (options.index.indexOf('?') > -1) {
            options.index += '&'
        } else {
            options.index += '?'
        }

        options.index += 'select_mode=' + options.selectType

        app = new Vue({
            el: elem,
            data() {
                return {
                    setting: options,
                    listSelected: [],
                    value: ''
                }
            },
            watch: {
                listSelected(value) {

                    var valueList = value.map(itemValue => itemValue[valueField])

                    this.value = valueList.join(',')
                }
            },
            created() {
                this.value = options.selectValue;
                if (typeof this.value != 'string') {
                    this.value = this.value.toString();
                }
                var valueLength = this.value.split(',').length;
                loading.show();
                $.get(options.index, {
                    page: 1,
                    limit: valueLength,
                    filter: JSON.stringify({ [options.valueField]: this.value }),
                    op: JSON.stringify({ [options.valueField]: 'in' }),
                    group: options.valueField
                }, (result) => {
                    loading.hide()
                    this.listSelected = result.data;
                })

            },
            mounted() {
                if (options.required == 1) {
                    $(this.$refs['tableData']).closest('.layui-form-item').children('.layui-form-label').addClass('required');
                }
            },
            template: tableDataTemplate,

            methods: {
                openSelectPage() {

                    if(options.readonly == 1){
                        return false;
                    }

                    var selectedIds = this.listSelected.map(item => item.id);

                    var index = layer.open({
                        title: '选择数据',
                        type: 2,
                        area: [options.width, options.height],
                        content: options.index + '&selectedIds=' + selectedIds.join(','),
                        maxmin: true,
                        moveOut: true,
                        shadeClose: true,
                        success: (layero, index) => {
                            window[options.selectConfirmCallback] = (data) => {
                                data.forEach(dataItem => {

                                    if (options.selectType == 'radio') {
                                        this.listSelected = [];
                                    }

                                    var itemFind = this.listSelected.find(itemSelect => itemSelect[valueField] == dataItem[valueField])

                                    if (itemFind == undefined) {
                                        this.listSelected.push(dataItem)
                                    }


                                });
                                this.$forceUpdate();
                                layer.close(index);
                            }

                        },
                        end: function () {
                            index = null;
                            window[options.selectConfirmCallback] = undefined;
                        }
                    });

                },
                removeItem(item, index) {
                    this.listSelected.splice(index, 1);
                }
            }
        })

        return app;
    }

    return new tableData();
})
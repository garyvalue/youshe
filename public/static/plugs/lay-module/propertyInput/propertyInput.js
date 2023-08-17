define(['jquery', 'vue'], function ($, Vue) {
    const propertyInputCss = '/static/plugs/lay-module/propertyInput/propertyInput.css';
    const propertyInputHtml = '/static/plugs/lay-module/propertyInput/propertyInput.html';

    var propertyInput = function () {
        var cssElement = document.createElement('link');

        cssElement.setAttribute('rel', 'stylesheet');

        cssElement.setAttribute('href', propertyInputCss);

        document.body.appendChild(cssElement);
    };
    var propertyInputTemplate = '';

    $.ajax({
        type: "get",
        url: propertyInputHtml,
        cache: true,
        async: false,
        success: function (template) {
            propertyInputTemplate = template;
        }

    });

    propertyInput.prototype.render = function (elem, data) {

        var defaultOption = {
            placeholder: '请选择',
            required: ''
        }

        var options = $.extend(defaultOption, data);

        options.value = $.trim(options.value)


        app = new Vue({
            el: elem,
            data() {
                return {
                    setting: options,
                    value: '',
                    listItem: [
                        {
                            name: '',
                            value: ''
                        }
                    ]
                }
            },
            watch: {
                listItem: {
                    handler(newValue, oldValue) {
                        // 在这里标记页面编辑状态
                        this.value = JSON.stringify(newValue);
                    },
                    // 通过指定deep属性为true, watch会监听对象里面每一个值的变化
                    deep: true
                }
            },

            created() {
                if (this.setting.value) {
                    if(typeof this.setting.value === 'string'){
                        this.setting.value = JSON.parse(this.setting.value);
                    }
                    this.listItem = this.setting.value;
                    this.value = this.setting.value;
                }

            },
            mounted() {
                if (options.required == 1) {
                    $(this.$refs['propertyInput']).closest('.layui-form-item').children('.layui-form-label').addClass('required');
                }
            },
            template: propertyInputTemplate,

            methods: {

                removeItem(item, index) {
                    this.listTag.splice(index, 1)
                },
                onAddItem() {
                    this.listItem.push({
                        name: '',
                        value: ''
                    })
                },
                onItemNameChange(item, index, event) {
                    this.listItem[index].name = event.target.value;
                },
                onItemValueChange(item, index, event) {

                    this.listItem[index].value = event.target.value;
                },
                onItemMoveUp(item, index) {
                    var arr = this.listItem;
                    if (index != 0) {
                        arr[index] = arr.splice(index - 1, 1, arr[index])[0]
                    } else {
                        arr.push(arr.shift())
                    }
                },
                onItemMoveDown(item, index) {
                    var arr = this.listItem;
                    if (index != arr.length - 1) {
                        arr[index] = arr.splice(index + 1, 1, arr[index])[0]
                    } else {
                        arr.unshift(arr.splice(index, 1)[0])
                    }

                },
                onItemDelete(item, index) {
                    if (this.listItem.length <= 1) {
                        this.listItem = [
                            {
                                name: '',
                                value: ''
                            }
                        ]
                    } else {
                        this.listItem.splice(index, 1)
                    }
                },
            }
        })

        return app;
    }

    return new propertyInput();
})
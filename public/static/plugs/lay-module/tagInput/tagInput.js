define(['jquery', 'vue'], function ($, Vue) {
    const tagInputCss = '/static/plugs/lay-module/tagInput/tagInput.css';
    const tagInputHtml = '/static/plugs/lay-module/tagInput/tagInput.html';

    var tagInput = function () {
        var cssElement = document.createElement('link');

        cssElement.setAttribute('rel', 'stylesheet');

        cssElement.setAttribute('href', tagInputCss);

        document.body.appendChild(cssElement);
    };
    var tagInputTemplate = '';

    $.ajax({
        type: "get",
        url: tagInputHtml,
        cache: true,
        async: false,
        success: function (template) {
            tagInputTemplate = template;
        }

    });

    tagInput.prototype.render = function (elem, data) {

        var defaultOption = {
            placeholder: '请选择',
            required: ''
        }

        var options = $.extend(defaultOption, data);



        app = new Vue({
            el: elem,
            data() {
                return {
                    setting: options,
                    value: '',
                    inputValue: '',
                    inputWidth: 100,
                    inputValuePreview: '',
                    listTag: []
                }
            },
            watch: {
                inputValue(value) {

                    this.inputValuePreview = value;
                    this.updateInputWidth()
                },
                listTag(value) {
                    this.value = value.join(',')
                }
            },
            created() {
                if (options.value.length > 0) {
                    this.listTag = options.value.split(',')

                }

            },
            mounted() {
                if (options.required == 1) {
                    $(this.$refs['tagInput']).closest('.layui-form-item').children('.layui-form-label').addClass('required');
                }
            },
            template: tagInputTemplate,

            methods: {
                onInputConfirm(e) {

                    if (e) e.preventDefault();

                    if ($.trim(this.inputValue).length == 0) {
                        return false;
                    }

                    this.listTag.push(this.inputValue)
                    this.inputValue = '';
                    return false;
                },
                onContainerClick() {
                    $(this.$refs['tagInputMain']).focus()
                },
                onInputChange(e) {

                    var cvalue = $(e.target).val();
                    this.inputValuePreview = cvalue;

                },
                updateInputWidth() {
                    var width = $(this.$refs['preshow']).width();

                    if (width < 100) {
                        width = 100;
                    }
                    this.inputWidth = width + 60;
                },
                removeItem(item, index) {
                    this.listTag.splice(index, 1)
                }
            }
        })

        return app;
    }

    return new tagInput();
})
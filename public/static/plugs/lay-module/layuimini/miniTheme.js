/**
 * date:2020/02/28
 * author:Mr.Chung
 * version:2.0
 * description:layuimini tab框架扩展
 */
define(["jquery"], function ($) {
    var $ = layui.$,
        layer = layui.layer;

    var miniTheme = {

        /**
         * 主题配置项
         * @param bgcolorId
         * @returns {{headerLogo, menuLeftHover, headerRight, menuLeft, headerRightThis, menuLeftThis}|*|*[]}
         */
        config: function (bgcolorId) {
            var bgColorConfig = [
                {
                    headerRightBg: '#ffffff', //头部右侧背景色
                    headerRightBgThis: '#e4e4e4', //头部右侧选中背景色,
                    headerRightColor: 'rgba(107, 107, 107, 0.7)', //头部右侧字体颜色,
                    headerRightChildColor: 'rgba(107, 107, 107, 0.7)', //头部右侧下拉字体颜色,
                    headerRightColorThis: '#565656', //头部右侧鼠标选中,
                    headerRightNavMore: 'rgba(160, 160, 160, 0.7)', //头部右侧更多下拉颜色,
                    headerRightNavMoreBg: '#1E9FFF', //头部右侧更多下拉列表选中背景色,
                    headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
                    headerRightToolColor: '#565656', //头部缩放按钮样式,
                    headerLogoBg: '#192027', //logo背景颜色,
                    headerLogoColor: 'rgb(191, 187, 187)', //logo字体颜色,
                    leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
                    leftMenuBg: '#28333E', //左侧菜单背景,
                    leftMenuBgThis: '#1E9FFF', //左侧菜单选中背景,
                    leftMenuChildBg: '#0c0f13', //左侧菜单子菜单背景,
                    leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
                    leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
                    tabActiveColor: '#1e9fff', //tab选项卡选中颜色,
                },
                {
                    headerRightBg: '#23262e', //头部右侧背景色
                    headerRightBgThis: '#0c0c0c', //头部右侧选中背景色,
                    headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
                    headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
                    headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
                    headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
                    headerRightNavMoreBg: '#1aa094', //头部右侧更多下拉列表选中背景色,
                    headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
                    headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
                    headerLogoBg: '#0c0c0c', //logo背景颜色,
                    headerLogoColor: '#ffffff', //logo字体颜色,
                    leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
                    leftMenuBg: '#23262e', //左侧菜单背景,
                    leftMenuBgThis: '#737373', //左侧菜单选中背景,
                    leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
                    leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
                    leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
                    tabActiveColor: '#23262e', //tab选项卡选中颜色,
                },
                {
                    headerRightBg: '#ffa4d1', //头部右侧背景色
                    headerRightBgThis: '#bf7b9d', //头部右侧选中背景色,
                    headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
                    headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
                    headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
                    headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
                    headerRightNavMoreBg: '#ffa4d1', //头部右侧更多下拉列表选中背景色,
                    headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
                    headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
                    headerLogoBg: '#e694bd', //logo背景颜色,
                    headerLogoColor: '#ffffff', //logo字体颜色,
                    leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
                    leftMenuBg: '#1f1f1f', //左侧菜单背景,
                    leftMenuBgThis: '#737373', //左侧菜单选中背景,
                    leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
                    leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
                    leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
                    tabActiveColor: '#ffa4d1', //tab选项卡选中颜色,
                },
                {
                    headerRightBg: '#1aa094', //头部右侧背景色
                    headerRightBgThis: '#197971', //头部右侧选中背景色,
                    headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
                    headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
                    headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
                    headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
                    headerRightNavMoreBg: '#1aa094', //头部右侧更多下拉列表选中背景色,
                    headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
                    headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
                    headerLogoBg: '#0c0c0c', //logo背景颜色,
                    headerLogoColor: '#ffffff', //logo字体颜色,
                    leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
                    leftMenuBg: '#23262e', //左侧菜单背景,
                    leftMenuBgThis: '#1aa094', //左侧菜单选中背景,
                    leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
                    leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
                    leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
                    tabActiveColor: '#1aa094', //tab选项卡选中颜色,
                },
                {
                    headerRightBg: '#1e9fff', //头部右侧背景色
                    headerRightBgThis: '#0069b7', //头部右侧选中背景色,
                    headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
                    headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
                    headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
                    headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
                    headerRightNavMoreBg: '#1e9fff', //头部右侧更多下拉列表选中背景色,
                    headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
                    headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
                    headerLogoBg: '#0c0c0c', //logo背景颜色,
                    headerLogoColor: '#ffffff', //logo字体颜色,
                    leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
                    leftMenuBg: '#1f1f1f', //左侧菜单背景,
                    leftMenuBgThis: '#1e9fff', //左侧菜单选中背景,
                    leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
                    leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
                    leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
                    tabActiveColor: '#1e9fff', //tab选项卡选中颜色,
                },
                {
                    headerRightBg: '#ffb800', //头部右侧背景色
                    headerRightBgThis: '#d09600', //头部右侧选中背景色,
                    headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
                    headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
                    headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
                    headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
                    headerRightNavMoreBg: '#d09600', //头部右侧更多下拉列表选中背景色,
                    headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
                    headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
                    headerLogoBg: '#243346', //logo背景颜色,
                    headerLogoColor: '#ffffff', //logo字体颜色,
                    leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
                    leftMenuBg: '#2f4056', //左侧菜单背景,
                    leftMenuBgThis: '#8593a7', //左侧菜单选中背景,
                    leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
                    leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
                    leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
                    tabActiveColor: '#ffb800', //tab选项卡选中颜色,
                },
                {
                    headerRightBg: '#e82121', //头部右侧背景色
                    headerRightBgThis: '#ae1919', //头部右侧选中背景色,
                    headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
                    headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
                    headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
                    headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
                    headerRightNavMoreBg: '#ae1919', //头部右侧更多下拉列表选中背景色,
                    headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
                    headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
                    headerLogoBg: '#0c0c0c', //logo背景颜色,
                    headerLogoColor: '#ffffff', //logo字体颜色,
                    leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
                    leftMenuBg: '#1f1f1f', //左侧菜单背景,
                    leftMenuBgThis: '#3b3f4b', //左侧菜单选中背景,
                    leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
                    leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
                    leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
                    tabActiveColor: '#e82121', //tab选项卡选中颜色,
                },
                {
                    headerRightBg: '#963885', //头部右侧背景色
                    headerRightBgThis: '#772c6a', //头部右侧选中背景色,
                    headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
                    headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
                    headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
                    headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
                    headerRightNavMoreBg: '#772c6a', //头部右侧更多下拉列表选中背景色,
                    headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
                    headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
                    headerLogoBg: '#243346', //logo背景颜色,
                    headerLogoColor: '#ffffff', //logo字体颜色,
                    leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
                    leftMenuBg: '#2f4056', //左侧菜单背景,
                    leftMenuBgThis: '#586473', //左侧菜单选中背景,
                    leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
                    leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
                    leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
                    tabActiveColor: '#963885', //tab选项卡选中颜色,
                },
                {
                    headerRightBg: '#2D8CF0', //头部右侧背景色
                    headerRightBgThis: '#0069b7', //头部右侧选中背景色,
                    headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
                    headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
                    headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
                    headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
                    headerRightNavMoreBg: '#0069b7', //头部右侧更多下拉列表选中背景色,
                    headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
                    headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
                    headerLogoBg: '#0069b7', //logo背景颜色,
                    headerLogoColor: '#ffffff', //logo字体颜色,
                    leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
                    leftMenuBg: '#1f1f1f', //左侧菜单背景,
                    leftMenuBgThis: '#2D8CF0', //左侧菜单选中背景,
                    leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
                    leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
                    leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
                    tabActiveColor: '#2d8cf0', //tab选项卡选中颜色,
                },
                {
                    headerRightBg: '#ffb800', //头部右侧背景色
                    headerRightBgThis: '#d09600', //头部右侧选中背景色,
                    headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
                    headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
                    headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
                    headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
                    headerRightNavMoreBg: '#d09600', //头部右侧更多下拉列表选中背景色,
                    headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
                    headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
                    headerLogoBg: '#d09600', //logo背景颜色,
                    headerLogoColor: '#ffffff', //logo字体颜色,
                    leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
                    leftMenuBg: '#2f4056', //左侧菜单背景,
                    leftMenuBgThis: '#3b3f4b', //左侧菜单选中背景,
                    leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
                    leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
                    leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
                    tabActiveColor: '#ffb800', //tab选项卡选中颜色,
                },
                {
                    headerRightBg: '#e82121', //头部右侧背景色
                    headerRightBgThis: '#ae1919', //头部右侧选中背景色,
                    headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
                    headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
                    headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
                    headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
                    headerRightNavMoreBg: '#ae1919', //头部右侧更多下拉列表选中背景色,
                    headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
                    headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
                    headerLogoBg: '#d91f1f', //logo背景颜色,
                    headerLogoColor: '#ffffff', //logo字体颜色,
                    leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
                    leftMenuBg: '#1f1f1f', //左侧菜单背景,
                    leftMenuBgThis: '#3b3f4b', //左侧菜单选中背景,
                    leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
                    leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
                    leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
                    tabActiveColor: '#e82121', //tab选项卡选中颜色,
                },
                {
                    headerRightBg: '#963885', //头部右侧背景色
                    headerRightBgThis: '#772c6a', //头部右侧选中背景色,
                    headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
                    headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
                    headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
                    headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
                    headerRightNavMoreBg: '#772c6a', //头部右侧更多下拉列表选中背景色,
                    headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
                    headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
                    headerLogoBg: '#772c6a', //logo背景颜色,
                    headerLogoColor: '#ffffff', //logo字体颜色,
                    leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
                    leftMenuBg: '#2f4056', //左侧菜单背景,
                    leftMenuBgThis: '#626f7f', //左侧菜单选中背景,
                    leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
                    leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
                    leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
                    tabActiveColor: '#963885', //tab选项卡选中颜色,
                },
                {
                    headerRightBg: '#ffffff', //头部右侧背景色
                    headerRightBgThis: '#e4e4e4', //头部右侧选中背景色,
                    headerRightColor: 'rgba(0,0,0, 0.7)', //头部右侧字体颜色,
                    headerRightChildColor: 'rgba(0,0,0, 0.7)', //头部右侧下拉字体颜色,
                    headerRightColorThis: '#000', //头部右侧鼠标选中,
                    headerRightNavMore: 'rgba(160, 160, 160, 0.7)', //头部右侧更多下拉颜色,
                    headerRightNavMoreBg: '#1E9FFF', //头部右侧更多下拉列表选中背景色,
                    headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
                    headerRightToolColor: '#000', //头部缩放按钮样式,
                    headerLogoBg: '#f3f3f3', //logo背景颜色,
                    headerLogoColor: '#000', //logo字体颜色,
                    leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
                    leftMenuBg: '#ffffff', //左侧菜单背景,
                    leftMenuBgThis: '#bbb', //左侧菜单选中背景,
                    leftMenuChildBg: '#f3f3f3', //左侧菜单子菜单背景,
                    leftMenuColor: '#000', //左侧菜单字体颜色,
                    leftMenuColorThis: '#000', //左侧菜单选中字体颜色,
                    tabActiveColor: '#1e9fff', //tab选项卡选中颜色,
                },
            ];

            if (bgcolorId == undefined) {
                return bgColorConfig;
            } else {
                return bgColorConfig[bgcolorId];
            }
        },

        /**
         * 初始化
         * @param options
         */
        render: function (options) {
            options.bgColorDefault = options.bgColorDefault || 0;
            options.elemStyleDefault = options.elemStyleDefault || 'index';
            options.listen = options.listen || false;
            var bgcolorId = localStorage.getItem('layuiminiBgcolorId');
            if (bgcolorId === null || bgcolorId === undefined || bgcolorId === '') {
                bgcolorId = options.bgColorDefault;
            }
            miniTheme.buildThemeCss(bgcolorId);

            var elemStyleName = localStorage.getItem('layuiminiElemStyleName');
            if (!elemStyleName) elemStyleName = options.elemStyleDefault;

            miniTheme.buildBodyElemStyle(elemStyleName);

            if (typeof window.onInitElemStyle == 'function') {
                window.onInitElemStyle()
            }

            if (options.listen) miniTheme.listen(options);
        },

        renderElemStyle(elemStyleDefault) {

            elemStyleDefault = elemStyleDefault || 'index';

            var elemStyleName = localStorage.getItem('layuiminiElemStyleName');
            if (!elemStyleName) elemStyleName = elemStyleDefault;

            miniTheme.buildBodyElemStyle(elemStyleName);

        },
        /**
         * 构建主题样式
         * @param bgcolorId
         * @returns {boolean}
         */
        buildThemeCss: function (bgcolorId) {
            if (!bgcolorId) {
                return false;
            }
            var bgcolorData = miniTheme.config(bgcolorId);

            var styleHtml = '/*头部右侧背景色 headerRightBg */\n' +
                '.layui-layout-admin .layui-header {\n' +
                '    background-color: ' + bgcolorData.headerRightBg + ' !important;\n' +
                '}\n' +
                '\n' +
                '/*头部右侧选中背景色 headerRightBgThis */\n' +
                '.layui-layout-admin .layui-header .layuimini-header-content > ul > .layui-nav-item.layui-this, .layuimini-tool i:hover {\n' +
                '    background-color: ' + bgcolorData.headerRightBgThis + ' !important;\n' +
                '}\n' +
                '\n' +
                '/*头部右侧字体颜色 headerRightColor */\n' +
                '.layui-layout-admin .layui-header .layui-nav .layui-nav-item a {\n' +
                '    color:  ' + bgcolorData.headerRightColor + ';\n' +
                '}\n' +
                '/**头部右侧下拉字体颜色 headerRightChildColor */\n' +
                '.layui-layout-admin .layui-header .layui-nav .layui-nav-item .layui-nav-child a {\n' +
                '    color:  ' + bgcolorData.headerRightChildColor + '!important;\n' +
                '}\n' +
                '\n' +
                '/*头部右侧鼠标选中 headerRightColorThis */\n' +
                '.layui-header .layuimini-menu-header-pc.layui-nav .layui-nav-item a:hover, .layui-header .layuimini-header-menu.layuimini-pc-show.layui-nav .layui-this a {\n' +
                '    color: ' + bgcolorData.headerRightColorThis + ' !important;\n' +
                '}\n' +
                '\n' +
                '/*头部右侧更多下拉颜色 headerRightNavMore */\n' +
                '.layui-header .layui-nav .layui-nav-more {\n' +
                '    border-top-color: ' + bgcolorData.headerRightNavMore + ' !important;\n' +
                '}\n' +
                '\n' +
                '/*头部右侧更多下拉颜色 headerRightNavMore */\n' +
                '.layui-header .layui-nav .layui-nav-mored, .layui-header .layui-nav-itemed > a .layui-nav-more {\n' +
                '    border-color: transparent transparent ' + bgcolorData.headerRightNavMore + ' !important;\n' +
                '}\n' +
                '\n' +
                '/**头部右侧更多下拉配置色 headerRightNavMoreBg headerRightNavMoreColor */\n' +
                '.layui-header .layui-nav .layui-nav-child dd.layui-this a, .layui-header .layui-nav-child dd.layui-this, .layui-layout-admin .layui-header .layui-nav .layui-nav-item .layui-nav-child .layui-this a {\n' +
                '    background-color: ' + bgcolorData.headerRightNavMoreBg + ' !important;\n' +
                '    color:' + bgcolorData.headerRightNavMoreColor + ' !important;\n' +
                '}\n' +
                '\n' +
                '/*头部缩放按钮样式 headerRightToolColor */\n' +
                '.layui-layout-admin .layui-header .layuimini-tool i {\n' +
                '    color: ' + bgcolorData.headerRightToolColor + ';\n' +
                '}\n' +
                '\n' +
                '/*logo背景颜色 headerLogoBg */\n' +
                '.layui-layout-admin .layuimini-logo {\n' +
                '    background-color: ' + bgcolorData.headerLogoBg + ' !important;\n' +
                '}\n' +
                '\n' +
                '/*logo字体颜色 headerLogoColor */\n' +
                '.layui-layout-admin .layuimini-logo h1 {\n' +
                '    color: ' + bgcolorData.headerLogoColor + ';\n' +
                '}\n' +
                '\n' +
                '/*左侧菜单更多下拉样式 leftMenuNavMore */\n' +
                '.layuimini-menu-left .layui-nav .layui-nav-more,.layuimini-menu-left-zoom.layui-nav .layui-nav-more {\n' +
                '    border-top-color: ' + bgcolorData.leftMenuNavMore + ';\n' +
                '}\n' +
                '\n' +
                '/*左侧菜单更多下拉样式 leftMenuNavMore */\n' +
                '.layuimini-menu-left .layui-nav .layui-nav-mored, .layuimini-menu-left .layui-nav-itemed > a .layui-nav-more,   .layuimini-menu-left-zoom.layui-nav .layui-nav-mored, .layuimini-menu-left-zoom.layui-nav-itemed > a .layui-nav-more {\n' +
                '    border-color: transparent transparent  ' + bgcolorData.leftMenuNavMore + ' !important;\n' +
                '}\n' +
                '\n' +
                '/*左侧菜单背景 leftMenuBg */\n' +
                '.layui-side.layui-bg-black, .layui-side.layui-bg-black > .layuimini-menu-left > ul, .layuimini-menu-left-zoom > ul {\n' +
                '    background-color:  ' + bgcolorData.leftMenuBg + ' !important;\n' +
                '}\n' +
                '\n' +
                '/*左侧菜单选中背景 leftMenuBgThis */\n' +
                '.layuimini-menu-left .layui-nav-tree .layui-this, .layuimini-menu-left .layui-nav-tree .layui-this > a, .layuimini-menu-left .layui-nav-tree .layui-nav-child dd.layui-this, .layuimini-menu-left .layui-nav-tree .layui-nav-child dd.layui-this a, .layuimini-menu-left-zoom.layui-nav-tree .layui-this, .layuimini-menu-left-zoom.layui-nav-tree .layui-this > a, .layuimini-menu-left-zoom.layui-nav-tree .layui-nav-child dd.layui-this, .layuimini-menu-left-zoom.layui-nav-tree .layui-nav-child dd.layui-this a {\n' +
                '    background-color: ' + bgcolorData.leftMenuBgThis + ' !important\n' +
                '}\n' +
                '\n' +
                '/*左侧菜单子菜单背景 leftMenuChildBg */\n' +
                '.layuimini-menu-left .layui-nav-itemed > .layui-nav-child{\n' +
                '    background-color: ' + bgcolorData.leftMenuChildBg + ' !important;\n' +
                '}\n' +
                '\n' +
                '/*左侧菜单字体颜色 leftMenuColor */\n' +
                '.layuimini-menu-left .layui-nav .layui-nav-item a, .layuimini-menu-left-zoom.layui-nav .layui-nav-item a {\n' +
                '    color:  ' + bgcolorData.leftMenuColor + ' !important;\n' +
                '}\n' +
                '\n' +
                '/*左侧菜单选中字体颜色 leftMenuColorThis */\n' +
                '.layuimini-menu-left .layui-nav .layui-nav-item a:hover, .layuimini-menu-left .layui-nav .layui-this a, .layuimini-menu-left-zoom.layui-nav .layui-nav-item a:hover, .layuimini-menu-left-zoom.layui-nav .layui-this a {\n' +
                '    color:' + bgcolorData.leftMenuColorThis + ' !important;\n' +
                '}\n' +
                '\n' +
                '/**tab选项卡选中颜色 tabActiveColor */\n' +
                '.layuimini-tab .layui-tab-title .layui-this .layuimini-tab-active {\n' +
                '    background-color: ' + bgcolorData.tabActiveColor + ';\n' +
                '}\n';
            $('#layuimini-bg-color').html(styleHtml);
        },

        /**
         * 构建主题选择html
         * @param options
         * @returns {string}
         */
        buildBgColorHtml: function (options) {
            var bgcolorId = parseInt(localStorage.getItem('layuiminiBgcolorId'));
            if (isNaN(bgcolorId)) bgcolorId = options.bgColorDefault;
            var bgColorConfig = miniTheme.config();
            var html = '';
            $.each(bgColorConfig, function (key, val) {
                if (key === bgcolorId) {
                    html += '<li class="layui-this" data-select-bgcolor="' + key + '">\n';
                } else {
                    html += '<li  data-select-bgcolor="' + key + '">\n';
                }
                html += '<a href="javascript:;" data-skin="skin-blue" style="" class="clearfix full-opacity-hover">\n' +
                    '<div><span style="display:block; width: 20%; float: left; height: 12px; background: ' + val.headerLogoBg + ';"></span><span style="display:block; width: 80%; float: left; height: 12px; background: ' + val.headerRightBg + ';"></span></div>\n' +
                    '<div><span style="display:block; width: 20%; float: left; height: 40px; background: ' + val.leftMenuBg + ';"></span><span style="display:block; width: 80%; float: left; height: 40px; background: #ffffff;"></span></div>\n' +
                    '</a>\n' +
                    '</li>';
            });
            return html;
        },
        configElemStyle() {
            var listElemStyle = [
                {
                    title: '标准',
                    className: 'normal'
                },
                {
                    title: '原型',
                    className: 'demo',
                    defaultColorConfig: '12'
                },
                {
                    title: '科幻',
                    className: 'sicfi'
                },
                {
                    title: 'GTK',
                    className: 'gtk'
                },
                {
                    title: '像素',
                    className: 'nes',
                    defaultColorConfig: '12'
                },
                {
                    title: 'WIN7',
                    className: 'win7',
                    defaultColorConfig: '12'
                },
            ]
            return listElemStyle;
        },
        buildBodyElemStyle(className) {
            var listElemStyle = miniTheme.configElemStyle()

            $.each(listElemStyle, function (index, item) {
                var classNameReal = 'elem-style-' + item.className;

                if ($('body').hasClass(classNameReal)) {
                    $('body').removeClass(classNameReal);
                }
            })

            $('body').addClass('elem-style-' + className)
        },
        buildElemStyleHtml(options) {
            var elemStyleName = localStorage.getItem('layuiminiElemStyleName');
            if (!elemStyleName) elemStyleName = options.elemStyleDefault;
            var listElemStyle = miniTheme.configElemStyle()
            var html = '';
            $.each(listElemStyle, function (key, val) {

                if (typeof val.defaultColorConfig == 'undefined') {
                    val.defaultColorConfig = '0'
                }

                if (val.className === elemStyleName) {
                    html += '<li class="layui-this style-item" data-select-style="' + val.className + '" data-default-color-config="' + val.defaultColorConfig + '">\n';
                } else {
                    html += '<li class="style-item"  data-select-style="' + val.className + '" data-default-color-config="' + val.defaultColorConfig + '">\n';
                }
                html +=
                    val.title +

                    '</li>';
            });
            return html;
        },

        /**
         * 监听
         * @param options
         */
        listen: function (options) {
            $('body').on('click', '[data-bgcolor]', function () {
                var loading = layer.load(0, { shade: false, time: 2 * 1000 });
                var clientHeight = (document.documentElement.clientHeight) - 60;
                var bgColorHtml = miniTheme.buildBgColorHtml(options);
                var elemStyleHtml = miniTheme.buildElemStyleHtml(options);
                var html = '<div class="layuimini-color">\n' +
                    '<div class="color-title">\n' +
                    '<span>配色方案</span>\n' +
                    '</div>\n' +
                    '<div class="color-content">\n' +
                    '<ul>\n' + bgColorHtml + '</ul>\n' +
                    '</div>\n' +
                    '<div class="elem-title">\n' +
                    '<span>元素风格</span>\n' +
                    '</div>\n' +
                    '<div class="elem-content">\n' +
                    '<ul>\n' + elemStyleHtml + '</ul>\n' +
                    '</div>\n' +
                    '<div class="more-menu-list">\n' +
                    '<a class="more-menu-item" href="http://doc.ulthon.com/home/read/ulthon_admin/home.html" target="_blank"><i class="layui-icon layui-icon-read" style="font-size: 19px;"></i> 开发文档</a>\n' +
                    '<a class="more-menu-item" href="https://gitee.com/ulthon/ulthon_admin" target="_blank"><i class="layui-icon layui-icon-tabs" style="font-size: 16px;"></i> 开源地址</a>\n' +
                    '<a class="more-menu-item" href="http://admin.demo.ulthon.com/" target="_blank"><i class="layui-icon layui-icon-theme"></i> 官方网站</a>\n' +
                    '</div>' +
                    '</div>';
                layer.open({
                    type: 1,
                    title: false,
                    closeBtn: 0,
                    shade: 0.2,
                    anim: 2,
                    shadeClose: true,
                    id: 'layuimini-bg-color',
                    area: ['340px', clientHeight + 'px'],
                    offset: 'rb',
                    content: html,
                    success: function (index, layero) {
                    },
                    end: function () {
                        $('.layuimini-select-bgcolor').removeClass('layui-this');
                    }
                });
                layer.close(loading);
            });

            $('body').on('click', '[data-select-bgcolor]', function () {
                var bgcolorId = $(this).attr('data-select-bgcolor');

                $(this).attr('class', 'layui-this').siblings().removeClass('layui-this');
                localStorage.setItem('layuiminiBgcolorId', bgcolorId);
                miniTheme.render({
                    listen: false,
                });
            });
            $('body').on('click', '[data-select-style]', function () {
                var elemStyleName = $(this).attr('data-select-style');

                $(this).attr('class', 'layui-this').siblings().removeClass('layui-this');

                var defaultColorConfig = $(this).attr('data-default-color-config');

                if (defaultColorConfig && defaultColorConfig.length > 0) {
                    localStorage.setItem('layuiminiBgcolorId', defaultColorConfig);

                }

                localStorage.setItem('layuiminiElemStyleName', elemStyleName);
                miniTheme.render({
                    listen: false,
                });
            });
        }
    };

    return miniTheme;
})
    ;
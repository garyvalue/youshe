需要编译的scss文件：
```
public/static/common/css/theme/*.scss
public/static/plugs/lay-module/tableData/tableData.scss
public/static/plugs/lay-module/tagInput/tagInput.scss
public/static/plugs/lay-module/propertyInput/propertyInput.scss
```


## VSCODE

### 扩展
如果在vscode中，安装下面的扩展

```
名称: Live Sass Compiler
ID: glenn2223.live-sass
说明: Compile Sass or Scss to CSS at realtime.
版本: 5.5.1
发布者: Glenn Marks
VS Marketplace 链接: https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass
```

### 配置

vscode中liveSassCompiler的配置:

```json
{
    "liveSassCompile.settings.includeItems": [
        "/public/static/common/css/theme/*.scss",
        "/public/static/plugs/lay-module/tableData/tableData.scss",
        "/public/static/plugs/lay-module/tagInput/tagInput.scss",
        "/public/static/plugs/lay-module/propertyInput/propertyInput.scss"
    ]
}
```

## 扩展命令

ulthon_admin将提供一个命令，实时编译文件，目前开发中。
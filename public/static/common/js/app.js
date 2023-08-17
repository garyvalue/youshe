
const loading = {};
loading.index = 0;
loading.showCount = 0;
loading.show = function (count) {

    if (typeof count == 'undefined') {
        count = 1;
    }

    if (loading.showCount == 0) {
        loading.index = layer.load()
    }

    loading.showCount += count;
}

loading.hide = function (count) {


    if (typeof count == undefined) {
        count = 1;
    }

    if (count === true) {
        count = 1;
        loading.showCount = 0;
    }

    loading.showCount -= 1;

    if (loading.showCount < 0) {
        loading.showCount = 0;
    }

    if (loading.showCount == 0) {
        layer.close(loading.index);
    }

}
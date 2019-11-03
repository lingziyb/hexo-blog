const urlForHelperId = require.resolve("hexo/lib/plugins/helper/url_for");
const urlForHelper = require("hexo/lib/plugins/helper/url_for");

require.cache[urlForHelperId].exports = function (path, options) {
    const url = urlForHelper.call(this, path, options);
    return url === "/" ? url : url + "index.html"
}
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/19
 * Description: Editor theme.
 */

ace.define("ace/theme/magic-book",["require","exports","module","ace/lib/dom"], function(acequire, exports, module) {
    exports.isDark = false;
    exports.cssClass = "ace-magic-book";
    exports.cssText = global.editorTheme;
    const dom = acequire("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
});
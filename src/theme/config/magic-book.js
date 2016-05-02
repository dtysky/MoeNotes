/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/19
 * Description: Editor theme.
 */



ace.define("ace/theme/magic-book",["require","exports","module","ace/lib/dom"], function(acequire, exports, module) {

    exports.isDark = false;
    exports.cssClass = "ace-magic-book";
    exports.cssText = "\
.ace-magic-book .ace_text-layer{\
    font-family: hack ! important;\
}\
.ace-magic-book .ace_cjk{\
    font-family: Microsoft YaHei,Arial, sans-serif ! important;\
    font-size: 14px\
}\
.ace-magic-book .ace_constant {\
color:#FB83A4\
}\
.ace-magic-book .ace_heading {\
bold: border;\
color: #E85B82\
}\
.ace-magic-book .ace_heading .ace_cjk{\
bold: border;\
color: #E85B82\
}\
.ace-magic-book .ace_gutter {\
background: #e8e8e8;\
color: #333\
}\
.ace-magic-book .ace_print-margin {\
width: 1px;\
background: #e8e8e8\
}\
.ace-magic-book {\
color: #333333;\
}\
.ace-magic-book .ace_cursor {\
color: #C35774\
}\
.ace-magic-book .ace_marker-layer .ace_selection {\
background: #EAC9D2\
}\
.ace-magic-book.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #FFFFFF;\
}\
.ace-magic-book .ace_marker-layer .ace_step {\
background: rgb(198, 219, 174)\
}\
.ace-magic-book .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #BFBFBF\
}\
.ace-magic-book .ace_marker-layer .ace_active-line {\
background: rgba(224, 141, 170, 0.15)\
}\
.ace-magic-book .ace_gutter-active-line {\
background-color: rgba(0, 0, 0, 0.071)\
}\
.ace-magic-book .ace_marker-layer .ace_selected-word {\
border: 1px solid #B5D5FF\
}\
.ace-magic-book .ace_constant.ace_language,\
.ace-magic-book .ace_keyword,\
.ace-magic-book .ace_meta,\
.ace-magic-book .ace_variable.ace_language {\
color: #C800A4\
}\
.ace-magic-book .ace_invisible {\
color: #BFBFBF\
}\
.ace-magic-book .ace_constant.ace_character,\
.ace-magic-book .ace_constant.ace_other {\
color: #275A5E\
}\
.ace-magic-book .ace_constant.ace_numeric {\
color: #3A00DC\
}\
.ace-magic-book .ace_entity.ace_other.ace_attribute-name,\
.ace-magic-book .ace_support.ace_constant,\
.ace-magic-book .ace_support.ace_function {\
color: #333333\
}\
.ace-magic-book .ace_fold {\
background-color: #C800A4;\
border-color: #000000\
}\
.ace-magic-book .ace_entity.ace_name.ace_tag,\
.ace-magic-book .ace_support.ace_class,\
.ace-magic-book .ace_support.ace_type {\
color: #790EAD\
}\
.ace-magic-book .ace_storage {\
color: #C900A4\
}\
.ace-magic-book .ace_string {\
color: #777777\
}\
.ace-magic-book .ace_comment {\
color: #555555\
}\
.ace-magic-book .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==) right repeat-y\
}";

    var dom = acequire("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
});

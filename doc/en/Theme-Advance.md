# Theme-Advance

If you understand how CSS works you can follow the steps below to create your own theme: 

## 1. Find the configuration folder

**For mac users**  

Find the application package, right click and select 'show package content'. then enter the 'Contents/Resources/app' folder.

**For Linux and Windows users**  

Find the application folder and enter 'resources/app' folder.

Then enter 'theme/config' folder and you will see those predefined themes. 

## 2. Create new theme

You can copy a pre defined theme as template or start in a new folder, but keep in mind the following three files are essential: 

### 1. config.css

This is the main configuration file of theme, you can use it to overwrite almost all styles, but not recommended. Use it to define things like background images or background color. 

### 2. config.json

    :::js
    {
        //default syntax highlight language
        "defaultHighlight": "VHDL",
        //default variable ,hue、saturation and lightness
        "CDCMode": "hue",
        //default range for varying parameter
        "CDCRange": [260, 380],
        //current chapter's background color
        "chapterNowBackCSC":  [50, 60, 1],
        //current chapter's border color
        "chapterNowBorderCSC": [50, 60, 1],
        //current chapter's font color
        "chapterNowFontCSC": [100, 100, 1],
        //default chapter's background color
        "chapterNormalBackCSC": [40, 70, 0.6],
        //default chapter's border color
        "chapterNormalBorderCSC": [40, 50, 1],
        //default chapter's font color
        "chapterNormalFontCSC": [100, 25, 1],
        //page-list's background color for current chapter
        "pageListBackCSC": [20, 40, 0.5],
        //adding-page-button's background color for current chapter
        "pageButtonBackCSC": [30, 50, 0.6],
        //adding-page-button's font color for current chapter
        "pageButtonFontCSC": [100, 20, 1],
        //current page's background color
        "pageNowBackCSC": [100, 100, 1],
        //current page's font color
        "pageNowFontCSC": [100, 30, 1],
        //default page's background color
        "pageNormalBackCSC": [0, 0, 0],
        //default page's font color
        "pageNormalFontCSC": [100, 30, 1],
        //head's background color for current book
        "headBackCSC": [50, 80, 0.6],
        //book's background color
        "bookBackCSC": [50, 80, 0.8],
        //book's font and shape color
        "bookFontCSC": [80, 50, 0.8],
        //book's button color
        "bookShapeCSC": [50, 50, 0.8],
        //toobar's background color for current book
        "toolbarCSC": [60, 50, 0.7],
        //dialog's drop background color
        "notifyDropBack": "rgba(100,100,100,0.6)",
        //warnning dialog's background image
        "notifyWarnBack": "",
        //error dialog's background image
        "notifyErrorBack": "",
        //system information dialog's background image
        "notifySysInfoBack": "",
        //notifiction's background image
        "notifyInfoBack": "rgba(239, 194, 212, 0.9)"
    }
    
Note the "XXXCSC"：  

1. [0, 0, 0]: In this mode, the varying parameter is determined for `CDCMode`，and the range is determined for `CDCRange`.
2. [0, 0, 0, "hue"]: In this mode, the varying parameter is determined for the fourth parameter，and the range is determined for `CDCRange`.
3. [0, 0, 0, [0, 100]]: In this mode, the varying parameter is determined for `CDCMode`，and the range is determined for the fourth parameter.
4. [0, 0, 0, "hue", [0, 100]]: In this mode, the varying parameter is determined for the fourth parameter，and the range is determined for the fifth parameter.
    
### 3. editor.json

Theme of the editor. Details can be found on ace editor official site.
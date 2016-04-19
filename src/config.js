/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Configure.
 */


const defaultConfig = {
    "font": "hack",
    "defaultHighlight": "VHDL",
    "chapterNowBackSLO":  [50, 60, 1],
    "chapterNowBorderSLO": [50, 60, 1],
    "chapterNowFontSLO": [100, 100, 1],
    "chapterNormalBackSLO": [40, 70, 0.6],
    "chapterNormalBorderSLO": [40, 50, 1],
    "chapterNormalFontSLO": [100, 25, 1],
    "pageListBackSLO": [20, 40, 0.5],
    "pageButtonBackSLO": [30, 50, 0.6],
    "pageButtonFontSLO": [100, 20, 1],
    "pageNowBackSLO": [100, 100, 1],
    "pageNowFontSLO": [100, 30, 1],
    "pageNormalBackSLO": [0, 0, 0],
    "pageNormalFontSLO": [100, 30, 1],
    "headBackSLO": [50, 80, 0.6],
    "bookBackSLO": [50, 80, 0.8],
    "bookFontSLO": [80, 50, 0.8],
    "bookShapeSLO": [50, 50, 0.8],
    "hueRange": [260, 380],
    "modalBackDrop": "rgba(100,100,100,0.6)",
    "warnNotifyBack": "url(theme/images/warn-background.png)",
    "errorNotifyBack": "url(theme/images/error-background.png)",
    //"infoNotifyBack": "url(theme/images/info-background.png)",
    "infoNotifyBack": "rgba(239, 194, 212, 0.9)",
    "infoNotifyShadow": ""
};

const sysConfig = {
    logPath: "user/error.log",
    configPath: "user/config.json"
};

class ConfigManager{
    constructor(){
        this.config = defaultConfig;
        this.sysConfig = sysConfig;
    }
    loadConfig(configPath){

    }
    saveConfig(){

    }
    getConfig(){
        return this.config;
    }
    getSysConfig(){
        return this.sysConfig;
    }
    generateCss(stylesheetPath){

    }
}

export default new ConfigManager();
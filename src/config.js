/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Configure.
 */


const defaultConfig = {
    "defaultHighlight": "VHDL",
    "chapterNowBackSLO":  [40, 60, 1],
    "chapterNowBorderSLO": [40, 60, 1],
    "chapterNowFontSLO": [100, 100, 1],
    "chapterNormalBackSLO": [40, 70, 0.8],
    "chapterNormalBorderSLO": [40, 50, 1],
    "chapterNormalFontSLO": [100, 25, 1],
    "pageListBackSLO": [20, 40, 0.5],
    "pageButtonBackSLO": [40, 50, 0.6],
    "pageButtonFontSLO": [100, 20, 1],
    "pageNowBackSLO": [100, 100, 1],
    "pageNowFontSLO": [100, 30, 1],
    "pageNormalBackSLO": [0, 0, 0],
    "pageNormalFontSLO": [100, 30, 1],
    "bookBackSLO": [20, 30, 0.8],
    "bookFontSLO": [80, 30, 1],
    "hueRange": [260, 380]
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
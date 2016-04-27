/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Configure.
 */

import fs from 'fs';

const defaultConfig = {
    "defaultHighlight": "VHDL",
    "hueRange": [260, 380],
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
    "toolbarSLO": [60, 50, 0.7],
    "notifyDropBack": "rgba(100,100,100,0.6)",
    "notifyWarnBack": "",
    "notifyErrorBack": "",
    "notifySysInfoBack": "",
    "notifyInfoBack": "rgba(239, 194, 212, 0.9)"
};

const sysConfig = {
    treePath: ".tree",
    logPath: "error.log",
    configPath: "theme/config/config.json"
};

class ConfigManager{
    constructor(){
        this.config = defaultConfig;
        this.refresh();
        this.sysConfig = sysConfig;
    }
    refresh(){
        try {
            const config = JSON.parse(
                fs.readFileSync(this.sysConfig.configPath)
            );
            for (let key in config){
                if(this.config.hasOwnProperty(key)){
                    this.config[key] = config[key];
                }
            }
        }
        catch(e) {
            this.config = defaultConfig;
        }
    }
    getConfig(){
        return this.config;
    }
    getSysConfig(){
        return this.sysConfig;
    }
}

export default new ConfigManager();
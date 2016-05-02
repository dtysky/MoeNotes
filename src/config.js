/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Configure.
 */

import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import Storage from './storage';

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

const userPath = remote.app.envRelease ?
    remote.app.getPath("userData") :
    ".";

const sysConfig = {
    treePath: userPath + "/.tree",
    logPath: userPath + "/error.log",
    configRoot: "theme/config",
    defaultTheme: "sakura"
};

class ConfigManager{
    constructor(){
        this.config = defaultConfig;
        this.sysConfig = sysConfig;
        this.themes = this.refreshThemes();
        this.nowTheme = {};
        this.refresh(Storage.getTheme());
    }

    refreshThemes(){
        return fs.readdirSync(
            this.sysConfig.configRoot
        ).filter(function(file) {
            return fs.statSync(path.join(
                this.sysConfig.configRoot, file
            )).isDirectory();
        });
    }

    loadTheme(theme){
        const themeConfigPath = path.join(
            this.sysConfig.configRoot, theme, "config.json"
        );
        this.loadConfig(themeConfigPath);
    }

    loadConfig(themeConfigPath){
        try {
            const config = JSON.parse(
                fs.readFileSync(themeConfigPath)
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

    refresh(theme){
        if(theme === undefined){
            theme = this.sysConfig.defaultTheme;
        }
        Storage.setTheme(theme);
        Storage.save();
        this.nowTheme = {
            css: path.join(
                this.sysConfig.configRoot, theme, "config.css"
            ),
            editor: path.join(
                this.sysConfig.configRoot, theme, "magic-book.js"
            )
        };
        this.loadTheme(theme);
    }

    getThemes(){
        return this.themes;
    }

    getConfig(){
        return this.config;
    }

    getStyles(){
        return this.nowTheme;
    }

    getSysConfig(){
        return this.sysConfig;
    }

}

export default new ConfigManager();
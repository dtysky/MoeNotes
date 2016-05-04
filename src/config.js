/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Configure.
 */

import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import { bindFunctions, stringToColor, logError } from './utils';

const defaultConfig = {
    "defaultHighlight": "VHDL",
    "CDCMode": "hue",
    "CDCRange": [260, 380],
    "chapterNowBackCSC":  [50, 60, 1],
    "chapterNowBorderCSC": [50, 60, 1],
    "chapterNowFontCSC": [100, 100, 1],
    "chapterNormalBackCSC": [40, 70, 0.6],
    "chapterNormalBorderCSC": [40, 50, 1],
    "chapterNormalFontCSC": [100, 25, 1],
    "pageListBackCSC": [20, 40, 0.5],
    "pageButtonBackCSC": [30, 50, 0.6],
    "pageButtonFontCSC": [100, 20, 1],
    "pageNowBackCSC": [100, 100, 1],
    "pageNowFontCSC": [100, 30, 1],
    "pageNormalBackCSC": [0, 0, 0],
    "pageNormalFontCSC": [100, 30, 1],
    "headBackCSC": [50, 80, 0.6],
    "bookBackCSC": [50, 80, 0.8],
    "bookFontCSC": [80, 50, 0.8],
    "bookShapeCSC": [50, 50, 0.8],
    "toolbarCSC": [60, 50, 0.7],
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
    configRoot: remote.app.envRelease ?
        "theme/config" :
        "src/theme/config",
    configRootLink: "theme/config",
    defaultTheme: "sakura"
};

class ConfigManager{
    constructor(){
        this.config = defaultConfig;
        this.sysConfig = sysConfig;
        bindFunctions(
            this,
            [
                "getExistedThemes",
                "initTheme",
                "save",
                "loadTheme",
                "loadConfig",
                "refresh",
                "getThemes",
                "getNow",
                "getConfig",
                "getStyles",
                "getSysConfig"
            ]
        );
        this.themes = [];
        this.nowTheme = "";
        this.getExistedThemes();
        this.initTheme();
        this.refresh(this.nowTheme);
    }

    getExistedThemes(){
        const configRoot = this.sysConfig.configRoot;
        this.themes = fs.readdirSync(configRoot).filter(function(file) {
            return fs.statSync(path.join(
                configRoot, file
            )).isDirectory();
        });
    }

    initTheme(){
        try{
            this.nowTheme = fs.readFileSync(
                path.join(
                    this.sysConfig.configRoot, ".now"
                )
            ).toString();
        }
        catch (e){
            this.nowTheme = this.sysConfig.defaultTheme;
        }
    }

    save(){
        fs.writeFileSync(
            path.join(
                this.sysConfig.configRoot, ".now"
            ), this.nowTheme
        );
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
        this.nowTheme = theme;
        this.save();
        this.loadTheme(theme);
    }

    getThemes(){
        return this.themes;
    }

    getNow(){
        return this.nowTheme;
    }

    getConfig(){
        return this.config;
    }

    getStyles(){
        return {
            css: path.join(
                this.sysConfig.configRootLink, this.nowTheme, "config.css"
            ),
            editor: path.join(
                this.sysConfig.configRoot, this.nowTheme, "editor.css"
            )
        };
    }

    getSysConfig(){
        return this.sysConfig;
    }

}

export default new ConfigManager();
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Configure.
 */


const defaultConfig = {
    "defaultHighlight": "VHDL"
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
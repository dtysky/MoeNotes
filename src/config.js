/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Configure.
 */


defaultConfig = {
    "defaultHighlight": "VHDL"
};


class ConfigManager{
    constructor(){
        this.config = defaultConfig;
    }
    loadConfig(configPath){

    }
    saveConfig(){

    }
    getConfig(){
        return this.config;
    }
    generateCss(stylesheetPath){

    }
}

export default new ConfigManager();
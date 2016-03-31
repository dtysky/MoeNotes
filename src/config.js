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
    load(config_path){

    }
    save(){

    }
    getNow(){

    }
}

export default new ConfigManager();
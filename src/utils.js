/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Configure.
 */

export function bindFunctions(self, methods){
    methods.forEach(method => {
        self[method] = self[method].bind(self);
    });
}
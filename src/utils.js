/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Some useful tools.
 */

export function bindFunctions(self, methods){
    methods.forEach(method => {
        self[method] = self[method].bind(self);
    });
}
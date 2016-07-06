/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/26
 * Description:
 */

import { bindFunctions, getDirectories, getFiles, getNameFromPath, bindTryCatchWrapper} from '../src/cores/utils';
import { arrayAreEqual, arrayAreSimilar, arrayHas } from '../src/cores/utils';
import { createObjectWithErrorHandler, logError, stringToColor } from '../src/cores/utils';
import mock from 'mock-fs';
import deepcopy from 'deepcopy';
import { objectIsEqual, loadBook } from './utils';

import fs from 'fs';

describe("Utils", () => {
    beforeEach(() => {

    });

    it("Bind functions without handler", () => {
        class Test{
            constructor(message){
                this.message = message;
                bindFunctions(
                    this,
                    ["test2"]
                );
            }
            test(){
                return this.test1(this.test2.bind(this));
            }
            test1(callback){
                return callback();
            }
            test2(){
                return this.test3();
            }
            test3(){
                return this.message;
            }
        }
        const message = "Bind successfully !";
        const test = new Test(message);
        expect(test.test()).toBe(message);
    });

    it("Bind functions with handler", () => {
        function handler(error){
            return error.message;
        }
        class Test{
            constructor(){
                this.var = "";
                bindFunctions(
                    this,
                    ["test_normal", "test_error"],
                    handler
                );
            }
            test_normal(message){
                return "normal " + message;
            }
            test_error(){
                throw new Error("throw error");
            }
        }
        const obj = new Test();
        expect(obj.test_normal("test")).toBe("normal test");
        expect(obj.test_error()).toBe("throw error");
    });

    it("Array is equal", () => {
        expect(
            arrayAreEqual(["1", 2.0, 3], ["1", 2, 3])
        ).toBeTruthy();
        expect(
            arrayAreEqual(["1", 2.0, 3], [3, 2.0, "1"])
        ).toBeFalsy();
    });

    it("Array is like", () => {
        expect(
            arrayAreSimilar(["1", 2.0, 3], [3, 2.0, "1"])
        ).toBeTruthy();
        expect(
            arrayAreSimilar(["1", 2.0, 3], ["1", 2.0])
        ).toBeFalsy();
    });

    it("Array has", () => {
        expect(
            arrayHas(["1", 2.0, 3], "1")
        ).toBeTruthy();
        expect(
            arrayHas(["1", 2.0, 3], 1)
        ).toBeFalsy();
    });

    it("Get directories", () => {
        mock({
            dir1: {
                d1: {},
                f1: "file"
            },
            dir2: {}
        });
        expect(
            arrayAreEqual(getDirectories("dir1"), ["d1"])
        ).toBeTruthy();
        expect(
            arrayAreEqual(getDirectories("dir2"), [])
        ).toBeTruthy();
        mock.restore();
    });

    it("Get files", () => {
        mock({
            dir1: {
                d1: {},
                "f1.md": "file",
                f2: "file"
            },
            dir2: {}
        });
        expect(
            arrayAreEqual(getFiles("dir1"), ["f1"])
        ).toBeTruthy();
        expect(
            arrayAreEqual(getFiles("dir2"), [])
        ).toBeTruthy();
        mock.restore();
    });

    it("Get name from path", () => {
        expect(
            getNameFromPath("path/dir/folder")
        ).toBe("folder");
        expect(
            getNameFromPath("path/dir/file.test")
        ).toBe("file.test");
    });

    it("Create object with error handler", () => {
        class Test{
            constructor(){
                this.var = "";
                bindFunctions(
                    this,
                    ["test_normal", "test_error"]
                );
            }
            test_normal(message){
                return "normal " + message;
            }
            test_error(){
                throw new Error("throw error");
            }
        }
        function handler(error){
            return error.message;
        }
        const obj = new createObjectWithErrorHandler(
            new Test(),
            handler
        );
        expect(obj.test_normal("test")).toBe("normal test");
        expect(obj.test_error()).toBe("throw error");
    });

    it("Log error information", () => {
        mock({
            "error.log": ""
        });
        const log = logError("error.log");
        log(new Error("error"));
        const results = fs.readFileSync("error.log", "utf8");
        expect(
            /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\nError: error[\s\S]+/.test(results)
        ).toBeTruthy();
        mock.restore();
    });

    it("String to color", () => {
        let string = "";
        let colorConstraints = [50, 50, 0.8];
        expect(stringToColor(string, colorConstraints)).toBe("rgba(191,65,63,0.8)");
        string = "哈哈哈哈哈哈";
        colorConstraints = [100, 50, 0.8];
        expect(stringToColor(string, colorConstraints)).toBe("rgba(255,4,0,0.8)");
        string = "Hahahahaha";
        colorConstraints = [100, 100, 0.8];
        expect(stringToColor(string, colorConstraints)).toBe("rgba(255,255,255,0.8)");

        colorConstraints = [100, 100, 0.8, "saturation"];
        expect(stringToColor(string, colorConstraints)).toBe("rgba(255,255,255,0.8)");

        colorConstraints = [100, 100, 0.8, [0, 360]];
        expect(stringToColor(string, colorConstraints)).toBe("rgba(255,255,255,0.8)");
        colorConstraints = [100, 100, 0.8, "saturation", [0, 100]];
        expect(stringToColor(string, colorConstraints)).toBe("rgba(255,255,255,0.8)");
        colorConstraints = [100, 100, 0.8, "lightness", [0, 100]];
        expect(stringToColor(string, colorConstraints)).toBe("rgba(132,255,71,0.8)");
    });

    it("Bind try-catch wrapper", () => {
        function handler(error){
            return error.message;
        }
        class Test{
            constructor(){
                this.var = "";
                bindFunctions(
                    this,
                    ["test_normal", "test_error"]
                );
                bindTryCatchWrapper(
                    this,
                    ["test_normal", "test_error"],
                    handler
                );
            }
            test_normal(message){
                return "normal " + message;
            }
            test_error(){
                throw new Error("throw error");
            }
        }
        const obj = new Test();
        expect(obj.test_normal("test")).toBe("normal test");
        expect(obj.test_error()).toBe("throw error");
    });

});
#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeJson = void 0;
const fs_1 = __importDefault(require("fs"));
let array = [];
let i = 0;
const json = { lastName: "lastname",
    firstname: "firstname",
    num: 0,
    data: {
        one: "one",
        two: {
            three: 2
        }
    } };
const treeJson = async () => {
    await loopingJson(json, i, "test");
    if (!process.argv[2]) {
        throw new Error("Path file must be give.");
    }
    // console.log(`${process.argv[2]}/out.json`);
    fs_1.default.writeFileSync(`${process.argv[2]}/out.json`, JSON.stringify(array));
};
exports.treeJson = treeJson;
const loopingJson = async (json, imbrication, belongTo) => {
    for (const [key, value] of Object.entries(json)) {
        let obj;
        if (typeof value === "object") {
            obj = { type: typeof value, key, levelImbrication: imbrication, belong: belongTo };
            array.push();
            i += 1;
            await loopingJson(value, i, key);
        }
        else {
            obj = { type: typeof value, key, levelImbrication: imbrication, belong: belongTo };
        }
        array.push(obj);
    }
};
exports.treeJson();

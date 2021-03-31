#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeJson = void 0;
const fs_1 = __importDefault(require("fs"));
let array = [];
let toOut = [];
let i = 0;
let path = process.argv[3] || "test";
let children = [];
let child = [];
const json = {
    lastName: "lastname",
    firstname: "firstname",
    num: 0,
    data: {
        one: "one",
        two: {
            three: {
                four: 2
            }
        }
    },
    enum: ""
};
const treeJson = async (EntryJSON, nameJSON) => {
    await loopingJson(EntryJSON, i, nameJSON);
    if (!process.argv[2]) {
        throw new Error("Path file must be give.");
    }
    await ifChild();
    fs_1.default.writeFileSync(`${process.argv[2]}/${nameJSON}.json`, JSON.stringify(array));
};
exports.treeJson = treeJson;
const loopingJson = async (json, imbrication, belongTo, isChildren) => {
    for (const [key, value] of Object.entries(json)) {
        let obj;
        if (typeof value === "object" && !Array.isArray(value)) {
            path += `.${key}`;
            obj = { type: typeof value, key, levelImbrication: imbrication, belong: belongTo, path: `${path}`, children };
            array.push(obj);
            await loopingJson(value, i = i + 1, key, true);
        }
        else if (typeof value === "object" && Array.isArray(value)) {
            obj = { type: "array", key, levelImbrication: imbrication, belong: belongTo, path: `${path}`, children: [] };
        }
        else {
            obj = { type: typeof value, key, levelImbrication: imbrication, belong: belongTo, path: `${path}`, children: [] };
        }
        array.push(obj);
    }
};
const ifChild = async () => {
    array.forEach((obj) => {
        if (obj.levelImbrication > 0) {
            console.log(obj);
        }
    });
};
exports.treeJson(json, "test");

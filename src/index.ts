#!/usr/bin/env ts-node
import fs from 'fs';

let array: Array<any> = [];
let toOut: Array<any> = [];
let i = 0;
let path: string = process.argv[3] || "test";
let children: Array<object> = [];
let child: Array<object> = [];
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
}

interface IJSONOut {
    type: string;
    levelImbrication: number;
    belong: string;
    key: string;
    path?: string;
    children?: Array<object>;
}

export const treeJson = async (EntryJSON: object, nameJSON: string) => {
    await loopingJson(EntryJSON, i, nameJSON);
    if (!process.argv[2]) {
        throw new Error("Path file must be give.")
    }
    await ifChild(array);
    fs.writeFileSync(`${process.argv[2]}/${nameJSON}.json`, JSON.stringify(array))
}

const loopingJson = async (json: object, imbrication: number, belongTo: string, isChildren?: boolean) => {
    for (const [key, value] of Object.entries(json)) {
        let obj: IJSONOut;
        if (typeof value === "object" && !Array.isArray(value)) {
            path += `.${key}`;
            obj = { type: typeof value, key, levelImbrication: imbrication, belong: belongTo, path: `${path}`, children }

            array.push(obj);
            await loopingJson(value, i = i + 1, key, true);
        } else if (typeof value === "object" && Array.isArray(value)) {
            obj = { type: "array", key, levelImbrication: imbrication, belong: belongTo, path: `${path}`, children: [] }
        }
        else {
            obj = { type: typeof value, key, levelImbrication: imbrication, belong: belongTo, path: `${path}`, children: [] }
        }

        array.push(obj);
    }
}

const ifChild = async (arr: Array<IJSONOut>) => {
   
}
treeJson(json, "test");
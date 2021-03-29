#!/usr/bin/env ts-node
import fs from 'fs';

let array: Array<any> = [];
let i = 0;
const json = {lastName:"lastname",
firstname: "firstname", 
num: 0,
data:{
    one:"one",
    two:{
        three:2}
    }}

interface IJSONOut{
    type: string;
    levelImbrication: number;
    belong: string;
    key: string;
}

export const treeJson = async (EntryJSON: object,nameJSON:string) => {
    await loopingJson(EntryJSON,i,nameJSON);
    if(!process.argv[2]){
        throw new Error("Path file must be give.")
    }
    fs.writeFileSync(`${process.argv[2]}/${nameJSON}.json`,JSON.stringify(array))
}

const loopingJson = async (json:object,imbrication:number,belongTo:string) => {
    for(const [key,value] of Object.entries(json)){
        let obj: IJSONOut;
        if(typeof value === "object"){
            obj = {type: typeof value,key,levelImbrication:imbrication,belong: belongTo}
            array.push();
            i+=1;
            await loopingJson(value,i,key);
        } else {
            obj = {type: typeof value,key,levelImbrication: imbrication,belong:belongTo}
        }
        array.push(obj);
    }
}
// treeJson();
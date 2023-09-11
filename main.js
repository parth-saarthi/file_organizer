#!/usr/bin/env node
let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organiseObj = require("./commands/organise");
console.log(inputArr);

// node main.js tree "directorypath"
// node main.js organise "directorypath"
// node main.js help
let command = inputArr[0];
switch (command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organise":
        organiseObj.organiseKey(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("pls input right cmd");
        break;
}



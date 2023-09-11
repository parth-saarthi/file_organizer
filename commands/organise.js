
let fs = require("fs");
let path = require("path");
let types = {
    media: ["mp4","mkv","jpg","png","jpeg"],
    archives: ['zip','7z','rar','tar','gz','ar','iso',"xz"],
    documents: ['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex'],
    app: ['exe','dmg','pkg','deb']
}
function organiseFn(dirPath){
    // console.log("organise command implemented for ",dirPath);
    // 1. input -->directory path given  
    let destPath;  
    if(dirPath == undefined){
        destPath = process.cwd();
        return;
    }else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){

               // 2. create -> organised_files -> directory
               destPath = path.join(dirPath,"organised_file");
               if(fs.existsSync(destPath) == false){
               fs.mkdirSync(destPath);
               }

        }else{
            console.log("kindly enter the correct path");
            return;
        }

    }

    organiseHelper(dirPath, destPath);
    // 3. identify categories of all files present in the input directory ->
}


function organiseHelper(src, dest){
     // 3. identify categories of all files present in the input directory ->
    let childNames =  fs.readdirSync(src);
    // console.log(childNames);
    for(let i=0; i<childNames.length ;i++){
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i],"belong to --> ",category);
            //  4. copy/cut files to that organise directory inside of any of category folder 
             sendFiles(childAddress,dest,category);
        }
    }
}
function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1);
    for(let type in types){
        let cTypeArray = types[type];
        for(let i=0;i<cTypeArray.length;i++){
            if(ext == cTypeArray[i]){
                return type;
            }
        }
    }
    return "others";
}

function sendFiles(srcFilePath , dest , category){
    let categoryPath = path.join(dest , category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath , destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName,"copied to ",category);

}


module.exports = {
    organiseKey:organiseFn
}

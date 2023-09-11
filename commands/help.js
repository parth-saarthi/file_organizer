
// help implemented
function helpFn(dirPath){
    console.log(`
    list of all commands:
                    node main.js tree "directorypath"
                    node main.js organise "directorypath"
                    node main.js help
    
    `);
}
module.exports={
    helpKey: helpFn
}
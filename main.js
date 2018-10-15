const cloud_nodgen = require('./cloud-nodgen');

let argument = "";
let param = "";
process.argv.forEach(function (val, index) {
    if(index === 2){
        argument = val;
    }
    param = val
});


const args = argument.slice(6);
const command = argument.slice(0, 5);
// console.log(args);
// console.log(command);

if(command != 'cloud'){
    console.log("Sorry, wrong argument !\nPlease check user guide or try 'node main.js cloud:helps'");
    process.exit(-1)
}

switch (args) {
    case 'controllers':
        console.log("Creating controller with name '"+param+"'......");
        cloud_nodgen.generate(args, param)
    break;

    case 'models':
        console.log("Creating model with name: '"+param+"'......");
        cloud_nodgen.generate(args, param)
        break;

    case 'routes':
        console.log("Creating route with name: '"+param+"'......");
        cloud_nodgen.generate(args, param)
        break;
    
    case 'helps':
        console.log(`
        Clouds Node Generator version 1.0
        License: APACHE
        Author: Darmawan Zulkifli

        Usage: node main.js cloud:[Option] [Parameter/Name]

        Options:
        - controllers \t: this option will create your controller with name like [Parameter/Name].
        - models \t: this option will create your models with name like [Parameter/Name].
        - routes \t: this option will create your routes with name like [Parameter/Name].
        - version \t: this option will show you this package version.

        `);
        break;
    
    case 'version':
        console.log(`
        Clouds Node Generator version 1.0
        License: APACHE
        Author: Darmawan Zulkifli
        `);
        
        break;

    default:
        console.log("Sorry, wrong argument '"+args+"'!\nPlease check user guide or try 'node main.js cloud:helps'");
        break;
}


  
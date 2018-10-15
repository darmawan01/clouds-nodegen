const fs = require('fs'),
    text = require('./text-nodgen');

module.exports = {
    generate: function(args, params){
        fs.mkdir('./applications/'+args, function(err){
            if(err && err.code != 'EEXIST'){
                console.log(err);
            }

            if (fs.existsSync('./applications/'+args+'/'+params+'.js')) {
                return console.log('File name is exist, try another file name !');
            }else{
                if(args === 'routes'){
                    if (fs.existsSync('./applications/'+args+'/index.js') === false){
                        fs.writeFile('./applications/'+args+'/index.js', text.route_index() ,function(err){
                            if(err){
                                console.log(err);
                            }
                        })      
                    }
                }

                fs.writeFile('./applications/'+args+'/'+params+'.js', text.text_nodgen(args, params) ,function(err){
                    if(err){
                        console.log(err);
                    }

                    if (fs.existsSync('./applications/'+args+'/'+params+'.js')) {
                        console.log('\nSuccessfuly creating !');
                    }
                })
            }

            
        })
    },
}
module.exports = {
    text_nodgen: function(args, params){
        let text = ``;

        if (args === 'controllers') {
            text= `'this is controllers with ${params}'`
        }else if (args === 'models') {
            text= `'this is models with ${params}'`
        }else if (args === 'routes') {
            text= `'this is routes with ${params}'`
        }else{
            return console.log("Sorry, wrong argument '"+args+"'!\nPlease check user guide or try 'node main.js cloud:help'");
        }

        return text
    },

    route_index: function(){
        return text = `
            i am index
        `;
    }
}
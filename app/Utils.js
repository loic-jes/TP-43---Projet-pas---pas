class Utils {

    static init() {

        String.prototype.tryJsonParse = function (){
            let value
            try {
                value = JSON.parse(this)
            } catch {
                alert("Parse Error");
            }        
            return value  
        }      
    }

    static tryEval(expr){
        let value;
        try {
            value = eval(expr);
        } catch (error) {
            console.log("Eval error:" + error);
        }
        return value;
    }

    static capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }   


    

}
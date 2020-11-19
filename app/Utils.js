class Utils {

    static init() {

        String.prototype.tryJsonParse = function (){
            let value
            try {
                value = JSON.parse(this)
                // return JSON.parse(this)             
            } catch {
                alert("Parse Error");
            }        
            return value  
        }      
    }


    

}
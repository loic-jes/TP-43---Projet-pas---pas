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
        
        String.prototype.removeFirstandLastChar = function (){
            let value;
            value = this.substr(1,this.length -2);
            return value;
        }

        String.prototype.intoClass = function () {
            return Utils.tryEval(Utils.capitalize(this));
             
        }

        String.prototype.tryEval = function (context) {
            let value;
            let expr = this;
            if(context){
                expr = "context." + expr
            }
            try {
                value = eval(expr)
            } catch {
                console.log("tryEval Error", this)
            }
            return value;
        }

        $.fn.render = function(context){
            // console.log("render !");
            this.storeData();
            let elt = this;
            let bind = $(elt).data('bind');
            if(bind == undefined){
                let childs = $(elt).children()
                $(childs).each((i,child)=>{
                    $(child).render(context)
                })
                return;
            }
            let exprEval = bind.tryEval(context);
            if(exprEval != undefined){
                if(exprEval instanceof Model){
                    $(elt).data({item:exprEval})
                    let name = $(elt).data('name') || 'item';
                    let context = {}
                    context[name] = exprEval;
                    let childs = $(elt).children()
                    $(childs).each((i,child)=>{
                        $(child).render(context)
                    })
                }
                else{
                    // console.log(typeof exprEval);
                    if (typeof exprEval == "boolean") {
                        switch (exprEval) {
                            case true :
                                $(elt).html("Statut : On sale !");
                                break;
                            case false :
                                $(elt).html("Statut : Not on sale !");
                                break;
                        }
                    } else {
                    $(elt).html(exprEval)
                    }
                }
            }
        }


        $.fn.storeData = function(){

            // console.log(this);
            // console.log(this.data());

            let elt = this

            for (let expr in (elt.data())) {
                // console.log(this);
                // console.log(data);

                // console.log(expr);
                // console.log((this.data()));

                // console.log((elt.data(expr)));
            

                let datas = {}
                datas[expr] = elt.data(expr);
                $(elt).removeAttr(("data-" + expr));
                // console.log("");
                $(elt).data(expr, datas[expr])
                // console.log("");



            }

            
            
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
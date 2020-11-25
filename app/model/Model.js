class Model {

        assign(obj){
        for (let element in obj) {
            if (typeof this[element] =='number') {
                this[element] =  Number(obj[element]);
            } else if (this[element] != undefined && typeof this[element] == 'boolean') {
                this[element] = obj[element] == ('1' || true) ? true : false;
            } else {
                this[element] = String(obj[element]);
            }
        }
    }


    insert() {
        let table = this.constructor.name.toLowerCase();
        let fields = this;
        let deferred = $.Deferred();

        Rest.post({table, fields}).done((resp) => {

            let json = resp.tryJsonParse();

            if (json) {
                // TODO assign an ID
                fields.id = json;
                deferred.resolve(this.id); // Renvoie l'id de la ligne, je pourrais m'en passer grâce au this.id du dessus
            } else {
                console.log("Marche po");
                $('main').hide().html(resp).fadeIn();

                deferred.reject(json)
            }
        }).fail((resp) => {
            console.log("Marche po");
            deferred.reject(resp)
        })

        return deferred.promise();

    }

    update() {

        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        let fields = this;

        let deferred = $.Deferred();
        
        Rest.put({table, id, fields}).done((resp) => {

            let json = resp.tryJsonParse();

            if (json) {

                deferred.resolve(json);
            } else {

                console.log("Marche po");
                deferred.reject(json)
            }


        }).fail((resp) => {

            console.log("Marche po");
            deferred.reject(resp)
        })

        return deferred.promise();

    }

    delete() {

        let table = this.constructor.name.toLowerCase();
        let id = this.id;

        let deferred = $.Deferred();

        Rest.delete({table, id}).done((resp) => {

            let json = resp.tryJsonParse();

            if (json) {
                deferred.resolve(json)
            } else {
                console.log("Marche po");
                deferred.reject(json)
            }           
        }).fail((resp) => {
            console.log("Marche po");
            deferred.reject(resp);
        })

        return deferred.promise();


    }



    static select (params){

        let table = this.name.toLowerCase();
        params.table = table;
        // Je ne sais pas pourquoi mais si je définis "Let classe" ici, il n'est pas pris dans le if de 2e niveau lignes 126 et 135 et fait planter le JS
        let deferred = $.Deferred();

        Rest.get(params).done((resp) => {
            console.log(resp);
            if (resp) {

                let json = resp.tryJsonParse();
                // console.log("Length = "+json.length);         

                if (json.length !== 1) {

                    let arr = [];
                    let classe = Utils.tryEval(Utils.capitalize(table));


                    $(json).each((i, obj)  => {
                    arr.push(new classe(obj));
                    })
                    
                    deferred.resolve(arr);
                    let bp;

                } else {

                let classe = Utils.tryEval(Utils.capitalize(table));            
                let newItem = new classe(json[0]);
                deferred.resolve(newItem);
                let bp;

                }       
                
            } else {
                console.log("Marche po");
                deferred.reject(resp)
            }
        }).fail((resp) => {
            console.log("Marche po");
            deferred.reject(resp)
        })

        return deferred.promise();  
}

//     select (table, id=null){ // Old Select

//         // let table = this.constructor.name.toLowerCase();
//         // let id = prompt("Quelle id ?");
//         // let id = 3;

//         if (id !== null) {

//         let deferred = $.Deferred();

//         Rest.get({table, id}).done((resp) => {
//             console.log(resp);
//             if (resp) {

//             // resp = resp.substr(1,resp.length -2);
//             // resp = resp.removeFirstandLastChar();
//             // console.log(resp);
//             let json = resp.tryJsonParse();
//             // console.log(json);         
//             console.log("Length = "+json.length);         
//             let classe = Utils.tryEval(Utils.capitalize(table));
//             let newItem = new classe(json[0]);
//             deferred.resolve(newItem)
           
                
//             } else {
//                 console.log("Marche po");
//                 deferred.reject(resp)
//             }
//         }).fail((resp) => {
//             console.log("Marche po");
//             deferred.reject(resp)
//         })

//         return deferred.promise();  

//     } else {

//         let deferred = $.Deferred();

//         Rest.get({table}).done((resp) => {
//             // console.log(resp);
//             if (resp) {
//             // resp = resp.substr(1,resp.length -2);
//             // resp = resp.removeFirstandLastChar();
//             // console.log(resp);
//             let json = resp.tryJsonParse();
//             // console.log(json);         
//             let classe = Utils.tryEval(Utils.capitalize(table));
//             let arr = [];

//             $(json).each((i, obj)  => {
//                 arr.push(new classe(obj))
//             })

//             deferred.resolve(arr)
                
//             } else {
//                 console.log("Marche po");
//                 deferred.reject(resp)
//             }
//         }).fail((resp) => {
//             console.log("Marche po");
//             deferred.reject(resp)
//         })

//         return deferred.promise();  

        

//     }
// }

    



    
}
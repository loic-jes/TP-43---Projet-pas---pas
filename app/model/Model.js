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

static list = [];

    static select (params){

        let table = this.name.toLowerCase();
        params.table = table;
        
        let classe = table.intoClass();
        classe.list = [] // Va créer une list propre à la classe : Product.list, ou Category.list, par exemple

        let deferred = $.Deferred();

        Rest.get(params).done((resp) => {

            if (resp) {

                let json = resp.tryJsonParse();
                
                if (json.length !== 1) { // Si on nous renvoie une Array complète

                    let arr = [];
                    let classe = Utils.tryEval(Utils.capitalize(table));


                    $(json).each((i, obj)  => {
                    arr.push(new classe(obj));
                    classe.list.push(new classe(obj));
                    })

                    
                    deferred.resolve(arr);
                    let bp;

                } else {   // Si l'array ne contient qu'un unique objet

                let classe = Utils.tryEval(Utils.capitalize(table));            
                let newItem = new classe(json[0]);
                classe.list.push(newItem);
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

static getOne(id){
    let classe = this;
    return classe.list.filter(list => list.id == id)[0];

}

static getAll(){
    let classe = this;
    return classe.list
}

  set(prop, value, update){
        if(this[prop] != value){
            let obj = {}
            obj[prop] = value;
            this.assign(obj);
            //updated
            if(update){
                this.update().done(()=>{
                    if(prop == "active" && value == false){//Step 13
                        this.deleted = true;
                        this.constructor.list = this.constructor.list.filter((it) => it.id !== this.id)
                    }
                    
                    //updateview
                    App.updateView(this);
                })
            }
        }
        return this;
    }

    get deleteButton(){
        return new DeleteButton(this).render();
    }

    get gotoButton(){
        return new GotoButton(this).render();
    }



//     select (table, id=null){ // Old Select

//         // let table = this.constructor.name.toLowerCase();
//         // let id = prompt("Quelle id ?");
//         // let id = 3; // Essais manuels sur un ID

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
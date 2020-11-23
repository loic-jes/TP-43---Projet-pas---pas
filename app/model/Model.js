class Model {

        assign(obj){
        for (let element in obj) {
            if (typeof this[element] =='number') {
                this[element] =  Number(obj[element]);
            } else if (typeof this[element] =='boolean') {
                this[element] == ("1" || true) ? 1 : 0;
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
                this.id = json;
                deferred.resolve(this.id); // Renvoie l'id de la ligne, je pourrais m'en passer grâce au this.id du dessus
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


    select (){

    }

    



    
}
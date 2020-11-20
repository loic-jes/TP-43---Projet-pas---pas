class Model {

        assign(obj){
        for (let element in obj) {
            if (typeof this[element] =='number') {
                this[element] =  Number(obj[element]);
            } else if (typeof this[element] =='boolean') {
                this[element] == "0" ? false : true;
            } else {
                this[element] = String(obj[element]);
            }
        }
    }

    



    
}
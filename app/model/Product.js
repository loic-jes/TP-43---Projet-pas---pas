class Product extends Model {

    constructor(obj){

        super(obj);
        this.assign(obj);
        
        let bp;

        // for (let element in obj) {
        //     if (typeof this[element] =='number') {
        //         this[element] = obj[element] = Number(obj[element]);
        //     } else if (typeof this[element] =='boolean') {
        //         this[element] = obj[element] == "0" ? false : true;
        //     } else {
        //         this[element] = obj[element] = String(obj[element]);
        //     }
        // }
    }


    id = 0;
    active = true;
    category_id = 0;
    title = "";
    description = "";
    price = 0;
    onsale = false;
    ord = 0;

}
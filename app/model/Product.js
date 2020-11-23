class Product extends Model {

    constructor(obj){

        super(obj);
        super.assign(obj);      
    }


    id = 0;
    active = 1;
    category_id = 0;
    title = "";
    description = "";
    price = 0;
    onsale = 0;
    ord = 0;

}
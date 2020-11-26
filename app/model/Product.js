class Product extends Model {

    constructor(obj){

        super(obj);
        this.assign(obj);      
    }


    id = 0;
    active = true;
    category_id = 0;
    title = "";
    description = "";
    price = 0;
    onsale = true;
    ord = 0;

    get category() {
        return Category.getOne(this.category_id)
    }

}
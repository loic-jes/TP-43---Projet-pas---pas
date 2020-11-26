class Category extends Model{

    constructor(obj){
        super(obj);
        super.assign(obj);
        
        let bp;
    }


    id = 0;
    active = true;
    title = "";
    description = "";
    onsale = false;
    ord = 0;

    get product(){
        return Product.getAll().filter(list => list.category_id == this.id)

    }

}
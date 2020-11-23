class Category extends Model{

    constructor(obj){
        super(obj);
        super.assign(obj);
        
        let bp;
    }


    id = 0;
    active = 1;
    title = "";
    description = "";
    onsale = 0;
    ord = 0;

}
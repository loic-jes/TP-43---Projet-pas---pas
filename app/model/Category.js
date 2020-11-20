class Category extends Model{

    constructor(obj){
        super(obj);
        this.assign(obj);
        
        let bp;
    }


    id = 0;
    active = true;
    title = "";
    description = "";
    onsale = false;
    ord = 0;

}
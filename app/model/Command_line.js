class Command_line extends Model{

    constructor(obj){
        super(obj);
        this.assign(obj);
        
        let bp;
    }


    id = 0;
    active = true;
    product_id = 0;
    command_id = 0;
    quantity = 0;
    price = 0;

}
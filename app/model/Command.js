class Command extends Model{

    constructor(obj){
        super(obj);
        this.assign(obj);
        
        let bp;
    }


    id = 0;
    active = true;
    user_id = 0;
    numero = 0;

}
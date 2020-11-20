class User extends Model{

    constructor(obj){
        super(obj);
        this.assign(obj);
        
        let bp;
    }


    id = 0;
    active = true;
    nom = "";
    email = "";
    
}
/** @jsx createElement */
/*** @jsxFrag createFragment */

class BoolBadge{

    constructor(prop){
        this.prop = prop;
    }

    render(){
        const classe =  + (this.prop) ? "success" : "danger";
        const text = this.prop ? "O" : "N";
        let elt = (
            <span class={"badge badge-" + classe}>
                {text}
            </span>
        );
        return elt;
    }

}
/** @jsx createElement */
/*** @jsxFrag createFragment */

class BoolBadge{

    constructor(prop){
        this.prop = prop;
    }

    render(){
        const classe =  + (this.prop) ? "success" : "danger";
        const text = this.prop ? "On sale !" : "Not on sale !";
        let elt = (
            <span class={"badge badge-" + classe}>
                {text}
            </span>
        );
        return elt;
    }

}
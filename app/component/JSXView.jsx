/** @jsx createElement */
/*** @jsxFrag createFragment */

class JSXView {

    constructor(route, id) {     // Imaginons : product, null
        this.route = route;
        this.id = id

    }

    testif(table) {
        if (table == "product") {
            let billy = ( 
                <div>                                    
            <th scope="col">Prix</th>
            <th scope="col">Catégorie</th>
            <th scope="col">Vendu</th> 
            </div>            
            );
            return billy;
        }

    }

    render() {

        const classe = Utils.capitalize(this.route) // devrait donner Product
        const type = this.route;              // devrait donner product
        let elt;


        if (this.id != null) {


             elt = (
                <div>
                    <div class="col-12" data-bind={classe + ".list[0]"} data-name={'"' + type + '"'}>
                        <div class="col-12">
                            <h4>Fiche {type} : <span data-bind={type + ".title"}></span></h4>
                        </div>
                        <div class="col-12 d-flex">
                            <div data-bind={type + ".price.toFixed(2)"}></div>€
            <div class="ml-2" data-bind={type + ".onsaleBadge"}></div>
                            <div class="ml-2" data-bind={type + ".category.title"}>Aucune</div>
                        </div>
                        <div class="col-12" data-bind={type + ".description"}></div>
                    </div>
                </div>
            );

            return elt;


        } else if (this.id == null) {

             elt = (

                <div>
                    <div class="col-12">
                        <h4>{"Liste des " + type}</h4>
                    </div>
                    <div>
                        <table class="table table-light table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Designation</th>
                                    <th scope="col">Description</th>
                                    {this.testif(type)};
                                </tr>
                            </thead>
                            <tbody data-bind={classe + ".list[0]"} data-name={'"' + type + '"'}>
                                <tr data-bind={type}>
                                    <td>
                                        <span data-bind={type + ".title"}></span>
                                    </td>
                                    <td>
                                        <span data-bind={type + ".description"}></span>
                                    </td>
                                    <td class="d-flex align-items-center">
                                        <span data-bind={type + ".price.toFixed(2)"}></span>
                                        <span>€</span>
                                    </td>
                                    <td>
                                        <span data-bind={type + ".category.title"}>Aucune</span>
                                    </td>
                                    <td>
                                        <span data-bind={type + ".onsaleBadge"}></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );


        }

        return elt;

    }

}
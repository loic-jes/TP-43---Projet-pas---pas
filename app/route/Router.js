class Router {


    static route(route, postHash) {

        let page = "404";
        let data = []; //Pour stocker les objets necessaires aux select
        switch (route) {

            case "accueil" : 
            page = "accueil";
            break;

            case "produits" :
                if (postHash == null) {
                    page = "produits";
                    data.push({
                        table: "product",
                        orderby : "title ASC"
                    })


                } else {
                    page = "produit";
                    data.push({
                        table: "product",
                        id : postHash
                    })

                }

                data.push({table: "category"});
                // console.log(data);



                break;

            case "categories" :
                if (postHash == null) {
                    page = "categories";
                    data.push({
                        table: "category",
                        orderby : "title ASC"
                    })


                } else {
                    page = "category";
                    data.push({
                        table: "category",
                        id : postHash
                    })

                }
                data.push({table: "product"});
                // console.log(data);


                break;

            default : console.log("lol 404");
            break;

                
            
        }
        let requests = []
        let deferred = $.Deferred();
        let view;
        //TODO Requete pour récuperer la vue

        // let view = new JSXView(page, postHash).render()

        requests.push($.get('app/view/' + page + ".html").done((resp) => {
           
            view = $(resp);
               
        }).fail((resp) => {

            console.log(resp);
            console.log( "Erreur même sur le 404 ?");

        }))
        

        
        //TODO Requete pour les données (utiliser select)

        for (let list of data) {
            // console.log(list);
            // console.log(Utils.capitalize(list.table));
            // let classe = Utils.capitalize(list.table);
            // let classe = Utils.tryEval(Utils.capitalize(list.table));
            let classe = (list.table).intoClass();
            requests.push(classe.select(list));
            

            // console.log(data);
        }

        //Synchronisation
        $.when.apply($, requests).then(()=>{
            // console.clear();
            // console.log("Page : " + page);
            // console.log("Product Array");
            // console.log(Product.list);
            // console.log("Category Array");
            // console.log(Category.list);
            // console.log("____________________________");
            deferred.resolve(view)
        })
        return deferred.promise();


    }





}
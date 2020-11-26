class App {

    static datas = {};   
    
    static start() {

        //onpopstate
        window.onpopstate = () => {
            App.browse();
        }

        //correction burger : le réduit si on clique pour changer de vue
        $('.nav-link').on('click', (evt) => {
            let btn = $(evt.target).closest('.navbar').find('.navbar-toggler').not('.collapsed');
            btn ? btn.click() : null;
        })

        //chargement de la page
        $(document).ready(() => {
            App.loadClasses().done(() => {    // Charge les classes
                Utils.init()                  // Effectue les surcharges de String
                // App.loadAllTablesAndAssignAllClasses();       // Pas opti
                App.browse();  
                // App.test();
            })
    

        });

    }

    static browse() {
        //récupérer le hash et l'afficher dans main

        let hash = (window.location.hash || '#accueil').substring(1);    // Prend l'adresse en référence, où accueil si rien
        let route = null;
        let postHash = null;

        if (hash.indexOf('/') != -1) {    // Si y'a un /
            route = hash.split('/')[0];
            postHash = hash.split('/')[1];
        } else {
            route = hash;            // Sinon, on le prend entier
        }   
     //  le routeur en JS
        Router.route(route, postHash).done(view => {
            view.render()
            $('main').hide().html(view).fadeIn('fast');
        })
    }

    static classes = [
        "Utils", "Rest" , "model/Model", "route/Router"
    ];
    static extends = [
        "model/Product", "model/Category", "model/Command", "model/Command_line", "model/User"
    ];
    static loadClasses() {
        let deferred = $.Deferred();
        let _classes = $.map(App.classes, (cl) => {//Chargement de la classe mère
            return App.debug ? 
                App.getScript("app/" + cl + ".js") : 
                $.getScript("app/" + cl + ".js");
        });
        $.when.apply($, _classes).then(() => {//Puis chargement des classes filles
            let _extends = $.map(App.extends, (cl) => {
                return App.debug ? 
                    App.getScript("app/" + cl + ".js") : 
                    $.getScript("app/" + cl + ".js");
            });
            $.when.apply($, _extends).then(() => {
                deferred.resolve()
            });
        });
        return deferred.promise()
    }
    static getScript(scriptUrl) {
        let deferred = $.Deferred();
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.defer = true;
        script.onload = function(){
            deferred.resolve()
        };
        document.body.appendChild(script);
        return deferred.promise();
    }


    // static loadAllTablesAndAssignAllClasses() {

    //     let tableArrays = ["product", "category", "user", "command", "command_line"];

    //     $(tableArrays).each((e) => {

    //         Rest.get({table:tableArrays[e]}).done((viewStr) => {           


    //             let data = viewStr.tryJsonParse();
    //             let className = Utils.capitalize(tableArrays[e]);
    //             let classe = Utils.tryEval(className);
    //             let arr = [];
    
    //             $(data).each((i,obj) => {
    //                 arr.push(new classe(obj));
    //             })
         
    //             App.datas[tableArrays[e]] = arr;   

    //     })
    // })      
    // }

    static test() {

        // Tests : Qui sont sensés marcher (et marchent bien)

        // let produkt = new Product({ id: 160, active: false, category_id: 3, title: 'ABC', description: 'DEF', price: 10.5, onsale: false, ord: 100 });         // Marche bien avec une autre classe : pour l'exemple Category

        // let bp;
        
        // produkt.insert().done((resp) => {

        //     produkt.title = "Le title"; // Ne marche plus si on gris le champ : fonctionne bien
        //     produkt.update().done((resp) => {
        //         // console.log(resp);


        //         produkt.delete().done((resp) => {
        //             // console.log(resp);
        //         })
        //     })

            
        // });

        // produkt.select("product", 3);
        // produkt.select("product");

        // Product.select({id:3});
        // Product.select({});


// Rest.get({table:"product"}).done((resp) => {
//     // console.log(`Résultat de la requête get : ${resp}`);
//     let testParsing1 = resp.tryJsonParse();
//     for (let obj of testParsing1) {
//         console.log(obj);
//         let bp;
//         let product = new Product(obj);
//         console.log(product);


//         bp++;
//     }
//     let bp;
// })

// Rest.get({table:"category"}).done((resp) => {
//     // console.log(`Résultat de la requête get : ${resp}`);
//     let testParsing1 = resp.tryJsonParse();
//     for (let obj of testParsing1) {
//         console.log(obj);
//         console.log(typeof obj);
//         let bp;
//         let product = new Category(obj);

//         bp++;
//     }
//     let bp;
// })


// Rest.post({table : "product", fields: {title:"Blblbl",description:"Blblbl 2"}}).done((resp) => {console.log(`Résultat de la requête post : ${resp}`)});
// Rest.post({table : "product"}).done((resp) => {console.log(`Résultat de la requête post 2 : ${resp}`)});


// Rest.post({
//     table : "product",
//     fields : {
//         title : "blblbl",
//         description : "blblbl"
//     }
// }).done((resp) => {console.log(`Résultat de la requête post 3 : ${resp}`)});


// Rest.put ({
//     table : "product",
//      id : 1,
//     fields : {
//         title:"Pates au beurre",
//         description:"Eau plate"
//     }
// }).done((resp) => {
//     console.log("Résultat de la requête put " + resp);
// })

// Rest.delete({
//     table : "product",
//     id : 131,
// }).done((resp) => {
//     console.log(`Résultat de la requête Delete : ${resp}`)
// })




// Tests : Qui sont sensés être des erreurs (et sont donc stoppés via un false / break)

// Rest.get({
//     tablz : "Non valide"
// }).done((resp) => {
//     console.log("Sans table : requête get = " + resp)
// })

// Rest.post({
//     tablz : "Non valide"
// }).done((resp) => {
//     console.log("Sans table : requête post = " + resp)
// })

// Rest.put({
//     tablz : "Non valide"
// }).done((resp) => {
//     console.log("Sans table et/ou sans ID: requête put = " + resp)
// })
// Rest.delete({
//     tablz : "Non valide"
// }).done((resp) => {
//     console.log("Sans table et/ou sans ID: requête delete = " + resp)

// })
    }




  
}
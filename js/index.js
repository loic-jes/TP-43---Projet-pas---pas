App.start();
Utils.init()



// Tests : Qui sont sensés marcher (et marchent bien)


Rest.get({table:"product"}).done((resp) => {
    // console.log(`Résultat de la requête get : ${resp}`);
    let testParsing1 = resp.tryJsonParse();
    for (let obj of testParsing1) {
        console.log(obj);
        console.log(typeof obj);
        let bp;
        let product = new Product(obj);

        bp++;
    }
    let bp;
})

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
App.start();



// Tests : Qui sont sensés marcher (et marchent bien)


Rest.get({table:"Billy",id:0,where:"Test du where",order:"Test de l'order"}).done((resp) => {
    console.log(`Résultat de la requête get : ${resp}`)
})

Rest.post({table : "Billy", fields: {test1:"Blblbl",test2:"Blblbl 2"}}).done((resp) => {console.log(`Résultat de la requête post : ${resp}`)});


Rest.put ({
    table : "Billy",
    id : 0,
    fields : {
        repas:"Pates au beurre",
        boisson:"Eau plate"
    }
}).done((resp) => {
    console.log("Résultat de la requête put " + resp);
})

Rest.delete({
    table : "Billy",
    id : 0,
}).done((resp) => {
    console.log(`Résultat de la requête Delete : ${resp}`)
})




// Tests : Qui sont sensés être des erreurs (et sont donc stoppés via un false / break)

Rest.get({
    tablz : "Non valide"
}).done((resp) => {
    console.log("Sans table : requête get = " + resp)
})

Rest.post({
    tablz : "Non valide"
}).done((resp) => {
    console.log("Sans table : requête post = " + resp)
})

Rest.put({
    tablz : "Non valide"
}).done((resp) => {
    console.log("Sans table et/ou sans ID: requête put = " + resp)
})
Rest.delete({
    tablz : "Non valide"
}).done((resp) => {
    console.log("Sans table et/ou sans ID: requête delete = " + resp)

})
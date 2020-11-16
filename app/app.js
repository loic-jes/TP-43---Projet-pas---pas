class App {

    static start() {

        //onpopstate
        window.onpopstate = () => {
            App.browse();
        }
        //correction burger

        $('.nav-link').on('click', (evt) => {
            let btn = $(evt.target).closest('.navbar').find('.navbar-toggler').not('.collapsed');
            btn ? btn.click() : null;
        })

        //chargement de la page
        App.browse();

    }

    static browse() {
        //récupérer le hash et l'afficher dans main

        let hash = (window.location.hash || '#accueil').substring(1);    // Prend l'adresse en référence, où accueil si rien
        let page = null;

        if (hash.indexOf('/') != -1) {
            page = hash.split('/')[0];
        } else {
            page = hash;
        }   

        $.get('app/view/' + page + ".html").done((viewStr) => {

            let view = viewStr;       

            $('main').hide().html(view).fadeIn();

        })

      


        
    }

}
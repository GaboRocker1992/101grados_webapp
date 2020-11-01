

export const Strings = () => ({
    appName: "Proyecto 101 Grados: Gabriel Borbor",

    //Host for RestApi
    apiHost: "http://localhost:3001",
    
    //restApi Get Methods
    getAllActors: "/getActors",
    getMovieCast: "/getCast",
    getAllgenres: "/getGenres",
    getAllMoviews: "/getMovies",

    //restApi Post Methods
    saveActor: "/saveActor",
    updateActor: "/updateActor",
    saveMovie: "/saveMovie",
    updateMovie: "/updateMovie",

    //Menu options
    itemActors: "Actores",
    itemMovies: "Películas",

    //Buttons (general)
    saveButton: "Guardar",
    cancelButton: "Cancelar",


    //Strings for Actor Views
    actorTitle: "Actores.",
    editActorTitle: "Editar Actor",
    saveActorTitle: "Nuevo Actor",
    addNewActorButton: "Nuevo Actor",
    editActorButton: "Editar Actor",
    actorDataTableHeaders: [
        "Foto", "Nombre", "Edad", "Acciones"
    ],
    labelActorName: "Nombre",
    labelActorAge: "Edad",
    errorEmptyActorNameMssg: "Ingrese el nombre del actor.",
    errorEmptyActorAgeMssg: "Ingrese edad del actor.",
    errorNotValidActorAgeMssg: "Edad debe ser un valor númerico.",
    errorEmptyActorImageMssg: "Seleccione una image para el actor.",

    //Strings for Movies Views
    movieTitle: "Películas",
    editMovieTitle: "Editar Película",
    saveMovieTitle: "Nueva Película",
    addNewMovieButton: "Nueva Película",
    editMovieButton: "Editar Película",
    watchMovieButton: "Ver Info",
    movieDataTableHeaders: [
        "Nombre", "Duración (minutos)", "Género", "Acciones"
    ],
    errorEmptyMovieName: "Ingrese nombre de la película.",
    errorEmptyMovieDuration: "Ingrese duración de la película.",
    errorNotValidMovieDuration: "Duración debe ser un valor númerico.",
    errorEmptyMovieGenre: "Seleccione un género.",
    errorEmptyMovieSinopsis: "Ingrese una sinopsis para la película.",
    errorEmptyMovieCast: "Seleccione al menos un Actor.",
    labelMovieName: "Nombre",
    labelMovieDuration: "Duración (minutos)",
    labelMovieGenre: "Género",
    labaleMovieSinopsis: "Sinopsis",
    labaleMovieCast: "Reparto",

    getToken: "moviesPruebas",
});
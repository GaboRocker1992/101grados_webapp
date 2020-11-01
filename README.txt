Para que el proyecto pueda acceder al ApiRest debe configurar el host en:
    /src/utils/Strings.js
        cambiar atributo
            apiHost: "http://localhost:3001"

Descripción del Proyecto:
/utils: contiene archivos con parámetros generales que pueden usarse en cualquier parte del proyecto
    - generalStyles.js: Estilos Comunes aplicados a diferentes Componentes
    - Strings.js: Contiene todos Parámteros de Texto (labels, mensajes, titulos, etc, direcciones) usados por la api

/views: Contiene los diferentes componentes usados en la api
    - /actorView: Compoenentes para las transacciones referentes a actores
        - actors.js: componente principal de actores
        - editActor.js: componente modal para editar/crear actores

    - /moviesView: Componentes para las transacciones referentes a Películas
        - movies.js: componente principa de las Películas
        - watchMovie.js: componente modal par ver información de las Películas
        - editMovie.js: componente modal para editar/crear Película

    - /generalComponents: Componentes usados de maneral general en otros componentes
        - dataTableView.js: componente que contiene la tabla para visualizar los actores/películas

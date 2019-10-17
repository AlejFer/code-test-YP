# Prueba para futuros candidatos

Hola y gracias por aceptar la prueba para futuros candidatos de Yudonpay. Para la realización de esta se dispondrá de 1 día.

Necesitamos que hagas una biblioteca de películas donde se pueda:

* Crear una película dado el siguiente JSON 
**Con la llamada POST: /add** 
```json
{
    "movie": {
        "name": "Star Wars",
        "director": "George Lucas",
        "yearRelease": 1977,
        "genre": [
            "Sci-fi",
            "Adventure"
        ]
    }
}
```

* Poder editar y borrar la película
**Con la llamada POST: /mod** 
```json
{
    "old": {
        "name": "Star Wars",
        "director": "George Lucas",
        "yearRelease": 1977,
        "genre": [
            "Sci-fi",
            "Adventure"
        ]
    },
    "new": {
        "name": "Star Wars 2",
        "director": "George Lucas Jr",
        "yearRelease": 1997,
        "genre": [
            "Sci-fi",
            "Adventure",
            "Drama"
        ]
    }
}
```
**Con la llamada POST: /del** 
```json
{
    "name":"Star Wars 2",
    "year": 1997
}
```

* Listar las películas por género.
**Con la llamada GET: /movies?gen=Sci-fi** 

Se valorará:
* El uso de docker
* Realización de tests

Para la entrega se enviará un correo a **jorge.rodriguez@yudonpay.com** donde se compartirá un repositorio en github, bitbucket o gitlab (a tu elección) de dicha prueba.
**May the Force be with you!** 
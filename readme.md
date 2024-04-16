# Week 7 - Challenge 1

## API REST Things I already know / Lo que queráis (II)

Continuamos el API REST del Challenge anterior, que se conecte a un fichero JSON, para manipular recursos de tipo _cosas que ya sé_ (o cualquier otro).

Recordemos que el JSON tendrá una sola propiedad de tipo array, donde almacenarán objetos que representarán cosas que hemos aprendido en el bootcamp (o cualquier otro modelo).

- El modelo de datos estará representado como "entity" en una carpeta/fichero independiente.
- Dos opciones
  - El repositorio y el controller son clases que se instancian en el Router.
  - El repositorio, el controller y el router son clases que se instancian en app.
- Les errores se controlan mediante un middleware de errores.
- Añadimos validación con Joi
- Se testa el 100% del backend.

Intentamos deploy a Render.

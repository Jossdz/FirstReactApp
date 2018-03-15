# IronNews
![ironhack](https://cdn-images-1.medium.com/max/640/1*VQ_L84hZre7FXA9lRPlAzg.png)

>Este repo forma parte del primer maratón front-end de Ironhack, así que seguramente llegaste aquí por la presentación, caso contrario dejo a tu disposición el [link](https://medium.com/r/?url=https%3A%2F%2Fslides.com%2Fjossdz%2Fihreact%2F) a ella para que tengas un poco más de contexto.

## Primera aplicación con React ⚛

### Objetivos

1. Aprender las bases de un framework front-end
2. Configurar un proyecto completo para React.
3. Conocer como funcionan los componentes en React.
4. Desarrollar una aplicación basado en componentes.
5. Aprender que es una SPA (Single Page Application) y como se desarrolla en React.
6. Publicar una aplicación de react en Github pages.

### Requisitos

* instalar nodejs.
* clonar este repo en una carpeta ~/ironhack/.
* Asegurate de tener instalado chrome.

### Conocimientos Previos

* NPM.
* Javascript (ES6).
* HTML y el DOM(Document Object Model).
* Uso de la terminal.

## Iniciando un proyecto en react

Conociendo ya los conceptos básicos comencemos con un proyecto en forma, para esto haremos uso del repositorio que clonaste en un principio, si no lo hiciste aquí está para que puedas seguir con el ejercicio.

Vamos a crear una aplicación que nos permita leer noticias, donde tengo una navbar y una lista de fuentes, con las cuales puedo navegar hacia las noticias de cada una de ellas.

### 1. Creamos un componente header

La funcion de este componente es mostrar el uso y funcionamiento de rutas para crear una SPA en React.
por lo cual generamos el archivo `Header.js` dentro de

`src/components/`

(la razón de la H mayuscula es simple convención, y así evitamos confundir un componente de react en jsx con un elemento de html).

Necesitamos una barra, por tanto crearemos una navbar que solo muestre un texto que nos dirija a la raiz de nuestra app.

```JavaScript
import React from 'react';
export default () => {
  return(
    <div className="Header">
      <div className="navbar-fixed">
        <nav className="cyan">
          <div className="nav-wrapper">
            &nbsp; <a href="/" className="brand-logo center"> <i className="material-icons">timeline</i>R|N</a>
          </div>
        </nav>
      </div>
    </div>
  )
}
```

### Creamos 2 componentes basados en clases

Necesitamos un par de componentes los cuales nos ayudaran a darle forma a la app, los crearemos dentro de la carpeta `src/containers/` y los llamaremos `Home.js` y `Articles.js`.

un componente basado en clase tiene la siguiente estructura: 

``` JavaScript
  import React, { Component } from 'react';

  class Home extends Component {
    render(){
      return(
        <h1> Hola desde Home component </h1>
      )
    }
  }

  export default Home;
```

Eso ya es un componente listo para reaccionar a mucho de lo que nos provee react y su clase Component. De la misma manera creamos el componente Articles dentro de `Articles.js`.

``` JavaScript
  import React, { Component } from 'react';

  class Articles extends Component {
    render(){
      return(
        <h1> Hola desde Articles component </h1>
      )
    }
  }

  export default Articles;
```

Hasta ahora ya tenemos 2 componentes que contendrán información y uno que solamente muestra una barra de navegación, con esto listo podemos empezar a ponerlos en la vista con rutas.

### Rutas

Para el desarrollo de SPA utilizamos utilizamos el concepto de rutas en el front-end lo que nos permite navegar en la aplicación sin pedirle más información al Backend.
En esta ocación utilizaremos la librería `react-router-dom` para generar las rutas dentro de nuestra app.

ejecutamos el comando `npm i -S react-router-dom` dentro de nuestro proyecto ahora ya podemos hacer uso de la librería para crear nuestro archivo que nos permita navegar en la aplicación, para ello, creamos el archivo `routes.js` dentro  de la carpeta `src`

Necesitamos un nuevo componente que por convención nombramos `Routes` donde haremos uso de un par de componentes que nos brinda `react-router-dom` para mostrar nuestro componente `Home` en `/` (en la raíz) y el componente `Articles` en `/articles`

``` JavaScript
import React from 'react';
import {
  Route,
  BrowserRouter,
  } from 'react-router-dom';

/* componentes propios */
import Articles from './containers/Articles';
import Home from './containers/Home';

export default function Routes(){
  return(
    <BrowserRouter>
      <div>
          { /*
          Aquí los componentes que corresponden a cada ruta 
          Importante que la raíz vaya al final de todas.
          */ }
          <Route
            exact
            path="/"
            component={ Home }>
          </Route>

          <Route
            path="/articles/"
            component={ Articles }>
          </Route>
      </div>
    </BrowserRouter>
  )
}
```

Ahora ya tenemos un componente que en teoría nos muestra uno de nuestros 2 componentes propios dependiendo de la ruta, pero tenemos que integrarlo a nuestra aplicación.

Para integrarlo vamos al archivo `ìndex.js` que es quien se encarga de llevar nuestra aplicación al DOM.

``` JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import Header from './components/Header';

  ReactDOM.render(
  <div>
      { /* Ubicamos primero nuestra barra, la cual debe mostrarse en todo momento y debajo de ella el componente Routes que es quien cambia dependiendo de la ruta. */ }
    <Header/>
    <Routes/>
  </div>
  , document.getElementById('root'));
registerServiceWorker();
```

### Consumir una Api

Ahora que tenemos listos los componentes y tenemos una SPA en forma, es momento de traer las noticias a la vista principal. En la carpeta `src` hay listo un servicio con dos funciones las cuales obtienen las fuentes y las noticias dentro de las fuentes.

Lo que necesitamos es:

* Dentro de nuestro componente declarar una variable dentro de nuestro estado que contenga un arreglo, a la cual le agregamos las fuentes.
* Importamos a NavLink para dirigir los links a nuestras rutas.
* Importamos a `api` desde `src/api`.
* Creamos una función asincrona para obtener los datos desde el método getSources y los guarde en el estado.
* Ejecutamos la funcion cuando el componente esté listo.
* utilizamos la información en nuestra vista generando un Navlink que funge como la etiqueta `a` hacia  `/articles/${source.id}`.


``` JavaScript
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import api from '../api';

class Home extends Component {
  constructor(){
    this.state = {
      sources: [],
    };
    this.getSources = this.getSources.bind(this);
  }

  componentDidMount(){
    this.getSources();
  }

  async getSources(){
    let response = await api.getSources();
    this.setState({
      sources: response.sources
    });
  }

  render () {
    return (
      <div>
        {
          this.state.sources.map((source) =>
          //cada cosa iterable debe tener un key
          <NavLink to={ `/articles/${source.id}` }>
            <div className="container">
              <div className="row" key={source.id}>
                <div className="col s12 l12">
                  <div className="card-panel light-blue lighten-4">
                    <h2> { source.name } </h2>
                    <span className="black-text">
                      {source.description}
                    </span>
                    <br/>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
          )
        }
      </div>
    )
  }
}

export default Home;
```

ahora ya tenemos una lista de fuentes de noticias, pero utilizamos una variable en la ruta para ir hacia cada fuente, necesitamos decirle al Router que vamos a hacer uso de ella.

```JavaScript
  <Route exact path="/articles/:source_id" component={Articles}></Route>
```

Listo, ahora tenemos una vista con multiples fuentes que nos deben llevar a las noticias, ahora podemos ir al componente Articles y consumir los artidulos de dicha fuente.

Dentro del componente Articles necesitamos: 

* Importar NavLink y nuestra api.
* Definir en el estado la lista de articulos y el texto de la fuente.
* Crear una función que traiga las noticias de la fuente seleccionada.
* Pintar todas las noticias en nuestra vista.


```JavaScript
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import api from '../api';

class Articles extends Component {
  constructor(){
    super();
    this.state = {
      articles: [],
      source: '',
    }
    this.getArticles = this.getArticles.bind(this);
  }

  componentDidMount(){
    this.getArticles();
  }

  async getArticles(){
    let response = await api.getArticlesBySource(this.props.match.params.source_id)
    this.setState({
      articles: response.articles,
      source: response.source
    })
    console.log(response.articles);
  }

  render() {
    return (
      <div className="Articles container">
      <br/>
        <div className="row">
          <h1 className="center-align">{this.state.source}</h1>
        {
          this.state.articles.map((article) =>
          <div className="col s12 m6">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={article.urlToImage}/>
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4 truncate">{article.title}<i className="material-icons right">more_vert</i></span>
                <p><a href={article.url}>See more</a></p>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{article.title}<i className="material-icons right">close</i></span>
                <p>{article.description}</p>
              </div>
            </div>

          </div>
        )}
        <NavLink to={'/'}>
            <button className="btn btn-info col s12">Volver</button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Articles;
```
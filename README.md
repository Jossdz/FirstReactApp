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
import Logo from '../ironhack.png';
export default () => {
  return (
    <nav className="navbar is-dark is-fixed-top" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="/">
        <img src={Logo} alt="logo" height="28"/>
        IronNews
      </a>
    </div>
</nav>
  )
}
```

### Componentes Contenedores

Necesitamos un par de componentes los cuales nos ayudaran a darle forma a la app, existen ya estos componentes dentro de la carpeta `src/containers/`, los cuales son `Home.js` y `Articles.js`.

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
  BrowserRouter
} from 'react-router-dom';
import Home from './Home';
import Articles from './Articles';

export default function Routes(){
  return(
    <BrowserRouter>
    <div>
      <Route exact component={Home} path="/"></Route>
      <Route component={ Articles } path="/articles/:source_id"></Route>
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
import './index.css';
import Header from './components/Header';
import Routes from './containers/Routes'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div>
    <Header/>
    <br/>
    <Routes/>
  </div>
, document.getElementById('root'));
registerServiceWorker();
```

### Consumir una Api

Ahora que tenemos listos los componentes y tenemos una SPA en forma, es momento de traer las noticias a la vista principal. En la carpeta `src` hay listo un servicio con dos funciones las cuales obtienen las fuentes y las noticias dentro de las fuentes, así como métodos que llaman a la data en cada componente, es cuestión de llevarla a la vista.

Lo que necesitamos es:

* Dentro de nuestro componente declarar una variable dentro de nuestro estado que contenga un arreglo, a la cual le agregamos las fuentes.
* Importamos a NavLink para dirigir los links a nuestras rutas.
* Ejecutamos la funcion cuando el componente esté listo.
* utilizamos la información en nuestra vista generando un Navlink que sirve como la etiqueta `a` hacia  `/articles/${source.id}`.


``` JavaScript
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../api';

export default class Home extends Component{
  constructor(){
    super();
    this.state = {
      sources: []
    }
  }

  componentDidMount(){
    this.getSources();
  }

  async getSources(){
    const response = await api.getSources();
    this.setState({
      sources: response.sources
    })
    console.log(response.sources)
  }

  render(){
    return(
      <div className="container">
      <br/>
      <br/>
        {
          this.state.sources.map(source => 
            <div>
            <NavLink to={`/articles/${source.id}`}>
              <h1 className="is-size-2" key={source.id}> { source.name }</h1>
              <small> { source.description }</small>
            </NavLink>
              <hr/>
            </div>
          )
        }
      </div>
    )
  }
}
```

ahora ya tenemos una lista de fuentes de noticias, pero utilizamos una variable en la ruta para ir hacia cada fuente, necesitamos decirle al Router que vamos a hacer uso de ella.

```JavaScript
  <Route exact path="/articles/:source_id" component={Articles}></Route>
```

Listo, ahora tenemos una vista con multiples fuentes que nos deben llevar a las noticias, ahora podemos ir al componente Articles y consumir los artidulos de dicha fuente.

Dentro del componente Articles necesitamos: 

* Importar NavLink y nuestra api.
* Definir en el estado la lista de articulos y el texto de la fuente.
* Pintar todas las noticias en nuestra vista.

```JavaScript
import React, { Component } from 'react';
import api from '../api';
import {NavLink} from 'react-router-dom';

export default class Articles extends Component{
  constructor(){
    super()
    this.state = {
      articles: [],
      source: ''
    }
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
    console.log(this.props.match.params.source_id)
  }
  render(){
    return(
      <div>
      <br/>
      <h1 className="is-size-1">{ this.state.source }</h1>
      <NavLink to={'/'}>
        <button className="button is-warning">Back</button>
      </NavLink>
        {
          this.state.articles.map(article => 
            <div key={ article.id }>
              <h2 className="is-size-2 has-text-info"> { article.title }</h2>
              <img alt={article.title} src={article.urlToImage} width="200px"/>
              <small> { article.description } </small> 
            </div>
          )
        }
      </div>
    )
  }
}
```
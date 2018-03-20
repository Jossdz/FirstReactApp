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
import React, { Component } from 'react';
import api from '../api';

export default class Articles extends Component{
  constructor(){
    super()
  }
  
  async getArticles(){
    let response = await api.getArticlesBySource(this.props.match.params.source_id)
    this.setState({
      articles: response.articles,
      source: response.source
    })
    console.log(this.props.match.params.source_id)
  }
}
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
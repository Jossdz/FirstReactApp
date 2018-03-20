import React, { Component } from 'react';
import api from '../api';

export default class Home extends Comment{
  constructor(){
    super()
  }

  async getSources(){
    const response = await api.getSources();
    this.setState({
      sources: response.sources
    })
    console.log(response.sources)
  }

}
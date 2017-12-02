import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      term: '',
      location: '',
      radius: '',
      results: [],
      category: '',
      categories: ['coffee', 'arcades', 'galleries', 'tastingclasses', 'beaches']
    }
  }

  handleClick = () => {
    axios.post('http://localhost:4200/api/yelp', {...this.state})
         .then(results => {
           this.setState({ results: results.data })
        });
  }

  handleInput = (field, inputText) => {
    let newValue = {};
    newValue[field] = field === 'radius' ? Math.round(parseFloat(inputText) * 1609.34) : inputText;
    if (field === 'radius' && newValue[field] > 40000) { newValue[field] = 40000; };
    if (field === 'radius' && isNaN(newValue[field])) { newValue[field] = '' ;};
    this.setState(newValue);
  }

  render() {
    console.log(this.state);
    
    const results = this.state.results.map((result, i) => (
      <div className='result' key={ i }>
        <h2>{ result.name }</h2>
        <img src={ result.image_url } alt="business preview"/>
      </div>
    ))

    const categories = this.state.categories.map((category, i) => <option key={ i } value={ category }>{ category }</option>)

    return (
      <div className='app'>
        <h1>Yelp API Test</h1>
        <h2>Search Term:</h2>
        <input onChange={ (e) => this.handleInput('term', e.target.value) }
               placeholder='Search for businesses'/>
        <h2>Location:</h2>        
        <input onChange={ (e) => this.handleInput('location', e.target.value) }
               placeholder='Provo, Utah'/>
        <h2>Radius:</h2>
        <input onChange={ (e) => this.handleInput('radius', e.target.value) }
               placeholder='15 mile radius'/>
        <select onChange={ (e) => this.handleInput('category', e.target.value) }>
          <option value="">category</option>
          { categories }
        </select>
        <button onClick={ this.handleClick }>Find Businesses</button>
        <h1>Results:</h1>
        { results.length === 0 ? <h2>No results found</h2> : results }
      </div>
    );
  }
}

export default App;

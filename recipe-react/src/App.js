import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Cookies from './helpers/Cookies';
import UserAuth from './components/user_auth/UserAuth';
import Title from './components/Title';
import Result from './components/Result';
import Content from './components/user_auth/Content';
import Submit from './components/Submit';

class App extends Component {
	constructor() {
		super();

		this.state = {
			recipes: [],
			search: '',
      delete: false,
			url: 'https://still-castle-91949.herokuapp.com/',
			 user: false, // default user is no user
      // the app needs to do a request, so there will be a loading time
      // we want to display something else while it does that
      mode: 'loading',
      // url for the API we are using - uncomment the one you want to use

      // Express
      // url: 'http://localhost:8080',

      // Rails
      // url: 'http://localhost:3000',
		}

		this.getRecipes = this.getRecipes.bind(this);
    this.delete = this.delete.bind(this);
    this.updateState= this.updateState.bind(this);
  	}

  	componentDidMount(){
    this.initUser();
  }

  initUser(){
    // get the token from the cookie
    const token = Cookies.get('token');

    // if there is a token
    if(token && token !== ''){
      // send a request to our API to validate the user
      axios.get(`${this.state.url}users/validate`, {
        // include the token as a parameter
        params: {auth_token: token}})
        .then(res => { // the response will be the user
          // set the user in the state, and change the mode to content
          this.setState({user: res.data, mode: 'content'});
        })
        .catch(err => { // if there is an error
          Cookies.set('token', '') // take away the cookie
          // change the state so that there is no user and render the auth
          this.setState({user: false, mode: 'auth'});
        })
    } else { // if there is no token
      // we should render the auth forms
      this.setState({mode: 'auth'});
    }
  }

   setUser(user){
    // set a cookie with the user's token
    Cookies.set('token', user.token);
    // set state to have the user and the mode to content
    this.setState({user: user, mode: 'content'});
  }

    logout(){
    // take away the cookie
    Cookies.set('token', '');
    // remove the user and set the mode to auth
    this.setState({user: false, mode: 'auth'});
    window.location.href="/";
  }

    updateState() {
      this.setState({
        delete: true
      })
    }

    delete(ingr) {
      let ingrId = ingr;
      console.log(ingrId);
      let endpoint = this.state.url + 'api/' + 'delete/' + ingrId
      axios.delete(endpoint)
      .then(this.forceUpdate())
      // window.location.href="/";
    }

  renderView(){
    if(this.state.mode === 'loading'){
      return(
        <div className="loading">
          <img src="https://media.giphy.com/media/52qtwCtj9OLTi/giphy.gif"
            alt="loading" />
        </div>
      )
    } else if(this.state.mode === 'auth') {
      return (
        <UserAuth
          setUser={this.setUser.bind(this)}
          url={this.state.url}
        />
      )
    } else {
      return (
        <Content logout={this.logout.bind(this)} user={this.state.user} />
      )
    }
  }


	getRecipes(){

		const endpoint = this.state.url + 'api/' + 'all'
    console.log('inside getRecipes. endpoint:', endpoint);
		axios
			.get(endpoint, {params: {auth_token: this.state.user.token}})
			.then(response => this.setState({ recipes: response.data.recipes }))
			.catch(err => console.error(err));
	}

	submitIngredients(e){
		console.log('inside submitIngredients');
		e.preventDefault();

		//console.log(this.state.search);

		// GRAB VALUE FROM STATE
		let ingr = this.state.search;

		let endpoint = this.state.url + 'api/' + 'new/'

		axios.post(endpoint, {
     'userId': this.state.user.id,
			'ingr': ingr,
		})
		.then((data) => {
			console.log('sent to DB correctly ', data)
		})
		.catch(err => console.error(err));
	}

	handleChange(e){
		console.log('inside handleChange')
		console.log(e.target.value)
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (
		  <div className="App">
			  <Title/>
			  <Submit 
				  submitIngredients={this.submitIngredients.bind(this)}
				  handleChange={this.handleChange.bind(this)}
				  search={this.state.search}
			  />
				<button onClick={() => {this.getRecipes()}}> ViewSaved </button>
			  <Result 
				  recipes={this.state.recipes}
          delete={this.delete}
          updateState={this.updateState}
			  /> 
			  { this.renderView() }

			</div>
		);
	}
}

export default App;

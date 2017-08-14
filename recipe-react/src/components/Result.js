import React, { Component } from 'react';

class Result extends Component {
	constructor(props) {
		super(props)
		this.state={
			key: true
		}
	}

	deleteMe(id) {
		this.props.delete(id);
		this.props.updateState();
	}

	renderData(){
		return (
			<div>
				{this.props.recipes.map((ingredients, index) => {
					return (
						<div className="list" key={index}>
							Name: {ingredients.name} <br/>
							Calories: {ingredients.calories} <br/>
							Protein: {ingredients.protein + "g"} <br/>
							Sugar: {ingredients.sugar + "g"}<br/>
							<button onClick={() => {this.deleteMe(ingredients.id)}}> Delete </button>
						</div>

					)
				})}
			</div>
		);
	}

	
	render(){
		return(
			<div>
				{this.renderData()}
			</div>
		);
	}
}

export default Result
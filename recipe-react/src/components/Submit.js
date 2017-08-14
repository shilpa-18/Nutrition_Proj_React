import React from 'react';


const Submit = (props) => {

  return(
  	<form onSubmit={props.submitIngredients}>
	    <input 
			type="text"
			name="search"
			onChange={props.handleChange}
			value={props.search}
			placeholder="Search for ingredients"
		/>
		
		<div>
		<input type="submit" value="Submit" />
		</div>
		
	</form>
  );

}

export default Submit
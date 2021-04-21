import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    name: "",
    image: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const toy = {...this.state, likes: 0}

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(toy)
    }
    fetch("http://localhost:3000/toys", configObj)
    .then(res => res.json())
    .then(data => {
      console.log("data")
      this.props.handleSubmit(data) //let App know it needs to re-render with updated state
    })

    this.setState({
      name: "",
      image: ""
    })
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.onSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" value={this.state.name} onChange={this.handleChange} />
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" value={this.state.image} onChange={this.handleChange} />
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;

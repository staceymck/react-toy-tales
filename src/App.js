import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    this.getToys()
  }

  getToys = () => {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => {
      this.setState({
        toys: data
      })
      
    })
  }

  deleteToy = id => {
    const i = this.state.toys.findIndex(t => t.id === id)

    fetch(`http://localhost:3000/toys/${id}`, {method: "DELETE"})
    .then(res => {
      if (res.ok) {
        this.setState(state => {
          return {
            toys: [...state.toys.slice(0, i), ...state.toys.slice(i + 1)]
          }
        })
      } else {
        throw new Error("Something went wrong")
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleSubmit = newToy => {
    this.setState(state => {
      return {
        toys: [...state.toys, newToy]
      }
    })
  }

  addLike = id => {
    const toy = this.state.toys.find(t => t.id === id)
    
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({likes: toy.likes + 1}) //since it's a patch request,
      // we only need to send in the info we want to update for the toy,
      // but we could still send in the full toy if we wanted
    }
    
    fetch(`http://localhost:3000/toys/${id}`, configObj)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Something went wrong")
      }
    })
    .then(data => {
      this.setState(state => {
        const i = state.toys.findIndex(t => t.id === data.id)
        return {
          toys: [...state.toys.slice(0, i), data, ...state.toys.slice(i + 1)]
        }
      })
    })
    .catch(error => {
      console.log(error)
    })

    
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleSubmit={this.handleSubmit} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} addLike={this.addLike} />
      </>
    );
  }

}

export default App;

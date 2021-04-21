import React, { Component } from 'react';

class ToyCard extends Component {
  //needs to receive toy as props

  render() {
    const {id, image, name, likes} = this.props.toy

    return (
      <div className="card" id={`toy-${id}`}>
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button className="like-btn" onClick={() => this.props.addLike(id)}>Like {'<3'}</button>
        <button className="del-btn" onClick={() => this.props.deleteToy(id)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;

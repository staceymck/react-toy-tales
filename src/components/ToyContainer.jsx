import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  const toys = props.toys.map(toy => <ToyCard toy={toy} key={toy.id} deleteToy={props.deleteToy} addLike={props.addLike}/>)

  return(
    <div id="toy-collection">
      {toys}
    </div>
  );
}

export default ToyContainer;

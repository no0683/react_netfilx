import React from 'react';
import jumboData from './fixtures/jumbo';
import Jumbotron from './components/jumbotron/index';

export default function App() {
  return (
    <Jumbotron.Container>
      {jumboData.map((item) => (
        <Jumbotron key={item.id} direction={item.direction}>
        </Jumbotron>
      ))}
    </Jumbotron.Container>
  );
}

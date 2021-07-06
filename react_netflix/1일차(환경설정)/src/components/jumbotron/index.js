import React from 'react';
import { Container, Inner } from './styles/jumbotron';

export default function Jumbotron({ direction }) {
    return (
        <Inner direction={direction}>
            <p>Hello again!</p>
        </Inner>
    )
}

Jumbotron.Container = function JumbotronContainer({ children }) {
    return <Container>{children}</Container>;
}
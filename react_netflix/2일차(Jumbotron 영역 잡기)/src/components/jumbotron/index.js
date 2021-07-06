import React from 'react';
import { Container, Inner, Pane, Title, SubTitle, Image } from './styles/jumbotron';

export default function Jumbotron({ children, direction }) {
    return (
        <Inner direction={direction}>
            {children}
        </Inner>
    )
}

Jumbotron.Container = function JumbotronContainer({ children }) {
    return <Container>{children}</Container>;
}

Jumbotron.Pane = function JumbotronPane({ children }) {
    return <Pane>{children}</Pane>;
}

Jumbotron.Title = function JumbotronTitle({ children }) {
    return <Title>{children}</Title>;
}

Jumbotron.SubTitle = function JumbotronSubTitle({ children }) {
    return <SubTitle>{children}</SubTitle>;
}

Jumbotron.Image = function JumbotronImage({ children, ...restProps }) {
    return <Image {...restProps}></Image>;
}
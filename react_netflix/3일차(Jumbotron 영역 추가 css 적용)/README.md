## Netflix 클론 사이트 만들기(ver.2021/05/14)

<img src="public/images/misc/react_netflix_20210514.gif" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 Jumbotron영역에 추가적인 css효과를 주었습니다.
* 스타일 컴포넌트에서 createGlobalStyle을 사용하여 html,body와같은 전역으로 css효과도 주었습니다.
* normalize.css를 사용하여 브라우저별로 다른 스타일을 동일하게 맞춰 주었습니다. 

[jumbotron.js]
```javascript
import styled from 'styled-components/macro';

// Jumbotron 컨텐츠 아래에 선을 그려주기위해 한번더 감싸주었습니다.
export const Item = styled.div`
    display: flex;
    border-bottom: 8px solid #222;
    padding: 50px 5%;
    color: white;
    overflow: hidden;
`;

export const Inner = styled.div `
    display: flex;
    align-items: center;
    flex-direction: ${({ direction }) => direction};
    justify-content: space-between;
    max-width: 1100px;
    margin: auto;
    width: 100%;

    @media (max-width: 1000px) {
        flex-direction: column;
    }
`;

export const Container = styled.div ``;

export const Pane = styled.div `
    width: 50%;

    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 45px;
        text-align: center;
        box-sizing: border-box;
    }
`;

export const Title = styled.h1 `
    font-size: 50px;
    line-heght: 1.1;
    margin-bottom: 8px;

    @media (max-width: 600px) {
        font-size: 35px;
    }
`;

export const SubTitle = styled.h2 `
    font-size: 26px;
    font-weight: normal:
    line-height: normal;

    @media (max-width: 600px) {
        font-size: 18px;
    }
`;

export const Image = styled.img `
    max-width: 100%;
    height: auto;
`;
```

[global-styles.js]
```javascript
import { createGlobalStyle } from 'styled-components';

// a,body태그등 보통 초기화할때 필요한것들에게 css효과를 줄때 createGlobalStyle을 사용 합니다.
export const GlobalStyles = createGlobalStyle`
    html,body {
        height: 100%;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #000000;
        color: #333333;
        font-size: 16px;
    }

`;
```

[index.js]
```javascript
import React from 'react';
import { render } from 'react-dom';
import App from './app';
// 브라우저별로 다른 스타일을 통일시켜주기위해 normalize.css import 해줍니다.
import 'normalize.css';
// html,body영역과 같은 전역으로 css효과를 주기위해 미리만들어두었던 스타일 컴포넌트를 import 해줍니다.
import { GlobalStyles } from './global-styles';

// jsx문법에서는 2개이상의 태그가 나열되지않아 <></>의 fragment로 감싸주면 오류가 없어집니다.
render(<><GlobalStyles /><App /></>,
    document.getElementById('root'));
```

[Jumbotron/index.js]
```javascript
import React from 'react';
import { Container, Inner, Item, Pane, Title, SubTitle, Image } from './styles/jumbotron';

export default function Jumbotron({ children, direction }) {
    return (
        <Item>
            <Inner direction={direction}>
                {children}
            </Inner>
        </Item>
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
```
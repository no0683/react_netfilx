## Netflix 클론 사이트 만들기(ver.2021/05/17)

<img src="public/images/misc/react_netflix_20210517.gif" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 accordion 영역의 css 컴포넌트들을 세팅하고 별도 컴포넌트로 정리한다음 app.js로 최종적으로 적용시켜 렌더링 해주었습니다.

[src/containers/faqs.js]
```javascript
import React from 'react';
// 준비했던 accordion영역의 컴포넌트들과 컨텐츠 내용을 담은 json파일에서 data를 import 했습니다.
import Accordion from '../components/accordion';
import faqsData from '../fixtures/faqs.json';

export default function FaqsContainer() {
    return (
        // 컴포넌트들을 위치시키고 그 안의내용들은 map을 사용하여 적용 시켰습니다.
        <Accordion>
            <Accordion.Title>Frequently Asked Questions</Accordion.Title>
            {faqsData.map((item) => (
                <Accordion.Item key={item.id}>
                    <Accordion.Header>{item.header}</Accordion.Header>
                    <Accordion.Body>{item.body}</Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}
```

[app.js]
```javascript
import React from 'react';
import JumbotronContainer from './containers/jumbotron';
import FaqsContainer from './containers/faqs';
import FooterContainer from './containers/footer';

export default function App() {
  return (
    <>
      <JumbotronContainer />
      <FaqsContainer />
      <FooterContainer />
    </>
  );
}
```

[src/components/accordion/index.js]
```javascript
import React, { useState, useContext, createContext } from 'react';
import { Container, Frame, Title, Item, Inner, Header, Body } from './styles/accordion';

const ToggleContext = createContext();

export default function Accordion({ children, ...restProps }) {
    return (
        <Container {...restProps}>
            <Inner>{children}</Inner>
        </Container>
    );
}

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
};

Accordion.Frame = function AccordionFrame({ children, ...restProps }) {
    return <Frame {...restProps}>{children}</Frame>;
};

Accordion.Item = function AccordionItem({ children, ...restProps }) {
    const [toggleShow, setToggleShow] = useState(false);

    return (
        <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
            <Item {...restProps}>{children}</Item>
        </ToggleContext.Provider>
    );
};

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
    const { toggleShow, setToggleShow } = useContext(ToggleContext);
    return (
        <Header onClick={() => setToggleShow(!toggleShow)} {...restProps}>
            {children}
            {/* 이 부분은 header영역에서 x,+ 버튼기능을 담당할 영역 입니다. toggleShow값이 true이면 x버튼을 false이면 +버튼을 이미지를 통해 나타냅니다. */}
            {toggleShow ? <img src="/images/icons/close-slim.png" alt="Close"/> : <img src="/images/icons/add.png" alt="Open"/>}
        </Header>
    );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
    const { toggleShow } = useContext(ToggleContext);

    return toggleShow ? <Body {...restProps}>{children}</Body> : null;
};
```

[src/components/accordion/styles/accordion.js]
```javascript
import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    border-bottom: 8px solid #222;
`;

export const Inner = styled.div`
    display: flex;
    padding: 70px 45px;
    flex-direction: column;
    max-width: 815px;
    margin: auto;
`;

export const Item = styled.div`
    color: white;
    margin-bottom: 10px;
    max-width: 670px;

    &:first-of-type {
        margin-top: 3em;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 1px;
    font-size: 26px;
    font-weight: normal;
    background: #303030;
    padding: 0.8em 1.2em;
    user-select: none;
    align-items: center;

    img {
        filter: brightness(0) invert(1);
        width: 24px;

        @media (max-width: 600px) {
            width: 16px;
        }
    }

    @media (max-width: 600px) {
        font-size: 16px;
    }
`;

export const Body = styled.div`
    max-height: 1200px;
    transition: max-height 0.3s cubic-bezier(0.5, 0, 0.1, 1);
    font-size: 26px;
    font-weight: normal;
    line-height: normal;
    background: #303030;
    padding: 0.8em 2.2em 0.8em 1.2em;
    white-space: pre-wrap;
    user-select: none;

    @media (max-width: 600px) {
        font-size: 16px;
        line-height: 22px;
    }
`;

export const Frame = styled.div`
    margin-bottom: 40px;
`;

export const Title = styled.h1`
    font-size: 50px;
    line-height: 1.1;
    margin-top: 0;
    margin-bottom: 8px;
    color: #fff;
    text-align: center;

    @media (max-width: 600px) {
        font-size: 35px;
    }
`;
```
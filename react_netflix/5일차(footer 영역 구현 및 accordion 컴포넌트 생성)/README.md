## Netflix 클론 사이트 만들기(ver.2021/05/16)

<img src="public/images/misc/react_netflix_20210516.gif" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 Footer영역을 구현하고 Accordion영역의 컴포넌트를 만들었습니다.

* 오늘 새로 알게된 내용
1. useContext, createContext hook 사용
2. 기존에 props로 값을 전달하고 모든 컴포넌트 계층들이 얽혀있었음
3. redux처럼 하나의 저장소를 두고 하위 컴포넌트에서 쓰고싶은 값을 상위 컴포넌트에서 직접 가져다 쓸 수 있게되었음 

[src/components/footer/index.js]
```javascript
import React from 'react';
import { Container, Row, Column, Link, Title, Text, Break } from './styles/footer';

export default function Footer({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
}

Footer.Row = function FooterRow({ children, ...restProps }) {
    return <Row {...restProps}>{children}</Row>;
}

Footer.Column = function FooterColumn({ children, ...restProps }) {
    return <Column {...restProps}>{children}</Column>;
}

Footer.Link = function FooterLink({ children, ...restProps }) {
    return <Link {...restProps}>{children}</Link>;
}

Footer.Title = function FooterTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
}

Footer.Text = function FooterText({ children, ...restProps }) {
    return <Text {...restProps}>{children}</Text>;
}

Footer.Break = function FooterBreak({ children, ...restProps }) {
    return <Break {...restProps}>{children}</Break>;
}
```

[src/containers/footer.js]
```javascript
import React from 'react';
// Footer 컴포넌트를 import 시키고 만들어두었던 각각의 컴포넌트들을 적용 시켰습니다.
import Footer from '../components/footer/index';

export default function FooterContainer() {
    return (
        <Footer>
            <Footer.Title>Questions? Contact us.</Footer.Title>
            <Footer.Break />
            <Footer.Row>
                <Footer.Column>
                    <Footer.Link href="#">FAQ</Footer.Link>
                    <Footer.Link href="#">Investor Relations</Footer.Link>
                    <Footer.Link href="#">Ways to Watch</Footer.Link>
                    <Footer.Link href="#">Coporate Information</Footer.Link>
                    <Footer.Link href="#">Netflix Originals</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                    <Footer.Link href="#">Help Centre</Footer.Link>
                    <Footer.Link href="#">Jobs</Footer.Link>
                    <Footer.Link href="#">Terms of Use</Footer.Link>
                    <Footer.Link href="#">Contact Us</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                    <Footer.Link href="#">Account</Footer.Link>
                    <Footer.Link href="#">Redeem Gift Cards</Footer.Link>
                    <Footer.Link href="#">Privacy</Footer.Link>
                    <Footer.Link href="#">Speed Test</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                    <Footer.Link href="#">Media Centre</Footer.Link>
                    <Footer.Link href="#">Buy Gift Cards</Footer.Link>
                    <Footer.Link href="#">Cookie Preferences</Footer.Link>
                    <Footer.Link href="#">Legal Notices</Footer.Link>
                </Footer.Column>
            </Footer.Row>
            <Footer.Break />
            <Footer.Text>Netflix United Kingdom</Footer.Text>
        </Footer>
    );
}
```

[app.js]
```javascript
import React from 'react';
import JumbotronContainer from './containers/jumbotron';
// 화면에 표시하기위해 상위 컴포넌트 app.js로 import하고 코드를 적용시켰습니다.
import FooterContainer from './containers/footer';

export default function App() {
  return (
    <>
      <JumbotronContainer />
      <FooterContainer />
    </>
  );
}
```

[src/components/accordion/index.js]
```javascript
import React, { useState, useContext, createContext } from 'react';
import { Container, Frame, Title, Item, Inner, Header, Body } from '../footer/styles/footer';

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
  // Accordion 영역에서 on/off 역할을하기위해 useState를 만들었습니다.
    const [toggleShow, setToggleShow] = useState(false);

    return (
      // 만들어둔 useState의 값을 다른 컴포넌트들에게도 사용하도록 Provider로 감싸고 value에 toggleShow, setToggleShow 값을 넣어줬습니다.
        <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
            <Item {...restProps}>{children}</Item>
        </ToggleContext.Provider>
    );
};

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
  // Accordion.Item 컴포넌트에서 제공해준 state값을 useContext를 통해 가져옵니다.
    const { toggleShow, setToggleShow } = useContext(ToggleContext);
    return (
      // Header 컴포넌트를 클릭하면 setTollgeShow에의해 toggleShow에 들어있던 false값이 true로 바뀌게 됩니다.
        <Header onClick={() => setToggleShow(!toggleShow)} {...restProps}>
            {children}
        </Header>
    );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  // Accordion.Body 컴포넌트에도 Accordion.Item 컴포넌트에서 제공해준 state값중 toggleShow값을 useContext를 통해 가져옵니다.
    const { toggleShow } = useContext(ToggleContext);
  // 조건연산문을통해 toggleShow가 true이면 Body컴포넌트값을 내보내고 false이면 null값을 내보내도록 return 해줍니다.
    return toggleShow ? <Body {...restProps}>{children}</Body> : null;
};
```
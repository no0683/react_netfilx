## Netflix 클론 사이트 만들기(ver.2021/05/15)

* 오늘은 app.js에서 return되있는 jumbotron영역의 값을 별도의 컨테이너에담아 리팩토링 시켰습니다.
* footer영역을 만들기위해 폴더와 파일들을 만들고 필요한 스타일 컴포넌트들을 만들어주었습니다.

* 추가로 알았던 사실은 import 할때 {} 중괄호를 쓸때와 안쓸때의 차이점은 import해오는 오브젝트에서 defalut처리가되있으면 {}를 씌우지않는다는점을 알게되었습니다.
반대로 오브젝트에서 default없이 export되었다면 반드시 {}를 씌워 import 해줘야 오류가 안납니다. 

[src/containers/jumbotron.js]
```javascript
import React from 'react';
import jumboData from '../fixtures/jumbo';
import Jumbotron from '../components/jumbotron/index';

export default function JumbotronContainer() {
  return (
    <Jumbotron.Container>
      {jumboData.map((item) => (
        <Jumbotron key={item.id} direction={item.direction}>
          <Jumbotron.Pane>
            <Jumbotron.Title>{item.title}</Jumbotron.Title>
            <Jumbotron.SubTitle>{item.subTitle}</Jumbotron.SubTitle>
          </Jumbotron.Pane>
          <Jumbotron.Pane>
            <Jumbotron.Image src={item.image} alt={item.alt} />
          </Jumbotron.Pane>
        </Jumbotron>
      ))}
    </Jumbotron.Container>
  );
}
```

[app.js]
```javascript
import React from 'react';
import JumbotronContainer from './containers/jumbotron';

export default function App() {
  return (
    <JumbotronContainer />
  );
}

```

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

[src/components/footer/styles/footer.js]
```javascript
import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    padding: 70px 56px;
    margin: auato;
    max-width: 1000px;
    flex-direction: column;

    @media (max-width: 1000px) {
        padding: 70px 30px;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    grid-gap: 15px;

    @media (max-width: 1000px) {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
`;

export const Link = styled.a`
    color: #757575;
    margin-bottom: 20px;
    font-size: 13px;
    text-decoration: none;
`;

export const Title = styled.p`
    font-size: 16px;
    color: #757575;
    margin-bottom: 40px;
`;

export const Text = styled.p`
    font-size: 16px;
    color: #757575;
    margin-bottom: 40px;
`;

export const Break = styled.p`
    flex-basis: 100%;
    height: 0;
`;
```
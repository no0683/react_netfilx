## Netflix 클론 사이트 만들기(ver.2021/05/13)

* 오늘은 Jumbotron영역의 나머지 컨텐츠데이터를 불러오고 컨텐츠별로 묶는작업을 했습니다.

[jumbotron.js]
```javascript
import styled from 'styled-components/macro';

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

// jumbotron컨텐츠들을 묶어줄 Pane 컴포넌트와 기타 데이터들도 styled 컴포넌트를 생성 해줍니다.
export const Pane = styled.div `
    width: 50%;
`;

export const Title = styled.h1 ``;

export const SubTitle = styled.h2 ``;

export const Image = styled.image ``;
```

[index.js]
```javascript
import React from 'react';
// 만들어두었던 스타일 컴포넌트들을 import 해줍니다.
import { Container, Inner, Pane, Title, SubTitle, Image } from './styles/jumbotron';

export default function Jumbotron({ children, direction }) {
    return (
        <Inner direction={direction}>
        {/* Jumbotron영역 내부에 들어갈 컨텐츠들이 들어갈 공간을 함수의 인자로 설정하고 <Inner> 컴포넌트 내부에 선언 해줍니다. */}
            {children}
        </Inner>
    )
}

Jumbotron.Container = function JumbotronContainer({ children }) {
    return <Container>{children}</Container>;
}

// 컨테이너와 마찬가지로 app.js에서 컴포넌트로 쓰이기위해 생성 해줍니다.
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

[app.js]
```javascript
import React from 'react';
import jumboData from './fixtures/jumbo';
import Jumbotron from './components/jumbotron/index';

export default function App() {
  return (
    <Jumbotron.Container>
      {jumboData.map((item) => (
        <Jumbotron key={item.id} direction={item.direction}>
        {/* Pane 스타일 컴포넌트로 각 요소들마다 구분지어줍니다. */}
          <Jumbotron.Pane>
          {/* 미리 만들어두었던 컴포넌트를 각각의 위치에 적용 시킵니다. */}
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

[jumbo.json]
```javascript
// 배열안에 객체단위로 jumbotron영역의 컨텐츠들의 데이터들을 json파일로 모아둡니다.
[
    {
      "id": 1,
      "title": "Enjoy on your TV.",
      "subTitle": "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
      "image": "/images/misc/home-tv.jpg",
      "alt": "Tiger King on Netflix",
      "direction": "row"
    },
    {
      "id": 2,
      "title": "Download your programmes to watch on the go.",
      "subTitle": "Save your data and watch all your favourites offline.",
      "image": "/images/misc/home-mobile.jpg",
      "alt": "Watch on mobile",
      "direction": "row-reverse"
    },
    {
      "id": 3,
      "title": "Watch everywhere.",
      "subTitle": "Stream unlimited films and TV programmes on your phone, tablet, laptop and TV without paying more.",
      "image": "/images/misc/home-imac.jpg",
      "alt": "Money Heist on Netflix",
      "direction": "row"
    }
  ]
```
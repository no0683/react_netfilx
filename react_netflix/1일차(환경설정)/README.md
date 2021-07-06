## Netflix 클론 사이트 만들기(ver.2021/05/12)

* 오늘은 사이트를 만들기위한 환경설정을 했습니다.
1. react-app에서 불필요한 파일과 내용들을 삭제
2. npm add를 이용하여 'firebase, fuse.js, normalize.css, react-router-dom, styled-components' 다운

* Netflix의 jumbotron영역을 만들어줬습니다.

[jumbotron.js]
```javascript
// styled-components를 이용하여 style에 관련된 컴포넌트를 만들영역
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
```

[index.js]
```javascript
import React from 'react';
// 만들어두었던 style 컴포넌트를 import 합니다.
import { Container, Inner } from './styles/jumbotron';

// Jumbotron영역을 담당할 컴포넌트 입니다. 상위 컴포넌트(app.js)로 전달하기위해 direction이라는 인자를 설정 해둡니다.
export default function Jumbotron({ direction }) {
    return (
        // 하위 컴포넌트(style 컴포넌트)로 전달하기위해 direction이라는 props를 만들어주고 값은 Jumbotron함수의 인자로 설정 합니다.
        <Inner direction={direction}>
            <p>Hello again!</p>
        </Inner>
    )
}

// Jumbotron 컴포넌트를 감쌀 Container 컴포넌트를 만들고 미리 만들어두었던 style 컴포넌트 Container를 선언해준뒤 안쪽에 앞으로 내용들이 들어갈 children인자를 넣어 줍니다.
Jumbotron.Container = function JumbotronContainer({ children }) {
    return <Container>{children}</Container>;
}
```

[app.js]
```javascript
import React from 'react';
// jumbotron에 들어갈 데이터들을 jumbo.json 파일에 저장해두었는데 가져옵니다.
import jumboData from './fixtures/jumbo';
// Jumbotron영역을 담당할 컴포넌트도 가져옵니다.
import Jumbotron from './components/jumbotron/index';

export default function App() {
  return (
      // 먼저 Jumbotron 컨테이너 컴포넌트로 감싸 줍니다.
    <Jumbotron.Container>
    {/* map을 활용하여 jumbo.json에있는 내용들을 Jumbotron 컴포넌트의 props의 값으로 가져옵니다. */}
      {jumboData.map((item) => (
        <Jumbotron key={item.id} direction={item.direction}>
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
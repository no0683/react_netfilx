## Netflix 클론 사이트 만들기(ver.2021/05/21)

<img src="public/images/misc/react_netflix_20210521.gif" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 Header영역에 logo를 넣어주고 bg를 넣어주었습니다.
* 그리고 Header안에 Title과 이전에 만들었던 OptForm을 재사용하여 Header영역을 완성 시켰습니다.

[src/containers/header.js]
```javascript
import React from 'react';
import Header from '../components/header/index';
import * as ROUTES from '../constants/routes';
// 사용할 로고파일을 import 해줍니다.
import logo from '../logo.svg';

export default function HeaderContainer({ children }) {
    return (
        <Header>
            <Header.Frame>
                <Header.Logo to={ROUTES.HOME} alt="Netflix" src={logo} /> {/* import해온 logo를 src값으로 넣어줍니다. */}
                <Header.ButtonLink to={ROUTES.SIGN_IN}>Sign In</Header.ButtonLink>
            </Header.Frame>
            {children}
        </Header>
    );
}
```

[src/components/header/styles/header.js]
```javascript
import styled from 'styled-components';
import { Link as ReactRouterLink } from 'react-router-dom';

// header.js컨테이너에서 src로 props를 생성해 파일이름을 적용시켜주면 아래 조건연산문을통해 true가되어 배경을 바꿀 수 있습니다.
// 현재 src에 별다른 값을 넣지않았으므로 false가되어 기본 배경화면이 나오게됩니다.
export const Background = styled.div`
    display: flex;
    flex-direction: column;
    background: url(${({ src }) => src ? `../images/misc/${src}.jpg` : '../images/misc/home-bg.jpg'}) top left / cover no-repeat;
`;

export const Frame = styled.div``;

export const Container = styled.div`
    display: flex;
    margin: 0 56px;
    height: 64px;
    align-items: center;
    padding: 18px 0;
    justify-content: space-between;

    a {
        display: flex;
    }

    @media (max-width: 1000px) {
        margin: 0 30px;
    }
`;

export const Logo = styled.img`
    height: 32px;
    width: 108px;
    margin-right: 40px;

    @media (min-width: 1449px) {
        height: 45px;
        width: 167px;
    }
`;

export const ButtonLink = styled(ReactRouterLink)`
    display: block;
    background-color: #e50914;
    width: 84px;
    height: fit-content;
    color: white;
    border: 0;
    font-size: 15px;
    border-radius: 3px;
    padding: 8px 17px;
    cursor: pointer;
    text-decoration: none;
    box-sizing: border-box;

    &:hover {
        background-color: #f40612;
    }
`;
```

[src/pages/home.js]
```javascript
import React from 'react';
import HeaderContainer from '../containers/header';
import Feature from '../components/feature/index';
import OptForm from '../components/opt-form/index';
import JumbotronContainer from '../containers/jumbotron';
import FaqsContainer from '../containers/faqs';
import FooterContainer from '../containers/footer';

export default function Home() {
    return (
        <>
            <HeaderContainer>
                <Feature>
                    <Feature.Title>
                        Unlimited films, TV programmes and more.
                    </Feature.Title>
                    <Feature.SubTitle>
                        Watch anywhere. Cancel at any time.
                    </Feature.SubTitle>
                    <OptForm>
                        <OptForm.Input placeholder="Email address" />
                        <OptForm.Button>Try it now</OptForm.Button>
                        <OptForm.Break />
                        <OptForm.Text>
                            Ready to watch? Enter your email to create or restart your membership
                        </OptForm.Text>
                    </OptForm>
                </Feature>
            </HeaderContainer>
            <JumbotronContainer />
            <FaqsContainer />
            <FooterContainer />
        </>
    );
}
```

[src/components/feature/index.js]
```javascript
import React from 'react';
import { Container, Title, SubTitle } from './styles/feature';

export default function Feature({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>
}

Feature.Title = function FeatureTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
}

Feature.SubTitle = function FeatureSubTitle({ children, ...restProps }) {
    return <SubTitle {...restProps}>{children}</SubTitle>;
}
```

[src/components/feature/styles/feature.js]
```javascript
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    border-bottom: 8px solid #222;
    padding: 165px 45px;
`;

export const Title = styled.h1`
    color: #fff;
    max-width: 640px;
    font-size: 50px;
    font-weight: 500;
    margin: auto;

    @media (max-width: 600px) {
        font-size: 35px;
    }
`;

export const SubTitle = styled.h2`
    color: #fff;
    max-width: 640px;
    font-size: 26px;
    font-weight: normal;
    margin: 16px auto;

    @media (max-width: 600px) {
        font-size: 18px;
    }
`;
```

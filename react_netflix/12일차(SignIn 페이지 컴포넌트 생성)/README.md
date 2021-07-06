## Netflix 클론 사이트 만들기(ver.2021/05/23)

* 오늘은 sign-in 페이지 영역 구현을위한 컴포넌트들을 준비 했습니다.
* 기존에 만들었던 HeaderContainer, FooterContainer 컴포넌트들을 그대로 재사용했고 HeaderContainer 안에 로그인 기능만 추가하면 됩니다.

[src/pages/signin.js]
```javascript
// signin 로그인 페이지를 그려주는 컴포넌트 입니다.
// 아래 2개의 컴포넌트들 재사용 했습니다.
import HeaderContainer from '../containers/header';
import FooterContainer from '../containers/footer';

export default function Signin() {
    return (
        <>
            <HeaderContainer>

            </HeaderContainer>
            <FooterContainer />
        </>
    );
}
```

[src/components/form/index.js]
```javascript
// 로그인 form 컴포넌트들의 부품이 모여있는 곳 입니다.
import React from 'react';
import { Container, Base, Error, Title, Text, TextSmall, Link, Input, Submit } from './styles/form';

export default function Form({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
}

Form.Base = function FormBase({ children, ...restProps }) {
    return <Base {...restProps}>{children}</Base>;
};

Form.Error = function FormError({ children, ...restProps }) {
    return <Error {...restProps}>{children}</Error>;
};

Form.Title = function FormTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
};

Form.Text = function FormText({ children, ...restProps }) {
    return <Text {...restProps}>{children}</Text>;
};

Form.TextSmall = function FormTextSmall({ children, ...restProps }) {
    return <TextSmall {...restProps}>{children}</TextSmall>;
};

Form.Link = function FormLink({ children, ...restProps }) {
    return <Link {...restProps}>{children}</Link>;
};

Form.Input = function FormInput({ children, ...restProps }) {
    return <Input {...restProps}>{children}</Input>;
};

Form.Submit = function FormSubmit({ children, ...restProps }) {
    return <Submit {...restProps}>{children}</Submit>;
};
```

[src/components/form/styles/form.js]
```javascript
// 로그인 form 부품들의 css를 담당할 컴포넌트들이 모인 곳 입니다.
import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';

export const Container = styled.div``;

export const Error = styled.div``;

export const Base = styled.div``;

export const Title = styled.h1``;

export const Text = styled.p``;

export const TextSmall = styled.p``;

export const Link = styled(ReachRouterLink)`
    color: #fff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const Input = styled.input``;

export const Submit = styled.button``;
```
## Netflix 클론 사이트 만들기(ver.2021/05/24)

<img src="public/images/misc/react_netflix_20210524.gif" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 sign-in 페이지 영역에 만들어두었던 로그인 폼 컴포넌트들을 위치시키고 각각 css를 적용 시켜주었습니다.

[src/pages/signin.js]
```javascript
// state사용을위해 useState Hook을 import 했습니다.
import React, { useState } from 'react';
import HeaderContainer from '../containers/header';
import FooterContainer from '../containers/footer';
// 만들어두었던 로그인 폼 컴포넌트들을 실제 페이지화면에 그리기위해 import 했습니다.
import Form from '../components/form/index';

export default function Signin() {
    // 이메일,비밀번호,에러에대한 state 초기값으로 ''을 주었습니다.
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // 이 부분은 submit 버튼이 아래 조건들이라면 비활성화되도록 만들기위한 역할을 합니다.
    const isInvalid = password === '' || emailAddress === '';
    const handleSignIn = (event) => {
        event.preventDefault();
    }
    return (
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>Sign In</Form.Title>
                    {/* error값이 있을경우 에러표시창 영역 입니다. 현재는 값이없어 실제화면에는 보이지 않습니다. */}
                    {error && <Form.Error>{error}</Form.Error>}

                    <Form.Base onSubmit={handleSignIn} method="POST">
                        <Form.Input
                            {/* 이메일 입력창의 값은 emailAddress state값으로 하는데 onChange 속성을통해 입력창의 변화가 있을시 target의 value값을 setEmailAddress를 통해 state값을 변경 시켜 줍니다. */}
                            placeholder="Email address"
                            value={emailAddress}
                            onChange={({ target }) => setEmailAddress(target.value)}
                         />
                        <Form.Input
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                         />
                         {/* button 태그의 disalbed 속성은 버튼을 비활성화시킬때 사용 합니다. */}
                         <Form.Submit disabled={isInvalid} type="submit">
                             Sign In
                         </Form.Submit>
                         <Form.Text>
                             New to Netflix? <Form.Link to="/signup">Sign up now.</Form.Link>
                         </Form.Text>
                         <Form.TextSmall>
                             This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
                         </Form.TextSmall>
                    </Form.Base>
                </Form>
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
import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 660px;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 5px;
    width: 100%;
    margin: auto;
    max-width: 450px;
    padding: 60px 68px 40px;
    box-sizing: border-box;
    margin-bottom: 100px;
`;

export const Error = styled.div`
    background: #e87c03;
    border-radius: 4px;
    font-size: 14px;
    margin: 0 0 16px;
    color: #fff;
    padding: 15px 20px;
`;

export const Base = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 450px;
    width: 100%;
`;

export const Title = styled.h1`
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 28px;
`;

export const Text = styled.p`
    color: #737373;
    font-size: 16px;
    font-weight: 500;
`;

export const TextSmall = styled.p`
    margin-top: 10px;
    font-size: 13px;
    line-height: normal;
    color: #8c8c8c;
`;

export const Link = styled(ReactRouterLink)`
    color: #fff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const Input = styled.input`
    background: #333;
    border-radius: 4px;
    border: 0;
    color: #fff;
    height: 50px;
    line-height: 50px;
    padding: 5px 20px;
    margin-bottom: 20px;

    &:last-of-type {
        margin-bottom: 30px;
    }
`;

export const Submit = styled.button`
    background: #e50914;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    margin: 24px 0 12px;
    padding: 16px;
    border: 0;
    color: #fff;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
    }
`;
```
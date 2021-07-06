## Netflix 클론 사이트 만들기(ver.2021/05/18)

<img src="public/images/misc/react_netflix_20210518.gif" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 accordion 영역의 opt-form영역을 구현 했습니다.
* 마찬가지로 opt-form의 컴포넌트들의 index.js 파일과 스타일 컴포넌트들의 opt-form.js파일을 만들고 최종적으로 faqs.js 컨테이너에 적용 시킵니다.

[src/components/opt-form/index.js]
```javascript
import React from 'react';
import { Container, Input, Button, Text, Break } from './styles/opt-form';

export default function OptForm({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
}

OptForm.Input = function OptFormInput({ ...restProps }) {
    return <Input {...restProps}/>;
};

OptForm.Button = function OptFormButton({ children, ...restProps }) {
    return (
        <Button {...restProps}> 
            {children} <img src="/images/icons/chevron-right.png" alt="Try now"/>
        </Button>
    );
};

OptForm.Text = function OptFormText({ children, ...restProps }) {
    return <Text {...restProps}>{children}</Text>;
};

OptForm.Break = function OptFormBreak({ ...restProps }) {
    return <Break {...restProps} />;
};
```

[src/components/opt-form/styles/opt-form.js]
```javascript
import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    margin-top: 20px;
    flex-wrap: wrap;

    @media (max-width: 1000px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const Input = styled.input`
    max-width: 450px;
    width: 100%;
    border: 0;
    padding: 10px;
    height: 70px;
    box-sizing: border-box;
`;

export const Button = styled.button`
    display: flex;
    align-items: center;
    height: 70px;
    background: #e50914;
    color: #fff;
    text-transform: uppercase;
    padding: 0 32px;
    font-size: 26px;
    border: 0;
    cursor: pointer;

    &:hover {
        background: #f40612;
    }

    @media (max-width: 1000px) {
        height: 50px;
        font-size: 16px;
        margin-top: 20px;
        font-weight: bold;
    }

    img {
        margin-left: 10px;
        filter: brightness(0) invert(1);
        width: 24px;

        @media (max-width: 1000px) {
            width: 16px;
        }
    }
`;

export const Text = styled.p`
    font-size: 19.2px;
    color: #fff;
    text-align: center;

    @media (max-width: 600px) {
        font-size: 16px;
        line-height: 22px;
    }
`;

export const Break = styled.p`
    flex-basis: 100%;
    height: 0;
`;
```

[src/containers/faqs.js]
```javascript
import React from 'react';
import Accordion from '../components/accordion';
import faqsData from '../fixtures/faqs.json';
import OptForm from '../components/opt-form/index';

export default function FaqsContainer() {
    return (
        <Accordion>
            <Accordion.Title>Frequently Asked Questions</Accordion.Title>
            {faqsData.map((item) => (
                <Accordion.Item key={item.id}>
                    <Accordion.Header>{item.header}</Accordion.Header>
                    <Accordion.Body>{item.body}</Accordion.Body>
                </Accordion.Item>
            ))}

            <OptForm>
                <OptForm.Input placeholder="Email address" />
                <OptForm.Button>Try it now</OptForm.Button>
                <OptForm.Break />
                <OptForm.Text>
                    Ready to watch? Enter your email to create or restart your membership
                </OptForm.Text>
            </OptForm>
        </Accordion>
    );
}
```
## Netflix 클론 사이트 만들기(ver.2021/05/26)

<img src="public/images/misc/react_netflix_20210526.gif" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 회원가입기능을 담당할 signup 페이지를 만들었습니다.
* 기존 signin 페이지에서 만들었던 form을 그대로 재사용 했습니다.

[src/pages/signup.js]
```javascript
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import HeaderContainer from '../containers/header';
import FooterContainer from '../containers/footer';
import Form from '../components/form/index';
import * as ROUTES from '../constants/routes';

export default function Signup() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);
    const [firstName, setFirstName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = firstName === '' || password === '' || emailAddress === '';

    const handleSignUp = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>Sign Up</Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}

                    <Form.Base onSubmit={handleSignUp} method="POST">
                        <Form.Input 
                            placeholder="First Name"
                            value={firstName}
                            onChange={({ target }) => setFirstName(target.value)}
                        />
                        <Form.Input 
                            placeholder="Email address"
                            value={emailAddress}
                            onChange={({ target }) => setEmailAddress(target.value)}
                        />
                        <Form.Input 
                            type="password"
                            placeholder="Password"
                            value={password}
                            autoComplete="off"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <Form.Submit disabled={isInvalid} type="submit">
                            Sign Up
                        </Form.Submit>

                        <Form.Text>
                            Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
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
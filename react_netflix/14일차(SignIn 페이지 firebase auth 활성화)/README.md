## Netflix 클론 사이트 만들기(ver.2021/05/25)

<img src="public/images/misc/react_netflix_20210525.gif" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 이메일과 패스워드를 입력하고 실제로 로그인 기능을 구현 해봤습니다.
* 먼저 firebase의 auth에서 이메일 로그인 방식을 활성화 시켜주고 firebase.auth() 로 접근해 코드를 입력해주면 firebase에 사용자 로그인정보기록이있으면 페이지이동이되고 기록이없는 로그인 시도였다면 에러메세지가 나오도록 했습니다.

[src/pages/signin.js]
```javascript
// 최상위 컴포넌트 index.js에서 provider의 value값인 firebase를 사용하기위해 useContext 훅을 import 했습니다.
import React, { useState, useContext } from 'react';
// 로그인 성공시 페이지이동을 위해 useHistory 훅을 import 했습니다.
import { useHistory } from 'react-router-dom';
// FirebaseContext.Provider의 value값을 가져오기위해 import 했습니다.
import { FirebaseContext } from '../context/firebase';
import HeaderContainer from '../containers/header';
import FooterContainer from '../containers/footer';
import Form from '../components/form/index';
// 페이지들의 경로를 모아둔 파일도 import 했습니다.
import * as ROUTES from '../constants/routes';

export default function Signin() {
    // useHistory 훅을 사용하기위해 별도의 변수로 저장 했습니다.
    const history = useHistory();
    // 최상위 컴포넌트 index.js에서 provider의 value값인 firebase를 가져왔습니다.
    const { firebase } = useContext(FirebaseContext);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = password === '' || emailAddress === '';
    const handleSignIn = (event) => {
        event.preventDefault();

        firebase
            .auth()
            // 이메일과 패스워드를 입력 합니다.
            .signInWithEmailAndPassword(emailAddress, password)
            // 로그인이 성공했다면 아래 설정한 경로의 페이지로 이동 합니다.
            .then(() => {
                history.push(ROUTES.BROWSE);
            })
            // 만일 로그인 실패하거나 적절치 못한 입력이었다면 이메일,패스워드 입력란을 공란으로 초기화하고 적절한 에러 메세지가 나오게끔 했습니다.
            .catch((error) => {
                setEmailAddress('');
                setPassword('');
                setError(error.message);
            })
    }
    return (
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>Sign In</Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}

                    <Form.Base onSubmit={handleSignIn} method="POST">
                        <Form.Input
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
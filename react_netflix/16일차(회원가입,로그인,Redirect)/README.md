## Netflix 클론 사이트 만들기(ver.2021/05/27)

* 오늘은 실제로 회원가입을위한 signup페이지에서 정보를 입력하면 firebase로 정보가 저장되고 이후 로그인(signin)이 가능하도록 해주었습니다.
* 그리고 Redirect를 통해 user가 로그인되었을떄의 path와 로그인이 안되어있을때 path를 조건에맞게 설정해주었습니다.

[ 오늘의 느낀점 ]
* firebase를 통해 회원가입정보가 push되고 저장된 정보를 토대로 로그인을 하면 실제도 되는것이 신기했다.
* Redirect라는것을 이용하면 로그인된상태에서 보여지는 페이지와 로그인이 안된상태에서 보여지는 페이지를 조정할수 있다는것도 알았다.
* 현재는 100% 이해가 되진않아 만족스럽진않지만 좀 더 실습해보고 곱씹어 봐야겠다.


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

        // 회원가입시 firebase와 상호작용하는 부분
        firebase
            .auth()
            // 이메일과 패스워드로 신규유저를 만듭니다.
            .createUserWithEmailAndPassword(emailAddress, password)
            .then((result) =>
                result.user
                    .updateProfile({
                        displayName: firstName,
                        photoURL: Math.floor(Math.random() * 5) + 1
                    })
                    .then(() => {
                        history.push(ROUTES.BROWSE);
                    })
            )
            .catch((error) => {
                setFirstName('');
                setEmailAddress('');
                setPassword('');
                setError(error.message);
            })
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

[src/helpers/routes.js]
```javascript
// 이부분은 Redirect를 통해 조건에따라 각각 다른 페이지로 연결되는 컴포넌트들을 만들었습니다.
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {
    return (
        <Route 
            {...rest}
            render={() => {
                if (!user) {
                    return children;
                }

                if (user) {
                    return (
                        <Redirect 
                            to={{
                                pathname: loggedInPath
                            }}
                        />
                    )
                }

                return null;
            }}
        />
    )
}

export function ProtectedRoute({ user, children, ...rest }) {
    return (
        <Route 
            {...rest}
            render={({ location }) => {
                if (user) {
                    return children;
                }

                if (!user) {
                    return (
                        <Redirect 
                            to={{ pathname: 'signin', state: { from: location }}}
                        />
                    )
                }
                
                return null;
            }}
        />
    )
}
```

[app.js]
```javascript
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/home';
import Browse from './pages/browse';
import Signup from './pages/signup';
import Signin from './pages/signin';
import * as ROUTES from './constants/routes';
// 만들어두었던 Redirect 컴포넌트들을 import 했습니다.
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';

export default function App() {
  const user = null;

  return (
    <Router>
    {/* 기존 Route를 없애고 만들어둔 Redirect 컴포넌트를 사용하고 props를 설정해주었습니다. */}
    {/* 이렇게하는것은 로그인을 했을때 넘어가는 페이지와 로그아웃되었을때 넘어가는 페이지가 각각 다르게 하기 위함 입니다. */}
      <IsUserRedirect
        user={user}
        loggedInPath={ROUTES.BROWSE}
        path={ROUTES.SIGN_IN}
        exact
      >
        <Signin />
      </IsUserRedirect>
      <IsUserRedirect
        user={user}
        loggedInPath={ROUTES.BROWSE}
        path={ROUTES.SIGN_UP}
        exact
      >
        <Signup />
      </IsUserRedirect>
      <ProtectedRoute 
        user={user} 
        path={ROUTES.BROWSE} 
        exact
      >
        <Browse />
      </ProtectedRoute>
      <IsUserRedirect
        user={user}
        loggedInPath={ROUTES.BROWSE}
        path={ROUTES.HOME}
      >
        <Home />
      </IsUserRedirect>
    </Router>
  );
}
```
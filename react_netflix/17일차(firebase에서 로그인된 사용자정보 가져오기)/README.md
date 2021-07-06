## Netflix 클론 사이트 만들기(ver.2021/05/28)

* 오늘은 localStorage와 firebase에 기록된 사용자정보를 이용하여 로그인상태가 유지되도록 했습니다.

[src/hooks/use-auth-listener.js]
```javascript
import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';

export default function useAuthListener() {
    // 먼저 user라는 state를 만들고 값으로 localstorage에 저장되어있는 key값중 authUser를 가져옵니다.
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('authUser'))
    );
    // firebase를 사용하기위해 useContext를 사용하여 가져옵니다.
    const { firebase } = useContext(FirebaseContext);
    
    // useEffect는 class형 컴포넌트 생활주기단계에서 componentDidMount, componentDidUpdate와 같은개념으로 컴포넌트가 렌더링될때마다 실행되는 함수 입니다.
    useEffect(() => {
        // onAuthStateChanged는 firebase에 저장되어있고 현재 로그인된 사용자정보를 가져올때 사용 합니다.
        // onAuthStateChanged 매개변수를 지정하고 if/else문을 사용하여 식별 합니다.
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if(authUser) {
                // 현재 로그인된 사용자가있다면 localstorage에 'authUser'라는 key값에 firebase에서 현재 로그인된 사용자정보를 가져옵니다.
                localStorage.setItem('authUser', JSON.stringify(authUser));
                // 가져온 사용자 정보를 setUser를 통해 user state값을 변경 합니다.
                setUser(authUser);
            } else {
                // 현재 로그인된 사용자가없다면(로그아웃시) 추가했던 'authUser'라는 key값을 삭제 합니다.
                localStorage.removeItem('authUser');
                // user state값을 null값으로 변경 합니다.
                setUser(null);
            }
        });
        // useEffect에서 return을 사용하고 값을주면 componentWillUnMount 같이 과거의 값은 쌓이지않고 깨끗이 정리됩니다.
        return () => listener();
        // [] 빈 괄호로두면 컴포넌트가 렌더링될때 딱 1번만 실행 됩니다.
        // 빈 괄호안에 컴포넌트를 넣으면 해당 컴포넌트의 값이 변경 될때만 실행 됩니다.
    }, []);

    // 마지막으로 firebase에서 가져온 user값을 return 해줍니다.
    return { user };
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
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
// 로그인된 유저정보를 가져오기위해 useAuthListener 함수를 가져옵니다.
import useAuthListener from './hooks/use-auth-listener';

export default function App() {
    // 이제 user의 값은 firebase의 사용자 정보중 로그인된 유저정보를 나타냅니다.
  const { user } = useAuthListener();
  console.log(user);

  return (
    <Router>
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
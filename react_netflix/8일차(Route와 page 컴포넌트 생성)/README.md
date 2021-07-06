## Netflix 클론 사이트 만들기(ver.2021/05/19)

* 오늘은 Route를 이용해 각각 path를 설정하여 지정한 컴포넌트로 이동하게끔 파일을 만들어주었습니다.

[src/constants/routes.js]
```javascript
// Route의 path의 값으로 미리 변수를 만들었습니다.
export const HOME = '/';
export const BROWSE = '/browse';
export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
```

[app.js]
```javascript
import React from 'react';
// Route를 사용하기위한 환경설정을 위해 BrowseRouter를 import 해줍니다.
import { BrowserRouter as Router, Route } from 'react-router-dom';
// 각각 페이지를 담당할 컴포넌트들을 import 해줍니다.
import Home from './pages/home';
import Browse from './pages/browse';
import Signup from './pages/signup';
import Signin from './pages/signin';
// Route의 path로 쓰일 변수들을 모아논 컴포넌트들도 import 해줍니다.
import * as ROUTES from './constants/routes';

export default function App() {
  return (
    <Router>
      <Route exact path="/browse">
        <Browse />
      </Route>
      <Route exact path="/signin">
        <Signin />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path={ROUTES.HOME}>
        <Home />
      </Route>
    </Router>
  );
}

```

[src/pages/Home.js]
```javascript
import React from 'react';
import JumbotronContainer from '../containers/jumbotron';
import FaqsContainer from '../containers/faqs';
import FooterContainer from '../containers/footer';

export default function Home() {
    return (
        <>
            <JumbotronContainer />
            <FaqsContainer />
            <FooterContainer />
        </>
    );
}
```

[src/pages/browse.js]
```javascript
import React from 'react';

export default function Browse() {
    return <p>Hello from the browse!</p>;
}
```

[src/pages/signin.js]
```javascript
import React from 'react';

export default function Signin() {
    return <p>Hello from the sign in!</p>;
}
```

[src/pages/signup.js]
```javascript
import React from 'react';

export default function Signup() {
    return <p>Hello from the sign up!</p>;
}
```
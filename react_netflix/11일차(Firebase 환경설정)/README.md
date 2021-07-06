## Netflix 클론 사이트 만들기(ver.2021/05/22)

<img src="public/images/misc/react_netflix_20210522.jpg" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 Firebase라는 서비스를 통해 앞으로 쓰일 컨텐츠들의 데이터를 저장하고 간단하게 백엔드기능을 구현할 수 있도록 환경설정을 했습니다.

[src/lib/firebase.prod.js]
```javascript
// firebase사용을위해 필요한 옵션들을 import 합니다.
import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// 데이터파일에저장된 데이터들을 불러옵니다.
import { seedDatabase } from '../seed';

// firebase사이트에서 저장소를 만들게되면 얻을수있는 값을 config 변수에 저장 합니다.
const config = {
    apiKey: "AIzaSyDpRbymB6Ku1-4w-D4878AsY_zB0mZkcug",
    authDomain: "netflix-d7de8.firebaseapp.com",
    projectId: "netflix-d7de8",
    storageBucket: "netflix-d7de8.appspot.com",
    messagingSenderId: "822421330353",
    appId: "1:822421330353:web:924b729d033677770d0590"
};

// 저장한 config를 initializeApp을통해 활성화 시키고 별도 변수로 저장 합니다.
const firebase = Firebase.initializeApp(config);

// import한 데이터파일 매개변수로 firebase를 연동 시킵니다.
seedDatabase(firebase);

// 최종적으로 export 해줍니다.
export { firebase };
```

[src/seed.js]
```javascript
// 이파일은 컨텐츠들의 데이터가 모여있는 곳 입니다.
export function seedDatabase(firebase) {
    function getUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const piece = (Math.random() * 16) | 0;
          const elem = c === 'x' ? piece : (piece & 0x3) | 0x8;
          return elem.toString(16);
      });
    }
  
    /* Series
      ============================================ */
    // Documentaries
    firebase.firestore().collection('series').add({
      id: getUUID(),
      title: 'Tiger King',
      description: 'An exploration of big cat breeding and its bizarre underworld, populated by eccentric characters.',
      genre: 'documentaries',
      maturity: '18',
      slug: 'tiger-king',
    });
    .
    .
    .
```

[src/context/firebase.js]
```javascript
import { createContext } from 'react';

export const FirebaseContext = createContext(null);
```

[src/index.js]
```javascript
import React from 'react';
import { render } from 'react-dom';
import App from './app';
import 'normalize.css';
import { GlobalStyles } from './global-styles';
// 최상위 컴포넌트인 index.js로 firebase 저장소를 import하고 속해있는 모든 자식컴포넌트들에서 firebase의 데이터를 가져다쓸 수 있도록 따로 Context를 만들어 Provider를 통해 감싸 주었습니다.
import { firebase } from './lib/firebase.prod';
import { FirebaseContext } from './context/firebase';

render(
    <>
        <FirebaseContext.Provider value={{ firebase }}>
            <GlobalStyles />
            <App />
        </FirebaseContext.Provider>
    </>,
    document.getElementById('root')
);
```
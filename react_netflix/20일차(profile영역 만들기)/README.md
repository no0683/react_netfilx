## Netflix 클론 사이트 만들기(ver.2021/05/31)

<img src="public/images/misc/react_netflix_20210531.jpg" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 browse 페이지에 로그인된 사용자의 프로필 이미지와 이름을 firebase에서 가져와 화면에 띄워봤습니다.

[src/components/profiles/index.js]
```javascript
// profile 요소들의 컴포넌트들을 만들어주었습니다.
import React from 'react';
import { Container, Title, List, Item, Picture, Name } from './styles/profiles';

export default function Profiles({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
}

Profiles.Title = function ProfilesTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
}

Profiles.List = function ProfilesList({ children, ...restProps }) {
    return <List {...restProps}>{children}</List>;
}

Profiles.User = function ProfilesUser({ children, ...restProps }) {
    return <Item {...restProps}>{children}</Item>;
}

Profiles.Picture = function ProfilesPicture({ src, ...restProps }) {
    return <Picture {...restProps} src={src ? `/images/users/${src}.png` : `/images/misc/loading.gif`}/>;
}

Profiles.Name = function ProfilesName({ children, ...restProps }) {
    return <Name {...restProps}>{children}</Name>;
}
```

[src/components/profiles/styles/profiles.js]
```javascript
// 만들어둔 profile 컴포넌트내부에서 css 역할을할 스타일 컴포넌트도 만들었습니다.
import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h1``;

export const List = styled.ul``;

export const Name = styled.p``;

export const Picture = styled.img``;

export const Item = styled.li``;
```

[src/containers/profiles.js]
```javascript
// 만들어둔 스타일 컴포넌트들을 profile 컨테이너에 위치 시켜 주었습니다.
import React from 'react';
import Header from '../components/header/index';
import Profiles from '../components/profiles/index';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';

export function SelectProfileContainer({ user, setProfile }) {
    return (
        <>
            <Header bg={false}>
                <Header.Frame>
                    <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
                </Header.Frame>
            </Header>

            <Profiles>
                <Profiles.Title>Who's watching?</Profiles.Title>
                <Profiles.List>
                    <Profiles.User>
                        {/* 여기서 user는 firebase에 저장되있는 현재 로그인된 사용자 정보이고 photoURL과 displayName은 회원가입(signup) 할 때 입력했던 항목들 입니다. */}
                        <Profiles.Picture src={user.photoURL} />
                        <Profiles.Name>{user.displayName}</Profiles.Name>
                    </Profiles.User>
                </Profiles.List>
            </Profiles>
        </>
    )
}
```

[src/containers/browse.js]
```javascript
// 만들어진 profile 컨테이너들 최종적으로 browse 컨테이너에 위치 시켰습니다.
// 로그인된 user정보를 가져오기위해 firebase를 import 했습니다.
import React, { useContext } from 'react';
import { SelectProfileContainer } from './profiles';
import { FirebaseContext } from '../context/firebase';

export function BrowseContainer({ slides }) {
    const { firebase } = useContext(FirebaseContext);
    const user = firebase.auth().currentUser || {};

    return <SelectProfileContainer user={user}/>;
}
```
## Netflix 클론 사이트 만들기(ver.2021/06/06)

<img src="public/images/misc/react_netflix_20210606.gif" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 browse페이지의 header영역 오른쪽 상단에 검색 버튼과 입력창을 만들어주었습니다.
* 버튼의 이미지는 png파일을 사용했고 입력창은 input 태그와 css효과는 스타일 컴포넌트를 이용했습니다.
* 돋보기 버튼을 클릭하면 입력창이 보이고 다시 누르면 입력창이 사라지게됩니다.(이것은 useState를 이용하여 값을 true,false 넣어 조건에따라 보여지도록 했습니다.)
* 화면의 width가 700px이되면 검색창은 사라지게됩니다.(display: none;)

[src/containers/browse.js]
```javascript
import React, { useState, useContext, useEffect } from 'react';
import { SelectProfileContainer } from './profiles';
import { FirebaseContext } from '../context/firebase';
import Loading from '../components/loading/index';
import Header from '../components/header/index';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';

export function BrowseContainer({ slides }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const { firebase } = useContext(FirebaseContext);
    const user = firebase.auth().currentUser || {};

    useEffect(() => {
        console.log('profile', profile)
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [profile.displayName]);

    return profile.displayName ? (
        <>
            {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}

            <Header src="joker1" dontShowOnSmallViewPort>
                <Header.Frame>
                    <Header.Group>
                        <Header.Logo to={ROUTES.HOME} alt="Netflix" src={logo} />
                        <Header.TextLink>Series</Header.TextLink>
                        <Header.TextLink>Films</Header.TextLink>
                    </Header.Group>
                    {/* Header 오른쪽 상담 그룹에 속하여 검색창을 그려줄 컴포넌트 삽입 */}
                    {/* Header index.js에서 useState를 이용한 serchTerm의 값을 받기위해 props 설정 */}
                    <Header.Group>
                        <Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        <Header.Profile>
                            <Header.Picture src={user.photoURL} />
                            <Header.Dropdown>
                                <Header.Group>
                                    <Header.Picture src={user.photoURL} />
                                    <Header.TextLink>{user.displayName}</Header.TextLink>
                                </Header.Group>
                                <Header.Group>
                                    <Header.TextLink onClick={() => firebase.auth().signOut()}>Sign out</Header.TextLink>
                                </Header.Group>
                            </Header.Dropdown>
                        </Header.Profile>
                    </Header.Group>
                </Header.Frame>
                <Header.Feature>
                    <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
                    <Header.Text>
                        Forever alone in a crowd, failed comedian
                        Arthur Fleck seeks connection as he walks the streets of Gotham
                        City. Arthur wears two
                        masks -- the one he paints for his day job as a clown, and the
                        guise he projects in a futile attempt to feel like he's part of the
                        world around him.
                    </Header.Text>
                </Header.Feature>
            </Header>
        </>
    ) : (
        <SelectProfileContainer user={user} setProfile={setProfile}/>
    )
}
```

[src/components/header/index.js]
```javascript
import React, { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
// 검색창을 구현하기위해 필요한 스타일 컴포넌트 import(Search, SearchIcon, SearchInput)
import { Background, ButtonLink, Container, Logo, Feature, Text, FeatureCallOut, Link, Group, Profile, Picture, Dropdown, Search, SearchIcon, SearchInput } from './styles/header';

export default function Header({ bg=true, children, ...restProps }) {
    return bg ? <Background {...restProps}>{children}</Background> : children;
}

Header.Feature = function HeaderFeature({ children, ...restProps }) {
    return <Feature {...restProps}>{children}</Feature>;
}

Header.FeatureCallOut = function HeaderFeatureCallOut({ children, ...restProps }) {
    return <FeatureCallOut {...restProps}>{children}</FeatureCallOut>;
}

Header.Profile = function HeaderProfile({ children, ...restProps }) {
    return <Profile {...restProps}>{children}</Profile>;
}

Header.Picture = function HeaderPicture({ src, ...restProps }) {
    return <Picture {...restProps} src={`/images/users/${src}.png`} />;
}

Header.Search = function HeaderSearch({ searchTerm, setSearchTerm, ...restProps}) {
    const [searchActive, setSearchActive ] = useState(false);

    return (
        <Search {...restProps}>
            {/* 검색아이콘을클릭하면 searchActive의 값이 false의 반대인 true로 바뀜 */}
            <SearchIcon onClick={() => setSearchActive(!searchActive)}>
                <img src="/images/icons/search.png" alt="Search" />
            </SearchIcon>
            {/* 검색입력창의 value값은 searchTerm인데 사용자가 값을 입력하면 그것이 target이되어 입력된 값으로 변경 */}
            {/* 입력창은 기본적으로 active(활성화)가 false라 보이지않지만 검색아이콘을 클릭하면 true로 바뀌기때문에 검색창이 보이게됨 */}
            <SearchInput 
                value={searchTerm} 
                onChange={({ target }) => setSearchTerm(target.value)}
                placeholder="Search films and series"
                active={searchActive}
            />
        </Search>
    )
}

Header.Dropdown = function HeaderDropdown({ children, ...restProps }) {
    return <Dropdown {...restProps}>{children}</Dropdown>;
}

Header.Text = function HeaderText({ children, ...restProps }) {
    return <Text {...restProps}>{children}</Text>;
}

Header.TextLink = function HeaderTextLink({ children, ...restProps }) {
    return <Link {...restProps}>{children}</Link>;
}

Header.Frame = function HeaderFrame({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
};

Header.Group = function HeaderGroup({ children, ...restProps }) {
    return <Group {...restProps}>{children}</Group>;
};

Header.ButtonLink = function HeaderButtonLink({ children, ...restProps }) {
    return <ButtonLink {...restProps}>{children}</ButtonLink>;
};

Header.Logo = function HeaderLogo({ to, ...restProps }) {
    return (
        <ReactRouterLink to={to}>
            <Logo {...restProps} />
        </ReactRouterLink>
    );
};
```

[src/components/header/styles/header.js]
```javascript
import styled from 'styled-components';
import { Link as ReactRouterLink } from 'react-router-dom';

export const Background = styled.div`
    display: flex;
    flex-direction: column;
    background: url(${({ src }) => src ? `../images/misc/${src}.jpg` : '../images/misc/home-bg.jpg'}) top left / cover no-repeat;

    @media (max-width: 1100px) {
        ${({ dontShowOnSmallViewPort }) => dontShowOnSmallViewPort && `background: none;`}
    }
`;

export const Group = styled.div`
    display: flex;
    align-items: center;
`;

export const Container = styled.div`
    display: flex;
    margin: 0 56px;
    height: 64px;
    align-items: center;
    padding: 18px 0;
    justify-content: space-between;

    a {
        display: flex;
    }

    @media (max-width: 1000px) {
        margin: 0 30px;
    }
`;

export const Picture = styled.button`
    background: url(${({ src }) => src});
    background-size: contain;
    border: 0;
    width: 32px;
    height: 32px;
    cursor: pointer;
`;

export const Link = styled.p`
    color: #fff;
    text-decoration: none;
    margin-right: 30px;
    font-weight: ${({ active }) => (active ==='true' ? '700' : 'normal')};
    cursor: pointer;

    &:hover {
        font-weight: bold;
    }

    &:last-of-type {
        margin-right: 0;
    }
`;

export const Dropdown = styled.div`
    display: none;
    background-color: black;
    position: absolute;
    padding: 10px;
    top: 32px;
    right: 10px;

    ${Group}:last-of-type ${Link} {
        cursor: pointer;
    }

    ${Group} {
        margin-bottom: 10px;

        &:last-of-type {
            margin-bottom: 0;
        }
        ${Link}, ${Picture} {
            cursor: default;
        }
    }

    button {
        margin-right: 10px;
    }

    p {
        font-size: 12px;
        margin-bottom: 0;
        margin-top: 0;
    }
`;

export const Search = styled.div`
    display: flex;
    align-items: center;

    svg {
        color: #fff;
        cursor: pointer;
    }

    @media (max-width: 700px) {
        display: none;
    }
`;

export const SearchIcon = styled.button`
    cursor: pointer;
    background-color: transparent;
    border: 0;

    img {
        filter: brightness(0) invert(1);
        width: 16px;
    }
`;

// 스타일 컴포넌트에서는 함수의 인자로 active를, header의 index.js에서는 props로 active를 설정해주고 ture,false에따라 각각 css효과가 다르게 설정 했습니다.
export const SearchInput = styled.input`
    background-color: #44444459;
    color: #fff;
    border: 1px solid #fff;
    transition: width 0.5s;
    height: 30px;
    font-size: 14px;
    margin-left: ${({ active }) => (active === true ? '10px' : '0')};
    padding: ${({ active }) => (active === true ? '0 10px' : '0')};
    opacity: ${({ active }) => (active === true ? '1' : '0')};
    width: ${({ active }) => (active === true ? '200px' : '0')};
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    position: relative;

    &:hover ${Dropdown} {
        display: flex;
        flex-direction: column;
    }
`;

export const Logo = styled.img`
    height: 32px;
    width: 108px;
    margin-right: 40px;

    @media (min-width: 1449px) {
        height: 45px;
        width: 167px;
    }
`;

export const ButtonLink = styled(ReactRouterLink)`
    display: block;
    background-color: #e50914;
    width: 84px;
    height: fit-content;
    color: white;
    border: 0;
    font-size: 15px;
    border-radius: 3px;
    padding: 8px 17px;
    cursor: pointer;
    text-decoration: none;
    box-sizing: border-box;

    &:hover {
        background-color: #f40612;
    }
`;

export const Feature = styled(Container)`
    padding: 150px 0 500px 0;
    flex-direction: column;
    align-items: normal;
    width: 50%;

    @media (max-width: 1100px) {
        display: none;
    }
`;

export const Text = styled.p`
    color: #fff;
    font-size: 22px;
    line-height: normal;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
    margin: 0;
`;

export const FeatureCallOut = styled.h2`
    color: #fff;
    font-size: 50px;
    line-height: normal;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
    margin: 0;
    margin-bottom: 20px;
`;
```
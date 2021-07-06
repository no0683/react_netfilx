## Netflix 클론 사이트 만들기(ver.2021/06/08)

[카드영역 예시 이미지]
<img src="public/images/misc/react_netflix_20210608.jpg" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 browse페이지의 header영역아래 컨텐츠 시리즈별로 카드형식으로 나열되는 영역에대한 컴포넌트 생성 작업을 했습니다.

[src/containers/browse.js]
```javascript
import React, { useState, useContext, useEffect } from 'react';
import { SelectProfileContainer } from './profiles';
import { FirebaseContext } from '../context/firebase';
import Loading from '../components/loading/index';
import Header from '../components/header/index';
// 만들어두었던 Card 컴포넌트들을 사용하기위해 import 했습니다.
import Card from '../components/card/index';
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
                    <Header.PlayButton>Play</Header.PlayButton>
                </Header.Feature>
            </Header>
            {/* 앞으로 Header영역 아래에 컨텐츠들이 Card형식으로 나열될 공간 입니다.*/}
            <Card.Group>
                
            </Card.Group>
        </>
    ) : (
        <SelectProfileContainer user={user} setProfile={setProfile}/>
    )
}
```

[src/components/card/index.js]
```javascript
import React, { useState, useContext, createContext } from 'react';
import { Container, Group, Title, SubTitle, Text, Feature, FeatureTitle, FeatureText, FeatureClose, Maturiry, Content, Entities, Meta, Item, Image } from './styles/card';

export const FeatureContext = createContext();

export default function Card({ children, ...restProps }) {
    const [showFeature, setShowFeature ] = useState(false);
    const [itemFeature, setItemFeature ] = useState({});

    return (
        <FeatureContext.Provider value={{ showFeature, setShowFeature, itemFeature, setItemFeature }}>
            <Container {...restProps}>{children}</Container>
        </FeatureContext.Provider>
    );
}

Card.Group = function CardGroup({ children, ...restProps }) {
    return <Group {...restProps}>{children}</Group>;
};

Card.Title = function CardTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
};

Card.SubTitle = function CardSubTitle({ children, ...restProps }) {
    return <SubTitle {...restProps}>{children}</SubTitle>;
};

Card.Text = function CardText({ children, ...restProps }) {
    return <Text {...restProps}>{children}</Text>;
};

Card.Entities = function CardEntities({ children, ...restProps }) {
    return <Entities {...restProps}>{children}</Entities>;
};

Card.Meta = function CardMeta({ children, ...restProps }) {
    return <Meta {...restProps}>{children}</Meta>;
};

Card.Item = function CardItem({ item, children, ...restProps }) {
    const { setShowFeature, setItemFeature } = useContext(FeatureContext);

    return (
        <Item 
            onclick={() => {
                setItemFeature(item);
                setShowFeature(true);
            }}
            {...restProps}
        >
            {children}
        </Item>
    );
};

Card.Image = function CardImage({ ...restProps }) {
    return <Image {...restProps} />;
};
```

[src/components/card/styles/card.js]
```javascript
import styled from "styled-components/macro";

export const Container = styled.div``;

export const Group = styled.div``;

export const Title = styled.p``;

export const SubTitle = styled.p``;

export const Text = styled.p``;

export const Feature = styled.div``;

export const FeatureTitle = styled(Title)``;

export const FeatureText = styled.p``;

export const FeatureClose = styled.button``;

export const Maturity = styled.div``;

export const Content = styled.div``;

export const Meta = styled.div``;

export const Entities = styled.div``;

export const Item = styled.div``;

export const Image = styled.img``;
```
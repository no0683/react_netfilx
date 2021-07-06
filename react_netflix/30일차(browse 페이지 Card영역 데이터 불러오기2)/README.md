## Netflix 클론 사이트 만들기(ver.2021/06/10)

[카드영역 예시 이미지]
<img src="public/images/misc/react_netflix_20210610.gif" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 browse페이지의 card영역에서 컨텐츠별 이미지와 내용들을 가져왔습니다.

[src/containers/browse.js]
```javascript
import React, { useState, useContext, useEffect } from 'react';
import { SelectProfileContainer } from './profiles';
import { FirebaseContext } from '../context/firebase';
import Loading from '../components/loading/index';
import Header from '../components/header/index';
import Card from '../components/card/index';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';

export function BrowseContainer({ slides }) {
    const [category, setCategory] = useState('series');
    const [searchTerm, setSearchTerm] = useState('');
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [slideRows, setSlideRows] = useState([]);

    const { firebase } = useContext(FirebaseContext);
    const user = firebase.auth().currentUser || {};

    useEffect(() => {
        console.log('profile', profile)
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [profile.displayName]);

    useEffect(() => {
        setSlideRows(slides[category]);
    }, [slides, category]);

    return profile.displayName ? (
        <>
            {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}

            <Header src="joker1" dontShowOnSmallViewPort>
                <Header.Frame>
                    <Header.Group>
                        <Header.Logo to={ROUTES.HOME} alt="Netflix" src={logo} />
                        <Header.TextLink
                            active={category === 'series' ? 'true' : 'false'}
                            onClick={() => setCategory('series')}
                        >
                            Series
                        </Header.TextLink>
                        <Header.TextLink
                            active={category === 'films' ? 'true' : 'false'}
                            onClick={() => setCategory('films')}
                        >
                            Films
                        </Header.TextLink>
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

            <Card.Group>
                {slideRows.map((slideItem) => (
                    <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
                        <Card.Title>{slideItem.title}</Card.Title>
                        {/* slideItem은 선택된 컬렉션(series 또는 films)을 가리키고 firebase에저장된 데이터(ex. title.docId 등등)를 불러 오는 과정 입니다. */}
                        <Card.Entities>
                            {/* map을이용해서 firebase에 저장된 데이터들을 불러오고 만들어둔 스타일 컴포넌트로 영역을 잡습니다. */}
                            {slideItem.data.map((item) => (
                                <Card.Item key={item.docId} item={item}>
                                    <Card.Image 
                                        src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`}
                                    />
                                    <Card.Meta>
                                        <Card.SubTitle>{item.title}</Card.SubTitle>
                                        <Card.Text>{item.description}</Card.Text>
                                    </Card.Meta>
                                </Card.Item>
                            ))}
                        </Card.Entities>
                        {/* 이 부분은 card폴더의 index.js에서 showFeature 값이 true가 될떄 보여지는 부분 입니다. 기본값은 false라 안보입니다. */}
                        <Card.Feature category={category}>
                            <p>Hello!</p>
                        </Card.Feature>
                    </Card>
                ))}
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
import { Container, Group, Title, SubTitle, Text, Feature, FeatureTitle, FeatureText, FeatureClose, Maturity, Content, Entities, Meta, Item, Image } from './styles/card';

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

Card.Feature = function CardFeature({ children, category, ...restProps }) {
    const { showFeature, itemFeature, setShowFeature } = useContext(FeatureContext);
    // showFeature가 true가 되었을때 큰이미지가 나타나게되고 컨텐츠의 제목,내용,닫기버튼,연령정보가 나타나게됩니다.
    // Card.Item 컴포넌트를 onClick하면 setShowFeature(true); 되게 설정해주었기때문에 컨텐츠를 클릭하면 아래 코드가 실행 됩니다.
    return showFeature ? (
        <Feature {...restProps} src={`/images/${category}/${itemFeature.genre}/${itemFeature.slug}/large.jpg`}>
            <Content>
                <FeatureTitle>{itemFeature.title}</FeatureTitle>
                <FeatureText>{itemFeature.title}</FeatureText>
                <FeatureClose onClick={() => setShowFeature(false)}>
                    <img src="/images/icons/close.png" alt="Close" />
                </FeatureClose>
            </Content>

            <Group margin="30px 0" flexDirection="row" alignItems="center">
                <Maturity rating={itemFeature.maturity}>
                    {itemFeature.maturity < 12 ? 'PG' : itemFeature.maturity}
                </Maturity>
                <FeatureText fontWeight="bold">
                    {itemFeature.genre.charAt(0).toUpperCase() + itemFeature.genre.slice(1)}
                </FeatureText>
            </Group>
        </Feature>
    ) : null;
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
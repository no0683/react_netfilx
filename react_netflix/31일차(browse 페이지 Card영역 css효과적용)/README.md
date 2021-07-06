## Netflix 클론 사이트 만들기(ver.2021/06/12)

[카드영역 예시 이미지]
<img src="public/images/misc/react_netflix_20210612.gif" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 browse페이지의 card영역에 css효과를 주었습니다.
* 컨텐츠를 클릭하면 컨텐츠 정보가 활성화되어 보여지게 됩니다.

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
                        {/* Entities는 카드 컨텐츠들을 감싸줄 컴포넌트 입니다.  */}
                        <Card.Entities>
                            {slideItem.data.map((item) => (
                                {/* 각각의 컨텐츠를 그려주는 부분 입니다.(이미지+컨텐츠 정보) */}
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
                        {/* Card.Feature는 컨텐츠클 onClick했을때 활성화되는 부분 입니다.(컨텐츠 정보수록) */}
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

    return showFeature ? (
        // showFeature가 true이면 아래 코드가실행(컨텐츠를 onClick하면 showFeature의 state값이 true로 변경되도록 사전에 설정했음.)
        // 컨텐츠 정보를 감싸주는 Feature의 src경로는 컨텐츠의 배경화면을 나타냅니다.
        <Feature {...restProps} src={`/images/${category}/${itemFeature.genre}/${itemFeature.slug}/large.jpg`}>
            {/* 컨텐츠의 제목,상세설명,닫기버튼 */}
            <Content>
                <FeatureTitle>{itemFeature.title}</FeatureTitle>
                <FeatureText>{itemFeature.description}</FeatureText>
                <FeatureClose onClick={() => setShowFeature(false)}>
                    <img src="/images/icons/close.png" alt="Close" />
                </FeatureClose>
            </Content>
            {/* 컨텐츠의 연령기준 정보 */}
            <Group margin="30px 56px" flexDirection="row" alignItems="center">
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
    // 컨텐츠를 onClick하면 ItemFeature의 값이 item으로 바뀌면서 browse.js 컨테이너에서 Card.Item props로 컨텐츠 데이터를담은 item과 서로 연결이됩니다.
    // 그리고 showFeature의 값이 true로 바뀌면서 Card.Feature가 활성화됩니다.
    return (
        <Item 
            onClick={() => {
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

export const Title = styled.p`
    font-size: 24px;
    color: #e5e5e5;
    font-weight: bold;
    margin-left: 56px;
    margin-right: 56px;
    margin-top: 0;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    box-sizing: border-box;

    > ${Title} {
        @media (max-width: 1000px) {
            margin-left: 30px;
        }
    }

    &:last-of-type {
        margin-bottom: 0;
    }
`;

// 아래처럼 함수형태로 값을받아서 css사용하는것은 스타일 컴포넌트를 사용하는 상위 컴포넌트에서 props로 css값을 가져오기 위해서입니다.
// 이러한스타일이 낯설었지만 스타일컴포넌트를 여러곳에서사용되고 조건에따라 효과를 달리하고싶을때 중복을 피하기위해서 사용되는것으로 보입니다.
export const Group = styled.div`
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection === 'row' ? 'row' : 'column'};
    ${({ alignItems }) => alignItems && `align-items: ${alignItems}`};
    ${({ margin }) => margin && `margin: ${margin}`};

    > ${Container}:first-of-type {
        @media (min-width: 1100px) {
            margin-top: -150px;
        }
    }
`;

export const SubTitle = styled.p``;

export const Text = styled.p``;

export const Feature = styled.div`
    display: flex;
    flex-direction: column;
    background: url(${({ src }) => src});
    background-size: contain;
    position: relative;
    height: 360px;
    background-repeat: no-repeat;
    background-position-x: right;
    background-color: #000;
`;

export const FeatureTitle = styled(Title)`
    margin-left: 0;
`;

export const FeatureText = styled.p`
    margin-left: 0;
`;

export const FeatureClose = styled.button`
    color: #fff;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    background-color: transparent;
    border: 0;

    img {
        filter: brightness(0) invert(1);
        width: 24px;
    }
`;

export const Maturity = styled.div`
    background-color: ${({ rating }) => rating >= 15 ? 'red' : 'green'};
    border-radius: 15px;
    width: 20px;
    padding: 5px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    margin-right: 10px;
    font-size: 12px;
`;

export const Content = styled.div`
    margin: 56px;
    max-width: 500px;
    line-hetght: normal;

    @media (max-width: 1000px) {
        margin: 30px;
        max-width: none;
    }
`;

export const Meta = styled.div`
    display: none;
    position: absolute;
    bottom: 0;
    padding: 10px;
    background-color: #00000008f;
`;

export const Entities = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Item = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Image = styled.img`
    border: 0;
    width: 100%;
    max-width: 305px;
    cursor: pointer;
    height: auto;
    padding: 0;
    margin: 0;
`;
```
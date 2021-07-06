## Netflix 클론 사이트 만들기(ver.2021/06/16)

<img src="public/images/misc/react_netflix_20210616.gif" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 browse페이지에서 컨텐츠를 클릭하면 Card.Feature 영역이나오고 Maturity 아래에 영상 Play 버튼을 위치 시켰습니다.
* Play버튼에 css효과를 주고 버튼을 누르면 ReactDOM.createPortal을통해 body영역에 video영역이 렌더링 되어 보여지게됩니다.

[src/components/player/index.js]
```javascript
import React, { useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import { Container, Button, Overlay, Inner, Close } from './styles/player';

export const PlayerContext = createContext();

export default function Player({ children, ...restProps }) {
    const [showPlayer, setShowPlayer] = useState(false);

    return (
        <PlayerContext.Provider value={{ showPlayer, setShowPlayer }}>
            <Container {...restProps}>{children}</Container>
        </PlayerContext.Provider>
    )
}

Player.Video = function PlayerVideo({ src, ...restProps }) {
    const { showPlayer, setShowPlayer } = useContext(PlayerContext);
    // ReactDOM의 createPortal은 (내용물, 연결할요소) 두개의 매개변수로 사용하는데 일반적인 DOM의 계층을 완전히 벗어나 독자적으로 화면을 렌더링할 수 있게합니다.
    // 아래의 경우는 body요소에 Overlay영역을 렌더링하는 코드 입니다.
    return showPlayer ? ReactDOM.createPortal(
        <Overlay>
            <Inner>
                <video id="netflix-player" controls>
                    <source src={src} type="video/mp4" />
                </video>
                <Close onClick={() => setShowPlayer(false)}>
                    <img src="/images/icons/close.png" alt="Close" />
                </Close>
            </Inner>
        </Overlay>,
        document.body
    ) : null;
}

Player.Button = function PlayerButton({ ...restProps }) {
    const { showPlayer, setShowPlayer } = useContext(PlayerContext);

    return (
        <Button onClick={() => setShowPlayer(!showPlayer)}>
            Play
        </Button>
    )
}
```

[src/components/player/styles/player.js]
```javascript
import styled from "styled-components/macro";

export const Container = styled.div``;

export const Overlay = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
`;

export const Inner = styled.div`
    position: relative;
    width: 90%;
    max-width: 900px;
    margin: auto;
    box-sizing: border-box;
    
    video {
        height: 100%;
        width: 100%;
    }
`;

export const Close = styled.button`
    color: #fff;
    position: absolute;
    right: 7px;
    top: 10px;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    padding: 0;

    img {
        filter: brightness(0) invert(1);
        width: 24px;
    }
`;

export const Button = styled.button`
    background-color: #e50914;
    border-color: #ff0a10;
    width: 114px;
    height: 45px;
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;
    font-size: 18px;
    height: 45px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 0;

    &:hover {
        transform: scale(1.05);
        background-color: #ff0a16;
    }
`;
```

[src/containers/browse.js]
```javascript
import React, { useState, useContext, useEffect } from 'react';
import { SelectProfileContainer } from './profiles';
import { FirebaseContext } from '../context/firebase';
import Loading from '../components/loading/index';
import Header from '../components/header/index';
import Card from '../components/card/index';
import FooterContainer from './footer';
import Player from '../components/player/index';
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
                        <Card.Entities>
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
                        <Card.Feature category={category}>
                            {/* 만들어진 Player컴포넌트를 browse.js 컨테이너에 위치시킵니다. */}
                            <Player>
                                <Player.Button />
                                <Player.Video src="/videos/bunny.mp4" />
                            </Player>
                        </Card.Feature>
                    </Card>
                ))}
            </Card.Group>

            <FooterContainer />
        </>
    ) : (
        <SelectProfileContainer user={user} setProfile={setProfile}/>
    )
}
```
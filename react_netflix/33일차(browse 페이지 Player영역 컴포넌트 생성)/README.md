## Netflix 클론 사이트 만들기(ver.2021/06/15)

* 오늘은 browse페이지에서 Play버튼을클릭하면 Video영역이나와 영상을 볼 수 있는 기능을 구현하기위해 Player컴포넌트를 만들었습니다.
* Play 버튼을 클릭하면 showPlayer의 값이 false에서 true로 바뀝니다.
* showPlayer값이 true가되면 Player.Video 컴포넌트가 실행이되면서 비디오 영역이 보여지게 됩니다.

[src/components/player/index.js]
```javascript
import React, { useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import { Container, Button, Overlay, Inner, Close } from './styles/player';

export const PlayerContext = createContext();

export default function Player({ children, ...restProps }) {
    const [showPlayer, setShowPlayer ] = useState(false);

    return (
        <PlayerContext.Provider value={{ showPlayer, setShowPlayer }}>
            <Container {...restProps}>{children}</Container>
        </PlayerContext.Provider>
    )
}

Player.Video = function PlayerVideo({ src, ...restProps }) {
    const { showPlayer, setShowPlayer } = useContext(PlayerContext);

    return showPlayer ? ReactDOM.createPortal(
        <Overlay onClick={() => setShowPlayer(false)}>
            <Inner>
                <video id="netflix-player" controls>
                    <source src={src} type="video/mp4" />
                </video>
                <Close />
            </Inner>
        </Overlay>
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

export const Overlay = styled.div``;

export const Inner = styled.div``;

export const Close = styled.button``;

export const Button = styled.button``;
```
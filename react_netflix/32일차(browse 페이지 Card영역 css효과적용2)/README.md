## Netflix 클론 사이트 만들기(ver.2021/06/14)

[카드영역 예시 이미지]
<img src="public/images/misc/react_netflix_20210614.gif" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 browse페이지의 card영역에 추가적인 css효과를 주었습니다.
* 컨텐츠 카드위에 hover하면 컨텐츠의 간단한 정보가 나타나고 transform: scale을통해 이미지가 커지게 됩니다.
* 컨텐츠을 onClick하고 컨텐츠의 Feature영역이 보이게되고 제목,텍스트,닫기버튼에 추가로 연령정보까지 Content컴포넌트로 묶어주었습니다.

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
        <Feature {...restProps} src={`/images/${category}/${itemFeature.genre}/${itemFeature.slug}/large.jpg`}>
            {/* 기존에는 동떨어져보였던 Maturity를 Content안으로 포함시키면서 세로로 나란히 보이도록 했습니다. */}
            <Content>
                <FeatureTitle>{itemFeature.title}</FeatureTitle>
                <FeatureText>{itemFeature.description}</FeatureText>
                <FeatureClose onClick={() => setShowFeature(false)}>
                    <img src="/images/icons/close.png" alt="Close" />
                </FeatureClose>

                <Group margin="30px 0" flexDirection="row" alignItems="center">
                    <Maturity rating={itemFeature.maturity}>
                        {itemFeature.maturity < 12 ? 'PG' : itemFeature.maturity}
                    </Maturity>
                    <FeatureText fontWeight="bold">
                        {itemFeature.genre.charAt(0).toUpperCase() + itemFeature.genre.slice(1)}
                    </FeatureText>
                </Group>
            </Content>
        </Feature>
    ) : null;
};

Card.Item = function CardItem({ item, children, ...restProps }) {
    const { setShowFeature, setItemFeature } = useContext(FeatureContext);
    
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

export const SubTitle = styled.p`
    font-size: 12px;
    color: #fff;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 0;
    user-select: none;
    display: none;
`;

export const Text = styled.p`
    margin-top: 5px;
    font-size: 10px;
    color: #fff;
    margin-bottom: 0;
    user-select: none;
    display: none;
    line-height: normal;
`;

export const Feature = styled.div`
    display: flex;
    flex-direction: row;
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
    font-size: 18px;
    color: #fff;
    font-weight: ${({ fontWeight }) => fontWeight === 'bold' ? 'bold' : 'normal'};
    margin: 0;

    @media (max-width: 600px) {
        line-height: 22px;
    }
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
    margin-right: 5px;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.3);
        z-index: 99;
    }

    @media (min-width: 1200px) {
        &:hover ${Meta}, &:hover ${Text}, &:hover ${SubTitle} {
            display: block;
            z-index: 100;
        }
    }

    &:first-of-type {
        margin-left: 56px;

        @media (max-width: 1000px) {
            margin-left: 30px;
        }
    }

    &:last-of-type {
        margin-right: 56px;

        @media (max-width: 1000px) {
            margin-right: 30px;
        }
    }
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
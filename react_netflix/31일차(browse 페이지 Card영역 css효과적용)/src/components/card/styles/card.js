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
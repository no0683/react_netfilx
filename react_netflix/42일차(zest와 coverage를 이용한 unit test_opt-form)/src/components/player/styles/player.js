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
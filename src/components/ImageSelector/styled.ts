import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    min-height: 200px;
    justify-items: center;
    align-items: center;
    padding: 10px;
`;

export const ImageContainer = styled.div`
    img {
        max-height: 200px;
        border-radius: 10px;
    }
`;

export const HiddenInput = styled.div`
    input {
        visibility: hidden;
        height: 0;
        width: 0;
    }
`;

export const VisibleInput = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    user-select: none;
    max-width: 250px;
    border-color: black;
    border-width: 2px;
    border-style: solid;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    padding: 20px;
    cursor: pointer;
`;
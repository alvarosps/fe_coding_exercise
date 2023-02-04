import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const SearchError = styled.div`
    color: red;
    font-weight: bold;
    font-size: 16px;
`;

export const OverviewHeader = styled.header`
    width: 100%;
    height: 50px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0;
    box-sizing: border-box;
    margin-top: 40px;

    @media (max-width: 468px) {
        flex-direction: column;
        align-items: space-around;
        height: 60px;
        padding: 10px;
    }
`;

export const OverviewTitle = styled.header`
    font-size: 20px;
    font-weight: bold;
    margin: 0;

    @media (max-width: 468px) {
        margin-bottom: 10px;
    }
`;
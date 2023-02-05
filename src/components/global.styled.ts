import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #d3d3d3;
    width: 100%;
    height: 100%;
    margin-left: 0;
    margin-bottom: 0;
`;

export const OverviewContainer = styled.div`
    height: 100%;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 60px;

    @media (max-width: 820px) {
        margin-top: 75px;
    }
`;

export const SearchError = styled.div`
    color: red;
    font-weight: bold;
    font-size: 16px;
`;

export const OverviewHeader = styled.header`
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #dcdcdc;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0;
    box-sizing: border-box;

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

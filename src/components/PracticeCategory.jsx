import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import data from '../assets/data/collection.json';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const CollectionCard = styled(Link)`
    background-color: ${(props) => props.background};
    border-radius: 8px;
    box-shadow: 0 4px rgba(0, 0, 0, 0.1);
    margin: 10px;
    padding: 20px;
    text-align: center;
    min-width: 200px;
    cursor: pointer;
`;

const Title = styled.h2`
    color: #ffffff;
    font-size: 20px;
`;
const PracticeCategory = () => {
    return (
        <Container>
            {data.map(collection => (
                <CollectionCard to={`/practice/${collection.title.toLowerCase()}`} key={collection.title} background={collection.background}>
                          <Title>{collection.title}</Title>
                </CollectionCard>
            ))}
        </Container>
    );
};

export default PracticeCategory;

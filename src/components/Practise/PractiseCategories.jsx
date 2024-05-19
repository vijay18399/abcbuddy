import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {BreadCrumb} from '../Common';
const CategoriesContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;
`;

const CategoryCard = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 150px;
    height: 150px;
    text-decoration: none;
    color: #333;
    transition: all 0.3s ease;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const CategoryIcon = styled.div`
    font-size: 2rem;
`;

const CategoryName = styled.div`
    margin-top: 10px;
    font-size: 1.1rem;
`;

// Component
const PractiseCategories = () => {
    const categories = [
        { name: "Fruits", icon: "🍎" },
        { name: "Toys", icon: "🎮" },
        { name: "Animals", icon: "🐾" },
        { name: "Nature", icon: "🌳" },
        { name: "Buildings", icon: "🏛️" },
        { name: "Vehicles", icon: "🚗" },
        { name: "Space", icon: "🚀" },
        { name: "Colors", icon: "🌈" },
        { name: "School", icon: "🏫" },
        { name: "Clothing", icon: "👗" }
    ];
    const { collectionType } = useParams();
    return (
        <>
           <BreadCrumb  pagetitle={`Pick a topic to practise `}  />
           <CategoriesContainer>
            {categories.map((category, index) => (
                <CategoryCard key={index} to={`/practise/${collectionType}/${category.name.toLowerCase()}`}>
                    <CategoryIcon>{category.icon}</CategoryIcon>
                    <CategoryName>{category.name}</CategoryName>
                </CategoryCard>
            ))}
        </CategoriesContainer>
        </>
       
    );
}

export default PractiseCategories;

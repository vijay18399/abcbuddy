import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sentence from './Sentence';
import ActionButton from './Button';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    flex-direction: column;
    align-items: center;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    gap: 10px;
`;

const Message = styled.div`
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
    color: #FF0000;

    h4 {
        color: #43A047;
        margin-bottom: 10px;
    }
`;

const PracticeList = ({ items, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showNextBtn, setShowNextBtn] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    useEffect(() => {
        setCurrentIndex(0);
        setShowNextBtn(false);
        setSuccessMessage(false);
    }, [items]);

    const onSuccess = () => {
        if (currentIndex < items.length - 1) {
            setShowNextBtn(true);
        } else {
            setSuccessMessage(true);
            onComplete();
        }
    };

    const onNext = () => {
        setShowNextBtn(false);
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    return (
        <Container>
            {successMessage && (
                <Message>
                    <h4>Congratulations! You've completed practicing all items.</h4>
                </Message>
            )}
            {items.length > 0 && !successMessage && (
                <>
                    <Sentence onSuccess={onSuccess} sentence={items[currentIndex]} />
                    {showNextBtn && (
                        <Wrapper>
                            <ActionButton onClick={onNext}>Next</ActionButton>
                        </Wrapper>
                    )}
                </>
            )}
        </Container>
    );
};

export default PracticeList;

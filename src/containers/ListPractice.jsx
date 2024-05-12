import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Sentence from '../components/Sentence';
import ActionButton from '../components/Button';
import { useFirestore } from '../providers/FirestoreProvider';

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
    h4{
        color: #43A047;
         margin-bottom: 10px;
    }
`;

const ListPractice = () => {
    const { uniqueId } = useParams();
    const [listItems, setListItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showNextBtn, setShowNextBtn] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState(false);
    const { getDocument } = useFirestore();

    useEffect(() => {
        const fetchList = async () => {
            try {
                const list = await getDocument('lists', uniqueId);
                if (list) {
                    setListItems(list.items);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error('Error fetching document:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchList();
    }, [uniqueId, getDocument]);

    const onSuccess = () => {
        if (currentIndex < listItems.length - 1) {
            setShowNextBtn(true)
        } else {
            setSuccessMessage(true);
        }
    }
    const onNext = () => {
        setShowNextBtn(false)
        setCurrentIndex(prevIndex => prevIndex + 1);
    }

    const retry = () => {
        setCurrentIndex(0);
        setSuccessMessage(false);
    }

    if (loading) {
        return <Message>Loading...</Message>;
    }

    return (
        <Container>
            {error && <Message>List details not found. Create a list and try again.</Message>}
            {successMessage && (
                <Message>
                    <h4>Congratulations! You've completed practicing all items in the list.</h4>
                    <Wrapper>
                        <ActionButton onClick={retry}>Retry</ActionButton>
                    </Wrapper>
                </Message>
            )}
            {listItems.length > 0 && !successMessage && (
                <>
                    <Sentence onSuccess={onSuccess} sentence={listItems[currentIndex]} />
                    {showNextBtn && <Wrapper>
                        <ActionButton onClick={onNext}>Next</ActionButton>
                    </Wrapper>}
                </>
            )}
        </Container>
    );
};

export default ListPractice;

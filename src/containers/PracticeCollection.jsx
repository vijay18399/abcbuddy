import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Sentence from '../components/Sentence';
import Feedback from '../components/Feedback';
import { FaCheckCircle } from "react-icons/fa";
import Modal from '../components/Modal';
import BreadCrumb from '../components/BreadCrumb';
import { useParams } from 'react-router-dom';
import { useFirestore } from '../providers/FirestoreProvider';
import { AuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader'; 

const Container = styled.div`
    min-height: calc(100vh - 61px);
    background-color: #F7F8FA;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`;

const Wrapper= styled.div`
   min-height: calc(100vh - 121px);
   display: flex;
   align-items: center;
   justify-content: center;
`;

const CollectionCardList = styled.ul`
    min-height: calc(100vh - 121px);
    list-style-type: none;
    padding: 0;
    width: 400px;
    margin-top: 10px;
`;

const CollectionCard = styled.li`
    cursor: pointer;
    height: 40px;
    background-color: #fff;
    border-radius: 9px;
    border: 1px solid #e0e0e0;
    margin-bottom: 10px;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
        width: 45px;
        height: 45px;
        margin-right: 10px;
        border-radius: 50%;
    }
    &:hover {
        background-color: #e0e0e079;
    }
`;

const Title = styled.h3`
    display: flex;
    align-items: center;
    margin-left: 10px;
`;

const Icon = styled.div`
    width: 30px;
    height: 30px;
    color: #388E3C;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #666;
    margin-right: 5px;
    &:hover {
        text-decoration: underline;
    }
`;

const Message = styled.p`
    color: #666;
    margin-top: 20px;
`;



const PracticeCollection = () => {
    const { collectionType } = useParams();
    const items = [
        { label: 'Home', url: '/' },
        { label: 'Practice', url: '/practice' },
        { label: collectionType+'s', isCurrent:true }
    ];
    const { getDocuments, addDocument, getDocumentsByQuery } = useFirestore();
    const [sentences, setSentences] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [attemptedQuestions, setAttemptedQuestions] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading
    const { user } = useContext(AuthContext);

    const getDocumentsByType = async (type) => {
        const documents = await getDocuments('collections');
        return documents.filter(doc => doc.type === type);
    };

    useEffect(() => {
        async function fetchData() {
            const fetchedItems = await getDocumentsByType(collectionType);
            setSentences(fetchedItems);
            setLoading(false);
        }
        fetchData();
        loadAttemptedQuestions();
    }, [collectionType]);

    const loadAttemptedQuestions = async () => {
        const query = {
            field: 'userId',
            operator: '==',
            value: user.uid
        };
        const attempts = await getDocumentsByQuery('attempts', query);
        setAttemptedQuestions(attempts);
    };

    const onSuccess = async (data) => {
        if (selectedQuestion) {
            const attempt = {
                userId: user.uid,
                questionId: selectedQuestion.id,
                attemptData:data,
                timestamp: new Date()
            };
            console.log(attempt)
            await addDocument('attempts', attempt);
            setAttemptedQuestions(prev => [...prev, attempt]);
        }
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        setModalOpen(true);
    };

    const getAttemptData =(questionId)=>{
        return attemptedQuestions.find((attemptedQuestion)=> attemptedQuestion.questionId === questionId )
    }

    const closeModal = () => {
        setModalOpen(false);
        setSelectedQuestion(null);
    };

    return (
        <Container>
            <BreadCrumb items={items} />
            {loading ? ( 
                <Wrapper>
                    <Loader />
                </Wrapper>
            ) : (
                sentences.length === 0 ? (
                    <Wrapper>
                        <Message>No questions available in this collection.</Message>
                    </Wrapper>
                ) : (
                    <CollectionCardList>
                        {sentences.map((question, index) => (
                            <CollectionCard key={index} onClick={() => handleQuestionClick(question)}>
                                <Title>
                                    {question.content}
                                </Title>
                                {getAttemptData(question.id) && <Icon ><FaCheckCircle /></Icon>}
                            </CollectionCard>
                        ))}
                    </CollectionCardList>
                )
            )}
            {modalOpen && selectedQuestion && (
                <Modal onClose={closeModal}>
                    {getAttemptData(selectedQuestion.id) ? (
                         <Feedback  attemptData={getAttemptData(selectedQuestion.id).attemptData}  />
                    ) : (
                        <Sentence onSuccess={onSuccess} sentence={selectedQuestion.content} />
                    )}
                </Modal>
            )}
        </Container>
    );
};

export default PracticeCollection;

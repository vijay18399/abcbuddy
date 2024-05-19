import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFirestore } from '../../providers/FirestoreProvider';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const PageTitle = styled.h1`
   font-size: 32px;
   font-weight: 900;
   margin-bottom: 20px;
`;
const CardContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Card = styled.div`
  width: 280px;
  background-color: ${props => props.$backgroundColor};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  color: #fff;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardHeader = styled.div`
  margin-bottom: 12px;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
`;

const Count = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const Dashboard = () => {
  const { getDocuments } = useFirestore();
  const [wordCount, setWordCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);

  const getDocumentsByType = async (type) => {
    const documents = await getDocuments('collections'); 
    return documents.filter(doc => doc.type === type);
  };

  useEffect(() => {
    async function fetchCounts() {
      const words = await getDocumentsByType('word');
      const sentences = await getDocumentsByType('sentence');
      setWordCount(words.length);
      setSentenceCount(sentences.length);
    }

    fetchCounts();
  }, []);

  return (
    <Container>
      <PageTitle>Dashboard</PageTitle>
      <CardContainer>
        <Card $backgroundColor="#3498db">
          <CardHeader>
            <CardTitle>Words</CardTitle>
          </CardHeader>
          <Count>{wordCount}</Count>
        </Card>
        <Card $backgroundColor="#2ecc71">
          <CardHeader>
            <CardTitle>Sentences</CardTitle>
          </CardHeader>
          <Count>{sentenceCount}</Count>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFirestore } from '../providers/FirestoreProvider';

const Card = styled.div`
  background-color: ${props => props.$backgroundColor || "#fff"};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  color: white;
`;

const Count = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const Dashboard = () => {
  const { getDocuments } = useFirestore();
  const [wordCount, setWordCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [tongueTwisterCount, setTongueTwisterCount] = useState(0);

  const getDocumentsByType = async (type) => {
    const documents = await getDocuments('collections'); 
    return documents.filter(doc => doc.type === type);
  };

  useEffect(() => {
    async function fetchCounts() {
      const words = await getDocumentsByType('word');
      const sentences = await getDocumentsByType('sentence');
      const tongueTwisters = await getDocumentsByType('tongue-twister');
      setWordCount(words.length);
      setSentenceCount(sentences.length);
      setTongueTwisterCount(tongueTwisters.length);
    }

    fetchCounts();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gridGap: '20px' }}>
        <Card $backgroundColor="#3498db">
          <h3>Words</h3>
          <Count>{wordCount}</Count>
        </Card>
        <Card $backgroundColor="#2ecc71">
          <h3>Sentences</h3>
          <Count>{sentenceCount}</Count>
        </Card>
        <Card $backgroundColor="#e74c3c">
          <h3>Tongue Twisters</h3>
          <Count>{tongueTwisterCount}</Count>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

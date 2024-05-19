import React, { useState } from 'react';
import styled from 'styled-components';
import UploadFile from './UploadFile';
import { useFirestore } from '../../providers/FirestoreProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../Common';
import SampleJson from '../../assets/samples/sample.json';
import SampleCsv from '../../assets/samples/sample.csv';

const BulkUploadContainer = styled.div`
  padding: 20px;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  td input[type="text"] {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #2980b9;
  }
`;

const DeleteButton = styled.button`
  padding: 6px 12px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c0392b;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const DownloadLink = styled.a`
  display: inline-block;
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #2ecc71;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #27ae60;
  }
`;

const BulkUpload = () => {
  const { addDocuments } = useFirestore();
  const [type, setType] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleContentChange = (event, index, field) => {
    const newData = [...data];
    newData[index][field] = event.target.value;
    setData(newData);
  };

  const resetData = () => {
    setType('');
    setData([]);
  };

  const handleBulkUpload = async () => {
    if (data.length === 0) {
      return;
    }

    setIsLoading(true);

    try {
      const mappedData = data.map((item) => {
        return { ...item, type: type };
      });
      await addDocuments("collections", mappedData);
      toast.success(`${mappedData.length} ${type}s added successfully`);
      resetData();
    } catch (error) {
      console.error('Error adding documents: ', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BulkUploadContainer>
      <Section>
        <SectionTitle>Bulk Upload</SectionTitle>
        <Select id="type" value={type} onChange={handleTypeChange}>
          <option value="">Select</option>
          <option value="word">Word</option>
          <option value="sentence">Sentence</option>
        </Select>
        {type && <UploadFile type={type} setData={setData} />}
      </Section>

      {data.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Content</th>
              <th>Description</th>
              <th>Image</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><input type="text" value={item.content} onChange={(e) => handleContentChange(e, index, 'content')} /></td>
                <td><input type="text" value={item.description} onChange={(e) => handleContentChange(e, index, 'description')} /></td>
                <td><input type="text" value={item.image} onChange={(e) => handleContentChange(e, index, 'image')} /></td>
                <td>{item.category}</td>
                <td>
                  <DeleteButton onClick={() => handleDelete(index)}>Delete</DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {data.length !== 0 && <Button onClick={handleBulkUpload}>Upload</Button>}
      {!data.length &&
      <div>
        <DownloadLink href={SampleCsv} download>Download Sample CSV</DownloadLink>
        <DownloadLink href={SampleJson} download>Download Sample JSON</DownloadLink>
      </div>
      }
      {isLoading && <LoaderContainer><Loader /></LoaderContainer>}
      <ToastContainer />
    </BulkUploadContainer>
  );
};

export default BulkUpload;

import React, { useState } from 'react';
import styled from 'styled-components';

const UploadContainer = styled.div`
      margin-top: 20px;
    text-align: center;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  display: inline-block;
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

const FileName = styled.span`
  margin-left: 10px;
`;
const FileContainer= styled.span`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 gap: 10px;
`;
const UploadButton = styled.button`
  margin-left: 10px;
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

const UploadFile = ({ type, setData }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target.result;
      let data;

      if (file.type === 'application/json') {
        data = JSON.parse(content);
      } else if (file.type === 'text/csv') {
        data = await parseCSV(content);
      }

      if (data && Array.isArray(data)) {
        setData(data);
      } else {
        alert('Invalid file format. Please upload JSON or CSV files.');
      }
    };

    reader.readAsText(file);
  };

  const parseCSV = async (content) => {
    // CSV parsing logic
    const lines = content.split('\n');
    const headers = lines[0].split(',');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j].trim()] = values[j].trim();
        }
        result.push(obj);
      }
    }

    return result;
  };

  return (
    <UploadContainer>
      <UploadInput type="file" accept=".json,.csv" id="file" onChange={handleFileChange} />
      <UploadLabel htmlFor="file">
        Select JSON/CSV File to Upload {type.toUpperCase()} in Bulk
      </UploadLabel>
     {file && <FileContainer>
      <FileName>{file.name}</FileName>
      <UploadButton onClick={handleUpload}>Parse</UploadButton>
      </FileContainer>
   
      }

    </UploadContainer>
  );
};

export default UploadFile;

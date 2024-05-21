import React, { useEffect, useState } from 'react';
import { useFirestore } from '../../providers/FirestoreProvider';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { MdImageNotSupported, MdModeEdit, MdDelete } from "react-icons/md";

const Container = styled.div`
  padding: 5px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;

  th, td {
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #ffffff;
    font-weight: bold;
    color: #6a6c78;
    padding: 8px 10px;
  }

  tr:last-child td {
    border-bottom: none;
  }

  td {
    color: #000409;
    padding: 0px 8px;
    button {
      padding: 6px 10px;
      background-color: #3498db;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
      &:hover {
        background-color: #2980b9;
      }
    }
  }
`;

const ModalWrapper = styled.div`
  display: ${props => props.$visible ? 'block' : 'none'};
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
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

const Input = styled.input`
  width: calc(100% - 24px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Chip = styled.span`
  background-color: #ffffff;
  color: #000000;
`;

const Img = styled.img`
  max-width: 100px;
`;

const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const PaginationButton = styled.button`
  padding: 6px 12px;
  margin: 0 5px;
  background-color: ${props => props.active ? "#3498db" : "#ffffff"};
  color: ${props => props.active ? "#fff" : "#333"};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${props => props.active ? "#2980b9" : "#ccc"};
  }
`;

const Filter = styled.select`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const categories = [
  "Fruits", "Toys", "Animals", "Nature", "Buildings", "Vehicles", "Space", "Colors", "School", "Clothing"
];

const CollectionManager = () => {
  const { collectionType } = useParams();
  const { getDocuments, addDocument, deleteDocument, updateDocument } = useFirestore();
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchItems() {
      const fetchedItems = await getDocumentsByType(collectionType);
      setItems(fetchedItems);
    }

    fetchItems();
  }, [getDocuments, collectionType, page, selectedCategory]);

  const getDocumentsByType = async (type) => {
    const documents = await getDocuments('collections');
    return documents.filter(doc => doc.type === type && (selectedCategory ? doc.category === selectedCategory : true));
  };

  const handleDelete = async (id) => {
    await deleteDocument('collections', id);
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    setShowDeleteModal(false);
  };

  const handleAddItem = async () => {
    await addDocument('collections', { collectionType, content: text, description, image: imageUrl, category: selectedCategory });
    setText('');
    setDescription('');
    setImageUrl('');
    setShowModal(false);
    const updatedItems = await getDocumentsByType(collectionType);
    setItems(updatedItems);
  };

  const handleEditItem = async () => {
    if (editItem) {
      await updateDocument('collections', editItem.id, { content: text, description, image: imageUrl, category: selectedCategory });
      setText('');
      setDescription('');
      setImageUrl('');
      setShowModal(false);
      const updatedItems = await getDocumentsByType(collectionType);
      setItems(updatedItems);
      setEditItem(null);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setText(item.content);
    setDescription(item.description || '');
    setImageUrl(item.image || '');
    setSelectedCategory(item.category || '');
    setShowModal(true);
  };

  const confirmDelete = (item) => {
    setDeleteItem(item);
    setShowDeleteModal(true);
  };

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Header>
        <h1>{collectionType.charAt(0).toUpperCase() + collectionType.slice(1)}</h1>
        <div>
          <Filter value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </Filter>
          <Button onClick={() => { setText(''); setDescription(''); setImageUrl(''); setSelectedCategory(''); setShowModal(true); }}>Add New</Button>
        </div>
      </Header>
      {items.length > 0 ? (
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Content</th>
                <th>Description</th>
                <th>Image</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, index) => (
                <tr key={item.id}>
                  <td>{(page - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.content}</td>
                  <td>{item.description}</td>
                  <td>{item.image ? <Img src={item.image} alt="Item Image" /> : <Chip><MdImageNotSupported /></Chip>}</td>
                  <td>{item.category}</td>
                  <td>
                    <Button onClick={() => handleEdit(item)}><MdModeEdit /></Button>
                    <Button onClick={() => confirmDelete(item)}><MdDelete /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>
      ) : (
        <p>No items found.</p>
      )}
      <Pagination>
        {Array.from({ length: pageCount }, (_, index) => (
          <PaginationButton key={index} active={index + 1 === page} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </PaginationButton>
        ))}
      </Pagination>
      <ModalWrapper $visible={showModal}>
        <ModalContent>
          <h2>{editItem ? `Edit ${collectionType}` : `Add New ${collectionType}`}</h2>
          <Input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text" />
          <Input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter description" />
          <Input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Enter image URL" />
          <Filter value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </Filter>
          {editItem ? (
            <Button onClick={handleEditItem}>Update</Button>
          ) : (
            <Button onClick={handleAddItem}>Add</Button>
          )}
          <Button onClick={() => { setText(''); setDescription(''); setImageUrl(''); setSelectedCategory(''); setShowModal(false); }}>Cancel</Button>
        </ModalContent>
      </ModalWrapper>
      <ModalWrapper $visible={showDeleteModal}>
        <ModalContent>
          <h2>Are you sure you want to delete this item?</h2>
          <p>{deleteItem?.content}</p>
          <Button onClick={() => handleDelete(deleteItem.id)}>Delete</Button>
          <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
        </ModalContent>
      </ModalWrapper>
    </Container>
  );
};

export default CollectionManager;

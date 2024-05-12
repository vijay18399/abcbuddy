import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../providers/FirestoreProvider';
import ActionButton from '../components/Button';
import { TiDelete } from "react-icons/ti";
import Card from '../components/Card';

const Input = styled.input`
    background-color: #ffffff;
    border-radius: 20px;
    border: 1px solid rgb(185, 202, 211);
    padding: 14px;
    min-width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    &:focus{
        outline: 2px solid rgba(200, 221, 218);
    }
`;

const List = styled.ul`
    list-style-type: none;
    padding: 12px;
    width: 100%;
`;

const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 5px;
`;

const DeleteIcon = styled.span`
    color: #dc3545;
    border: none;
    font-size: 26px;
    border-radius: 4px;
    cursor: pointer;
`;

const CreateList = () => {
    const [inputValue, setInputValue] = useState('');
    const [listItems, setListItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { addDocument } = useFirestore();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            addItemToList();
        }
    };

    const addItemToList = () => {
        if (inputValue.trim() !== '') {
            setListItems([...listItems, inputValue]);
            setInputValue('');
        }
    };

    const deleteItem = (index) => {
        const newList = [...listItems];
        newList.splice(index, 1);
        setListItems(newList);
    };

    const saveList = async () => {
        if(loading){
            return;
        }
        setLoading(true);
        try {
            const docRef = await addDocument('lists', { items: listItems });
            navigate(`/practice-list/${docRef}`);
        } catch (error) {
            console.error('Error saving list:', error);
        }
        setLoading(false);
    };

    return (
        <Card title="Create List" instruction="Add Atleast 3 items to create list.">
            <Input
                type="text"
                value={inputValue}
                disabled={loading}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
                placeholder="Type here and Click Enter  to Add ..."
            />
            <List>
                {listItems.map((item, index) => (
                    <ListItem key={index}>
                        {item}
                        <DeleteIcon onClick={() => deleteItem(index)}><TiDelete /></DeleteIcon>
                    </ListItem>
                ))}
            </List>
            <ActionButton onClick={saveList} disabled={loading || listItems.length<2}>
                {loading ? 'Saving List...' : 'Create List'}
            </ActionButton>
        </Card>
    );
};

export default CreateList;

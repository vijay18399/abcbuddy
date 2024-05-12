import React from 'react';
import styled from 'styled-components';
import { TfiClose } from "react-icons/tfi";

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    max-width: 90%;
`;

const ModalTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 20px;
    font-weight: bold;
`;

const CloseButton = styled(TfiClose)`
    cursor: pointer;
    font-size: 24px;
    color: #999;
    transition: color 0.3s;

    &:hover {
        color: #666;
    }
`;

const Modal = ({ title, children, onClose }) => {
    return (
        <ModalWrapper>
            <ModalContent>
                <ModalTitle>
                    <span>{title}</span>
                    <CloseButton onClick={onClose} />
                </ModalTitle>
                {children}
            </ModalContent>
        </ModalWrapper>
    );
};

export default Modal;

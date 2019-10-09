import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Djuro',
                email: 'djuro@gmail.com',
                type: 'personal',
                phone: '225-856-635'
            },
            {
                id: 2,
                name: 'Špiro',
                email: 'spiro@gmail.com',
                type: 'personal',
                phone: '225-856-635'
            },
            {
                id: 3,
                name: 'Dobraš',
                email: 'dobras@gmail.com',
                type: 'personal',
                phone: '225-856-635'
            },
            {
                id: 4,
                name: 'Peko',
                email: 'peko@gmail.com',
                type: 'professional',
                phone: '2895-856-635'
            },
        ],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add contact
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact });

    };

    // Delete contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id});
    };

    // Set current contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact});
    };

    // Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Update contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact});
    };

    // Filter contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text});
    };

    // Clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
        }}>
            { props.children }
        </ContactContext.Provider>
    )
};

export default ContactState;
import axios from 'axios';

import { FETCH_GENERATION_LIST } from './types';

export const fetchGenerationListAction = generationList => {
    return {
        type: FETCH_GENERATION_LIST,
        generationList
    };
};

export const fetchGenerationList = () => dispatch => {

    return axios
        .get('http://localhost:3000/generations')
        .then(response => {
            dispatch(fetchGenerationListAction(response.data));
        })
        .catch(error => {
            throw error;
        });

};
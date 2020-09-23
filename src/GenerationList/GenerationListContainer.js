import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GenerationList from './GenerationList';
import { fetchGenerationList } from 'src/store/actions/GenerationAction';
import { addGenerationPool } from 'src/store/actions/GenerationPoolAction';

const columns = [
    {
        title: '#',
        field: 'generation'
    },
    {
        title: 'Victoires',
        field: 'winning'
    },
    {
        title: 'Défaites',
        field: 'losing'
    }
];

const play = (event, row) => {
    console.log('PLAY', event.target, row);
};

const container = () => {
    const [nbGenerations, setNbGenerations] = useState('');

    const generationList = useSelector(state => {
        return state.generation;
    });
    const generationPool = useSelector(state => {
        return state.generationPool;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGenerationList());
    }, [generationPool]);

    const onChangeNbGenerations = event => {
        event.preventDefault();
        const value = event.target.value;
        if (
            !value || 
            (
                !isNaN(value) && 
                Number.isInteger(parseInt(value))
            )
        ) {
            setNbGenerations(value);
        }
    };

    const onGenerate = event => {
        event.preventDefault();
        if (
            nbGenerations && 
            !isNaN(nbGenerations) && 
            Number.isInteger(parseInt(nbGenerations))
        ) {
            dispatch(addGenerationPool(nbGenerations)).then(generationPool => {
                alert(`${generationPool.payload.length} générations créées`);
            });
        } else {
            alert('Vous devez renseigner un nombre');
        }
    };

    return (
        <GenerationList 
            data={generationList} 
            columns={columns}
            onClick={play}
            nbGenerations={nbGenerations}
            onChangeNbGenerations={onChangeNbGenerations}
            onGenerate={onGenerate}
        />
    );
};

export default container;
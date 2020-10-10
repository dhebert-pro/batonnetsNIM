import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GenerationList from './GenerationList';
import { fetchGenerationList } from 'src/store/actions/GenerationAction';
import { addGame } from 'src/store/actions/GameAction';
import { launchAction } from 'src/util/reduxUtil';
import { showSuccess, showWarning } from 'src/util/alertUtil';

const GenerationListContainer = () => {
    const [nbGenerations, setNbGenerations] = useState('');

    const generationList = useSelector(state => {
        return state.generation;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        launchAction(dispatch, fetchGenerationList());
    }, []);

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
            let promise;
            for (let i = 0; i < nbGenerations; i++) {
                if (promise) {
                    promise = promise.then(() => launchAction(dispatch, addGame()));
                } else {
                    promise = launchAction(dispatch, addGame());
                }
            }
            promise.then(game => {
                showSuccess(dispatch, `${game.payload.count} générations dans la base`);
                launchAction(dispatch, fetchGenerationList());
            });
        } else {
            showWarning(dispatch, 'Vous devez renseigner un nombre');
        }
    };

    return (
        <GenerationList 
            data={generationList}
            nbGenerations={nbGenerations}
            onChangeNbGenerations={onChangeNbGenerations}
            onGenerate={onGenerate}
        />
    );
};

export default GenerationListContainer;
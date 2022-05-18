import { useState, useEffect, useRef } from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import './charList.scss';

const CharList = (props) => {

    const [chars, setChars] = useState([])
    const [newListLoading, setNewListLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [ended, setEnded] = useState(false)

    const { loading, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewListLoading(false) : setNewListLoading(true)
        getAllCharacters(offset).then(onCharListLoaded)
    }



    const onCharListLoaded = (newCharList) => {
        if (newCharList.length < 9) {
            setEnded(true)
        }

        setChars(chars => [...chars, ...newCharList])
        setNewListLoading(false)
        setOffset(offset => offset + 9)
    }

    const refArr = useRef([]);

    const focusOnItem = (id) => {
        refArr.current.forEach(item => item.classList.remove('char__item_selected'));
        refArr.current[id].classList.add('char__item_selected');
        refArr.current[id].focus();
    }

    let duration = 300;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles = {
        entering: { opacity: 0 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    };


    let item = null
    
    if (loading && !newListLoading) {
        item = <Spinner />
    } else {
        item = chars.map((char, i) => {
            if(duration === 1200){
                duration = 300;
            }
            duration = duration + 100
            return (
                <Transition in={!loading} timeout={duration}>
                    {state => (
                        <div style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                            < li key={char.id}
                                tabIndex={0}
                                ref={el => refArr.current[i] = el}
                                className="char__item"
                                onClick={() => {
                                    props.onCharSelected(char.id)
                                    focusOnItem(i)
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === ' ' || e.key === "Enter") {
                                        props.onCharSelected(char.id);
                                        focusOnItem(i);
                                    }
                                }}
                            >
                                <img src={char.thumbnail} style={{ objectFit: char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'unset' : 'cover' }} alt="abyss" />
                                <div className="char__name">{char.name}</div>
                            </li >
                        </div>
                    )}
                </Transition>
            )
        })
    }

    return (
        <div className="char__list">
            <TransitionGroup className="char__grid" style={{ display: loading && !newListLoading ? 'flex' : 'grid', justifyContent: 'center' }}>
                {item}
            </TransitionGroup>
            {ended === false ? <button
                className="button button__main button__long"
                disabled={newListLoading}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button> : 'Персонажи закончились'}
        </div >
    )

}


export default CharList;
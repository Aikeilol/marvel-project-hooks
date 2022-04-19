import { useState, useEffect, useRef } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import './charList.scss';

const CharList = (props) => {

    const [chars, setChars] = useState([])
    const [loading, setLoading] = useState(true)
    const [newListLoading, setNewListLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [ended, setEnded] = useState(false)

    useEffect(() => {
        updateCharList();
    }, [])


    const marvelService = new MarvelService();

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const updateCharList = () => {
        setLoading(true)
        onRequest();
    }

    const onCharListLoading = () => {
        setNewListLoading(true)
    }

    const onCharListLoaded = (newCharList) => {
        if (newCharList.length < 9) {
            setEnded(true)
        }

        setChars(chars => [...chars, ...newCharList])
        setLoading(false)
        setNewListLoading(false)
        setOffset(offset => offset + 9)
    }

    const refArr = useRef([]);

    const focusOnItem = (id) => {
        refArr.current.forEach(item => item.classList.remove('char__item_selected'));
        refArr.current[id].classList.add('char__item_selected');
        refArr.current[id].focus();
    }


    let item = null

    if (!loading) {
       item = chars.map((char, i) => {
            return (
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
            )
        })
    } else {
        item =  <Spinner />
    }

    return (
        <div className="char__list">
            <ul className="char__grid" style={{ display: loading ? 'flex' : 'grid', justifyContent: 'center' }}>
                {item}
            </ul>
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
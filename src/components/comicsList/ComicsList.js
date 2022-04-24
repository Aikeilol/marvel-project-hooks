import { useState, useEffect } from 'react';
import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {
    const [comics, setComics] = useState([])
    const [offset, setOffset] = useState(0)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const { loading, getAllComics } = useMarvelService()

    useEffect(() => {
        getComics(offset, false)
    }, [])

    const getComics = (offset, initial) => {
        initial ? setNewItemLoading(true) : setNewItemLoading(false)
        getAllComics(offset).then(updateComics)
    }

    const updateComics = (newComics) => {
        setComics(() => [...comics, ...newComics])
        setOffset(offset + 8)
    }

    const renderComics = comics.map((item, i) => {
        return (
            <li key={i} className="comics__item" >
                <a href="#">
                    <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </a>
            </li >
        )
    })

    const spinner = loading && !newItemLoading ? <Spinner /> : null

    return (
        <div className="comics__list">
            <ul className="comics__grid" style={{ display: loading && !newItemLoading ? 'flex' : 'grid' }}>
                {spinner}
                {renderComics}
            </ul>
            <button disabled={loading} onClick={() => getComics(offset, true)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
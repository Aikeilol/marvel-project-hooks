import './charInfo.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

const CharInfo = (props) => {

  const [char, setChar] = useState(null)


  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId])

  const onCharLoaded = (char) => {
    setChar(char)
  }

  const updateChar = () => {
    clearError()
    const { charId } = props;
    if (!charId) {
      return;
    }
    getCharacter(charId)
      .then(onCharLoaded)
  }


  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;
  const skeleton = char || loading || error ? null : <Skeleton />


  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  )
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const imgStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : 'cover';
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} style={{ objectFit: imgStyle }} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length === 0 ? 'Комиксы не найдены' : comics.map((item, i) => {
          if (i < 10) {
            return (
              <li key={i} className="char__comics-item">
                {item.name}
              </li>
            )
          }
          return null;
        })}
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number,
}

export default CharInfo;
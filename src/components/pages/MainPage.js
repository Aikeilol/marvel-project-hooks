import { useState, useRef, useEffect } from 'react';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';

const MainPage = () => {

  const [selectedChar, setChar] = useState(null)
  // const vision = useRef(null)

  const onCharSelected = (id) => {
    setChar(id)
  }

  // useEffect(() => {
  //   console.log(vision.current.getBoundingClientRect().top)
  // })
  

  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList onCharSelected={onCharSelected} />
        <CharInfo charId={selectedChar} />
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  )
}

export default MainPage
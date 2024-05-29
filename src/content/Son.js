import React, { useContext } from 'react';
import { OyunContext } from '../context/OyunContext';
import { Link } from "react-router-dom";
import './Son.css'

const Son = () => {

    //OyunContex'teki verileri alır.
    const { questionsArray, answersArray, guessesArray } = useContext(OyunContext);
    //Alfabeye uyumlu olması için array'i ters çevirir.
    guessesArray.reverse();
    return (
        <div>
            {/* Sitenin en üstündeki header. */}
            <div id="header"><h1 id="league-spartan-bu-ne-la-text" >bu ne la?</h1></div>
            {/* Ana  menüye dönme butonu. */}
            <Link to="/"><button className="league-spartan-anamenu-button"><span>Anamenü</span></button></Link>
            {/* Tüm soruların, tahminlerin ve cevapların bulunduğu tablo. */}
            <table>
                {/* Table head kısmı. */}
                <thead className='question-final-container'>
                    <tr className='question-final-item'>
                        <th className='question-final-box'>Soru</th>
                        <th className='guess-header-box'>Tahmin</th>
                        <th className='answers-box'>Cevap</th>
                    </tr>
                </thead>
                {/* Tüm verilerin yazıldığı kısım. */}
                <tbody className='question-final-container'>
                    {guessesArray.map((guess, i) => (
                        <tr key={i} className='question-final-item' >
                            <td className='question-final-box'><p>{questionsArray[i]}</p></td>
                            {/* Doğruysa yeşil, yanlışsa kırmızı rengini alır. */}
                            <td className={`guess-final-box ${guess.correct ? 'correct' : 'incorrect'}`}><p>{guess.guess}</p></td>
                            <td className='answers-box'><p>{answersArray[i]}</p></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Son;
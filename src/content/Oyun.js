import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { OyunContext } from '../context/OyunContext';
import './Oyun.css';

//Oyunun oynandığı component.
const Oyun = () => {

  //OyunContex'teki verileri alır.
  const { questionsArray, answersArray, guessesArray, lettersArray, setGuessesArray, isLoading, counter, setCounter } = useContext(OyunContext);
  //Klavyeden girilen son değeri tutar.
  const [inputValue, setInputValue] = useState('');
  //Kaçıncı soruda olduğumuzu tutar.
  const [questionIndex, setQuestionIndex] = useState(0);

  //Oyun bittiğinde oyun sonu sayfasına götürür.
  const navigate = useNavigate();
  useEffect(() => {
    if (counter === 26) {
      navigate('/son');
      setCounter(0);
    }
  }, [counter, navigate, setCounter]);

  //Butona basıldığında çalışır.
  const handleClick = () => {

    //Boş cevap yollanamaz ve girilen verileri küçük karaktere dönüştürüp guess e atar.
    if (inputValue.trim() !== '') {
      const guess = inputValue.toLowerCase();

      //Siteden çektiğimiz cevap verileri birden fazla olabildiği için gelen cevapları her virgül+boşluktan sonra bölerek diziye atar.
      const tempAnswers = answersArray[questionIndex].split(", ");
      let isCorrect = false;
      //Dizinin her elemanını klavyeden girilen değerle karşılaştırır ve doğru olduğu an döngüyü kırar. Eğer döngü hiç kırılmazsa veri yanlış olarak devam eder.
      for (let answer of tempAnswers) {
        isCorrect = answer.trim() === guess.trim();
        if (isCorrect) break;
      }

      //Girilen tahminleri doğru yanlış olarak ayırmak ve sonuç sayfasına yazdırmak için kaydeder. Soruları da aşağıda 2 kere map kullanmamak için kaydeder
      const newGuess = {
        guess,
        correct: isCorrect,
        question: questionsArray[questionIndex],
        //Her tahmine farklı id verir, key olarak kullanabilmek için.
        id: Date.now()
      };
      setGuessesArray([newGuess, ...guessesArray]);

      //Inputu boşaltır. Altındakiler de question indexi ve counterı 1 artırır.
      setInputValue('');
      setQuestionIndex(questionIndex + 1);
      setCounter(counter + 1);
    }
  };

  //Entera basıldığında butona tıklanmasını sağlar.
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  /*Sorular siteden çekilene kadar sitenin yüklenmemesini sağlar. Muhtemelen sorular yükleniyor yazısını başka hiçbir insan görmeyecek,
  üniversitemizin internet altyapısı sağ olsun sadece 26 cümlelik verinin çekilmesi 1 dakika sürdüğünden her açtığımda görüyorum.*/
  if (isLoading) {
    return <div className='league-spartan-loading-text'>Sorular yükleniyor...</div>;
  } else {
    return (
      <div>
        {/* Sitenin en üstündeki header. */}
        <div id="header"><h1 id="league-spartan-bu-ne-la-text" >bu ne la?</h1></div>

        {/* Cevapların ilk harfleri yazar. İpucu */}
        <p className='league-spartan-letter-box'>{lettersArray[questionIndex]}</p>
        {/* Sorular. Question index arttıkça bir sonraki soruya geçilir. */}
        <p className='league-spartan-questions'>{questionsArray[questionIndex]}</p>
        {/* input ve button u konumlandırır. */}
        <div className="input-container">
          {/* Tahminlerin girildiği input. */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='input-box'
            onKeyDown={handleKeyDown}
            placeholder='Tahmin et...'
          />
          {/* Tıklandığında handleClick fonksiyonu çalışır. */}
          <button onClick={handleClick} className='cevapla-button'><span>Cevapla</span></button>
        </div>

        {/* Eski soruları aşağıya doğru animasyonla kaydırarak sıralayarak tutar. */}
        <div className="question-history-container">
          <TransitionGroup>
            {guessesArray.map((item) => (
              <CSSTransition
                key={item.id}
                timeout={500}
                classNames="fade"
              >
                <div className='question-history-item'>
                  <div className='question-history-box'><p>{item.question}</p></div>
                  {/* Tahmin doğru ise yeşil yanlış ise kırmızı yanması için correct ya da incorrect className i verir. */}
                  <div className={`guess-history-box ${item.correct ? 'correct' : 'incorrect'}`}><p>{item.guess}</p></div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
};

export default Oyun;

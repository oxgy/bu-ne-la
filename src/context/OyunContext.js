import React, { createContext, useState, useEffect } from 'react';

//Context oluşturur.
export const OyunContext = createContext();

//Çaldığımız verileri tüm componentlerde kullanabilmek için bir provider içine alır.
export const OyunProvider = ({ children }) => {
    const [questionsArray, setQuestions] = useState([]);
    const [answersArray, setAnswers] = useState([]);
    const [guessesArray, setGuessesArray] = useState([]);
    const [lettersArray, setLettersArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    //Sayfa her yenilendiğinde soruların da yenilendiği bir sayfadan soru, kelime, harf çeker ve arraylere atar. 
    useEffect(() => {
        fetch('https://api.radkod.com/parolla/api/v1/modes/unlimited')
            .then(response => response.json())
            .then(data => {
                const questions = data.data.questions;
                setQuestions(questions.map(q => q.question));
                //Karşılaştırmak için küçük harfe çevirir.
                setAnswers(questions.map(q => q.answer.toLowerCase()));
                setLettersArray(questions.map(q => q.letter));

                //Veriler gelince yüklenme sayfasını kapatır.
                setIsLoading(false);
            })
            .catch(error => console.error('Sorular alınırken hata oluştu:', error));
    }, []);

    return (
        //Verileri diğer componentlerde kullanmaya hazır hale getirir.
        <OyunContext.Provider value={{ questionsArray, answersArray, guessesArray, lettersArray, setGuessesArray, isLoading, counter, setCounter }}>
            {children}
        </OyunContext.Provider>
    );
};

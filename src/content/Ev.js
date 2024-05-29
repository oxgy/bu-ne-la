import './Ev.css';
import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


//Home page componenti. Uygulama ilk açıldığında burası görünür.
const Ev = () => {
  //Girişteki yazıyı sürekli değiştirir.
  const bunlarNeLa = ["bu ne la?", "ne bu la?", "la bu ne?", "ne la bu?", "la ne bu?"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % bunlarNeLa.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  //Bootstrap Alert kullanmak için gerekli
  const [show, setShow] = useState(false);

  return (
    //Sitenin en üstündeki header, altında butonları tutan container, altında girişteki yazıyı ve butonları tutan container(itemleri ortalar.)
    <><div id="header"><h1 id="league-spartan-bu-ne-la-text" >bu ne la?</h1></div>
      <ul id="menu-container">
        <p id="giris-text">Her soruda {bunlarNeLa[index]} diyeceğiniz kelime bilmeceye hoş geldiniz!</p>
        {/* Oyun sayfasına yönlendirme butonu */}
        <li><button className="league-spartan-basla-button" onClick={() => { window.location.href = "/oyun" }}><span>Başla</span></button></li>
        <li>
          {/* Nasıl oynanır butonu, bootstrap alert kullanarak yapıldı. */}
          <Alert show={show} variant="dark">
            <div className="alert-container">
              <Alert.Heading>Nasıl oynanır?</Alert.Heading>
              <p className="league-spartan-nasil-oynanir-text">
                Bu ne la' da size kelimelerin anlamları verilir. Size de kelimeleri tahmin etmek düşer. Eğer yazdığınız kelime yeşil yanar ise doğru, kırmızı yanar ise yanlış cevap vermişsinizdir. Toplamda 26 soru vardır ve sorular alfabetik ilerler, yani 1. kelimenin baş harfi A, 26. kelimenin baş harfi Z' dir. Yapabildiğiniz kadar doğru bulmaya çalışın!
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button onClick={() => setShow(false)} variant="outline-dark" className="outline-dark">
                  Kapat
                </Button>
              </div>
            </div>
          </Alert>
          {!show && <button className="league-spartan-nasil-oynanir-button" onClick={() => setShow(true)}><span>Nasıl oynanır</span></button>}
        </li>
      </ul >
    </>
  )
};


export default Ev;
import { useEffect } from 'react';
import React from 'react';
import './App.css'
const tg = window.Telegram.WebApp;//Подключаем объект взаимодействия с Telegram

function App() {
  useEffect(() => {
    tg.ready();// метод позволяет отследить, когда приложение готово к отображению.
  }, [])
  const Close = () => {
    tg.close()// метод закрывает приложение.
  }
  return (
    <div className='App'>
      <h1>Первый запуск</h1>
      <img src='https://thumbs.gfycat.com/SoftOptimalAdeliepenguin-size_restricted.gif' alt='img'></img>
      <button onClick={Close}>Закрыть</button>
    </div>
  )
}
export default App

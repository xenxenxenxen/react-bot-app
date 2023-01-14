import { useEffect } from 'react';
import './App.css'
import React from 'react';
import { Collection } from './Collection';
import { MyLoader } from './Skeleton';
const category = [//Список категорий
  { "name": "Всё" },
  { "name": "Пейзажи" },
  { "name": "Море" },
  { "name": "Культура" },
  { "name": "Авто" },
  { "name": "Разное" }
]
const tg = window.Telegram.WebApp;//Подключаем объект взаимодействия с Telegram

function App() {
  const [collections, setCollections] = React.useState([]);//Список коллекции фото
  const [searchValue, setSearchValue] = React.useState('');//Переменная поиска
  const [categoryId, setCategoryId] = React.useState(0)//Индекс категории
  const [isLoading, setIsLoading] = React.useState(true)//Переменная проверки состояния загрузки
  const [page, setPage] = React.useState(1)//Страница по умолчанию
  const pages = categoryId ? `category=${categoryId}` : '';//Получение тех фото, которые соответствуют индексу категории
  const [pagesItem, setPagesItem] = React.useState(2)//Колличество страниц

  useEffect(() => {
    tg.ready();// метод позволяет отследить, когда приложение готово к отображению.
  }, [])
  const Close = () => {
    tg.close()// метод закрывает приложение.
    
  }
  React.useEffect(() => {
    setIsLoading(true)//Отображение страницы загрузки
    fetch(`https://633ffba7e44b83bc73c5e86e.mockapi.io/collage?page=${page}&limit=8&${pages}`)//Получение данных с Mockapi.io (Предварительно создаём свою БД)
      .then(res => res.json())//Преобразовываем полученную информацию в json файл
      .then(json => {
        setCollections(json);//Передаём коллекцию фото в массив collection
      })
      .catch((err) => {//Если ошибка загрузки
        alert('Ошибка получения данных')//Выводим сообщение об ошибке загрузки
      }).finally(() => setIsLoading(false))//Во время загрузки, выводим экран загрузки
  }, [categoryId, page])
  return (
    <div className="App">
      <h1>Коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {category.map((obj, i) =>//Получаем категории из массива category
           <li onClick={() => //Делаем элементы списка категорий кликабельными
           { setPage(1);//Переходим на первую страницу
            setCategoryId(i)//Устанавливаем выбранную категорию
             }} className={categoryId === i ? 'active' : ''} key={obj.name}>{obj.name}</li>)}{/*Задание свойств кнопки активной категории */}
        </ul>
        <input value={searchValue}//Подключение переменнойы поиска
          onChange={(e) => setSearchValue(e.target.value)}//Передача знчения строки поиска, если оно изменилось
          className="search-input"
          placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (<MyLoader/>) ://Проверка загрузки
          (
            collections.filter((obj) => //Вывод карточек фото, удовлевотворяющих поиску
            obj.name.toLowerCase()//Прелбразование к нижнему регистру названия карточек
                .includes(searchValue.toLowerCase()))//Сравнение названия карточек со строкой поиска. Строку поиска тоже преобразовываем к нижнему регистру
              .map((obj, index) => (//Получение объектов карточек
                <Collection key={index} name={obj.name} images={obj.photos} />//Отправка данных карточек в компоненту Collection
              ))
          )}
      </div>
      <ul className="pagination">
        {[...Array(pagesItem)].map((obj, i) => <li onClick={() => { setPage(i + 1) }}
        className={page === i + 1 ? 'active' : ''}>{i + 1}</li>)/*Получаем колличество страниц, передаём данные о выбранной странице, задаём свойства для самой кнопки страницы*/}
      </ul>
    </div>
  );
}
export default App;

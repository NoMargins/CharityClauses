import React, {useState} from 'react';
import './instruction.scss'; // Ви можете додати додаткові кастомні стилі тут

const Instruction = () => {
    const [isCollapsed, setIsCollapsed] = useState(false); // Стан для контролю згортання/розгортання

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed); // Змінюємо стан при кліку
  };

  return (
    <div className="instruction container">
        <h2 className="text-center mb-4" onClick={toggleCollapse} style={{marginTop: '12px'}}>
        📃Інструкція {isCollapsed ? '▼' : '▲'} {/* Іконка індикатора */}
      </h2>
      {!isCollapsed && ( // Показуємо або ховаємо зміст на основі стану isCollapsed
      <div>
        <ol className="list-group">
         {/* <li className="list-group-item">Дякуємо, що здійснюєте мрії дітей! За один день до нашої ініціативи долучилося понад 115 колег — тож всі дитячі мрії вже в роботі!😊</li> */}
         <li className="list-group-item">Обери дитину із "Галереї всіх мрій" нижче.</li> 
        {/* <li className="list-group-item">Натисніть на зображнення листа дитини, щоб збільшити та гарненько ознайомитися з бажанням дитини.</li>  */}
        <li className="list-group-item">Якщо маєш намір виконати бажання, натисни на кнопку <strong>“Здійснити мрію"</strong>, заповни форму — і мрія дитини закріпиться за тобою.</li>
        <li className='list-group-item'>У формі обов'язково залиш свої дані: ПІБ або нікнейм та телефон чи e-mail для зв'язку. Ти також можеш об'єднуватися з колегами — у цьому випадку визначите координатора, який зареєструє листа дитини за своїми контактними даними.</li>
        <li className="list-group-item">Перевірити закріплену за тобою дитину можна в розділі "Мрії в роботі". <br/></li>
        <li className="list-group-item">📦 Придбай подарунок, обов'язково святково упакуй його та підпиши, вказавши назву закладу, ім'я та вік дитини. Також напиши вітального листа підопічному, йому буде приємно 😉.</li>
        <li className="list-group-item"> Передай подарунок до <b>HR твого офісу</b> АБО надішли його нам на поштомат Нової Пошти в офісі на Тичини:
          <p className="list-group-item" style={{backgroundColor:'#fff', color: 'black'}}><strong>м. Київ, НП №50049, Попенко Роман, тел. +38 (099) 087-73-34</strong></p>
          Подарунок необхідно передати <strong>до 01.12.2024</strong>
        </li>
        <li className="list-group-item">✏️ Обов'язково повернись на цей сайт аби відмітити, що посилка з подарунком вже передана HR чи на Нову Пошту. А якщо маєш будь-які питання — звертайся до кураторки проєкту <strong>Олени Рябенко (068 573-66-03)</strong>.
        Ми тримаємо руку на пульсі, щоб всі вихованці дитячих будинків отримали свої подаруночки 😊</li>
        </ol>
      </div>
      )}
      </div>
  );
}

export default Instruction;

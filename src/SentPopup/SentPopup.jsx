// import React, { useState, useRef, useEffect } from 'react';
// import './sentPopup.scss';

// const SentPopup = ({ id, childInfo, onSentPopupClose, wizardEmail }) => {
//   const [enteredMail, setEnteredMail] = useState('');
//   const [secondStep, setSecondStep] = useState(false);
//   const [sentDate, setSentDate] = useState(new Date());
//   const [sentInfo, setSentInfo] = useState(''); // Додано стан для sentInfo
//   const [serverResponse, setServerResponse] = useState('');

//   useEffect(() => {
//     console.log(childInfo);
//   }, [childInfo]);

//   const onClose = () => {
//     setServerResponse('');
//     onSentPopupClose();
//   }

//   const handleVerificationSubmit = () => {
//     console.log(wizardEmail);
//     if (!enteredMail) {
//       alert('Будь ласка, введіть Ваш e-mail, вказаний при реєстрації.');
//       return;
//     }
//     if (enteredMail !== wizardEmail) {
//       console.log(wizardEmail);
//       alert('Ваш e-mail не співпадає з введеним при реєстрації. Будь ласка, перевірте його та спробуйте ще раз.');
//       return;
//     }
//     setSecondStep(true);
//   };

//   const handleIsSentSubmit =  () => {
//     if (!sentDate || !sentInfo) {
//       alert('Будь ласка, перевірте, чи всі дані надано.');
//       return
//     }
//     const isSentAllInfo = {
//       sentDate: sentDate,
//       TTN: sentInfo,
//       isSent: true
//     }

//     const onSubmit =  async (wizardData) => {
//       console.log(`Оновити дані з ІD дитини: ${id}`, wizardData);
    
//       try {  
//           const updateResponse = await fetch(`https://dobrovershnyk.online/api/post.php?id=${id}`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(wizardData),
//           });
        
//           if (!updateResponse.ok) {
//             throw new Error(`HTTP error! status: ${updateResponse.status}`);
//           }
        
//           const updateData = await updateResponse.json();
//           setServerResponse(updateData.message);
        
//       } catch (error) {
//         const errorMessage = `Помилка при відправці даних на сервер. ${error.message}`;
//         setServerResponse(errorMessage);
//         console.error('Помилка при відправці даних на сервер:', error);
//       }
//     };

//     onSubmit(isSentAllInfo);
//   }
    
//   const popupRef = useRef();

//   const onEmailChange = (e) => {
//     setEnteredMail(e.target.value);
//   }

//   return (
//     <div className='issent-popup-overlay'>
//       <div className='popup-content' ref={popupRef}>
//         <button className='close-button' onClick={onClose}>
//           &times;
//         </button>
//         {serverResponse !== '' && (
//             <h3>{serverResponse}</h3>
//           )} 
//         {serverResponse === '' && !secondStep && (
//           <div className='child-info' style={{ marginTop: '30px' }}>
//             <p>
//               <strong>Будь ласка, спершу підтвердьте Вашу особу, увівши e-mail, вказаний Вами при реєстрації:</strong>
//             </p>
//             <input
//               type='email'
//               className='form-check-input'
//               id='mail'
//               name='mail' // Додано атрибут name
//               placeholder='e-mail'
//               defaultValue={enteredMail}
//               autoComplete='email' // 'on' також можна використати, але 'email' більш специфічний
//               style={{ width: '100%', height: '40px', margin: '20px auto', textAlign: 'center' }}
//               onChange={onEmailChange}
//               required
//             />
//             <button className='btn btn-primary me-2' onClick={handleVerificationSubmit} style={{ width: '50%', minWidth: '200px', textAlign: 'center' }}>
//               Увійти
//             </button>
//           </div>
//         )}

//         {serverResponse === '' && secondStep && (
//           <div className='is-sent-container' style={{ display: 'flex', flexDirection: 'column' }}>
//             <h2>Повідомити про відправку подарункa</h2>
//             <label className='form-check-label' htmlFor='form-date-input'>
//               Оберіть дату відправки подарунку:
//             </label>
//             <input
//               type='date'
//               className='form-date-input'
//               id='date-sent'
//               name='date' // Додано атрибут name
//               style={{ textAlign: 'center' }}
//               value={sentDate}
//               onChange={(e) => setSentDate(e.target.value)}
//               required
//             />

//             <label className='form-check-label' htmlFor='info-sent'>
//               Введіть номер ТТН:
//             </label>
//             <input
//               type='text'
//               className='form-text-input'
//               id='info-sent'
//               name='info-sent' // Додано атрибут name
//               value={sentInfo}
//               style={{textAlign: 'center'}}
//               onChange={(e) => setSentInfo(e.target.value)} // Виправлено на setSentInfo
//               required
//             />
//             <button className='btn btn-primary me-2' onClick={handleIsSentSubmit}>
//               Відправити
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SentPopup;

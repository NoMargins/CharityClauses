// SentNotificationPopup.js
import React, { useState, useRef } from 'react';
import './sentPopup.scss';

const SentNotificationPopup = ({ childInfo, id, onSentPopupClose, wizardEmail }) => {
  const [enteredMail, setEnteredMail] = useState('');
  const [secondStep, setSecondStep] = useState(false);
  const [sentDate, setSentDate] = useState(new Date());
  const [sentInfo, setSentInfo] = useState('');
  const [serverResponse, setServerResponse] = useState('');

  const onClose = () => {
    setServerResponse('');
    onSentPopupClose();
  }

  const handleVerificationSubmit = () => {
    if (!enteredMail) {
      alert('Будь ласка, введи свій e-mail, вказаний при реєстрації.');
      return;
    }
    if (enteredMail !== wizardEmail) {
      alert('Цей e-mail не співпадає з введеним при реєстрації. Будь ласка, перевір його та спробуй ще раз.');
      return;
    }
    setSecondStep(true);
  };


  const isSentAllInfo = {
    sentDate: sentDate,
    TTN: sentInfo,
    isSent: true
  }

  const handleIsSentSubmit = async () => {
    if (!sentDate || !sentInfo) {
      alert('Будь ласка, перевір, чи всі дані надано.');
      return;
    }
  
    try {
      // const updateResponse = await fetch(`https://dobrovershnyk.online/api/post.php?id=${id}`, {
        const updateResponse = await fetch(`/api/post.php?id=${id}`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isSentAllInfo),
      });
  
      if (!updateResponse.ok) {
        throw new Error(`HTTP error! status: ${updateResponse.status}`);
      }
  
      console.log(`id: ${id}, ${isSentAllInfo}`);

      const updateData = await updateResponse.json();
      setServerResponse(updateData.message);
  
    } catch (error) {
      const errorMessage = `Помилка при відправці даних на сервер. ${error.message}`;
      setServerResponse(errorMessage);
      console.error('Помилка при відправці даних на сервер:', error);
    }
  };
  

  const popupRef = useRef();

  const onEmailChange = (e) => {
    setEnteredMail(e.target.value);
  }

  return (
    <div className='issent-popup-overlay'>
      <div className='popup-content' ref={popupRef}>
        <button className='close-button' onClick={onClose}>
          &times;
        </button>
        {serverResponse !== '' && (
          <h3>{serverResponse}</h3>
        )}
        {serverResponse === '' && !secondStep && (
          <div className='child-info' style={{ marginTop: '30px' }}>
            <p style={{color: '#000', fontSize: '16px'}}>
              <strong>Будь ласка, спершу підтвердь свою особу та введи e-mail, вказаний при реєстрації:</strong>
            </p>
            <input
              type='email'
              className='form-check-input'
              id='mail'
              name='mail'
              placeholder='e-mail'
              defaultValue={enteredMail}
              autoComplete='email'
              style={{ width: '100%', height: '40px', margin: '20px auto', textAlign: 'center' }}
              onChange={onEmailChange}
              required
            />
            <button className='btn btn-primary me-2' onClick={handleVerificationSubmit} style={{ width: '50%', minWidth: '200px', textAlign: 'center' }}>
              Увійти
            </button>
          </div>
        )}

      {serverResponse === '' && secondStep && (
        <div className='is-sent-container' style={{ display: 'flex', flexDirection: 'column', marginTop: '30px', color: '#0056b3', fontWeight: '700' }}>
          <h2>Повідомити про відправку подарунка</h2>
          <label className='form-check-label' htmlFor='form-date-input' style={{marginTop: '20px'}}>
            Обери дату відправки/передачі HR подарунку:
          </label>
          <input
            type='date'
            className='form-date-input'
            id='date-sent'
            name='date'
            style={{ textAlign: 'center' }}
            value={sentDate}
            onChange={(e) => setSentDate(e.target.value)}
            required
          />

          <label className='form-check-label' htmlFor='info-sent'>
            Ім'я HR/номер ТТН:
          </label>
          <input
            type='text'
            className='form-text-input'
            id='info-sent'
            name='info-sent'
            value={sentInfo}
            style={{ textAlign: 'center' }}
            onChange={(e) => setSentInfo(e.target.value)}
            required
          />
          <button className='btn btn-primary me-2' onClick={handleIsSentSubmit} style={{marginTop: '20px'}}>
            Відправити
          </button>
        </div>
      )}

      </div>
    </div>
  );
};

export default SentNotificationPopup;

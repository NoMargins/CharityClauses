import React, { useState, useEffect, useRef } from 'react';
import './authPopup.scss';

const AuthPopup = ({ childInfo, onSubmit, onClose, serverResponse, setServerResponse }) => {
  const [wizardName, setWizardName] = useState('');
  const [wizardPhone, setWizardPhone] = useState('');
  const [wizardEmail, setWizardEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const popupRef = useRef();

  const validatePhone = (phone) => /^(\+38)?0\d{9}$/.test(phone);

  const handleSubmit = () => {
    setIsNameValid(!!wizardName);
    setIsPhoneValid(validatePhone(wizardPhone));
    setIsEmailValid(!!wizardEmail);

    if (!wizardName || !validatePhone(wizardPhone) || !wizardEmail || !agreed) {
      alert('Будь ласка, заповніть усі поля коректно.');
      return;
    }

    const wizardData = {
      wizard: wizardName,
      wizardPhone: wizardPhone,
      wizardEmail: wizardEmail,
    };

    onSubmit(wizardData);
    console.log('Відправлено дані:', wizardData);
  };

  const geminitive = (numb) => {
    if (numb <= 4) {
      return `${numb} роки`;
    }
    return `${numb} років`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setServerResponse('');
        onClose(); // Закриває попап
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const onInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'name') {
      setIsNameValid(true);
      setWizardName(value);
    } else if (id === 'phone') {
      const formattedValue = value.startsWith('+38') ? value : `+38${value}`;
      setWizardPhone(formattedValue);
      setIsPhoneValid(true);
    } else if (id === 'email') {
      setIsEmailValid(true);
      setWizardEmail(value);
    }
  };

  const handlePhoneFocus = () => {
    if (!wizardPhone) {
      setWizardPhone('+380');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content" ref={popupRef}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Реєстрація Добровершника</h2>
        {serverResponse !== '' && <p>{serverResponse}</p>}
        {serverResponse.length < 1 && childInfo && (
          <>
            <div className="child-info">
              <p>
                <strong>Ваш підопічний:</strong> {childInfo.name}, {geminitive(childInfo.age)}
              </p>
              <p>
                <strong>Заклад:</strong> {childInfo.orphanage}
              </p>
              <p>
                <strong>Бажання:</strong> {childInfo.wish}
              </p>
            </div>
            <input
              type="text"
              id="name"
              className={`form-control mb-3 ${!isNameValid ? 'is-invalid' : ''}`}
              placeholder="ПІБ або нікнейм"
              value={wizardName}
              onChange={onInputChange}
            />
            {!isNameValid && <div className="invalid-feedback">Будь ласка, введіть ПІБ або нікнейм.</div>}

            <input
              type="text"
              id="phone"
              className={`form-control mb-3 ${!isPhoneValid ? 'is-invalid' : ''}`}
              placeholder="Телефон"
              value={wizardPhone}
              onFocus={handlePhoneFocus}
              onChange={onInputChange}
              maxLength={13}
            />
            {!isPhoneValid && <div className="invalid-feedback">Будь ласка, введіть коректний номер телефону.</div>}

            <input
              type="email"
              id="email"
              className={`form-control mb-3 ${!isEmailValid ? 'is-invalid' : ''}`}
              placeholder="Email"
              value={wizardEmail}
              onChange={onInputChange}
            />
            {!isEmailValid && <div className="invalid-feedback">Будь ласка, введіть коректний email.</div>}

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreementCheckbox"
                checked={agreed}
                style={{ border: '1px solid blue' }}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              <label className="form-check-label" htmlFor="agreementCheckbox">
                Я ознайомився(лась) з інструкцією та погоджуюсь бути відповідальним Миколайчиком
              </label>
            </div>
            <button className="btn btn-primary me-2" onClick={handleSubmit}>
              Зареєструватися
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPopup;

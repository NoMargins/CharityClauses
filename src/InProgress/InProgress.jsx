// InProgress.js
import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner/Spinner'; // Update the path based on your project structure
import ImgPopup from '../ImgPopup/ImgPopup';
import SentNotificationPopup from '../SentPopup/SentNotificationPopup';

const InProgress = ({ charityData }) => {
  const [childrenData, setChildrenData] = useState(charityData);
  const [selectedImage, setSelectedImage] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [openPopupId, setOpenPopupId] = useState(null);

  useEffect(() => {
    setLoading(true);

    const delay = setTimeout(() => {
      setChildrenData(charityData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [charityData]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    const searchLower = search.toLowerCase();
    const filteredChildren = charityData.filter(child =>
      (child.wizard && child.wizard.toLowerCase().includes(searchLower)) ||
      (child.wizardPhone && child.wizardPhone.includes(searchLower)) ||
      (child.wizardMail && child.wizardMail.toLowerCase().includes(searchLower))
    );
    setChildrenData(filteredChildren);
  };

  const handleIsSentBtn = (childId) => {
    setOpenPopupId(childId);
  }

  const onSentPopupClose = () => {
    setOpenPopupId(null);
  }

  return (
    <div className='takenChildrenSection'>
      <div className='search-box d-flex flex-column justify-content-center align-items-center my-3'>
        <span>Щоб знайти своїх підопічних, введіть у пошукове поле Ваше ПІБ або телефон чи е-мейл.</span>
        <div className='together-section' style={{ width: '500px', display: 'flex', flexDirection: 'column', margin: '12px 0', fontSize: '18px' }}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Пошук за чарівником..."
            value={search}
            onChange={handleSearchChange}
            style={{ maxWidth: '500px', textAlign: 'center' }}
          />
          <button className="btn btn-primary" onClick={handleSearch}>Пошук</button>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className='childGalleryGrid'>
          {childrenData.map(({ id, name, age, wizard, letterUrl, orphanage, wish, wizardEmail, isSent }) => (
            <div className='childCard' key={id}>
              <img
                src={letterUrl}
                alt={`Лист до Миколая від ${name}`}
                onClick={() => handleImageClick(letterUrl)}
                loading='lazy'
              />
              <div className='childInfo'>
                <h2>{name}, {age} р.</h2>
                <p><b>Бажання:</b> {wish}</p>
                <p><b>Заклад:</b> {orphanage}</p>
                <p><b>Виконує бажання:</b> {wizard}</p>
                {!isSent && (
                  <button onClick={() => handleIsSentBtn(id)}>
                    Повідомити, що подарунок відправлено
                  </button>
                )}
                {isSent && <p style={{color: '#0056b3'}}><strong>☑ Подарунок відправлено</strong></p>}
                {!isSent && openPopupId === id && (
                  <SentNotificationPopup
                    key={id}
                    id={id}
                    childInfo={childrenData}
                    onSentPopupClose={onSentPopupClose}
                    wizardEmail={wizardEmail}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <ImgPopup imgUrl={selectedImage} setSelectedImage={setSelectedImage} />
      )}
    </div>
  );
};

export default InProgress;

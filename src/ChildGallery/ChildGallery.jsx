import React, { useState, useEffect } from 'react';
import AuthPopup from '../AuthPopup/AuthPopup';
import ImgPopup from '../ImgPopup/ImgPopup';
import ChildForm from '../ChildForm/ChildForm';
import './childGal.scss';

const ChildGallery = ({ charityData, onSubmit }) => {
  const [childrenData, setChildrenData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showWizardPopup, setShowWizardPopup] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [serverResponse, setServerResponse] = useState('');

  useEffect(() => {
    setChildrenData(charityData);
  }, [charityData]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    console.log('Image clicked:', imageUrl);
  };

  const handleBecomeWizard = (child) => {
    setSelectedChild(child);
    setShowWizardPopup(true);
  };

  const handleSubmitWizardForm = async (wizardData) => {
    console.log(`Чарівник обрав дитину з ID: ${selectedChild.id}`, wizardData);

    try {
      // Перевірка поточних даних з API
      const currentDataResponse = await fetch(
        // `https://dobrovershnyk.online/api/post.php?id=${selectedChild.id}`
        `/api/send.php?id=${selectedChild.id}`
      );
      if (!currentDataResponse.ok) {
        throw new Error(`HTTP error! status: ${currentDataResponse.status}`);
      }

      const currentData = await currentDataResponse.json();
      console.log('Поточні дані з сервера:', currentData);

      // Перевірка наявності поля wizard
      if (!currentData.wizard) {
        // Оновлення даних
        const updateResponse = await fetch(
          // `https://dobrovershnyk.online/api/auth.php?id=${selectedChild.id}`,
          `/api/auth.php?id=${selectedChild.id}`,

          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(wizardData),
          }
        );

        if (!updateResponse.ok) {
          throw new Error(`HTTP error! status: ${updateResponse.status}`);
        }

        const updateData = await updateResponse.json();
        console.log('Відповідь від сервера (оновлено):', updateData);
        setServerResponse('Уррра! Реєстрація успішна, гайда за подарунком!');
        onSubmit();
      } else {
        // Якщо поле wizard вже заповнене
        console.log('Дані вже існують для цієї дитини');
        setServerResponse(
          'Вибач, але вже інший чарівник виконує це бажання. Ти можеш обрати іншу дитину з Галереї всіх бажань.'
        );
      }
    } catch (error) {
      const errorMessage = `Помилка при відправці даних на сервер. Спробуй ще раз.`;
      setServerResponse(errorMessage);
      console.error('Помилка при відправці даних на сервер:', error);
    }
  };

  const onAuthPopupClose = () => {
    setServerResponse('');
    setShowWizardPopup(false);
  };

  return (
    <div className="childGallery">
      {childrenData.map((child) => (
        <ChildForm
          key={child.id}
          child={child}
          handleBecomeWizard={handleBecomeWizard}
          handleImageClick={handleImageClick}
        />
      ))}
      {selectedImage && (
        <ImgPopup imgUrl={selectedImage} setSelectedImage={setSelectedImage} />
      )}
      {showWizardPopup && (
        <AuthPopup
          childInfo={selectedChild}
          onSubmit={handleSubmitWizardForm}
          onClose={onAuthPopupClose}
          serverResponse={serverResponse}
          setServerResponse={setServerResponse}
        />
      )}
    </div>
  );
};

export default ChildGallery;

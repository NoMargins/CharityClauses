import React, { useState, useEffect } from 'react';
import AuthPopup from '../AuthPopup/AuthPopup';
import ImgPopup from '../ImgPopup/ImgPopup';
import ChildForm from '../ChildForm/ChildForm';
import './childGal.scss';

const ChildGallery = ({charityData, onSubmit}) => {
  const [childrenData, setChildrenData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showWizardPopup, setShowWizardPopup] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [isChildAvailble, setIsChildAvailabel] = useState(true);
  const [serverResponse, setServerResponse]=useState('');

  useEffect(() => {
    setChildrenData(charityData);
  }, [charityData]); 

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    console.log(imageUrl)
  };

  const handleBecomeWizard = (child) => {
    setSelectedChild(child);
    setShowWizardPopup(true);
  };

  const handleSubmitWizardForm = async (wizardData) => {
    console.log(`Чарівник обрав дитину з ID: ${selectedChild.id}`, wizardData);
  
    try {  
        const updateResponse = await fetch(`https://charity.team-911.com.ua/api2/auth.php?id=${selectedChild.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(wizardData),
        });
      
        if (!updateResponse.ok) {
          throw new Error(`HTTP error! status: ${updateResponse.status}`);
        }
      
        // Оновлення відбулося успішно
        const updateData = await updateResponse.json();
        setServerResponse(updateData.message);
        onSubmit();
      
    } catch (error) {
      const errorMessage = `Помилка при відправці даних на сервер. ${error.message}`;
      setServerResponse(errorMessage);
      console.error('Помилка при відправці даних на сервер:', error);
    }
  };
  
  const onAuthPopupClose = () => {
    setServerResponse('');
    setShowWizardPopup(false);
  }

  return (
    <div className='childGallery'>
      {childrenData.map((child) => (
       <ChildForm key={child.id} child={child} handleBecomeWizard={handleBecomeWizard} handleImageClick={handleImageClick}/>
      ))}
      {selectedImage != null && (
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

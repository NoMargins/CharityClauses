import React from "react";

const ChildForm = ({ child, handleBecomeWizard, handleImageClick }) => {
    const { id, letterUrl, name, age, wish, orphanage, wizard } = child;

    // Видалення пробілу в кінці name
    const trimmedName = name.trim();

    return (
        <div className='childCard' key={id}>
            <img
                src={letterUrl}
                alt={`Лист до Миколая від ${trimmedName}`}
                className={wizard !== null ? 'img-sepia' : ''}
                onClick={() => handleImageClick(letterUrl)}
                loading='lazy'
            />
            <div className='childInfo'>
                <h2>{trimmedName}, {age} р.</h2>
                <p><b>Заклад:</b> {orphanage}</p>
                <p><b>Бажання:</b> {wish}</p>
                {wizard !== null && <p><b>Виконує бажання:</b> {wizard}</p>}
                {wizard === null && (
                    <button onClick={() => handleBecomeWizard(child)}>Стати чарівником 🪄</button>
                )}
            </div>
        </div>
    )
}

export default ChildForm;

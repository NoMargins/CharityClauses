import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './map.scss';

const Map = ({ childrenWithoutWizard, handleMarkerClick }) => {
  const orphanageCoordinates = {
    'Сквирський дитячий будинок «Надія» ': { top: '40%', left: '40%', shortName: 'Сквира' },
    'Вінницький обласний соціально-психологічний центр реабілітації дітей': { top: '46%', left: '40%', shortName: 'Вінниця' },
    'Центр соціально-психологічної реабілітації дітей с. Хмільниця': { top: '28%', left: '40%', shortName: 'Хмільниця' },
    'Черкаський обласний центр соціально-психологічної реабілітації дітей': { top: '34%', left: '40%', shortName: 'Черкаси' },
    'Кам\'янець-Подільська спеціальна школа Хмельницької обласної ради': { top: '52%', left: '40%', shortName: 'Кам\'янець-Подільський' },
  };

  return (
    <div className='map-whole'>
      {childrenWithoutWizard.map((orphanage, index) => {
        const coordinates = orphanageCoordinates[orphanage.orphanage];

        // Validate if coordinates are available
        if (!coordinates) {
          console.error(`Coordinates not found for orphanage: ${orphanage.orphanage}`);
          return null;
        }

        return (
          <div
            key={index}
            className='map-marker'
            style={{
              position: 'absolute',
              top: coordinates.top,
              left: coordinates.left,
            }}
            onClick={() => handleMarkerClick(orphanage.orphanage)}
          >
            <FaMapMarkerAlt size={20} color="red" />
            <span className="marker-label">{`${coordinates.shortName}, ${orphanage.childrenCount} мрії(й)`}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Map;

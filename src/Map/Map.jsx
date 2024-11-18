import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './map.scss';

const Map = ({ childrenWithoutWizard, handleMarkerClick }) => {
  const orphanageCoordinates = {
    'Сквирський Дитячий будинок «Надія»': { top: '52%', left: '52%', shortName: 'Сквира' },
    'Вінницький обласний соціально-психологічний центр реабілітації дітей': { top: '45%', left: '39%', shortName: 'Вінниця' },
    'Центр соціально-психологічної реабілітації дітей, с. Хмільниця': { top: '5%', left: '60%', shortName: 'Хмільниця' },
    'Черкаський обласний центр соціально-психологічної реабілітації дітей': { top: '36%', left: '48%', shortName: 'Черкаси' },
    'Кам\'янець-Подільська спеціальна школа Хмельницької Обласної Ради': { top: '40%', left: '33%', shortName: 'Кам\'янець-Подільський' },
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
            <span className="marker-label">{`${coordinates.shortName}, ${orphanage.childrenCount} бажань`}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Map;

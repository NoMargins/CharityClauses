import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const OrphanageMap = () => {
  useEffect(() => {
    const map = L.map('map', {
        center: [48.3794, 31.1656], // Координати центру України
        zoom: 6, // Початковий зум
        maxBounds: [[52, 22], [44, 40]] // Обмеження переміщення карти
      });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const orphanages = [
        { name: 'Знам\'янська школа-інтернат', coords: [48.7071, 32.6647] },
        { name: 'Вінницький центр реабілітації', coords: [49.2331, 28.4682] },
        { name: 'Черкаський центр реабілітації', coords: [49.4444, 32.0597] }
    ];

    orphanages.forEach(orphanage => {
      L.marker(orphanage.coords).addTo(map)
        .bindPopup(`${orphanage.name}`)
        .on('click', () => {
          // Завантажте та показуйте інформацію про дітей
        });
    });
  }, []);

  return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

export default OrphanageMap;

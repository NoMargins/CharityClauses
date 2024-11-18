import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import ChildGallery from './ChildGallery/ChildGallery';
import Instruction from './Instruction/Instruction';
import Map from './Map/Map';
import Banner from './Banner/Banner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import Description from './Description/Description';
import InProgress from './InProgress/InProgress';
import Spinner from './Spinner/Spinner';

const App = ({ url }) => {
  const [charityData, setCharityData] = useState([]);
  const [isInProgress, setIsInProgress] = useState(false);
  const [childWithoutWizard, setChildWithoutWizard] = useState([]);
  const [activeTab, setActiveTab] = useState('all-wishes');
  const [childrenWithWizard, setChildrenWithWizard] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);

  const buttonStyle = (tabId) => ({
    backgroundColor: activeTab === tabId ? '#95011C' : 'transparent',
    color: activeTab === tabId ? 'white' : 'black',
    width: activeTab === tabId ? '55%' : '45%',
    textAlign: 'center',
    // borderRadius: '24px',
    marginTop: '12px',
    border: '1px solid #95011C',
  });
  
  // Updated buttonStyle using classnames
  const updatedButtonStyle = (tabId) => classNames({
    'form-control': true,
    'mb-3': true,
    'is-invalid': activeTab !== tabId,
    'is-valid': activeTab === tabId,
    // Add more classes as needed based on your logic
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
        setIsWaiting(true);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (!response.headers.get("content-type")?.includes("application/json")) {
          throw new TypeError("Отримано не JSON відповідь", response.headers.get("content-type"));
        }
  
        const json = await response.json();
        const sortedData = [...json].sort((a, b) => {
          if (a.wizard === null && b.wizard !== null) return -1;
          if (a.wizard !== null && b.wizard === null) return 1;
          return 0;
        });
  
        const uniqueOrphanages = [...new Set(json.map(child => child.orphanage))];
        const childrenWithoutWizard = uniqueOrphanages.map(orphanage => {
          return {
            orphanage,
            childrenCount: json.filter(child => child.orphanage === orphanage && child.wizard === null).length
          };
        });
        const childrenWithWizard = json.filter(child => child.wizard !== null);
  
        setIsWaiting(false);
        setCharityData(sortedData);
        setChildWithoutWizard(childrenWithoutWizard);
        setChildrenWithWizard(childrenWithWizard);
        setCurrentList(sortedData);
        console.log(childrenWithoutWizard);
      } catch (error) {
        console.error(`Fetching error: ${error}`);
      }
    };
  
    // Initial fetch
    fetchData();
  
    // Fetch data every minute
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);
  
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [url]);

  const updateData = async () => {
    try {
      const response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.headers.get("content-type")?.includes("application/json")) {
        throw new TypeError("Отримано не JSON відповідь", response.headers.get("content-type"));
      }

      const json = await response.json();
      const sortedData = [...json].sort((a, b) => {
        if (a.wizard === null && b.wizard !== null) return -1;
        if (a.wizard !== null && b.wizard === null) return 1;
        return 0;
      });

      const uniqueOrphanages = [...new Set(json.map(child => child.orphanage))];
      const childrenWithoutWizard = uniqueOrphanages.map(orphanage => {
        return {
          orphanage,
          childrenCount: json.filter(child => child.orphanage === orphanage && child.wizard === null).length
        };
      });
      const childrenWithWizard = json.filter(child => child.wizard !== null);

      setIsWaiting(false);
      setCharityData(sortedData);
      setChildWithoutWizard(childrenWithoutWizard);
      setChildrenWithWizard(childrenWithWizard);
      setCurrentList(sortedData);
    } catch (error) {
      console.error(`Fetching error: ${error}`);
    }
  };
  

  const handleWishesStatus = (type) => {
    if (type === 'all-wishes') {
      setIsInProgress(false);
      setActiveTab('all-wishes')
    }
    if (type === 'in-progress') {
      setIsInProgress(true);
      setActiveTab('in-progress')
    }
  };

  // Функція для відображення даних дітей з конкретного дитбудинку
  const handleMarkerClick = (orphanageName) => {
    const filteredData = charityData.filter(data => data.orphanage === orphanageName);
    setCurrentList(filteredData);
  }

  return (
    <>
        <Banner />
    <Description />
      <section className='instructions' style={{ display: 'flex' }}>
        <Instruction />
        {currentList.length > 0 && <Map childrenWithoutWizard={childWithoutWizard} handleMarkerClick={handleMarkerClick} />}
      </section>
      <div className="App" style={{ textAlign: 'center' }}>
        <div className='divided-wishes sticky-container' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div
            className='updatedButtonStyle'
            id='all-wishes'
            onClick={() => handleWishesStatus('all-wishes')}
            style={buttonStyle('all-wishes')}
          >
            <h3>Галерея всіх мрій</h3>
          </div>
          <div
            className='updatedButtonStyle'
            id='in-progress'
            onClick={() => handleWishesStatus('in-progress')}
            style={buttonStyle('in-progress')}
          >
            <h3>Мрії в роботі</h3>
          </div>
        </div>
        {isWaiting && <Spinner />}
        {!isInProgress && <ChildGallery charityData={currentList} onSubmit={updateData} />}
        {isInProgress && <InProgress charityData={childrenWithWizard} />}
      </div>
    </>
  );
};

export default App;

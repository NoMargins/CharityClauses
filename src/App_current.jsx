import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import ChildGallery from './ChildGallery/ChildGallery_OLD';
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
  const [activeTab, setActiveTab] = useState('in-progress');
  const [childrenWithWizard, setChildrenWithWizard] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);

  const buttonStyle = (tabId) => ({
    backgroundColor: activeTab === tabId ? '#95011C' : 'transparent',
    color: activeTab === tabId ? 'white' : 'black',
    width: '100%',
    textAlign: 'center',
    marginTop: '12px',
    border: '1px solid #95011C',
  });

  const fetchData = async () => {
    setIsWaiting(true);
    try {
      const response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.headers.get('content-type')?.includes('application/json')) {
        throw new TypeError(`Отримано не JSON відповідь: ${response.headers.get('content-type')}`);
      }

      const json = await response.json();
      const sortedData = [...json].sort((a, b) => {
        if (a.wizard === null && b.wizard !== null) return -1;
        if (a.wizard !== null && b.wizard === null) return 1;
        return 0;
      });

      const uniqueOrphanages = [...new Set(json.map((child) => child.orphanage))];
      const childrenWithoutWizard = uniqueOrphanages.map((orphanage) => {
        return {
          orphanage,
          childrenCount: json.filter(
            (child) => child.orphanage === orphanage && child.wizard === null
          ).length,
        };
      });

      const childrenWithWizard = json
        .filter((child) => child.wizard !== null)
        .sort((a, b) => {
          if (a.TTN && !b.TTN) return -1;
          if (!a.TTN && b.TTN) return 1;
          return 0;
        });

      setCharityData(sortedData);
      setChildWithoutWizard(childrenWithoutWizard);
      setChildrenWithWizard(childrenWithWizard);
      setCurrentList(sortedData);
    } catch (error) {
      console.error(`Fetching error: ${error}`);
    } finally {
      setIsWaiting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <>
      <Banner />
      <Description />
      {isWaiting ? (
        <Spinner />
      ) : (
        <>
          <section
            className="instructions"
            style={{
              display: 'flex',
              width: '100vw',
              backgroundColor: '#a7ccec47',
              paddingBottom: '20px',
            }}
          >
            <Instruction />
            {/* <Map childrenWithoutWizard={childWithoutWizard} handleMarkerClick={handleMarkerClick} /> */}
          </section>
          <div className="App" style={{ textAlign: 'center' }}>
            <div
              className="divided-wishes sticky-container"
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <div
                className="updatedButtonStyle is-valid"
                id="in-progress"
                style={buttonStyle('in-progress')}
              >
                <h3>Стати Миколайчиком</h3>
              </div>
            </div>
            <InProgress charityData={childrenWithWizard} />
          </div>
        </>
      )}
    </>
  );
};

export default App;

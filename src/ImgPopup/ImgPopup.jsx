import React from "react";
import './imgPopup.scss';

const ImgPopup = ({ imgUrl, setSelectedImage }) => {
    return (
        <div className="overlay modal show" tabIndex="-1" style={{ display: 'block' }}
        onClick={(e) => {
            if (e.target.className.includes('overlay')) {
                setSelectedImage(null);
            }
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <img src={imgUrl} alt='Велике зображення' />
          <div className='together' style={{ marginTop: '12px', display: 'flex', justifyContent: "space-between"}}>
            <a href={imgUrl} download>
              <span className='material-symbols-outlined' style={{ fontSize: '2em' }}>
                download
              </span>
            </a>
            <span
              className='material-symbols-outlined'
              onClick={() => setSelectedImage(null)}
              style={{ color: 'red', fontSize: '2em', cursor: 'pointer' }}
            >
              close
            </span>
            </div>
          </div>
      </div>
      </div>
    )
}

export default ImgPopup;

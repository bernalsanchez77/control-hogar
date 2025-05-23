import React from 'react';
import './channels.css';

function Channels({ devicesState, triggerControlParent }) {
  let selectedImg = '/imgs/channels/' + devicesState.cableSala.selected + '.png';
  const triggerControl = (value) => {
    navigator.vibrate([100]);
    if (value === 'play') {
      if (devicesState.rokuSala.state === 'play') {
        triggerControlParent([devicesState.rokuSala.id], ['state'], ['pause'], true);
      } else {
        triggerControlParent([devicesState.rokuSala.id], ['state'], ['play'], true);
      }
    } else {
      triggerControlParent([devicesState.rokuSala.id], ['command'], [value], false);
    }
  }

  return (
    <div className='controls-channels'>
      <div className='controls-channels-row'>
        <div className='controls-channels-element'>
            <img
                className='controls-channels-img'
                src={selectedImg}
                alt="icono">
            </img>
        </div>
      </div>
    </div>
  )
}

export default Channels;

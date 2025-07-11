import React from 'react';
import './ventiladorSala.css';

function VentiladorSala({devicesState, triggerDeviceParent}) {
  const triggerDevice = (device) => {
    if (devicesState[device].state === 'on') {
      triggerDeviceParent([device], ['state'], ['off']);
    }
    if (devicesState[device].state === 'off') {
      triggerDeviceParent([device], ['state'], ['on']);
    }
  }

  return (
    <div className="ventiladorSala">
      <div>
        <button
          className={`devices-button ${devicesState.ventiladorSala.state === 'on' ? "devices-button--on" : "devices-button-off"}`}
          onTouchStart={() => triggerDevice(devicesState.ventiladorSala.id)}>
          <img
            className='devices-button-img'
            src={devicesState.ventiladorSala.img}
            alt="icono">
          </img>
          <div className='devices-led'></div>
        </button>
      </div>
    </div>
  );
}

export default VentiladorSala;

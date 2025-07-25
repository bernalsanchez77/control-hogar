import React, {useEffect, useState, useCallback, useMemo} from 'react';
import './lamparasAbajo.css';

function LamparasAbajo({devicesState, triggerControlParent}) {
  const [state, setState] = useState('off');
  const lamparasOn = [
    devicesState.lamparaComedor.id,
    devicesState.lamparaSala.id,
    devicesState.chimeneaSala.id
  ];
  const lamparasOff = useMemo(() => [
    devicesState.lamparaComedor.id,
    devicesState.lamparaSala.id,
    devicesState.lamparaTurca.id,
    devicesState.lamparaRotatoria.id,
    devicesState.chimeneaSala.id,
  ], [devicesState]);
  const setLamparasState = useCallback(async () => {
    let lamps = 0;
    lamparasOff.forEach(lampara => {
      if (devicesState[lampara].state === 'on') {
        lamps++;
      }
    });
    if (lamps > 1) {
      setState('on');
    } else {
      setState('off');
    }
  }, [devicesState, lamparasOff]);
  const triggerDevice = () => {
    let device = [];
    if (state === 'on') {
      lamparasOff.forEach(lampara => {
        if (devicesState[lampara].state === 'on') {
          device.push(devicesState[lampara].id);
        }
      });
      triggerControlParent({ifttt: [[{device, key: 'state', value: 'off'}]]});
      setState('off');
    } else {
      lamparasOn.forEach(lampara => {
        if (devicesState[lampara].state === 'off') {
          device.push(devicesState[lampara].id);
        }
      });
      triggerControlParent({ifttt: [[{device, key: 'state', value: 'on'}]]});
      setState('on');
    }
  }

  useEffect(() => {
    setLamparasState();
  }, [setLamparasState]);

  return (
    <div className="lamparasAbajo">
      <div>
        <button
          className={`devices-button ${state === 'on' ? "devices-button--on" : "devices-button-off"}`}
          onTouchStart={() => triggerDevice()}>
          <img
            className='devices-button-img'
            src='/imgs/devices/lamparasabajo.png'
            alt="icono">
          </img>
          <div className='devices-led'></div>
        </button>
      </div>
    </div>
  );
}

export default LamparasAbajo;

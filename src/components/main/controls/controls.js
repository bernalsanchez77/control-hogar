import React from 'react';
import Top from './top/top';
import Arrows from './arrows/arrows';
import Levels from './levels/levels';
import Toolbar from './toolbar/toolbar';
import Channels from './channels/channels';
import Apps from './apps/apps';
import './controls.css';

function Controls({credential, ownerCredential, inRange, devicesState, loadingDevices, screenSelected, channelCategory, changeControlParent, changeChannelCategoryParent}) {
  const triggerControl = (control, key, value, save) => {
    if (inRange || (credential === ownerCredential)) {
      if (!loadingDevices.current) {
        changeControlParent(control, key, value, save);
      } else {
        setTimeout(() => {
            triggerControl(control, key, value, save);
        }, 1000);
      }
    }
  }
  const triggerChannelCategory = (category) => {
    changeChannelCategoryParent(category);
  }

  return (
    <div>
      <div className='controls'>
        <Top
          devicesState={devicesState}
          screenSelected={screenSelected}
          triggerControlParent={triggerControl}>
        </Top>
        <Arrows
          devicesState={devicesState}
          screenSelected={screenSelected}
          triggerControlParent={triggerControl}>
        </Arrows>
        <Levels
          devicesState={devicesState}
          screenSelected={screenSelected}
          credential={credential}
          channelCategory={channelCategory}
          triggerControlParent={triggerControl}
          triggerChannelCategoryParent={triggerChannelCategory}>
        </Levels>
        {devicesState.hdmiSala.state === 'roku' &&
        <Toolbar
          devicesState={devicesState}
          triggerControlParent={triggerControl}>
        </Toolbar>
        }
        {devicesState.hdmiSala.state === 'roku' &&  
        <Apps
          devicesState={devicesState}
          triggerControlParent={triggerControl}>
        </Apps>
        }
        <div style={{ display: devicesState.hdmiSala.state === 'cable' ? 'block' : 'none' }}>
          <Channels
            devicesState={devicesState}
            credential={credential}
            channelCategory={channelCategory}
            triggerControlParent={triggerControl}
            triggerCategoryParent={triggerChannelCategory}>
          </Channels>
        </div>
      </div>
    </div>
  )
}

export default Controls;

import React from 'react';
import TopBar from '../components/TopBar';
import StatusBar from '../components/StatusBar';
import ZoneCard from '../components/ZoneCard';
import LetterKey from '../components/LetterKey';
import ActionButton from '../components/ActionButton';

export default function EyraApp() {
  const renderLetters = (lettersStr, dwellLetterConfig) => {
    return lettersStr.split('').map((char) => (
      <LetterKey 
        key={char} 
        letter={char} 
        isDwelling={char === dwellLetterConfig} 
      />
    ));
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-bgAlternate font-sans text-textPrimary">
      {/* Top Bar */}
      <TopBar />

      {/* Keyboard Area - Flex 1 allows it to fill available space */}
      <div className="flex-1 p-6 md:p-8 flex items-stretch justify-center">
        
        {/* CSS Grid for the 5 zones */}
        <div 
          className="w-full max-w-7xl h-full grid gap-8 md:gap-12"
          style={{ 
            gridTemplateColumns: 'minmax(300px, 1fr) auto minmax(300px, 1fr)', 
            gridTemplateRows: '1fr auto 1fr' 
          }}
        >
          {/* Top-Left: Active state */}
          <div className="col-start-1 row-start-1">
            <ZoneCard label="A – F" isActive={true}>
              <div className="grid grid-cols-3 gap-3 md:gap-5 w-full">
                {renderLetters('ABC')}
                <LetterKey letter="D" isDwelling={true} />
                {renderLetters('EF')}
              </div>
            </ZoneCard>
          </div>

          {/* Top-Right */}
          <div className="col-start-3 row-start-1">
            <ZoneCard label="G – M">
              <div className="grid grid-cols-4 gap-3 md:gap-5 w-full justify-center">
                {renderLetters('GHIJ')}
                <div className="col-span-4 flex gap-3 md:gap-5 justify-center">
                  {renderLetters('KLM')}
                </div>
              </div>
            </ZoneCard>
          </div>

          {/* Center Actions */}
          <div className="col-start-2 row-start-2 flex flex-col justify-center items-center space-y-4 md:space-y-6 px-4">
            <ActionButton label="SPACE" type="space" />
            <ActionButton label="BACKSPACE" type="backspace" />
            <ActionButton label="SPEAK" type="speak" />
          </div>

          {/* Bottom-Left */}
          <div className="col-start-1 row-start-3">
            <ZoneCard label="N – T">
              <div className="grid grid-cols-4 gap-3 md:gap-5 w-full justify-center">
                {renderLetters('NOPQ')}
                <div className="col-span-4 flex gap-3 md:gap-5 justify-center">
                  {renderLetters('RST')}
                </div>
              </div>
            </ZoneCard>
          </div>

          {/* Bottom-Right */}
          <div className="col-start-3 row-start-3">
            <ZoneCard label="U – Z">
              <div className="grid grid-cols-3 gap-3 md:gap-5 w-full">
                {renderLetters('UVW')}
                {renderLetters('XYZ')}
              </div>
            </ZoneCard>
          </div>

        </div>
      </div>

      {/* Status Bar */}
      <StatusBar />
    </div>
  );
}

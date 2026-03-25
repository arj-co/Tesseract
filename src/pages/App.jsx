import React, { useState, useEffect, useRef, useCallback } from 'react';
import TopBar from '../components/TopBar';
import StatusBar from '../components/StatusBar';
import ZoneCard from '../components/ZoneCard';
import LetterKey from '../components/LetterKey';
import ActionButton from '../components/ActionButton';
import { useDwell } from '../hooks/useDwell';
import { expandToSentence } from '../services/gemini';

function playClickSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); 
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.08);
  } catch (e) {}
}

function speakSentence(text) {
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')
  );
  if (preferred) utterance.voice = preferred;
  
  window.speechSynthesis.speak(utterance);
}

function repositionWebGazerVideo() {
  // Show the video feed manually after hiding via WebGazer API
  const video = document.getElementById('webgazerVideoFeed');
  const canvas = document.getElementById('webgazerFaceFeedbackBox');
  const predictionCanvas = document.getElementById('webgazerVideoCanvas');
  const faceOverlayCanvas = document.getElementById('webgazerFaceOverlay');

  if (video) {
    Object.assign(video.style, {
      display:      'block',
      position:     'fixed',
      bottom:       '56px',       // above status bar
      left:         '16px',
      width:        '160px',
      height:       '120px',
      borderRadius: '12px',
      border:       '1px solid #E5E7EB',
      zIndex:       '9999',
      objectFit:    'cover',
      transform:    'scaleX(-1)', // mirror so user sees natural reflection
    });
  }

  // Hide everything else WebGazer injects
  [canvas, predictionCanvas, faceOverlayCanvas].forEach(el => {
    if (el) el.style.display = 'none';
  });
}

export default function App() {
  // Application logic state
  const [activeZone, setActiveZone] = useState(null);
  const [wordBuffer, setWordBuffer] = useState('');
  const [predictedSentence, setPredictedSentence] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // App system state
  const [camStatus, setCamStatus] = useState('idle');
  const [webcamReady, setWebcamReady] = useState(false);
  const [showChromeWarning, setShowChromeWarning] = useState(false);
  const [progressMap, setProgressMap] = useState({});
  
  // Refs
  const gazeRef = useRef({ x: null, y: null });
  const llmTimerRef = useRef(null);
  const webcamReadyRef = useRef(false);

  useEffect(() => {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (!isChrome) {
      console.warn('Eyra works best in Google Chrome.');
      setShowChromeWarning(true);
    }
  }, []);

  async function initWebGazer() {
    const wg = window.webgazer;

    if (!wg) {
      console.error('WebGazer not found — check index.html script tag');
      return;
    }

    try {
      await wg
        .setRegression('ridge')
        .setTracker('TFFacemesh')
        .showVideoPreview(false)
        .showPredictionPoints(false)
        .showFaceOverlay(false)
        .showFaceFeedbackBox(false)
        .setGazeListener((data) => {
          if (data && data.x != null && data.y != null) {
            gazeRef.current = { x: data.x, y: data.y };
            if (!webcamReadyRef.current) {
              webcamReadyRef.current = true;
              setWebcamReady(true);
            }
          }
        })
        .begin();

      // After begin(), manually show and position the video feed
      setTimeout(() => {
        repositionWebGazerVideo();
      }, 1500);

    } catch (err) {
      console.error('WebGazer init failed:', err);
    }
  }

  async function requestCamPermission() {
    setCamStatus('requesting');
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCamStatus('granted');
      // Now init webgazer
      await initWebGazer();
    } catch (err) {
      setCamStatus('denied');
      console.error('Camera denied:', err);
    }
  }

  useEffect(() => {
    return () => {
      if (window.webgazer && camStatus === 'granted') {
        try {
          window.webgazer.end();
        } catch (e) {}
      }
    };
  }, [camStatus]);

  const triggerLLM = (buffer) => {
    clearTimeout(llmTimerRef.current);
    if (buffer.length >= 2) {
      llmTimerRef.current = setTimeout(async () => {
        setIsLoading(true);
        const sentence = await expandToSentence(buffer);
        setPredictedSentence(sentence);
        setIsLoading(false);
      }, 2000);
    } else {
      setPredictedSentence('');
    }
  };

  const handleDwell = useCallback((hitId) => {
    if (!hitId) return;

    if (hitId.startsWith('zone-')) {
      const zone = hitId.split('-')[1];
      setActiveZone(zone);
      playClickSound();
    } else if (hitId.startsWith('letter-')) {
      const letter = hitId.split('-')[1];
      setWordBuffer(prev => {
        const next = prev + letter;
        triggerLLM(next);
        return next;
      });
      setActiveZone(null);
      playClickSound();
    } else if (hitId === 'action-SPACE') {
      setWordBuffer(prev => {
        const next = prev + ' ';
        triggerLLM(next);
        return next;
      });
      playClickSound();
    } else if (hitId === 'action-BACKSPACE') {
      setWordBuffer(prev => {
        const next = prev.slice(0, -1);
        if (next.length === 0) setPredictedSentence('');
        else triggerLLM(next);
        return next;
      });
      playClickSound();
    } else if (hitId === 'action-SPEAK') {
      setPredictedSentence((currentPred) => {
         setWordBuffer((currentBuf) => {
            const textToSpeak = currentPred || currentBuf;
            if (textToSpeak) {
               speakSentence(textToSpeak);
            }
            return currentBuf;
         });
         return currentPred;
      });
      playClickSound();
    }
  }, []);

  const handleProgress = useCallback((hitId, progress) => {
    setProgressMap(prev => {
      if (!hitId) return {}; // clear
      
      const current = prev[hitId] || 0;
      if (progress === 0 && !prev[hitId]) return prev;
      if (progress === 0 || Math.abs(current - progress) > 2) {
        return { ...prev, [hitId]: progress };
      }
      return prev;
    });
  }, []);

  useDwell({ gazeRef, dwellTime: 1500, onDwell: handleDwell, onProgress: handleProgress });

  if (camStatus === 'idle' || camStatus === 'requesting') {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-bgAlternate font-sans p-6 text-center text-textPrimary">
        <div className="bg-white p-12 max-w-lg w-full rounded-2xl shadow-subtle border border-gray-100 flex flex-col items-center">
          <svg className="w-16 h-16 text-medicalBlue mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <h2 className="font-serif text-3xl font-bold mb-4 text-deepNavy">Eyra needs your camera</h2>
          <p className="text-lg text-textMuted mb-8 leading-relaxed">
             Your webcam is used only for gaze tracking. Nothing is recorded or transmitted.
          </p>
          <button 
            onClick={requestCamPermission}
            disabled={camStatus === 'requesting'}
            className="w-full bg-medicalBlue text-white py-4 rounded-xl font-bold hover:bg-deepNavy transition-colors text-lg"
          >
            {camStatus === 'requesting' ? 'Requesting...' : 'Enable Camera'}
          </button>
        </div>
      </div>
    );
  }

  if (camStatus === 'denied') {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-bgAlternate font-sans p-6 text-center text-textPrimary">
        <h2 className="font-serif text-3xl font-bold mb-4 text-red-600">Camera access denied</h2>
        <p className="text-lg text-textMuted max-w-md mx-auto">
          Please allow camera access in your browser settings and refresh the page.
        </p>
      </div>
    );
  }

  const renderLetters = (lettersStr, zoneCode) => {
    return lettersStr.split('').map((char) => {
      const disabled = activeZone !== zoneCode;
      const targetId = `letter-${char}`;
      return (
        <LetterKey 
          key={char} 
          id={targetId}
          letter={char} 
          disabled={disabled}
          isDwelling={progressMap[targetId] > 0} 
          dwellProgress={progressMap[targetId] || 0}
        />
      );
    });
  };

  const getZoneProps = (code) => {
    const id = `zone-${code}`;
    return {
      id,
      isZoneActive: activeZone === code,
      isOtherZoneActive: activeZone !== null && activeZone !== code
    };
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-bgAlternate font-sans text-textPrimary">
      {showChromeWarning && (
        <div className="bg-yellow-100 border-b border-yellow-200 text-yellow-800 px-4 py-2 flex items-center justify-between text-sm shrink-0 shadow-sm z-[99999]" data-dwell="chrome-warning">
          <span className="font-medium max-w-3xl">Eyra works best in Google Chrome. Other browsers may have reduced gaze accuracy.</span>
          <button onClick={() => setShowChromeWarning(false)} className="opacity-70 hover:opacity-100 font-bold ml-4 p-2 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      <TopBar wordBuffer={wordBuffer} predictedSentence={predictedSentence} isLoading={isLoading} />

      <div className="flex-1 p-6 md:p-8 flex items-stretch justify-center">
        <div 
          className="w-full max-w-7xl h-full grid gap-8 md:gap-12"
          style={{ 
            gridTemplateColumns: '1fr 120px 1fr', 
            gridTemplateRows: '1fr 120px 1fr' 
          }}
        >
          {/* Top-Left */}
          <div className="col-start-1 row-start-1">
            <ZoneCard label="A – F" {...getZoneProps('TL')}>
              <div className="grid grid-cols-3 gap-3 md:gap-5 w-full">
                {renderLetters('ABCDEF', 'TL')}
              </div>
            </ZoneCard>
          </div>

          {/* Top-Right */}
          <div className="col-start-3 row-start-1">
            <ZoneCard label="G – M" {...getZoneProps('TR')}>
              <div className="grid grid-cols-4 gap-3 md:gap-5 w-full justify-center">
                {renderLetters('GHIJ', 'TR')}
                <div className="col-span-4 flex gap-3 md:gap-5 justify-center">
                  {renderLetters('KLM', 'TR')}
                </div>
              </div>
            </ZoneCard>
          </div>

          {/* Center Actions */}
          <div className="col-start-2 row-start-2 flex flex-col justify-center items-center space-y-4 md:space-y-6">
            <ActionButton 
              id="action-SPACE" 
              label="SPACE" 
              type="space" 
              isDwelling={progressMap['action-SPACE'] > 0} 
              dwellProgress={progressMap['action-SPACE'] || 0} 
            />
            <ActionButton 
              id="action-BACKSPACE" 
              label="BACKSPACE" 
              type="backspace" 
              isDwelling={progressMap['action-BACKSPACE'] > 0} 
              dwellProgress={progressMap['action-BACKSPACE'] || 0} 
            />
            <ActionButton 
              id="action-SPEAK" 
              label="SPEAK" 
              type="speak" 
              isDwelling={progressMap['action-SPEAK'] > 0} 
              dwellProgress={progressMap['action-SPEAK'] || 0} 
            />
          </div>

          {/* Bottom-Left */}
          <div className="col-start-1 row-start-3">
            <ZoneCard label="N – T" {...getZoneProps('BL')}>
              <div className="grid grid-cols-4 gap-3 md:gap-5 w-full justify-center">
                {renderLetters('NOPQ', 'BL')}
                <div className="col-span-4 flex gap-3 md:gap-5 justify-center">
                  {renderLetters('RST', 'BL')}
                </div>
              </div>
            </ZoneCard>
          </div>

          {/* Bottom-Right */}
          <div className="col-start-3 row-start-3">
            <ZoneCard label="U – Z" {...getZoneProps('BR')}>
              <div className="grid grid-cols-3 gap-3 md:gap-5 w-full">
                {renderLetters('UVWXYZ', 'BR')}
              </div>
            </ZoneCard>
          </div>
        </div>
      </div>

      <StatusBar webcamReady={webcamReady} />
    </div>
  );
}

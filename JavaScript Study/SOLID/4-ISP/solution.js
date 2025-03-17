// ISP를 준수하도록 리팩토링된 미디어 플레이어 컴포넌트들

import React, { useState, useRef, useEffect } from 'react';
import './MediaPlayer.css';

// 1. 미디어 재생 관련 공통 로직을 담당하는 커스텀 훅
const useMediaPlayer = (src, {
  autoPlay = false,
  loop = false,
  muted = false,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onVolumeChange
} = {}) => {
  const mediaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    
    const handlePlay = () => {
      setIsPlaying(true);
      onPlay && onPlay();
    };
    
    const handlePause = () => {
      setIsPlaying(false);
      onPause && onPause();
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(media.currentTime);
      onTimeUpdate && onTimeUpdate(media.currentTime);     
    };
    
    const handleLoadedMetadata = () => {
      setDuration(media.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      onEnded && onEnded();
    };
    
    const handleVolumeChange = () => {
      setVolume(media.volume);
      onVolumeChange && onVolumeChange(media.volume);
    };
    
    // 이벤트 리스너 추가
    media.addEventListener('play', handlePlay);
    media.addEventListener('pause', handlePause);
    media.addEventListener('timeupdate', handleTimeUpdate);
    media.addEventListener('loadedmetadata', handleLoadedMetadata);
    media.addEventListener('ended', handleEnded);
    media.addEventListener('volumechange', handleVolumeChange);
    
    // 클린업 함수
    return () => {
      media.removeEventListener('play', handlePlay);
      media.removeEventListener('pause', handlePause);
      media.removeEventListener('timeupdate', handleTimeUpdate);
      media.removeEventListener('loadedmetadata', handleLoadedMetadata);
      media.removeEventListener('ended', handleEnded);
      media.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [onPlay, onPause, onTimeUpdate, onEnded, onVolumeChange]);

  // 재생/일시정지 토글
  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play().catch(err => console.error('재생 오류:', err));
      }
    }
  };

  // 볼륨 조절
  const changeVolume = (newVolume) => {
    if (mediaRef.current) {
      mediaRef.current.volume = newVolume;
    }
  };
  
  // 시간 조절
  const seekTo = (time) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = time;
    }
  };

  // 미디어 소스 변경
  const updateSrc = (newSrc) => {
    if (mediaRef.current) {
      mediaRef.current.src = newSrc;
      mediaRef.current.load();
      if (isPlaying) {
        mediaRef.current.play().catch(err => console.error('재생 오류:', err));
      }
    }
  };

  return {
    mediaRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    changeVolume,
    seekTo,
    updateSrc
  };
};

// 2. 기본 컨트롤 컴포넌트 - 미디어 타입과 관계없이 공통된 기본 컨트롤 제공
const MediaControls = ({ 
  isPlaying, 
  currentTime, 
  duration, 
  volume,
  togglePlay, 
  seekTo, 
  changeVolume,
  fullscreenEnabled,
  toggleFullscreen,
  theme = 'dark'
}) => {
  // 시간 포맷팅 유틸리티 함수
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className={`media-controls ${theme}`}>
      <button onClick={togglePlay}>
        {isPlaying ? '일시정지' : '재생'}
      </button>
      
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e) => seekTo(Number(e.target.value))}
      />
      
      <div className="time-display">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
      
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => changeVolume(Number(e.target.value))}
      />
      
      {fullscreenEnabled && toggleFullscreen && (
        <button onClick={toggleFullscreen}>전체화면</button>
      )}
    </div>
  );
};

// 3. 플레이리스트 전용 컴포넌트
const PlaylistComponent = ({ 
  playlist = [], 
  currentTrackIndex, 
  onTrackSelect 
}) => {
  if (!playlist || playlist.length === 0) return null;
  
  return (
    <div className="media-playlist">
      <h3>플레이리스트</h3>
      <ul>
        {playlist.map((item, index) => (
          <li
            key={index}
            className={index === currentTrackIndex ? 'active' : ''}
            onClick={() => onTrackSelect(index)}
          >
            {item.title || `트랙 ${index + 1}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

// 4. 다운로드 및 공유 기능 컴포넌트
const MediaActions = ({
  src,
  downloadEnabled,
  shareEnabled,
  title = 'Media'
}) => {
  if (!downloadEnabled && !shareEnabled) return null;
  
  const downloadMedia = () => {
    if (downloadEnabled && src) {
      const a = document.createElement('a');
      a.href = src;
      a.download = src.split('/').pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  
  const shareMedia = () => {
    if (shareEnabled && navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href
      }).catch(err => console.error('공유 오류:', err));
    }
  };
  
  return (
    <div className="media-actions">
      {downloadEnabled && (
        <button onClick={downloadMedia}>다운로드</button>
      )}
      
      {shareEnabled && (
        <button onClick={shareMedia}>공유</button>
      )}
    </div>
  );
};

// 5. 오디오 플레이어 컴포넌트 - 오디오 특화 기능만 포함
const AudioPlayer = ({ 
  src,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  showWaveform = false,
  backgroundColor = '#f0f0f0',
  waveColor = '#1e88e5',
  playlist = [],
  showPlaylist = false,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onVolumeChange,
  downloadEnabled = false,
  shareEnabled = false,
  theme = 'dark'
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentSrc = playlist.length > 0 ? playlist[currentTrackIndex].src : src;
  
  const {
    mediaRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    changeVolume,
    seekTo,
    updateSrc
  } = useMediaPlayer(currentSrc, {
    autoPlay,
    loop,
    muted,
    onPlay,
    onPause,
    onEnded: () => {
      onEnded && onEnded();
      // 플레이리스트가 있을 경우 다음 트랙 재생
      if (playlist.length > 0 && currentTrackIndex < playlist.length - 1) {
        setCurrentTrackIndex(prevIndex => prevIndex + 1);
      }
    },
    onTimeUpdate,
    onVolumeChange
  });
  
  // 플레이리스트 트랙 변경 시 소스 업데이트
  useEffect(() => {
    if (playlist.length > 0) {
      updateSrc(playlist[currentTrackIndex].src);
    }
  }, [currentTrackIndex, playlist]);
  
  // 오디오 파형 렌더링 컴포넌트 (필요한 경우에만)
  const WaveformVisualizer = () => {
    if (!showWaveform) return null;
    
    return (
      <div 
        className="waveform-container"
        style={{ backgroundColor, color: waveColor }}
      >
        {/* 파형 시각화 렌더링... */}
        <div className="waveform-placeholder">오디오 파형</div>
      </div>
    );
  };
  
  const handleTrackSelect = (index) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentTrackIndex(index);
    }
  };
  
  return (
    <div className={`audio-player ${theme}`}>
      <audio
        ref={mediaRef}
        src={currentSrc}
        autoPlay={autoPlay}
        controls={false}
        loop={loop}
        muted={muted}
      />
      
      {controls && (
        <MediaControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          togglePlay={togglePlay}
          seekTo={seekTo}
          changeVolume={changeVolume}
          theme={theme}
        />
      )}
      
      <WaveformVisualizer />
      
      {showPlaylist && (
        <PlaylistComponent
          playlist={playlist}
          currentTrackIndex={currentTrackIndex}
          onTrackSelect={handleTrackSelect}
        />
      )}
      
      <MediaActions
        src={currentSrc}
        downloadEnabled={downloadEnabled}
        shareEnabled={shareEnabled}
        title={playlist.length > 0 ? playlist[currentTrackIndex].title : 'Audio'}
      />
    </div>
  );
};

// 6. 비디오 플레이어 컴포넌트 - 비디오 특화 기능만 포함
const VideoPlayer = ({
  src,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  poster,
  width,
  height,
  fullscreenEnabled = true,
  subtitles = [],
  showSubtitles = false,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onVolumeChange,
  downloadEnabled = false,
  shareEnabled = false,
  theme = 'dark'
}) => {
  const {
    mediaRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    changeVolume,
    seekTo
  } = useMediaPlayer(src, {
    autoPlay,
    loop,
    muted,
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate,
    onVolumeChange
  });
  
  // 전체화면 토글
  const toggleFullscreen = () => {
    if (mediaRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        mediaRef.current.requestFullscreen();
      }
    }
  };
  
  // 자막 토글
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  
  const toggleSubtitles = () => {
    setSubtitlesEnabled(!subtitlesEnabled);
  };
  
  return (
    <div className={`video-player ${theme}`}>
      <video
        ref={mediaRef}
        src={src}
        autoPlay={autoPlay}
        controls={false}
        loop={loop}
        muted={muted}
        poster={poster}
        width={width}
        height={height}
        className="video-element"
      >
        {showSubtitles && subtitles.map((track, index) => (
          <track
            key={index}
            kind="subtitles"
            src={track.src}
            srcLang={track.language}
            label={track.label}
            default={index === 0 && subtitlesEnabled}
          />
        ))}
      </video>
      
      {controls && (
        <MediaControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          togglePlay={togglePlay}
          seekTo={seekTo}
          changeVolume={changeVolume}
          fullscreenEnabled={fullscreenEnabled}
          toggleFullscreen={toggleFullscreen}
          theme={theme}
        />
      )}
      
      {showSubtitles && subtitles.length > 0 && (
        <button 
          className="subtitles-toggle"
          onClick={toggleSubtitles}
        >
          {subtitlesEnabled ? '자막 끄기' : '자막 켜기'}
        </button>
      )}
      
      <MediaActions
        src={src}
        downloadEnabled={downloadEnabled}
        shareEnabled={shareEnabled}
        title="Video"
      />
    </div>
  );
};

// 7. 사용 예시
const MediaPlayerExample = () => {
  return (
    <div>
      <h2>비디오 플레이어</h2>
      <VideoPlayer
        src="https://example.com/video.mp4"
        poster="https://example.com/poster.jpg"
        width="640"
        height="360"
        fullscreenEnabled={true}
        showSubtitles={true}
        subtitles={[
          { src: '/subtitles/en.vtt', language: 'en', label: 'English' },
          { src: '/subtitles/ko.vtt', language: 'ko', label: '한국어' }
        ]}
        downloadEnabled={true}
      />
      
      <h2>오디오 플레이어</h2>
      <AudioPlayer
        src="https://example.com/audio.mp3"
        showWaveform={true}
        waveColor="#ff5722"
        playlist={[
          { src: 'https://example.com/track1.mp3', title: '트랙 1' },
          { src: 'https://example.com/track2.mp3', title: '트랙 2' }
        ]}
        showPlaylist={true}
        downloadEnabled={true}
      />
    </div>
  );
};

export { AudioPlayer, VideoPlayer, useMediaPlayer, MediaControls };

// ISP를 위반하는 미디어 플레이어 컴포넌트
import React, { useState, useRef, useEffect } from 'react';
import './MediaPlayer.css';

// 인터페이스 분리 원칙 위반:
// 1. 하나의 큰 컴포넌트가 오디오와 비디오 모두를 처리함
// 2. 각 타입에 불필요한 props가 많음
// 3. 사용하지 않는 기능이 있더라도 전체 컴포넌트를 로드해야 함

const MediaPlayer = ({
  // 공통 속성
  src,
  type, // 'audio' 또는 'video'
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  
  // 비디오 관련 속성 (오디오일 때는 사용 안 함)
  poster,
  width,
  height,
  fullscreenEnabled = true,
  
  // 오디오 관련 속성 (비디오일 때는 사용 안 함)
  showWaveform = false,
  backgroundColor = '#f0f0f0',
  waveColor = '#1e88e5',
  
  // 플레이리스트 관련 속성
  playlist = [],
  showPlaylist = false,
  
  // 미디어 이벤트 핸들러
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onVolumeChange,
  
  // 기타 옵션
  downloadEnabled = false,
  shareEnabled = false,
  analyticsEnabled = false,
  
  // 자막 관련 옵션
  subtitles = [],
  showSubtitles = false,
  
  // UI 커스터마이징
  customControls = null,
  theme = 'dark'
}) => {
  const mediaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // 컴포넌트 마운트 시 미디어 이벤트 리스너 설정
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
      
      // 플레이리스트가 있을 경우 다음 트랙 재생
      if (playlist.length > 0 && currentTrackIndex < playlist.length - 1) {
        setCurrentTrackIndex(prevIndex => prevIndex + 1);
      }
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
  }, [onPlay, onPause, onTimeUpdate, onEnded, onVolumeChange, playlist, currentTrackIndex]);

  // 플레이리스트가 변경되면 현재 트랙 업데이트
  useEffect(() => {
    if (playlist.length > 0) {
      updateCurrentMedia(playlist[currentTrackIndex].src);
    }
  }, [playlist, currentTrackIndex]);

  // 미디어 소스 업데이트
  const updateCurrentMedia = (newSrc) => {
    if (mediaRef.current) {
      mediaRef.current.src = newSrc;
      mediaRef.current.load();
      if (isPlaying) {
        mediaRef.current.play().catch(err => console.error('재생 오류:', err));
      }
    }
  };

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
  
  // 트랙 변경
  const changeTrack = (index) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentTrackIndex(index);
    }
  };
  
  // 자막 토글
  const toggleSubtitles = () => {
    // 비디오일 때만 자막 표시 로직...
    if (type === 'video' && mediaRef.current) {
      // 자막 표시/숨기기 로직...
      console.log('자막 토글');
    }
  };
  
  // 전체화면 토글
  const toggleFullscreen = () => {
    // 비디오일 때만 전체화면 로직...
    if (type === 'video' && mediaRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        mediaRef.current.requestFullscreen();
      }
    }
  };
  
  // 다운로드 기능
  const downloadMedia = () => {
    if (downloadEnabled) {
      const a = document.createElement('a');
      a.href = src;
      a.download = src.split('/').pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  
  // 공유 기능
  const shareMedia = () => {
    if (shareEnabled && navigator.share) {
      navigator.share({
        title: 'Shared Media',
        url: window.location.href
      }).catch(err => console.error('공유 오류:', err));
    }
  };
  
  // 애널리틱스 전송
  useEffect(() => {
    if (analyticsEnabled) {
      // 분석 데이터 전송 로직...
      console.log('미디어 이벤트 분석 데이터 전송');
    }
  }, [analyticsEnabled, isPlaying, currentTime]);

  // 오디오 파형 렌더링 (오디오일 때만)
  useEffect(() => {
    if (type === 'audio' && showWaveform) {
      // 오디오 파형 렌더링 로직...
      console.log('오디오 파형 렌더링');
    }
  }, [type, showWaveform]);

  // 커스텀 컨트롤 또는 기본 컨트롤 렌더링
  const renderControls = () => {
    if (customControls) {
      return customControls({
        isPlaying,
        currentTime,
        duration,
        volume,
        togglePlay,
        seekTo,
        changeVolume
      });
    }
    
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
        
        {type === 'video' && fullscreenEnabled && (
          <button onClick={toggleFullscreen}>전체화면</button>
        )}
        
        {downloadEnabled && (
          <button onClick={downloadMedia}>다운로드</button>
        )}
        
        {shareEnabled && (
          <button onClick={shareMedia}>공유</button>
        )}
        
        {type === 'video' && showSubtitles && subtitles.length > 0 && (
          <button onClick={toggleSubtitles}>자막</button>
        )}
      </div>
    );
  };
  
  // 플레이리스트 렌더링
  const renderPlaylist = () => {
    if (!showPlaylist || playlist.length === 0) return null;
    
    return (
      <div className="media-playlist">
        <h3>플레이리스트</h3>
        <ul>
          {playlist.map((item, index) => (
            <li
              key={index}
              className={index === currentTrackIndex ? 'active' : ''}
              onClick={() => changeTrack(index)}
            >
              {item.title || `트랙 ${index + 1}`}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  // 시간 포맷팅 유틸리티 함수
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  
  // 미디어 요소 렌더링
  const renderMedia = () => {
    const currentSrc = playlist.length > 0 ? playlist[currentTrackIndex].src : src;
    const mediaProps = {
      ref: mediaRef,
      src: currentSrc,
      autoPlay,
      controls: false, // 커스텀 컨트롤 사용
      loop,
      muted,
      className: `media-player-${type}`,
    };
    
    if (type === 'video') {
      return (
        <video
          {...mediaProps}
          poster={poster}
          width={width}
          height={height}
        >
          {showSubtitles && subtitles.map((track, index) => (
            <track
              key={index}
              kind="subtitles"
              src={track.src}
              srcLang={track.language}
              label={track.label}
            />
          ))}
        </video>
      );
    } else {
      return (
        <audio {...mediaProps} />
      );
    }
  };
  
  return (
    <div className={`media-player ${theme}`}>
      {renderMedia()}
      {controls && renderControls()}
      {renderPlaylist()}
      
      {/* 오디오 파형 렌더링 (오디오일 때만) */}
      {type === 'audio' && showWaveform && (
        <div 
          className="waveform-container"
          style={{ backgroundColor, color: waveColor }}
        >
          {/* 파형 시각화 렌더링... */}
          <div className="waveform-placeholder">오디오 파형</div>
        </div>
      )}
    </div>
  );
};

// 사용 예시 - 비디오 플레이어
const VideoPlayerExample = () => {
  return (
    <MediaPlayer
      type="video"
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
    />
  );
};

// 사용 예시 - 오디오 플레이어
const AudioPlayerExample = () => {
  return (
    <MediaPlayer
      type="audio"
      src="https://example.com/audio.mp3"
      showWaveform={true}
      waveColor="#ff5722"
      playlist={[
        { src: 'https://example.com/track1.mp3', title: '트랙 1' },
        { src: 'https://example.com/track2.mp3', title: '트랙 2' }
      ]}
      showPlaylist={true}
    />
  );
};

export default MediaPlayer;

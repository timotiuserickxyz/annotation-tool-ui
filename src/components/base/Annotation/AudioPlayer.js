import React, { useEffect, useRef, useState } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import RefreshIcon from '@material-ui/icons/Refresh';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import { jssPreset, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  audioPlayerContainer: {
    width: '80%',
    marginTop: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleContainer: {
    width: 'calc(100% - 21px)',
    height: '20px',
    float: 'left',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '12px',
    overflow: 'hidden',
    border: 'solid 0.5px Black',
    paddingLeft: '5px',
  },
  refreshButton: {
    width: '21px !important',
    height: '20px !important',
    float: 'left',
    padding: '0px',
    cursor: 'pointer',
  },
  loadingIcon: {
    width: '18px !important',
    height: '18px !important',
  },
  audioPlayer: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  playBtn: {
    backgroundColor: 'Black',
    width:'30px',
    float: 'left',
    paddingTop: '5px',
    paddingLeft: '1px',
    paddingRight: '1px',
    cursor: 'pointer',
  },
  waveFormContainer: {
    width: 'calc(100% - 51px)',
    float: 'left',
  },
  waveForm: {
    width: '100%',
    height: '50px',
    border: 'solid 1px Black',
    float: 'left',
  },
  muteIcon: {
    width: '18px !important',
    height: '18px !important',
  },
  muteButton: {
    float: 'left',
    width: '21px !important',
    height: '50px !important',
    padding: '0px',
    cursor: 'pointer',
  },
});

export default function Waveform({title, selectedAudioPath, startTime, endTime, isWholeWav, onError}) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [zoom, setZoom] = useState(2);
  const [isFirstChannelMuted, muteFirstChannel] = useState(false);
  const [isSecondChannelMuted, muteSecondChannel] = useState(false);

  let audioPathList = [
    selectedAudioPath
  ];

  if (selectedAudioPath.indexOf('_channel1.wav') >= 0)
  {
    audioPathList = [
      selectedAudioPath,
      selectedAudioPath.replace('_channel1.wav', '_channel2.wav'),
    ]
  }
  else if (selectedAudioPath.indexOf('_channel2.wav') >= 0)
  {
    audioPathList = [
      selectedAudioPath.replace('_channel2.wav', '_channel1.wav'),
      selectedAudioPath,
    ]
  }
  else if (selectedAudioPath.indexOf('_L.wav') >= 0)
  {
    audioPathList = [
      selectedAudioPath,
      selectedAudioPath.replace('_L.wav', '_R.wav'),
    ]
  }
  else if (selectedAudioPath.indexOf('_R.wav') >= 0)
  {
    audioPathList = [
      selectedAudioPath.replace('_R.wav', '_L.wav'),
      selectedAudioPath,
    ]
  }

  const audioCount = audioPathList.length;
  const wavesurfer = useRef(Array(audioCount));
  let loadedCount = 0;

  // Do not switch the order
  // Destructor should be put first
  useEffect(() => {
    return () => {
      // componentwillunmount in functional component.
      // Anything in here is fired on component unmount.
      for (var i = 0; i < audioCount; i++) {
        let tempWaveForm = wavesurfer.current[i];
        if (tempWaveForm) {
          tempWaveForm.destroy();
        }
      }
    }
  }, []);

  // Do not switch the order
  // Region creator should be put before audio player creator
  useEffect(() => {
    for (var i = 0; i < audioCount; i++) {
      let tempWaveForm = wavesurfer.current[i];
      
      if (tempWaveForm && isWholeWav) {
        tempWaveForm.clearRegions();
      }
      else if (tempWaveForm && !isWholeWav) {
        tempWaveForm.clearRegions();
        tempWaveForm.addRegion({
          start: startTime,
          end: endTime,
          loop: true,
          drag: false,
          resize: false,
          color: 'hsla(0, 100%, 50%, 0.3)',
        });
  
        if (playing)
        {
          tempWaveForm.play(startTime, endTime);
        }
        else
        {
          tempWaveForm.play(startTime, endTime);
          tempWaveForm.playPause();
        }
      }
    }
  }, [startTime, endTime, isWholeWav]);

  // Do not switch the order
  // Waveform creator should be put lastly
  useEffect(() => {
    create();
  }, [title]);

  const create = async () => {
    setPlay(false);

    const WaveSurfer = (await import('wavesurfer.js')).default;
    const RegionsPlugin = (await import('wavesurfer.js/dist/plugin/wavesurfer.regions')).default;

    setLoading(true);
    loadedCount = 0;

    for (var i = 0; i < audioCount; i++) {
      let tempWaveForm = wavesurfer.current[i];
      if (tempWaveForm) {
        tempWaveForm.destroy();
      }

      let newWaveForm = WaveSurfer.create({
        container: '#waveform' + i,
        waveColor: 'Black',
        progressColor: 'Black',
        cursorColor: 'Black',
        fillParent: true,
        responsive: true,
        barRadius: 0,
        height: 50,
        partialRender: true,
        plugins: [
          RegionsPlugin.create({
            regionsMinLength: 2,
            regions: []
          })
        ],
        xhr: { requestHeaders: [{
            key: "Authorization",
            value: 'Bearer ' + (localStorage.getItem('access_token') ?? '')
        }]}
      });

      const filePath = audioPathList[i];
      newWaveForm.load(filePath);

      newWaveForm.on('ready', function()
      {
        if (newWaveForm) {
          newWaveForm.setVolume(volume);
          newWaveForm.zoom(zoom);

          if (!isWholeWav) {
            newWaveForm.clearRegions();
            newWaveForm.addRegion({
              start: startTime,
              end: endTime,
              loop: true,
              drag: false,
              resize: false,
              color: 'hsla(0, 100%, 50%, 0.3)',
            });
      
            if (playing)
            {
              newWaveForm.play(startTime, endTime);
            }
            else
            {
              newWaveForm.play(startTime, endTime);
              newWaveForm.playPause();
            }
          }

          loadedCount += 1;
          if (loadedCount >= audioCount) {
            setLoading(false);
          }
        }
      });

      newWaveForm.on('error', function(e) {
        onError('Error when loading ' + filePath + '. Please check if the file exist and try again.');
        console.log('Error when loading ' + filePath + ': ' + e);

        loadedCount += 1;
        if (loadedCount >= audioCount) {
          setLoading(false);
        }
      });

      newWaveForm.on('region-click', function(region, e) {
        e.stopPropagation();

        for (var i = 0; i < audioCount; i++) {
          let tempWaveForm = wavesurfer.current[i];

          if (tempWaveForm) {
            tempWaveForm.play(region.start, region.end);
          }
        }

        setPlay(true);
      });

      newWaveForm.on('seek', function(position) {
        const currTime = position * newWaveForm.getDuration();

        for (var i = 0; i < audioCount; i++) {
          let tempWaveForm = wavesurfer.current[i];

          if (tempWaveForm && !isWholeWav)
          {
            tempWaveForm.play(currTime);
          }
        }
      });

      newWaveForm.on('finish', function() {
        setPlay(false);
      });

      wavesurfer.current[i] = newWaveForm;
    }
  };

  const handlePlayPause = () => {
    if (loading) return;
    setPlay(!playing);

    for (var i = 0; i < audioCount; i++) {
      let tempWaveForm = wavesurfer.current[i];
      if (tempWaveForm) {
        tempWaveForm.playPause();
      }
    }
  };

  const onVolumeChange = e => {
    const { target } = e;
    const newVolume =+ target.value;

    if (newVolume) {
      setVolume(newVolume);
      muteFirstChannel(false);
      muteSecondChannel(false);

      for (var i = 0; i < audioCount; i++) {
        let tempWaveForm = wavesurfer.current[i];
        if (tempWaveForm) {
          tempWaveForm.setVolume(newVolume || 1);
        }
      }
    }
  };

  const onZoomChange = e => {
    const { target } = e;
    const newZoom =+ target.value;

    setZoom(newZoom);

    for (var i = 0; i < audioCount; i++) {
      let tempWaveForm = wavesurfer.current[i];
      if (tempWaveForm) {
        tempWaveForm.zoom(newZoom);
      }
    }
  };

  return (
    <div className={classes.audioPlayerContainer} style={{height: (audioCount * 50) + 50 + 'px'}}>
      <div className={classes.titleContainer}>
          {title}
      </div>
      <button className={classes.refreshButton}
        disabled={ loading ? 'disabled' : '' }
        onClick={() => {
          create();
        }}
      >
        { loading ? <CircularProgress className={classes.loadingIcon} /> : <RefreshIcon className={classes.loadingIcon} /> }
      </button>
      <div className={classes.audioPlayer} style={{height: (audioCount * 50) + 30 + 'px'}}>
        <button
          className={classes.playBtn}
          style={{height: (audioCount * 50) + 'px'}}
          onClick={handlePlayPause}>
          {!playing ? <PlayArrowIcon style={{fill: 'White'}} /> : <PauseIcon style={{fill: 'White'}} />}
        </button>
        <div className={classes.waveFormContainer} style={{height: (audioCount * 50) + 'px'}}>
          <div className={classes.waveForm}>
            <div id="waveform0" />
          </div>
          <div className={classes.waveForm} style={{display: audioCount <= 1 ? 'none' : ''}}>
            <div id="waveform1" />
          </div>
        </div>
        <button className={classes.muteButton}
          disabled={ loading ? 'disabled' : '' }
          onClick={() => {
            wavesurfer.current[0].setMute(!isFirstChannelMuted);
            muteFirstChannel(!isFirstChannelMuted);
          }}
        >
          { isFirstChannelMuted ? <MicOffIcon className={classes.muteIcon} /> : <MicIcon className={classes.muteIcon} /> }
        </button>
        <button className={classes.muteButton}
          style={{display: audioCount <= 1 ? 'none' : ''}}
          disabled={ loading ? 'disabled' : '' }
          onClick={() => {
            wavesurfer.current[1].setMute(!isSecondChannelMuted);
            muteSecondChannel(!isSecondChannelMuted);
          }}
        >
          { isSecondChannelMuted ? <MicOffIcon className={classes.muteIcon} /> : <MicIcon className={classes.muteIcon} /> }
        </button>
        <div style={{width: '100%', minHeight: '50px', height: 'auto', float: 'left'}}>
          <div>
            <input
              type="range"
              id="volume"
              name="volume"
              // waveSurfer recognize value of `0` same as `1`
              //  so we need to set some zero-ish value for silence
              min="0.01"
              max="1"
              step=".025"
              onChange={onVolumeChange}
              defaultValue={volume}
              style={{width: '50%'}}
            />
            <label htmlFor="volume" style={{fontSize: '13px'}}>Volume</label>
          </div>
          <div>
            <input
              type="range"
              id="zoom"
              name="zoom"
              min="0"
              max="10"
              step="1"
              onChange={onZoomChange}
              defaultValue={zoom}
              style={{width: '50%'}}
            />
            <label htmlFor="zoom" style={{fontSize: '13px'}}>Zoom</label>
          </div>
        </div>
      </div>
    </div>
  );
}

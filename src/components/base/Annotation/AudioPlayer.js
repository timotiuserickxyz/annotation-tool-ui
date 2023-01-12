import React, { useEffect, useRef, useState } from "react";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  audioPlayerContainer: {
    width: '80%',
    height: '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleContainer: {
    width: '100%',
    height: '20px',
    marginTop: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '12px',
    overflow: 'hidden',
  },
  audioPlayer: {
    width: '100%',
    height: '80px',
    marginTop: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  playBtn: {
    backgroundColor: "Black",
    width:'30px',
    height: '50px',
    float: 'left',
    paddingTop: '5px',
    paddingLeft: '1px',
    paddingRight: '1px',
    cursor: 'pointer',
  },
  waveForm: {
    width: 'calc(100% - 51px)',
    height: '50px',
    float: 'left',
    border: 'solid 1px Black',
  },
  loading: {
    float: 'left',
    marginTop: '15px',
    marginLeft: '3px',
    width: '18px !important',
    height: '18px !important',
  },
});

export default function Waveform({filePath, fileName, startTime, endTime, isWholeWav}) {
  const classes = useStyles();

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [zoom, setZoom] = useState(2);

  // Do not switch the order
  // Destructor should be put first
  useEffect(() => {
    return () => {
      // componentwillunmount in functional component.
      // Anything in here is fired on component unmount.
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    }
  }, []);

  // Do not switch the order
  // Region creator should be put before audio player creator
  useEffect(() => {
    if (wavesurfer.current && isWholeWav) {
      wavesurfer.current.clearRegions();
    }
    else if (wavesurfer.current && !isWholeWav) {
      wavesurfer.current.clearRegions();
      wavesurfer.current.addRegion({
        start: startTime,
        end: endTime,
        loop: true,
        drag: false,
        resize: false,
        color: 'hsla(0, 100%, 50%, 0.3)',
      });

      if (playing)
      {
        wavesurfer.current.play(startTime, endTime);
      }
      else
      {
        wavesurfer.current.play(startTime, endTime);
        wavesurfer.current.playPause();
      }
    }
  }, [startTime, endTime, isWholeWav]);

  // Do not switch the order
  // Waveform creator should be put lastly
  useEffect(() => {
    const create = async () => {
      setPlay(false);

      const WaveSurfer = (await import('wavesurfer.js')).default;
      const RegionsPlugin = (await import('wavesurfer.js/dist/plugin/wavesurfer.regions')).default;

      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "Black",
        progressColor: "Black",
        cursorColor: "Black",
        fillParent: true,
        responsive: true,
        barRadius: 0,
        height: 50,
        // If true, normalize by the maximum peak instead of 1.0.
        //normalize: true,
        // Use the PeakCache to improve rendering speed of large waveforms.
        partialRender: true,
        plugins: [
          RegionsPlugin.create({
            regionsMinLength: 2,
            regions: []
          })
        ]
      });

      setLoading(true);

      wavesurfer.current.load(filePath);

      wavesurfer.current.on("ready", function() {
        // https://wavesurfer-js.org/docs/methods.html
        // wavesurfer.current.play();
        // setPlay(true);

        // make sure object still available when file loaded
        if (wavesurfer.current) {
          wavesurfer.current.setVolume(volume);
          wavesurfer.current.zoom(zoom);
          setLoading(false);

          if (wavesurfer.current && !isWholeWav) {
            wavesurfer.current.clearRegions();
            wavesurfer.current.addRegion({
              start: startTime,
              end: endTime,
              loop: true,
              drag: false,
              resize: false,
              color: 'hsla(0, 100%, 50%, 0.3)',
            });
      
            if (playing)
            {
              wavesurfer.current.play(startTime, endTime);
            }
            else
            {
              wavesurfer.current.play(startTime, endTime);
              wavesurfer.current.playPause();
            }
          }
        }
      });

      wavesurfer.current.on("error", function(e) {
        if (e == 'Error: HTTP error status: 404')
        {
          alert(filePath + ' not found');
        }
        else
        {
          alert('Error loading ' + filePath);
        }

        setLoading(false);
      });

      wavesurfer.current.on('region-click', function(region, e) {
        e.stopPropagation();
        region.wavesurfer.play(region.start, region.end);
        setPlay(true);
      });

      wavesurfer.current.on("finish", function() {
        setPlay(false);
      });
    };

    if (wavesurfer.current) {
      wavesurfer.current.destroy();
    }

    create();
    
  }, [filePath]);

  const handlePlayPause = () => {
    if (loading) return;
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = e => {
    const { target } = e;
    const newVolume =+ target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  const onZoomChange = e => {
    const { target } = e;
    const newZoom =+ target.value;

    setZoom(newZoom);
    wavesurfer.current.zoom(newZoom);
  };

  return (
    <div className={classes.audioPlayerContainer}>
      <div className={classes.titleContainer}>
          {fileName}
      </div>
      <div className={classes.audioPlayer}>
        <button
          className={classes.playBtn}
          onClick={handlePlayPause}>
          {!playing ? <PlayArrowIcon style={{fill: "White"}} /> : <PauseIcon style={{fill: "White"}} />}
        </button>
        <div className={classes.waveForm}>
          <div id="waveform" ref={waveformRef} />
        </div>
        { loading ? <CircularProgress className={classes.loading} /> : ''}
        <div style={{marginTop: '-20px'}}>
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
            style={{width: '40%'}}
          />
          <label htmlFor="volume">Volume</label>
        </div>
        <div style={{marginTop: '-5px'}}>
          <input
            type="range"
            id="zoom"
            name="zoom"
            min="0"
            max="10"
            step="1"
            onChange={onZoomChange}
            defaultValue={zoom}
            style={{width: '40%'}}
          />
          <label htmlFor="zoom">Zoom</label>
        </div>
      </div>
    </div>
  );
}

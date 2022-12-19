import React, { useEffect, useRef, useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = ref => ({
  container: ref,
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
  partialRender: true
});

export default function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function() {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    wavesurfer.current.on("finish", function() {
      setPlay(false);
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = e => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <div style={{width: '80%', height: '80px', marginLeft: 'auto', marginRight: 'auto'}}>
      <div style={{width: '100%', maxWidth: '430px', height: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
        <button
          style={{backgroundColor: "Black", width:'30px', height: '50px', float: 'left', paddingTop: '5px', paddingLeft: '1px', paddingRight: '1px', cursor: 'pointer',}}
          onClick={handlePlayPause}>
          {!playing ? <PlayArrowIcon style={{fill: "White"}} /> : <PauseIcon style={{fill: "White"}} />}
        </button>
        <div style={{width: 'calc(100% - 30px)', height: '50px', float: 'left', border: 'solid 1px Black'}}>
          <div id="waveform" ref={waveformRef} />
        </div>
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
          />
          <label htmlFor="volume">Volume</label>
        </div>
      </div>
    </div>
    
  );
}

import React from 'react';
import {
  Radio,
  Button,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AudioPlayer from './AudioPlayer';
import { API_URL } from '../../../api/core';

const useStyles = makeStyles({
  container: {
    width: '100%',
    marginTop: '-20px',
  },
  chunkingContainer: {
    width: '80%',
    height: '120px',
    padding: '10px',
    border: 'solid 1px black',
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  labelContainer: {
    width: '80%',
    height: '200px',
    padding: '10px',
    border: 'solid 1px black',
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    overflowY: 'scroll',
  },
  labelRadioGroup: {
    width: 'max-content',
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  commentTextArea: {
    width: '80%',
    height: '100px',
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    resize: 'none',
    padding: '10px',
  },
  bottomContainer: {
    width: '100%',
    marginTop: '-20px',
    textAlign: 'center',
  },
  navigationContainer: {
    width: '80%',
    height: '50px',
    display: 'inline-block',
  },
});

export type BaseRow = {
  id: string | number;
  tableData?: {id: string | number, checked: boolean | undefined};
};

type Props = {
  projectName: string,
  projectLabelList: string[],
  projectData: any[],
  selectedAudio: string,
  selectedAudioStartTime: number,
  selectedAudioEndTime: number,
  currentSequence: number,
  selectedSequence: number,
  selectedLabel: string,
  selectedComment: string,
  handleChangeSequence: (event: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>,
  handleChangeLabel: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void | Promise<void>,
  handleChangeComment: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void | Promise<void>,
  onClickSave: () => void | Promise<void>,
  onClickPrev: () => void | Promise<void>,
  onClickNext: () => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const AnnotateData: Component = ({ projectName, projectLabelList, projectData, selectedAudio, selectedAudioStartTime, selectedAudioEndTime, currentSequence, selectedSequence, selectedLabel, handleChangeSequence, handleChangeLabel, selectedComment, handleChangeComment, onClickSave, onClickPrev, onClickNext }) => {
  const classes = useStyles();

  // Select audio file
  // let audioFile = '';
  // if (selectedDataIndex == 0) {
  //   audioFile = '/mono_8000hz_32bit_1.wav';
  // }
  // else if (selectedDataIndex % 9 == 0)
  //   audioFile = '/mono_8000hz_32bit_1.wav';
  // else if (selectedDataIndex % 9 == 1)
  //   audioFile = '/mono_8000hz_32bit_2.wav';
  // else if (selectedDataIndex % 9 == 2)
  //   audioFile = '/mono_11025hz_32bit_1.wav';
  // else if (selectedDataIndex % 9 == 3)
  //   audioFile = '/mono_44100hz_32bit_1.wav';
  // else if (selectedDataIndex % 9 == 4)
  //   audioFile = '/mono_44100hz_32bit_2.wav';
  // else if (selectedDataIndex % 9 == 5)
  //   audioFile = '/mono_44100hz_32bit_3.wav';
  // else if (selectedDataIndex % 9 == 6)
  //   audioFile = '/mono_48000hz_32bit_1.wav';
  // else if (selectedDataIndex % 9 == 7)
  //   audioFile = '/mono_48000hz_32bit_2.wav';
  // else if (selectedDataIndex % 9 == 8)
  //   audioFile = '/stereo_11025hz_32bit_1.wav';

  const selectedAudioPath = API_URL + '/annotation-project/source/wav/' + projectName + '/' + selectedAudio;

  return (
    <div>
      <div className={classes.container}>
        {
          selectedAudio != '' ? (<AudioPlayer
            filePath={selectedAudioPath}
            fileName={selectedAudio}
            startTime={selectedAudioStartTime}
            endTime={selectedAudioEndTime}
            isWholeWav={selectedSequence === -1}
          />) : ''
        }
      </div>
      <br/>
      <br/>
      <br/>
      <div className={classes.container}>
        <div className={classes.chunkingContainer}>
          <FormControl className={classes.labelRadioGroup}>
            <FormLabel id="chunking-radio-buttons-group">Chunking</FormLabel>
            <RadioGroup
              aria-labelledby="chunking-radio-buttons-group"
              name="chunking-radio-buttons-group"
              value={selectedSequence.toString()}
              onChange={handleChangeSequence}
            >
              <FormControlLabel control={<Radio />} label="Talk Unit" value={currentSequence.toString()} disabled={projectData.length >= 1 && selectedSequence === -1} />
              <FormControlLabel control={<Radio />} label="Whole Wav" value={'-1'} disabled={projectData.length >= 1 && selectedSequence !== -1} />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <br/>
      <div className={classes.container}>
        <div className={classes.labelContainer}>
          <FormControl className={classes.labelRadioGroup}>
            <FormLabel id="label-radio-buttons-group">Label</FormLabel>
            <RadioGroup
              aria-labelledby="label-radio-buttons-group"
              name="label-radio-buttons-group"
              value={selectedLabel}
              onChange={handleChangeLabel}
            >
              {projectLabelList && projectLabelList.map(dataLabel => 
                (<FormControlLabel
                    control={<Radio />}
                    value={dataLabel}
                    label={dataLabel}
                  />)
              )}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <br/>
      <div className={classes.container}>
        <textarea className={classes.commentTextArea} onChange={handleChangeComment} value={selectedComment ? selectedComment : ''} placeholder="Comment" />
      </div>
      <br/>
      <div className={classes.bottomContainer}>
        <div className={classes.navigationContainer}>
          <Button onClick={onClickPrev}>Prev</Button>
          <Button onClick={onClickSave}>Save</Button>
          <Button onClick={onClickNext}>Next</Button>
        </div>
      </div>
    </div>
  )
};
  
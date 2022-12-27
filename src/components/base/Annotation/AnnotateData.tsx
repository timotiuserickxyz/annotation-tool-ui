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
  },
  navigationContainer: {
    width: '80%',
    height: '100px',
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

export type BaseRow = {
  id: string | number;
  tableData?: {id: string | number, checked: boolean | undefined};
};

type Props = {
  projectName: string,
  projectLabelList: string[],
  selectedAudio: string,
  selectedLabel: string,
  selectedComment: string,
  handleChangeLabel: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void | Promise<void>,
  handleChangeComment: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void | Promise<void>,
  onClickSave: () => void | Promise<void>,
  onClickPrev: () => void | Promise<void>,
  onClickNext: () => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const AnnotateData: Component = ({ projectName, projectLabelList, selectedAudio, selectedLabel, handleChangeLabel, selectedComment, handleChangeComment, onClickSave, onClickPrev, onClickNext }) => {
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
          selectedAudio != '' ? (<AudioPlayer filePath={selectedAudioPath} fileName={selectedAudio}  />) : ''
        }
      </div>
      <br/>
      <br/>
      <div className={classes.container}>
        <FormControl className={classes.labelRadioGroup}>
          <FormLabel id="demo-radio-buttons-group-label">Label</FormLabel>
          <RadioGroup
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
      <br/>
      <br/>
      <div className={classes.container}>
        <textarea className={classes.commentTextArea} onChange={handleChangeComment} value={selectedComment ? selectedComment : ''} />
      </div>
      <br/>
      <div className={classes.container}>
        <div className={classes.navigationContainer}>
          <Button onClick={onClickPrev}>Prev</Button>
          <Button onClick={onClickSave}>Save</Button>
          <Button onClick={onClickNext}>Next</Button>
        </div>
      </div>
    </div>
  )
};
  
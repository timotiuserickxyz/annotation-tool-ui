import React from 'react';
import {
  Radio,
  IconButton,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AudioPlayer from './AudioPlayer';
import { API_URL } from '../../../api/core';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SaveIcon from '@material-ui/icons/Save';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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
  selectedProjectName: string,
  selectedProjectLabelList: any[],
  isWholeWav: boolean,
  selectedAudio: string,
  selectedAudioStartTime: number,
  selectedAudioEndTime: number,
  selectedLabel: string,
  selectedComment: string,
  handleChangeLabel: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void | Promise<void>,
  handleChangeComment: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void | Promise<void>,
  onClickSave: () => void | Promise<void>,
  onClickPrev: () => void | Promise<void>,
  onClickNext: () => void | Promise<void>,
  onClickDelete: () => void | Promise<void>,
  onClickClear: () => void | Promise<void>,
  onError: (message:string) => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const AnnotateData: Component = ({ selectedProjectName, selectedProjectLabelList, isWholeWav, selectedAudio, selectedAudioStartTime, selectedAudioEndTime, selectedLabel, handleChangeLabel, selectedComment, handleChangeComment, onClickSave, onClickPrev, onClickNext, onClickDelete, onClickClear, onError }) => {
  const classes = useStyles();

  const title = selectedAudio.replace('_channel1.wav', '').replace('_channel2.wav', '').replace('_L.wav', '').replace('_R.wav', '');
  const selectedAudioPath = API_URL + '/annotation-project/source/wav/' + selectedProjectName + '/' + selectedAudio;

  return (
    <div>
      <div className={classes.container}>
        {
          selectedAudio != '' ? (<AudioPlayer
            title={title}
            selectedAudioPath={selectedAudioPath}
            startTime={selectedAudioStartTime}
            endTime={selectedAudioEndTime}
            isWholeWav={isWholeWav}
            onError={onError}
          />) : ''
        }
      </div>
      <br/>
      <br/>
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
              {selectedProjectLabelList && selectedProjectLabelList.map(labelOption => 
                (<FormControlLabel
                    control={<Radio />}
                    value={labelOption.label_name}
                    label={labelOption.label_name}
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
      <br/>
      <div className={classes.bottomContainer}>
        <div className={classes.navigationContainer}>
          <IconButton onClick={onClickPrev}><NavigateBeforeIcon /></IconButton>
          <IconButton onClick={onClickClear}><ClearAllIcon /></IconButton>
          <IconButton onClick={onClickDelete}><HighlightOffIcon /></IconButton>
          <IconButton onClick={onClickSave}><SaveIcon /></IconButton>
          <IconButton onClick={onClickNext}><NavigateNextIcon /></IconButton>
        </div>
      </div>
    </div>
  )
};
  
import * as React from 'react';
import {
  Radio,
  Button,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AudioPlayer from "./AudioPlayer";

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

type Row = BaseRow & {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type Props = {
  projectName: string,
  selectedDataIndex: number,
  onClickPrev: () => void | Promise<void>,
  onClickNext: () => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const AnnotateData: Component = ({ projectName, selectedDataIndex, onClickPrev, onClickNext }) => {
  const classes = useStyles();

  let audioFile = '';
  if (selectedDataIndex % 9 == 0)
    audioFile = '/mono_8000hz_32bit_1.wav';
  else if (selectedDataIndex % 9 == 1)
    audioFile = '/mono_8000hz_32bit_2.wav';
  else if (selectedDataIndex % 9 == 2)
    audioFile = '/mono_11025hz_32bit_1.wav';
  else if (selectedDataIndex % 9 == 3)
    audioFile = '/mono_44100hz_32bit_1.wav';
  else if (selectedDataIndex % 9 == 4)
    audioFile = '/mono_44100hz_32bit_2.wav';
  else if (selectedDataIndex % 9 == 5)
    audioFile = '/mono_44100hz_32bit_3.wav';
  else if (selectedDataIndex % 9 == 6)
    audioFile = '/mono_48000hz_32bit_1.wav';
  else if (selectedDataIndex % 9 == 7)
    audioFile = '/mono_48000hz_32bit_2.wav';
  else if (selectedDataIndex % 9 == 8)
    audioFile = '/stereo_11025hz_32bit_1.wav';

  const comment = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tortor ante, elementum vel turpis a, tincidunt semper augue. Nulla vel nulla posuere, elementum orci non, tempus urna. Integer ornare interdum ligula vel faucibus. Curabitur erat odio, ornare non metus at, bibendum molestie tortor. Nunc sit amet augue sapien. Proin diam erat, egestas et finibus in, blandit a lectus. Vivamus nibh velit, accumsan non erat at, volutpat bibendum ipsum. Pellentesque est sem, luctus in convallis ut, feugiat ut ligula. Proin pretium congue orci, ut luctus sapien congue quis.';

  return (
    <div>
      <div className={classes.container}>
        <AudioPlayer url={audioFile} />
      </div>
      <br/>
      <br/>
      <div className={classes.container}>
        <FormControl className={classes.labelRadioGroup}>
          <FormLabel id="demo-radio-buttons-group-label">Label</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel control={<Radio />} value="good" label="Good" />
            <FormControlLabel control={<Radio />} value="mid" label="Mid" />
            <FormControlLabel control={<Radio />} value="bad" label="Bad" />
          </RadioGroup>
        </FormControl>
      </div>
      <br/>
      <br/>
      <div className={classes.container}>
        <textarea className={classes.commentTextArea}>{comment}</textarea>
      </div>
      <br/>
      <div className={classes.container}>
        <div className={classes.navigationContainer}>
          <Button onClick={onClickPrev}>Prev</Button>
          <Button onClick={onClickNext}>Next</Button>
        </div>
      </div>
    </div>
  )
};
  
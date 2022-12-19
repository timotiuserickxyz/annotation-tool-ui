import React from 'react';
import { useSetState } from 'react-use';
import { useRouter } from 'next/router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { AnnotateData } from '../../base/Annotation/AnnotateData';
import { DummyData } from '../../base/Dummy/DummyData';

const useStyles = makeStyles({
  root: {
    height: 'inherit',
  },
  header: {
    height: 52,
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    minHeight: '100px',
    overflow: 'hidden',
    padding: '20px',
    backgroundColor: 'white',
    border: 'solid 1px lightGray',
    borderRadius: '5px',
  },
  annotateDataContainer: {
    width: '40%',
    float: 'left',
  },
  annotationDataContainer: {
    width: '60%',
    float: 'left',
  },
});

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const classes = useStyles();
  const router = useRouter();
  const [states, setStates] = useSetState({
    projectName: "Project1",
    selectedDataIndex: 2,
    selectedAudio: '',
  });

  console.log('projectName: ' + states.projectName);
  console.log('selectedDataIndex: ' + states.selectedDataIndex);

  const goToPrevData = () => {
    const prevDataIndex = states.selectedDataIndex - 1;
    setStates({
      projectName: 'Project' + prevDataIndex,
      selectedDataIndex: prevDataIndex
    });
  };

  const goToNextData = () => {
    const nextDataIndex = states.selectedDataIndex + 1;
    setStates({
      projectName: 'Project' + nextDataIndex,
      selectedDataIndex: nextDataIndex
    });
  };

  const handleSelection = (id: number) => {
    setStates({
      projectName: 'Project' + id,
      selectedDataIndex: id
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2>Project:</h2>
        <select style={{marginLeft: '10px', textAlign: 'center', paddingLeft: '10px', paddingRight: '10px'}}>
          <option></option>
          <option>Project1</option>
          <option>Project23456789123456789</option>
          <option>Project3</option>
        </select>
      </div>
      <br/>
      <div className={classes.content}>
        <div className={classes.annotateDataContainer}>
          <AnnotateData
            projectName={states.projectName}
            selectedDataIndex={states.selectedDataIndex}
            onClickPrev={goToPrevData}
            onClickNext={goToNextData}
          />
        </div>
        <div className={classes.annotationDataContainer}>
          <DummyData
            projectName={states.projectName}
            selectedDataIndex={states.selectedDataIndex}
            onSelect={handleSelection}
          />
        </div>
      </div>
    </div>
  );
};

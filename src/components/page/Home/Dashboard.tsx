import React from 'react';
import { useSetState } from 'react-use';
import { useRouter } from 'next/router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { AnnotateData } from '../../base/Annotation/AnnotateData';
import { DummyData } from '../../base/Dummy/DummyData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'inherit',
    },
    header: {
      height: 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    iconButton: {
      cursor: 'pointer',
    },
    annotateDataContainer: {
      width: '50%',
      float: 'left',
    },
    annotationDataContainer: {
      width: '50%',
      float: 'left',
    },
  }),
);

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const classes = useStyles();
  const router = useRouter();
  const [states, setStates] = useSetState({
    projectName: "Project1",
    selectedDataIndex: 1,
    selectedAudio: '',
  });

  console.log('projectName: ' + states.projectName);
  console.log('selectedDataIndex: ' + states.selectedDataIndex);

  const handleSelection = (id: number) => {
    setStates({
      projectName: 'Project' + id,
      selectedDataIndex: id
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h5>{states.projectName}</h5>
      </div>
      <div className={classes.annotateDataContainer}>
        <AnnotateData
          projectName={states.projectName}
          selectedDataIndex={states.selectedDataIndex}
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
  );
};

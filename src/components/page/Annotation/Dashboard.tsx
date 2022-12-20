import React, { useEffect } from 'react';
import { useSetState } from 'react-use';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { getDummyUserList } from '../../../api/dummy/getDummyUserList';
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
    marginTop: '20px',
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
    shouldFetch: false,
    projectName: '',
    projectData: null as any,
    projectDataCount: 0,
    selectedDataIndex: 0,
    selectedAudio: '',
  });

  const { data } = getDummyUserList(states.shouldFetch);

  const saveAndRefreshData = () => {
    // Save

    // Refresh
    setStates({
      shouldFetch: true,
    });
  };

  useEffect(() => {
    if (states.shouldFetch) {
      const fetchedData = !!data ? data.map((t) => {
        return {...t};
      }) : [];
      
      setStates({
        projectData: fetchedData,
        projectDataCount: fetchedData ? fetchedData.length : 0,
        selectedDataIndex: fetchedData ? 1 : 0,
      });
    }
  }, [data]);

  const goToPrevData = () => {
    const prevDataIndex = states.selectedDataIndex - 1;
    setStates({
      shouldFetch: false,
      projectName: 'Project' + prevDataIndex,
      selectedDataIndex: prevDataIndex,
    });
  };

  const goToNextData = () => {
    const nextDataIndex = states.selectedDataIndex + 1;
    setStates({
      shouldFetch: false,
      projectName: 'Project' + nextDataIndex,
      selectedDataIndex: nextDataIndex,
    });
  };

  const handleSelection = (id: number, audioPath: string) => {
    setStates({
      shouldFetch: false,
      projectName: 'Project' + id,
      selectedDataIndex: id,
      selectedAudio: audioPath,
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
        <Button onClick={saveAndRefreshData}>Try</Button>
      </div>
      { !!states.projectData ? (
        <div className={classes.content}>
          <div className={classes.annotateDataContainer}>
            <AnnotateData
              projectName={states.projectName}
              selectedDataIndex={states.selectedDataIndex}
              selectedAudio={states.selectedAudio}
              onClickSave={saveAndRefreshData}
              onClickPrev={goToPrevData}
              onClickNext={goToNextData}
            />
          </div>
          <div className={classes.annotationDataContainer}>
            <DummyData
              data={states.projectData}
              selectedDataIndex={states.selectedDataIndex}
              onSelect={handleSelection}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
      
    </div>
  );
};

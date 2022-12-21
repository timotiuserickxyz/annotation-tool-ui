import React, { useEffect } from 'react';
import { useSetState } from 'react-use';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { getProjectList } from '../../../api/annotation/getProjectList';
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
  projectDropdown: {
    marginLeft: '10px',
    textAlign: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
});

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const classes = useStyles();
  const router = useRouter();

  const rawProjectList = getProjectList();
  const fetchedProjectList = !!rawProjectList.data ? rawProjectList.data.configs.map((t) => {
    return {...t};
  }) : [];

  const [states, setStates] = useSetState({
    projectName: '',
    projectData: null as any,
    projectDataCount: 0,
    selectedDataIndex: 0,
    selectedAudio: '',
  });

  const { data } = getDummyUserList(states.projectName);

  const selectProject = (e: string) => {
    setStates({
      projectName: e,
    });
  };

  const saveAndRefreshData = () => {
    // Save
    
    // Refresh
    
  };

  const goToPrevData = () => {
    const prevDataIndex = states.selectedDataIndex - 1;
    setStates({
      selectedDataIndex: prevDataIndex,
    });
  };

  const goToNextData = () => {
    const nextDataIndex = states.selectedDataIndex + 1;
    setStates({
      selectedDataIndex: nextDataIndex,
    });
  };

  const handleSelection = (id: number, audioPath: string) => {
    setStates({
      projectName: 'Project' + id,
      selectedDataIndex: id,
      selectedAudio: audioPath,
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2>Project:</h2>
        <select className={classes.projectDropdown}
          onChange={(e) => selectProject(e.target.value)}
        >
          <option></option>
          {fetchedProjectList && fetchedProjectList.map(p => 
            (<option key={p.project_name} value={p.project_name}>{p.project_name}</option>)
          )} 
        </select>
        <Button onClick={saveAndRefreshData}>Try</Button>
        <h3>{states.projectName}</h3>
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

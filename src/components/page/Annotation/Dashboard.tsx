import React, { useState, useEffect } from 'react';
import { useSetState } from 'react-use';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { getProjectList } from '../../../api/annotation/getProjectList';
import { getProjectDetail } from '../../../api/annotation/getProjectDetail';
import { getProjectDataList } from '../../../api/annotation/getProjectDataList';

import { getDummyUserList } from '../../../api/dummy/getDummyUserList';
import { AnnotateData } from '../../base/Annotation/AnnotateData';
import { DummyData } from '../../base/Dummy/DummyData';

import { getAPIUrl } from '../../../utils/path';
import { mutate } from 'swr';

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

  const [projectName, setProjectName] = useState<string>('');
  const [selectedDataIndex, setSelectedDataIndex] = useState<number>(0);
  const [selectedAudio, setSelectedAudio] = useState<string>('');

  const rawProjectList = getProjectList();
  const actualProjectList = !!rawProjectList.data ? rawProjectList.data.configs.map((t) => {
    return {...t};
  }) : [];

  const rawProjectDetail = getProjectDetail(projectName);
  const projectDetail = !!rawProjectDetail && !!rawProjectDetail.data ? rawProjectDetail.data : null;

  //const rawProjectData = getProjectDataList(projectName);
  // const projectData = !!rawProjectData && !!rawProjectData.data ? rawProjectData.data.data.map((t) => {
  //   return {...t};
  // }) : [];

  const rawProjectData = getDummyUserList(projectName ? true : false);
  const projectData = !!rawProjectData && !!rawProjectData.data ? rawProjectData.data.map((t) => {
    return {...t};
  }) : [];

  const projectDataCount = projectData.length;

  const selectProject = (e: string) => {
    setProjectName(e);
    setSelectedDataIndex(0);

    // await mutate(getAPIUrl('annotation', 'getProjectDetail', {projectName: e}));
    // await mutate(getAPIUrl('annotation', 'getProjectDataList', {projectName: e}));
  };

  const saveAndRefreshData = () => {
    // Save
    
    // Refresh
    
  };

  const goToPrevData = () => {
    const prevDataIndex = selectedDataIndex - 1;
    setSelectedDataIndex(prevDataIndex);
  };

  const goToNextData = () => {
    const nextDataIndex = selectedDataIndex + 1;
    setSelectedDataIndex(nextDataIndex);
  };

  const handleSelection = (id: number, audioPath: string) => {
    setSelectedDataIndex(id);
    setSelectedAudio(audioPath);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2>Project:</h2>
        <select className={classes.projectDropdown}
          onChange={(e) => selectProject(e.target.value)}
        >
          <option></option>
          <option>Project1</option>
          <option>Project2</option>
          {actualProjectList && actualProjectList.map(p => 
            (<option key={p.project_name} value={p.project_name}>{p.project_name}</option>)
          )} 
        </select>
        <Button onClick={saveAndRefreshData}>Try</Button>
        <h3>{projectName}</h3>
      </div>
      { projectData && projectData.length > 0 ? (
        <div className={classes.content}>
          <div className={classes.annotateDataContainer}>
            <AnnotateData
              projectName={projectName}
              selectedDataIndex={selectedDataIndex}
              selectedAudio={selectedAudio}
              onClickSave={saveAndRefreshData}
              onClickPrev={goToPrevData}
              onClickNext={goToNextData}
            />
          </div>
          <div className={classes.annotationDataContainer}>
            <DummyData
              data={projectData}
              selectedDataIndex={selectedDataIndex}
              onSelect={handleSelection}
            />
          </div>
        </div>
      ) : (
        <div>Project not selected yet or does not have any data</div>
      )}
    </div>
  );
};

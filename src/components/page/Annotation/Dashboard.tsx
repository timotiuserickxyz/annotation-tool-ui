import React, { useState } from 'react';
import { mutate } from 'swr';
import { makeStyles } from '@material-ui/core/styles';

import { getAPIUrl } from '../../../utils/path';
import { getProjectList } from '../../../api/annotation/getProjectList';
import { getProjectDetail } from '../../../api/annotation/getProjectDetail';
import { getProjectDataList } from '../../../api/annotation/getProjectDataList';
import { updateProjectData } from '../../../api/annotation/updateProjectData';

import { AnnotateData } from '../../base/Annotation/AnnotateData';
import { AnnotationData } from '../../base/Annotation/AnnotationData';

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

  const [projectName, setProjectName] = useState<string>('');
  const [selectedTableIndex, setSelectedTableIndex] = useState<number>(0);
  const [selectedAudio, setSelectedAudio] = useState<string>('');
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [selectedComment, setSelectedComment] = useState<string>('');

  const rawProjectList = getProjectList();
  const actualProjectList = !!rawProjectList.data ? rawProjectList.data.configs.map((t) => {
    return {...t};
  }) : [];

  const rawProjectDetail = getProjectDetail(projectName);
  // const projectDetail = !!rawProjectDetail && !!rawProjectDetail.data ? rawProjectDetail.data : null;
  const projectLabelList = !!rawProjectDetail && !!rawProjectDetail.data ? rawProjectDetail.data.label_option.label_option : [];
  
  const rawProjectData = getProjectDataList(projectName);
  const projectData = !!rawProjectData && !!rawProjectData.data ? rawProjectData.data.data.map((t) => {
    return {...t};
  }) : [];

  const projectDataCount = projectData.length;

  const selectProject = async (e: string) => {
    setProjectName(e);
    setSelectedTableIndex(0);
    setSelectedAudio('');
    setSelectedLabel('');
    setSelectedComment('');
  };

  const saveAndRefreshData = () => {
    const params = {
      label: selectedLabel,
      comment: selectedComment
    }

    const selectedData = projectData[selectedTableIndex - 1];

    // Save
    updateProjectData(projectName, selectedData.record_id, params);
    
    // Refresh
    // mutate(getAPIUrl('annotation', 'getProjectDetail', {projectName: projectName}));
    mutate(getAPIUrl('annotation', 'getProjectDataList', {projectName: projectName}));
  };

  const handleChangeLabel = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setSelectedLabel(value);
  };
  
  const handleChangeComment = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setSelectedComment(value);
  };

  const goToPrevData = () => {
    if (selectedTableIndex > 1)
    {
      const prevTableIndex = selectedTableIndex - 1;
      setSelectedTableIndex(prevTableIndex);

      const dataIndex = prevTableIndex - 1;
      setSelectedAudio(projectData[dataIndex].file_name);
      setSelectedLabel(projectData[dataIndex].label);
      setSelectedComment(projectData[dataIndex].comment);
    }
  };

  const goToNextData = () => {
    if (selectedTableIndex < projectDataCount)
    {
      const nextDataIndex = selectedTableIndex + 1;
      setSelectedTableIndex(nextDataIndex);

      const dataIndex = nextDataIndex - 1;
      setSelectedAudio(projectData[dataIndex].file_name);
      setSelectedLabel(projectData[dataIndex].label);
      setSelectedComment(projectData[dataIndex].comment);
    }
  };

  const handleSelection = (tableIndex: number) => {
    if (tableIndex >= 1 && tableIndex <= projectDataCount)
    {
      setSelectedTableIndex(tableIndex);

      const dataIndex = tableIndex - 1;
      setSelectedAudio(projectData[dataIndex].file_name);
      setSelectedLabel(projectData[dataIndex].label);
      setSelectedComment(projectData[dataIndex].comment);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2>Project:</h2>
        <select className={classes.projectDropdown}
          onChange={(e) => selectProject(e.target.value)}
        >
          <option></option>
          {actualProjectList && actualProjectList.map(p => 
            (<option key={p.project_name} value={p.project_name}>{p.project_name}</option>)
          )} 
        </select>
      </div>
      { projectData && projectData.length > 0 ? (
        <div className={classes.content}>
          <div className={classes.annotateDataContainer}>
            <AnnotateData
              projectName={projectName}
              projectLabelList={projectLabelList}
              selectedAudio={selectedAudio}
              selectedLabel={selectedLabel}
              selectedComment={selectedComment}
              handleChangeLabel={handleChangeLabel}
              handleChangeComment={handleChangeComment}
              onClickSave={saveAndRefreshData}
              onClickPrev={goToPrevData}
              onClickNext={goToNextData}
            />
          </div>
          <div className={classes.annotationDataContainer}>
            <AnnotationData
              data={projectData}
              selectedTableIndex={selectedTableIndex}
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

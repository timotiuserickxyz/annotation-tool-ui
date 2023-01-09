import React, { useState, useEffect } from 'react';
import { mutate } from 'swr';
import { makeStyles } from '@material-ui/core/styles';

import { getAPIUrl } from '../../../utils/path';
import { getProjectList } from '../../../api/annotation/getProjectList';
import { getRawFileList } from '../../../api/annotation/getRawFileList';
import { getProjectDetail } from '../../../api/annotation/getProjectDetail';
import { getRawFileDataList } from '../../../api/annotation/getRawFileDataList';
import { getProjectDataList } from '../../../api/annotation/getProjectDataList';
import { postProjectData } from '../../../api/annotation/postProjectData';
import { updateProjectData } from '../../../api/annotation/updateProjectData';

import { RawFileList } from '../../base/Annotation/RawFileList';
import { AnnotateData } from '../../base/Annotation/AnnotateData';
import { AnnotationDataList } from '../../base/Annotation/AnnotationDataList';

import {
  Button
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: 'inherit',
  },
  header: {
    height: 52,
    display: 'flex',
    alignItems: 'center',
  },
  headerItem: {
    float: 'left',
    marginRight: '10px',
  },
  customDropdown: {
    float: 'left',
    marginRight: '30px',
    textAlign: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  content: {
    width: '100%',
    marginTop: '20px',
    height: '710px',
    overflow: 'hidden',
    padding: '0px',
    backgroundColor: 'white',
    border: 'solid 1px lightGray',
    borderRadius: '5px',
  },
  rawFileListContainer: {
    width: '15%',
    height: '100%',
    float: 'left',
  },
  subcontent: {
    width: '85%',
    height: '100%',
    float: 'left',
    padding: '20px',
  },
  annotateDataContainer: {
    width: '35%',
    float: 'left',
  },
  annotationDataListContainer: {
    width: '65%',
    height: '100%',
    float: 'left',
  },
});

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const classes = useStyles();

  const [projectName, setProjectName] = useState<string>('');
  const [rawFileName, setRawFileName] = useState<string>('');

  const [selectedDataTableIndex, setSelectedDataTableIndex] = useState<number>(0);
  const [selectedRawFileData, setSelectedRawFileData] = useState<any>(null);
  const [selectedAudio, setSelectedAudio] = useState<string>('');
  const [selectedAudioStartTime, setSelectedAudioStartTime] = useState<number>(0);
  const [selectedAudioEndTime, setSelectedAudioEndTime] = useState<number>(0);
  const [selectedProjectData, setSelectedProjectData] = useState<any>(null);
  
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [selectedComment, setSelectedComment] = useState<string>('');

  const tempProjectList = getProjectList();
  const projectList = !!tempProjectList.data ? tempProjectList.data.configs.map((t) => {
    return {...t};
  }) : [];

  const tempProjectDetail = getProjectDetail(projectName);
  const projectLabelList = !!tempProjectDetail && !!tempProjectDetail.data ? tempProjectDetail.data.label_option.label_option : [];
  const rawFileFolderPath = !!tempProjectDetail && !!tempProjectDetail.data ? tempProjectDetail.data.source_path.raw_source_path : '';
  const rawFileFolderName = (!!rawFileFolderPath ? rawFileFolderPath.split('/').pop() : '') as string;

  const tempRawFileList = getRawFileList(rawFileFolderName);
  const rawFileList = !!tempRawFileList && !!tempRawFileList.data ? tempRawFileList.data.files.map((t) => {
    return {...t};
  }) : [];

  const rawRawFileData = getRawFileDataList(rawFileFolderName, rawFileName);
  const rawFileData = !!rawRawFileData && !!rawRawFileData.data ? rawRawFileData.data.map((t) => {
    return {...t};
  }) : [];

  const tempProjectData = getProjectDataList(projectName);
  const projectData = !!tempProjectData && !!tempProjectData.data ? tempProjectData.data.data.map((t) => {
    return {...t};
  }) : [];

  const dataCount = rawFileData.length;

  const selectProject = (e: string) => {
    setProjectName(e);
    setRawFileName('');
    setSelectedDataTableIndex(0);
    setSelectedAudio('');
    setSelectedLabel('');
    setSelectedComment('');
  };

  const selectRawFile = (fileName: string) => {
    setRawFileName(fileName);
    setSelectedDataTableIndex(0);
    setSelectedAudio('');
    setSelectedLabel('');
    setSelectedComment('');
  };

  useEffect(() => {
    if (selectedDataTableIndex == 0 && dataCount > 0) {
      setSelectedDataTableIndex(1);
      refreshSelection(0);
    }
  }, [rawFileData]);

  const saveAndRefreshData = async() => {
    if (selectedLabel == '')
    {
      alert('Label not chosen yet');
      return;
    }

    const params = {
      file_name: rawFileName,
      channel: selectedRawFileData.Channel,
      sequence_number: selectedRawFileData.Sequence_number,
      label: selectedLabel,
      comment: selectedComment,
    }

    let response: any = null;
    let errorMessage = '';

    if (selectedProjectData == null)
    {
      // Create
      response = await postProjectData(projectName, params);
    }
    else
    {
      // Update
      response = await updateProjectData(projectName, selectedProjectData.record_id, params);
    }

    if (response.error) {
      errorMessage = 'InternalServerError';
    }
    else if (response.data && response.data.error) {
      errorMessage = response.data.error.message;
    }

    if (errorMessage != '') {
      alert(errorMessage);
      return;
    }
    
    // Refresh
    // mutate(getAPIUrl('annotation', 'getProjectDetail', {projectName: projectName}));
    await mutate(getAPIUrl('annotation', 'getProjectDataList', {projectName: projectName}));

    // Go to next data
    if (selectedDataTableIndex < dataCount)
    {
      const nextDataIndex = selectedDataTableIndex + 1;
      setSelectedDataTableIndex(nextDataIndex);

      const dataIndex = nextDataIndex - 1;
      refreshSelection(dataIndex);
    }
  };

  const handleChangeLabel = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setSelectedLabel(value);
  };
  
  const handleChangeComment = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setSelectedComment(value);
  };

  const goToNextData = () => {
    if (selectedDataTableIndex < dataCount)
    {
      const nextDataIndex = selectedDataTableIndex + 1;
      setSelectedDataTableIndex(nextDataIndex);

      const dataIndex = nextDataIndex - 1;
      refreshSelection(dataIndex);
    }
  };

  const goToPrevData = () => {
    if (selectedDataTableIndex > 1)
    {
      const prevDataTableIndex = selectedDataTableIndex - 1;
      setSelectedDataTableIndex(prevDataTableIndex);

      const dataIndex = prevDataTableIndex - 1;
      refreshSelection(dataIndex);
    }
  };

  const handleSelection = (dataTableIndex: number) => {
    if (dataTableIndex >= 1 && dataTableIndex <= dataCount)
    {
      setSelectedDataTableIndex(dataTableIndex);

      const dataIndex = dataTableIndex - 1;
      refreshSelection(dataIndex);
    }
  };

  function refreshSelection(dataIndex: number) {
    const selectedRawFileData = rawFileData[dataIndex];
    setSelectedRawFileData(selectedRawFileData);

    const audioFileName = selectedRawFileData.FileName.replace(/^.*[\\\/]/, '');
    setSelectedAudio(audioFileName);

    const startTimeSpan = selectedRawFileData.Starting_time_of_the_talk;
    const startTimeSpanArr = startTimeSpan.split(':');
    const startTime = (parseFloat(startTimeSpanArr[0]) * 3600) + (parseFloat(startTimeSpanArr[1]) * 60) + parseFloat(startTimeSpanArr[2]);
    const endTimeSpan = selectedRawFileData.End_time_of_the_talk;
    const endTimeSpanArr = endTimeSpan.split(':');
    const endTime = (parseFloat(endTimeSpanArr[0]) * 3600) + (parseFloat(endTimeSpanArr[1]) * 60) + parseFloat(endTimeSpanArr[2]);

    setSelectedAudioStartTime(startTime);
    setSelectedAudioEndTime(endTime);

    const sequenceNumber = selectedRawFileData.Sequence_number;
    const channel = selectedRawFileData.Channel;

    const existingProjectDataList = projectData.filter(
      o => o.file_name === rawFileName
        && o.sequence_number === sequenceNumber
        && o.channel === channel
    );

    if (existingProjectDataList.length > 0)
    {
      const existingProjectData = existingProjectDataList.pop();

      setSelectedProjectData(existingProjectData);
      setSelectedLabel(existingProjectData ? existingProjectData.label : '');
      setSelectedComment(existingProjectData ? existingProjectData.comment : '');
    }
    else
    {
      setSelectedProjectData(null);
      setSelectedLabel('');
      setSelectedComment('');
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2 className={classes.headerItem}>Project:</h2>
        <select className={classes.customDropdown}
            onChange={(e) => selectProject(e.target.value)}
          >
          <option></option>
          {projectList && projectList.map(p => 
            (<option key={p.project_name} value={p.project_name}>{p.project_name}</option>)
          )} 
        </select>
        { projectName && rawFileList.length > 0 ? (
          <Button className={classes.headerItem}>
              Download
          </Button>
        ) : (
          <div></div>
        )}
      </div>
      { projectName && rawFileList.length > 0 ? (
        <div className={classes.content}>
          <div className={classes.rawFileListContainer}>
            <RawFileList
              rawFile={rawFileList}
              rawFileName={rawFileName}
              onSelect={selectRawFile}
            />
          </div>
          { rawFileData && rawFileData.length > 0 ? (
            <div className={classes.subcontent}>
              <div className={classes.annotateDataContainer}>
                <AnnotateData
                  projectName={projectName}
                  projectLabelList={projectLabelList}
                  selectedAudio={selectedAudio}
                  selectedAudioStartTime={selectedAudioStartTime}
                  selectedAudioEndTime={selectedAudioEndTime}
                  selectedLabel={selectedLabel}
                  selectedComment={selectedComment}
                  handleChangeLabel={handleChangeLabel}
                  handleChangeComment={handleChangeComment}
                  onClickSave={saveAndRefreshData}
                  onClickPrev={goToPrevData}
                  onClickNext={goToNextData}
                />
              </div>
              <div className={classes.annotationDataListContainer}>
                <AnnotationDataList
                  rawFileName={rawFileName}
                  rawFileData={rawFileData}
                  projectData={projectData}
                  selectedDataTableIndex={selectedDataTableIndex}
                  onSelect={handleSelection}
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

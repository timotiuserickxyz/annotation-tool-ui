import React, { useState } from 'react';
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
    minHeight: '100px',
    overflow: 'hidden',
    padding: '20px',
    backgroundColor: 'white',
    border: 'solid 1px lightGray',
    borderRadius: '5px',
  },
  annotateDataContainer: {
    width: '25%',
    float: 'left',
  },
  annotationDataContainer: {
    width: '75%',
    float: 'left',
  },
});

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const classes = useStyles();

  const [projectName, setProjectName] = useState<string>('');
  const [rawFileName, setRawFileName] = useState<string>('');
  const [selectedTableIndex, setSelectedTableIndex] = useState<number>(0);
  const [selectedAudio, setSelectedAudio] = useState<string>('');
  const [selectedAudioStartTime, setSelectedAudioStartTime] = useState<number>(0);
  const [selectedAudioEndTime, setSelectedAudioEndTime] = useState<number>(0);
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [selectedComment, setSelectedComment] = useState<string>('');
  const [selectedRawFileData, setSelectedRawFileData] = useState<any>(null);
  const [selectedProjectData, setSelectedProjectData] = useState<any>(null);

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

  const selectProject = async (e: string) => {
    setProjectName(e);
    setRawFileName('');
    setSelectedTableIndex(0);
    setSelectedAudio('');
    setSelectedLabel('');
    setSelectedComment('');
  };

  const selectRawFile = async (e: string) => {
    setRawFileName(e);
    setSelectedTableIndex(0);
    setSelectedAudio('');
    setSelectedLabel('');
    setSelectedComment('');
  };

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
      comment: selectedComment
    }

    if (selectedProjectData == null)
    {
      // Create
      await postProjectData(projectName, params);

      // setSelectedProjectData
    }
    else
    {
      // Update
      await updateProjectData(projectName, selectedProjectData.record_id, params);
    }
    
    // Refresh
    // mutate(getAPIUrl('annotation', 'getProjectDetail', {projectName: projectName}));
    await mutate(getAPIUrl('annotation', 'getProjectDataList', {projectName: projectName}));

    // Go to next data
    if (selectedTableIndex < dataCount)
    {
      const nextDataIndex = selectedTableIndex + 1;
      setSelectedTableIndex(nextDataIndex);

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
    if (selectedTableIndex < dataCount)
    {
      const nextDataIndex = selectedTableIndex + 1;
      setSelectedTableIndex(nextDataIndex);

      const dataIndex = nextDataIndex - 1;
      refreshSelection(dataIndex);
    }
  };

  const goToPrevData = () => {
    if (selectedTableIndex > 1)
    {
      const prevTableIndex = selectedTableIndex - 1;
      setSelectedTableIndex(prevTableIndex);

      const dataIndex = prevTableIndex - 1;
      refreshSelection(dataIndex);
    }
  };

  const handleSelection = (tableIndex: number) => {
    if (tableIndex >= 1 && tableIndex <= dataCount)
    {
      setSelectedTableIndex(tableIndex);

      const dataIndex = tableIndex - 1;
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
        <h2 className={classes.headerItem}>Source File:</h2>
        <select className={classes.customDropdown}
            onChange={(e) => selectRawFile(e.target.value)}
          >
          <option></option>
          {rawFileList && rawFileList.map(f => 
            (<option key={f.name} value={f.name}>{f.name}</option>)
          )} 
        </select>
      </div>
      { rawFileData && rawFileData.length > 0 ? (
        <div className={classes.content}>
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
          <div className={classes.annotationDataContainer}>
            <AnnotationData
              rawFileName={rawFileName}
              rawFileData={rawFileData}
              projectData={projectData}
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

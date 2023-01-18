import React, { useState, useEffect } from 'react';
import { mutate } from 'swr';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOff from '@material-ui/icons/HighlightOff';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { getAPIUrl } from '../../../utils/path';
import { getProjectList } from '../../../api/annotation/getProjectList';
import { getRawFileList } from '../../../api/annotation/getRawFileList';
import { getProjectDetail } from '../../../api/annotation/getProjectDetail';
import { getRawFileDataList } from '../../../api/annotation/getRawFileDataList';
import { getProjectDataList } from '../../../api/annotation/getProjectDataList';
import { postProjectData } from '../../../api/annotation/postProjectData';
import { putProjectData } from '../../../api/annotation/putProjectData';
import { deleteProjectData } from '../../../api/annotation/deleteProjectData';
import { clearProjectData } from '../../../api/annotation/clearProjectData';
import { downloadProjectData } from '../../../api/annotation/downloadProjectData';

import { DashboardRawFileList } from '../../base/Annotation/DashboardRawFileList';
import { AnnotateData } from '../../base/Annotation/AnnotateData';
import { AnnotationDataList } from '../../base/Annotation/AnnotationDataList';

import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
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
    marginRight: '10px',
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
  explanationContainer: {
    position: 'relative',
    top: '0',
    left: '15%',
    width: '85%',
    height: '100%',
    zIndex: 100,
    backgroundColor: 'white',
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

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const [showExplanation, setShowExplanation] = useState<boolean>(true);
  const [selectedProjectName, setSelectedProjectName] = useState<string>('');
  const [selectedRawFileIndex, setSelectedRawFileIndex] = useState<number>(-1);

  const [selectedDataTableIndex, setSelectedDataTableIndex] = useState<number>(0);
  const [selectedRawFileData, setSelectedRawFileData] = useState<any>(null);
  const [selectedAudio, setSelectedAudio] = useState<string>('');
  const [selectedAudioStartTime, setSelectedAudioStartTime] = useState<number>(0);
  const [selectedAudioEndTime, setSelectedAudioEndTime] = useState<number>(0);
  const [selectedProjectData, setSelectedProjectData] = useState<any>(null);
  
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [selectedComment, setSelectedComment] = useState<string>('');

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [openDeleteProjectDataModal, setOpenDeleteProjectDataModal] = useState<boolean>(false);
  const handleCloseDeleteProjectDataModal = () => setOpenDeleteProjectDataModal(false);

  const [openClearProjectDataModal, setOpenClearProjectDataModal] = useState<boolean>(false);
  const handleCloseClearProjectDataModal = () => setOpenClearProjectDataModal(false);

  const tempProjectList = getProjectList();
  const projectList = !!tempProjectList.data ? tempProjectList.data.projects.map((t) => {
    return {...t};
  }) : [];

  const tempProjectDetail = getProjectDetail(selectedProjectName);
  const selectedProjectDescription = !!tempProjectDetail && !!tempProjectDetail.data ? tempProjectDetail.data.description : [];
  const selectedProjectChunkingType = !!tempProjectDetail && !!tempProjectDetail.data ? tempProjectDetail.data.chunking_type : [];
  const selectedProjectLabelList = !!tempProjectDetail && !!tempProjectDetail.data ? tempProjectDetail.data.label_option : [];
  const rawFileFolderPath = !!tempProjectDetail && !!tempProjectDetail.data ? tempProjectDetail.data.raw_source_path : '';
  const rawFileFolderName = (!!rawFileFolderPath ? rawFileFolderPath.split('/').pop() : '') as string;

  const tempRawFileList = getRawFileList(rawFileFolderName);
  const rawFileList = !!tempRawFileList && !!tempRawFileList.data ? tempRawFileList.data.files.map((t, id) => {
    return {id: id, ...t};
  }) : [];

  const rawRawFileData = getRawFileDataList(rawFileFolderName, selectedRawFileIndex >= 0 ? rawFileList[selectedRawFileIndex].name : '');
  const rawFileData = !!rawRawFileData && !!rawRawFileData.data && Array.isArray(rawRawFileData.data) ? rawRawFileData.data.map((t) => {
    return {...t};
  }) : [];

  const tempProjectData = getProjectDataList(selectedProjectName);
  const projectData = !!tempProjectData && !!tempProjectData.data ? tempProjectData.data.data.map((t) => {
    return {...t};
  }) : [];

  const dataCount = rawFileData.length;

  const selectProject = (e: string) => {
    setShowExplanation(true);
    setSelectedProjectName(e);
    setSelectedRawFileIndex(-1);
    setSelectedDataTableIndex(0);
    setSelectedAudio('');
    setSelectedLabel('');
    setSelectedComment('');
  };

  const selectRawFile = (index: number) => {
    if (index != -1)
    {
      setShowExplanation(false);
    }
    
    setSelectedRawFileIndex(index);
    setSelectedDataTableIndex(0);
    setSelectedAudio('');
    setSelectedLabel('');
    setSelectedComment('');
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  }

  const handleHideExplanation = () => {
    setShowExplanation(false);
  }

  useEffect(() => {
    if (selectedDataTableIndex == 0 && dataCount > 0) {
      setSelectedDataTableIndex(1);
      refreshSelection(0);
    }
  }, [rawFileData]);

  useEffect(() => {
    if (isSaving == true
      && selectedProjectName != ''
      && selectedRawFileIndex != -1
      && selectedRawFileData
      && projectData && projectData.length > 0
    ) {
      const dataIndex = selectedDataTableIndex - 1;
      refreshSelection(dataIndex);

      setIsSaving(false);
    }
  }, [isSaving]);

  const saveAndRefreshData = async() => {
    if (selectedLabel == '')
    {
      setSnackbarMessage('Label not chosen yet');
      setOpenSnackbar(true);
      return;
    }

    const params = {
      file_name: rawFileList[selectedRawFileIndex].name,
      channel: selectedProjectChunkingType == 'Talk Unit' ? selectedRawFileData.Channel : 0,
      sequence_number: selectedProjectChunkingType == 'Talk Unit' ? selectedRawFileData.Sequence_number : -1,
      label: selectedLabel,
      comment: selectedComment,
    }

    let response: any = null;
    let errorMessage = '';

    if (selectedProjectData == null)
    {
      // Create
      response = await postProjectData(selectedProjectName, params);
    }
    else
    {
      // Update
      response = await putProjectData(selectedProjectName, selectedProjectData.record_id, params);
    }

    if (response.error) {
      errorMessage = 'InternalServerError';
    }
    else if (response.data && response.data.error) {
      errorMessage = response.data.error.message;
    }

    if (errorMessage != '') {
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
      return;
    }
    
    // Refresh
    // mutate(getAPIUrl('annotation', 'getProjectDetail', {projectName: selectedProjectName}));
    await mutate(getAPIUrl('annotation', 'getProjectDataList', {projectName: selectedProjectName}));

    setSnackbarMessage('Saving successful');
    setOpenSnackbar(true);

    setIsSaving(true);
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
      if (selectedLabel == '')
      {
        setSnackbarMessage('Label not chosen yet');
        setOpenSnackbar(true);
        return;
      }

      saveAndRefreshData();

      const nextDataTableIndex = selectedDataTableIndex + 1;
      setSelectedDataTableIndex(nextDataTableIndex);

      const dataIndex = nextDataTableIndex - 1;
      refreshSelection(dataIndex);
    }
  };

  const goToPrevData = () => {
    if (selectedDataTableIndex > 1)
    {
      if (selectedLabel == '')
      {
        setSnackbarMessage('Label not chosen yet');
        setOpenSnackbar(true);
        return;
      }
      
      saveAndRefreshData();
      
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

    if (selectedProjectChunkingType == 'Whole Wav')
    {
      const existingProjectDataList: any[] = projectData.filter(
        o => o.file_name === rawFileList[selectedRawFileIndex].name
          && o.sequence_number === -1
      );
  
      if (existingProjectDataList.length > 0)
      {
        const existingProjectData = existingProjectDataList.pop();
  
        setSelectedProjectData(existingProjectData ? existingProjectData : null);
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
    else if (selectedProjectChunkingType == 'Talk Unit')
    {
      const existingProjectDataList = projectData.filter(
        o => o.file_name === rawFileList[selectedRawFileIndex].name
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
    else
    {
      setSelectedProjectData(null);
      setSelectedLabel('');
      setSelectedComment('');
    }
  }

  const prepareDeleteProjectData = () => {
    if (selectedProjectData == null)
    {
      setSnackbarMessage('Row not annotated yet');
      setOpenSnackbar(true);
      return;
    }

    setOpenDeleteProjectDataModal(true);
  };

  const deleteProjectDataAndRefresh = async () => {
    let errorMessage = '';

    const response = await deleteProjectData(selectedProjectName, selectedProjectData.record_id);

    if (response.error) {
      errorMessage = 'InternalServerError';
    }
    else if (response.data && response.data.error) {
      errorMessage = response.data.error.message;
    }

    if (errorMessage != '') {
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
      return;
    }
    
    // Refresh
    await mutate(getAPIUrl('annotation', 'getProjectDataList', {projectName: selectedProjectName}));

    setOpenDeleteProjectDataModal(false);
    setSnackbarMessage('Delete project data successful');
    setOpenSnackbar(true);

    setIsSaving(true);
  };

  const prepareClearProjectData = () => {
    setOpenClearProjectDataModal(true);
  };

  const clearProjectDataAndRefresh = async () => {
    let errorMessage = '';

    const response = await clearProjectData(selectedProjectName, rawFileList[selectedRawFileIndex].name);

    if (response.error) {
      errorMessage = 'InternalServerError';
    }
    else if (response.data && response.data.error) {
      errorMessage = response.data.error.message;
    }

    if (errorMessage != '') {
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
      return;
    }
    
    // Refresh
    await mutate(getAPIUrl('annotation', 'getProjectDataList', {projectName: selectedProjectName}));

    setOpenClearProjectDataModal(false);
    setSnackbarMessage('Delete project data successful');
    setOpenSnackbar(true);

    setIsSaving(true);
  };

  const handleDownload = () => {
    downloadProjectData(selectedProjectName);
  };

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
        { selectedProjectName && rawFileList.length > 0 ? (
          <div>
            <IconButton onClick={handleShowExplanation} className={classes.headerItem} aria-label="Explanation" style={{padding: '5px', color: 'gray', marginLeft: '-5px'}}>
              <ErrorOutlineIcon />
            </IconButton>
            <Button variant="contained" className={classes.headerItem} onClick={handleDownload}>
                Download
            </Button>
          </div>
        ) : (
          <span>Please select a project for your annotation work</span>
        )}
      </div>
      { selectedProjectName && rawFileList.length > 0 ? (
        <div className={classes.content}>
          <div className={classes.rawFileListContainer}>
            <DashboardRawFileList
              rawFileList={rawFileList}
              selectedRawFileIndex={selectedRawFileIndex}
              onSelect={selectRawFile}
            />
          </div>

          { rawFileData && rawFileData.length > 0 ? (
            <div className={classes.subcontent}>
              <div className={classes.annotateDataContainer}>
                <AnnotateData
                  selectedProjectName={selectedProjectName}
                  selectedProjectLabelList={selectedProjectLabelList}
                  isWholeWav={selectedProjectChunkingType === 'Whole Wav'}
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
                  onClickDelete={prepareDeleteProjectData}
                  onClickClear={prepareClearProjectData}
                />
              </div>
              <div className={classes.annotationDataListContainer}>
                <AnnotationDataList
                  rawFileData={rawFileData}
                  projectData={projectData.filter(
                    o => o.file_name === rawFileList[selectedRawFileIndex].name
                  )}
                  selectedDataTableIndex={selectedDataTableIndex}
                  onSelect={handleSelection}
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}

          { showExplanation == true ? (
            <div className={classes.explanationContainer}>
              <div style={{position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}>
                <span style={{width: '100%', marginTop: '-100px', textAlign: 'center', whiteSpace: 'pre-line'}}>
                  {selectedProjectDescription}
                </span>
              </div>
              <IconButton onClick={handleHideExplanation} aria-label="Close" style={{position: 'absolute', top: '10px', right: '10px', padding: '5px', color: 'gray'}}>
                <HighlightOff />
              </IconButton>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      
      <Dialog open={openDeleteProjectDataModal} onClose={handleCloseDeleteProjectDataModal}>
        <DialogTitle>Delete Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this annotation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteProjectDataModal}>Cancel</Button>
          <Button onClick={deleteProjectDataAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openClearProjectDataModal} onClose={handleCloseClearProjectDataModal}>
        <DialogTitle>Clear Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to clear all annotation from project "{selectedProjectName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClearProjectDataModal}>Cancel</Button>
          <Button onClick={clearProjectDataAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </div>
  );
};

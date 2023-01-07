import React, { useState, useEffect } from 'react';
import { mutate } from 'swr';
import { makeStyles } from '@material-ui/core/styles';

import { getAPIUrl } from '../../../utils/path';
import { getProjectList } from '../../../api/annotation/getProjectList';
import { getRawFolderList } from '../../../api/annotation/getRawFolderList';
import { getWavFolderList } from '../../../api/annotation/getWavFolderList';
import { postProject } from '../../../api/annotation/postProject';
import { putProject } from '../../../api/annotation/putProject';
import { deleteProject } from '../../../api/annotation/deleteProject';
import { postProjectLabel } from '../../../api/annotation/postProjectLabel';
import { deleteProjectLabel } from '../../../api/annotation/deleteProjectLabel';

import { AnnotationProjects } from '../../base/Annotation/AnnotationProjects';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';


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
  customTextbox: {
    float: 'left',
    marginRight: '30px',
    textAlign: 'left',
    paddingLeft: '10px',
    paddingRight: '10px',
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
    padding: '20px',
    backgroundColor: 'white',
    border: 'solid 1px lightGray',
    borderRadius: '5px',
  },
  modalContent: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: '24',
    p: '4',
  }
});

interface Props {}

export const Settings: React.FC<Props> = () => {
  const classes = useStyles();

  const [projectName, setProjectName] = useState<string>('');
  const [rawFolderName, setRawFolderName] = useState<string>('');
  const [wavFolderName, setWavFolderName] = useState<string>('');
  const [createdProjectName, setCreatedProjectName] = useState<string>('');

  const [selectedProjectName, setSelectedProjectName] = useState<string>('');
  const [newProjectLabel, setNewProjectLabel] = useState<string>('');

  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const tempProjectList = getProjectList();
  const projectList = !!tempProjectList.data ? tempProjectList.data.configs.map((t) => {
    return {...t};
  }) : [];

  const tempRawFolderList = getRawFolderList();
  const rawFolderList = !!tempRawFolderList.data ? tempRawFolderList.data.directories.map((t) => {
    return {...t};
  }) : [];

  const tempWavFolderList = getWavFolderList();
  const wavFolderList = !!tempWavFolderList.data ? tempWavFolderList.data.directories.map((t) => {
    return {...t};
  }) : [];

  useEffect(() => {
    const updateAndRefreshProject = async () => {
        const params = {
            raw_source: rawFolderName,
            wav_source: wavFolderName,
        }
    
        let errorMessage = '';
    
        const response = await putProject(projectName, params);
    
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
        await mutate(getAPIUrl('annotation', 'getProjectList'));

        setProjectName('');
        setRawFolderName('');
        setWavFolderName('');
        setCreatedProjectName('');
    }
    
    if (createdProjectName != '')
    {
        updateAndRefreshProject();
    }

  }, [createdProjectName]);

  const save = async() => {
    if (projectName == '')
    {
      alert('Project name is empty');
      return;
    }
    else if (rawFolderName == '')
    {
      alert('Source folder not chosen yet');
      return;
    }
    else if (wavFolderName == '')
    {
      alert('Wav folder not chosen yet');
      return;
    }

    const params = {
        project_name: projectName,
    }

    let errorMessage = '';

    const response = await postProject(params);

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

    setCreatedProjectName(projectName);
  };

  const deleteProjectAndRefreshProject = async (targetProjectName: string) => {
    if (confirm('Are you sure to delete project: ' + targetProjectName + '?') == false)
    {
      return;
    }

    const params = {
        names: [
            targetProjectName
        ]
    }

    let errorMessage = '';

    const response = await deleteProject(params);

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
    await mutate(getAPIUrl('annotation', 'getProjectList'));
  };

  const deleteLabelAndRefreshProject = async (targetProjectName: string, targetLabelName: string) => {
    if (confirm('Are you sure to delete label: ' + targetLabelName + ' from project ' + targetProjectName + '?') == false)
    {
      return;
    }

    const params = {
        label_option: targetLabelName
    }

    let errorMessage = '';

    const response = await deleteProjectLabel(targetProjectName, params);

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
    await mutate(getAPIUrl('annotation', 'getProjectList'));
  };

  const prepareCreateNewLabel = async (targetProjectName: string) => {
    setSelectedProjectName(targetProjectName);
    setNewProjectLabel('');
    setOpenModal(true);
  };

  const createNewLabelAndRefresh = async() => {
    if (selectedProjectName == '')
    {
      alert('Selected project is empty');
      return;
    }
    else if (newProjectLabel == '')
    {
      alert('New label is empty');
      return;
    }

    const params = {
        label_option: newProjectLabel,
    }

    let errorMessage = '';

    const response = await postProjectLabel(selectedProjectName, params);

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
    await mutate(getAPIUrl('annotation', 'getProjectList'));

    setOpenModal(false);
  };

  const changeProjectName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setProjectName(value);
  };

  const selectRawFolder = async (e: string) => {
    setRawFolderName(e);
  };

  const selectWavFolder = async (e: string) => {
    setWavFolderName(e);
  };

  const changeNewProjectLabel = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setNewProjectLabel(value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2 className={classes.headerItem}>Project Name:</h2>
        <input type="text" className={classes.customTextbox}
            value={projectName} onChange={changeProjectName}
        />
        <h2 className={classes.headerItem}>Source Folder:</h2>
        <select className={classes.customDropdown}
            value={rawFolderName}
            onChange={(e) => selectRawFolder(e.target.value)}
          >
          <option></option>
          {rawFolderList && rawFolderList.map(f => 
            (<option key={f.name} value={f.name}>{f.name}</option>)
          )} 
        </select>
        <h2 className={classes.headerItem}>Wav Folder:</h2>
        <select className={classes.customDropdown}
            value={wavFolderName}
            onChange={(e) => selectWavFolder(e.target.value)}
          >
          <option></option>
          {wavFolderList && wavFolderList.map(f => 
            (<option key={f.name} value={f.name}>{f.name}</option>)
          )} 
        </select>
        <Button className={classes.headerItem} onClick={save}>
            Create New
        </Button>
      </div>
      <div className={classes.content}>
        <AnnotationProjects
            projects={projectList}
            onClickDeleteProject={deleteProjectAndRefreshProject}
            onClickDeleteLabel={deleteLabelAndRefreshProject}
            onClickCreateLabel={prepareCreateNewLabel}
        />
      </div>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Create New Label</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            autoFocus
            value={newProjectLabel}
            onChange={changeNewProjectLabel}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={createNewLabelAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

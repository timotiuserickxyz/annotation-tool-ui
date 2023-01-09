import React, { useState } from 'react';
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

import { AnnotationProjectList } from '../../base/Annotation/AnnotationProjectList';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  customForm: {
    width: '100%',
    marginTop: '-15px',
    marginBottom: '20px',
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
});

interface Props {}

export const Settings: React.FC<Props> = () => {
  const classes = useStyles();

  const [newProjectName, setNewProjectName] = useState<string>('');
  const [newRawFolderName, setNewRawFolderName] = useState<string>('');
  const [newWavFolderName, setNewWavFolderName] = useState<string>('');

  const [selectedProjectName, setSelectedProjectName] = useState<string>('');
  const [newProjectLabel, setNewProjectLabel] = useState<string>('');

  const [openCreateProjectModal, setOpenCreateProjectModal] = useState<boolean>(false);
  const handleCloseCreateProjectModal = () => setOpenCreateProjectModal(false);

  const [openEditProjectModal, setOpenEditProjectModal] = useState<boolean>(false);
  const handleCloseEditProjectModal = () => setOpenEditProjectModal(false);

  const [openLabelModal, setOpenLabelModal] = useState<boolean>(false);
  const handleCloseLabelModal = () => setOpenLabelModal(false);

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

  const initializeAllInputs = () => {
    setNewProjectName('');
    setNewRawFolderName('');
    setNewWavFolderName('');
    setSelectedProjectName('');
    setNewProjectLabel('');
  };

  const prepareCreateProject = () => {
    initializeAllInputs();
    setOpenCreateProjectModal(true);
  };

  const prepareEditProject = (targetProjectName: string, targetProjectRawFolderName: string, targetProjectWavFolderName: string) => {
    initializeAllInputs();
    setNewRawFolderName(targetProjectRawFolderName);
    setNewWavFolderName(targetProjectWavFolderName);
    setSelectedProjectName(targetProjectName);
    setOpenEditProjectModal(true);
  };

  const createProjectAndRefresh = async() => {
    if (newProjectName == '')
    {
      alert('Project name is empty');
      return;
    }
    else if (newRawFolderName == '')
    {
      alert('Source folder not chosen yet');
      return;
    }
    else if (newWavFolderName == '')
    {
      alert('Wav folder not chosen yet');
      return;
    }

    // Create new project
    const params1 = {
      project_name: newProjectName,
    }

    let createProjectErrorMessage = '';

    const createProjectResponse = await postProject(params1);

    if (createProjectResponse.error) {
      createProjectErrorMessage = 'InternalServerError';
    }
    else if (createProjectResponse.data && createProjectResponse.data.error) {
      createProjectErrorMessage = createProjectResponse.data.error.message;
    }

    if (createProjectErrorMessage != '') {
      alert(createProjectErrorMessage);
      return;
    }

    // Edit the project
    const params2 = {
      raw_source: newRawFolderName,
      wav_source: newWavFolderName,
    }

    let editProjectErrorMessage = '';

    const editProjectResponse = await putProject(newProjectName, params2);

    if (editProjectResponse.error) {
      editProjectErrorMessage = 'InternalServerError';
    }
    else if (editProjectResponse.data && editProjectResponse.data.error) {
      editProjectErrorMessage = editProjectResponse.data.error.message;
    }

    if (editProjectErrorMessage != '') {
      alert(editProjectErrorMessage);
      return;
    }

    // Refresh
    await mutate(getAPIUrl('annotation', 'getProjectList'));

    initializeAllInputs();

    setOpenCreateProjectModal(false);
  };

  const editProjectAndRefresh = async() => {
    if (selectedProjectName == '')
    {
      alert('Project not selected yet');
      return;
    }
    else if (newRawFolderName == '')
    {
      alert('Source folder not chosen yet');
      return;
    }
    else if (newWavFolderName == '')
    {
      alert('Wav folder not chosen yet');
      return;
    }

    // Edit the project
    const params = {
      raw_source: newRawFolderName,
      wav_source: newWavFolderName,
    }

    let editProjectErrorMessage = '';

    const editProjectResponse = await putProject(selectedProjectName, params);

    if (editProjectResponse.error) {
      editProjectErrorMessage = 'InternalServerError';
    }
    else if (editProjectResponse.data && editProjectResponse.data.error) {
      editProjectErrorMessage = editProjectResponse.data.error.message;
    }

    if (editProjectErrorMessage != '') {
      alert(editProjectErrorMessage);
      return;
    }

    // Refresh
    await mutate(getAPIUrl('annotation', 'getProjectList'));

    initializeAllInputs();

    setOpenEditProjectModal(false);
  };

  const deleteProjectAndRefreshProject = async (targetProjectName: string) => {
    if (confirm('Are you sure to delete project "' + targetProjectName + '"?') == false)
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

  const prepareCreateLabel = (targetProjectName: string) => {
    initializeAllInputs();
    setSelectedProjectName(targetProjectName);
    setOpenLabelModal(true);
  };

  const createLabelAndRefresh = async() => {
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

    setOpenLabelModal(false);
  };

  const deleteLabelAndRefreshProject = async (targetProjectName: string, targetLabelName: string) => {
    if (confirm('Are you sure to delete label "' + targetLabelName + '" from project "' + targetProjectName + '"?') == false)
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

  const changeNewProjectName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setNewProjectName(value);
  };

  const selectNewRawFolder = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setNewRawFolderName(value);
  };

  const selectNewWavFolder = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setNewWavFolderName(value);
  };

  const changeNewProjectLabel = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setNewProjectLabel(value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Button className={classes.headerItem} onClick={prepareCreateProject}>
            Create New
        </Button>
      </div>
      <div className={classes.content}>
        <AnnotationProjectList
            projects={projectList}
            onClickEditProject={prepareEditProject}
            onClickDeleteProject={deleteProjectAndRefreshProject}
            onClickDeleteLabel={deleteLabelAndRefreshProject}
            onClickCreateLabel={prepareCreateLabel}
        />
      </div>
      <Dialog open={openCreateProjectModal} onClose={handleCloseCreateProjectModal}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Project Name
          </DialogContentText>
          <TextField
            className={classes.customForm}
            autoFocus={true}
            value={newProjectName}
            onChange={changeNewProjectName}
          />
          <br/>
          <DialogContentText>
            Source Folder
          </DialogContentText>
          <Select
            className={classes.customForm}
            value={newRawFolderName}
            onChange={selectNewRawFolder}
          >
            <MenuItem></MenuItem>
            {rawFolderList && rawFolderList.map(f => 
              (<MenuItem value={f.name}>{f.name}</MenuItem>)
            )} 
          </Select>
          <br/>
          <DialogContentText>
            Wav Folder
          </DialogContentText>
          <Select
            className={classes.customForm}
            value={newWavFolderName}
            onChange={selectNewWavFolder}
          >
            <MenuItem></MenuItem>
            {wavFolderList && wavFolderList.map(f => 
              (<MenuItem value={f.name}>{f.name}</MenuItem>)
            )} 
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateProjectModal}>Cancel</Button>
          <Button onClick={createProjectAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openEditProjectModal} onClose={handleCloseEditProjectModal}>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Project Name
          </DialogContentText>
          <TextField
            className={classes.customForm}
            autoFocus={true}
            value={selectedProjectName}
            disabled={true}
          />
          <br/>
          <DialogContentText>
            Source Folder
          </DialogContentText>
          <Select
            className={classes.customForm}
            value={newRawFolderName}
            onChange={selectNewRawFolder}
          >
            <MenuItem></MenuItem>
            {rawFolderList && rawFolderList.map(f => 
              (<MenuItem value={f.name}>{f.name}</MenuItem>)
            )} 
          </Select>
          <br/>
          <DialogContentText>
            Wav Folder
          </DialogContentText>
          <Select
            className={classes.customForm}
            value={newWavFolderName}
            onChange={selectNewWavFolder}
          >
            <MenuItem></MenuItem>
            {wavFolderList && wavFolderList.map(f => 
              (<MenuItem value={f.name}>{f.name}</MenuItem>)
            )} 
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditProjectModal}>Cancel</Button>
          <Button onClick={editProjectAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openLabelModal} onClose={handleCloseLabelModal}>
        <DialogTitle>Create New Label</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            className={classes.customForm}
            autoFocus={true}
            value={newProjectLabel}
            onChange={changeNewProjectLabel}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLabelModal}>Cancel</Button>
          <Button onClick={createLabelAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

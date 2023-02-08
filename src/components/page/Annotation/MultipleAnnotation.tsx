import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { getProjectList } from '../../../api/annotation/getProjectList';
import { getProjectAggregatedData } from '../../../api/annotation/getProjectAggregatedData';
import { downloadProjectAggregatedData } from '../../../api/annotation/downloadProjectAggregatedData';
import { exportProjectAggregatedData } from '../../../api/annotation/exportProjectAggregatedData';

import { MultipleAnnotationDataList } from '../../base/Annotation/MultipleAnnotationDataList';

import {
  Button,
  TextField,
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
    height: '40px',
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
  graphContainer: {
    width: '0%',
    height: '100%',
    float: 'left',
  },
  subcontent: {
    width: '100%',
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
  multipleAnnotationDataListContainer: {
    width: '100%',
    height: '100%',
    float: 'left',
  },
});

interface Props {}

export const MultipleAnnotation: React.FC<Props> = () => {
  const classes = useStyles();

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const tempProjectName = typeof window !== 'undefined' ? localStorage.getItem('reviewed_project_name') : '';

  const [selectedProjectName, setSelectedProjectName] = useState<string>(tempProjectName ? tempProjectName : '');
  const [tempThresholdAgreementLevel, setTempThresholdAgreementLevel] = useState<string>('');
  const [finalThresholdAgreementLevel, setFinalThresholdAgreementLevel] = useState<string>('');

  const tempProjectList = getProjectList();
  const projectList = tempProjectList.data && tempProjectList.data.projects ? tempProjectList.data.projects.map((t) => {
    return {...t};
  }) : [];

  const tempProjectAggregatedData = getProjectAggregatedData(selectedProjectName, finalThresholdAgreementLevel);
  const projectDetail = tempProjectAggregatedData && tempProjectAggregatedData.data ? tempProjectAggregatedData.data : null;
  const projectAggregatedData = tempProjectAggregatedData && tempProjectAggregatedData.data && tempProjectAggregatedData.data.data ? tempProjectAggregatedData.data.data.map((t, id) => {
    return {id: (id + 1), ...t};
  }) : [];
  
  useEffect(() => {
    if (projectDetail && tempThresholdAgreementLevel != projectDetail.threshold_agreement_level.toString()) {
      if (projectDetail.threshold_agreement_level.toString() != null && projectDetail.threshold_agreement_level.toString() != 'null') {
        setTempThresholdAgreementLevel(projectDetail ? projectDetail.threshold_agreement_level.toString() : '');
      }
    }
  }, [projectDetail]);

  const selectProject = (e: string) => {
    setSelectedProjectName(e);

    localStorage.setItem('reviewed_project_name', e);
  };

  const handleChangeThreshold = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setTempThresholdAgreementLevel(value);
  };

  const handleFilter = async () => {
    setSnackbarMessage('Filtering by threshold...');
    setFinalThresholdAgreementLevel(tempThresholdAgreementLevel);
    setOpenSnackbar(true);
  };

  const handleDownload = () => {
    downloadProjectAggregatedData(selectedProjectName);
  };

  const handleExport = async () => {
    let errorMessage = '';

    const response = await exportProjectAggregatedData(selectedProjectName);

    if (response.error) {
      errorMessage = response.error;
    }
    else if (response.data && response.data.error) {
      errorMessage = response.data.error.message;
    }

    if (errorMessage != '') {
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
      return;
    }

    setSnackbarMessage('Export project data successful');
    setOpenSnackbar(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2 className={classes.headerItem}>Project:</h2>
        <select className={classes.customDropdown}
          value={selectedProjectName}
          onChange={(e) => selectProject(e.target.value)}
        >
          <option></option>
          {projectList && projectList.map(p => 
            (<option key={p.project_name} value={p.project_name}>{p.project_name}</option>)
          )} 
        </select>
        
        { projectList.length > 0 && selectedProjectName != '' && projectAggregatedData.length > 0 ? (
          <div>
            <TextField
              variant="outlined"
              label="Threshold for agreement level"
              size="small"
              className={classes.headerItem}
              style={{width: '250px'}}
              InputLabelProps={{
                style: {fontSize: 15}
              }}
              autoFocus={true}
              value={tempThresholdAgreementLevel}
              onChange={handleChangeThreshold}
            />
            <Button variant="contained" className={classes.headerItem} onClick={handleFilter}>
                Save Threshold
            </Button>
            <Button variant="contained" className={classes.headerItem} onClick={handleDownload}>
                Download
            </Button>
            <Button variant="contained" className={classes.headerItem} onClick={handleExport}>
                Export to AutoML
            </Button>
          </div>
        ) : (
          [ projectList.length > 0 && selectedProjectName != '' && projectAggregatedData.length <= 0 ? (
            <div  style={{alignItems: 'center', display: 'flex'}}>
              <TextField
                variant="outlined"
                label="Threshold for agreement level"
                size="small"
                className={classes.headerItem}
                style={{width: '250px'}}
                InputLabelProps={{
                  style: {fontSize: 15}
                }}
                autoFocus={true}
                value={tempThresholdAgreementLevel}
                onChange={handleChangeThreshold}
              />
              <Button variant="contained" className={classes.headerItem} onClick={handleFilter}>
                  Save Threshold
              </Button>
              <span>Selected project does not have any data</span>
            </div>
          ) : (
            [ projectList.length > 0 && selectedProjectName == '' ? (
                <span>Please select a project for your annotation work</span>
              ) : (
                <span>Project not found</span>
              )
            ]
          )]
        )}
      </div>
      { selectedProjectName && projectAggregatedData.length > 0 ? (
        <div className={classes.content}>
          <div className={classes.graphContainer}>
            
          </div>
          <div className={classes.subcontent}>
            <div className={classes.multipleAnnotationDataListContainer}>
              <MultipleAnnotationDataList
                projectAggregatedData={projectAggregatedData}
              />
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      
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

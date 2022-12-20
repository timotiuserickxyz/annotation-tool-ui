import React, { useEffect } from 'react';
import { useSetState } from 'react-use';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';

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

  let refreshCount = 0;

  // const [states, setStates] = useSetState({
  //   projectName: "Project1",
  //   projectDataCount: fetchedData.length,
  //   selectedDataIndex: 2,
  //   selectedAudio: '',
  // });

  // const { data } = getDummyUserList();
  // if (!data) return (<div>loading</div>);

  // const fetchedData = !!data ? data.map((t) => {
  //   return {...t};
  // }) : [];

  const [states, setStates] = useSetState({
    projectName: '',
    projectData: null as any,
    projectDataCount: 0,
    selectedDataIndex: 0,
    selectedAudio: '',
  });

  // useEffect(() => {

    
  // }, [refreshCount]);

  // const rawData = getDummyUserList();
  // const fetchedData = !!rawData.data ? rawData.data.map((t) => {
  //     return {...t};
  //   }) : [];

  // function refreshData() {
  //   const newRawData = getDummyUserList();
  //   const newFetchedData = !!newRawData.data ? newRawData.data.map((t) => {
  //     return {...t};
  //   }) : [];

  //   setStates({
  //     projectData: newFetchedData,
  //     projectDataCount: newFetchedData ? newFetchedData.length : 0,
  //     selectedDataIndex: newFetchedData ? 1 : 0
  //   });
  // };

  

  // const saveAndRefreshData = () => {
  //   // Save
  //   console.log('fetching... ');
  //   // Refresh
  //   let { data } = getDummyUserList();
  //   console.log('mapping... ');
  //   let fetchedData = () => {
  //     !!data ? data.map((t) => {
  //       return {...t};
  //     }) : [];
  //   } 
  //   console.log('stating... ');

  //   console.log('projectName: ' + states.projectName);
  //   console.log('selectedDataIndex: ' + states.selectedDataIndex);

  //   setStates({
  //         projectData: fetchedData,
  //         projectDataCount: fetchedData.length,
  //         selectedDataIndex: (fetchedData.length) > 0 ? 1 : 0,
  //       });
  // };

  const goToPrevData = () => {
    const prevDataIndex = states.selectedDataIndex - 1;
    setStates({
      projectName: 'Project' + prevDataIndex,
      selectedDataIndex: prevDataIndex
    });
  };

  const goToNextData = () => {
    const nextDataIndex = states.selectedDataIndex + 1;
    setStates({
      projectName: 'Project' + nextDataIndex,
      selectedDataIndex: nextDataIndex
    });
  };

  const handleSelection = (id: number, audioPath: string) => {
    setStates({
      projectName: 'Project' + id,
      selectedDataIndex: id,
      selectedAudio: audioPath
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
      </div>
      <br/>
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
    </div>
  );
};

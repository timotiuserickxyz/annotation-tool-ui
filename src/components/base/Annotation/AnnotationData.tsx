import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
// import { Radio } from '@material-ui/core';

const useStyles = makeStyles({
  customTable: {
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
  }
});

export type BaseRow = {
  id: string | number;
  tableData?: {id: string | number, checked: boolean | undefined};
};

type Row = BaseRow & {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type Props = {
  rawFileName: string,
  rawFileData: any[],
  projectData: any[],
  selectedTableIndex: number,
  onSelect: (tableIndex: number) => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const AnnotationData: Component = ({ rawFileName, rawFileData, projectData, selectedTableIndex, onSelect }) => {
  const classes = useStyles();

  if (rawFileData.length > 0 && selectedTableIndex == 0)
  {
    selectedTableIndex = 1;
  }
  else if (rawFileData.length <= 0)
  {
    return (<div></div>);
  }

  const rows: Row[] = !!rawFileData
  ? rawFileData.map((t) => {
      return {...t};
    })
  : [];

  function getLabelFromProject(params: any) {
    const filteredProjectData = projectData.filter(o =>
      o.file_name === rawFileName
      && o.sequence_number === params.row.Sequence_number
      && o.channel === params.row.Channel
    );

    if (filteredProjectData.length > 0)
    {
      const existingProjectData = filteredProjectData.pop();
      return existingProjectData.label;
    }
    
    return '';
  }

  const columns = [
    // { field: '',
    //   headerName: '',
    //   flex: 0.5,
    //   renderCell: (params: any = {}) => (
    //     <Radio
    //       checked={selectedTableIndex === params.id}
    //       value={params.id}
    //     />
    //   ),
    // },
    { field: 'LineId', headerName: 'No', flex: 0.5 },
    { field: 'Channel', headerName: 'Ch', flex: 0.5 },
    { field: 'Sequence_number', headerName: 'Seq', flex: 0.5 },
    { field: 'FileName',
      headerName: 'Filename',
      flex: 0.5,
      valueGetter: (params: any) => params.row.FileName.replace(/^.*[\\\/]/, '')
    },
    { field: 'Calmness_value', headerName: 'Calm', flex: 0.5 },
    { field: 'Anger_value', headerName: 'Anger', flex: 0.5 },
    { field: 'Joy_value', headerName: 'Joy', flex: 0.5 },
    { field: 'Sadness_value', headerName: 'Sadness', flex: 0.5 },
    { field: 'Energy_Point', headerName: 'Energy', flex: 0.5 },
    { field: 'Starting_time_of_the_talk', headerName: 'Start', flex: 0.5 },
    { field: 'End_time_of_the_talk', headerName: 'End', flex: 0.5 },
    { field: 'Status', headerName: 'Status', flex: 0.5 },
    { field: 'Label',
      headerName: 'Label',
      flex: 0.5,
      valueGetter: getLabelFromProject
    },
    // { field: 'comment', headerName: 'Comment', flex: 1 },
  ];

  const rowPerPage: number = 10;
  //const currentPage: number = !!rawFileData ? Math.ceil(selectedTableIndex / rowPerPage) - 1 : 0;

  return (
    <DataGrid
      className={classes.customTable}
      getRowId={(row) => row.LineId}
      autoHeight
      rows={rows}
      columns={columns}
      // page={currentPage}
      pageSize={rowPerPage}
      disableColumnSelector={true}
      selectionModel={[selectedTableIndex]}
      onSelectionModelChange={(newSelectionModel) => {
        const index = newSelectionModel.selectionModel[0] as number;
        onSelect(index);
      }}
    />
  )
};
  
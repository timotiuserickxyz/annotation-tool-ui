import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
// import { Radio } from '@material-ui/core';

const useStyles = makeStyles({
  tableContainer: {
    width: '100%',
    height: '100%',
  },
  customTable: {
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
    '& .MuiDataGrid-row': {
      cursor: 'pointer',
    },
  }
});

export type BaseRow = {
  id: string | number;
  tableData?: {id: string | number, checked: boolean | undefined};
};

type Row = BaseRow & {
  LineId: number;
  Channel: number;
  Sequence_number: number;
  FileName: string;
  Calmness_value: number;
  Anger_value: number;
  Joy_value: number;
  Sadness_value: number;
  Energy_Point: number;
  Starting_time_of_the_talk: string;
  End_time_of_the_talk: string;
  Status: string;
  Label: string
};

type Props = {
  rawFileData: any[],
  projectData: any[],
  selectedDataTableIndex: number,
  onSelect: (DataTableIndex: number) => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const AnnotationDataList: Component = ({ rawFileData, projectData, selectedDataTableIndex, onSelect }) => {
  const classes = useStyles();

  const rows: Row[] = !!rawFileData
  ? rawFileData.map((t) => {
      return {...t};
    })
  : [];

  function getLabelFromProject(params: any) {
    // Possibility of chunked by whole wav
    let filteredProjectData: any[] = projectData.filter(o =>
      o.sequence_number === -1
    );

    if (filteredProjectData.length > 0)
    {
      const existingProjectData = filteredProjectData.pop();
      return existingProjectData.label;
    }
    else
    {
      // Turns out to be chunked by talk unit
      filteredProjectData = projectData.filter(o =>
        o.sequence_number === params.row.Sequence_number
        && o.channel === params.row.Channel
      );

      if (filteredProjectData.length > 0)
      {
        const existingProjectData = filteredProjectData.pop();
        return existingProjectData.label;
      }
    }
    
    return '';
  }

  const columns = [
    // { field: '',
    //   headerName: '',
    //   flex: 0.5,
    //   renderCell: (params: any = {}) => (
    //     <Radio
    //       checked={selectedDataTableIndex === params.id}
    //       value={params.id}
    //     />
    //   ),
    // },
    { field: 'LineId', headerName: 'No', width: 75 },
    { field: 'Channel', headerName: 'Ch', width: 75 },
    { field: 'Sequence_number', headerName: 'Seq', width: 80 },
    {
      field: 'FileName',
      headerName: 'File',
      renderCell: (params: any) =>  (
        <Tooltip title={params.row.FileName.replace(/^.*[\\\/]/, '')} >
         <span className="table-cell-trucate">{params.row.FileName.replace(/^.*[\\\/]/, '')}</span>
        </Tooltip>
      ),
    },
    { field: 'Starting_time_of_the_talk', headerName: 'Start' },
    { field: 'End_time_of_the_talk', headerName: 'End' },
    {
      field: 'Label',
      headerName: 'Label',
      valueGetter: getLabelFromProject,
    },
    { field: 'Calmness_value', headerName: 'Calm' },
    { field: 'Anger_value', headerName: 'Anger' },
    { field: 'Joy_value', headerName: 'Joy' },
    { field: 'Sadness_value', headerName: 'Sadness' },
    { field: 'Energy_Point', headerName: 'Energy' },
    { field: 'Status', headerName: 'Status' },
    // { field: 'comment', headerName: 'Comment' },
  ];

  const rowPerPage: number = 10;
  //const currentPage: number = !!rawFileData ? Math.ceil(selectedDataTableIndex / rowPerPage) - 1 : 0;

  return (
    <div className={classes.tableContainer}>
      <DataGrid
        className={classes.customTable}
        getRowId={(row) => row.LineId}
        rows={rows}
        columns={columns}
        // page={currentPage} // Buggy caused by sorting/filtering
        pageSize={rowPerPage}
        disableColumnSelector={true}
        selectionModel={[selectedDataTableIndex]}
        onSelectionModelChange={(newSelectionModel) => {
          const index = newSelectionModel.selectionModel[0] as number;
          onSelect(index);
        }}
      />
    </div>
  )
};
  
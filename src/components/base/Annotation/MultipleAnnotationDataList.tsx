import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles({
  tableContainer: {
    width: '100%',
    height: '100%',
  },
  customTable: {
    '& .MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none !important',
    },
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important',
      overflowX: 'hidden',
      overflowY: 'scroll',
    },
    '& .MuiDataGrid-cell': {
      lineHeight: 'unset !important',
      maxHeight: 'none !important',
      whiteSpace: 'normal',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiDataGrid-row': {
      maxHeight: 'none !important',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: 'white !important',
    }
  },
  labelList: {
    padding: '10px',
  },
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
  projectAggregatedData: any[],
};

type Component = (props: Props) => React.ReactElement<Props>;

export const MultipleAnnotationDataList: Component = ({ projectAggregatedData }) => {
  const classes = useStyles();

  const rows: Row[] = !!projectAggregatedData
  ? projectAggregatedData.map((t) => {
      return {...t};
    })
  : [];

  const columns = [
    { field: 'id', headerName: 'No', width: 75 },
    { field: 'channel', headerName: 'Ch', width: 75 },
    { field: 'sequence_number', headerName: 'Seq', width: 80 },
    {
      field: 'file_name',
      headerName: 'File',
      renderCell: (params: any) =>  (
        <Tooltip title={params.row.file_name.replace(/^.*[\\\/]/, '')} >
          <span>{params.row.file_name.replace(/^.*[\\\/]/, '')}</span>
        </Tooltip>
      ),
      flex: 1,
    },
    { field: 'final_label', headerName: 'Final Label', flex: 1 },
    { field: 'agreement_level', headerName: 'Agreement Level', flex: 1 },
    {
      field: 'label',
      headerName: 'Labels',
      flex: 1,
      renderCell: (params: any = {}) => (
        <ul className={classes.labelList}>
          {params.row.label.map((given_label: any) => 
            (<li>
              <span>{given_label.label} ({given_label.annotator})</span>
            </li>)
          )}
        </ul>
      ),
    },
    // {
    //   field: 'Label1',
    //   headerName: 'Label1',
    //   valueGetter: getLabelFromProject,
    // },
    // {
    //   field: 'FileName1',
    //   headerName: 'Annotator1',
    //   renderCell: (params: any) =>  (
    //     <Tooltip title={params.row.FileName.replace(/^.*[\\\/]/, '')} >
    //       <span>{params.row.FileName.replace(/^.*[\\\/]/, '')}</span>
    //     </Tooltip>
    //   ),
    // },
    // {
    //   field: 'Label2',
    //   headerName: 'Label2',
    //   valueGetter: getLabelFromProject,
    // },
    // {
    //   field: 'FileName2',
    //   headerName: 'Annotator2',
    //   renderCell: (params: any) =>  (
    //     <Tooltip title={params.row.FileName.replace(/^.*[\\\/]/, '')} >
    //       <span>{params.row.FileName.replace(/^.*[\\\/]/, '')}</span>
    //     </Tooltip>
    //   ),
    // },
  ];

  const rowPerPage: number = 10;
  //const currentPage: number = !!rawFileData ? Math.ceil(selectedDataTableIndex / rowPerPage) - 1 : 0;

  return (
    <div className={classes.tableContainer}>
      <DataGrid
        className={classes.customTable}
        rows={rows}
        columns={columns}
        // page={currentPage} // Buggy caused by sorting/filtering
        pageSize={rowPerPage}
        disableColumnSelector={true}
        disableSelectionOnClick={true}
        
      />
    </div>
  )
};
  
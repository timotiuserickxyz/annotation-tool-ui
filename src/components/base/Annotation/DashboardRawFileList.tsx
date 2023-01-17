import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

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
  },
});

export type BaseRow = {
  id: string | number;
  tableData?: {id: string | number, checked: boolean | undefined};
};

type Row = BaseRow & {
  name: string;
};

type Props = {
  rawFileList: any[],
  selectedRawFileIndex: number,
  onSelect: (fileIndex: number) => void | Promise<void>,
  onShowExplanation: () => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const DashboardRawFileList: Component = ({ rawFileList, selectedRawFileIndex, onSelect, onShowExplanation }) => {
  const classes = useStyles();

  const rows: Row[] = !!rawFileList
  ? rawFileList.map((t) => {
      return {...t};
    })
  : [];

  const columns = [
    {
      field: 'name',
      headerName: 'Csv File',
      flex: 1,
    },
  ];

  const rowPerPage: number = 100;

  return (
    <div className={classes.tableContainer}>
      <DataGrid
        className={classes.customTable}
        rows={rows}
        columns={columns}
        pageSize={rowPerPage}
        disableColumnSelector={true}
        selectionModel={[selectedRawFileIndex]}
        onSelectionModelChange={(newSelectionModel) => {
          const index = newSelectionModel.selectionModel[0] as number;
          onSelect(index);
        }}
        rowsPerPageOptions={[100]}
        hideFooterRowCount={true}
        hideFooterSelectedRowCount={true}
      />
    </div>
  )
};

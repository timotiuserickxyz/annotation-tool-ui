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
  }
});

export type BaseRow = {
  id: string | number;
  tableData?: {id: string | number, checked: boolean | undefined};
};

type Row = BaseRow & {
  name: string;
};

type Props = {
  rawFile: any[],
  rawFileName: string,
  onSelect: (fileName: string) => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const RawFileList: Component = ({ rawFile, rawFileName, onSelect }) => {
  const classes = useStyles();

  const rows: Row[] = !!rawFile
  ? rawFile.map((t) => {
      return {...t};
    })
  : [];

  const columns = [
    { field: 'name', headerName: 'Source File', flex: 1 },
  ];

  const rowPerPage: number = 100;

  return (
    <div className={classes.tableContainer}>
      <DataGrid
        className={classes.customTable}
        getRowId={(row) => row.name}
        rows={rows}
        columns={columns}
        pageSize={rowPerPage}
        disableColumnSelector={true}
        selectionModel={[rawFileName]}
        onSelectionModelChange={(newSelectionModel) => {
          console.log('selectedRawFileName: ' + newSelectionModel.selectionModel[0]);
          const fileName = newSelectionModel.selectionModel[0] as string;
          onSelect(fileName);
        }}
      />
    </div>
  )
};
  
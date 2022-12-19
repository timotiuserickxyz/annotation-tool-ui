import * as React from 'react';
import { useSetState } from 'react-use';
import { Button, Box, Typography, IconButton, Radio } from '@material-ui/core';
import { DataGrid, DataGridProps } from '@material-ui/data-grid';
import { getDummyUserList } from '../../../api/dummy/getDummyUserList';

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
  projectName: string,
  selectedDataIndex: number,
  onSelect: (id: number) => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const DummyData: Component = ({ projectName, selectedDataIndex, onSelect }) => {
  const { data } = getDummyUserList();

  const rows: Row[] = !!data
  ? data.map((t) => {
      return {...t};
    })
  : [];

  const columns = [
    { field: '',
      headerName: '',
      flex: 0.3,
      renderCell: (params: any = {}) => (
        <Radio
          checked={selectedDataIndex === params.id}
          value={params.id}
        />
      ),
    },
    { field: 'id', headerName: 'ID', flex: 0.3 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
  ];

  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      selectionModel={[selectedDataIndex]}
      onSelectionModelChange={(newSelectionModel) => {
        onSelect(newSelectionModel.selectionModel[0] as number);
      }}
    />
  )
};
  
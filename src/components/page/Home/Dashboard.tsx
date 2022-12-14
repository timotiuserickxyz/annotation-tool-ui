import React from 'react';
import { mutate } from 'swr';
import { useSetState } from 'react-use';
import { useRouter } from 'next/router';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Checkbox, Snackbar, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Color } from '@material-ui/lab/Alert/Alert';

import Link from '../../base/Link';
import { pathMap } from '../../../router/router';
import { deleteDatasets } from '../../../api/datasets/deleteDatasets';
import { getAPIUrl, getUrl } from '../../../utils';
import { getDatasets } from '../../../api/datasets/getDatasets';
import { Alert } from '../../base/Alert';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'inherit',
    },
    header: {
      height: 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    iconButton: {
      cursor: 'pointer',
    },
  }),
);

interface TableData {
  id: number;
  name: string;
  csvs: number;
  labels: number;
  columns: number;
  status: string;
  memo: string;
}
const createTableData = (
  id: number,
  name: string,
  csvs: number,
  labels: number,
  columns: number,
  status: string,
  memo: string,
): TableData => {
  return { id, name, csvs, labels, columns, status, memo };
};

export const Dashboard: React.FC<Props> = () => {
  const classes = useStyles();
  const router = useRouter();
  const { data } = getDatasets();
  const [states, setStates] = useSetState({
    open: false,
    selected: [] as number[],
    alertOpen: false,
    alertMessage: '',
    alertSeverity: 'success' as Color,
  });

  const rows = data
    ? data.datasets.map((item) => {
        return createTableData(
          item.id,
          item.name,
          item.num_of_csvs,
          item.num_of_labels,
          item.num_of_columns,
          item.status,
          item.memo,
        );
      })
    : [];
  const isSelected = (id: number) => states.selected.indexOf(id) !== -1;
  const numSelected = states.selected.length;
  const rowCount = rows.length;

  const handleOpen = () => {
    setStates({ open: true });
  };
  const handleClose = () => {
    setStates({ open: false });
  };
  const handleDelete = async () => {
    const res = await deleteDatasets({ ids: states.selected });
    let alertMessage = '削除に成功しました';
    let alertSeverity: Color = 'success';
    if (res.error) {
      alertMessage = 'InternalServerError';
      alertSeverity = 'error';
    } else if (res.data && res.data.error) {
      alertMessage = res.data.error.message;
      alertSeverity = 'error';
    }
    await mutate(getAPIUrl('dataset', 'getDatasets'));
    setStates({
      open: false,
      alertOpen: true,
      alertSeverity,
      alertMessage,
      selected: [],
    });
  };
  const handleRowClick = async (datasetId: number) => {
    await router.push(getUrl('home', {}, { datasetId }));
  };
  const handleCheckBoxClick = (
    _event: React.MouseEvent<unknown>,
    id: number,
  ) => {
    const selectedIndex = states.selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(states.selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(states.selected.slice(1));
    } else if (selectedIndex === states.selected.length - 1) {
      newSelected = newSelected.concat(states.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        states.selected.slice(0, selectedIndex),
        states.selected.slice(selectedIndex + 1),
      );
    }

    setStates({ selected: newSelected });
  };
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setStates({ selected: newSelecteds });
      return;
    }
    setStates({ selected: [] });
  };
  const handleAlertClose = () => {
    setStates({ alertOpen: false });
  };

  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h5">データセット一覧</Typography>
        <Box>
          <Link href={pathMap.home.path}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<AddIcon />}
            >
              作成
            </Button>
          </Link>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={handleOpen}
            disabled={states.selected.length <= 0}
          >
            削除
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="dataset list">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                />
              </TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell>名前</TableCell>
              <TableCell align="left">ファイル数</TableCell>
              <TableCell align="left">ラベル数</TableCell>
              <TableCell align="left">カラム数</TableCell>
              <TableCell align="left">ステータス</TableCell>
              <TableCell align="left">メモ</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                      onClick={(event) => handleCheckBoxClick(event, row.id)}
                    />
                  </TableCell>
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.csvs}</TableCell>
                  <TableCell align="left">{row.labels}</TableCell>
                  <TableCell align="left">{row.columns}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="left">{row.memo}</TableCell>
                  <TableCell align="left">
                    <KeyboardArrowRightIcon
                      className={classes.iconButton}
                      onClick={() => handleRowClick(row.id)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={states.open} onClose={handleClose}>
        <DialogTitle>データセットの削除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {states.selected.length}件のデータセットを削除してもよろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button variant="contained" onClick={handleDelete} color="secondary">
            削除する
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={states.alertOpen}
        autoHideDuration={5000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={states.alertSeverity}>
          {states.alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

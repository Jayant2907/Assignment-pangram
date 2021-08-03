import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(task, timeline, completed, developer_name) {
  return { task, timeline, completed, developer_name};
}



export default function TaskTable({currproject}) {
  const classes = useStyles();
  const rows=currproject?.results1?.map((task,index)=>createData(task.task,task.timeline, task.completed, currproject.results[2]))
  console.log(rows,rows)


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Task </TableCell>
            <TableCell align="right">Estimated Timeline</TableCell>
            <TableCell align="right">Completed</TableCell>
            <TableCell align="right">Developer name</TableCell>
            {/* <TableCell align="right">Comments</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.task}
              </TableCell>
              <TableCell align="right">{row.timeline}</TableCell>
              <TableCell align="right"  style={{color:row.completed && "#ffb600"}}>{row.completed}</TableCell>
              <TableCell align="right">{row.developer_name}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
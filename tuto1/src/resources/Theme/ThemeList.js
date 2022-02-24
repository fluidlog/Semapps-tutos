import React, { useCallback } from 'react';
import { ListBase, Datagrid, DateField, TextField } from "react-admin";
import { Box, makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  alignCenter: {
    textAlign: 'center'
  },
  alignRight: {
    textAlign: 'right'
  },
  bold: {
    fontWeight: 'bold'
  }
}));

const DocumentList = props => {
  const classes = useStyles();
  const location = useLocation();
  const matches = location.pathname.split('/');
  const currentRecordId = matches.length > 2 ? decodeURIComponent(matches[2]) : undefined;

  const selectedRowStyle = useCallback(record => ({
    backgroundColor: record.id === currentRecordId ? 'rgba(0, 0, 0, 0.04)' : undefined
  }), [currentRecordId]);

  return (
    <ListBase {...props}>
      <Box p={2} pt={1}>
        <Datagrid rowClick="show" rowStyle={selectedRowStyle}>
          <TextField source="pair:label" headerClassName={classes.bold} />
          <TextField source="pair:description" headerClassName={classes.bold} />
          <DateField source="dc:created" headerClassName={classes.bold} />
        </Datagrid>
      </Box>
    </ListBase>
  );
}

export default DocumentList;

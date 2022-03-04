import React from 'react';
import { List, Datagrid, TextField, DateField } from 'react-admin';

const PersonList = (props) => (
    <List {...props} sort={{ field: 'pair:lastName', order: 'ASC' }}>
        <Datagrid>
            <TextField source="pair:label"/>
            <DateField source="dc:created" />
            <TextField source="pair:comment" />
        </Datagrid>
    </List>
);

export default PersonList;

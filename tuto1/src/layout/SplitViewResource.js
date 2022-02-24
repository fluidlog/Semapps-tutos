import React, { useEffect, useMemo } from 'react';
import { ResourceContextProvider, registerResource, unregisterResource, WithPermissions } from 'react-admin';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Grid, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: 'calc(100vh - 98px)'
  },
  panel: {
    backgroundColor: theme.palette.grey['200'],
    // minHeight: 'calc(100vh - 98px)',
    // height: '100%'
  }
}));

const defaultOptions = {};

const ResourceRegister = ({ name, list, icon, options = defaultOptions }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      registerResource({
        name,
        options,
        hasList: !!list,
        icon,
      })
    );
    return () => dispatch(unregisterResource(name));
  }, [dispatch, name, icon, list, options]);
  return null;
};

const ResourceRoutes = ({ name, match, list, options = defaultOptions }) => {
  const isRegistered = useSelector(
    state => !!state.admin.resources[name]
  );

  const classes = useStyles();

  const basePath = match ? match.path : '';

  const resourceData = useMemo(
    () => ({
      resource: name,
      options,
      hasList: !!list,
    }),
    [name, options, list]
  );

  // match tends to change even on the same route ; using memo to avoid an extra render
  return useMemo(() => {
    // if the registration hasn't finished, no need to render
    if (!isRegistered) {
      return null;
    }

    return (
      <ResourceContextProvider value={name}>
        <Grid container alignItems="stretch" className={classes.container}>
          <Grid item xs={16 - (resourceData.options.panelSize || 4)}>
            <Box>
              <Route
                path={`${basePath}`}
                render={routeProps => (
                  <WithPermissions
                    component={list}
                    basePath={basePath}
                    {...routeProps}
                    {...resourceData}
                    syncWithLocation
                  />
                )}
              />
            </Box>
          </Grid>
        </Grid>
      </ResourceContextProvider>
    );
  }, [basePath, name, list, resourceData, isRegistered, classes]);
};

const SplitViewResource = ({ intent = 'route', ...props }) =>
  intent === 'registration' ? (
    <ResourceRegister {...props} />
  ) : (
    <ResourceRoutes {...props} />
  );

export default SplitViewResource;

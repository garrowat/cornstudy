import React from 'react';
import { CircularProgress, LinearProgress } from 'material-ui/Progress';

export const Loading = ({ thickness, type, ...rest }) =>
    type === 'circular'
    ? <CircularProgress  color="secondary" thickness={thickness} style={{display: 'block', margin: 'auto'}}/>
    : <LinearProgress color="secondary" thickness={thickness} />

export const withLoading = (Component) => ({ isLoading, loadingThickness, type, ...rest }) =>
isLoading
  ? <Loading thickness={loadingThickness} type={type} />
  : <Component { ...rest } />
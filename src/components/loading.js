import React from 'react';
import { CircularProgress } from 'material-ui/Progress';

export const Loading = (props) => 
        <CircularProgress  color="secondary" thickness={props.thickness} style={{display: 'block', margin: 'auto'}}/>

export const withLoading = (Component) => ({ isLoading, loadingThickness, ...rest }) =>
isLoading
  ? <Loading thickness={loadingThickness} />
  : <Component { ...rest } />
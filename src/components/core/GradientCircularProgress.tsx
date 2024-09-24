import React from 'react';

import { CircularProgress, SxProps } from '@mui/material';

interface GradientCircularProgressProps {
  height?: number;
  width?: number;
  size?: number;
  styles?: SxProps
}

export const GradientCircularProgress: React.FC<GradientCircularProgressProps> = ({
  height = 0,
  width = 0,
  size = 16,
  styles={}
}) => (
  <>
    <svg width={width} height={height}>
      <defs>
        <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e01cd5" />
          <stop offset="100%" stopColor="#1CB5E0" />
        </linearGradient>
      </defs>
    </svg>
    <CircularProgress size={size} sx={{ 'svg circle': { stroke: 'url(#my_gradient)' }, ...styles }} />
  </>
);

/* eslint-disable import/no-extraneous-dependencies */
import type { Dayjs } from 'dayjs';

import React from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface CustomDatePickerProps {
  label?: string | React.ReactNode;
  onChange?: (date: Dayjs | null) => void;
  defaultValue?: Dayjs | null;
}

/**
 * CustomDatePicker component to render a date picker with Day.js adapter.
 *
 * @param {CustomDatePickerProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered CustomDatePicker component.
 */
const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  defaultValue = null,
  label = null,
  onChange = () => undefined,
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer
      components={['DatePicker', 'MobileDatePicker', 'DesktopDatePicker', 'StaticDatePicker']}
    >
      <DemoItem label={label}>
        <DatePicker onChange={onChange} defaultValue={defaultValue} />
      </DemoItem>
    </DemoContainer>
  </LocalizationProvider>
);

export default CustomDatePicker;

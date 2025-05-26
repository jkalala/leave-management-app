declare module 'react-datepicker' {
  import { ComponentType } from 'react';
  
  interface DatePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    className?: string;
    dateFormat?: string;
    minDate?: Date;
    maxDate?: Date;
    [key: string]: any;
  }

  const DatePicker: ComponentType<DatePickerProps>;
  export default DatePicker;
} 
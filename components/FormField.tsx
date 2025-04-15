// typescript
// filepath: d:\crackwise\components\FormField.tsx
import React from 'react';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Controller, Control, Path } from 'react-hook-form';

// Define a default type for FiledValues
interface FiledValues {
  [key: string]: any;
}

interface FormFieldProps<T extends FiledValues = FiledValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'file';
}

const FormField = <T extends FiledValues = FiledValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel className='label'>{label}</FormLabel>
        <FormControl>
          <Input className='input' placeholder={placeholder} type={type} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormField;
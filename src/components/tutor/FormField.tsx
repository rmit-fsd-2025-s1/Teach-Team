import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  type?: string;
}

export function FormField({
  label,
  name,
  value,
  onChange,
  isReadOnly = false,
  isDisabled = false,
  type = "text",
}: FormFieldProps) {
  return (
    <FormControl mb={4}>
      <FormLabel color="white">{label}</FormLabel>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        color="white"
        readOnly={isReadOnly}
        disabled={isDisabled}
        type={type}
      />
    </FormControl>
  );
} 
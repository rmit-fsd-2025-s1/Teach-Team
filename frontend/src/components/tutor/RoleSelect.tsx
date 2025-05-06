import { FormControl, FormLabel, Select } from "@chakra-ui/react";

interface RoleSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function RoleSelect({ value, onChange }: RoleSelectProps) {
  return (
    <FormControl mb={4}>
      <FormLabel color="white">Select Role</FormLabel>
      <Select
        name="role"
        value={value}
        onChange={onChange}
        color="white"
        bg="black"
        sx={{
          option: {
            background: "black",
            color: "white",
          },
        }}
      >
        <option value="">Select Role</option>
        <option value="Tutor">Tutor</option>
        <option value="Lab Assistant">Lab Assistant</option>
      </Select>
    </FormControl>
  );
} 
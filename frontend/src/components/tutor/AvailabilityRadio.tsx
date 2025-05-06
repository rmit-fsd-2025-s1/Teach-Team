import { FormControl, FormLabel, RadioGroup, Radio, Flex } from "@chakra-ui/react";

interface AvailabilityRadioProps {
  value: "part-time" | "full-time";
  onChange: (value: "part-time" | "full-time") => void;
}

export function AvailabilityRadio({ value, onChange }: AvailabilityRadioProps) {
  return (
    <FormControl mb={4}>
      <FormLabel color="white">Availability</FormLabel>
      <RadioGroup
        name="availability"
        onChange={onChange}
        value={value}
      >
        <Flex gap={4} color="white">
          <Radio value="part-time">Part-Time</Radio>
          <Radio value="full-time">Full-Time</Radio>
        </Flex>
      </RadioGroup>
    </FormControl>
  );
} 
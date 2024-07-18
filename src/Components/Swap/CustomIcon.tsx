import { createIcon } from "@chakra-ui/icon";
import { Icon } from "@chakra-ui/icons";

interface Props {
  path: string;
  boxSize: string;
}

const CustomIcon = ({ path, boxSize }: Props) => {
  return (
    <Icon viewBox="0 0 40 40" boxSize={boxSize}>
      <image href={path} x="0" y="0" width="40" height="40" />
    </Icon>
  );
};

export default CustomIcon;

import { Button } from "@headlessui/react";
import style from "./styled.module.css";
const styledButton = ({
  children,
  onClick,
  backgroundColor,
}: {
  children: React.ReactNode;
  onClick: () => void;
  backgroundColor?: string;
}) => {
  return (
    <Button
      onClick={onClick}
      className={style.button}
      style={{ backgroundColor }}
    >
      {children}
    </Button>
  );
};

export default styledButton;

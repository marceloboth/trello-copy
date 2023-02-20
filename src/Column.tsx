import { ColumnContainer, ColumnTitle } from "./styles"
import React, {FC} from "react";

type ColumnProps = {
  text: string
  children?: React.ReactNode
}

export const Column: FC<ColumnProps> = ({ text, children }: ColumnProps) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
    </ColumnContainer>
  )
}

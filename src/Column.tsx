import { ColumnContainer, ColumnTitle } from "./styles"
import React, { useRef } from "react";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";
import { Card } from "./Card";
import { addTask, moveList } from "./state/actions";
import { useItemDrag } from "./utils/useItemDrag";
import { useDrop } from "react-dnd";
import { isHidden } from "./utils/isHidden";

type ColumnProps = {
  text: string
  id: string
  isPreview?: boolean
}

export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState()
  const tasks = getTasksByListId(id)
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover() {
      if (!draggedItem) {
        return
      }

      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return
        }

        dispatch(moveList(draggedItem.id, id))
      }
    }
  })

  const { drag } = useItemDrag({ type: "COLUMN", id, text })

  drag(drop(ref))

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>

      {
        tasks.map(task => (
          <Card text={task.text} id={task.id} key={task.id} />
        ))
      }
      
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={text => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  )
}

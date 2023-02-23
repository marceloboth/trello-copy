import { ColumnContainer, ColumnTitle } from "./styles"
import React, { useRef } from "react";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";
import { Card } from "./Card";
import { addTask, moveList, moveTask, setDraggedItem } from "./state/actions";
import { useItemDrag } from "./utils/useItemDrag";
import { useDrop } from "react-dnd";
import { isHidden } from "./utils/isHidden";
import { DragItem } from "./DragItem";

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
    accept: ["COLUMN", "CARD"],
    hover(item: DragItem) {
      if (item.type === "COLUMN") {
        if (item.id === id) {
          return
        }

        dispatch(moveList(item.id, id))
      } else {
        if (item.columnId === id) {
          return
        }
        if (tasks.length) {
          return
        }

        dispatch(
          moveTask(item.id, null, item.columnId, id)
        )
        dispatch(setDraggedItem({ ...item, columnId: id }))
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
          <Card
            id={task.id}
            columnId={id}
            text={task.text}
            key={task.id}
          />
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

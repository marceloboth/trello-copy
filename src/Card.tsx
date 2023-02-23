import { CardContainer } from "./styles"
import {useAppState} from "./state/AppStateContext";
import {useRef} from "react";
import {isHidden} from "./utils/isHidden";
import {useItemDrag} from "./utils/useItemDrag";
import {moveTask} from "./state/actions";
import {useDrop} from "react-dnd";

type CardProps = {
  text: string
  id: string
  columnId: string
  isPreview?: boolean
}

export const Card = ({text, id, columnId, isPreview }: CardProps) => {
  const { draggedItem, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)
  const { drag } = useItemDrag({
    type: "CARD",
    id,
    text,
    columnId
  })

  const [, drop] = useDrop({
    accept: "CARD",
    hover() {
      if (!draggedItem) {
        return
      }
      if (draggedItem.type !== "CARD") {
        return
      }
      if (draggedItem.id === id) {
        return
      }

      dispatch(
        moveTask(draggedItem.id, id, draggedItem.columnId, columnId)
      )
    }
  })

  drag(drop(ref))

  return (
    <CardContainer
      isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
      isPreview={isPreview}
      ref={ref}
    >
      {text}
    </CardContainer>
  )
}

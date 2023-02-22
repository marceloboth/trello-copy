import { useAppState } from "./state/AppStateContext";
import { useDragLayer } from "react-dnd";
import {CustomDragLayerContainer, DragPreviewWrapper} from "./styles";
import { Column } from "./Column";

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState()
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset()
  }))

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        <Column
          text={draggedItem.text}
          id={draggedItem.id}
          isPreview
        />
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null
}

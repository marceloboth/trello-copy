import {Action} from "./actions";

export type Task = {
  id: string
  text: string
}

export type List = {
  id: string
  text: string
  tasks: Task[]
}

export type AppState = {
  lists: List[]
}

export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

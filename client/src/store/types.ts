import ObjectID from 'bson-objectid';


export type TaskType = {
    title: string
    content: string
    order: number
    col: number
    _id: ObjectID
}

export type taskID = ObjectID

export type commentID = ObjectID

export type ActionButtonType = {
    icon?: React.ReactNode,
    fn: () => void,
    text: string,
    color?: "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning" | undefined,
    className?: string,
    style?: React.CSSProperties | undefined,
    size?: "small" | "medium" | "large" | undefined,
    variant?: "text" | "outlined" | "contained" | undefined,
    disabled?: boolean,
    disableButtons?: () => void,
    clearDisableButton?: () => void
  }
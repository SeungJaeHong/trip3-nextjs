import {useState} from "react"
import styles from "./CommentEditor.module.scss"
import SubmitButton from "../Form/SubmitButton";
import Button from "../Button";
import FormRichTextEditor from "../Form/FormRichTextEditor";

type Props = {
    id: string
    onSubmit: (value: string) => void
    value: string
    submitButtonName: string
    submitting: boolean
    onCloseButtonTitle?: string
    onClose?: () => void
}

const CommentEditor = ({id, onSubmit, value, submitting, submitButtonName, onCloseButtonTitle, onClose}: Props) => {
    const [editorValue, setEditorValue] = useState(value)
    const onSubmitClick = () => {
        if (editorValue.length) {
            onSubmit(editorValue)
        }
    }

    const onTextChange = (html: string) => {
        setEditorValue(html)
    }

    return (
        <div className={styles.CommentEditor}>
            <FormRichTextEditor
                id={id}
                value={value}
                onChange={onTextChange}
                disabled={submitting}
            />
            <div className={styles.Buttons}>
                <div className={styles.SubmitButton}>
                    <SubmitButton
                        title={submitButtonName}
                        submitting={submitting}
                        onClick={onSubmitClick} />
                </div>
                {onCloseButtonTitle &&
                    <div className={styles.CloseButton}>
                        <Button
                            title={onCloseButtonTitle}
                            cancel={true}
                            onClick={onClose} />
                    </div>
                }
            </div>
        </div>
    )
}

CommentEditor.defaultProps = {
    value: '',
    submitting: false
}

export default CommentEditor
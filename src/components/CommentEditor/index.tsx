import {MouseEventHandler, useEffect, useState} from "react"
import { init } from 'pell'
import Button from "../Button"
import 'pell/dist/pell.css'
import styles from "./CommentEditor.module.scss"

type Props = {
    onClick?: MouseEventHandler<HTMLElement> | undefined
}

const CommentEditor = (props: Props) => {
    const [editor, setEditor] = useState({})
    const [value, setValue] = useState('')

    useEffect(() => {
        const editor = init({
            element: document.getElementById('comment-editor')!,
            onChange: (html: string) => setValue(html),
            actions: ['bold', 'underline', 'italic', 'olist', 'ulist', 'link', 'image'],
            classes: {
                actionbar: styles.ActionBar,
                button: 'pell-button',
                content: styles.Content,
                selected: 'pell-button-selected'
            }
        })
        setEditor(editor)
    }, [])

    return (
        <div className={styles.CommentEditor}>
            <div id={'comment-editor'} className={styles.Editor} spellCheck={false} />
            <div className={styles.SubmitButton}>
                <Button title={'Lisa kommentaar'} />
            </div>
        </div>

    )
}

CommentEditor.defaultProps = {

}

export default CommentEditor
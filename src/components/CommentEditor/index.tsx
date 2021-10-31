import {useEffect, useState} from "react"
import { init, exec } from 'pell'
import 'pell/dist/pell.css'
import styles from "./CommentEditor.module.scss"
import ReactDOMServer from "react-dom/server";
import BoldIcon from "../../icons/Editor/BoldIcon";
import UnderlineIcon from "../../icons/Editor/UnderlineIcon";
import ItalicIcon from "../../icons/Editor/ItalicIcon";
import OrderedListIcon from "../../icons/Editor/OrderedListIcon";
import UnorderedListIcon from "../../icons/Editor/UnorderedListIcon";
import LinkIcon from "../../icons/Editor/LinkIcon";
import ImageIcon from "../../icons/Editor/ImageIcon";
import SubmitButton from "../Form/SubmitButton";

type Props = {
    id: string
    onSubmit: (value: string) => void
    value: string
    submitButtonName: string
    submitting: boolean
    onClose?: () => void
}

const CommentEditor = ({id, onSubmit, value, submitting, submitButtonName}: Props) => {
    const [editor, setEditor] = useState(undefined)
    const [editorValue, setEditorValue] = useState(value)

    const onSubmitClick = () => {
        if (editorValue.length) {
            onSubmit(editorValue)
        }
    }

    useEffect(() => {
        const editor = init({
            element: document.getElementById(id)!,
            onChange: (html: string) => setEditorValue(html),
            //defaultParagraphSeparator: 'p',
            actions: [
                {
                    name: 'bold',
                    icon: ReactDOMServer.renderToStaticMarkup(<BoldIcon />),
                    title: 'Rõhutatud',
                    result: () => exec('bold')
                },
                {
                    name: 'underline',
                    icon: ReactDOMServer.renderToStaticMarkup(<UnderlineIcon />),
                    title: 'Allajoonitud',
                    result: () => exec('underline')
                },
                {
                    name: 'italic',
                    icon: ReactDOMServer.renderToStaticMarkup(<ItalicIcon />),
                    title: 'Kaldkiri',
                    result: () => exec('italic')
                },
                {
                    name: 'olist',
                    icon: ReactDOMServer.renderToStaticMarkup(<OrderedListIcon />),
                    title: 'Nimekiri',
                    result: () => exec('insertOrderedList')
                },
                {
                    name: 'ulist',
                    icon: ReactDOMServer.renderToStaticMarkup(<UnorderedListIcon />),
                    title: 'Nimekiri',
                    result: () => exec('insertUnorderedList')
                },
                {
                    name: 'link',
                    icon: ReactDOMServer.renderToStaticMarkup(<LinkIcon />),
                    title: 'Hüperlink',
                    result: () => {
                        const url = window.prompt('Sisesta hüperlingi aadress');
                        if (url) exec('createLink', url);
                    }
                },
                {
                    name: 'image',
                    icon: ReactDOMServer.renderToStaticMarkup(<ImageIcon />),
                    title: 'Pilt',
                    result: () => {
                        const url = window.prompt('Sisesta pildi url');
                        if (url) exec('insertImage', url);
                    }
                }
            ],
            classes: {
                actionbar: styles.ActionBar,
                button: styles.ActionButton,
                content: styles.Content,
                selected: styles.ActionButtonSelected
            }
        })

        // @ts-ignore
        setEditor(editor)
    }, [])

    useEffect(() => {
        if (editor) {
            // @ts-ignore
            editor.content.innerHTML = value
            setEditorValue(value)
        }
    }, [value, editor])

    return (
        <div className={styles.CommentEditor}>
            <div id={id} className={styles.Editor} spellCheck={false} />
            <div className={styles.SubmitButton}>
                <SubmitButton
                    title={submitButtonName}
                    submitting={submitting}
                    onClick={onSubmitClick} />
            </div>
        </div>
    )
}

CommentEditor.defaultProps = {
    value: '',
    submitting: false
}

export default CommentEditor
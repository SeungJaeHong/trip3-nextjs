import {MouseEventHandler, useEffect, useState} from "react"
import { init, exec } from 'pell'
import Button from "../Button"
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
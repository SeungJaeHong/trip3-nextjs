import React, {useEffect, useState} from "react"
import styles from "./FormRichTextEditor.module.scss"
import clsx from "clsx"
import {exec, init} from "pell";
import ReactDOMServer from "react-dom/server";
import BoldIcon from "../../../icons/Editor/BoldIcon";
import UnderlineIcon from "../../../icons/Editor/UnderlineIcon";
import ItalicIcon from "../../../icons/Editor/ItalicIcon";
import OrderedListIcon from "../../../icons/Editor/OrderedListIcon";
import UnorderedListIcon from "../../../icons/Editor/UnorderedListIcon";
import LinkIcon from "../../../icons/Editor/LinkIcon";
import ImageIcon from "../../../icons/Editor/ImageIcon";
import 'pell/dist/pell.css'

type Props = {
    id: string
    label?: string
    value: string
    error: string
    onChange: (html: string) => void
    disabled: boolean
    required: boolean
}

// @ts-ignore
const FormRichTextEditor = ({id, value, label, required, error, onChange, disabled, ...otherProps}: Props) => {
    const [editor, setEditor] = useState(undefined)
    const onEditorChange = (html: string) => {
        if (!disabled) {
            onChange(html)
        }
    }

    useEffect(() => {
        const editor = init({
            element: document.getElementById(id)!,
            onChange: onEditorChange,
            defaultParagraphSeparator: 'p',
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if (editor) {
            // @ts-ignore
            editor.content.innerHTML = value
        }
    }, [value, editor])

    return (
        <div className={clsx(styles.FormRichTextEditor, {
            [styles.Invalid]: error?.length > 0
        })}>
            {label && <label>{label}{required ? <span>*</span> : null}</label>}
            <div
                id={id}
                className={styles.Editor}
                spellCheck={false}
                {...otherProps} />

            {error?.length > 0 &&
                <div className={styles.ErrorText}>
                    {error}
                </div>
            }
        </div>
    )
}

FormRichTextEditor.defaultProps = {
    error: '',
    value: '',
    disabled: false,
    required: false
}

export default FormRichTextEditor
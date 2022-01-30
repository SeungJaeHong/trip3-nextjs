import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"
import stylesInput from "../FormInput/FormInput.module.scss"
import styles from "./FormCodeMirrorEditor.module.scss"
import clsx from "clsx"
import dynamic from "next/dynamic"
import "easymde/dist/easymde.min.css"
import EasyMDE from "easymde"
import { useDebounce } from 'use-debounce'
import {parseFlightBody} from "../../../services/flight.service"
import {parseNewsBody} from "../../../services/news.service"
import CheckIcon from "../../../icons/CheckIcon"

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), { ssr: false })

type Props = {
    id: string
    name: string
    value: string
    label?: string
    placeholder?: string
    type: 'flight' | 'news'
    onChange: (value: any) => void
    error: string
    disabled: boolean
    className?: string
}

const FormCodeMirrorEditor = ({ id, name, value, label, type, error, onChange, className }: Props) => {
    const [editorValue, setEditorValue] = React.useState<string>(value)
    const editorRef = useRef(null)
    const [showEditor, setShowEditor] = useState<boolean>(false)
    const [debouncedValue] = useDebounce(editorValue, 500)
    const [previewValue, setPreviewValue] = React.useState<string>('')

    const onEditorChange = useCallback((value: string) => {
        setEditorValue(value)
    }, [])

    useEffect(() => {
        if (debouncedValue) {
            if (type === 'news') {
                parseNewsBody(debouncedValue).then(res => {
                    setPreviewValue(res.data)
                })
            } else {
                parseFlightBody(debouncedValue).then(res => {
                    setPreviewValue(res.data)
                })
            }
        }
    }, [debouncedValue])

    const saveChanges = () => {
        onChange(editorValue)
        setShowEditor(false)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [showEditor])

    const getToolbar = () => {
        let toolbar =  [
            {
                name: 'bold',
                action: EasyMDE.toggleBold,
                className: "fa fa-bold",
                title: 'Bold',
            },
            {
                name: 'italics',
                action: EasyMDE.toggleItalic,
                className: "fa fa-italic",
                title: 'italic',
            },
            '|',
            'unordered-list',
            'ordered-list',
            '|',
            'heading-1',
            'heading-2',
            'heading-3',
            '|',
            {
                name: 'table',
                action: (editor: EasyMDE) => {
                    const cm = editor.codemirror;
                    const doc = cm.getDoc()
                    const cursor = doc.getCursor()
                    doc.replaceRange('\nEsimene | Teine\n---|---\nEsimene | Teine\n\n', cursor)
                    doc.setCursor({
                        line: cursor.line + 4,
                        ch: 7
                    })
                    editor.codemirror.focus()
                },
                className: "fa fa-table",
                title: 'Table'
            },
            {
                name: 'calendar',
                action: (editor: EasyMDE) => {
                    const cm = editor.codemirror;
                    const doc = cm.getDoc()
                    const cursor = doc.getCursor()
                    doc.replaceRange(
                        '\n[[\n\nJaanuar:\n\n- Date link\n\n- Date link\n\nVeebruar:\n\n- Date link\n\n- Date link\n\n]]\n\n',
                        cursor
                    )
                    doc.setCursor({
                        line: cursor.line + 3,
                        ch: 7
                    })
                    editor.codemirror.focus()
                },
                className: "fa fa-calendar",
                title: 'Calendar'
            },
            {
                name: 'link',
                action: (editor: EasyMDE) => {
                    const cm = editor.codemirror;
                    let text = cm.getSelection();
                    const doc = cm.getDoc()
                    const link = window.prompt('Link', 'http://')
                    doc.replaceSelection('[' + text + '](' + link + ')')
                    editor.codemirror.focus()
                },
                className: "fa fa-link",
                title: 'Link'
            },
            {
                name: 'image',
                action: (editor: EasyMDE) => {
                    const cm = editor.codemirror
                    const doc = cm.getDoc()
                    const cursor = doc.getCursor()

                    const imageId = '[[34245]]'

                    doc.replaceRange('\n\n' + imageId + '\n', cursor)
                    doc.setCursor({
                        line: cursor.line + 3,
                        ch: 0
                    })
                    editor.codemirror.focus()
                },
                className: "fa fa-image",
                title: 'Image'
            }
        ]

        if (type === 'news') {
            return toolbar.filter((item: any) => {
                return item.name !== 'calendar'
            })
        }

        return toolbar
    }

    const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
            lineNumbers: false,
            theme: 'neo',
            toolbar: getToolbar()
        }
    }, [])

    return (
        <>
            <div className={clsx(stylesInput.FormInput, styles.FormCodeMirrorEditor, className, {
                [stylesInput.Invalid]: error.length > 0
            })}>
                {label !== undefined &&
                    <label htmlFor={id ?? name}>
                        {label}
                    </label>
                }

                <textarea
                    value={value}
                    name={name}
                    spellCheck={false}
                    rows={8}
                    onClick={() => setShowEditor(true)}
                    readOnly={true} />

                {error?.length > 0 &&
                    <div className={stylesInput.ErrorText}>
                        {error}
                    </div>
                }
            </div>
            {showEditor &&
                <div className={styles.Editor}>
                    <div className={styles.SaveButton} onClick={saveChanges}>
                        <CheckIcon />
                    </div>
                    <div className={styles.EditorContainer}>
                        <div className={styles.Code} ref={editorRef}>
                            <SimpleMdeReact
                                // @ts-ignore
                                options={autofocusNoSpellcheckerOptions}
                                value={editorValue}
                                onChange={onEditorChange} />
                        </div>
                        <div className={styles.Preview} dangerouslySetInnerHTML={{ __html: previewValue }} />
                    </div>
                </div>
            }
        </>
    )
}

FormCodeMirrorEditor.defaultProps = {
    value: '',
    label: undefined,
    spellCheck: false,
    error: '',
    type: 'flight'
}

export default FormCodeMirrorEditor
import React, {useCallback, useMemo, useRef, useState} from "react"
import stylesInput from "../FormInput/FormInput.module.scss"
import styles from "./FormCodeMirrorEditor.module.scss"
import clsx from "clsx"
import dynamic from "next/dynamic"
import "easymde/dist/easymde.min.css"
import EasyMDE from "easymde"

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), { ssr: false });

type Props = {
    id: string
    name: string
    label?: string
    placeholder?: string
    onChange: (value: any) => void
    error: string
    disabled: boolean
    className?: string
}

const FormCodeMirrorEditor = ({ id, name, label, error, onChange, className }: Props) => {
    const [value, setValue] = React.useState<string|undefined>("**Hello world!!!**")
    const editorRef = useRef(null)
    //const [editor, setEditor] = useState()

    const [showEditor, setShowEditor] = useState<boolean>(false)

    const onEditorChange = useCallback((value: string) => {
        setValue(value)
    }, [])

    const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
            lineNumbers: false,
            theme: 'neo',
            toolbar: [
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

                <textarea spellCheck={false} rows={8} name={name} onClick={() => setShowEditor(true)} />

                {error?.length > 0 &&
                    <div className={stylesInput.ErrorText}>
                        {error}
                    </div>
                }
            </div>
            {showEditor &&
                <div className={styles.Editor}>
                    {/*<div className={styles.Toolbar}>
                        <div className={styles.ActionButtons}>
                            <div className={styles.Button}>
                                B
                            </div>
                            <div className={styles.Button}>
                                I
                            </div>
                            <div className={styles.Button}>
                                H3
                            </div>
                            <div className={styles.Button}>
                                H4
                            </div>
                            <div className={styles.Button}>
                                Pilt
                            </div>
                        </div>
                        <div className={styles.SaveButton} onClick={() => setShowEditor(false)}>
                            OK
                        </div>
                    </div>*/}
                    <div className={styles.EditorContainer}>
                        <div className={styles.Code} ref={editorRef}>
                            <SimpleMdeReact
                                // @ts-ignore
                                options={autofocusNoSpellcheckerOptions}
                                value={value}
                                onChange={onEditorChange} />
                        </div>
                        <div className={styles.Result}>
                            Results
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

FormCodeMirrorEditor.defaultProps = {
    label: undefined,
    spellCheck: false,
    error: ''
}

export default FormCodeMirrorEditor
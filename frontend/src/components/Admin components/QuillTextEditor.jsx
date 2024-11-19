import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuillTextEditor({ className }) {
    const [value, setValue] = useState('');

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ];

    const module = {
        toolbar: toolbarOptions,
    };

    return (
        <div className={`${className} flex flex-col`}>
            {/* Container with relative positioning */}
            <div className="relative h-[600px]">
                {/* Quill editor with absolute positioning to fill container */}
                <ReactQuill 
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={module}
                    className="absolute inset-0"
                    style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                />
                <style>{`
                    /* Target the Quill editor container */
                    .quill {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                    
                    /* Target the content area */
                    .ql-container {
                        flex: 1;
                        overflow: auto;
                    }
                    
                    /* Target the toolbar */
                    .ql-toolbar {
                        flex: 0 0 auto;
                    }
                    
                    /* Target the editor area */
                    .ql-editor {
                        min-height: 100%;
                    }
                `}</style>
            </div>
        </div>
    );
}

export default QuillTextEditor;
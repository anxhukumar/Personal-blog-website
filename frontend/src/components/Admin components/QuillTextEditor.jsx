import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuillTextEditor({ className, value, onChange}) {
    

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        // to add image just replace with this ['link', 'image', 'formula']
        ['link','formula'], 
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

    const modules = {
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
                    onChange={onChange}
                    modules={modules}
                    className="absolute inset-0"
                    style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
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
                        background-color: #1E1F21 !important;
                        color: #EEEEEE !important;
                    }

                    /* Ensure placeholder text is visible */
                    .ql-editor.ql-blank::before {
                        color: #EEEEE !important;
                    }
                `}</style>
            </div>
        </div>
    );
}

export default QuillTextEditor;
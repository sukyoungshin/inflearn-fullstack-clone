'use client';

import {CKEditor as CKEditorReact} from '@ckeditor/ckeditor5-react';
import {
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  Heading,
  Image,
  ImageUpload,
  Indent,
  Italic,
  Link,
  List,
  Paragraph,
  Table,
  TableToolbar,
} from 'ckeditor5';

interface CustomEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CKEditor = ({value, onChange}: CustomEditorProps) => {
  return (
    <div className='ck-editor-container prose'>
      <CKEditorReact
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: 'GPL',
          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Link,
            Image,
            ImageUpload,
            Table,
            TableToolbar,
            BlockQuote,
            List,
            Heading,
            Indent,
            Base64UploadAdapter,
          ],
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'undo',
            'redo',
          ],
          language: 'ko',
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default CKEditor;

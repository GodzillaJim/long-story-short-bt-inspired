import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
interface IProps {
  handleChange: (newValue: string) => void;
  value: string;
}
const CustomRichTextEditor = (props: IProps) => {
  const [value, setValue] = useState<any>('');
  const handleEditorChange = (a: string, e: any) => {
    props.handleChange(a);
    setValue(a);
  };
  return (
    <Editor
      apiKey="emuxgxkadilqqthyqj7hactojqo01jx5zp7jwyuujq0t2d1v"
      initialValue="<p>Initial content</p>"
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image',
          'charmap print preview anchor help',
          'searchreplace visualblocks code',
          'insertdatetime media table paste wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic | \
          alignleft aligncenter alignright | \
          bullist numlist outdent indent | help',
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default CustomRichTextEditor;

import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
interface IProps {
  handleChange: (newValue: string) => void;
  value: string;
  loading: boolean;
}
const CustomRichTextEditor = (props: IProps) => {
  const handleEditorChange = (a: string, e: any) => {
    props.handleChange(a);
  };
  return (
    <Editor
      apiKey="emuxgxkadilqqthyqj7hactojqo01jx5zp7jwyuujq0t2d1v"
      disabled={props.loading}
      initialValue="<p>Initial content</p>"
      init={{
        height: 500,
        plugins:
          'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
        imagetools_cors_hosts: ['picsum.photos'],
        menubar: 'file edit view insert format tools table help',
        toolbar:
          'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
        toolbar_sticky: false,
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: false,
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default CustomRichTextEditor;

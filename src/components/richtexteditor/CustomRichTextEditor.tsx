import { useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const CustomRichTextEditor = () => {
  const [content, setContent] = useState<string>('');
  const options = {
    rtl: false,
    katex: 'window.katex',
    imageGalleryUrl:
      'https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo',
    videoFileInput: false,
    tabDisable: false,
    buttonList: [
      [
        'undo',
        'redo',
        'font',
        'fontSize',
        'formatBlock',
        'paragraphStyle',
        'blockquote',
        'bold',
        'underline',
        'italic',
        'strike',
        'subscript',
        'superscript',
        'fontColor',
        'hiliteColor',
        'textStyle',
        'removeFormat',
        'outdent',
        'indent',
        'align',
        'horizontalRule',
        'list',
        'lineHeight',
        'table',
        'link',
        'image',
        'video',
        'audio',
        'math',
        'imageGallery',
        'fullScreen',
        'showBlocks',
        'codeView',
        'preview',
        'print',
        'save',
        'template',
      ],
    ],
    'lang(In nodejs)': 'en',
    height: '300px',
  };
  useEffect(() => {
    console.log(content);
  });
  return (
    <div>
      <SunEditor
        setContents={content}
        onChange={setContent}
        setOptions={{ ...options }}
      />
    </div>
  );
};
export default CustomRichTextEditor;

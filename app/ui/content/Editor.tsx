import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Editor({
    value,
    onChange
}: {
    value: string,
    onChange: (value: string) => void
}) {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={value}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
            }}
            onReady={(editor) => {
                editor.setData(value);
            }}
        />
    );
}
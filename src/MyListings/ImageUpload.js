import React from "react";
import { FileUpload } from "primereact/fileupload";

export default function AdvanceDemo({onUploadHandler}) {
  return (
    <div className="card">
      <FileUpload
        name="demo[]"
        accept="image/*"
        maxFileSize={1000000}
        customUpload={true}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
        uploadHandler={onUploadHandler}
      />
    </div>
  );
}

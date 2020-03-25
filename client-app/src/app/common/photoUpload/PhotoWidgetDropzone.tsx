import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Header } from "semantic-ui-react";

interface Iprops {
  setFiles: (files: object[]) => void;
}

const dropzoneStyles = {
  border: "dashed 3px ",
  borderColor: "#eee",
  borderRadius: "5px",
  paddingTop: "30px",
  textAlign: "center" as "center",
  height: "200px"
};

const dropzoneActive = {
  borderColor: "green"
};

const PhotoWidgetDropzone: React.FC<Iprops> = ({ setFiles }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      setFiles(
        acceptedFiles.map((file: object) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles
      }
    >
      <Icon name="upload" size="huge" />
      <Header content="Drop image here" />
    </div>
  );
};

export default PhotoWidgetDropzone;

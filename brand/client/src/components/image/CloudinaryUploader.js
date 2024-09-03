import { useEffect, useRef } from "react";

let cloudinary

const CloudinaryUploader = ({ children, onUpload }) => {
  const widget = useRef()
  useEffect(() => {
    if( !cloudinary ) cloudinary = window.cloudinary

    function onIdle() {
      if ( !widget.current ) widget.current = createWidget()
    }

    return () => {
      widget.current?.destroy();
      widget.current = undefined;
    }
  }, []);

  function createWidget() {
    const cloudName = "dsiqywipd"
    const uploadPreset = "bqwxyyix"

    const options = {
      cloudName,
      uploadPreset,
    }

    return cloudinary?.createUploadWidget(options,
      function (error, result) {
        if ((error || result.event === 'success') && typeof onUpload === 'function' ) {
          onUpload(error, result, widget);
        }
      }
    );
  }
  
  function open() {
    if ( !widget.current ) widget.current = createWidget()
    widget.current && widget.current.open()
  }

  return (
    <>
      {children({ cloudinary, widget, open })}
    </>
  )
};

export default CloudinaryUploader;
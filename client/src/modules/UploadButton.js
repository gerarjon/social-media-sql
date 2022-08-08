import React, { useEffect, useState } from 'react';

const UploadButton = ({file}) => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(()=> {
    if (!file) { return; }
    setLoading(true);
    let reader = new FileReader();

    reader.onloadend = () => {
      setLoading(false);
      setThumbnail(reader.result);
    }

    reader.readAsDataURL(file);
  }, [file])

  if (loading) { return <p>Loading...</p> }

  if (file) return (
    <img 
      src={thumbnail}
      alt={file.name}
      height={200}
      width={200}
    />
  )
}

export default UploadButton;
export const generateUUID = () => {
  let
    d = new Date().getTime(),
    d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
};

export const uploadPhoto = async (e) => {
  const file = e.target.files[0];
  // console.log(file)
  const filename = encodeURIComponent(file.name);
  const target = generateUUID() + '.' + filename.split('.').pop()
  const res = await fetch(`/api/upload-url?file=${filename}&target=${target}`);  
  const { url, fields } = await res.json();
  const formData = new FormData();
  console.log(url + " " + fields)
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
  });

  const upload = await fetch(url, {
      method: 'POST',
      body: formData,
  });

  if (upload.ok) {
      console.log('Uploaded successfully!');
      return(url + target)
  } else {
      console.error('Upload failed.');
      return null
  }
};
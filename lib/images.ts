const urlToBase64 = async (url: string) => {
  await fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((res) => {
        reader.onloadend = () => {
          res(reader.result);
        };
      });
    });
};

export { urlToBase64 };

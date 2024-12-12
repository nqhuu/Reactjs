class CommonUtils {

  //mã hóa hình ảnh, video...sang theo chuẩn base64
  static getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

}

export default CommonUtils;
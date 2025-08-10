function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64 = reader.result.split(",")[1]; // remove prefixo data:application/pdf;base64,
        resolve(base64);
      } else {
        reject("Erro ao ler arquivo");
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

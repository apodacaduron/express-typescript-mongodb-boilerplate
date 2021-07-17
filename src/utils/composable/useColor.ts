export type ColorFormat = "hex" | "rgb";

const useColor = (format?: ColorFormat) => {
  let color = "";

  switch (format) {
    case "hex":
      color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      break;

    default:
      color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      break;
  }

  return { color };
};

export default useColor;

const CheckIcon = ({
  height,
  width,
  color,
}: {
  height?: number;
  width?: number;
  color?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ? `${width}px` : "800px"}
    height={height ? `${height}px` : "800px"}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M4 12.6111L8.92308 17.5L20 6.5"
      stroke={color ? color : "#000"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CheckIcon;

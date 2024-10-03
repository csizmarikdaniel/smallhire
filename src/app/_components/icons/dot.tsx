const DotIcon = ({
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
      d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z"
      fill={color ?? "#000000"}
    />
  </svg>
);

export default DotIcon;

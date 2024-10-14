const AddIcon = ({
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
  >
    <title />

    <g id="Complete">
      <g data-name="add" id="add-2">
        <g>
          <line
            fill="none"
            stroke={color ?? "#000000"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="12"
            x2="12"
            y1="19"
            y2="5"
          />

          <line
            fill="none"
            stroke={color ?? "#000000"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="5"
            x2="19"
            y1="12"
            y2="12"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default AddIcon;

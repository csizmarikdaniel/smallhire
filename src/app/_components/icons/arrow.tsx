const ArrowIcon = ({
  height,
  width,
  color,
  direction,
}: {
  height?: number;
  width?: number;
  color?: string;
  direction?: "up" | "down" | "left" | "right";
}) => (
  <div
    className={
      direction &&
      `${direction == "up" ? "rotate-90" : direction === "down" ? "-rotate-90" : direction === "right" ? "rotate-180" : ""}`
    }
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? `${width}px` : "800px"}
      height={height ? `${height}px` : "800px"}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
        fill={color ?? "#0F0F0F"}
      />
    </svg>
  </div>
);

export default ArrowIcon;

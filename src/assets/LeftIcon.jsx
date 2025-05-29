import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"
const LeftIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <G
      fill="none"
      stroke="snow"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="m14 16-4-4 4-4" />
    </G>
  </Svg>
)
export default LeftIcon
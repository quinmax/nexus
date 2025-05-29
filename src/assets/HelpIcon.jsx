import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"
const HelpIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <G
      fill="none"
      stroke="snow"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01" />
    </G>
  </Svg>
)
export default HelpIcon
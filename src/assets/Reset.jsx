import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <G
      fill="none"
      stroke="snow"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Path d="M10 2h4m-2 12v-4m-8 3a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" />
      <Path d="M9 17H4v5" />
    </G>
  </Svg>
)
export default SvgComponent
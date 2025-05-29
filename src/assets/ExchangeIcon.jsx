import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const ExchangeIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <G
      fill="none"
      stroke="snow"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Path d="m2 9 3-3 3 3" />
      <Path d="M13 18H7a2 2 0 0 1-2-2V6m17 9-3 3-3-3" />
      <Path d="M11 6h6a2 2 0 0 1 2 2v10" />
    </G>
  </Svg>
)
export default ExchangeIcon
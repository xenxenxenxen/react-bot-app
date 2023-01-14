import React from "react"
import ContentLoader from "react-content-loader"

export const MyLoader = (props) => (
  <ContentLoader 
    speed={4}
    width={1920}
    height={1080}
    viewBox="0 0 1920 1080"
    backgroundColor="#9d9595"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="60" rx="12" ry="12" width="250" height="300" /> 
    <rect x="290" y="60" rx="12" ry="12" width="250" height="300" /> 
    <rect x="580" y="60" rx="12" ry="12" width="250" height="300" /> 
    <rect x="870" y="60" rx="12" ry="12" width="250" height="300" />
  </ContentLoader>
)

export default MyLoader
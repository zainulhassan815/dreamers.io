import { StaticImage } from "gatsby-plugin-image";
import React from "react";

const BrandLogo = () => {
  return (
    <StaticImage
      src="../content/images/logo.svg"
      placeholder="blurred"
      alt="Dreamers Lab"
      height={36}
      width={36}
    />
  );
};

export default BrandLogo;

/**@jsx jsx */
import { jsx } from "@emotion/react";
import { useStyleContext } from "../style_context/use_style_context";
import { navbarStyle } from "./navbar_style";

export function Navbar(): JSX.Element {
  const styleContext = useStyleContext();

  return (
    <div css={navbarStyle(styleContext)}>
      <div className="page-name-wrapper">
        <img className="logo" src="./home.svg" alt="logo" />
        <span className="page-name">Famly Infinite scroll</span>
      </div>
    </div>
  );
}

import { css, SerializedStyles } from "@emotion/react";
import { StyleContext } from "../style_context/style_context";

export function homePageStyle(styleContext: StyleContext): SerializedStyles {
  return css`
    label: home-page;

    display: flex;

    margin: 80px auto;
    flex-direction: column;
    width: 70%;
    text-align: center;

    .welcome {
      font-size: ${styleContext.sizes.font.welcome};
      color: ${styleContext.shades.text};
    }

    .instruction {
      font-size: ${styleContext.sizes.font.headline};
      color: ${styleContext.shades.text};
    }
  `;
}

export function homePageSuspendingStyle(
  styleContext: StyleContext
): SerializedStyles {
  return css`
    label: home-page;
    height: 80%;

    .header {
      display: flex;
      width: 70%;
      margin: auto;
      align-content: center;
      justify-content: space-around;
      padding: 16px;
      text-align: left;

      > * {
        flex: 1 0 0;
        color: ${styleContext.shades.text};
        font-size: ${styleContext.sizes.font.text};
        text-align: center;
      }

      .name {
        text-align: left;
      }
    }

    .scrollable-content {
      overflow-y: auto;
      height: 300px;
    }
  `;
}

/**@jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLanguageTranslation } from "../i18n";
import { daycareStore } from "../store/daycare_store";
import { useStyleContext } from "../style_context/use_style_context";
import { homePageStyle, homePageSuspendingStyle } from "./home_page_style";

export function HomePage(): JSX.Element {
  return (
    <React.Suspense fallback={<HomePageFallback />}>
      <HomePageSuspending />
    </React.Suspense>
  );
}

function HomePageFallback(): JSX.Element {
  const [t] = useLanguageTranslation();
  const styleContext = useStyleContext();
  return (
    <div css={homePageStyle(styleContext)}>
      <span className="welcome">{t("welcome")}</span>
      <span className="instruction">{t("homeInstruction")}</span>
    </div>
  );
}

const HomePageSuspending = () => {
  const styleContext = useStyleContext();
  const [t] = useLanguageTranslation();
  const children = daycareStore.getCurrentDataAdapted().children;
  const numberOfItemsMultiplier = React.useRef(1);
  const numberOfItemsToScroll = 20;
  const numberOfItemsToRender = React.useMemo(
    () => numberOfItemsToScroll * numberOfItemsMultiplier.current,
    [children, numberOfItemsToScroll, numberOfItemsMultiplier]
  );
  const increaseMultiplier = React.useCallback(
    () => numberOfItemsMultiplier.current++,
    [numberOfItemsMultiplier, numberOfItemsMultiplier.current]
  );
  return (
    <div css={homePageSuspendingStyle(styleContext)}>
      <div className="scrollable-content">
        <InfiniteScroll
          dataLength={children.length}
          next={increaseMultiplier}
          hasMore={numberOfItemsToRender < children.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {children
            .slice(0, Math.max(numberOfItemsToRender, children.length) - 1)
            .map((child) => (
              <Child key={child.name.fullName} />
            ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

function Child(props: any): JSX.Element {
  return <div></div>;
}

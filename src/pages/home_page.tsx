/**@jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLanguageTranslation } from "../i18n";
import { Child, daycareStore } from "../store/daycare_store";
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
  const [numberOfItemsToRender, setNumberOfItemstoRender] = React.useState(20);
  const increaseMultiplier = React.useCallback(() => {
    setNumberOfItemstoRender((currentNumber) => currentNumber + 20);
  }, []);
  return (
    <div css={homePageSuspendingStyle(styleContext)}>
      <div className="scrollable-content">
        <InfiniteScroll
          dataLength={numberOfItemsToRender}
          next={increaseMultiplier}
          hasMore={numberOfItemsToRender < children.length}
          loader={<h4>{t("loading")}</h4>}
          height="300px"
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>{t("seenAll")}</b>
            </p>
          }
        >
          {children
            .slice(0, Math.min(numberOfItemsToRender, children.length) - 1)
            .map((child, idx) => (
              <RenderChild
                key={`${child.name.fullName}-${idx}`}
                child={child}
              />
            ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

function RenderChild(props: { child: Child }): JSX.Element {
  const { child } = props;
  const [checkinHour, setCheckinHour] = React.useState(16);
  const [checkinMinute, setCheckinMinute] = React.useState(0);
  const [error, setError] = React.useState(undefined);
  const handleError = React.useCallback(
    (error) => setError(error.statusText),
    []
  );
  const updateCheckinHour = React.useCallback(
    (event) => setCheckinHour(event.target.value),
    []
  );
  const updateCheckinMinute = React.useCallback(
    (event) => setCheckinMinute(event.target.value),
    []
  );
  const onCheckin = React.useCallback(
    () =>
      checkin(child, `${checkinHour}:${checkinMinute}`).catch((error) =>
        handleError(error)
      ),
    [child, checkinHour, checkinMinute, handleError]
  );
  const onCheckout = React.useCallback(
    () => checkout(child).catch((error) => handleError(error)),
    [child, handleError]
  );
  const [t] = useLanguageTranslation();
  return (
    <div>
      <span>{child.name.fullName}</span>
      <div>
        <div>
          <span>{t("pickupTime")}</span>
          <input
            type="number"
            min={0}
            max={24}
            value={checkinHour}
            onChange={updateCheckinHour}
          />
          :
          <input
            type="number"
            min={0}
            max={59}
            value={checkinMinute}
            onChange={updateCheckinMinute}
          />
          <button onClick={onCheckin}>{t("checkIn")}</button>
        </div>
        <div>
          <button onClick={onCheckout}>{t("checkOut")}</button>
        </div>
      </div>
      <span style={{ color: "red" }}>{error}</span>
    </div>
  );
}

function checkin(child: Child, pickupTime: string): Promise<unknown> {
  return fetch(getCheckinUrl(child.id), {
    headers: getHeaders(),
    method: "POST",
    body: JSON.stringify({
      accessToken: "234ffdb8-0889-4be3-b096-97ab1679752c",
      pickupTime,
    }),
  }).then((response) => response.json());
}

function checkout(child: Child): Promise<unknown> {
  return fetch(getCheckoutUrl(child.id), {
    headers: getHeaders(),
    method: "POST",
    body: JSON.stringify({
      accessToken: "234ffdb8-0889-4be3-b096-97ab1679752c",
    }),
  }).then((response) => response.json());
}

function getHeaders(): Headers {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  return headers;
}

function getCheckinUrl(id: string): string {
  return `https://tryfamly.co/api/v2/children/${id}/checkins`;
}

function getCheckoutUrl(id: string): string {
  return `https://tryfamly.co/api/v2/children/${id}/checkout`;
}

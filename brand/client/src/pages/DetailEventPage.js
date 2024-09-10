import Layout from "components/layout/Layout";
import EventVoucherNum from "module/event/EventVoucherNum";
import EventImage from "module/event/EventImage";
import EventMeta from "module/event/EventMeta";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { eventContext } from "contexts/eventContext";
import { authContext } from "contexts/authContext";
import HTMLReactParser from "html-react-parser";
import BrandItem from "components/brand/BrandItem";
import EventRelated from "module/event/EventRelated";
import { voucherContext } from "contexts/voucherContext";

const EventDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .event {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .event {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
  }
`;

const DetailEventPage = () => {
  const { slug } = useParams();
  const {
    eventState: { detailedevent, allevents, games },
    getDetailedEvent, getAllEventsEver, getGameName
  } = useContext(eventContext);
  const id = slug;
  const detailid = id;

  useState(() => getDetailedEvent(detailid), []);
  useState(() => getGameName(detailid), []);

  const brand_name = detailedevent[0]?.brand_name;
  const brand_id = detailedevent[0]?.id_thuonghieu;

  const [gamename, setgameName] = useState("")

  useEffect(() => {
    if (detailedevent.length > 0) {
      const event = detailedevent[0];
      const game = games.find((game) => game.id === event.id_game)
      setgameName(game ? game.name : "")
    }
  }, [detailedevent]);

  const {
    authState: { brand },
  } = useContext(authContext);

  const {
    voucherState: { voucherevent },
    getVoucherEvent
  } = useContext(voucherContext)

  useState(() => getAllEventsEver(), []);
  useState(() => getVoucherEvent(detailid), []);

  let relatedEvents = allevents.filter((event) => {
    return (
      event?.id_thuonghieu === detailedevent[0]?.id_thuonghieu &&
      event?.id_sukien !== detailedevent[0]?.id_sukien
    );
  });
  relatedEvents =
    relatedEvents.length > 4 ? relatedEvents.slice(0, 4) : relatedEvents;

  return (
    <>
      {detailedevent.map((event) => (
        <EventDetailsPageStyles>
          <Layout isHomePage={true}>
            <div className="container">
              <div className="event-header">
                <EventImage
                  url={event.hinhanh}
                  className="event-feature"
                ></EventImage>
                <div className="event-info">
                  <EventVoucherNum className="mb-4">Vouchers Available:</EventVoucherNum>
                  {voucherevent.map((voucher, i) => (
                    <div key={i} className="ml-4 mb-4">
                      <span className="text-white bg-green-600 p-1 rounded">{voucher.tenvoucher}</span>
                      <span className="ml-4 text-white bg-red-600 p-1 rounded">{voucher.soluong}</span>
                    </div>
                  ))}
                  <h1 className="event-heading mt-8">{event.tensukien}</h1>
                  <EventMeta
                    startdate={event.thoigianbatdau}
                    enddate={event.thoigianketthuc}
                    brandName={brand_name}
                    brandId={brand_id}
                  ></EventMeta>
                  <EventVoucherNum className="mt-4">Game: {gamename}</EventVoucherNum>
                </div>
              </div>
              <div className="event-content">
                <div className="entry-content">
                  {HTMLReactParser(event?.mota || "")}
                </div>
                <BrandItem brand={brand}></BrandItem>
              </div>
              <EventRelated events={relatedEvents}></EventRelated>
            </div>
          </Layout>
        </EventDetailsPageStyles>
      ))}
    </>
  );
};
export default DetailEventPage;
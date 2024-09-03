import Layout from "components/layout/Layout";
import EventVoucherNum from "module/event/EventVoucherNum";
import EventImage from "module/event/EventImage";
import EventMeta from "module/event/EventMeta";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { eventContext } from "contexts/eventContext";
import { authContext } from "contexts/authContext";
// import HTMLReactParser from "html-react-parser";
import BrandItem from "components/brand/BrandItem";

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

const DetailPage = () => {
  const { slug } = useParams();
  const {
    eventState: { detailedevent },
    getDetailedEvent,
  } = useContext(eventContext);
  const id = slug;
  const detailid = { id };
  useState(() => getDetailedEvent(detailid), []);

  const {
    authState: { allbrand },
    allBrand,
  } = useContext(authContext);

  useState(() => allBrand(), []);
  // useState(() => getAllEventsEver(), []);

  const getBrand = (id) => {
    if (!allbrand || !Array.isArray(allbrand)) {
      return "Unknown Brand";
    }
    const brand = allbrand.filter((u) => {
      return u?.id_thuonghieu === id;
    });
    return Object.values(brand[0]) || "Unknown Brand";
  };

  const brand = getBrand(detailedevent[0]?.id_thuonghieu);
  console.log(brand)

  // let relatedEvents = allevents.filter((event) => {
  //   return (
  //     event?.category === detailevent[0]?.category &&
  //     event?._id !== detailevent[0]?._id
  //   );
  // });
  // relatedEvents =
  //   relatedEvents.length > 4 ? relatedEvents.slice(0, 4) : relatedEvents;
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
                  <EventVoucherNum className="mb-6">Vouchers Available: {event.soluongvoucher}</EventVoucherNum>
                  <h1 className="event-heading">{event.tensukien}</h1>
                  <EventMeta
                    date={event.thoigianbatdau.slice(0, -5)}
                    brandName={brand[1]}
                  ></EventMeta>
                </div>
              </div>
              <div className="event-content">
                {/* <div className="entry-content">
                  {HTMLReactParser(event?.content || "")}
                </div> */}
                <BrandItem brand={brand}></BrandItem>
              </div>
            </div>
          </Layout>
        </EventDetailsPageStyles>
      ))}
    </>
  );
};
export default DetailPage;
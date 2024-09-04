import Layout from "components/layout/Layout";
import VoucherValue from "module/voucher/VoucherValue";
import VoucherImage from "module/voucher/VoucherImage";
import VoucherMeta from "module/voucher/VoucherMeta";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { voucherContext } from "contexts/voucherContext";
import { authContext } from "contexts/authContext";
import HTMLReactParser from "html-react-parser";
import BrandItem from "components/brand/BrandItem";
import VoucherRelated from "module/voucher/VoucherRelated";

const VoucherDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .voucher {
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
    .voucher {
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

const DetailVoucherPage = () => {
  const { slug } = useParams();
  const {
    voucherState: { detailedvoucher, allvouchers },
    getDetailedVoucher, getAllVouchersEver
  } = useContext(voucherContext);
  const id = slug;
  const detailid = id;

  useState(() => getDetailedVoucher(detailid), []);

  const brand_name = detailedvoucher[0]?.brand_name;
  const brand_id = detailedvoucher[0]?.id_thuonghieu;

  const {
    authState: { brand },
  } = useContext(authContext);

  useState(() => getAllVouchersEver(), []);

  let relatedVouchers = allvouchers.filter((voucher) => {
    return (
      voucher?.id_thuonghieu === detailedvoucher[0]?.id_thuonghieu &&
      voucher?.id_voucher !== detailedvoucher[0]?.id_voucher
    );
  });
  relatedVouchers =
    relatedVouchers.length > 4 ? relatedVouchers.slice(0, 4) : relatedVouchers;

  return (
    <>
      {detailedvoucher.map((voucher) => (
        <VoucherDetailsPageStyles>
          <Layout isHomePage={true}>
            <div className="container">
              <div className="voucher-header">
                <VoucherImage
                  url={voucher.hinhanh}
                  className="voucher-feature"
                ></VoucherImage>
                <div className="voucher-info">
                    <VoucherImage
                    url={voucher.qrcode}
                    className="h-2/4 w-2/4 mb-6"
                    ></VoucherImage>
                  <VoucherValue className="mb-6">Voucher Value: {voucher.trigia}</VoucherValue>
                  <h1 className="voucher-heading">{voucher.ten}</h1>
                  <VoucherMeta
                    date={voucher.ngayhethan.slice(0, -5)}
                    brandName={brand_name}
                    brandId={brand_id}
                  ></VoucherMeta>
                </div>
              </div>
              <div className="voucher-content">
                <div className="entry-content">
                  {HTMLReactParser(voucher?.mota || "")}
                </div>
                <BrandItem brand={brand}></BrandItem>
              </div>
              <VoucherRelated vouchers={relatedVouchers}></VoucherRelated>
            </div>
          </Layout>
        </VoucherDetailsPageStyles>
      ))}
    </>
  );
};
export default DetailVoucherPage;
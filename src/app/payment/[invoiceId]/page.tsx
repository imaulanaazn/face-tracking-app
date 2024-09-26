"use client";
import CloseButton from "@/components/global/CloseButton";
import Header from "@/components/global/Header";
import LoadingAnimation from "@/components/global/LoadingAnimation";
import { IOrderDetail } from "@/data-types/merchant";
import { ORDER_STATUS, PaymentAction } from "@/enum";
import { IDRRupiah } from "@/lib/formatter";
import { getOrderDetail } from "@/services/api/payment";
import {
  faArrowRight,
  faCheck,
  faCircle,
  faCopy,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface IParams {
  params: {
    invoiceId: string;
  };
}

export default function OrderDetail({ params }: IParams) {
  const [orderDetail, setOrderDetail] = useState<IOrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [showModal, setShowModal] = useState<"failed" | "success" | "">("");
  const router = useRouter();

  useEffect(() => {
    async function fetchOrderDetail() {
      try {
        setIsLoading(true);
        const response = await getOrderDetail(params.invoiceId);
        setOrderDetail(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
        console.error(error.message);
      }
    }
    fetchOrderDetail();
  }, []);

  useEffect(() => {
    if (orderDetail?.status === ORDER_STATUS.COMPLETED) {
      setShowModal("success");
    }
    if (
      orderDetail?.status === ORDER_STATUS.FAILED ||
      orderDetail?.status === ORDER_STATUS.PAYMENT_EXPIRED
    ) {
      setShowModal("failed");
    }
  }, [orderDetail?.status, params.invoiceId, router]);

  useEffect(() => {
    const getOrder = async (fromInterval: boolean) => {
      try {
        const response = await getOrderDetail(params.invoiceId);
        setOrderDetail(response.data);

        if (
          fromInterval &&
          ["canceled", "completed", "failed", "payment_expired"].includes(
            response.data.status
          )
        ) {
          setIsFinished(true);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    const interval = setInterval(async () => {
      if (!isFinished) {
        await getOrder(true);
      }
    }, 5000);

    // Clean up interval
    return () => clearInterval(interval);
  }, [orderDetail?.status, isFinished, orderDetail?.orderId, params.invoiceId]);

  function getStatusPayment(status: string): React.JSX.Element {
    let element = <div>{status}</div>;
    if (status === ORDER_STATUS.PENDING_PAYMENT) {
      element = (
        <div className="text-sm font-medium py-1.5 px-4 rounded-full text-yellow-600 bg-yellow-100">
          Pending
        </div>
      );
    }
    if (status === ORDER_STATUS.PROCESSING) {
      element = (
        <div className="text-sm font-medium py-1.5 px-4 rounded-full text-blue-600 bg-blue-100">
          Pending
        </div>
      );
    }
    if (status === ORDER_STATUS.COMPLETED) {
      element = (
        <div className="text-sm font-medium py-1.5 px-4 rounded-full text-emerald-600 bg-emerald-100">
          Success
        </div>
      );
    }
    if (
      status === ORDER_STATUS.CANCELED ||
      status === ORDER_STATUS.FAILED ||
      status === ORDER_STATUS.PAYMENT_EXPIRED
    ) {
      element = (
        <div className="text-sm font-medium py-1.5 px-4 rounded-full text-rose-600 bg-rose-100">
          Failed
        </div>
      );
    }

    return element;
  }

  const getTitlePayment = (paymentActions: any): string => {
    let paymentAction = "";
    for (const property in paymentActions) {
      if (
        property === "checkoutUrl" ||
        property === "qrString" ||
        property === "paymentCode"
      ) {
        if (paymentActions[property]) {
          paymentAction = property;
        }
      }
    }

    let str: string;
    switch (paymentAction) {
      case PaymentAction.PAYMENT_CODE:
        str = "Kode Pembayaran";
        break;
      case PaymentAction.QR_STRING:
        str = "Scan QR untuk bayar";
        break;
      case PaymentAction.CHECKOUT_URL:
        str = "Tekan tombol lanjutkan";
        break;
      default:
        str = "Pembayaran";
        break;
    }

    return str;
  };

  function handleCopyToClipboard() {
    if (orderDetail) {
      navigator.clipboard.writeText(
        PaymentAction.PAYMENT_CODE in orderDetail?.paymentMethod.action
          ? orderDetail?.paymentMethod?.action.paymentCode
          : ""
      );
      toast.success("Number Copied");
    }
  }

  if (isLoading)
    return (
      <div className="w-64 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <LoadingAnimation />
      </div>
    );
  if (!orderDetail && !isLoading)
    return (
      <main className="h-screen w-full flex flex-col justify-center items-center bg-blue-600">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          404
        </h1>
        <div className="bg-emerald-400 px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button className="mt-5">
          <a className="relative inline-block text-sm font-medium text-emerald-500 group active:text-emerald-600 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-emerald-400 group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-blue-600 border border-current">
              <Link href="/">Go Home</Link>
            </span>
          </a>
        </button>
      </main>
    );

  return (
    <>
      {showModal && (
        <StatusModal
          status={showModal}
          handleCloseModal={() => {
            setShowModal("");
          }}
        />
      )}
      <Header />
      <div className="px-6 py-8 md:px-8 md:py-12 lg:p-12 mt-20">
        <h1 className="text-2xl font-semibold text-center max-w-[40rem] mx-auto">
          {
            orderDetail?.orderTimeline[orderDetail.orderTimeline.length - 1]
              .desc
          }
        </h1>
        <div className="step flex items-center w-9/12 md:w-8/12 lg:w-10/12 xl:w-7/12 mx-auto mt-8">
          <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-blue-600 bg-blue-600 text-white">
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="flex-1 h-0.5 bg-blue-600"></div>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 border-blue-600 text-blue-600 ${
              orderDetail?.status === ORDER_STATUS.COMPLETED
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
          >
            <FontAwesomeIcon
              icon={
                orderDetail?.status === ORDER_STATUS.COMPLETED
                  ? faCheck
                  : faCircle
              }
              className="text-sm"
            />
          </div>
          <div className="flex-1 h-0.5 bg-blue-600"></div>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 border-blue-600 text-blue-600 ${
              orderDetail?.status === ORDER_STATUS.COMPLETED
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
          >
            {orderDetail?.status === ORDER_STATUS.COMPLETED && (
              <FontAwesomeIcon icon={faCheck} className="text-sm" />
            )}
          </div>
        </div>
        <div className="w-9/12 md:w-8/12 lg:w-10/12 xl:w-7/12 mx-auto relative mt-4">
          <span className="text-gray-600 text-sm absolute top-0 left-0 -translate-x-1/3">
            Order Created
          </span>
          <span className="text-gray-600 text-sm absolute top-0 left-1/2 -translate-x-1/2 text-center">
            Waiting For Payment
          </span>
          <span className="text-gray-600 text-sm absolute top-0 right-0 translate-x-1/3">
            Order Completed
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 w-full md:w-8/12 lg:w-11/12 xl:w-8/12 mx-auto mt-28">
          <div className="subscription-plan flex-1">
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Subscription Plan
              </h2>
              <div className="my-4">
                <hr />
              </div>
              <div className="flex justify-between items-center mt-3 text-gray-600">
                <span>Name </span>
                <span>{orderDetail?.plan.name} </span>
              </div>
              <div className="flex justify-between items-center mt-3 text-gray-600">
                <span>Price </span>
                <span>
                  {IDRRupiah.format(orderDetail?.plan.price || 0)} / Month
                </span>
              </div>
              <div className="flex justify-between items-center mt-3 text-gray-600">
                <span>Subscription Periode </span>
                <span>{orderDetail?.periodeSubscription} </span>
              </div>
              <div className="flex justify-between items-center mt-3 text-gray-600">
                <span>Subscription Periode In Month</span>
                <span>{orderDetail?.periodeOnMonth} Months</span>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Order Information
              </h2>
              <div className="my-4">
                <hr />
              </div>
              <div className="mt-3 flex justify-between items-center gap-6 text-gray-600">
                <span>Name </span>
                <span>{orderDetail?.plan.name} </span>
              </div>
              <div className="mt-3 flex justify-between items-center gap-6 text-gray-600">
                <span>Amount </span>
                <span>{IDRRupiah.format(orderDetail?.amount || 0)} </span>
              </div>
              <div className="mt-3 flex justify-between items-center gap-6 text-gray-600">
                <span>Transaction Fee</span>
                <span>{IDRRupiah.format(orderDetail?.feeAmount || 0)} </span>
              </div>
              <div className="mt-3 flex justify-between items-center gap-6 text-gray-600">
                <span>Discount</span>
                <span>- {IDRRupiah.format(orderDetail?.discAmount || 0)} </span>
              </div>
              <div className="my-4">
                <hr />
              </div>
              <div className="flex justify-between items-center gap-6">
                <span className="text-lg text-gray-600">Total Amount</span>
                <span className="text-lg font-semibold">
                  {IDRRupiah.format(orderDetail?.totalAmount || 0)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Payment Information
            </h2>
            <div className="my-4">
              <hr />
            </div>
            <div className="flex justify-between items-center gap-6 mt-3 text-gray-600">
              <span>Status </span>
              <span>{getStatusPayment(orderDetail?.status || "")} </span>
            </div>
            <div className="flex justify-between items-center gap-6 mt-3 text-gray-600">
              <span>Invoice ID </span>
              <span>{orderDetail?.invoiceId} </span>
            </div>
            <div className="flex justify-between items-center gap-6 mt-3 text-gray-600">
              <span> Metode Pembayaran </span>
              <span>{orderDetail?.paymentMethod.name} </span>
            </div>
            {(orderDetail?.paymentMethod.cd === "ID_OVO" ||
              orderDetail?.paymentMethod.cd === "OVOPUSH") && (
              <div className="flex justify-between items-center gap-6 mt-3 text-gray-600">
                <span>Nomor OVO</span>
                <span>
                  {"mobileNumber" in orderDetail?.paymentMethod.action &&
                    orderDetail?.paymentMethod.action.mobileNumber.replace(
                      "+62",
                      "0"
                    )}
                </span>
              </div>
            )}

            {orderDetail?.paymentMethod.cd === "ID_JENIUSPAY" && (
              <div className="flex justify-between items-center gap-6 mt-3 text-gray-600">
                <span>Cashtag</span>
                <span>
                  {"cashtag" in orderDetail?.paymentMethod.action &&
                    orderDetail?.paymentMethod.action.cashtag}
                </span>
              </div>
            )}

            <div className="my-4">
              <hr />
            </div>

            {!(
              orderDetail?.paymentMethod.cd === "ID_JENIUSPAY" ||
              orderDetail?.paymentMethod.cd === "ID_OVO" ||
              orderDetail?.paymentMethod.cd === "OVOPUSH"
            ) &&
              orderDetail?.status === ORDER_STATUS.PENDING_PAYMENT && (
                <div className="relative">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">
                      {getTitlePayment(orderDetail?.paymentMethod.action)}
                    </p>
                    <div>
                      <Image
                        src={orderDetail?.paymentMethod.logo || ""}
                        width={50}
                        height={50}
                        alt="Payment method logo"
                      />
                    </div>
                  </div>

                  {PaymentAction.QR_STRING in
                    orderDetail?.paymentMethod.action &&
                    orderDetail?.paymentMethod.action.qrString && (
                      <div className="mt-4 text-center flex justify-center">
                        {/* <div ref={canvasRef}>
                          <Avatar
                            variant="rounded"
                            sx={{
                              mr: 3,
                              width: "auto",
                              height: "auto",
                              boxShadow: 3,
                              color: "common.white",
                              backgroundColor: `white`,
                            }}
                          >
                          <Canvas
                            text={orderDetail?.paymentMethod.action.qrString}
                            options={{
                              errorCorrectionLevel: "M",
                              margin: 3,
                              scale: 4,
                              width: 300,
                              quality: 1,
                            }}
                          />
                          </Avatar>
                          <button className="mt-4" onClick={onQRDownload}>
                            Download QR Code
                          </button>
                        </div> */}
                        <QRCode
                          size={200}
                          value={orderDetail?.paymentMethod.action.qrString}
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                    )}

                  {PaymentAction.CHECKOUT_URL in
                    orderDetail?.paymentMethod.action &&
                    orderDetail?.paymentMethod.action.checkoutUrl &&
                    orderDetail?.status === ORDER_STATUS.PENDING_PAYMENT && (
                      <a
                        className="mt-4"
                        href={
                          (PaymentAction.CHECKOUT_URL in
                            orderDetail?.paymentMethod.action &&
                            orderDetail?.paymentMethod.action.checkoutUrl) ||
                          "#"
                        }
                      >
                        Lanjutkan Pembayaran
                      </a>
                    )}

                  {PaymentAction.PAYMENT_CODE in
                    orderDetail?.paymentMethod.action &&
                    orderDetail?.paymentMethod.action.paymentCode && (
                      <>
                        <div className="mt-4 relative">
                          <div
                            className="cursor-pointer"
                            data-tooltip-id="tooltip-copy"
                            data-tooltip-content={"Click To Copy"}
                          >
                            <button
                              className="w-full bg-blue-100 flex gap-2 py-2 px-4 rounded-md flex justify-center items-center text-blue-600 border border-blue-600"
                              onClick={handleCopyToClipboard}
                            >
                              {PaymentAction.PAYMENT_CODE in
                              orderDetail?.paymentMethod.action
                                ? orderDetail?.paymentMethod?.action.paymentCode
                                : ""}
                              <FontAwesomeIcon icon={faCopy} />
                            </button>
                          </div>
                          <ReactTooltip
                            id="tooltip-copy"
                            style={{
                              fontSize: "12px",
                              padding: "10px",
                            }}
                          />
                        </div>
                      </>
                    )}
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

function StatusModal({
  handleCloseModal,
  status,
}: {
  handleCloseModal: () => void;
  status: string;
}) {
  const router = useRouter();

  return (
    <div className="backdrop bg-black/20 w-full h-screen fixed flex justify-center items-center z-50">
      <div className="w-96 rounded-xl shadow-lg bg-white p-6">
        <div className="flex justify-end">
          <CloseButton handleClick={handleCloseModal} />
        </div>

        <div
          className={`w-28 h-28  rounded-full flex items-center justify-center mx-auto mt-6 ${
            status == "success" ? "bg-emerald-100" : "bg-rose-100"
          }`}
        >
          <div
            className={`w-16 h-16 text-white rounded-full flex items-center justify-center ${
              status == "success" ? "bg-emerald-500" : "bg-rose-500"
            }`}
          >
            <FontAwesomeIcon
              icon={status == "success" ? faCheck : faX}
              className="text-2xl"
            />
          </div>
        </div>

        <p
          className={`text-center font-semibold text-lg mt-10 ${
            status == "success" ? "text-emerald-600" : "text-rose-500"
          }`}
        >
          {status == "success" ? "Order Completed" : "Order Failed"}
        </p>

        <p className="text-gray-600 mt-3 text-sm text-center">
          {status == "success"
            ? " we have receive your payment and we have applied the plan to your account, thankyou"
            : "The order was failed due to some reason. Click continue to create a new order"}
        </p>

        <Link href={status === "success" ? "/merchant/device" : "/#pricing"}>
          <div
            className={`flex items-center gap-2 text-white rounded-md py-2 px-4 mx-auto mt-10 font-medium w-max ${
              status == "success" ? "bg-emerald-500" : "bg-rose-500"
            }`}
          >
            {status === "success" ? "Continue" : "Create New Order"}{" "}
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </Link>
      </div>
    </div>
  );
}

"use client";
import Loading from "@/components/global/Loading";
import NotFound from "@/components/global/NotFound";
import RenewalModal from "@/components/merchant/subscriptions/RenewalModal";
import { ISubscriptionDetail } from "@/data-types/merchant";
import { ORDER_STATUS } from "@/enum";
import formateDateIntr, { formatDate } from "@/lib/utils/formatter";
import { getPaymentStatuses } from "@/services/api/payment";
import { getSubscriptionDetail } from "@/services/api/subscriptionPlans";
import { faCircle, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SubsciptionDetail() {
  const { subsId }: { subsId: string } = useParams();
  const [subscription, setSubscription] =
    useState<ISubscriptionDetail | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [statuses, setStatuses] = useState<{ name: string; cd: string }[]>([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchMerchantSubscriptionDetail() {
      try {
        setIsLoading(true);
        const response = await getSubscriptionDetail(subsId);
        setSubscription(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.error(error.message);
        toast.error("Gagal mengambil subscription detail " + error.message);
      }
    }
    fetchMerchantSubscriptionDetail();
  }, [subsId]);

  useEffect(() => {
    async function fetchStatuses() {
      try {
        const response = await getPaymentStatuses();
        setStatuses(response.data);
      } catch (error: any) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
    fetchStatuses();
  }, []);

  function getStatusColor(statusCd: string): string {
    if (statusCd === ORDER_STATUS.COMPLETED) {
      return "text-emerald-600";
    } else if (statusCd === ORDER_STATUS.PENDING_PAYMENT) {
      return "text-yellow-600";
    } else if (statusCd === ORDER_STATUS.PROCESSING) {
      return "text-blue-600";
    } else {
      return "text-rose-600";
    }
  }

  if (isLoading) return <Loading />;
  if (!subscription && !isLoading) return <NotFound />;

  return (
    <>
      <RenewalModal
        handleCloseModal={() => {
          setShowModal(false);
        }}
        modalVisible={showModal}
        subscriptionId={subscription?.id || ""}
        plan={subscription?.plan}
      />
      <div className="wrapper md:p-8 p-6">
        <div className="lg:p-8 md:p-6 p-4 bg-white rounded-xl">
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 justify-between flex-1 md:flex-none">
              <h2 className="text-xl font-semibold text-gray-800">
                {subscription?.plan.name}
              </h2>
              <div
                className={`flex py-1.5 px-4 rounded-full  ${
                  subscription?.isActive
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-rose-100 text-rose-600"
                }`}
              >
                {subscription?.isActive ? "Active" : "Not Active"}
              </div>
            </div>
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hidden md:inline-block"
            >
              Renewal Subscription
            </button>
          </div>

          <h1 className="text-center text-base md:text-xl text-gray-500  my-12">
            Your subscription will be expired {subscription?.remainPeriode}
          </h1>

          <div className="flex justify-center items-center flex-wrap gap-y-8">
            <div className="text-center flex-1 min-w-36 md:min-w-48 border-r border-gray-300">
              <p className="font-semibold text-lg md:text-3xl text-gray-800">
                {subscription?.deviceLimit} Devices
              </p>
              <p className="text-gray-500 text-sm mt-2 md:mt-3">Device Limit</p>
            </div>

            <div className="text-center flex-1 min-w-36 md:min-w-48 md:border-r border-gray-300">
              <p className="font-semibold text-lg md:text-3xl text-gray-800">
                {formatDate(subscription?.startDate || "")}
              </p>
              <p className="text-gray-500 text-sm mt-2 md:mt-3">Start Date</p>
            </div>

            <div className="text-center flex-1 min-w-36 md:min-w-48 border-r border-gray-300">
              <p className="font-semibold text-lg md:text-3xl text-gray-800">
                {formatDate(subscription?.endDate || "")}
              </p>
              <p className="text-gray-500 text-sm mt-2 md:mt-3">End Date</p>
            </div>

            {/* <div className="text-center flex-1 min-w-36 md:min-w-48">
              <p className="font-semibold text-lg md:text-3xl text-gray-800">
                {subscription?.remainPeriode}
              </p>
              <p className="text-gray-500 text-sm mt-2 md:mt-3">
                Time Remaining
              </p>
            </div> */}
          </div>

          <div className="w-max mx-auto mt-8 md:hidden">
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="py-2 px-4 bg-blue-600 text-white rounded-md"
            >
              Renewal Subscription
            </button>
          </div>
        </div>

        <div className="lg:p-8 md:p-6 p-4 bg-white rounded-xl mt-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Subscription Timeline
          </h2>

          <div className="flex flex-col mt-8">
            <div className="overflow-x-auto">
              <div className="w-full inline-block align-middle">
                <div className="overflow-hidden overflow-x-auto">
                  <table className="min-w-full border-spacing-0 border-collapse">
                    <thead className="bg-slate-100">
                      <tr>
                        <th></th>
                        <th></th>
                        <th
                          scope="col"
                          className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                        >
                          <div className="flex gap-3 items-center justify-center shrink-0 text-nowrap">
                            <p>Subscription Periode</p>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                        >
                          <div className="flex gap-3 items-center justify-center shrink-0 text-nowrap">
                            <p>Periode on Month</p>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                        >
                          <div className="flex gap-3 items-center justify-center shrink-0 text-nowrap">
                            <p>Subscription Type</p>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                        >
                          <div className="flex gap-3 items-center justify-center shrink-0 text-nowrap">
                            <p>Status</p>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {subscription?.subscriptionTimeline.map(
                        (subscription, index) => (
                          <tr
                            key={subscription.dateCreated}
                            className="bg-white hover:bg-gray-100"
                          >
                            <td className="p-0">
                              <div className="w-full border-l-2 border-gray-400 flex items-center">
                                <div className="w-6 h-0.5 bg-gray-400"></div>
                                <FontAwesomeIcon
                                  icon={index === 0 ? faCircleDot : faCircle}
                                  className="py-10 text-xs text-gray-400"
                                />
                              </div>
                            </td>
                            <td className="px-4 py-0 text-sm text-gray-500 whitespace-nowrap font-medium border-b border-gray-300">
                              {formateDateIntr({
                                isoDate: subscription.dateCreated,
                                includeTime: true,
                              })}
                            </td>
                            <td className="px-4 py-0 text-sm text-gray-500 whitespace-nowrap text-center border-b border-gray-300">
                              {subscription.periodeSubscription}
                            </td>
                            <td className="px-4 py-0 text-sm text-gray-500 whitespace-nowrap text-center border-b border-gray-300">
                              {subscription.periodeOnMonth}
                            </td>
                            <td className="px-4 py-0 text-sm text-gray-500 whitespace-nowrap text-center border-b border-gray-300">
                              <p>{subscription.type}</p>
                            </td>
                            <td
                              className={`px-4 py-0 text-sm  whitespace-nowrap text-center border-b border-gray-300 font-medium ${getStatusColor(
                                subscription.status
                              )}`}
                            >
                              {statuses.map((status) =>
                                status.cd === subscription.status
                                  ? status.name
                                  : ""
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

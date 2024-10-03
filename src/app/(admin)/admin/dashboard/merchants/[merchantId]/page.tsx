"use client";
import Loading from "@/components/global/Loading";
import NotFound from "@/components/global/NotFound";
import {
  IBoloMerchantDetail,
  IMerchantPlan,
  IMerchantSubscription,
} from "@/data-types/merchant";
import { formatDate } from "@/lib/formatter";
import { getBoloMerchantDetail } from "@/services/api/adminMerchants";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MerchantDetail() {
  const { merchantId }: { merchantId: string } = useParams();
  const [merchant, setMerchant] = useState<IBoloMerchantDetail | null>();
  const [subscriptionDetail, setSubscriptionDetail] =
    useState<IMerchantPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchMerchantSubscriptionDetail() {
      try {
        setIsLoading(true);
        const response = await getBoloMerchantDetail(merchantId);
        setMerchant(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.error(error.message);
        toast.error(error.message);
      }
    }
    fetchMerchantSubscriptionDetail();
  }, [merchantId]);

  if (isLoading) return <Loading />;
  if (!merchant && !isLoading) return <NotFound />;

  return (
    <>
      <div className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 ">
          <div className="w-full lg:w-5/12 xl:w-2/5">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="relative flex justify-center">
                {merchant?.logo ? (
                  <Image
                    height={50}
                    width={50}
                    className="w-20 h-20 lg:w-28 lg:h-28 rounded-full object-cover"
                    src={merchant.logo || ""}
                    alt="Profile"
                  />
                ) : (
                  <div className="w-20 h-20 lg:w-28 lg:h-28 bg-slate-200 flex items-center justify-center rounded-full lg:rounded-lg">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-3xl text-gray-600"
                    />
                  </div>
                )}
              </div>

              <p className="text-lg font-semibold text-gray-800 text-center mt-4">
                {merchant?.name}
              </p>

              <div className="w-full flex justify-between mt-8">
                <span className="text-gray-600">Email </span>
                <span className="text-gray-500">{merchant?.email}</span>
              </div>
              <div className="w-full flex justify-between mt-4">
                <span className="text-gray-600">Mobile Number </span>
                <span className="text-gray-500">{merchant?.mobileNumber}</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12 xl:w-3/5 p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">Address</h2>
            <div className="w-full flex justify-between mt-8">
              <span className="text-gray-600">Province </span>
              <span className="text-gray-500">
                {merchant?.address.province}
              </span>
            </div>
            <div className="w-full flex justify-between mt-4">
              <span className="text-gray-600">City </span>
              <span className="text-gray-500">{merchant?.address.city}</span>
            </div>
            <div className="w-full flex justify-between mt-4">
              <span className="text-gray-600">District </span>
              <span className="text-gray-500">
                {merchant?.address.district}
              </span>
            </div>
            <div className="w-full flex justify-between mt-4">
              <span className="text-gray-600">Street </span>
              <span className="text-gray-500">{merchant?.address.street}</span>
            </div>
          </div>
        </div>

        <div className="w-full mt-8 bg-white p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-800">
            Merchant Plans
          </h2>
          <div className="overflow-hidden overflow-x-auto mt-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-100">
                <tr>
                  <th
                    scope="col"
                    className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                  >
                    <p>Plan Name</p>
                  </th>
                  <th
                    scope="col"
                    className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                  >
                    <p>Start Date</p>
                  </th>
                  <th
                    scope="col"
                    className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                  >
                    <p>End Date</p>
                  </th>

                  <th
                    scope="col"
                    className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                  >
                    <p>Remaining Periode</p>
                  </th>
                  <th
                    scope="col"
                    className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                  >
                    <p>Remaining Device</p>
                  </th>
                  <th
                    scope="col"
                    className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase text-left"
                  >
                    <p>Status</p>
                  </th>
                  <th
                    scope="col"
                    className="p-4 lg:py-4 lg:py-5 text-xs font-bold text-left text-neutral-600 uppercase"
                  >
                    <p className="text-right">Action</p>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {merchant?.subscriptions.map((subscription, index) => (
                  <tr
                    key={subscription.id}
                    className="bg-white hover:bg-gray-100"
                  >
                    <td className="px-4 py-4 text-sm text-gray-800 font-medium whitespace-nowrap">
                      {subscription.plan.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      <p>{formatDate(subscription.startDate)}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap left">
                      {formatDate(subscription.endDate)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {subscription.remainPeriode}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap left">
                      {subscription.device.remain}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap left">
                      {subscription.isActive ? "Active" : "Not Active"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-right">
                      <button
                        onClick={() => {
                          setSubscriptionDetail(merchant.subscriptions[index]);
                          router.push(
                            `/admin/dashboard/merchants/${merchantId}#subscription`
                          );
                        }}
                        className="py-2 px-4 rounded-md bg-blue-600 text-white"
                      >
                        Show Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {subscriptionDetail && <PlanDetail plan={subscriptionDetail} />}
      </div>
    </>
  );
}

function PlanDetail({ plan }: { plan: IMerchantPlan }) {
  return (
    <div
      id="subscription"
      className="lg:p-8 md:p-6 p-4 bg-white rounded-xl mt-6 md:mt-8"
    >
      <div className="flex flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {plan.plan.name}
        </h2>
        <div
          className={`flex py-1.5 px-4 rounded-full  ${
            plan.isActive
              ? "bg-emerald-100 text-emerald-600"
              : "bg-rose-100 text-rose-600"
          }`}
        >
          {plan.isActive ? "Active" : "Not Active"}
        </div>
      </div>

      <h1 className="text-center text-base md:text-xl text-gray-500  my-12">
        Your subscription will be expired {plan.remainPeriode}
      </h1>

      <div className="flex justify-center items-center flex-wrap gap-y-8">
        <div className="text-center min-w-36 md:min-w-48md:border-r border-gray-300">
          <p className="font-semibold text-lg md:text-2xl text-gray-800">
            {formatDate(plan.startDate)}
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-3">Start Date</p>
        </div>

        <div className="text-center min-w-36 md:min-w-48 border-r border-gray-300">
          <p className="font-semibold text-lg md:text-2xl text-gray-800">
            {formatDate(plan.endDate)}
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-3">End Date</p>
        </div>
        <div className="text-center min-w-36 md:min-w-48 border-r border-gray-300">
          <p className="font-semibold text-lg md:text-2xl text-gray-800">
            {plan.device.used} Devices
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-3">Connected Device</p>
        </div>

        <div className="text-center min-w-36 md:min-w-48 border-r border-gray-300">
          <p className="font-semibold text-lg md:text-2xl text-gray-800">
            {plan.device.limit} Devices
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-3">Limit Device</p>
        </div>

        <div className="text-center min-w-36 md:min-w-48 border-r border-gray-300">
          <p className="font-semibold text-lg md:text-2xl text-gray-800">
            {plan.device.remain} Devices
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-3">Device Remaining</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mt-12 mb-6">
        Plan Limits
      </h2>
      <div className="flex justify-center items-center flex-wrap gap-y-8 gap-20">
        {plan.planLimits.map((limit) => (
          <div key={limit.name} className="">
            <p className="text-center text-lg mb-4 font-medium text-gray-600">
              {limit.name}
            </p>
            <div className="flex items-center justify-between mt-2 gap-20">
              <span className="text-gray-600">Message Limit</span>
              <span className="text-gray-600">{limit.messageLimit}</span>
            </div>
            <div className="flex items-center justify-between mt-2 gap-20">
              <span className="text-gray-600">Message Sent</span>
              <span className="text-gray-600">{limit.usedMessageLimit}</span>
            </div>
            <div className="flex items-center justify-between mt-2 gap-20">
              <span className="text-gray-600">Remaining Message</span>
              <span className="text-gray-600">{limit.remainMessageLimit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

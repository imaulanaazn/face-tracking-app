"use client";
import React, { useEffect, useState } from "react";
import CloseButton from "../global/CloseButton";
import {
  IPaymentMethod,
  IPaymentMethodWithCategory,
  IPlan,
} from "@/data-types/merchant";
import { getListPaymentMethod, subscribePlan } from "@/services/api/payment";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IDRRupiah } from "@/lib/utils/formatter";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ICheckoutModal {
  handleCloseModal: () => void;
  modalVisible: boolean;
  plan: IPlan;
}

export default function CheckoutModal({
  handleCloseModal,
  modalVisible,
  plan,
}: ICheckoutModal) {
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
  const [unit, setUnit] = useState<"month" | "year">("month");
  const [periode, setPeriode] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<IPaymentMethod | null>(
    null
  );
  const [formStep, setFormStep] = useState(1);
  const router = useRouter();
  const merchant = useSelector((state: RootState) => state.merchant);

  useEffect(() => {
    async function fetchPaymentMethods() {
      try {
        const response = await getListPaymentMethod(plan.id);
        getPaymentMethodsWithoutCategory(response.data);
      } catch (error: any) {
        console.error(error.message);
      }
    }
    fetchPaymentMethods();
  }, []);

  function getPaymentMethodsWithoutCategory(
    methods: IPaymentMethodWithCategory[]
  ) {
    const paymentMethodsTemp: IPaymentMethod[] = [];
    methods.forEach((category) => {
      category.paymentMethods.forEach((method) =>
        paymentMethodsTemp.push(method)
      );
    });
    setPaymentMethods(paymentMethodsTemp);
  }

  function validatePeriode(unit: string, periode: number) {
    if (!periode) {
      toast.error("Please fill the time period");
      return false;
    }

    if (unit === "month" && periode > 12) {
      toast.error("Periode should be between 1 - 12");
      return false;
    }

    if (unit === "year" && periode > 2) {
      toast.error("Periode should be between 1 - 2");
      return false;
    }

    return true;
  }

  function handleNextStep() {
    if (formStep === 1) {
      if (!validatePeriode(unit, periode)) {
        return;
      }

      if (!selectedPayment) {
        toast.error("Please Select the payment method");
        return;
      }

      if (!merchant.id) {
        toast.error("Please login to continue");
        return;
      }
      setFormStep(2);
    } else {
      handleCheckout();
    }
  }

  function clearForm() {
    setFormStep(1);
    setSelectedPayment(paymentMethods[0]);
    setPeriode(1);
    setUnit("month");
  }

  async function handleCheckout() {
    const data = {
      planId: plan.id,
      paymentMethodId: selectedPayment?.id || "",
      unit,
      value: periode,
    };
    const orderToast = toast.loading("Creating Order");
    try {
      const response = await subscribePlan(data);
      handleCloseModal();
      clearForm();
      toast.update(orderToast, {
        render: "Order Created",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      router.push(`/payment/${response.data.invoiceId}`);
    } catch (error: any) {
      toast.update(orderToast, {
        render: "Order Failed " + error.message,
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
      console.error(error.message);
    }
  }

  return (
    <div
      className={`w-full h-screen bg-black/60 top-0 left-0 z-50 items-center justify-center fixed ${
        modalVisible ? "flex" : "hidden"
      }`}
    >
      <div className="w-11/12 md:w-max bg-white rounded-xl p-6 md:min-w-96">
        <div className="flex w-full justify-between mb-4">
          <h2 className="text-lg text-center font-semibold">
            {formStep === 1 ? "Select payment method" : "Payment detail"}
          </h2>
          <div>
            <CloseButton
              handleClick={() => {
                handleCloseModal();
                clearForm();
              }}
            />
          </div>
        </div>

        {formStep === 1 ? (
          <div className="w-full md:w-max custom-scroll h-[70vh] md:h-[75vh] overflow-y-auto gap-8 mb-4">
            <div className="w-full md:w-max">
              <div className="duration">
                <label
                  htmlFor="periode"
                  className="block text-gray-600 text-sm shrink-0"
                >
                  Duration
                </label>
                <div className="flex gap-4 items-center mb-4 mt-2">
                  <input
                    onChange={(e) => {
                      setPeriode(parseInt(e.target.value));
                    }}
                    value={periode}
                    id="periode"
                    type="number"
                    placeholder="masukkan durasi"
                    max={unit === "month" ? 12 : 2}
                    min={1}
                    className="w-full p-2 bg-white text-sm text-gray-600 border border-gray-400 rounded focus:outline-blue-600"
                  />
                  <div className="relative w-full">
                    <select
                      onChange={(e) => {
                        setUnit(e.target.value === "month" ? "month" : "year");
                      }}
                      value={unit}
                      id="province"
                      name="province"
                      className="appearance-none block w-full bg-none border border-solid border-gray-400 outline-none rounded-md py-2 pl-3 pr-10 text-base text-gray-600 sm:text-sm"
                    >
                      <option value={"month"}>Month</option>
                      <option value={"year"}>Year</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                      <svg
                        className="h-4 w-4 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="payment-methods">
                <span className="block text-gray-600 text-sm shrink-0">
                  Payment Method
                </span>
                <div className="mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-auto gap-4">
                    {paymentMethods.map((method) => (
                      <div
                        onClick={() => {
                          setSelectedPayment(method);
                        }}
                        key={method.id}
                        className={`p-4 rounded-lg  min-w-68 hover:cursor-pointer ${
                          method.id === selectedPayment?.id
                            ? "border-2 bg-blue-100/50 border-blue-600"
                            : "border border-gray-400"
                        }`}
                      >
                        <div className="flex justify-between items-center gap-4">
                          <Image
                            src={method.logo || "/assets/payment-card.svg"}
                            width={40}
                            height={35}
                            alt={method.name}
                          />
                          <span className="font-medium text-gray-800">
                            {" "}
                            {IDRRupiah.format(method.totalPrice)}
                          </span>
                        </div>
                        <hr />
                        <span className="text-sm text-gray-700">
                          {method.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="my-5">
              <hr />
            </div>
            <div className="w-full md:min-w-80 self-start">
              <div className="flex justify-between gap-4 lg:gap-6 mt-3 text-gray-600">
                <span>Selected plan </span>
                <span>{plan.name}</span>
              </div>
              <div className="flex justify-between gap-4 lg:gap-6 mt-3 text-gray-600">
                <span>Duration </span>
                <span>
                  {periode} {unit === "month" ? "Month" : "Year"}{" "}
                </span>
              </div>
              <div className="flex justify-between gap-4 lg:gap-6 mt-3 text-gray-600">
                <span>Price </span>
                <span>{IDRRupiah.format(selectedPayment?.price || 0)}</span>
              </div>
              <div className="flex justify-between gap-4 lg:gap-6 mt-3 text-gray-600">
                <span>Fee </span>
                <span>{IDRRupiah.format(selectedPayment?.fee || 0)}</span>
              </div>
              <div className="flex justify-between gap-4 lg:gap-6 mt-3 text-gray-600">
                <span>Total Price </span>
                <span>
                  {IDRRupiah.format(selectedPayment?.totalPrice || 0)}
                </span>
              </div>
              <div className="flex justify-between gap-4 lg:gap-6 mt-3 text-gray-600">
                <span>Payment Method </span>
                <span>{selectedPayment?.name}</span>
              </div>
            </div>
            <div className="my-5">
              <hr />
            </div>
          </>
        )}

        <div className="flex flex-col-reverse gap-4">
          {formStep === 2 && (
            <button
              onClick={() => {
                setFormStep(1);
              }}
              className="w-full border border-blue-600 py-2 text-blue-600 rounded-md flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Previous Step
            </button>
          )}
          <button
            onClick={handleNextStep}
            className="w-full bg-blue-600 py-2 text-white rounded-md flex items-center justify-center gap-2"
          >
            {formStep === 1 ? "Next step" : "Order Now"}
            <FontAwesomeIcon
              icon={formStep === 1 ? faArrowRight : faShoppingCart}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

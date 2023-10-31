"use client";

import Link from "next/link";
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import PurchaseOrderList from "./purchaseOrderList";

const { default: PageLayout } = require("@/layout/pageLayout");

const PurchaseOrderListPage = () => {
  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-row justify-between">
          <h2 className="text-3xl font-bold">Purchase Order List</h2>
          <Link href={"/purchase-order/create"}>
            <Button>
              <div className="flex flex-row justify-center gap-4">
                <div className="my-auto">
                  <HiPlus />
                </div>
                <p>Add new purchase order</p>
              </div>
            </Button>
          </Link>
        </div>
        <PurchaseOrderList />
      </div>
    </PageLayout>
  );
};

export default PurchaseOrderListPage;

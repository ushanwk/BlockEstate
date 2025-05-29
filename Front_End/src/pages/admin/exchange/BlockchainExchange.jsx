import { Header } from "../../../components/admin/Header.jsx";
import React, { useState } from "react";
import {AccountInfo} from "./AccountInfo.jsx";
import {PropertyInfo} from "./PropertyInfo.jsx";

export const BlockchainExchange = () => {
    const [activeTab, setActiveTab] = useState("account");

    const renderTabContent = () => {
        switch (activeTab) {
            case "account":
                return <AccountInfo />;

            case "property":
                return <PropertyInfo />;

            case "transactions":
                return <section>
                    <div className="flex items-center justify-between">
                        <h1 className="dark:text-white text-[18px] font-light">Transactions</h1>
                    </div>
                </section>;

            default:
                return null;
        }
    };

    const getTabClasses = (tab) =>
        `px-4 h-full flex items-center justify-center cursor-pointer text-[12px] 
         hover:bg-blue-50 dark:hover:bg-[var(--color-dark-bg-secondary)] 
         ${activeTab === tab ? "bg-blue-50 dark:bg-[var(--color-dark-bg-secondary)] font-medium dark:text-white border-b-2 border-[var(--color-primary)]" : "dark:text-white"}`;

    return (
        <main>
            <Header />

            <section className="w-full mt-16">
                <h1 className="dark:text-white text-[30px] font-light">Blockchain Exchange</h1>
                <p className="text-[12px] font-light mt-[-5px] text-[#999999]">
                    Keep track of all blockchain related things in the system.
                </p>
            </section>

            {/* Tabs */}
            <section className="w-full mt-8 h-12 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 flex gap-5 items-center px-6">
                <div onClick={() => setActiveTab("account")} className={getTabClasses("account")}>
                    Account Info
                </div>

                <div onClick={() => setActiveTab("property")} className={getTabClasses("property")}>
                    Property Info
                </div>

                <div onClick={() => setActiveTab("transactions")} className={getTabClasses("transactions")}>
                    Transactions
                </div>
            </section>

            {/* Tab Content */}
            <section className="w-full mt-4 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 items-center px-8 py-6">
                {renderTabContent()}
            </section>
        </main>
    );
};

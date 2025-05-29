import React, {useEffect, useState} from "react";
import {ComboBox} from "../../../components/common/ComboBox.jsx";
import axios from "axios";

export const AccountInfo = () => {
    const [investors, setInvestors] = useState([]);
    const [selectedInvestorId, setSelectedInvestorId] = useState(null);

    useEffect(() => {
        const fetchInvestors = async () => {
            try {
                const response = await axios.get('http://localhost:5500/api/investor/get-name');
                setInvestors(response.data);
            } catch (error) {
                console.error("Error fetching investors:", error);
            }
        };

        fetchInvestors();
    }, []);

    // Convert to ComboBox format
    const investorOptions = investors.map(investor => ({
        label: investor.name,
        value: investor._id
    }));

    const selectedInvestor = investors.find(inv => inv._id === selectedInvestorId);

    return (
        <section>
            <div className="flex items-center justify-between">
                <h1 className="dark:text-white text-[18px] font-light">Account Information</h1>
            </div>

            <div className="mt-8 mb-2">
                <div className="flex justify-between gap-4">
                    <div className="w-full">
                        <label className="block text-[13px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">Investor</label>
                        <ComboBox
                            options={investorOptions}
                            value={selectedInvestorId}
                            onChange={setSelectedInvestorId}
                            placeholder="Select an investor"
                        />
                    </div>

                    <div className="w-full mt-3">
                        <label className="block text-[13px] mt-[-12px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">Account Address</label>
                        <div className="w-full p-2 text-[12px] rounded-[5px] dark:text-[#ffffff] border dark:border-[#5D5D65] border-[#D9D9D9] dark:font-extralight bg-gray-200 dark:bg-gray-700">
                            {selectedInvestor?.walletAddress || "-"}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-4 mt-8">
                    <div className="w-full mt-3">
                        <label className="block text-[13px] mt-[-12px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">Mnemonic Phrase</label>
                        <div className="w-full p-2 text-[12px] rounded-[5px] dark:text-[#ffffff] border dark:border-[#5D5D65] border-[#D9D9D9] dark:font-extralight bg-gray-200 dark:bg-gray-700">
                            {selectedInvestor?.mnemonic || "-"}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

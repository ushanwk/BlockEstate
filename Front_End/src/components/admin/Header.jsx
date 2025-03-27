import {SearchField} from "../common/SearchField.jsx";
import { BellRing } from 'lucide-react';
import {useEffect, useState} from "react";
import { CalendarRange } from 'lucide-react';

export const Header = () => {

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000 * 60); // Update every minute (no need for seconds precision for date)

        return () => clearInterval(timer);
    }, []);

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });


    return (
        <header>
            <div className="flex items-center justify-between w-full">
                <div className="w-64">
                    <SearchField placeholder="Search..." />
                </div>

                <div className="flex items-center justify-between gap-6">

                    <div className={`flex items-center gap-2`}>

                        <CalendarRange className="w-5 h-5 text-gray-400 dark:text-gray-500 " />

                        <span className="text-sm text-gray-400 dark:text-gray-500">
                        {formattedDate}
                      </span>
                    </div>

                    <BellRing className="w-5 h-5 fill-current text-gray-800 dark:text-gray-300" />

                    <img
                        src="https://i.pravatar.cc/50"
                        alt="Daniel Carter"
                        className="w-10 h-10 rounded-full border-2 border-blue-400"
                    />



                </div>
            </div>
        </header>
    )
}
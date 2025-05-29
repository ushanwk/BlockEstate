import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const InvestorArrivalBarChart = () => {
    const data = [
        { month: 'Jan', investors: 25 },
        { month: 'Feb', investors: 40 },
        { month: 'Mar', investors: 60 },
        { month: 'Apr', investors: 80 },
        { month: 'May', investors: 100 },
    ];

    return (
        <div className="p-6 w-full">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
                    <XAxis
                        dataKey="month"
                        stroke="#333"
                        className="dark:stroke-gray-300"
                    />
                    <YAxis stroke="#333" className="dark:stroke-gray-300" />
                    <Tooltip
                        wrapperClassName="!rounded-lg !shadow-lg"
                        contentStyle={{
                            backgroundColor: '#ffffff',
                            borderColor: '#ccc',
                            color: '#000',
                        }}
                        labelClassName="text-sm font-semibold"
                    />
                    <Bar
                        dataKey="investors"
                        fill="#0274F9" // Indigo-500
                        radius={[10, 10, 0, 0]}
                        barSize={40}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default InvestorArrivalBarChart;

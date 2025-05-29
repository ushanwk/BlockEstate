import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const PlatformGrowthChart = () => {
    const data = [
        { month: 'Jan', properties: 20 },
        { month: 'Feb', properties: 35 },
        { month: 'Mar', properties: 45 },
        { month: 'Apr', properties: 65 },
        { month: 'May', properties: 80 },
        { month: 'Jun', properties: 95 },
        { month: 'July', properties: 105 },
        { month: 'Aug', properties: 95 },
    ];

    return (
        <div className="p-4 rounded-2xl w-full mt-4">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#ccc"
                        className="dark:stroke-gray-700"
                    />
                    <XAxis
                        dataKey="month"
                        stroke="#333"
                        className="dark:stroke-gray-300 "
                    />
                    <YAxis
                        stroke="#333"
                        className="dark:stroke-gray-300"
                    />
                    <Tooltip
                        wrapperClassName="!rounded-lg !shadow-lg"
                        contentStyle={{
                            backgroundColor: '#ffffff',
                            borderColor: '#ccc',
                            color: '#000',
                        }}
                        labelClassName="text-sm font-semibold"
                    />
                    <Line
                        type="monotone"
                        dataKey="properties"
                        stroke="#0274F9"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PlatformGrowthChart;

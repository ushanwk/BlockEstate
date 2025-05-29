import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const AgencyStatusPieChart = () => {
    const data = [
        { name: 'Approved', value: 30 },
        { name: 'Pending', value: 12 },
        { name: 'Rejected', value: 5 },
    ];

    const COLORS = [
        { fill: '#22C55E' },  // Green
        { fill: '#FACC15' },  // Yellow
        { fill: '#EF4444' },  // Red
    ];

    return (
        <div className="p-4 w-full">
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8">
                {/* Pie chart */}
                <div className="w-full md:w-2/3 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                stroke="#fff"
                                strokeWidth={2}
                                dataKey="value"
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index].fill}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    borderColor: '#ccc',
                                    color: '#000',
                                }}
                                wrapperClassName="!rounded-lg !shadow-lg"
                                labelClassName="text-sm font-semibold"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Custom Legend */}
                <div className="w-full md:w-1/3 flex flex-col gap-4 mt-20">
                    {data.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-3">
                            <div
                                className="w-4 h-4 rounded-full"
                                style={{
                                    backgroundColor: COLORS[index].fill,
                                }}
                            />
                            <span className="text-gray-800 dark:text-gray-200 text-sm">
                {item.name}: {item.value}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AgencyStatusPieChart;

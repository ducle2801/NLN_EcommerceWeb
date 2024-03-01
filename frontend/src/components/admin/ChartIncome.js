import Chart from "../../components/admin/Chart";
import { useEffect, useMemo, useState } from "react";
import axios from 'axios';


export default function ChartIncome() {
    const [userStats, setUserStats] = useState([]);


    const MONTHS = useMemo(
        () => [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ],
        []
    );


    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get('/api/v1/admin/orders/income')
                res.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], "Danh thu": item.total },
                    ])
                );

            } catch { }
        };
        getStats();
    }, [MONTHS]);

    return (
        <div>
            <Chart
                data={userStats}
                title="Danh thu hàng tháng"
                grid
                dataKey="Danh thu"
            />
        </div>
    );
}
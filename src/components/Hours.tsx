type HoursProps = {
  className?: string;
  textColor?: string;
  size?: "xs" | "sm" | "base" | "lg";
};

const sizeClasses = {
  xs: {
    table: "text-[clamp(6px,1.8vw,12px)]",
    note: "text-[10px]",
    padding: "py-[clamp(1px,0.4vw,4px)]"
  },
  sm: {
    table: "text-[clamp(8px,2.2vw,14px)]",
    note: "text-xs",
    padding: "py-[clamp(1px,0.5vw,6px)]"
  },
  base: {
    table: "text-[clamp(10px,2.8vw,16px)]",
    note: "text-sm",
    padding: "py-[clamp(2px,0.6vw,8px)]"
  },
  lg: {
    table: "text-[clamp(12px,3.2vw,18px)]",
    note: "text-base",
    padding: "py-[clamp(2px,0.8vw,10px)]"
  },
};

export default function Hours({ className = "", textColor = "text-gray-800", size = "sm" }: HoursProps) {
  const s = sizeClasses[size];
  return (
    <div className={`w-full ${textColor} ${className}`}>
      <table className={`w-full ${s.table} table-fixed border-collapse`}>
        <thead>
          <tr className="bg-green-600 text-white">
            <th className={`border border-gray-300 ${s.padding} w-3/9`}>診療時間</th>
            <th className={`border border-gray-300 ${s.padding} w-1/9`}>月</th>
            <th className={`border border-gray-300 ${s.padding} w-1/9`}>火</th>
            <th className={`border border-gray-300 ${s.padding} w-1/9`}>水</th>
            <th className={`border border-gray-300 ${s.padding} w-1/9`}>木</th>
            <th className={`border border-gray-300 ${s.padding} w-1/9`}>金</th>
            <th className={`border border-gray-300 ${s.padding} w-1/9`}>土</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={`border border-gray-300 ${s.padding} text-center`}>8:00〜13:00</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>◯</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>◯</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>◯</td>
            <td className={`border border-gray-300 ${s.padding} text-center text-red-400`}>休</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>◯</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>◯</td>
          </tr>
          <tr>
            <td className={`border border-gray-300 ${s.padding} text-center`}>14:00〜19:00</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>◯</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>◯</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>◯</td>
            <td className={`border border-gray-300 ${s.padding} text-center text-red-400`}>休</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>◯</td>
            <td className={`border border-gray-300 ${s.padding} text-center text-red-400`}>休</td>
          </tr>
          <tr>
            <td className={`border border-gray-300 ${s.padding} text-center text-green-400`}>装着外来</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>−</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>17:00~</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>11:30~</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>−</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>−</td>
            <td className={`border border-gray-300 ${s.padding} text-center`}>−</td>
          </tr>
        </tbody>
      </table>
      <p className={`${s.note} mt-2`}>※受付時間は終了<span className="text-blue-400">30分前</span>まで</p>
      <p className={`${s.note}`}><span className="text-red-400">休診日</span>： 木曜・日曜・国民の祝日および休日・年末年始・夏季（お盆）</p>
    </div>
  );
}

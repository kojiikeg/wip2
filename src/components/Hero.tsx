import Hours from "./Hours";
import { Phone, Mail } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Hero() {
  return (
    <section
      className="w-full bg-cover bg-center relative flex items-center"
      style={{ backgroundImage: `url('${basePath}/MInami0181.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="w-full max-w-full items-center  px-4 py-16 relative">
        <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-8 lg:gap-8 text-white">
          {/* 病院名 */}
          <div className="flex items-center justify-center gap-[clamp(8px,2vw,16px)] shrink">
            <img
              src={`${basePath}/logo.png`}
              alt="みなみクリニック ロゴ"
              className="w-[clamp(64px,20vw,128px)] h-[clamp(64px,20vw,128px)] object-contain flex-shrink-0 rounded-2xl"
            />
            <div className="min-w-0">
              <h1 className="text-[clamp(24px,5vw,36px)] lg:text-[3vw] font-bold break-keep mb-2">
                リハビリ整形外科<br />みなみクリニック
              </h1>
              <div className="flex flex-wrap gap-1">
                <span className="bg-orange-500/60 backdrop-blur text-white px-2 py-0.5 rounded-full text-1xs">
                  整形外科
                </span>
                <span className="bg-orange-500/60 break-keep backdrop-blur text-white px-2 py-0.5 rounded-full text-1xs">
                  リハビリテーション科
                </span>
                <span className="bg-orange-500/60 backdrop-blur text-white px-2 py-0.5 rounded-full text-1xs">
                  リウマチ科
                </span>
              </div>
            </div>
          </div>

          {/* 診察時間 */}
          <div className="text-center shrink max-w-lg mx-auto">
            <Hours className="text-white"/>
          </div>

          {/* 電話番号・住所 */}
          <div className="max-w-full mx-auto  text-left shrink whitespace-nowrap">
            <p className="text-3xl font-bold mb-2">
              <a href="tel:027-210-3737" className="flex items-center gap-2 text-blue-300 hover:text-orange-300 transition-colors">
                <Phone className="w-6 h-6" />
                027-210-3737
              </a>
            </p>
            <p className="text-sm">
              <a href="mailto:mail@minamiclinic.jp" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
                <Mail className="w-4 h-4" />
                mail@minamiclinic.jp
              </a>
            </p>
            <p className="text-sm text-white">
              〒371-0047 群馬県前橋市川原町1-49-2
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

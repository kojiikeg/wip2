import Hours from "./Hours";
import { Phone, Mail, MapPin } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Access() {
  return (
    <section className="bg-green-50">
      {/* クリニック情報 */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* 病院名 */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <img
            src={`${basePath}/logo.png`}
            alt="みなみクリニック ロゴ"
            className="w-20 h-20 object-contain flex-shrink-0 rounded-2xl"
          />
          <h2 className="text-[clamp(24px,5vw,36px)] font-bold">
            リハビリ整形外科<br />みなみクリニック
          </h2>
        </div>

        {/* 左右のコンテンツ */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* 左側：診察科目、院長、住所、TEL、MAIL */}
          <div className="flex-1 space-y-4">
            {/* 診察科目 */}
            <div className="flex items-center gap-3 ">
              <h3 className="bg-green-600 text-white font-bold px-3 py-1 w-24 h-8 text-center flex-shrink-0">診察科目</h3>
              <span className="flex gap-2 flex-wrap">
                <span className="break-keep">
                  整形外科
                </span>
                <span className="break-keep">
                  リハビリテーション科
                </span>
                <span className="break-keep">
                  リウマチ科
                </span>
              </span>
            </div>

            {/* 院長 */}
            <div className="flex items-center gap-3">
              <h3 className="bg-green-600 text-white font-bold px-3 py-1 w-24 h-8 text-center flex-shrink-0">院長</h3>
              <span>南 龍野</span>
            </div>

            {/* 住所 */}
            <div className="flex items-center gap-3">
              <h3 className="bg-green-600 text-white font-bold px-3 py-1 w-24 h-8 text-center flex-shrink-0">住所</h3>
              <span className="flex flex-wrap gap-x-2">
                <span className="whitespace-nowrap">〒371-0047</span>
                <span className="whitespace-nowrap">群馬県前橋市川原町1-49-2</span>
              </span>
            </div>

            {/* TEL */}
            <div className="flex items-center gap-3">
              <h3 className="bg-green-600 text-white font-bold px-3 py-1 w-24 h-8 text-center flex-shrink-0">TEL</h3>
              <a
                href="tel:027-210-3737"
                className="flex items-center gap-2 text-blue-600 hover:text-orange-500 transition-colors text-xl font-bold"
              >
                <Phone className="w-6 h-6" />
                027-210-3737
              </a>
            </div>

            {/* MAIL */}
            <div className="flex items-center gap-3">
              <h3 className="bg-green-600 text-white font-bold px-3 py-1 w-24 h-8 text-center flex-shrink-0">MAIL</h3>
              <a
                href="mailto:mail@minamiclinic.jp"
                className="flex items-center gap-2 text-blue-600 hover:text-orange-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                mail@minamiclinic.jp
              </a>
            </div>
          </div>

          {/* 右側：診察時間 */}
          <div className="flex-1">
            <Hours size="lg" className="w-full" />
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps?q=群馬県前橋市川原町1-49-2+リハビリ整形外科+みなみクリニック&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}

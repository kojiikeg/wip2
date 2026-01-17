import PageHeader from "@/components/nav/PageHeader";
import Footer from "@/components/Footer";
import Hours from "@/components/Hours";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">クリニック紹介</h1>

        <div className="space-y-12">
          {/* 院長挨拶 */}
          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-4 border-b-2 border-green-600 pb-2">院長挨拶</h2>
            <div className="bg-green-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                リハビリ整形外科みなみクリニックのホームページをご覧いただきありがとうございます。
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                当院では、地域の皆様の「痛み」や「動きにくさ」といったお悩みに寄り添い、
                お一人おひとりに合った治療を提供することを心がけております。
              </p>
              <p className="text-gray-700 leading-relaxed">
                何かお困りのことがございましたら、お気軽にご相談ください。
              </p>
              <p className="text-right mt-4 font-bold">院長　南 龍野</p>
            </div>
          </section>

          {/* クリニック情報 */}
          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-4 border-b-2 border-green-600 pb-2">クリニック情報</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <th className="py-3 text-left w-1/3 text-gray-600">医院名</th>
                    <td className="py-3">リハビリ整形外科 みなみクリニック</td>
                  </tr>
                  <tr>
                    <th className="py-3 text-left text-gray-600">院長</th>
                    <td className="py-3">南 龍野</td>
                  </tr>
                  <tr>
                    <th className="py-3 text-left text-gray-600">診療科目</th>
                    <td className="py-3">整形外科・リハビリテーション科・リウマチ科</td>
                  </tr>
                  <tr>
                    <th className="py-3 text-left text-gray-600">住所</th>
                    <td className="py-3">〒371-0047 群馬県前橋市川原町1-49-2</td>
                  </tr>
                  <tr>
                    <th className="py-3 text-left text-gray-600">電話番号</th>
                    <td className="py-3">
                      <a href="tel:027-210-3737" className="text-blue-600 hover:underline">027-210-3737</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 診療時間 */}
          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-4 border-b-2 border-green-600 pb-2">診療時間</h2>
            <Hours size="base" />
          </section>

          {/* 院内紹介 */}
          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-4 border-b-2 border-green-600 pb-2">院内紹介</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <img
                  src={`${basePath}/MInami0221.jpg`}
                  alt="外観"
                  className="h-48 w-full object-cover rounded-lg mb-2"
                />
                <p className="text-sm text-gray-600">外観</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <img
                  src={`${basePath}/MInami0181.jpg`}
                  alt="待合室"
                  className="h-48 w-full object-cover rounded-lg mb-2"
                />
                <p className="text-sm text-gray-600">待合室</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="bg-gray-300 h-48 rounded-lg mb-2 flex items-center justify-center text-gray-500">
                  診察室写真
                </div>
                <p className="text-sm text-gray-600">診察室</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <img
                  src={`${basePath}/MInami0441.jpg`}
                  alt="リハビリ室"
                  className="h-48 w-full object-cover rounded-lg mb-2"
                />
                <p className="text-sm text-gray-600">リハビリ室</p>
              </div>
            </div>
          </section>

          {/* アクセス */}
          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-4 border-b-2 border-green-600 pb-2">アクセス</h2>
            <div className="rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=群馬県前橋市川原町1-49-2+リハビリ整形外科+みなみクリニック&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="mt-4 text-gray-700">
              <p>駐車場完備（20台）</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

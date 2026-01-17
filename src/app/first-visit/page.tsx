import PageHeader from "@/components/nav/PageHeader";
import Footer from "@/components/Footer";

export default function FirstVisitPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">初めての方へ</h1>

        <div className="space-y-8">
          {/* ご来院の流れ */}
          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-4 border-b-2 border-green-600 pb-2">ご来院の流れ</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h3 className="font-bold text-lg">受付</h3>
                  <p className="text-gray-700">保険証をお持ちの上、受付窓口へお越しください。問診票をお渡しします。</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h3 className="font-bold text-lg">問診票記入</h3>
                  <p className="text-gray-700">現在の症状や既往歴などをご記入ください。</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h3 className="font-bold text-lg">診察</h3>
                  <p className="text-gray-700">医師が症状を詳しくお聞きし、必要に応じて検査を行います。</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                <div>
                  <h3 className="font-bold text-lg">治療・リハビリ</h3>
                  <p className="text-gray-700">診断に基づき、適切な治療やリハビリテーションを行います。</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                <div>
                  <h3 className="font-bold text-lg">お会計</h3>
                  <p className="text-gray-700">受付窓口でお会計をお願いします。処方箋が必要な場合はお渡しします。</p>
                </div>
              </div>
            </div>
          </section>

          {/* 持ち物 */}
          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-4 border-b-2 border-green-600 pb-2">お持ちいただくもの</h2>
            <div className="bg-yellow-50 rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span><strong>健康保険証</strong>（必須）</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>各種医療証（お持ちの方）</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>お薬手帳（お持ちの方）</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>紹介状（お持ちの方）</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>他院での検査結果（お持ちの方）</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 注意事項 */}
          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-4 border-b-2 border-green-600 pb-2">ご来院時の注意事項</h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">服装について</h3>
                <p className="text-gray-700">
                  診察部位を見せやすい、脱ぎ着しやすい服装でお越しください。
                  リハビリをされる方は動きやすい服装をおすすめします。
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">受付時間について</h3>
                <p className="text-gray-700">
                  受付は診療終了の<span className="text-blue-600 font-bold">30分前</span>までとなります。
                  初診の方は問診票の記入がありますので、お時間に余裕を持ってお越しください。
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">予約について</h3>
                <p className="text-gray-700">
                  当院は予約制ではありません。受付順に診察を行います。
                  混雑状況によりお待ちいただく場合がございますので、ご了承ください。
                </p>
              </div>
            </div>
          </section>

          {/* よくある質問 */}
          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-4 border-b-2 border-green-600 pb-2">よくあるご質問</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-green-700 mb-2">Q. 駐車場はありますか？</h3>
                <p className="text-gray-700">A. はい、10台分の駐車場をご用意しております。</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-green-700 mb-2">Q. 電子決済は使えますか？</h3>
                <p className="text-gray-700">A. 以下の電子決済がご利用いただけます：<br />クレジットカード（Visa/Mastercard/JCB）、PayPay、LINE Pay、楽天ペイ、d払い、au PAY</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-green-700 mb-2">Q. 子供の診察もできますか？</h3>
                <p className="text-gray-700">A. はい、お子様の整形外科疾患も診察しております。</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

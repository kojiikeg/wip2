import PageHeader from "@/components/nav/PageHeader";
import Footer from "@/components/Footer";

export default function TreatmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">診察内容</h1>

        <div className="space-y-8">
          {/* 整形外科 */}
          <section className="bg-green-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-4">整形外科</h2>
            <p className="text-gray-700 mb-4">
              骨・関節・筋肉・神経などの運動器に関する疾患を診療します。
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>骨折・脱臼・捻挫などの外傷</li>
              <li>腰痛・肩こり・首の痛み</li>
              <li>膝・股関節の痛み</li>
              <li>手足のしびれ</li>
              <li>スポーツ障害</li>
              <li>骨粗しょう症</li>
            </ul>
          </section>

          {/* リハビリテーション科 */}
          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">リハビリテーション科</h2>
            <p className="text-gray-700 mb-4">
              理学療法士による専門的なリハビリテーションを提供しています。
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>運動療法（ストレッチ・筋力トレーニング）</li>
              <li>物理療法（温熱・電気治療）</li>
              <li>術後のリハビリテーション</li>
              <li>日常生活動作の改善</li>
              <li>スポーツ復帰に向けたトレーニング</li>
            </ul>
          </section>

          {/* リウマチ科 */}
          <section className="bg-orange-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">リウマチ科</h2>
            <p className="text-gray-700 mb-4">
              関節リウマチをはじめとする膠原病の診断・治療を行います。
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>関節リウマチ</li>
              <li>膠原病</li>
              <li>痛風</li>
              <li>関節の腫れ・こわばり</li>
            </ul>
          </section>

          {/* 装着外来 */}
          <section className="bg-purple-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">装着外来</h2>
            <p className="text-gray-700 mb-4">
              コルセットや装具の作成・調整を行う専門外来です。
            </p>
            <p className="text-gray-600 text-sm">
              ※装着外来は火曜 17:00〜、水曜 11:30〜となります。
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

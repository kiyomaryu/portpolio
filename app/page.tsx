import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FadeIn from "./components/FadeIn";
import { Layers, Users, Zap, ArrowRight, Briefcase, Target, MapPin, Calendar } from "lucide-react";

const strengths = [
  {
    icon: Layers,
    title: "技術力を裏付けとしたフルスタックPM",
    body: "システム開発におけるテスト設計・チーム構築、バックエンド開発、社内SE、インフラ（オンプレ・クラウド）、SREと、下流から上流までの実務を網羅しています。\n各レイヤーの苦労や実態を肌で理解しているため、プロジェクト全体のボトルネックを正確に把握でき、いざという時は自身がプレイングマネージャーとして直接手を動かして解決を主導できる実行力があります。",
  },
  {
    icon: Users,
    title: "経営と現場を繋ぐ全体統率力",
    body: "売上やコストを意識する経営層の視点と、品質や心理的安全性を重んじる現場の視点、その双方の背景を深く理解したうえで適切な折衝を行います。\n対立を生まず、プロジェクトを是々非々で前に進める合意形成を得意としています。\nまた、どのような業務にも意味を見出し、仕事に対して常にポジティブに取り組む姿勢を大切にしています。",
  },
  {
    icon: Zap,
    title: "新しい技術への探求心と組織を巻き込む展開力",
    body: "AIをはじめとした最新技術への探求心と、それをキャッチアップして組織全体を巻き込む展開力に定評があります。\n有用な技術は部門の垣根を越えて社内へ共有し、単なる個人のスキルアップに留まらず、社内向けにNotebookLMやGeminiの活用ハンズオンを実施するなど、会社全体の生産性向上を主導しています。",
  },
];

const nextCareerItems = [
  {
    icon: Target,
    label: "希望ポジション",
    sublabel: "テクニカルPdM / VPoE候補 / PMO",
    body: "AI技術などを活用し、組織やユーザーの生産性を劇的に向上させるプロダクトの開発推進に貢献したいと考えています。これまでのフルスタックな技術経験とマネジメント知見を活かし、経営と現場の橋渡しを担います。",
  },
  {
    icon: MapPin,
    label: "希望する働き方",
    sublabel: "リモートワークベース（出社も可能）",
    body: "高いパフォーマンスと集中力を維持するため、リモートワークをベースとした自律的な働き方を希望しています。",
  },
  {
    icon: Calendar,
    label: "ジョイン時期の目安",
    sublabel: "2026年夏頃（8月以降）",
    body: "2026年夏頃（8月以降）の参画を見据えて、良いご縁があれば広くカジュアル面談でお話しさせていただきたいと考えております。",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="flex justify-center mb-6">
              <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-green-100 ring-offset-2">
                <Image
                  src="https://pbs.twimg.com/profile_images/2013170392764915712/j4tlJW1__400x400.jpg"
                  alt="きよまる"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">きよまる</h1>
            <p className="text-green-600 font-semibold text-base tracking-wide">
              Technical PdM / PMO
            </p>
            <p className="text-gray-400 text-xs leading-relaxed mt-4 max-w-sm mx-auto">
              ※現在就業中のため、Web上ではハンドルネームにて公開しております。本名および詳細な職務経歴書につきましては、カジュアル面談等でお話しする際にお渡しいたします。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Short summary */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-right text-xs text-gray-300 mb-2">最終更新日：2026年3月13日</p>
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-green-500 pb-2 mb-6">
              プロフィール
            </h2>
            <div className="bg-gray-50 rounded-2xl p-7">
              <p className="text-gray-700 leading-relaxed text-sm">
                オンプレミスおよびAWSをはじめとしたクラウドのインフラ設計・構築から、バックエンド開発、SRE組織の立ち上げ、PMOまで、システム開発における上流から下流までの実務経験を持つプレイングマネージャーです。
              </p>
              <p className="text-gray-700 leading-relaxed text-sm mt-4">
                「システム開発の全体を把握し、総合的に事業を推進できる人材」を目標に意図的にキャリアを形成し、現在はXR系事業のPMOとしてプロジェクト全体管理および現場ディレクションを牽引しています。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Strengths */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-green-500 pb-2 mb-6">
              私の3つの強み
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {strengths.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="border border-gray-100 rounded-2xl p-6 hover:border-green-200 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mt-0.5">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">
                          {s.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{s.body}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="bg-green-600 rounded-2xl p-7 text-white">
              <h2 className="text-2xl md:text-3xl font-bold text-white border-b-2 border-green-400 pb-2 mb-4">
                今後の目標
              </h2>
              <p className="leading-relaxed text-sm text-green-50">
                AIの進化により世界が劇的な変化を迎える中、これまで培ってきた「フルスタックの技術力」と「全体を巻き込み推進する力」が最大限に活きると確信しております。今後は特にAIを活用し、多くの方の生産性を向上させるプロダクトの推進に挑戦したいと考えています。健全で透明性のある組織の中で、この変革期をテクニカルPdMとして牽引して参ります。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Next Career */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-green-500 pb-2 mb-2">
              次のキャリアについて
            </h2>
            <p className="text-gray-500 text-sm mb-6">次に挑戦したいこと・希望条件</p>
          </FadeIn>
          <div className="space-y-4">
            {nextCareerItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="border border-gray-100 rounded-2xl p-6 hover:border-green-200 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mt-0.5">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">
                          {item.label}
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.sublabel}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Navigation cards */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-green-500 pb-2 mb-6">
              詳細を見る
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href="/career"
              className="group flex items-center justify-between border border-gray-100 rounded-2xl p-6 hover:border-green-300 hover:bg-green-50/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Briefcase className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">経歴・スキル詳細</p>
                  <p className="text-gray-400 text-xs mt-0.5">職務経歴・技術スキル・今後の目標</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-500 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}

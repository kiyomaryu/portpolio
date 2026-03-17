import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";
import { ArrowLeft, Users, CheckCircle } from "lucide-react";

type Project = {
  title: string;
  role: string;
  scale: string;
  result: string;
};

type CareerItem = {
  period: string;
  company: string;
  size: string;
  role: string;
  description?: string;
  projects?: Project[];
};

const careers: CareerItem[] = [
  {
    period: "2022年4月 ～ 現在",
    company: "XR・メタバース関連企業",
    size: "従業員数：100名規模",
    role: "PMO / PdM / SREチームリーダー",
    projects: [
      {
        title: "自社大規模メタバースイベントの制作進行管理と業務フロー改善",
        role: "PMO",
        scale: "40名規模（PMO、ディレクター、クリエイター）",
        result:
          "工程管理や原価計算が曖昧だった状況に対し、タスクの可視化とスケジュール管理を徹底。また、特定チームのリーダーの苦手領域を重点的にフォローアップすることで現場の調整負担を軽減しスケジュールの通りにプロジェクト進行を実施中。",
      },
      {
        title: "XR事業（リアル・バーチャル連動案件）の新規立ち上げ",
        role: "PdM",
        scale: "20名規模",
        result:
          "プロトタイプだったプロダクトの商用化ミッションにおいて、新規事業立ち上げ責任者に就任。社内リソース確保、予算・原価に基づくベンダー交渉を実施。自身もバッチプログラム開発やインフラ整備に手を動かしつつ、大手クライアント向け3D広告システムや協賛ブースのディレクション等の主要案件を完遂。事業立ち上げを成功に導いた。",
      },
      {
        title: "SREチームの新規立ち上げおよび組織マネジメント",
        role: "SREチームリーダー",
        scale: "最大5名",
        result:
          "インフラ運用の属人化解消のため、SREチーム新設の「2カ年計画」を経営層へ提案し採択。独自の採用基準で直接スカウトを行いチームを組成。モダンインフラ環境の構築、CI/CD整備、コスト最適化を主導したのち、自律的なチームへ成長させた段階でサブリーダーへ権限移譲した。",
      },
    ],
  },
  {
    period: "2018年4月 ～ 2022年3月",
    company: "大手インターネットサービス企業",
    size: "従業員数：2,000名規模",
    role: "インフラエンジニア",
    description:
      "自社のホスティングサービスのオンプレミス環境におけるインフラ構築、運用保守、各種バッチ開発を担当。オンコール対応等のトラブルシューティングを実施。監視体制の改善（Zabbix等）とチケットシステム導入による属人化排除、および新人研修の講師として技術力底上げに貢献。",
  },
  {
    period: "2016年3月 ～ 2018年3月",
    company: "中古自動車総合商社",
    size: "従業員数：300名規模",
    role: "社内SE・バックエンドエンジニア",
    description:
      "自社Webサイトおよび業務システムのバックエンド保守、インフラ構築を担当。店舗拡大時にはITインフラの要件定義からITベンダーとの折衝・管理を実行。社内ヘルプデスク等を通じ、現場の業務円滑化をサポート。",
  },
  {
    period: "2013年8月 ～ 2016年2月",
    company: "SES企業",
    size: "従業員数：350名規模",
    role: "テストリーダー・バックエンドエンジニア",
    description:
      "金融系の厳格な基準に基づくシステムのテスト計画立案・推進、および自動化ツールの導入を実施。また、BtoC向けECサイトのバックエンド運用保守として、不具合特定・改修やデータ抽出等を担当。",
  },
  {
    period: "2012年4月 ～ 2013年6月",
    company: "大手システムインテグレーター",
    size: "従業員数：2,000名規模",
    role: "テストエンジニア",
    description:
      "社会インフラ（高速道路）監視システムのテスト業務および環境構築に従事。手動テストに加え、検証作業を効率化するための自動化ツールを開発・導入し、工数削減に貢献。",
  },
];

const skills = [
  {
    category: "マネジメント・事業推進",
    tags: ["事業計画の策定", "チームビルディング", "採用活動", "Jira", "Backlog", "Trello"],
    note: "新規事業やプロジェクトにおける事業計画の策定、0→1のチーム立ち上げから運用、メンバー育成。経営層と現場双方の視点を持った折衝と、上流から下流までの実務経験を活かしたプロジェクト全体管理。",
  },
  {
    category: "AI活用・モダン開発",
    tags: ["Gemini", "Claude Code", "ChatGPT", "OpenClaw (実務外検証中)"],
    note: "要件定義やプロジェクト進行時の壁打ちによる方針策定。バイブコーディング（AI駆動開発）による社内ツールやプロトタイプ開発。",
  },
  {
    category: "SRE・インフラ全般",
    tags: [
      "AWS",
      "GCP",
      "Cloudflare",
      "OpenStack",
      "VMware",
      "CentOS",
      "Ubuntu",
      "k8s",
      "Docker",
      "Terraform",
      "Ansible",
      "GitHub Actions",
      "CircleCI",
      "Zabbix",
      "Grafana",
      "パケット解析",
      "MySQL",
      "PostgreSQL",
      "OracleDB",
    ],
    note: "オンプレ・クラウドインフラの設計からDBの運用保守まで全般。IaC/CI/CD構築、コスト最適化、監視体制の構築。社内人員のスキルレベルを踏まえた適切な技術選定とアーキテクチャ設計。",
  },
  {
    category: "バックエンド開発・品質保証",
    tags: ["Python", "PHP", "Java", "Ruby", "OWASP ZAP", "OpenVAS", "OpenVuls", "Selenium等のテスト自動化ツール"],
    note: "システム全体を俯瞰した技術選定・アーキテクチャ設計・バックエンド実装。ハードウェアを含むシナリオテストの設計、テスト自動化の推進、および脆弱性評価による品質リスクの事前検知。",
  },
  {
    category: "社内SE・コーポレートIT",
    tags: ["ベンダー折衝", "要求分析", "社内NW構築", "資産管理", "PCキッティング"],
    note: "関連部署からの要望・課題の吸い上げによる要件定義と、ベンダーコントロールを通じたシステム開発推進。新規店舗オープン時のネットワーク構築フォロー、PCキッティングやIT資産管理による社内環境の整備。",
  },
];

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20 px-6 pb-20">
        <div className="max-w-3xl mx-auto">

          {/* Page heading */}
          <FadeIn>
            <div className="pt-10 pb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">キャリア</h1>
              <p className="text-gray-500 text-base">スキル・経験・職務経歴</p>
            </div>
          </FadeIn>

          {/* Skills */}
          <section className="pb-12">
            <FadeIn>
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-2 mb-6">
                スキル・経験
              </h2>
            </FadeIn>
            <div className="space-y-6">
              {skills.map((skill, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{skill.category}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {skill.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full border border-green-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {skill.note && (
                      <p className="text-gray-400 text-base leading-relaxed mt-2">{skill.note}</p>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="pb-4">
            <FadeIn>
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-2 mb-6">
                職務経歴
              </h2>
            </FadeIn>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100" />
              <div className="space-y-10">
                {careers.map((career, i) => (
                  <FadeIn key={i} delay={0.05}>
                    <div className="relative pl-14">
                      <div
                        className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                          i === 0
                            ? "bg-green-600 border-green-600"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <span
                          className={`text-xs font-bold ${
                            i === 0 ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {careers.length - i}
                        </span>
                      </div>

                      <p className="text-sm text-green-600 font-semibold mb-1.5">{career.period}</p>

                      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-1">{career.company}</h2>
                        <span className="text-sm text-gray-400">{career.size}</span>
                        <div className="mt-2 mb-1">
                          <span className="text-lg font-semibold text-green-600">
                            {career.role}
                          </span>
                        </div>
                        {career.description && (
                          <p className="text-gray-600 text-base leading-relaxed mt-3">
                            {career.description}
                          </p>
                        )}
                      </div>

                      {career.projects && (
                        <div className="space-y-4">
                          {career.projects.map((proj, j) => (
                            <div
                              key={j}
                              className="bg-gray-50 rounded-2xl p-5 border border-gray-100"
                            >
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <h3 className="text-lg font-bold text-gray-800 leading-snug flex-1">
                                  {proj.title}
                                </h3>
                                <span className="flex-shrink-0 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                                  {proj.role}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 text-base text-gray-500 mb-3">
                                <Users className="w-3.5 h-3.5" />
                                <span><span className="font-semibold">規模：</span>{proj.scale}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-600 text-base leading-relaxed"><span className="font-semibold">実績：</span>{proj.result}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}

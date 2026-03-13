import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowLeft, ImageIcon, Github, ExternalLink } from "lucide-react";

type WorkItem = {
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  status: "wip" | "released";
  githubUrl?: string;
  demoUrl?: string;
};

const works: WorkItem[] = [
  {
    title: "Local AI Agent",
    subtitle: "ローカルLLMエージェントの構築・運用",
    desc: "OpenClaw等のフレームワークを活用し、外部サービスに依存せずローカル環境で動作するAIエージェントを構築・運用するプロジェクト。プライバシーを守りながら業務効率化を実現することを目的として開発中。RAGによるナレッジベース検索や、タスク自動化パイプラインの実装を進めています。",
    tags: ["Python", "LLM", "RAG", "FastAPI", "Docker"],
    status: "wip",
  },
  {
    title: "Unity Game Development",
    subtitle: "ブラウザ向けシューティングゲーム開発",
    desc: "Unityを用いてブラウザ向けのシューティングゲームを開発中。XR事業で培ったインタラクティブなコンテンツ制作の知見を活かし、WebGLビルドによるブラウザプレイを実現するオリジナルゲームです。スコアランキング機能やモバイル対応も視野に入れて設計しています。",
    tags: ["Unity", "C#", "WebGL", "Shader"],
    status: "wip",
  },
];

export default function WorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20 px-6 pb-20">
        <div className="max-w-3xl mx-auto">

          {/* Page heading */}
          <div className="pt-10 pb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Works</h1>
            <p className="text-gray-500 text-sm mt-1">個人開発・プロジェクト</p>
          </div>

          {/* Work cards */}
          <div className="space-y-8">
            {works.map((work, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl overflow-hidden hover:border-green-200 transition-colors"
              >
                {/* Thumbnail placeholder */}
                <div className="bg-gray-50 h-52 flex items-center justify-center relative">
                  <ImageIcon className="w-12 h-12 text-gray-200" />
                  {work.status === "wip" && (
                    <span className="absolute top-4 right-4 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
                      Work in Progress
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {work.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-bold text-gray-900 text-xl mb-1 tracking-tight">
                    {work.title}
                  </h2>
                  <p className="text-green-600 text-sm font-medium mb-4">{work.subtitle}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{work.desc}</p>

                  {/* Links */}
                  <div className="flex gap-3 mt-6">
                    {work.githubUrl ? (
                      <a
                        href={work.githubUrl}
                        className="inline-flex items-center gap-2 text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:border-gray-400 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm text-gray-300 border border-gray-100 px-4 py-2 rounded-xl cursor-not-allowed">
                        <Github className="w-4 h-4" />
                        GitHub（準備中）
                      </span>
                    )}
                    {work.demoUrl ? (
                      <a
                        href={work.demoUrl}
                        className="inline-flex items-center gap-2 text-sm text-white bg-green-600 px-4 py-2 rounded-xl hover:bg-green-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm text-gray-300 border border-gray-100 px-4 py-2 rounded-xl cursor-not-allowed">
                        <ExternalLink className="w-4 h-4" />
                        Demo（準備中）
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

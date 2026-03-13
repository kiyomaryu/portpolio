import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";
import { ArrowLeft, Twitter, FileText, ExternalLink, Mail } from "lucide-react";

const links = [
  {
    icon: Twitter,
    label: "X (Twitter)",
    desc: "日々の気づきや技術トレンド、キャリアに関する発信をしています。",
    href: "https://x.com/kiyomaruworks",
    color: "hover:border-sky-200 hover:bg-sky-50/40",
    iconColor: "text-sky-500",
    iconBg: "bg-sky-50",
  },
  {
    icon: FileText,
    label: "note",
    desc: "技術・プロダクト・組織づくりに関する記事を発信しています。",
    href: "https://note.com/kiyomaruworks",
    color: "hover:border-green-200 hover:bg-green-50/40",
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20 px-6 pb-20">
        <div className="max-w-3xl mx-auto">

          {/* Page heading */}
          <FadeIn>
            <div className="pt-10 pb-10">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">リンク</h1>
              <p className="text-gray-500 text-sm">Links</p>
            </div>
          </FadeIn>

          {/* Link cards */}
          <div className="space-y-4 mb-10">
            {links.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-5 border border-gray-100 rounded-2xl p-6 transition-all ${item.color}`}
                  >
                    <div className={`flex-shrink-0 w-14 h-14 ${item.iconBg} rounded-2xl flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 ${item.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xl font-bold text-gray-900">{item.label}</p>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                    <ExternalLink className="flex-shrink-0 w-4 h-4 text-gray-300" />
                  </a>
                </FadeIn>
              );
            })}
          </div>

          {/* Contact CTA */}
          <FadeIn delay={0.2}>
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <p className="text-gray-600 text-lg font-medium leading-relaxed mb-6">
                転職スカウトのご連絡、お待ちしております。
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfKkBsQgsTU6hm6OOYUfRbcp7gtNHVJfmiXTqSWeKMt48kObA/viewform?usp=publish-editor"
                className="inline-flex items-center gap-2.5 bg-green-600 text-white px-7 py-4 rounded-2xl font-semibold text-sm hover:bg-green-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                転職スカウトのご連絡はこちら
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
            </div>
          </FadeIn>

        </div>
      </div>

      <Footer />
    </div>
  );
}

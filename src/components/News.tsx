"use client";

import { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";
import { ja } from "date-fns/locale/ja";
import { ChevronDown } from "lucide-react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type NewsItem = {
  date: string;
  title: string;
  titleColor?: string;
  content: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  defaultExpanded?: boolean;
};

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwhK99cNmemD_U9ZjAimqdlSc1XbzbnkJ-gf7CZvfuuEmpiItUN2dnb5PnuzJ8d4-wUmA/exec";

const CACHE_KEY = "news_cache";
const CACHE_DURATION = 15 * 60 * 1000; // 15分

type CacheData = {
  data: NewsItem[];
  timestamp: number;
};

// 掲載期間でフィルタリング
const filterByPublishPeriod = (items: NewsItem[]): NewsItem[] => {
  const today = new Date().toISOString().split("T")[0];
  return items.filter((item) => {
    // 掲載期間が設定されていない場合は常に表示
    if (!item.startDate && !item.endDate) return true;
    // 開始日のみ設定: 開始日以降なら表示
    if (item.startDate && !item.endDate) return today >= item.startDate;
    // 終了日のみ設定: 終了日以前なら表示
    if (!item.startDate && item.endDate) return today <= item.endDate;
    // 両方設定: 期間内なら表示
    return today >= item.startDate! && today <= item.endDate!;
  });
};

export default function News() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());
  const [initialized, setInitialized] = useState(false);

  // 掲載期間でフィルタリングされたアイテム
  const visibleItems = filterByPublishPeriod(newsItems);

  // 初期展開状態を設定
  useEffect(() => {
    if (visibleItems.length > 0 && !initialized) {
      const defaultExpandedIndices = new Set<number>();
      visibleItems.forEach((item, index) => {
        if (item.defaultExpanded) {
          defaultExpandedIndices.add(index);
        }
      });
      setExpandedIndices(defaultExpandedIndices);
      setInitialized(true);
    }
  }, [visibleItems, initialized]);

  useEffect(() => {
    async function fetchNews() {
      try {
        // キャッシュをチェック
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp }: CacheData = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setNewsItems(data);
            setLoading(false);
            return;
          }
        }

        // フェッチ
        const res = await fetch(APPS_SCRIPT_URL);
        const data = await res.json();
        setNewsItems(data);

        // キャッシュに保存
        const cacheData: CacheData = { data, timestamp: Date.now() };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      } catch (error) {
        console.error("Failed to fetch news:", error);
        // エラー時はキャッシュがあれば使う
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data }: CacheData = JSON.parse(cached);
          setNewsItems(data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section className="py-12 bg-white text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-xl font-bold text-center mb-6">お知らせ</h3>
        {loading ? (
          <p className="text-center text-gray-500">読み込み中...</p>
        ) : visibleItems.length > 0 ? (
          <div className="space-y-3">
            {visibleItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 flex-shrink-0">
                      {format(parseISO(item.date), "yyyy.MM.dd", { locale: ja })}
                    </span>
                    <span
                      className="font-bold"
                      style={{ color: item.titleColor || "#111827" }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                      expandedIndices.has(index) ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedIndices.has(index) && item.content && (
                  <div className="px-5 pb-4 pt-0 prose prose-sm prose-gray max-w-none [&_p]:my-0 [&_h1]:mb-2 [&_h1]:mt-3 [&_h2]:mb-1.5 [&_h2]:mt-2.5 [&_h3]:mb-1 [&_h3]:mt-2 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                    <Markdown rehypePlugins={[rehypeRaw]}>
                      {item.content}
                    </Markdown>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">お知らせはありません</p>
        )}
      </div>
    </section>
  );
}

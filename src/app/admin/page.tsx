"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { parseISO, format } from "date-fns";
import { ja } from "date-fns/locale/ja";
import { Trash2, Edit, Plus, Save, X, LogOut, Lock, Loader2 } from "lucide-react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import MDEditor, { commands } from "@uiw/react-md-editor";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type EditorType = "markdown" | "html";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

// Markdownエディタ用カラーコマンド
const colorCommands = [
  { color: "#e60000", name: "赤" },
  { color: "#0066cc", name: "青" },
  { color: "#008000", name: "緑" },
  { color: "#ff9900", name: "オレンジ" },
  { color: "#9933ff", name: "紫" },
].map(({ color, name }) => ({
  name: `color-${name}`,
  keyCommand: `color-${name}`,
  buttonProps: { "aria-label": name, title: name },
  icon: (
    <span
      style={{
        backgroundColor: color,
        width: 14,
        height: 14,
        borderRadius: 2,
        display: "inline-block",
      }}
    />
  ),
  execute: (state: { selectedText: string }, api: { replaceSelection: (text: string) => void }) => {
    const text = state.selectedText || "テキスト";
    api.replaceSelection(`<span style="color: ${color}">${text}</span>`);
  },
}));

type NewsItem = {
  id?: string;
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

export default function AdminPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editorType, setEditorType] = useState<EditorType>("markdown");
  const [htmlViewMode, setHtmlViewMode] = useState<"visual" | "code">("visual");

  // 認証状態
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  // フォームの状態
  const [formData, setFormData] = useState<NewsItem>({
    date: new Date().toISOString().split("T")[0],
    title: "",
    titleColor: "",
    content: "",
    startDate: "",
    endDate: "",
    defaultExpanded: false,
  });

  // 認証チェック（sessionStorageから復元）
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("admin_password");
    if (savedPassword) {
      setPassword(savedPassword);
      setIsAuthenticated(true);
    }
    setCheckingAuth(false);
  }, []);

  // 画像アップロードハンドラー
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        // ファイルサイズチェック（5MB以下）
        if (file.size > 5 * 1024 * 1024) {
          alert("画像ファイルは5MB以下にしてください");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          // Quillエディタに画像を挿入
          const quill = (window as any).quillEditor;
          if (quill) {
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, "image", base64);
            quill.setSelection(range.index + 1);
          }
        };
        reader.readAsDataURL(file);
      }
    };
  };

  // QuillモジュールにカスタムハンドラーをバインドするためのRef
  const quillRef = (el: any) => {
    if (el) {
      const quill = el.getEditor();
      (window as any).quillEditor = quill;
      quill.getModule("toolbar").addHandler("image", imageHandler);
    }
  };

  // データ取得
  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(APPS_SCRIPT_URL);
      const data = await res.json();
      const itemsWithId = data.map((item: NewsItem, index: number) => ({
        ...item,
        id: item.id || String(index),
      }));
      setNewsItems(itemsWithId);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNews();
    }
  }, [isAuthenticated]);

  // ログイン
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!password.trim()) {
      setLoginError("パスワードを入力してください");
      return;
    }

    setLoggingIn(true);
    try {
      // Google Apps Scriptでパスワードを検証（CORS対応）
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: "login", password }),
      });

      const result = await res.json();

      if (result.error === "Unauthorized") {
        setLoginError("パスワードが正しくありません");
        return;
      }

      // パスワードをsessionStorageに保存
      sessionStorage.setItem("admin_password", password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("ログインに失敗しました");
    } finally {
      setLoggingIn(false);
    }
  };

  // ログアウト
  const handleLogout = () => {
    sessionStorage.removeItem("admin_password");
    setPassword("");
    setIsAuthenticated(false);
    setNewsItems([]);
  };

  // POSTリクエスト（パスワード付き）
  const postWithAuth = async (data: object) => {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
        headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ ...data, password }),
      redirect: "follow",
    });

    const result = await res.json();

    if (result.error === "Unauthorized") {
      setLoginError("パスワードが正しくありません");
      handleLogout();
      throw new Error("Unauthorized");
    }

    return result;
  };

  // 新規作成
  const handleCreate = async () => {
    if (!formData.title.trim()) {
      alert("タイトルを入力してください");
      return;
    }

    setSaving(true);
    try {
      await postWithAuth({ action: "create", ...formData });
      await fetchNews();
      setFormData({
        date: new Date().toISOString().split("T")[0],
        title: "",
        titleColor: "",
        content: "",
        startDate: "",
        endDate: "",
        defaultExpanded: false,
      });
      setShowForm(false);
      localStorage.removeItem("news_cache");
    } catch (error) {
      if ((error as Error).message !== "Unauthorized") {
        console.error("Failed to create news:", error);
        alert("投稿に失敗しました");
      }
    } finally {
      setSaving(false);
    }
  };

  // 更新
  const handleUpdate = async () => {
    if (!formData.title.trim()) {
      alert("タイトルを入力してください");
      return;
    }

    setSaving(true);
    try {
      await postWithAuth({ action: "update", id: editingId, ...formData });
      await fetchNews();
      setEditingId(null);
      setFormData({
        date: new Date().toISOString().split("T")[0],
        title: "",
        titleColor: "",
        content: "",
        startDate: "",
        endDate: "",
        defaultExpanded: false,
      });
      localStorage.removeItem("news_cache");
    } catch (error) {
      if ((error as Error).message !== "Unauthorized") {
        console.error("Failed to update news:", error);
        alert("更新に失敗しました");
      }
    } finally {
      setSaving(false);
    }
  };

  // 削除
  const handleDelete = async (id: string) => {
    if (!confirm("このお知らせを削除しますか？")) {
      return;
    }

    setDeletingId(id);
    try {
      await postWithAuth({ action: "delete", id });
      await fetchNews();
      localStorage.removeItem("news_cache");
    } catch (error) {
      if ((error as Error).message !== "Unauthorized") {
        console.error("Failed to delete news:", error);
        alert("削除に失敗しました");
      }
    } finally {
      setDeletingId(null);
    }
  };

  // 編集開始
  const startEdit = (item: NewsItem) => {
    setEditingId(item.id || null);
    setFormData({
      date: item.date,
      title: item.title,
      titleColor: item.titleColor || "",
      content: item.content,
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      defaultExpanded: item.defaultExpanded || false,
    });
    setShowForm(false);
  };

  // 編集キャンセル
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      date: new Date().toISOString().split("T")[0],
      title: "",
      titleColor: "",
      content: "",
      startDate: "",
      endDate: "",
      defaultExpanded: false,
    });
  };

  // ローディング中
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  // ログイン画面
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <Lock className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">管理者ログイン</h1>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="管理者パスワードを入力"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-sm mb-4">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loggingIn ? "ログイン中..." : "ログイン"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-blue-600 hover:underline text-sm">
              サイトに戻る
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 管理画面
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">お知らせ管理</h1>
          <div className="flex items-center gap-4">
            <a href="/" className="text-blue-600 hover:underline">
              サイトに戻る
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
            >
              <LogOut className="w-5 h-5" />
              ログアウト
            </button>
          </div>
        </div>

        {/* 新規作成ボタン */}
        {!showForm && !editingId && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <Plus className="w-5 h-5" />
            新規作成
          </button>
        )}

        {/* 投稿フォーム */}
        {(showForm || editingId) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">
              {editingId ? "お知らせを編集" : "新規お知らせ"}
            </h2>

            <div className="space-y-4">
              {/* 日付 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  日付
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* タイトル */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  タイトル
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="お知らせのタイトル"
                  style={{ color: formData.titleColor || "inherit" }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500">文字色:</span>
                  {["", "#e60000", "#0066cc", "#008000", "#ff9900", "#9933ff"].map((color) => (
                    <button
                      key={color || "default"}
                      type="button"
                      onClick={() => setFormData({ ...formData, titleColor: color })}
                      className={`w-6 h-6 rounded border-2 ${
                        formData.titleColor === color
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color || "#000000" }}
                      title={color || "黒（デフォルト）"}
                    />
                  ))}
                </div>
              </div>

              {/* 掲載期間 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  掲載期間（任意）
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <span className="text-gray-500">〜</span>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  未設定の場合は常に表示されます
                </p>
              </div>

              {/* 初期展開設定 */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="defaultExpanded"
                  checked={formData.defaultExpanded || false}
                  onChange={(e) =>
                    setFormData({ ...formData, defaultExpanded: e.target.checked })
                  }
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="defaultExpanded" className="text-sm text-gray-700">
                  初期状態で展開する
                </label>
              </div>

              {/* 内容 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    内容
                  </label>
                  <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setEditorType("markdown")}
                      className={`px-3 py-1 text-sm rounded-md transition ${
                        editorType === "markdown"
                          ? "bg-white shadow text-green-600 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Markdown
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorType("html")}
                      className={`px-3 py-1 text-sm rounded-md transition ${
                        editorType === "html"
                          ? "bg-white shadow text-green-600 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      HTML
                    </button>
                  </div>
                </div>

                {editorType === "markdown" ? (
                  <div data-color-mode="light">
                    <MDEditor
                      value={formData.content}
                      onChange={(value) =>
                        setFormData({ ...formData, content: value || "" })
                      }
                      height={300}
                      preview="live"
                      commands={[
                        commands.bold,
                        commands.italic,
                        commands.strikethrough,
                        commands.divider,
                        ...colorCommands,
                        commands.divider,
                        commands.link,
                        commands.quote,
                        commands.unorderedListCommand,
                        commands.orderedListCommand,
                      ]}
                    />
                  </div>
                ) : (
                  <div>
                    {/* ビジュアル/コード切り替え */}
                    <div className="flex gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setHtmlViewMode("visual")}
                        className={`px-3 py-1 text-sm rounded transition ${
                          htmlViewMode === "visual"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        ビジュアル
                      </button>
                      <button
                        type="button"
                        onClick={() => setHtmlViewMode("code")}
                        className={`px-3 py-1 text-sm rounded transition ${
                          htmlViewMode === "code"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        HTMLコード
                      </button>
                    </div>

                    {htmlViewMode === "visual" ? (
                      <div>
                        <ReactQuill
                          theme="snow"
                          value={formData.content}
                          onChange={(value) =>
                            setFormData({ ...formData, content: value })
                          }
                          modules={quillModules}
                          style={{ height: "250px", marginBottom: "50px" }}
                        />
                        <style jsx global>{`
                          .ql-editor p {
                            margin: 0;
                          }
                          .ql-editor p + p {
                            margin-top: 0;
                          }
                        `}</style>
                      </div>
                    ) : (
                      <textarea
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        className="w-full h-[300px] p-3 border rounded-lg font-mono text-sm"
                        placeholder="HTMLコードを直接入力..."
                      />
                    )}
                  </div>
                )}
              </div>

              {/* ボタン */}
              <div className="flex gap-3">
                <button
                  onClick={editingId ? handleUpdate : handleCreate}
                  disabled={saving}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {saving ? "保存中..." : "保存"}
                </button>
                <button
                  onClick={() => {
                    if (editingId) {
                      cancelEdit();
                    } else {
                      setShowForm(false);
                      setFormData({
                        date: new Date().toISOString().split("T")[0],
                        title: "",
                        titleColor: "",
                        content: "",
                        startDate: "",
                        endDate: "",
                        defaultExpanded: false,
                      });
                    }
                  }}
                  className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  <X className="w-5 h-5" />
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}

        {/* お知らせ一覧 */}
        <div className="bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-bold p-4 border-b">お知らせ一覧</h2>

          {loading ? (
            <p className="p-4 text-gray-500">読み込み中...</p>
          ) : newsItems.length > 0 ? (
            <div className="divide-y">
              {newsItems.map((item, index) => (
                <div key={item.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm text-gray-500">
                          {format(parseISO(item.date), "yyyy.MM.dd", {
                            locale: ja,
                          })}
                        </span>
                        <span
                          className="font-bold"
                          style={{ color: item.titleColor || "inherit" }}
                        >
                          {item.title}
                        </span>
                        {(item.startDate || item.endDate) && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                            掲載: {item.startDate || "開始日なし"} 〜 {item.endDate || "終了日なし"}
                          </span>
                        )}
                      </div>
                      {item.content && (
                        <div className="px-5 pb-4 pt-0 prose prose-sm prose-gray max-w-none [&_p]:my-0 [&_h1]:mb-2 [&_h1]:mt-3 [&_h2]:mb-1.5 [&_h2]:mt-2.5 [&_h3]:mb-1 [&_h3]:mt-2 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                          <Markdown rehypePlugins={[rehypeRaw]}>
                            {item.content}
                          </Markdown>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => startEdit(item)}
                        disabled={deletingId === item.id}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition disabled:opacity-50"
                        title="編集"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id!)}
                        disabled={deletingId !== null}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                        title="削除"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-4 text-gray-500">お知らせはありません</p>
          )}
        </div>
      </div>
    </div>
  );
}

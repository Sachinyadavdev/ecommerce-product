"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Loader2, Linkedin, Twitter, Facebook, Instagram, Share2, Globe } from "lucide-react";
import { toast } from "sonner";

interface SocialPost {
  id: string;
  platform: string;
  embedHtml: string;
  title: string | null;
  isActive: boolean;
  showOnHome: boolean;
  sortOrder: number;
  createdAt: string;
}

const PLATFORMS = [
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, color: "text-[#0077B5]" },
  { id: "twitter", label: "X / Twitter", icon: Twitter, color: "text-[#1DA1F2]" },
  { id: "facebook", label: "Facebook", icon: Facebook, color: "text-[#1877F2]" },
  { id: "instagram", label: "Instagram", icon: Instagram, color: "text-[#E4405F]" },
  { id: "other", label: "Other", icon: Globe, color: "text-gray-500" },
];

export default function SocialPostsAdmin() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<SocialPost | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/social-posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      toast.error("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };

  const openAdd = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const openEdit = (post: SocialPost) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const url = editingPost ? `/api/admin/social-posts/${editingPost.id}` : "/api/admin/social-posts";
      const method = editingPost ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          isActive: formData.get("isActive") === "on",
          showOnHome: formData.get("showOnHome") === "on",
          sortOrder: parseInt(data.sortOrder as string) || 0,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to save post");
      }

      toast.success(editingPost ? "Post updated" : "Post created");
      setIsModalOpen(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this social post?")) return;
    try {
      const response = await fetch(`/api/admin/social-posts/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Post deleted");
        fetchPosts();
      } else {
        const err = await response.json();
        toast.error(err.error || "Failed to delete");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const getPlatformIcon = (platform: string) => {
    const p = PLATFORMS.find((p) => p.id === platform) || PLATFORMS.find((p) => p.id === "other");
    const Icon = p!.icon;
    return <Icon className={`w-5 h-5 ${p!.color}`} />;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#284b8c]" />
      </div>
    );
  }

  const filteredPosts = posts.filter(post => 
     (post.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
     post.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const homePosts = filteredPosts.filter(p => p.showOnHome);
  const otherPosts = filteredPosts.filter(p => !p.showOnHome);

  const renderPostCard = (post: SocialPost) => (
    <div key={post.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-100 transition-all group flex flex-col">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-lg">
            {getPlatformIcon(post.platform)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 line-clamp-1">{post.title || "Untitled Post"}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${post.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                {post.isActive ? 'Active' : 'Hidden'}
              </span>
              {post.showOnHome && (
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 shadow-sm shadow-blue-100/50">
                  Home Page
                </span>
              )}
              <span className="text-xs text-gray-400 font-mono text-[10px]">Order: {post.sortOrder}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5 bg-gray-50 flex-1 relative hidden group-hover:flex items-center justify-center isolate">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10" />
        <div className="z-20 flex gap-2">
          <button onClick={() => openEdit(post)} className="p-2 bg-white text-blue-600 rounded-lg shadow-sm font-bold text-xs flex items-center gap-1 hover:bg-blue-50">
            <Edit className="w-4 h-4" /> Edit
          </button>
          <button onClick={() => handleDelete(post.id)} className="p-2 bg-white text-red-600 rounded-lg shadow-sm font-bold text-xs flex items-center gap-1 hover:bg-red-50">
            <Trash2 className="w-4 h-4" /> Remove
          </button>
        </div>
      </div>

      <div className="p-4 bg-gray-50 group-hover:hidden">
         <div className="h-40 w-full rounded-xl overflow-hidden bg-white border border-gray-200 relative">
             <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none" dangerouslySetInnerHTML={{ __html: post.embedHtml }} />
         </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Social Feed Management</h1>
          <p className="text-gray-500 mt-1">Manage LinkedIn and other social posts displayed on your site.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
             <input type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-shadow shadow-sm" />
             <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center justify-center gap-2 bg-[#284b8c] hover:bg-[#1a3566] text-white px-5 py-2 rounded-xl font-bold transition-all shadow-md shadow-[#284b8c]/20 hover:shadow-[#284b8c]/40 hover:-translate-y-0.5 whitespace-nowrap w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            Add Post
          </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500 shadow-sm">
          <Share2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">No Posts Yet</h3>
          <p>Click "Add Post" to embed your first social update.</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-1">No matching posts</h3>
          <p>No social posts match your search query: "{searchQuery}".</p>
        </div>
      ) : (
        <div className="space-y-8">
          {homePosts.length > 0 && (
             <section>
               <h2 className="text-lg font-black text-gray-900 mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                 <Globe className="w-5 h-5 text-blue-600" />
                 Featured on Home Page
                 <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full ml-auto sm:ml-2 font-bold">{homePosts.length}</span>
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {homePosts.map(renderPostCard)}
               </div>
             </section>
          )}

          {otherPosts.length > 0 && (
             <section>
               <h2 className="text-lg font-black text-gray-900 mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                 <Share2 className="w-5 h-5 text-gray-500" />
                 Events Page & Other Posts
                 <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full ml-auto sm:ml-2 font-bold">{otherPosts.length}</span>
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {otherPosts.map(renderPostCard)}
               </div>
             </section>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-black text-gray-900">
                {editingPost ? "Edit Social Post" : "Add Social Post"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Platform</label>
                  <select
                    name="platform"
                    defaultValue={editingPost?.platform || "linkedin"}
                    className="w-full p-2.5 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Internal Title</label>
                  <input
                    name="title"
                    defaultValue={editingPost?.title || ""}
                    placeholder="e.g., Expo Announcement"
                    className="w-full p-2.5 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Embed Code (HTML iframe)</label>
                <textarea
                  name="embedHtml"
                  defaultValue={editingPost?.embedHtml || ""}
                  required
                  rows={5}
                  placeholder='<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:123" height="500" width="100%" frameborder="0" ...></iframe>'
                  className="w-full p-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono placeholder:text-gray-400 placeholder:font-sans leading-relaxed"
                />
              </div>

              <div className="grid flex-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Sort Order</label>
                  <input
                    type="number"
                    name="sortOrder"
                    defaultValue={editingPost?.sortOrder || 0}
                    className="w-full p-2.5 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div className="flex flex-col justify-end gap-2">
                  <label className="flex items-center gap-3 p-2.5 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors w-full">
                    <input
                      type="checkbox"
                      name="isActive"
                      defaultChecked={editingPost ? editingPost.isActive : true}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm font-bold text-gray-700">Display on Public Site</span>
                  </label>
                  <label className="flex items-center gap-3 p-2.5 border border-[#284b8c]/20 bg-[#284b8c]/5 rounded-xl cursor-pointer hover:bg-[#284b8c]/10 transition-colors w-full">
                    <input
                      type="checkbox"
                      name="showOnHome"
                      defaultChecked={editingPost ? editingPost.showOnHome : false}
                      className="w-4 h-4 text-[#284b8c] rounded border-gray-300 focus:ring-[#284b8c]"
                    />
                    <span className="text-sm font-bold text-[#284b8c]">Feature on Home Page</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#284b8c] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#1a3566] disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-blue-100 text-sm transition-colors"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {editingPost ? "Save Changes" : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

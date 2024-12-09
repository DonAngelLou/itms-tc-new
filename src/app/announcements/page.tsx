// src/app/announcements/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { fetchAnnouncements, postAnnouncement } from "@/lib/api";

interface Announcement {
  title: string;
  content: string;
  is_public: boolean;
}

const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    async function loadAnnouncements() {
      const data = await fetchAnnouncements();
      setAnnouncements(Array.isArray(data) ? data : []); // Ensure announcements is an array
    }
    loadAnnouncements();
  }, []);

  const handlePostAnnouncement = async () => {
    await postAnnouncement({ title, content, is_public: isPublic });
    setTitle("");
    setContent("");
    setIsPublic(true);
    const data = await fetchAnnouncements();
    setAnnouncements(data);
  };

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
      {announcements.map((announcement, index) => (
        <div key={index} className="p-2 rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold">{announcement.title}</h3>
          <p>{announcement.content}</p>
          <small>{announcement.is_public ? "Public" : "Private"}</small>
        </div>
      ))}
      <div>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="border p-2 rounded mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label>
          <input type="checkbox" checked={isPublic} onChange={() => setIsPublic(!isPublic)} /> Public
        </label>
        <button onClick={handlePostAnnouncement} className="bg-blue-500 text-white p-2 rounded">Post</button>
      </div>
    </div>
  );
};

export default AnnouncementsPage;

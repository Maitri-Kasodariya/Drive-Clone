# 📁 Drive Clone — Google Drive-Inspired File Explorer

A lightweight React + TypeScript web application that mimics key features of Google Drive. This project emphasizes folder navigation, breadcrumb tracking, search, and file/folder management — all without any external libraries or actual file storage.

---

## ✨ Features

### 📂 Folder Navigation
- The app simulates a file system with folders and files represented as objects.
- Users can navigate into folders in a multi-level hierarchy.
- A **breadcrumb trail** shows the current path and lets users jump to any level instantly.
- A **Back button** allows step-wise navigation to parent folders and is disabled at the root.

### 🔍 Search
- A real-time search bar filters both files and folders based on their names.
- Search results indicate if the item is a folder.
- Clicking a folder from search results navigates directly to that folder and updates the breadcrumb path accordingly.

### 🛠 File & Folder Management
- Users can **create** new folders and files at any level.
- Duplicate names at the same level are prevented.
- Right-clicking an item opens a **context menu** with options to rename or delete.
- Deleting a folder removes all of its contents recursively.

### ✅ UX Enhancements
- Clean, responsive UI built with plain CSS.

---

## 🌍 Live Demo

You can check out the live version of the application here:  
[**Drive Clone - Live Demo**](https://Maitri-Kasodariya.github.io/Drive-Clone)

---

## 📽 Demo

> 🎥 Watch the demo video:  
> [Drive Clone Demo Video](https://drive.google.com/file/d/1ep9iKO-baG3rUUGMW5OFlsWh92W2NxlB/view?usp=sharing)

---

## 🔧 Getting Started

### Installation

```bash
git clone https://github.com/Maitri-Kasodariya/Drive-Clone.git
cd Drive-Clone
npm install
npm start

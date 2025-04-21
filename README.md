# 📚 Reaktivate TDD — Books App

This project is a refactored version of the original Reaktivate TDD Challenge, restructured into a **fast-test-friendly** architecture using the **MVP / MVVM pattern**, with **MobX** for state management and complete separation of logic from UI.

It allows users to:
- View books fetched from a REST API
- Filter between **All books** and **Private books**
- Add new books (with a **public/private** toggle)
- Reset their personal book list via API
- View a **sticky header** with the private book count

Designed for **testability**, **clarity**, and **maintainability**.


## 🏗️ Architecture Overview

**Key Principles:**
- ✅ **MobX** for reactive state management  
- ✅ A **Controller layer** handles all business logic  
- ✅ A **pure View layer** — declarative UI only, no logic or conditions  
- ✅ A **Repository layer** abstracts API interaction  
- ✅ **Jest** used for TDD-style unit tests on controller logic  


## 🚀 Getting Started

### 1. Clone the repository

<pre>
  git clone https://github.com/ItayGold/ReaktivateTDD.git
  cd ReaktivateTDD
</pre>

### 2. Install dependencies
<pre>npm install</pre>

If you face dependency conflicts:
<pre>npm install --legacy-peer-deps</pre>

### 3. Run the app
<pre>npm start</pre>
Then open your browser at: http://localhost:3000

## 🧪 Running Tests
<pre>npm run test</pre>
Tests cover logic in BooksController

🙌 Author
Built with ❤️ by Itay Gold



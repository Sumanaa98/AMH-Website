/* =========================================================
   SCRIPT: Absoc Mental Health – Main Site Interactions
   ---------------------------------------------------------
   This script manages all front-end interactivity including:
   - Navigation (hamburger toggle)
   - Blog "Read More" logic
   - Daily changing reminder quote
   - Scrolling image gallery
   - YouTube video sidebar
   - External social and donation links
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    /* =====================================================
       1. HAMBURGER MENU TOGGLE (for mobile navigation)
       -----------------------------------------------------
       Expands and collapses navigation links on smaller
       screens for an easier user experience.
    ===================================================== */
    const hamburger = document.getElementById("hamburger-menu");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

    /* =====================================================
       2. SCROLLING GALLERY (Events/Highlights)
       -----------------------------------------------------
       Allows users to scroll horizontally through the
       image gallery. Includes manual buttons and a slow
       automatic scroll effect.
    ===================================================== */
    const gallery = document.getElementById("gallery");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    if (gallery && leftBtn && rightBtn) {
        leftBtn.addEventListener("click", () => {
            gallery.scrollBy({ left: -300, behaviour: "smooth" });
        });

        rightBtn.addEventListener("click", () => {
            gallery.scrollBy({ left: 300, behaviour: "smooth" });
        });

        // Automatic gentle scroll every few seconds
        setInterval(() => {
            gallery.scrollBy({ left: 300, behaviour: "smooth" });
        }, 7000);
    }

    /* =====================================================
       3. DAILY REMINDER (Quote Section)
       -----------------------------------------------------
       Fetches a fresh inspirational quote each day from
       Quotable.io. The quote updates automatically every
       24 hours and is stored locally to prevent repeats.
    ===================================================== */
    const quoteElement = document.getElementById("dailyQuote");
    const QUOTE_KEY = "absoc_daily_quote";
    const DATE_KEY = "absoc_quote_date";
    const today = new Date().toDateString();

    const storedDate = localStorage.getItem(DATE_KEY);
    const storedQuote = localStorage.getItem(QUOTE_KEY);

    if (storedDate === today && storedQuote) {
        quoteElement.textContent = storedQuote;
    } else {
        fetch("https://api.quotable.io/random")
            .then(response => response.json())
            .then(data => {
                const quoteText = `"${data.content}" — ${data.author}`;
                quoteElement.textContent = quoteText;
                localStorage.setItem(QUOTE_KEY, quoteText);
                localStorage.setItem(DATE_KEY, today);
            })
            .catch(() => {
                quoteElement.textContent = "Take care of your mind — it’s part of your deen.";
            });
    }

    /* =====================================================
       4. BLOG POSTS ("READ MORE" FUNCTION)
       -----------------------------------------------------
       Displays preview cards and loads the full article
       dynamically when “Read More” is clicked.
    ===================================================== */
    const blogGrid = document.getElementById("blog-grid");
    const blogContentSection = document.getElementById("blog-content");
    const postContent = document.getElementById("post-content");
    const backButton = document.getElementById("back-button");
    const blogSection = document.getElementById("blog");

    if (blogGrid) {
        fetch("blogData.json")
            .then(response => {
                if (!response.ok) throw new Error("Network error loading blog data");
                return response.json();
            })
            .then(data => {
                data.forEach(blog => {
                    const blogCard = document.createElement("div");
                    blogCard.className = "blog-post";
                    blogCard.innerHTML = `
                        <h3>${blog.title}</h3>
                        <p>${blog.description}</p>
                        <p><strong>Author:</strong> ${blog.author} | <strong>Date:</strong> ${new Date(blog.date).toLocaleDateString("en-GB")}</p>
                        <a href="#" class="cta-button" data-id="${blog.id}">Read More</a>
                    `;
                    blogGrid.appendChild(blogCard);
                });

                // Add listeners for "Read More" buttons
                document.querySelectorAll(".cta-button").forEach(button => {
                    button.addEventListener("click", event => {
                        event.preventDefault();
                        const blogId = button.getAttribute("data-id");
                        loadBlogPost(blogId, data);
                    });
                });
            })
            .catch(err => console.error("Error fetching blog data:", err));
    }

    function loadBlogPost(id, blogs) {
        const blog = blogs.find(post => post.id === parseInt(id));
        if (blog && postContent && blogContentSection && blogSection) {
            postContent.innerHTML = `
                <h2>${blog.title}</h2>
                <p><strong>Author:</strong> ${blog.author} | <strong>Date:</strong> ${new Date(blog.date).toLocaleDateString("en-GB")}</p>
                <div>${blog.content}</div>
            `;
            blogSection.classList.add("hidden");
            blogContentSection.classList.remove("hidden");
            history.pushState({ id: blog.id }, blog.title, `?post=${blog.id}`);
        }
    }

    if (backButton) {
        backButton.addEventListener("click", () => {
            blogContentSection.classList.add("hidden");
            blogSection.classList.remove("hidden");
            history.pushState(null, null, "blog.html");
        });
    }

    /* =====================================================
       5. YOUTUBE SIDEBAR (Right-hand pop-out panel)
       -----------------------------------------------------
       Allows visitors to watch embedded videos directly
       from the Absoc YouTube channel without leaving the
       website.
    ===================================================== */
    const sidebar = document.getElementById("video-sidebar");
    const openBtn = document.getElementById("video-sidebar-btn");
    const closeBtn = document.getElementById("close-sidebar");

    if (sidebar && openBtn && closeBtn) {
        openBtn.addEventListener("click", () => {
            sidebar.style.right = "0";
        });

        closeBtn.addEventListener("click", () => {
            sidebar.style.right = "-400px";
        });

        document.addEventListener("click", (event) => {
            if (!sidebar.contains(event.target) && !openBtn.contains(event.target)) {
                sidebar.style.right = "-400px";
            }
        });
    }

    /* =====================================================
       6. SOCIAL & SUPPORT LINKS (JustGiving, WhatsApp etc.)
       -----------------------------------------------------
       Adds clickable quick-access links for external support
       and community connection directly from the footer or
       future admin panel.
    ===================================================== */
    const links = {
        justGiving: "https://www.justgiving.com/crowdfunding/absocmental-health?utm_medium=CR&utm_source=CL",
        whatsapp: "https://chat.whatsapp.com/JHkcSV3IxoG6nTxNjDwjl8?mode=wwt",
        linktree: "https://linktr.ee/absocmentalhealth_?utm_source=linktree_profile_share&ltsid=d213043d-ffab-4cc0-8672-894f6fbe16a2",
        email: "absocmentalhealth1@gmail.com"
    };

    console.log("Quick Links Active:", links);
});

document.addEventListener("DOMContentLoaded", () => {
    // Hamburger Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

    // Gallery Scroll Buttons + Auto Scroll
    const gallery = document.getElementById("galleryContainer");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    if (gallery && leftBtn && rightBtn) {
        leftBtn.addEventListener("click", () => {
            gallery.scrollBy({ left: -200, behavior: "smooth" });
        });

        rightBtn.addEventListener("click", () => {
            gallery.scrollBy({ left: 200, behavior: "smooth" });
        });

        // Optional auto-scroll every 5 seconds
        setInterval(() => {
            gallery.scrollBy({ left: 200, behavior: "smooth" });
        }, 5000);
    }

    // Blog Data Fetch and Rendering
    const blogGrid = document.getElementById("blog-grid");
    const blogContentSection = document.getElementById("blog-content");
    const postContent = document.getElementById("post-content");
    const backButton = document.getElementById("back-button");
    const blogSection = document.getElementById("blog");

    if (blogGrid) {
        fetch("blogData.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                data.forEach(blog => {
                    const blogCard = document.createElement("div");
                    blogCard.className = "blog-post";
                    blogCard.innerHTML = `
                        <h3>${blog.title}</h3>
                        <p>${blog.description}</p>
                        <p><strong>Author:</strong> ${blog.author} | <strong>Date:</strong> ${new Date(blog.date).toLocaleDateString()}</p>
                        <a href="#" class="cta-button" data-id="${blog.id}">Read More</a>
                    `;
                    blogGrid.appendChild(blogCard);
                });

                // Add event listeners to "Read More" buttons
                document.querySelectorAll(".cta-button").forEach(button => {
                    button.addEventListener("click", event => {
                        event.preventDefault();
                        const blogId = button.getAttribute("data-id");
                        loadBlogPost(blogId, data);
                    });
                });
            })
            .catch(error => console.error("Error loading blog data:", error));
    }

    function loadBlogPost(id, blogs) {
        const blog = blogs.find(post => post.id === parseInt(id));
        if (blog) {
            postContent.innerHTML = `
                <h2>${blog.title}</h2>
                <p><strong>Author:</strong> ${blog.author} | <strong>Date:</strong> ${new Date(blog.date).toLocaleDateString()}</p>
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

        window.addEventListener("popstate", event => {
            if (event.state && event.state.id) {
                fetch("blogData.json")
                    .then(response => response.json())
                    .then(data => loadBlogPost(event.state.id, data))
                    .catch(error => console.error("Error loading blog post:", error));
            } else {
                blogContentSection.classList.add("hidden");
                blogSection.classList.remove("hidden");
            }
        });
    }

    // Video Sidebar
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
});


document.addEventListener("DOMContentLoaded", () => {
    // Hamburger Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

    // Gallery Scroll Buttons + Auto Scroll
    const gallery = document.getElementById("galleryContainer");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    if (gallery && leftBtn && rightBtn) {
        leftBtn.addEventListener("click", () => {
            gallery.scrollBy({ left: -200, behavior: "smooth" });
        });

        rightBtn.addEventListener("click", () => {
            gallery.scrollBy({ left: 200, behavior: "smooth" });
        });

        setInterval(() => {
            gallery.scrollBy({ left: 200, behavior: "smooth" });
        }, 5000);
    }

    // Blog loading and navigation logic here...

    // Daily Quote API Fetch
    fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(data => {
            document.getElementById("quote-text").textContent = `"${data.content}"`;
            document.getElementById("quote-author").textContent = `– ${data.author}`;
        })
        .catch(err => {
            document.getElementById("quote-text").textContent = "Could not fetch quote today.";
        });
});

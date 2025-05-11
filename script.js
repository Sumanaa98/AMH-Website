<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
    // Hamburger Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        const quoteText = document.getElementById("quote-text");
    
        if (!quoteText) {
            console.error("Error: Quote text element not found.");
            return;
        }
    
        // Use a predefined list of mental health quotes
        const mentalHealthQuotes = [
            "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
            "Self-care is not a luxury, it is a necessity.",
            "You don't have to control your thoughts, you just have to stop letting them control you.",
            "Healing takes time, and asking for help is a courageous step.",
            "Sometimes the people around you won’t understand your journey. They don’t need to, it’s not for them.",
            "Your feelings are valid, and you deserve to be supported.",
            "There is hope, even when your mind tells you there isn’t.",
            "You are more than your darkest days.",
            "Taking care of your mental health is just as important as taking care of your physical health.",
            "You are not alone in this battle. Keep going."
        ];
    
        // Select a random quote from the list
        const randomQuote = mentalHealthQuotes[Math.floor(Math.random() * mentalHealthQuotes.length)];
    
        // Display the quote
        quoteText.textContent = `"${randomQuote}"`;
    });
    
    
    // Blog Data Fetch and Rendering
    const blogGrid = document.getElementById("blog-grid");
    const blogContentSection = document.getElementById("blog-content");
    const postContent = document.getElementById("post-content");
    const backButton = document.getElementById("back-button");
    const blogSection = document.getElementById("blog");
    document.addEventListener("DOMContentLoaded", () => {
        const blogGrid = document.getElementById("blog-grid");
        if (!blogGrid) {
            console.error("Blog grid element not found.");
            return;
        }
    
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
            })
            .catch(error => console.error("Error loading blog data:", error));
    });
    
    if (blogGrid && blogContentSection && postContent && backButton && blogSection) {
        // Fetch and render blog list
        fetch("blogData.json")
            .then(response => response.json())
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

        // Load selected blog post
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

                // Update URL
                history.pushState({ id: blog.id }, blog.title, `?post=${blog.id}`);
            }
        }

        // Back to blog list
        backButton.addEventListener("click", () => {
            blogContentSection.classList.add("hidden");
            blogSection.classList.remove("hidden");

            // Reset URL
            history.pushState(null, null, "blog.html");
        });

        // Handle browser back/forward navigation
        window.addEventListener("popstate", event => {
            if (event.state && event.state.id) {
                loadBlogPost(event.state.id, data);
            } else {
                blogContentSection.classList.add("hidden");
                blogSection.classList.remove("hidden");
            }
        });
    }
});
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const sidebar = document.getElementById("video-sidebar");
        const openBtn = document.getElementById("video-sidebar-btn");
        const closeBtn = document.getElementById("close-sidebar");

        openBtn.addEventListener("click", () => {
            sidebar.style.right = "0"; // Open sidebar
        });

        closeBtn.addEventListener("click", () => {
            sidebar.style.right = "-400px"; // Close sidebar
        });

        // Close sidebar when clicking outside of it
        document.addEventListener("click", (event) => {
            if (!sidebar.contains(event.target) && !openBtn.contains(event.target)) {
                sidebar.style.right = "-400px";
            }
        });
    });
</script>
=======
document.addEventListener("DOMContentLoaded", () => {
    // Hamburger Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        const quoteText = document.getElementById("quote-text");
    
        if (!quoteText) {
            console.error("Error: Quote text element not found.");
            return;
        }
    
        // Use a predefined list of mental health quotes
        const mentalHealthQuotes = [
            "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
            "Self-care is not a luxury, it is a necessity.",
            "You don't have to control your thoughts, you just have to stop letting them control you.",
            "Healing takes time, and asking for help is a courageous step.",
            "Sometimes the people around you won’t understand your journey. They don’t need to, it’s not for them.",
            "Your feelings are valid, and you deserve to be supported.",
            "There is hope, even when your mind tells you there isn’t.",
            "You are more than your darkest days.",
            "Taking care of your mental health is just as important as taking care of your physical health.",
            "You are not alone in this battle. Keep going."
        ];
    
        // Select a random quote from the list
        const randomQuote = mentalHealthQuotes[Math.floor(Math.random() * mentalHealthQuotes.length)];
    
        // Display the quote
        quoteText.textContent = `"${randomQuote}"`;
    });
    
    
    // Blog Data Fetch and Rendering
    const blogGrid = document.getElementById("blog-grid");
    const blogContentSection = document.getElementById("blog-content");
    const postContent = document.getElementById("post-content");
    const backButton = document.getElementById("back-button");
    const blogSection = document.getElementById("blog");
    document.addEventListener("DOMContentLoaded", () => {
        const blogGrid = document.getElementById("blog-grid");
        if (!blogGrid) {
            console.error("Blog grid element not found.");
            return;
        }
    
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
            })
            .catch(error => console.error("Error loading blog data:", error));
    });
    
    if (blogGrid && blogContentSection && postContent && backButton && blogSection) {
        // Fetch and render blog list
        fetch("blogData.json")
            .then(response => response.json())
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

        // Load selected blog post
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

                // Update URL
                history.pushState({ id: blog.id }, blog.title, `?post=${blog.id}`);
            }
        }

        // Back to blog list
        backButton.addEventListener("click", () => {
            blogContentSection.classList.add("hidden");
            blogSection.classList.remove("hidden");

            // Reset URL
            history.pushState(null, null, "blog.html");
        });

        // Handle browser back/forward navigation
        window.addEventListener("popstate", event => {
            if (event.state && event.state.id) {
                loadBlogPost(event.state.id, data);
            } else {
                blogContentSection.classList.add("hidden");
                blogSection.classList.remove("hidden");
            }
        });
    }
});
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const sidebar = document.getElementById("video-sidebar");
        const openBtn = document.getElementById("video-sidebar-btn");
        const closeBtn = document.getElementById("close-sidebar");

        openBtn.addEventListener("click", () => {
            sidebar.style.right = "0"; // Open sidebar
        });

        closeBtn.addEventListener("click", () => {
            sidebar.style.right = "-400px"; // Close sidebar
        });

        // Close sidebar when clicking outside of it
        document.addEventListener("click", (event) => {
            if (!sidebar.contains(event.target) && !openBtn.contains(event.target)) {
                sidebar.style.right = "-400px";
            }
        });
    });
</script>
>>>>>>> 86f3e3365bbfbe04cb47c563f5867df86fa0e17c

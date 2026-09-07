// ==========================================
// GET ELEMENTS
// ==========================================

const photoCards =
    document.querySelectorAll(".photo-card");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const imageFilterButtons =
    document.querySelectorAll(".image-filter-btn");


const lightbox =
    document.getElementById("lightbox");

const previewImage =
    document.getElementById("previewImage");

const previewTitle =
    document.getElementById("previewTitle");

const previewDescription =
    document.getElementById("previewDescription");

const previewInfo =
    document.getElementById("previewInfo");


const closeBtn =
    document.getElementById("closeBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");


const downloadBtn =
    document.getElementById("downloadBtn");

const shareBtn =
    document.getElementById("shareBtn");

const likeBtn =
    document.getElementById("likeBtn");

const likeCount =
    document.getElementById("likeCount");


// ==========================================
// VARIABLES
// ==========================================

const photos =
    Array.from(photoCards);

let currentIndex = 0;

let selectedCategory = "all";

let selectedImageFilter = "none";


// ==========================================
// CATEGORY FILTER
// ==========================================

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedCategory =
            button.dataset.category;


        // Active button

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        // Filter gallery

        photos.forEach(card => {

            const category =
                card.dataset.category;


            if (
                selectedCategory === "all" ||
                category === selectedCategory
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


// ==========================================
// IMAGE FILTER
// ==========================================

imageFilterButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedImageFilter =
            button.dataset.filter;


        // Active button

        imageFilterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        // Apply filter to gallery images

        photos.forEach(card => {

            const image =
                card.querySelector("img");


            image.classList.remove(
                "filter-bright",
                "filter-grayscale",
                "filter-sepia",
                "filter-contrast"
            );


            if (
                selectedImageFilter === "bright"
            ) {

                image.classList.add(
                    "filter-bright"
                );

            }


            if (
                selectedImageFilter === "grayscale"
            ) {

                image.classList.add(
                    "filter-grayscale"
                );

            }


            if (
                selectedImageFilter === "sepia"
            ) {

                image.classList.add(
                    "filter-sepia"
                );

            }


            if (
                selectedImageFilter === "contrast"
            ) {

                image.classList.add(
                    "filter-contrast"
                );

            }

        });


        // Apply same filter to preview

        applyPreviewFilter();

    });

});


// ==========================================
// PREVIEW FILTER
// ==========================================

function applyPreviewFilter() {

    previewImage.classList.remove(
        "filter-bright",
        "filter-grayscale",
        "filter-sepia",
        "filter-contrast"
    );


    if (
        selectedImageFilter === "bright"
    ) {

        previewImage.classList.add(
            "filter-bright"
        );

    }


    if (
        selectedImageFilter === "grayscale"
    ) {

        previewImage.classList.add(
            "filter-grayscale"
        );

    }


    if (
        selectedImageFilter === "sepia"
    ) {

        previewImage.classList.add(
            "filter-sepia"
        );

    }


    if (
        selectedImageFilter === "contrast"
    ) {

        previewImage.classList.add(
            "filter-contrast"
        );

    }

}


// ==========================================
// OPEN IMAGE
// ==========================================

photos.forEach((card, index) => {

    card.addEventListener("click", () => {

        currentIndex = index;

        showImage();

        lightbox.classList.add("show");

    });

});


// ==========================================
// SHOW IMAGE + DETAILS
// ==========================================

function showImage() {

    const card =
        photos[currentIndex];

    const image =
        card.querySelector("img");


    previewImage.src =
        image.src;

    previewImage.alt =
        image.alt;


    previewTitle.textContent =
        card.dataset.title;


    previewDescription.textContent =
        card.dataset.description;


    previewInfo.textContent =
        card.dataset.info;


    applyPreviewFilter();

}


// ==========================================
// NEXT
// ==========================================

nextBtn.addEventListener("click", (event) => {

    event.stopPropagation();


    currentIndex++;


    if (
        currentIndex >= photos.length
    ) {

        currentIndex = 0;

    }


    showImage();

});


// ==========================================
// PREVIOUS
// ==========================================

prevBtn.addEventListener("click", (event) => {

    event.stopPropagation();


    currentIndex--;


    if (currentIndex < 0) {

        currentIndex =
            photos.length - 1;

    }


    showImage();

});


// ==========================================
// CLOSE
// ==========================================

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("show");

});


// ==========================================
// CLICK OUTSIDE
// ==========================================

lightbox.addEventListener("click", (event) => {

    if (
        event.target === lightbox
    ) {

        lightbox.classList.remove("show");

    }

});


// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

document.addEventListener("keydown", (event) => {

    if (
        !lightbox.classList.contains("show")
    ) {

        return;

    }


    if (
        event.key === "ArrowRight"
    ) {

        nextBtn.click();

    }


    if (
        event.key === "ArrowLeft"
    ) {

        prevBtn.click();

    }


    if (
        event.key === "Escape"
    ) {

        closeBtn.click();

    }

});


// ==========================================
// DOWNLOAD
// ==========================================

downloadBtn.addEventListener("click", () => {

    const link =
        document.createElement("a");

    link.href =
        previewImage.src;

    link.download =
        "gallery-image.jpg";

    link.target =
        "_blank";

    link.click();

});


// ==========================================
// SHARE
// ==========================================

shareBtn.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(
            previewImage.src
        );

        shareBtn.textContent =
            "✓ Copied";

        setTimeout(() => {

            shareBtn.textContent =
                "↗ Share";

        }, 1500);

    }

    catch (error) {

        alert(
            "Image link copied!"
        );

    }

});


// ==========================================
// LIKE
// ==========================================

likeBtn.addEventListener("click", () => {

    let count =
        parseInt(
            likeCount.textContent
        );


    if (
        likeBtn.classList.contains("liked")
    ) {

        count--;

        likeBtn.classList.remove(
            "liked"
        );

        likeBtn.innerHTML =
            `♡ Like <span id="likeCount">${count}</span>`;

    }

    else {

        count++;

        likeBtn.classList.add(
            "liked"
        );

        likeBtn.innerHTML =
            `♥ Liked <span id="likeCount">${count}</span>`;

    }

});
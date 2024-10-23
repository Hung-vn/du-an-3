const token = "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";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");
const loadingVideo = document.getElementById("loadingVideo");
const downloadButton = document.getElementById("downloadButton"); // Nút tải ảnh

async function query(data) {
  // Hiển thị video tải
  loadingVideo.style.display = "block";
  loadingVideo.play();

  image.src = "/loading.gif"; // Hiển thị GIF tải
  image.style.display = "block"; // Đảm bảo GIF hiển thị

  try {
    //https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image
    //https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev
    const response = await fetch(
      "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.blob();
    return result;
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while generating the image. Please try again."); // Thông báo lỗi cho người dùng
  } finally {
    // Ẩn GIF tải sau khi hoàn thành
    loadingVideo.style.display = "none"; // Ẩn video tải
  }
}

button.addEventListener("click", async function () {
  const userInput = inputTxt.value;

  if (!userInput) {
    alert("Please enter some text!");
    return;
  }

  try {
    // Ẩn nút tải xuống khi bắt đầu quá trình tạo ảnh
    downloadButton.style.display = "none";

    const response = await query({ inputs: userInput });
    const objectURL = URL.createObjectURL(response);
    image.src = objectURL;
    image.style.display = "block"; // Hiển thị ảnh đã được tạo

    // Lưu ảnh vào localStorage
    const savedImages =
      JSON.parse(localStorage.getItem("generatedImages")) || [];
    savedImages.push(objectURL);
    localStorage.setItem("generatedImages", JSON.stringify(savedImages));

    // Hiển thị nút tải xuống và gắn URL ảnh đã tạo vào nút tải
    downloadButton.style.display = "block";
    downloadButton.href = objectURL;
    downloadButton.download = "generated-image.png"; // Tên file khi tải xuống

    // Cập nhật gallery ngay sau khi lưu ảnh
    updateGallery(savedImages);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Ẩn video tải sau khi ảnh đã được tạo
    loadingVideo.style.display = "none";
  }
});

// Hàm cập nhật gallery
function updateGallery(images) {
  const imageGallery = document.getElementById("imageGallery");
  imageGallery.innerHTML = ""; // Xóa tất cả ảnh hiện tại trong gallery

  // Hiển thị ảnh đã tạo trong gallery
  images.forEach((imageSrc) => {
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = "Generated Image";
    imageGallery.appendChild(img);
  });
}

// Lấy danh sách ảnh từ localStorage và cập nhật gallery khi trang được tải
const images = JSON.parse(localStorage.getItem("generatedImages")) || [];
updateGallery(images);

// Clear dữ liệu ảnh
document.getElementById("clearButton").addEventListener("click", function () {
  localStorage.clear(); // Xóa tất cả dữ liệu trong localStorage
  alert("Tất cả ảnh đã tạo đã được xóa.");

  // Cập nhật lại gallery
  const imageGallery = document.getElementById("imageGallery");
  imageGallery.innerHTML = ""; // Xóa tất cả ảnh trong gallery
});

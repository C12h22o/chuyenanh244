document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const imagePreview = document.getElementById('imagePreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('convertButton').addEventListener('click', function() {
    const imageInput = document.getElementById('imageInput');
    const textOutput = document.getElementById('textOutput');

    if (!imageInput.files[0]) {
        alert('Vui lòng chọn một hình ảnh trước khi chuyển đổi.');
        return;
    }

    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        Tesseract.recognize(
            e.target.result,
            'vie', // Ngôn ngữ: Tiếng Việt
            {
                logger: m => console.log(m), // Hiển thị tiến trình trong console
            }
        ).then(({ data: { text } }) => {
            textOutput.textContent = text; // Hiển thị văn bản nhận dạng được
        }).catch(err => {
            console.error(err);
            textOutput.textContent = 'Đã xảy ra lỗi khi chuyển đổi ảnh thành văn bản.';
        });
    };

    reader.readAsDataURL(file);
});
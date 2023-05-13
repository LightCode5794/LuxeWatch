jQuery(document).ready(function () {



    function createImgComponent(index) {

        wrapper = document.createElement('div');
        wrapper.classList.add('wrapper-thumb');
        removeBtn = document.createElement("span");
        removeBtn.setAttribute('data-index', index);
        nodeRemove = document.createTextNode('x');
        removeBtn.classList.add('remove-btn');
        removeBtn.appendChild(nodeRemove);
        img = document.createElement('img');
        img.src = URL.createObjectURL(event.target.files[index] || event.target.file);
        img.classList.add('img-preview-thumb');
        wrapper.appendChild(img);
        wrapper.appendChild(removeBtn);
       
        return wrapper;
    }
    // ImgUpload();
    var imgUpload = document.getElementById('upload-img')
        , imgPreview = document.getElementById('img-preview')
        , imgUploadForm = document.getElementById('form-upload')
        , totalFiles
        , previewTitle
        , previewTitleText
        , img;
    
    if(!imgUpload) return;

    let fileListArr = [];

    imgUpload.addEventListener('change', previewImgs, true);

    function previewImgs(_event) {
        totalFiles = imgUpload.files.length;
        fileListArr = Array.from(imgUpload.files);
        if (!!totalFiles) {
            imgPreview.classList.remove('img-thumbs-hidden');
        }
        for (var i = 0; i < totalFiles; i++) {
            imgPreview.appendChild(createImgComponent(i));
        }

        $('.remove-btn').click(function () {
            $(this).parent('.wrapper-thumb').remove();
            fileListArr.splice($(this).data('index'), 1);
            if (!fileListArr.length) {
                imgUpload.value = '';
                imgPreview.classList.add('img-thumbs-hidden')
            }

        });

    }

    const thumbUpload = document.getElementById('upload-thumnail')
        , thumbPreview = document.getElementById('thumbnail-preview')
       

    thumbUpload.addEventListener('change', previewThumb, true);
    function previewThumb(_event) {

        if (thumbUpload.files) {
           
            thumbPreview.classList.remove('img-thumbs-hidden');
        }
        thumbPreview.replaceChildren();
        thumbPreview.appendChild(createImgComponent(0));
        console.log(thumbPreview);

        $('.remove-btn').click(function () {
            $(this).parent('.wrapper-thumb').remove();

            thumbUpload.value = '';
            thumbPreview.classList.add('img-thumbs-hidden')

        });

    }
})

/*function ImgUpload() {
    var imgWrap = "";
    var imgArray = [];
    // const  $('.upload__inputfile') = $('.upload__inputfile').trigger({ type: 'change', resort: true });


     $('.upload__inputfile').each(function () {
        $(this).on('change', function (e) {
            imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
            var maxLength = $(this).attr('data-max_length');

            var files = e.target.files;
            
            console.log(files);
            var filesArr = Array.prototype.slice.call(files);
            var iterator = 0;

            filesArr.forEach(function (f, index) {

                if (!f.type.match('image.*')) {

                    return;
                }

                if (imgArray.length > maxLength) {

                    return false
                } else {
                    var len = 0;
                    for (var i = 0; i < imgArray.length; i++) {
                        if (imgArray[i] !== undefined) {
                            len++;
                        }
                    }
                    if (len > maxLength) {
                        return false;
                    } else {
                        imgArray.push(f);
                       
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
                            imgWrap.append(html);
                            iterator++;
                        }
                        reader.readAsDataURL(f);
                    }
                }
            });
        });
    });

    $('body').on('click', ".upload__img-close", function (e) {
        var file = $(this).parent().data("file");
        for (var i = 0; i < imgArray.length; i++) {
            if (imgArray[i].name === file) {
                imgArray.splice(i, 1);
                break;
            }
        }
        if (!imgArray.length) {
             $('.upload__inputfile').val('');
        }
        $(this).parent().parent().remove();
    });
}*/